import type { FDFile } from './types'

export const downloadFile = (file: FDFile) => {
  var anchorElement = document.createElement('a')
  anchorElement.setAttribute('href', file.path)
  anchorElement.setAttribute('download', file.name)
  anchorElement.click()
  anchorElement.remove()
}
