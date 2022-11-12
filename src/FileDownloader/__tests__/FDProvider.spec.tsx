import React from 'react'
import { act, renderHook, waitFor } from '@testing-library/react'
import { mockData } from '../__mocks__/mock.data'
import { FDProvider, useFD } from '../FDProvider'
import type { FDFile } from '../types'

const setup = ({
  mockDataOverrides,
}: {
  mockDataOverrides?: Array<FDFile>
}) => {
  return renderHook(() => useFD(), {
    wrapper: ({ children }) => (
      <FDProvider files={mockDataOverrides ?? (mockData as FDFile[])}>
        {children}
      </FDProvider>
    ),
  })
}

describe('FDProvider', () => {
  it('should init context', async () => {
    const {
      result: { current },
    } = setup({})
    const {
      state: {
        allFiles,
        selectedFileIds,
        isAllFilesSelected,
        isDownloadSelected,
      },
    } = current

    await waitFor(() => {
      expect(allFiles.length).toEqual(mockData.length)
      expect(selectedFileIds.length).toEqual(0)
      expect(isAllFilesSelected).toBe(false)
      expect(isDownloadSelected).toBe(false)
    })
  })

  it('should toggle a file selection with TOGGLE_SELECT_FILE action ', async () => {
    const aFile = mockData.filter((aFile) => aFile.status === 'available')[0]
    const { result } = setup({})
    const {
      current: {
        state: { selectedFileIds },
        dispatch,
      },
    } = result

    // initial
    expect(selectedFileIds.includes(aFile.path)).toBe(false)

    // dispatch toggle to select
    act(() => {
      dispatch({
        type: 'TOGGLE_SELECT_FILE',
        payload: { id: aFile.path },
      })
    })
    await waitFor(() => {
      expect(result.current.state.selectedFileIds.includes(aFile.path)).toBe(
        true
      )
    })

    // dispatch toggle to unselect
    act(() => {
      dispatch({
        type: 'TOGGLE_SELECT_FILE',
        payload: { id: aFile.path },
      })
    })
    await waitFor(() => {
      expect(result.current.state.selectedFileIds.includes(aFile.path)).toBe(
        false
      )
    })
  })

  it('should toggle `available` files selection with TOGGLE_SELECT_ALL_FILES action', async () => {
    const allAvailableMockData: FDFile[] = mockData.map((aFile) => ({
      ...aFile,
      status: 'available',
    }))
    const { result } = setup({
      mockDataOverrides: [...allAvailableMockData],
    })
    const {
      current: {
        state: { selectedFileIds },
        dispatch,
      },
    } = result

    // initial
    expect(selectedFileIds.length).toEqual(0)

    // dispatch toggle to select all ~ ONLY available files are selected
    act(() => {
      dispatch({
        type: 'TOGGLE_SELECT_ALL_FILES',
      })
    })
    await waitFor(() => {
      expect(result.current.state.selectedFileIds.length).toEqual(
        allAvailableMockData.length
      )
    })

    // dispatch toggle to unselect all
    act(() => {
      dispatch({
        type: 'TOGGLE_SELECT_ALL_FILES',
      })
    })
    await waitFor(() => {
      expect(result.current.state.selectedFileIds.length).toEqual(0)
    })
  })

  it('should set isDownloadSelected to true with DOWNLOAD_SELECTED action', async () => {
    const { result } = setup({})
    const {
      current: {
        state: { isDownloadSelected },
        dispatch,
      },
    } = result

    // initial
    expect(isDownloadSelected).toBe(false)

    // dispatch to set isDownloadSelected to true
    act(() => {
      dispatch({
        type: 'DOWNLOAD_SELECTED',
      })
    })
    await waitFor(() => {
      expect(result.current.state.isDownloadSelected).toBe(true)
    })
  })

  it('should set isDownloadSelected to false with CLOSE_DOWNLOAD_BOX action', async () => {
    const { result } = setup({})
    const {
      current: { dispatch },
    } = result

    // prepare
    act(() => {
      dispatch({
        type: 'DOWNLOAD_SELECTED',
      })
    })
    await waitFor(() => {
      expect(result.current.state.isDownloadSelected).toBe(true)
    })

    // dispatch to set isDownloadSelected to false
    act(() => {
      dispatch({
        type: 'CLOSE_DOWNLOAD_BOX',
      })
    })
    await waitFor(() => {
      expect(result.current.state.isDownloadSelected).toBe(false)
    })
  })
})
