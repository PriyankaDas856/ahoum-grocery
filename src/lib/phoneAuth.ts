import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth'
import type { ConfirmationResult } from 'firebase/auth'
import { auth } from './firebase'

let confirmationResult: ConfirmationResult | null = null
let recaptchaVerifier: RecaptchaVerifier | null = null

export function createRecaptcha(): RecaptchaVerifier {
  if (recaptchaVerifier) {
    return recaptchaVerifier
  }

  const container = document.getElementById(
    'recaptcha-container',
  )

  if (!container) {
    throw new Error(
      'reCAPTCHA container was not found.',
    )
  }

  recaptchaVerifier = new RecaptchaVerifier(
    auth,
    'recaptcha-container',
    {
      size: 'invisible',
      callback: () => {
        console.log('reCAPTCHA completed')
      },
      'expired-callback': () => {
        console.log('reCAPTCHA expired')

        if (recaptchaVerifier) {
          recaptchaVerifier.clear()
          recaptchaVerifier = null
        }
      },
    },
  )

  return recaptchaVerifier
}

export async function sendOtp(
  phoneNumber: string,
): Promise<ConfirmationResult> {
  if (!phoneNumber) {
    throw new Error(
      'Phone number is required.',
    )
  }

  try {
    const verifier = createRecaptcha()

    confirmationResult =
      await signInWithPhoneNumber(
        auth,
        phoneNumber,
        verifier,
      )

    return confirmationResult
  } catch (error) {
    console.error(
      'Firebase send OTP error:',
      error,
    )

    if (recaptchaVerifier) {
      recaptchaVerifier.clear()
      recaptchaVerifier = null
    }

    throw error
  }
}

export async function verifyOtp(
  code: string,
) {
  if (!confirmationResult) {
    throw new Error(
      'Verification session expired. Please request a new code.',
    )
  }

  if (!code || code.length !== 6) {
    throw new Error(
      'Please enter the 6-digit verification code.',
    )
  }

  try {
    const result =
      await confirmationResult.confirm(code)

    confirmationResult = null

    return result
  } catch (error) {
    console.error(
      'Firebase verify OTP error:',
      error,
    )

    throw error
  }
}

export function clearPhoneAuth() {
  confirmationResult = null

  if (recaptchaVerifier) {
    recaptchaVerifier.clear()
    recaptchaVerifier = null
  }
}