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