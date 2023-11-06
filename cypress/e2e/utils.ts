export const { baseUrl }: Cypress.Config = Cypress.config()

const pages: {[key: string]: string} = {
  'contact viewer': baseUrl || ''
}

export const getElementByDataTestRef = (ref: string) => {
  const testId = ref.split(' ').join('-').toLowerCase()
  return cy.get(`[data-test="${testId}"]`)
}

export const navigate = (ref: string) => {
  const url = pages[ref]
  if (!url) {
    throw new Error('navigate reports that the url is missing')
  }
  cy.visit(url)
  cy.url().should('include', url)
}

export const pending = () => 'step is pending...'
