import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { mockData } from '../__mocks__/mock.data'
import { FDHeader } from '../FDHeader'
import { FDProvider } from '../FDProvider'
import type { FDFile } from '../types'

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

describe('FDHeader', () => {
  it('should render header', () => {
    const aFile = mockData[0] as FDFile
    const _ = setup(<FDHeader />, {})
    Object.keys(aFile).forEach((aFileKey) => {
      expect(screen.getByText(aFileKey)).toBeInTheDocument()
    })
  })
})
