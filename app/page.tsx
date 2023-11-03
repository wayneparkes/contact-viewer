import Contact, { ContactModel } from './_components/contact/contact'
import styles from './page.module.css'
import Header from './_components/header/header'

async function getAllContacts(): Promise<ContactModel[]> {
  const res = await fetch(
    'https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts',
    {
      cache: 'no-store'
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch contacts')
  }

  return res.json()
}

export default async function Page() {
  const contacts = await getAllContacts()
  return (
    <>
      <Header searchCriteria={contacts} />
      <main className={styles.main}>
        {
          !contacts.length && <p>You don&apos;t have any contacts yet&hellip;</p>
        }
        {
          contacts.length > 0 && contacts.map(contact => <Contact key={contact.id} {...contact} />)
        }
      </main>
    </>
  )
}
