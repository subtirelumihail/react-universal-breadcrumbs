import React, { useState, useEffect } from 'react'
import useReactPath from './hooks/useReactPath'
import './styles.scss'

const Breadcrumbs: React.FC = () => {
  const [breadcrumbs, setBreadcrumbs]: any = useState([])
  const path = useReactPath()

  useEffect(() => {
    const newPaths = path.split('/')
    setBreadcrumbs(newPaths)
  }, [path])

  console.log(breadcrumbs)

  return (
    <div className="Breadcrumbs">
      <h2>Do cool stuff</h2>
    </div>
  )
}

export default Breadcrumbs
