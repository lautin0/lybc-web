import create from 'zustand'
import { createAppModalStore, ModalState } from './modal'

type State = ModalState

export const useStore = create<State>((set, get, api) => ({
  ...createAppModalStore(set)
}))