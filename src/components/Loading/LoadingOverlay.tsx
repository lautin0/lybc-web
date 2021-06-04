
import React, { useEffect, createRef } from 'react'
import ReactDOM from 'react-dom'
import { RootStore } from 'store'

function LoadingOverlay() {

  const { loading: isPending } = RootStore.useLoadingStore()

  useEffect(() => {
    let thisRef = createRef()
    ReactDOM.createPortal(thisRef, document.body)
  })

  return (
    <div className="text-center loading-overlay" style={{ display: isPending > 0 ? 'block' : 'none' }}>
      <div className="spinner-border" style={{ marginTop: '50vh' }} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default LoadingOverlay;