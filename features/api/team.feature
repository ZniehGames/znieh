@dev
Feature: team

Background:
  Given the database contains fixtures

Scenario: API client wants to get the selected team of a user
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
      "life": @integer@,
      "strength": @integer@,
      "intelligence": @integer@,
      "parade": @integer@,
      "precision": @integer@,
      "dodge": @integer@,
      "penetration": @integer@
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
          "defense": @integer@,
          "weight": @integer@
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

Scenario: A user wants to add a team
    Given I am logged in as "test"
    When I send a POST request to "/teams" with json:
"""
{
  "name": "Ma super team",
  "units": [1,2,3,4]
}
"""
    Then the response status code should be 201

Scenario: API client wants to get the list of teams of a user
    Given User "1" has many teams
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

Scenario: A user wants to update someone else team name
    Given I am logged in as "test"
    When I send a PUT request to "/teams/1" with json:
"""
{
  "name": "Nouveau nom"
}
"""
    Then the response status code should be 400

Scenario: A user wants to update his team name and list of units
    Given I am logged in as "test"
    When I send a PUT request to "/teams/11" with json:
"""
{
  "name": "Nouveau nom",
  "units": [1,2]
}
"""
    Then the response status code should be 204

Scenario: A user wants to select a team
    Given User "11" has many teams
    And I am logged in as "test"
    When I send a PUT request to "/teams/11" with json:
"""
{
  "selected": true
}
"""
    Then the response status code should be 204
    And team "11" should be the only user "11" selected team
