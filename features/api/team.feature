@dev
Feature: team

Background:
  Given the database contains fixtures

Scenario: list user team
    Given I send a GET request to "/users/1/team"
    Then the JSON response should match:
"""
[{
  "id": @integer@,
  "units":[
  {
    "points": @integer@,
    "moves": @integer@,
    "weight": @integer@,
    "id": @integer@,
    "life": @integer@,
    "stats": {
      "Life": @integer@,
      "Force": @integer@,
      "Intelligence": @integer@,
      "Parade": @integer@,
      "Precision": @integer@,
      "Esquive": @integer@,
      "Penetration": @integer@,
      "Power": @integer@
    },
    "size": {
      "name": @string@
    },
    "physical": {
      "name": @string@
    },
    "weapon": {
      "min_damage": @integer@,
      "max_damage": @integer@,
      "damage_type": @string@,
      "bonuses": [
        {
          "attribute": @string@,
          "modifier": @integer@
        },
        @...@
      ],
      "points": @integer@,
      "parts": [
       {
          "name": @string@,
          "bonuses": @...@,
          "points": @integer@
        },
        @...@
      ],
      "type": {
        "name": @string@,
        "image": @string@
      }
    },
    "armor": {
      "defense": @integer@,
      "bonuses": [
        {
          "attribute": @string@,
          "modifier": @integer@
        },
        @...@
      ],
      "points": @integer@,
      "helm": {
        "part": {
          "name": @string@,
          "bonuses": @...@,
          "points": @integer@,
          "type": {
            "name": @string@
          },
          "defense": @integer@
        },
        "rune": {
          "name": @string@,
          "bonuses": @...@,
          "points": @integer@,
          "type": {
            "name": @string@
          }
        }
      },
      "torso": {
        "part": @...@,
        "rune": @...@
      },
      "gloves": {
        "part": @...@,
        "rune": @...@
      },
      "greaves": {
        "part": @...@,
        "rune": @...@
      },
      "boots": {
        "part": @...@,
        "rune": @...@
      }
    },
    "name": @string@
  },
  @...@
  ],
  "name": @string@
}]
"""

Scenario: add user team
    When I send a POST request to "/users/1/teams" with json:
"""
{
  "name": "Ma super team",
  "units": [1,2,3,4]
}
"""
    Then the response status code should be 201

Scenario: list user teams
    Given I send a POST request to "/users/1/teams" with json:
"""
{
  "name": "Ma super team",
  "units": [1,2,3,4]
}
"""
    And I send a GET request to "/users/1/teams"
    Then the JSON response should match:
"""
[
  {
    "id": @integer@,
    "units": @...@,
    "name": @string@
  },
  @...@
]
"""

Scenario: update user team
    When I send a PUT request to "/users/1/teams/1" with json:
"""
{
  "name": "Nouveau nom",
  "units": [1,2]
}
"""
    Then the response status code should be 204
