import React, { useCallback, useEffect } from 'react'
import { constants } from './constants'
import { useFD } from './FDProvider'
import { downloadFile } from './utils'

const {
  labels: {
    fdCtrl: {
      noneSelected,
      selected,
      dlSelected,
      dlIconAlt,
      dlIconSrc,
      selectAllAria,
      unselectAllAria,
    },
  },
} = constants

export const FDControl = () => {
  const {
    state: { allFiles, selectedFileIds, isAllFilesSelected },
    dispatch,
  } = useFD()
  const checkboxRef = React.useRef<HTMLInputElement>(null)

  useEffect(() => {
    const isSomeFilesSelected = selectedFileIds.length !== 0
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate =
        !isAllFilesSelected && isSomeFilesSelected
    }
  }, [isAllFilesSelected, selectedFileIds])

  const handleToggleSelectAllFiles = useCallback(
    (_event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: 'TOGGLE_SELECT_ALL_FILES',
      })
    },
    [dispatch]
  )

  const handleDownloadSelected = useCallback(() => {
    const dlFiles = allFiles.filter(
      (aFile) => selectedFileIds.indexOf(aFile.path) !== -1
    )
    if (dlFiles.length > 0) {
      dispatch({
        type: 'DOWNLOAD_SELECTED',
      })
      dlFiles.forEach((aFile) => {
        downloadFile(aFile)
      })
    }
  }, [allFiles, selectedFileIds, dispatch])

  const selectedFileCount = selectedFileIds.length

  return (
    /**
     * @note
     *  FDControl component should have a single
     *  responsibility of rendering control components.
     *  Since select-all checkbox, selection count label,
     *  and dl selected button are simple components,
     *  their business logics are included here.
     */
    <ul className="fd-ctrl">
      <li className="fd-cursor">
        <input
          type="checkbox"
          ref={checkboxRef}
          checked={isAllFilesSelected}
          onChange={handleToggleSelectAllFiles}
          aria-label={isAllFilesSelected ? unselectAllAria : selectAllAria}
        />
      </li>
      <li className="fd-dl-select-count">
        <p>
          {selectedFileCount
            ? `${selected} ${selectedFileCount}`
            : `${noneSelected}`}
        </p>
      </li>
      <li
        className="fd-dl-selected fd-cursor"
        onClick={() => handleDownloadSelected()}
      >
        <img src={dlIconSrc} alt={dlIconAlt} />
        <button>{dlSelected}</button>
      </li>
    </ul>
  )
}
