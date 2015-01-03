Feature: Unlock

  Background:
    Given the database contains fixtures

  Scenario: Anonymous want to unlock a gameobject
    When I send a POST request to "/unlocks" with json:
"""
{
  "object": 1
}
"""
    Then the response status code should be 400

  Scenario: Logged in user with enough currencies wants to unlock a gameobject
    Given I am logged in as "test"
    When I send a POST request to "/unlocks" with json:
"""
{
  "object": 1
}
"""
    Then the response status code should be 201

  Scenario: Logged in user with not enough currencies wants to unlock a gameobject
    Given "test" has no money
    And I am logged in as "test"
    When I send a POST request to "/unlocks" with json:
"""
{
  "object": 1
}
"""
    Then the response status code should be 400

  Scenario: Logged in user with enough currencies wants to unlock a gameobject already unlocked
    Given I am logged in as "test"
    And "test" has unlocked object "1"
    Then I send a POST request to "/unlocks" with json:
"""
{
  "object": 1
}
"""
    Then the response status code should be 400
