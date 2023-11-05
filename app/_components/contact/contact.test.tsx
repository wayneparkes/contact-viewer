/* eslint-disable testing-library/no-node-access */
import { render, screen, fireEvent } from '@testing-library/react'

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

import Contact from './contact'

const data = {
  id: '1',
  name: 'Joe Bloggs',
  createdAt: '2023-11-03T12:33:25.772Z'
}

const optionalData = {
  avatar: 'https://example.com/image.webp',
  email: 'joe.bloggs@example.com',
  phone: '07123456789',
  birthday: '1979-06-19T23:00:00.000Z'
}

test('rendering with data', () => {
  render(<Contact {...data} {...optionalData} />)

  expect(screen.getByTestId('contact-avatar')).toBeInTheDocument()
  expect(screen.getByTestId('contact-name')).toHaveTextContent('Joe Bloggs')
  expect(screen.getByTestId('contact-email')).toHaveTextContent('joe.bloggs@example.com')
  expect(screen.getByTestId('contact-phone')).toHaveTextContent('07123456789')
  expect(screen.getByTestId('contact-bday')).toHaveTextContent('20 June')
  expect(screen.getByTestId('contact-createdAt')).toHaveTextContent('3 November 2023')
})

test('rendering with optional data omitted', () => {
  render(<Contact {...data} />)

  expect(document.querySelector('[data-test="contact-avatar"]')).not.toBeInTheDocument()
  expect(screen.getByTestId('contact-name')).toHaveTextContent('Joe Bloggs')
  expect(document.querySelector('[data-test="contact-email"]')).not.toBeInTheDocument()
  expect(document.querySelector('[data-test="contact-phone"]')).not.toBeInTheDocument()
  expect(document.querySelector('[data-test="contact-bday"]')).not.toBeInTheDocument()
  expect(screen.getByTestId('contact-createdAt')).toHaveTextContent('3 November 2023')
})

test('displaying the edit contact modal', () => {
  const showEditModal = jest.fn()
  HTMLDialogElement.prototype.showModal = showEditModal

  render(<Contact {...data} />)

  expect(showEditModal).not.toHaveBeenCalled()

  fireEvent.click(screen.getByTestId('edit-contact-button'))

  expect(showEditModal).toHaveBeenCalled()
})

test('displaying the delete contact modal', () => {
  const showDeleteModal = jest.fn()
  HTMLDialogElement.prototype.showModal = showDeleteModal

  render(<Contact {...data} />)

  expect(showDeleteModal).not.toHaveBeenCalled()

  fireEvent.click(screen.getByTestId('delete-contact-button'))

  expect(showDeleteModal).toHaveBeenCalled()
})
