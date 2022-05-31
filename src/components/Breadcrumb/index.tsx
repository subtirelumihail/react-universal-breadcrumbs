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
  homeIcon?: any
  transitionAction?: any
  component?: any
  overwrite?: BreadcrumbProps
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  path = '',
  isLastChild = false,
  overwrite = {},
  ...props
}: any) => {
  const newProps = { ...props, ...overwrite }
  const {
    page = '',
    clickable = true,
    homeIcon = 'Home',
    component,
    divider,
    className,
    currentPageClassName,
    previousPageClassName,
    icon,
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

  const IconComponent = icon && typeof icon === 'string' && Icons[icon]
  const HomeIcon = homeIcon && typeof homeIcon === 'string' && Icons[homeIcon]

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
            {icon &&
              page !== '' &&
              (typeof icon === 'string' ? <IconComponent /> : icon)}
            {page === '' ? (
              typeof homeIcon === 'string' ? (
                <HomeIcon />
              ) : (
                homeIcon
              )
            ) : (
              page.replace(/-|_/gi, ' ')
            )}
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
