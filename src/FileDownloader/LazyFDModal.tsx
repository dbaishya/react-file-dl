import React, { Suspense } from 'react'
import { useFD } from './FDProvider'
/**
 * @note
 *  code splitting for pref
 */
const FDModal = React.lazy(() => import('./FDModal'))

export const LazyFDModal = () => {
  const {
    state: { allFiles, isDownloadSelected },
  } = useFD()

  if (!isDownloadSelected || !allFiles.length) {
    return null
  }

  return (
    <Suspense fallback={<></>}>
      <FDModal />
    </Suspense>
  )
}
