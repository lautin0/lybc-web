import { User } from "actions/auth/types";
import { TokenPair } from "generated/graphql";

export interface AuthState {
    user: User,
    tokenPair: TokenPair | null,
    isPending: number
}