@dev
Feature: Game play

  Background:
    Given Gameserver is running with 1 player in queue
    And I am logged in as test
    And I go on the search page
    When I want to play

  Scenario: I should see my team loaded
    Then I should be abble to see the map
    And I should be able to see my team

  Scenario: I can move a unit
    Then I should be abble to see the map
    And I should be able to see my team
    When I want to move a unit
