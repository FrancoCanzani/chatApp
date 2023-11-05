export function ConnectionState({ isConnected }: { isConnected: boolean }) {
  return <p>Connected?: {isConnected.toString()}</p>;
}
