import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth'
import type { ConfirmationResult } from 'firebase/auth'
import { auth } from './firebase'

let confirmationResult: ConfirmationResult | null = null
let recaptchaVerifier: RecaptchaVerifier | null = null

export function createRecaptcha() {
  if (recaptchaVerifier) {
    return recaptchaVerifier
  }

  recaptchaVerifier = new RecaptchaVerifier(
    auth,
    'recaptcha-container',
    {
      size: 'invisible',
    },
  )

  return recaptchaVerifier
}

export async function sendOtp(
  phoneNumber: string,
) {
  const verifier = createRecaptcha()

  try {
    confirmationResult =
      await signInWithPhoneNumber(
        auth,
        phoneNumber,
        verifier,
      )

    return confirmationResult
  } catch (error) {
    recaptchaVerifier?.clear()
    recaptchaVerifier = null

    throw error
  }
}

export async function verifyOtp(code: string) {
  if (!confirmationResult) {
    throw new Error(
      'Verification session expired. Please request a new code.',
    )
  }

  const result =
    await confirmationResult.confirm(code)

  confirmationResult = null

  return result
}

export function clearPhoneAuth() {
  confirmationResult = null

  if (recaptchaVerifier) {
    recaptchaVerifier.clear()
    recaptchaVerifier = null
  }
}