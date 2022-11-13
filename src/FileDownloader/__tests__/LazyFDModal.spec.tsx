import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import { mockData } from '../__mocks__/mock.data'
import { FDProvider, useFD } from '../FDProvider'
import { LazyFDModal } from '../LazyFDModal'
import type { FDFile } from '../types'

// mock FDProvider
jest.mock('../FDProvider', () => ({
  ...jest.requireActual('../FDProvider'),
  __esModule: true,
  useFD: jest.fn(),
}))

function MockFDModal() {
  return <div>Mock FDModal</div>
}

// mock lazy FDModal
jest.mock('../FDModal', () => {
  return MockFDModal
})

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

describe('LazyFDModal', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })
  it('should render an empty DOM element', () => {
    ;(useFD as jest.Mock).mockImplementation(() => {
      return {
        state: {
          allFiles: [],
          isDownloadSelected: false,
        },
        dispatch: jest.fn(),
      }
    })
    const { container } = setup(<LazyFDModal />, {})
    expect(container).toBeEmptyDOMElement()
  })

  it('should render modal', async () => {
    ;(useFD as jest.Mock).mockImplementation(() => {
      return {
        state: {
          allFiles: mockData,
          selectedFileIds: mockData
            .filter((aFile) => aFile.status === 'available')
            .map((aFile) => aFile.path),
          isAllFilesSelected: false,
          isDownloadSelected: true,
        },
        dispatch: jest.fn(),
      }
    })
    const { container } = setup(<LazyFDModal />, {})
    await waitFor(() => {
      expect(screen.queryByText('Mock FDModal')).toBeInTheDocument()
    })
  })
})
