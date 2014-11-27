Feature: Game search

  Scenario: I want to play and queue is empty
    Given Gameserver is running
    And I am on the search page
    When I want to play
    Then I should be in the queue

  Scenario: I want to play and queue contains one user
    Given Gameserver is running with 1 player in queue
    And I am on the search page
    When I want to play
    Then a match should be found
