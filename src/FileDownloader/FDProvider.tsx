import * as React from 'react'
import type { FDFile, FDFileId } from './types'

const {
  useReducer,
  createContext,
  useContext,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} = React

export type FDState = {
  allFiles: FDFile[]
  selectedFileIds: FDFileId[]
  isAllFilesSelected: boolean
  isDownloadSelected: boolean
}

export type FDAction =
  | {
      type: 'LOAD_FILES'
      payload: {
        files: FDFile[]
      }
    }
  /**
   * @note
   *  (why) a single `toggle_select_all_files` action versus
   *  two `select_all_files` and `unselect_all_files` actions:
   *    - check/uncheck marks on the UI are based on the state of
   *      the data - model changes are driving the visual changes.
   *    - allows the component to save and restore state from
   *      a browser or remote store
   */
  | {
      type: 'TOGGLE_SELECT_ALL_FILES'
    }
  /**
   * @note
   *  (why) a single `toggle_select_file` action versus
   *  two `select_file` and `unselect_file` actions:
   *    - <same reason as above>
   *      - model state changes are driving the visual state changes
   */
  | {
      type: 'TOGGLE_SELECT_FILE'
      payload: {
        id: FDFileId
      }
    }
  /**
   * @note
   *  this action is not used yet - when the status of an existing
   *  file needs to be updated, this action can be used.
   */
  | {
      type: 'SET_DOWNLOAD_STATUS'
      payload: {
        id: FDFileId
        status: 'available' | 'scheduled'
      }
    }
  | {
      type: 'DOWNLOAD_SELECTED'
    }
  | {
      type: 'CLOSE_DOWNLOAD_BOX'
    }

const initialFDState: FDState = {
  allFiles: [],
  selectedFileIds: [],
  isAllFilesSelected: false,
  isDownloadSelected: false,
}

const fdReducer = (state: FDState = initialFDState, action: FDAction) => {
  switch (action.type) {
    case 'LOAD_FILES': {
      return {
        ...state,
        allFiles: action.payload.files,
      }
    }
    case 'TOGGLE_SELECT_ALL_FILES': {
      const { isAllFilesSelected, selectedFileIds, allFiles } = state
      let partialFDState: Pick<
        FDState,
        'isAllFilesSelected' | 'selectedFileIds'
      > = { isAllFilesSelected, selectedFileIds }
      if (isAllFilesSelected) {
        // unselect all
        // @note: ref to Questions #2 in README
        partialFDState = {
          isAllFilesSelected: false,
          selectedFileIds: [],
        }
      } else {
        // select all - conditionally
        const selectableFiles = allFiles
          .filter((aFile) => aFile.status === 'available')
          .map((aFile) => aFile.path)
        partialFDState = {
          isAllFilesSelected: selectableFiles.length === allFiles.length,
          selectedFileIds: selectableFiles,
        }
      }
      return {
        ...state,
        ...partialFDState,
      }
    }
    case 'TOGGLE_SELECT_FILE': {
      const { allFiles, selectedFileIds } = state
      const {
        payload: { id: clickedFileId },
      } = action
      const clickedFileIndex = selectedFileIds.indexOf(clickedFileId)
      let selectedFileIdsCopy = [...selectedFileIds]

      if (clickedFileIndex !== -1) {
        // unselect file
        selectedFileIdsCopy = [
          ...selectedFileIdsCopy.slice(0, clickedFileIndex),
          ...selectedFileIdsCopy.slice(clickedFileIndex + 1),
        ]
      } else {
        // select file - conditionally
        const isSelectedFileAvailable =
          allFiles.filter(
            (aFile) =>
              aFile.path === clickedFileId && aFile.status === 'available'
          ).length !== 0
        if (isSelectedFileAvailable) {
          selectedFileIdsCopy = [...selectedFileIdsCopy, clickedFileId]
        }
      }
      return {
        ...state,
        isAllFilesSelected:
          selectedFileIdsCopy.length === state.allFiles.length,
        selectedFileIds: [...selectedFileIdsCopy],
      }
    }
    case 'SET_DOWNLOAD_STATUS': {
      const {
        payload: { id: updatingFileId, status: newFileStatus },
      } = action
      const { allFiles } = state
      const updatingFileIndex = allFiles.findIndex(
        (aFile) => aFile.path === updatingFileId
      ) as any[0]

      return {
        ...state,
        allFiles: [
          ...allFiles.slice(0, updatingFileIndex),
          {
            ...allFiles[updatingFileIndex],
            status: newFileStatus,
          },
          ...allFiles.slice(updatingFileIndex + 1),
        ],
      }
    }
    case 'DOWNLOAD_SELECTED': {
      return {
        ...state,
        isDownloadSelected: true,
      }
    }
    case 'CLOSE_DOWNLOAD_BOX': {
      return {
        ...state,
        isDownloadSelected: false,
      }
    }
    default:
      return { ...state }
  }
}

const FDContext = createContext<{
  state: FDState
  dispatch: React.Dispatch<FDAction>
}>({
  state: initialFDState,
  dispatch: () => null,
})

type FDProviderProps = {
  files: FDFile[]
  children: React.ReactNode
}

const FDProvider = ({ files, children }: FDProviderProps) => {
  const reducer = useCallback(fdReducer, [files])
  const [state, dispatch] = useReducer(reducer, initialFDState)

  const memoizedValue = useMemo(() => {
    return {
      state,
      dispatch,
    }
  }, [state, dispatch])

  const isInitialRenderRef = useRef(true)

  useEffect(() => {
    if (isInitialRenderRef.current) {
      dispatch({
        type: 'LOAD_FILES',
        payload: { files },
      })
    }
  }, [files, dispatch])

  useEffect(() => {
    isInitialRenderRef.current = false
  }, [])

  return (
    <FDContext.Provider value={{ ...memoizedValue }}>
      {children}
    </FDContext.Provider>
  )
}

/**
 * @note
 *  utility hook
 */
const useFD = () => {
  return useContext(FDContext)
}

export { FDContext, FDProvider, useFD }
