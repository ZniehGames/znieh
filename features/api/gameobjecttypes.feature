Feature: team

Background:
  Given the database contains fixtures

Scenario: list user armor part types
    Given I send a GET request to "/users/1/armorparttypes"
    Then the JSON response should match:
"""
[
  {
    "name": @string@,
    "type": @string@,
    "objects": @...@
  },
  @...@
]
"""
