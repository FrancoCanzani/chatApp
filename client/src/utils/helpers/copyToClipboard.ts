import { toast } from 'sonner';

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('Room ID copied to clipboard');
  } catch (error) {
    toast.error('Error copying to clipboard');
  }
}
