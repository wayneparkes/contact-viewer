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

import Header from './header'

const data = [
  {
    id: '1',
    name: 'Joe Bloggs',
    createdAt: '2023-11-03T12:33:25.772Z'
  },
  {
    id: '2',
    name: 'John Smith',
    createdAt: '2023-11-03T12:33:25.772Z'
  }
]

test('rendering with data', () => {
  render(<Header searchCriteria={data} />)

  const options = document.querySelectorAll('[data-test="datalist-option"]')

  expect(options.length).toBe(2)
  expect(options[0].textContent).toBe('Joe Bloggs')
  expect(options[1].textContent).toBe('John Smith')
})

test('displaying the add contact modal', () => {
  const showAddModal = jest.fn()
  HTMLDialogElement.prototype.showModal = showAddModal

  render(<Header searchCriteria={data} />)

  expect(showAddModal).not.toHaveBeenCalled()

  fireEvent.click(screen.getByTestId('add-contact-button'))

  expect(showAddModal).toHaveBeenCalled()
})
