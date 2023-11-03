'use client'

import { useState } from 'react'
import Modal from '../modal/modal'
import Form from '../form/form'
import { ContactModel } from '../contact/contact'
import styles from './header.module.css'

type HeaderProps = {
  searchCriteria: ContactModel[]
}

export default function Search({
  searchCriteria
}: HeaderProps) {
  const [addContact, setAddContact] = useState(false)
  return (
    <header>
      <form className={styles.form}>
        <label className={styles.label} htmlFor="search">Search for a contact</label>
        <input className={styles.input} type="text" id="search" list="contact-names" />
        <datalist id="contact-names">
          {
            searchCriteria.map(({ id, name }) => <option key={id}>{ name }</option>)
          }
        </datalist>
      </form>

      <button className={styles.button} type="button" onClick={() => setAddContact(true)}>Add new contact</button>

      {
        addContact && (
          <Modal onClose={() => setAddContact(false)}>
            <Form purpose="add" onSuccess={() => setAddContact(false)} />
          </Modal>
        )
      }
    </header>
  )
}
