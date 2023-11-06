/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: () => null
  })
}))

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: () => ([]),
  useFormStatus: () => ({})
}))

import Form from './form'

const myOnSuccessCallback = jest.fn()

const data = {
  id: '1',
  name: 'Joe Bloggs',
  createdAt: '2023-11-03T12:33:25.772Z',
  avatar: 'https://example.com/image.webp',
  email: 'joe.bloggs@example.com',
  phone: '07123456789',
  birthday: '1979-06-19T23:00:00.000Z'
}

test('render a form with the purpose of adding', () => {
  render(<Form purpose="add" onSuccess={myOnSuccessCallback} />)

  expect(screen.getByTestId('form-title')).toHaveTextContent('Add New Contact')

  expect(document.querySelector('[data-test="contact-id"]')).not.toBeInTheDocument()

  expect(document.querySelector('[data-test="contact-avatar"]')).not.toBeInTheDocument()
  expect(document.querySelector('[data-test="contact-name"]')).not.toBeInTheDocument()

  expect(screen.getByTestId('input-contact-name')).toBeInTheDocument()
  expect(screen.getByTestId('input-contact-avatar')).toBeInTheDocument()
  expect(screen.getByTestId('input-contact-email')).toBeInTheDocument()
  expect(screen.getByTestId('input-contact-phone')).toBeInTheDocument()
  expect(screen.getByTestId('input-contact-bday')).toBeInTheDocument()

  expect(screen.getByTestId('submit-button')).toHaveTextContent('Save')
})

test('render a form with the purpose of editing', () => {
  render(<Form data={data} purpose="edit" onSuccess={myOnSuccessCallback} />)

  expect(screen.getByTestId('form-title')).toHaveTextContent('Edit Contact')

  expect(screen.getByTestId('contact-id')).toBeInTheDocument()

  expect(document.querySelector('[data-test="contact-avatar"]')).not.toBeInTheDocument()
  expect(document.querySelector('[data-test="contact-name"]')).not.toBeInTheDocument()

  expect(screen.getByTestId('input-contact-name')).toHaveValue('Joe Bloggs')
  expect(screen.getByTestId('input-contact-avatar')).toHaveValue('https://example.com/image.webp')
  expect(screen.getByTestId('input-contact-email')).toHaveValue('joe.bloggs@example.com')
  expect(screen.getByTestId('input-contact-phone')).toHaveValue('07123456789')
  expect(document.querySelector('[data-test="input-contact-bday"]')?.getAttribute('value')).toBe('1979-06-19')

  expect(screen.getByTestId('submit-button')).toHaveTextContent('Update')
})

test('render a form with the purpose of deleting', () => {
  render(<Form data={data} purpose="delete" onSuccess={myOnSuccessCallback} />)

  expect(screen.getByTestId('form-title')).toHaveTextContent('Delete Contact')

  expect(screen.getByTestId('contact-id')).toBeInTheDocument()

  expect(screen.getByTestId('contact-avatar')).toBeInTheDocument()
  expect(screen.getByTestId('contact-name')).toBeInTheDocument()

  expect(document.querySelector('[data-test="input-contact-name"]')).not.toBeInTheDocument()
  expect(document.querySelector('[data-test="input-contact-avatar"]')).not.toBeInTheDocument()
  expect(document.querySelector('[data-test="input-contact-email"]')).not.toBeInTheDocument()
  expect(document.querySelector('[data-test="input-contact-phone"]')).not.toBeInTheDocument()
  expect(document.querySelector('[data-test="input-contact-bday"]')).not.toBeInTheDocument()

  expect(screen.getByTestId('submit-button')).toHaveTextContent('Yes, I\'m sure')
})
