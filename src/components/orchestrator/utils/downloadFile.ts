/** Generic file download utility */
function downloadFile({
  content,
  filename,
  mimeType,
}: {
  content: string
  filename: string
  mimeType: string
}) {
  if (!content) {
    console.error('No data to download.')
    return
  }

  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = filename

  document.body.appendChild(a)
  a.click()

  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/** Download provided data as a JSON file */
export function downloadAsJson<T extends object>({
  dataToDownload,
  filename = 'data.json',
}: {
  dataToDownload: T
  filename?: string
}) {
  if (!dataToDownload) {
    console.error('No data to download.')
    return
  }

  const jsonData = JSON.stringify(dataToDownload, null, 2)

  downloadFile({
    content: jsonData,
    filename,
    mimeType: 'application/json',
  })
}

/** Download a CSV string as a file */
export function downloadAsCsv({
  dataToDownload,
  filename = 'data.csv',
}: {
  dataToDownload: string
  filename?: string
}) {
  downloadFile({
    content: dataToDownload,
    filename,
    mimeType: 'text/csv',
  })
}
