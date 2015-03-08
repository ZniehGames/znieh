Feature: Game search

  Scenario: I want to login
    Given I am on the homepage
    When I submit login form as test
    Then I should be redirected to the search page
