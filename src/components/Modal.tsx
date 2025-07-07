import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "motion/react";



interface ModalPropsType {
    children: React.ReactNode,
    isOpen: boolean,
    handleClose: () => void
}


export default function Modal({ children, isOpen, handleClose }: ModalPropsType) {
    return ReactDOM.createPortal(
        <>
            <AnimatePresence>
               { isOpen &&
                    <motion.div 
                        className="fixed bg-black/50 inset-0" onClick={handleClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-1/2 w-min" onClick={(e) => e.stopPropagation() }>
                            { children }
                        </div>
                    </motion.div>
               }
            </AnimatePresence>
        </>, document.getElementById('portal') as Element
    )
}