import { Dispatch, ReactNode, SetStateAction } from 'react';

export function OpenSidebarButton({
  showSidebar,
  setShowSidebar,
  children,
}: {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}) {
  return (
    <button
      className={`sm:hidden block bg-gray-100 h-full border-l border-gray-200`}
      onClick={() => setShowSidebar(!showSidebar)}
    >
      {children}
    </button>
  );
}
