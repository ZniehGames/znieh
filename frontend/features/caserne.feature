Feature: Caserne

  Background:
    Given I am logged in as test
    And I go on the caserne page

  Scenario: I can add an helm to my unit
    Then helm slot should be selected
    And I can select only one helm
    And I can select only one rune
    And preview should be updated
    And I can submit my unit
    And I should be redirected to the search page

  Scenario: I can add a full armor to my unit
    When I add full armor components
    Then I can submit my unit
    And I should be redirected to the search page

  Scenario: I can add a full weapon to my unit
    When I add full sword components
    Then I can submit my unit
    And I should be redirected to the search page
