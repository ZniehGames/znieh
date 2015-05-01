Feature: team

Scenario: list user armor part types
    Given I send a GET request to "/users/1/armorparttypes"
    Then the JSON response should match:
"""
[
  {
    "name": @string@,
    "type": @string@,
    "objects": [
      {
        "id": @integer@,
        "step": {
          "name": @string@,
          "points": @integer@
        },
        "name": @string@,
        "bonuses": @...@,
        "points": @integer@,
        "defense": @integer@
      },
     @...@
    ]
  },
  @...@
]
"""

Scenario: list user weapon part types
    Given I send a GET request to "/users/1/weaponparttypes"
    Then the JSON response should match:
"""
[
  {
    "name": @string@,
    "objects": [
      {
        "id": @integer@,
        "step": {
          "name": @string@,
          "points": @integer@
        },
        "name": @string@,
        "bonuses": @...@,
        "points": @integer@
      },
      @...@
    ]
  },
  @...@
]
"""


Scenario: list user rune types
    Given I send a GET request to "/users/1/runetypes"
    Then the JSON response should match:
"""
[
  {
    "name": @string@,
    "objects": [
      {
        "id": @integer@,
        "step": {
          "name": @string@,
          "points": @integer@
        },
        "name": @string@,
        "bonuses": @...@,
        "points": @integer@
      },
      @...@
    ]
  },
  @...@
]
"""
