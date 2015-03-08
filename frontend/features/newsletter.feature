Feature: Newsletter

  Scenario: Register new email
    Given I am on the homepage
    When I submit email registration form with "test@test.com"
    Then I should see my email has been registered

  Scenario: Register a wrong email
    Given I am on the homepage
    When I submit email registration form with "test est.com"
    Then I should see my email is not valid
