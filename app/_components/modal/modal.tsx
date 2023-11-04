'use client'

import { useEffect, useRef } from 'react'
import testId from '../../_utils/testId'
import styles from './modal.module.css'

type ModalProps = {
  children: React.ReactNode,
  onClose: () => void
}

export default function Modal({
  children,
  onClose
}: ModalProps) {
  const dialogElement = useRef<HTMLDialogElement>(null)

  const closeModal = () => {
    (dialogElement.current as HTMLDialogElement).close()
    onClose()
  }

  useEffect(() => {
    (dialogElement.current as HTMLDialogElement).showModal()
  }, [])

  return (
    <dialog className={styles.modal} ref={dialogElement} onCancel={closeModal}>
      {children}
      <button className={styles.close} type="button" onClick={closeModal} {...testId('close-modal-button')}>Close</button>
    </dialog>
  )
}
