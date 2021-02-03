import { SetState } from 'zustand'

export type ModalState = {
  isOpen: boolean
  title: string

  setOpen: (o: boolean) => void
  setTitle: (msg: string) => void
}

export function createAppModalStore(set: SetState<ModalState>): ModalState {

  return ({
    isOpen: false,
    title: 'app.modal.header.info',

    setOpen: (o: boolean) => set(state => ({ isOpen: o })),
    setTitle: (s: string) => set(state => ({ title: s }))
  })

}