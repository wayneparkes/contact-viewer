'use client'

import Image from 'next/image'
import { useState } from 'react'
import Modal from '../modal/modal'
import Form from '../form/form'
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

function formatDate(date: string, showYear = true) {
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric'
  }

  if (showYear) {
    options.year = 'numeric'
  }

  try {
    return new Intl.DateTimeFormat('en-GB', options).format(new Date(date))
  } catch {
    return date
  }
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
              data.avatar && <Image className={`${styles.avatar} u-photo`} src={data.avatar} alt="" width={200} height={200} priority={true} />
            }
            <figcaption className={`${styles.name} p-name`}>{data.name}</figcaption>
          </figure>

          <button type="button" onClick={() => setEditContact(true)}>Edit</button>
          <button type="button" onClick={() => setDeleteContact(true)}>Delete</button>
        </summary>
        <dl>
          {
            data.email && (
              <>
                <dt>Email</dt>
                <dd><a className="u-email" href={`mailto:${data.email}`}>{data.email}</a></dd>
              </>
            )
          }
          {
            data.phone && (
              <>
                <dt>Phone number</dt>
                <dd><a className="p-tel" href={`tel:${data.phone}`}>{data.phone}</a></dd>
              </>
            )
          }
          {
            data.birthday && (
              <>
                <dt>Birthday</dt>
                <dd><time className="dt-bday" dateTime={data.birthday}>{formatDate(data.birthday, false)}</time></dd>
              </>
            )
          }
          {
            data.createdAt && (
              <>
                <dt>Date created</dt>
                <dd><time dateTime={data.createdAt}>{formatDate(data.createdAt)}</time></dd>
              </>
            )
          }
        </dl>
      </details>

      {
        editContact && (
          <Modal onClose={() => setEditContact(false)}>
            <Form data={data} purpose="edit" onSuccess={() => setEditContact(false)} />
          </Modal>
        )
      }

      {
        deleteContact && (
          <Modal onClose={() => setDeleteContact(false)}>
            <Form data={data} purpose="delete" onSuccess={() => setDeleteContact(false)} />
          </Modal>
        )
      }
    </>
  )
}
