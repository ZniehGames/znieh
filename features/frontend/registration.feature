Feature: Registration

  Scenario: Register new user with wrong values
    Given I am on the homepage with registration enabled
    When I submit registration form with wrong values
    Then I should not be registered

  Scenario: Register new user
    Given I am on the homepage with registration enabled
    When I submit registration form with good values
    Then I should be registered

