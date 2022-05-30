import React, { useState, useEffect } from 'react'
import { ChevronRight } from 'react-feather'
import useReactPath from './hooks/useReactPath'
import Breadcrumb from './components/Breadcrumb'
import './styles.scss'

export interface BreadcrumbsPropsInterface {
  divider?: any
  homeIcon?: string
  transitionAction?: any
}

const Breadcrumbs: React.FC<BreadcrumbsPropsInterface> = ({
  divider = <ChevronRight />,
  homeIcon,
  transitionAction,
}) => {
  const [breadcrumbs, setBreadcrumbs]: any = useState([])
  const path = useReactPath()

  useEffect(() => {
    const newPaths = path !== '/' ? path.split('/') : ['']
    setBreadcrumbs(newPaths)
  }, [path])

  return (
    <div className="universal-breadcrumbs">
      {breadcrumbs.map((page: string, index: number) => {
        const currentPath = breadcrumbs.slice(0, index + 1).join('/')
        return (
          <Breadcrumb
            key={currentPath}
            homeIcon={homeIcon}
            path={currentPath}
            page={page}
            divider={divider}
            isLastChild={breadcrumbs.length === index + 1}
            transitionAction={transitionAction}
          />
        )
      })}
    </div>
  )
}

export default Breadcrumbs
