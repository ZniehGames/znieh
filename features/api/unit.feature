@dev
Feature: Unit

  Background:
    Given the database contains fixtures

  Scenario: Add new unit
    When I send a POST request to "/units" with json:
"""
{
  "name": "spyl8888",
  "size": 1,
  "physical": 1,
  "weapon": {
    "parts": [331,310,289,283]
  },
  "armor": {
    "helm": {
      "part": 25,
      "rune": 378
    },
    "torso": {
      "part": 25,
      "rune": 378
    },
    "gloves": {
      "part": 25,
      "rune": 378
    },
    "greaves": {
      "part": 25,
      "rune": 378
    },
    "boots": {
      "part": 25,
      "rune": 378
    }
  }
}
"""
    Then the response status code should be 201
