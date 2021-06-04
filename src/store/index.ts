import create from 'zustand'

export type State = {
  isOpen: boolean
  title: string
  pendingPostID: string

  setPendingPostID: (id: string) => void
  setOpen: (o: boolean) => void
  setTitle: (msg: string) => void
}

export const useStore = create<State>((set, get, api) => ({
  isOpen: false,
  title: 'app.modal.header.info',
  pendingPostID: '',

  setOpen: (o: boolean) => set(state => ({ isOpen: o })),
  setTitle: (s: string) => set(state => ({ title: s })),
  setPendingPostID: (id: string) => set(state => ({ pendingPostID: id }))
}))

export type PendingPostState = {
  isOpen: boolean
  title: string
  pendingPostID: string

  setPendingPostID: (id: string) => void
  setOpen: (o: boolean) => void
  setTitle: (msg: string) => void
}

export const usePendingPostStore = create<PendingPostState>((set, get, api) => ({
  isOpen: false,
  title: 'app.modal.header.info',
  pendingPostID: '',

  setOpen: (o: boolean) => set(state => ({ isOpen: o })),
  setTitle: (s: string) => set(state => ({ title: s })),
  setPendingPostID: (id: string) => set(state => ({ pendingPostID: id }))
}))


export type ModalState = {
  callback: Function | null
  message: string | null
  error: string | null

  setCallback: (id: Function | null) => void
  setMessage: (s: string | null) => void
  setError: (err: string | null) => void
}

export const useModalStore = create<ModalState>((set, get, api) => ({
  callback: null,
  message: null,
  error: null,

  setCallback: (fn: Function | null) => set(state => ({ callback: fn })),
  setMessage: (s: string | null) => set(state => ({ message: s })),
  setError: (err: string | null) => set(state => ({ error: err }))
}))

export type LegacyModalState = {
  message: string | null
  error: string | null

  setSysMessage: (s: string | null) => void
  setSystemFailure: (err: string | null) => void
}

export const useLegacyModalStore = create<LegacyModalState>((set) => ({
  message: null,
  error: null,

  setSysMessage: (s: string | null) => set(state => ({ message: s })),
  setSystemFailure: (err: string | null) => set(state => ({ error: err }))
}))


export type SysInfoState = {
  message: string

  setSysInfoMessage: (s: string) => void
}

export const useSysInfoStore = create<SysInfoState>((set) => ({
  message: '',

  setSysInfoMessage: (s: string) => set(state => ({ message: s })),
}))

export type ImageState = {
  dataUrl: any,
  setImage: (d: any) => void
}

export const useImageStore = create<ImageState>((set) => ({
  dataUrl: null,

  setImage: (d: any) => set(state => ({ dataUrl: d })),
}))

export type DecisionModalState = {
  positiveFn: Function | null
  negativeFn: Function | null
  message: string | null
  title: string | null

  setPositiveFn: (id: Function | null) => void
  setNegativeFn: (id: Function | null) => void
  setMessage: (msg: string | null) => void
  setTitle: (title: string | null) => void
}

export const useDecisionModalStore = create<DecisionModalState>((set, get, api) => ({
  positiveFn: null,
  negativeFn: null,
  message: null,
  title: null,

  setPositiveFn: (fn: Function | null) => set(state => ({ positiveFn: fn })),
  setNegativeFn: (fn: Function | null) => set(state => ({ negativeFn: fn })),
  setMessage: (msg: string | null) => set(state => ({ message: msg })),
  setTitle: (title: string | null) => set(state => ({ title: title }))
}))

export type LoadingState = {
  loading: number,
  setLoading: (isLoading: boolean) => void
}

export const useLoadingStore = create<LoadingState>((set) => ({
  loading: 0,

  setLoading: (isLoading: boolean) => set(state => ({ loading: isLoading ? (state.loading + 1) : (state.loading - 1) })),
}))