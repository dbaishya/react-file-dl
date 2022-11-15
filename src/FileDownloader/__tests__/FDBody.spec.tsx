import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { mockData, mockState } from '../__mocks__/mock.data'
import { FDBody } from '../FDBody'
import { FDProvider } from '../FDProvider'
import type { FDFile } from '../types'

const mockDispatch = jest.fn()

jest.mock('../FDProvider', () => ({
  ...jest.requireActual('../FDProvider'),
  __esModule: true,
  useFD: () => ({
    dispatch: mockDispatch,
    state: { ...mockState },
  }),
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

describe('FDBody', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should render header', () => {
    const _ = setup(<FDBody />, {})
    mockData.forEach(({ name, device, path }) => {
      expect(screen.getByText(name)).toBeInTheDocument()
      expect(screen.getByText(device)).toBeInTheDocument()
      expect(screen.getByText(path)).toBeInTheDocument()
    })
  })

  it('should dispatch TOGGLE_SELECT_FILE action on click', () => {
    const availableFile = mockData.filter(
      (aFile) => aFile.status === 'available'
    )[0] as FDFile
    const _ = setup(<FDBody />, {})
    act(() => {
      fireEvent.click(screen.getByText(availableFile.path))
    })
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'TOGGLE_SELECT_FILE',
      payload: { id: availableFile.path },
    })
  })
})
