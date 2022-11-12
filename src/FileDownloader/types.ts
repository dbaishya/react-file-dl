/**
 * @note
 *  adopted naming convention - using `FD` as the prefix
 *  for various type and variable names, which are internal
 *  to the file downloader component.
 *  @example -
 *    FDFile to represent file downloader file
 *    FDProvider and FDContext to represent file downloader
 *      provider and context.
 */

export type FDFile = {
  name: string // 'smss.exe'
  device: string // 'Stark',
  path: string // '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe',
  status: 'available' | 'scheduled'
}

/**
 * @note
 *  helper util
 */
type ValueOf<T> = T[keyof T]

/**
 * @note
 *  unique ID - in the absence of an unique ID in the file
 *  object, we are using its `path` property as the ID.
 */
export type FDFileId = ValueOf<Pick<FDFile, 'path'>>

export type FDFileStatus = ValueOf<Pick<FDFile, 'status'>>
