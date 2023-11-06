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

type StateModel = {
  moreDetails: boolean,
  editMode: boolean,
  deleteMode: boolean
}

export default function Contact(data: ContactModel) {
  const [state, setState] = useState<StateModel>({ moreDetails: false, editMode: false, deleteMode: false })
  const updateState = (nextState: Partial<StateModel>) => {
    setState(prevState => ({ ...prevState, ...nextState }))
  }

  return (
    <>
      <details key={data.id} className={`${styles.card} h-card`} open={state.moreDetails}>
        <summary className={styles.cardSummary} {...testId('contact-summary')}>
          <figure className={styles.cardFigure}>
            {
              data.avatar && <Image className={`${styles.avatar} u-photo`} src={data.avatar} alt="" width={200} height={200} priority={true} {...testId('contact-avatar')} />
            }
            <figcaption className={`${styles.name} p-name`} {...testId('contact-name')}>{data.name}</figcaption>
          </figure>

          <div className={styles.actions}>
            <button type="button" onClick={() => updateState({ moreDetails: !state.moreDetails })}>{state.moreDetails ? 'Less' : 'More'} details</button>
            <button type="button" onClick={() => updateState({ editMode: true })} {...testId('edit-contact-button')}>Edit</button>
            <button type="button" onClick={() => updateState({ deleteMode: true })} {...testId('delete-contact-button')}>Delete</button>
          </div>
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
        state.editMode && (
          <Modal onClose={() => updateState({ editMode: false })} {...testId('edit-contact-modal')}>
            <Form data={data} purpose="edit" onSuccess={() => updateState({ editMode: false })} />
          </Modal>
        )
      }

      {
        state.deleteMode && (
          <Modal onClose={() => updateState({ deleteMode: false })} {...testId('delete-contact-modal')}>
            <Form data={data} purpose="delete" onSuccess={() => updateState({ deleteMode: false })} />
          </Modal>
        )
      }
    </>
  )
}
