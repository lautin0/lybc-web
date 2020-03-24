export interface SystemState {
    error: any,
    result: SagaResult | null,
    loading: number
}

export type SagaResult = {
    message: string,
    callback?: Function | null,
}