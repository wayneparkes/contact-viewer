'use client'

import { ContactModel } from './_components/contact/contact'

type FormDataModelAdd = Omit<ContactModel, 'id' | 'createdAt'>
type FormDataModelEdit = Omit<ContactModel, 'createdAt'>
type FormDataModelDelete = Pick<ContactModel, 'id'>

const apiBaseUrl = 'https://61c32f169cfb8f0017a3e9f4.mockapi.io'
const apiPath = 'api/v1/contacts'

export async function addContact(prevState: any, formData: FormData) {
  const { birthday, ...contact } = Object.fromEntries(formData) as FormDataModelAdd
  const payload: FormDataModelAdd = {
    ...contact,
    birthday: birthday ? new Date(birthday).toISOString() : ''
  }

  const res = await fetch(
    `${apiBaseUrl}/${apiPath}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
  )

  if (!res.ok) {
    throw new Error('Failed to add contact')
  }

  return res.json()
}

export async function editContact(prevState: any, formData: FormData) {
  const { id, birthday, ...contact } = Object.fromEntries(formData) as FormDataModelEdit
  const payload: FormDataModelAdd = {
    ...contact,
    birthday: birthday ? new Date(birthday).toISOString() : ''
  }

  const res = await fetch(
    `${apiBaseUrl}/${apiPath}/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
  )

  if (!res.ok) {
    throw new Error('Failed to edit contact')
  }

  return res.json()
}

export async function deleteContact(prevState: any, formData: FormData) {
  const { id } = Object.fromEntries(formData) as FormDataModelDelete

  const res = await fetch(
    `${apiBaseUrl}/${apiPath}/${id}`,
    {
      method: 'DELETE'
    }
  )

  if (!res.ok) {
    throw new Error('Failed to delete contact')
  }

  return res.json()
}
