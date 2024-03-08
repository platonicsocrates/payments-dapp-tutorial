// This function is used to copy the provided text to the clipboard
export const copyContent = async (text: string) => {
  try {
    // We use the navigator.clipboard.writeText() method to write the text to the clipboard
