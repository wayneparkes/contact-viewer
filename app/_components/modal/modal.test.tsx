import { render, screen, fireEvent } from '@testing-library/react'
import Modal from './modal'

test('closing the modal invokes callback', () => {
  const myOnCloseCallback = jest.fn()

  HTMLDialogElement.prototype.showModal = jest.fn()
  HTMLDialogElement.prototype.close = jest.fn()

  render(
    <Modal onClose={myOnCloseCallback}>
      <p data-test="child">Rendered</p>
    </Modal>
  )

  expect(myOnCloseCallback).not.toHaveBeenCalled()

  fireEvent.click(screen.getByTestId('close-modal-button'))

  expect(myOnCloseCallback).toHaveBeenCalled()
})
