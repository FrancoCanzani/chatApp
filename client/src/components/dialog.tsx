import React, {
  DialogHTMLAttributes,
  Dispatch,
  ReactNode,
  SetStateAction,
  useRef,
} from 'react';

interface DialogProps extends DialogHTMLAttributes<HTMLDialogElement> {
  children: ReactNode;
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
}

export default function Dialog({
  children,
  showDialog,
  setShowDialog,
  ...props
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeDialog = () => {
    dialogRef.current?.close();
    setShowDialog(false);
  };

  if (showDialog) {
    dialogRef.current?.showModal();
  } else {
    dialogRef.current?.close();
  }

  return (
    <dialog ref={dialogRef} {...props}>
      {children}
    </dialog>
  );
}
