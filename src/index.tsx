import React, { useState, useEffect } from 'react'
import { ChevronRight, ChevronLeft } from 'react-feather'
import classnames from 'classnames'
import useReactPath from './hooks/useReactPath'
import useWindowSize from './hooks/useWindowSize'
import Breadcrumb, { BreadcrumbProps } from './components/Breadcrumb'
import './styles.scss'

export interface BreadcrumbsPropsInterface {
  className?: any
  mobileClassName?: any
  breadcrumbClassName?: any
  currentPageClassName?: any
  previousPageClassName?: any
  divider?: any
  homeIcon?: string
  transitionAction?: any
  goBackTransitionAction?: any
  goBackToPreviousRoute?: any
  isMobileFriendly?: boolean
  mobileBreakpoint?: number
  overwrite?: BreadcrumbProps[]
}

const Breadcrumbs: React.FC<BreadcrumbsPropsInterface> = ({
  divider = <ChevronRight />,
  mobileBreakpoint = 480,
  isMobileFriendly = true,
  goBackToPreviousRoute = false,
  className,
  mobileClassName,
  breadcrumbClassName,
  currentPageClassName,
  previousPageClassName,
  homeIcon,
  overwrite,
  transitionAction,
  goBackTransitionAction,
}) => {
  const { width } = useWindowSize()
  const [breadcrumbs, setBreadcrumbs]: any = useState([])
  const path = useReactPath()
  const isMobile = isMobileFriendly && width <= mobileBreakpoint

  useEffect(() => {
    const newPaths = path !== '/' ? path.split('/') : ['']
    setBreadcrumbs(newPaths)
  }, [path])

  if (isMobile) {
    const lastIndex = breadcrumbs.length - 1
    const lastPage = breadcrumbs[lastIndex]
    const currentPath = breadcrumbs.slice(0, breadcrumbs.length).join('/')
    const previousPath = breadcrumbs.slice(0, breadcrumbs.length - 1).join('/')

    const handleGoBackTransition = () => {
      if (goBackTransitionAction) {
        return goBackTransitionAction()
      }

      if (goBackToPreviousRoute) {
        return transitionAction(previousPath)
      }

      if (history) {
        history.back()
      }
    }

    if (lastIndex === 0) {
      return null
    }

    return (
      <div
        className={classnames(
          mobileClassName,
          'universal-breadcrumbs',
          'universal-breadcrumbs-mobile'
        )}
      >
        <ChevronLeft />
        <Breadcrumb
          key={currentPath}
          className={breadcrumbClassName}
          currentPageClassName={currentPageClassName}
          previousPageClassName={previousPageClassName}
          homeIcon={homeIcon}
          path={currentPath}
          page={lastPage}
          transitionAction={handleGoBackTransition}
        />
      </div>
    )
  }

  return (
    <div className={classnames(className, 'universal-breadcrumbs')}>
      {breadcrumbs.length > 1 &&
        breadcrumbs.map((page: string, index: number) => {
          let currentOverwrite: any = {}
          const currentPath = breadcrumbs.slice(0, index + 1).join('/')
          if (overwrite) {
            currentOverwrite = overwrite.find((element) => {
              // /page/123/abc -> currentPath
              // /page/:id/abc -> element.path
              // if (element.path === currentPath) return true;
              let counter = 0
              const pathLength = currentPath
                .split('/')
                .filter((p: string) => p.trim().length > 0).length // 3
              const elementPathLength = element.path
                .split('/')
                .filter((p: string) => p.trim().length > 0).length

              currentPath
                .split('/')
                .filter((p: string) => p.trim().length > 0)
                .forEach((path: string, index: number) => {
                  const elementPath = element.path
                    .split('/')
                    .filter((p: string) => p.trim().length > 0)[index]
                  if (elementPath && elementPath.charAt(0) === ':')
                    return ++counter
                  if (path === elementPath) return ++counter
                  return false
                })
              return counter === pathLength && counter === elementPathLength
            })
          }
          return (
            <Breadcrumb
              key={currentPath}
              className={breadcrumbClassName}
              currentPageClassName={currentPageClassName}
              previousPageClassName={previousPageClassName}
              homeIcon={homeIcon}
              path={currentPath}
              page={page}
              overwrite={currentOverwrite}
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
