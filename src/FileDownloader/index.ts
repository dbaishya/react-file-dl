import { FileDownloader } from './FileDownloader'

export type { FDFile, FDFileId } from './types'

/**
 * @note
 *  perf - default export is required to enable
 *  lazy loading of FileDownloader component
 *  by the consumer.
 */
export default FileDownloader
