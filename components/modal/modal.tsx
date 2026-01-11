import Button from "../button/button";
import styles from "./modal.module.css";
import { ComponentProps, ReactNode, useId, useRef, forwardRef, useImperativeHandle } from "react";

interface Props extends ComponentProps<"dialog"> {
  children: ReactNode;
  title: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export interface ModalRef {
  open: () => void;
  close: () => void;
}

const Modal = forwardRef<ModalRef, Props>(function Modal({ children, title, onCancel, onConfirm, ...props }, ref) {
  const id = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }));

  const handleCancel = () => {
    onCancel && onCancel();
    dialogRef.current?.close();
  };

  const handleConfirm = () => {
    onConfirm && onConfirm();
    dialogRef.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.modal}
      aria-labelledby={`modal-title-${id}`}
      aria-describedby={`modal-description-${id}`}
      closedby="any"
      {...props}
    >
      <section>
        <header>
          <h1 id={`modal-title-${id}`}>{title}</h1>

          <Button variant="secondary" iconBefore="x-close" hiddenLabel onClick={() => dialogRef.current?.close()}>
            Close modal
          </Button>
        </header>

        <div id={`modal-description-${id}`}>{children}</div>

        {(onCancel || onConfirm) && (
          <footer>
            {onCancel && (
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            )}
            {onConfirm && (
              <Button variant="primary" onClick={handleConfirm}>
                Confirm
              </Button>
            )}
          </footer>
        )}
      </section>
    </dialog>
  );
});

export default Modal;
