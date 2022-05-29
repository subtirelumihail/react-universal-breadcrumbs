import { useState, useEffect } from 'react'

let oldPushState = history.pushState
history.pushState = function pushState() {
  let ret = oldPushState.apply(this, arguments)
  window.dispatchEvent(new Event('popstate'))
  return ret
}

let oldReplaceState = history.replaceState
history.replaceState = function replaceState() {
  let ret = oldReplaceState.apply(this, arguments)
  window.dispatchEvent(new Event('popstate'))
  return ret
}

const useReactPath = () => {
  const [path, setPath] = useState(window.location.pathname)
  const listenToPopstate = () => {
    const winPath = window.location.pathname
    setPath(winPath)
  }
  useEffect(() => {
    window.addEventListener('popstate', listenToPopstate)
    return () => {
      window.removeEventListener('popstate', listenToPopstate)
    }
  }, [])
  return path
}

export default useReactPath
