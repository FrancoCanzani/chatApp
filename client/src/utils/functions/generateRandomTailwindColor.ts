export default function generateRandomTailwindColor() {
  const colors = [
    'gray',
    'red',
    'yellow',
    'green',
    'blue',
    'indigo',
    'purple',
    'pink',
  ];

  const intensities = [700, 800, 900];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomIntensity =
    intensities[Math.floor(Math.random() * intensities.length)];

  return `text-${randomColor}-${randomIntensity}`;
}
