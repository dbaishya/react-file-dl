import * as React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Example from './example/Example'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement!)

root.render(
  <StrictMode>
    <Example />
  </StrictMode>
)
