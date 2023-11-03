'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { ContactModel } from '../contact/contact'
import { addContact, editContact, deleteContact } from '../../actions'

type FormProps = {
  data?: ContactModel,
  purpose: 'add' | 'edit' | 'delete',
  onSuccess: () => void
}

const initialState = {
  message: null
}

const formConfigs = {
  add: { action: addContact, actionText: 'Add New', buttonText: 'Save'  },
  edit: { action: editContact, actionText: 'Edit', buttonText: 'Update' },
  delete: { action: deleteContact, actionText: 'Delete', buttonText: 'Yes, I\'m sure' }
}

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending}>{text}</button>
  )
}

export default function Form({
  data,
  purpose,
  onSuccess
}: FormProps) {
  const config = formConfigs[purpose]
  const router = useRouter()
  const [state, formAction] = useFormState(config.action, initialState)

  useEffect(() => {
    // check for when state represents the formAction's payload
    if (JSON.stringify(state) !== JSON.stringify(initialState)) {
      router.refresh()
      onSuccess()
    }
  }, [state])

  return (
    <>
      <h2>{config.actionText} Contact</h2>
      <form action={formAction}>
        {
          /edit|delete/.test(purpose) && <input type="hidden" name="id" defaultValue={data?.id} />
        }

        {
          purpose === 'delete' && (
            <>
              <p>Are you sure you want to delete the following contact?</p>
              <figure>
                {
                  data?.avatar && <Image src={data.avatar} alt="" width={100} height={100} />
                }
                <figcaption>{data?.name}</figcaption>
              </figure>
            </>
          )
        }

        {
          purpose !== 'delete' && (
            <>
              <div className="form-row">
                <label htmlFor="name">Contact name</label>
                <input type="text" id="name" name="name" defaultValue={purpose === 'edit' ? data?.name : undefined } required />
              </div>

              <div className="form-row">
                <label htmlFor="avatar">Avatar image URL</label>
                <input type="url" id="avatar" name="avatar" defaultValue={purpose === 'edit' ? data?.avatar : undefined } />
              </div>

              <div className="form-row">
                <label htmlFor="email">Contact email address</label>
                <input type="email" id="email" name="email" defaultValue={purpose === 'edit' ? data?.email : undefined } />
              </div>

              <div className="form-row">
                <label htmlFor="phone">Contact phone number</label>
                <input type="tel" id="phone" name="phone" defaultValue={purpose === 'edit' ? data?.phone : undefined } />
              </div>

              <div className="form-row">
                <label htmlFor="birthday">Contact&apos;s birthday</label>
                <input type="date" id="birthday" name="birthday" defaultValue={purpose === 'edit' ? data?.birthday : undefined } />
              </div>
            </>
          )
        }

        <SubmitButton text={config.buttonText} />

        <p aria-live="polite" className="sr-only" role="status">
          {state?.message}
        </p>
      </form>
    </>
  )
}