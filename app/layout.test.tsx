import { render, screen } from '@testing-library/react'
import Layout, { metadata } from './layout'

test('rendering layout with a child component', () => {
  metadata.title = 'Test title'
  metadata.description = 'Test description'

  render(
    <Layout>
      <p data-test="child">Rendered</p>
    </Layout>
  )

  expect(screen.getByTestId('child')).toHaveTextContent('Rendered')
  expect(metadata.title).toBe('Test title')
  expect(metadata.description).toBe('Test description')
})
