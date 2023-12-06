export async function copyToClipboard(text: string) {
  try {
    const copiedText = await navigator.clipboard.writeText(text);
  } catch (error) {
    console.log(error);
  }
}
