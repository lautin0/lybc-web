import { User } from "actions/auth/types";

export interface AuthState {
    user: User,
    jwt: string | null,
    isPending: number
}