import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { mockData, mockState } from '../__mocks__/mock.data'
import { FDControl } from '../FDControl'
import { FDProvider } from '../FDProvider'
import { constants } from '../constants'
import type { FDFile } from '../types'
import { downloadFile } from '../utils'

const mockDispatch = jest.fn()

const {
  labels: { fdCtrl },
} = constants

const mockSelectedFileIds = mockData
  .filter((aFile) => aFile.status === 'available')
  .map((aFile) => aFile.path)

jest.mock('../FDProvider', () => ({
  ...jest.requireActual('../FDProvider'),
  __esModule: true,
  useFD: () => ({
    dispatch: mockDispatch,
    state: {
      ...mockState,
      selectedFileIds: [...mockSelectedFileIds],
      isAllFilesSelected: false,
      isDownloadSelected: false,
    },
  }),
}))

jest.mock('../utils', () => ({
  __esModule: true,
  downloadFile: jest.fn(),
}))

const setup = (
  children: React.ReactNode,
  {
    mockDataOverrides,
  }: {
    mockDataOverrides?: FDFile[]
  }
) => {
  return render(
    <FDProvider files={mockDataOverrides ?? (mockData as FDFile[])}>
      {children}
    </FDProvider>
  )
}

describe('FDControl', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should render control', () => {
    const _ = setup(<FDControl />, {})
    // select/unselect all
    expect(screen.getByLabelText(fdCtrl.selectAllAria)).toBeInTheDocument()
    // selected [x]
    expect(
      screen.getByText(`${fdCtrl.selected} ${mockSelectedFileIds.length}`)
    ).toBeInTheDocument()
    // download selected
    expect(screen.getByText(fdCtrl.dlSelected)).toBeInTheDocument()
  })

  it('should dispatch TOGGLE_SELECT_ALL_FILES action on click', () => {
    const _ = setup(<FDControl />, {})
    act(() => {
      fireEvent.click(screen.getByLabelText(fdCtrl.selectAllAria))
    })
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'TOGGLE_SELECT_ALL_FILES',
    })
  })

  it('should dispatch TOGGLE_SELECT_ALL_FILES action on click', () => {
    const _ = setup(<FDControl />, {})
    act(() => {
      fireEvent.click(screen.getByText(fdCtrl.dlSelected))
    })
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'DOWNLOAD_SELECTED',
    })
    expect(downloadFile).toHaveBeenCalledTimes(mockSelectedFileIds.length)
  })
})
