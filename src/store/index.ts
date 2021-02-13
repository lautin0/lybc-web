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