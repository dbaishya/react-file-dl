import * as React from 'react'
import { useFD } from './FDProvider'

export const FDHeader = () => {
  const {
    state: { allFiles },
  } = useFD()

  if (!allFiles.length) {
    return null
  }
  const headerKeys = ['', ...Object.keys(allFiles[0])]

  return (
    <ul className="fd-header">
      {headerKeys.map((aHeaderKey, index) => {
        const key = `${aHeaderKey}-${index}`
        return (
          <li key={key} className={`fd-header-${aHeaderKey}`}>
            <p>{aHeaderKey}</p>
          </li>
        )
      })}
    </ul>
  )
}
