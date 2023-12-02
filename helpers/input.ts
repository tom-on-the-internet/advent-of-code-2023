export async function getInputAsArray(filepath: string): Promise<string[]> {
  const file = Bun.file(filepath)
  const text = await file.text()
  return text.trim().split("\n")
}
