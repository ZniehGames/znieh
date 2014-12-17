Feature: team

Background:
  Given the database contains fixtures

Scenario: list user team
    Given I send a GET request to "/users/1/team"
    Then the JSON response should match:
"""
[{"units":[
  {
    "points": @integer@,
    "moves": @integer@,
    "weight": @integer@,
    "id": @integer@,
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
          "points": @integer@,
          "dicr": "weapon_part"
        },
        @...@
      ]
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
          "dicr": "armor_part"
        },
        "rune": {
          "name": @string@,
          "bonuses": @...@,
          "points": @integer@,
          "type": {
            "name": @string@
          },
          "dicr": "rune"
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
]}]
"""
