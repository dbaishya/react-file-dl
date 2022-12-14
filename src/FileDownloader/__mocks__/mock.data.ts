export const mockData = [
  /**
   * @note
   *  uncomment mock data for local testing
   */
  // {
  //   name: 'Zoom.pkg',
  //   device: 'Local',
  //   path: '/Users/guest/Downloads/Zoom.pkg',
  //   status: 'available',
  // },
  // {
  //   name: 'Figma.zip',
  //   device: 'Remote',
  //   path: 'https://www.figma.com/download/desktop/mac',
  //   status: 'available',
  // },
  {
    name: 'smss.exe',
    device: 'Stark',
    path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe',
    status: 'scheduled',
  },
  {
    name: 'netsh.exe',
    device: 'Targaryen',
    path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe',
    status: 'available',
  },

  {
    name: 'uxtheme.dll',
    device: 'Lannister',
    path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll',
    status: 'available',
  },

  {
    name: 'cryptbase.dll',
    device: 'Martell',
    path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll',
    status: 'scheduled',
  },

  {
    name: '7za.exe',
    device: 'Baratheon',
    path: '\\Device\\HarddiskVolume1\\temp\\7za.exe',
    status: 'scheduled',
  },
]

export const mockState = {
  allFiles: [...mockData],
  selectedFileIds: [],
  isAllFilesSelected: false,
  isDownloadSelected: false,
}
