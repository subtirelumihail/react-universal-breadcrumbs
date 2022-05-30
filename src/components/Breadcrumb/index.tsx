import React from 'react'
import classnames from 'classnames'
import * as Icons from 'react-feather'

interface BreadcrumbProps {
  path: string
  page: string
  isLastChild?: boolean
  divider?: any
  icon?: string
  homeIcon?: string
  transitionAction?: any
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  path = '',
  page = '',
  divider,
  isLastChild = false,
  icon,
  homeIcon,
  transitionAction,
}: any) => {
  const handleTransition = () => {
    if (isLastChild) {
      return
    }
    if (transitionAction) {
      transitionAction(path)
    } else {
      window.location.assign(path)
    }
  }

  const IconComponent = icon && Icons[icon]
  const HomeIcon = homeIcon ? Icons[homeIcon] : Icons.Home

  return (
    <>
      <div
        className={classnames('universal-breadcrumbs-breadcrumb', {
          'universal-breadcrumbs-breadcrumb--link': !isLastChild,
        })}
        onClick={handleTransition}
      >
        {icon && <IconComponent />}
        {page === '' ? <HomeIcon /> : page.replace(/-|_/gi, ' ')}
      </div>
      {!isLastChild && (
        <div className="universal-breadcrumbs-breadcrumb-divider">
          {divider}
        </div>
      )}
    </>
  )
}

export default Breadcrumb
