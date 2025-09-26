import { User } from 'firebase/auth'

export type AuthStateCallback = (user: User | null) => void
export type Unsubscribe = () => void

export interface SignInWithEmailArgs {
	email: string
	password: string
}

export interface SignUpWithEmailArgs {
	email: string
	password: string
	displayName?: string | null
}

export interface SignInWithGoogleArgs {
	idToken: string
}

export interface CheckEmailAndPhoneExists {
	email: string
	phoneNumber: string
}
