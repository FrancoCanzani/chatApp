import { Toaster } from 'sonner';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster closeButton={true} />
    </>
  );
}
