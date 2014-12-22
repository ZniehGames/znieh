Feature: Move

  Scenario: move in range
    Given I started a game
    And turn 1 has started
    When I select a unit
    And I select a tile in moves range
    Then I can see my unit has moved

  Scenario: multiple moves
    Given I started a game
    And turn 1 has started
    When I select a unit
    And I select a tile in moves range
    Then I can see my unit has moved
    And I select a tile in moves range
    And I can see my unit has moved

  Scenario: move away from range
    Given I started a game
    And turn 1 has started
    When I select a unit
    And I select a tile away from moves range
    Then I can see my unit can't move
    And I click away from unit moves range