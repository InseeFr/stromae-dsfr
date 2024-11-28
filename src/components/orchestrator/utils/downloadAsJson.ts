export function downloadAsJson<T extends object>(params: {
  dataToDownload: T
  filename?: string
}) {
  const { dataToDownload: data, filename = 'data.json' } = params
  if (!data) {
    console.error('No data to download.')
    return
  }

  const jsonData = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonData], { type: 'application/json' })

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename

  document.body.appendChild(a)
  a.click()

  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
