export interface SystemState {
    error: any,
    result: SagaResult | null,
    loading: number
}

export interface DecisionState {
    isPending: boolean,
    message: string | null,
    positiveAction?: any,
    negativeAction?: any
}

export type SagaResult = {
    message: string,
    callback?: Function | null,
}