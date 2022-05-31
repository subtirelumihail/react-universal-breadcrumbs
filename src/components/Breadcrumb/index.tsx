import React from 'react'
import classnames from 'classnames'
import * as Icons from 'react-feather'

export interface BreadcrumbProps {
  path: string
  page: string
  clickable?: boolean
  className?: any
  currentPageClassName?: any
  previousPageClassName?: any
  isLastChild?: boolean
  divider?: any
  icon?: string
  homeIcon?: string
  transitionAction?: any
  component?: any
  overwrite?: BreadcrumbProps
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  isLastChild = false,
  overwrite = {},
  path = '',
  ...props
}: any) => {
  const newProps = { ...props, ...overwrite }
  const {
    page = '',
    clickable = true,
    component,
    divider,
    className,
    currentPageClassName,
    previousPageClassName,
    icon,
    homeIcon,
    transitionAction,
  } = newProps
  const handleTransition = () => {
    if (!clickable) {
      return
    }
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
        className={classnames(className, 'universal-breadcrumbs-breadcrumb', {
          [previousPageClassName]: !isLastChild,
          [currentPageClassName]: isLastChild,
          'universal-breadcrumbs-breadcrumb--link': !isLastChild && clickable,
          'universal-breadcrumbs-breadcrumb--current': isLastChild,
        })}
        onClick={handleTransition}
      >
        {component ? (
          component
        ) : (
          <>
            {icon && page !== '' && <IconComponent />}
            {page === '' ? <HomeIcon /> : page.replace(/-|_/gi, ' ')}
          </>
        )}
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
