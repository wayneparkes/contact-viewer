import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { navigate, getElementByDataTestRef } from './utils'

Given('the user navigates to the {string} page', navigate)

When("they view the {string}", function (ref: string) {
  getElementByDataTestRef(ref).eq(0).should('be.visible')
})

Then('they should {string} the {string}', (visibility: string, ref: string) => {
  const assertion = visibility === 'see' ? 'be.visible' : 'not.be.visible'
  getElementByDataTestRef(ref).eq(0).should(assertion)
})
