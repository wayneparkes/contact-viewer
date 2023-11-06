Feature: View Contact Card
  Scenario: Summary View
    Given the user navigates to the "contact viewer" page
    When they view the "contact summary"
    Then they should "see" the "contact name"
    And they should "see" the "contact avatar"
