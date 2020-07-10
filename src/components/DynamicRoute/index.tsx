/* eslint-disable react/jsx-props-no-spreading */
import React, { lazy, memo, Suspense, ComponentType } from 'react'
import Loader from 'components/Loader'
import ErrorBoundary from 'components/ErrorBoundary'

type ImportPath = Promise< { default: ComponentType<any> }>

const DynamicRoute = (importPath: () => ImportPath) => {
  const Component = lazy(importPath)

  const DynamicComponent = (props: any) => (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  )

  return memo(DynamicComponent)
}

export default DynamicRoute
