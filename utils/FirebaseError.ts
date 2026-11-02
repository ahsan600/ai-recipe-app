import { AuthErrorType } from "@/types/AuthResponseType";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export function handleAuthError(
  error: FirebaseAuthTypes.NativeFirebaseAuthError | any
): AuthErrorType {
  const errorMessages: Record<string, string> = {
    // Common authentication errors
    "auth/missing-password": "Password is required.",
    "auth/missing-email": "Email address is required.",
    "auth/invalid-email": "Invalid email address format.",
    "auth/user-disabled":
      "This account has been disabled. Please contact support.",
    "auth/user-not-found": "No account found with this email address.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/invalid-verification-code": "Invalid verification code.",
    "auth/invalid-verification-id": "Invalid verification ID.",

    // Registration errors
    "auth/email-already-in-use": "This email address is already registered.",
    "auth/weak-password":
      "Password is too weak. Please use a stronger password.",
    "auth/account-exists-with-different-credential":
      "An account already exists with the same email but different sign-in method.",

    // Session and token errors
    "auth/expired-action-code": "The action code has expired.",
    "auth/invalid-action-code": "The action code is invalid.",
    "auth/code-expired": "The verification code has expired.",

    // Network and system errors
    "auth/network-request-failed":
      "Network error. Please check your internet connection.",
    "auth/too-many-requests":
      "Too many unsuccessful attempts. Please try again later.",
    "auth/operation-not-allowed": "This sign-in method is not enabled.",
    "auth/internal-error": "An internal error occurred. Please try again.",

    // Multi-factor authentication errors
    "auth/multi-factor-auth-required":
      "Multi-factor authentication is required for this account.",
    "auth/second-factor-already-in-use":
      "This second factor is already enrolled.",
    "auth/maximum-second-factor-count-exceeded":
      "Maximum number of second factors exceeded.",
    "auth/unsupported-first-factor": "Unsupported first factor.",
    "auth/unverified-email": "Email address needs to be verified.",

    // Phone authentication errors
    "auth/invalid-phone-number": "Invalid phone number format.",
    "auth/missing-phone-number": "Phone number is required.",
    "auth/quota-exceeded": "SMS quota exceeded. Please try again later.",
    "auth/captcha-check-failed": "CAPTCHA verification failed.",
    "auth/missing-client-identifier": "Missing client identifier.",

    // Provider-related errors
    "auth/invalid-oauth-provider": "Invalid OAuth provider.",
    "auth/invalid-oauth-client-id": "Invalid OAuth client ID.",
    "auth/unauthorized-domain":
      "This domain is not authorized for OAuth operations.",
    "auth/provider-already-linked":
      "Provider is already linked to this account.",
    "auth/credential-already-in-use":
      "This credential is already associated with another account.",
    "auth/no-such-provider": "No such authentication provider.",
    "auth/auth-domain-config-required":
      "Auth domain configuration is required.",

    // Recent login required
    "auth/requires-recent-login":
      "For security, please sign in again to perform this action.",

    // App validation errors
    "auth/invalid-app-credential": "Invalid application credential.",
    "auth/invalid-app-id": "Invalid application ID.",
    "auth/invalid-cert-hash": "Invalid certificate hash.",
    "auth/invalid-continue-uri": "Invalid continue URL.",
    "auth/invalid-dynamic-link-domain": "Invalid dynamic link domain.",
    "auth/invalid-persistence-type": "Invalid persistence type.",

    // Session management
    "auth/session-cookie-expired": "Session cookie has expired.",
    "auth/session-cookie-revoked": "Session cookie has been revoked.",
    "auth/argument-error": "Invalid argument provided.",

    // Tenant management errors
    "auth/tenant-id-mismatch": "Tenant ID mismatch.",
    "auth/unsupported-tenant-operation": "Unsupported tenant operation.",

    // Other errors
    "auth/app-deleted": "The application has been deleted.",
    "auth/app-not-authorized": "Application is not authorized.",
    "auth/key-expired": "API key has expired.",
    "auth/missing-android-pkg-name": "Missing Android package name.",
    "auth/missing-ios-bundle-id": "Missing iOS bundle ID.",
    "auth/unauthorized-continue-uri": "Unauthorized continue URI.",
    "auth/user-mismatch": "User credential mismatch.",
    "auth/user-token-expired": "User token has expired.",
    "auth/web-storage-unsupported": "Web storage is not supported.",

    // Fallback error
    "auth/unknown": "An unknown error occurred. Please try again.",
  };

  return {
    code: error.code || "auth/unknown",
    message:
      errorMessages[error.code] ||
      error.message ||
      "An unknown error occurred.",
    originalError: error,
  };
}
