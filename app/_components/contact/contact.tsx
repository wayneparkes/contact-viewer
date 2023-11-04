'use client'

import Image from 'next/image'
import { useState } from 'react'
import Modal from '../modal/modal'
import Form from '../form/form'
import testId from '../../_utils/testId'
import formatDate from '../../_utils/formatDate'
import styles from './contact.module.css'

export type ContactModel = {
  id: string
  createdAt: string
  name: string
  avatar?: string
  email?: string
  phone?: string
  birthday?: string
}

export default function Contact(data: ContactModel) {
  const [editContact, setEditContact] = useState(false)
  const [deleteContact, setDeleteContact] = useState(false)

  return (
    <>
      <details key={data.id} className={`${styles.card} h-card`}>
        <summary className={styles.cardSummary}>
          <figure className={styles.cardFigure}>
            {
              data.avatar && <Image className={`${styles.avatar} u-photo`} src={data.avatar} alt="" width={200} height={200} priority={true} {...testId('contact-avatar')} />
            }
            <figcaption className={`${styles.name} p-name`} {...testId('contact-name')}>{data.name}</figcaption>
          </figure>

          <button type="button" onClick={() => setEditContact(true)} {...testId('edit-contact-button')}>Edit</button>
          <button type="button" onClick={() => setDeleteContact(true)} {...testId('delete-contact-button')}>Delete</button>
        </summary>
        <dl>
          {
            data.email && (
              <>
                <dt>Email</dt>
                <dd><a className="u-email" href={`mailto:${data.email}`} {...testId('contact-email')}>{data.email}</a></dd>
              </>
            )
          }
          {
            data.phone && (
              <>
                <dt>Phone number</dt>
                <dd><a className="p-tel" href={`tel:${data.phone}`} {...testId('contact-phone')}>{data.phone}</a></dd>
              </>
            )
          }
          {
            data.birthday && (
              <>
                <dt>Birthday</dt>
                <dd><time className="dt-bday" dateTime={data.birthday} {...testId('contact-bday')}>{formatDate(data.birthday, false)}</time></dd>
              </>
            )
          }
          {
            data.createdAt && (
              <>
                <dt>Date created</dt>
                <dd><time dateTime={data.createdAt} {...testId('contact-createdAt')}>{formatDate(data.createdAt)}</time></dd>
              </>
            )
          }
        </dl>
      </details>

      {
        editContact && (
          <Modal onClose={() => setEditContact(false)} {...testId('edit-contact-modal')}>
            <Form data={data} purpose="edit" onSuccess={() => setEditContact(false)} />
          </Modal>
        )
      }

      {
        deleteContact && (
          <Modal onClose={() => setDeleteContact(false)} {...testId('delete-contact-modal')}>
            <Form data={data} purpose="delete" onSuccess={() => setDeleteContact(false)} />
          </Modal>
        )
      }
    </>
  )
}
