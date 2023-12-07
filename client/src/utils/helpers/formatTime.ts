export default function formatTime(dateString: Date) {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format hours and minutes to ensure two digits (e.g., '03' instead of '3')
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}
