import css from "../Modal/Modal.module.css"
import { createPortal } from "react-dom";
import { useEffect} from 'react';

interface NoteModalProps {
  onClose: () => void
}
export default function Modal ({onClose}: NoteModalProps) {
   const handleBackdropsClick = (event: React.MouseEvent<HTMLDivElement>) => {
   if (event.target === event.currentTarget) {
    onClose();
     }
   }
   useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

       return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
     }
    }, [onClose])
   
return createPortal(
  <div
  onClick={handleBackdropsClick}
  className={css.backdrop}
  role="dialog"
  aria-modal="true"
>
  <div className={css.modal}>
    <button 
       className={css.closeButton}
       onClick={onClose}
       aria-label="Close modal"
       >
      &times;
    </button>
  </div>
</div>,
  document.body
    )
}