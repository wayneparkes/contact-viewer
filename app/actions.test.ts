import { addContact, editContact, deleteContact } from './actions'
import { ContactModel } from './_components/contact/contact'

global.fetch = jest.fn()

function createFetchResponse(data: ContactModel, ok = true) {
  return {
    ok,
    json: () => new Promise((resolve) => resolve(data))
  }
}

const data = {
  id: '1',
  name: 'Joe Bloggs',
  avatar: 'https://example.com/image.webp',
  email: 'joe.bloggs@example.com',
  phone: '07123456789',
  birthday: '1979-06-19T23:00:00.000Z',
  createdAt: '2023-11-03T12:33:25.772Z'
}

const mockResponse = {
  ...data
}

const formData = new FormData()
formData.append('name', data.name)
formData.append('avatar', data.avatar)
formData.append('email', data.email)
formData.append('phone', data.phone)
formData.append('birthday', data.birthday)

const noBdayFormData = new FormData()
noBdayFormData.append('name', data.name)
noBdayFormData.append('avatar', data.avatar)
noBdayFormData.append('email', data.email)
noBdayFormData.append('phone', data.phone)
noBdayFormData.append('birthday', '')

describe('Create contact service', () => {
  test('makes a POST request to create a contact', async () => {
    (fetch as jest.Mock).mockResolvedValue(createFetchResponse(mockResponse))
  
    const response = await addContact({}, formData)
  
    expect(fetch).toHaveBeenCalledWith(
      'https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData))
      }
    )
  
    expect(response).toStrictEqual(mockResponse)
  })

  test('throws an error when response is bad', async () => {
    (fetch as jest.Mock).mockResolvedValue(createFetchResponse(mockResponse, false))

    let errorMessage = ''

    try {
      await addContact({}, formData)
    } catch (error) {
      errorMessage = (error as Error).message
    }
  
    expect(errorMessage).toBe('Failed to add contact')
  })

  test('makes a request with birthday omitted', async () => {
    const noBdayMockResponse = {
      ...mockResponse,
      birthday: ''
    };

    (fetch as jest.Mock).mockResolvedValue(createFetchResponse(noBdayMockResponse))

    const response = await addContact({}, noBdayFormData)
  
    expect(fetch).toHaveBeenCalledWith(
      'https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(noBdayFormData))
      }
    )
  
    expect(response).toStrictEqual(noBdayMockResponse)
  })
})

describe('Edit contact service', () => {
  test('makes a PUT request to edit a contact', async () => {
    (fetch as jest.Mock).mockResolvedValue(createFetchResponse(mockResponse))
  
    const editFormData = new FormData()
    editFormData.append('id', data.id)
    editFormData.append('name', data.name)
    editFormData.append('avatar', data.avatar)
    editFormData.append('email', data.email)
    editFormData.append('phone', data.phone)
    editFormData.append('birthday', data.birthday)
  
    const response = await editContact({}, editFormData)
  
    expect(fetch).toHaveBeenCalledWith(
      `https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts/${data.id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(Object.fromEntries(formData))
      }
    )
  
    expect(response).toStrictEqual(mockResponse)
  })

  test('throws an error when response is bad', async () => {
    (fetch as jest.Mock).mockResolvedValue(createFetchResponse(mockResponse, false))

    let errorMessage = ''

    try {
      await editContact({}, formData)
    } catch (error) {
      errorMessage = (error as Error).message
    }
  
    expect(errorMessage).toBe('Failed to edit contact')
  })

  test('makes a request with birthday omitted', async () => {
    const noBdayMockResponse = {
      ...mockResponse,
      birthday: ''
    };

    (fetch as jest.Mock).mockResolvedValue(createFetchResponse(noBdayMockResponse))
  
    const noBdayEditFormData = new FormData()
    noBdayEditFormData.append('id', data.id)
    noBdayEditFormData.append('name', data.name)
    noBdayEditFormData.append('avatar', data.avatar)
    noBdayEditFormData.append('email', data.email)
    noBdayEditFormData.append('phone', data.phone)
    noBdayEditFormData.append('birthday', '')
  
    const response = await editContact({}, noBdayEditFormData)
  
    expect(fetch).toHaveBeenCalledWith(
      `https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts/${data.id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(Object.fromEntries(noBdayFormData))
      }
    )
  
    expect(response).toStrictEqual(noBdayMockResponse)
  })
})

describe('Delete contact service', () => {
  test('makes a DELETE request to remove a contact', async () => {
    (fetch as jest.Mock).mockResolvedValue(createFetchResponse(mockResponse))
  
    const deleteFormData = new FormData()
    deleteFormData.append('id', data.id)
  
    const response = await deleteContact({}, deleteFormData)
  
    expect(fetch).toHaveBeenCalledWith(
      `https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts/${data.id}`,
      {
        method: 'DELETE'
      }
    )
  
    expect(response).toStrictEqual(mockResponse)
  })

  test('throws an error when response is bad', async () => {
    (fetch as jest.Mock).mockResolvedValue(createFetchResponse(mockResponse, false))

    let errorMessage = ''

    try {
      await deleteContact({}, formData)
    } catch (error) {
      errorMessage = (error as Error).message
    }
  
    expect(errorMessage).toBe('Failed to delete contact')
  })
})
