@dev
Feature: Unit

  Background:
    Given the database contains fixtures

    Scenario: API client wants to get the list of units of a user
        Given I send a GET request to "/users/1/units"
        Then the JSON response should match:
"""
  [
    @...@
  ]
"""

  Scenario: Anonymous wants to add a new unit
    When I send a POST request to "/units" with json:
"""
{
   "name": "pro hacker"
}
"""
    Then the response status code should be 400

  Scenario: Logged in user wants to add too few parts in weapon
    Given I am logged in as "test"
    When I send a POST request to "/units" with json:
"""
{
  "weapon": {
    "parts": [268,281]
  }
}
"""
    Then the response status code should be 400

  Scenario: Logged in user wants to a mix of sword and hammer
    Given I am logged in as "test"
    When I send a POST request to "/units" with json:
"""
{
  "weapon": {
    "parts": [268,322,342]
  }
}
"""
    Then the response status code should be 400

  Scenario: Logged in user wants to add a new unit
    Given I am logged in as "test"
    When I send a POST request to "/units" with json:
"""
{
  "name": "spyl8888",
  "size": 1,
  "physical": 1,
  "weapon": {
    "parts": [268,281,287,303]
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

      Scenario: unit preview
        When I send a POST request to "/units/previews" with json:
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
        Then the response status code should be 200
