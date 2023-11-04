import { render, screen } from '@testing-library/react'
import Page from './page'
import { ContactModel } from './_components/contact/contact'

global.fetch = jest.fn()

function createFetchResponse(data: ContactModel[], ok = true) {
  return {
    ok,
    json: () => new Promise((resolve) => resolve(data))
  }
}

const mockResponse = [
  {
    id: '1',
    name: 'Joe Bloggs',
    avatar: 'https://example.com/image.webp',
    email: 'joe.bloggs@example.com',
    phone: '07123456789',
    birthday: '1979-06-19T23:00:00.000Z',
    createdAt: '2023-11-03T12:33:25.772Z'
  }
]

test('rendering with a data array', async () => {
  (fetch as jest.Mock).mockResolvedValue(createFetchResponse(mockResponse))

  render(await Page())

  expect(fetch).toHaveBeenCalledWith(
    'https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts',
    {
      cache: 'no-store'
    }
  )

  expect(screen.getByTestId('contact-name')).toHaveTextContent('Joe Bloggs')
})

test('rendering with an empty data array', async () => {
  (fetch as jest.Mock).mockResolvedValue(createFetchResponse([]))

  render(await Page())

  expect(fetch).toHaveBeenCalledWith(
    'https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts',
    {
      cache: 'no-store'
    }
  )

  expect(screen.getByTestId('no-contacts-text')).toBeInTheDocument()
})

test('throws an error when response is bad', async () => {
  (fetch as jest.Mock).mockResolvedValue(createFetchResponse(mockResponse, false))

  let errorMessage = ''

  try {
    render(await Page())
  } catch (error) {
    errorMessage = (error as Error).message
  }

  expect(errorMessage).toBe('Failed to fetch contacts')
})
