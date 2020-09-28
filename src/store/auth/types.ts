import { TokenPair, User } from "actions/auth/types";

export interface AuthState {
    user: User,
    tokenPair: TokenPair | null,
    isPending: number
}