Feature: Newsletter

  Background:
    Given the database contains fixtures

  Scenario: Register new email
    When I send a POST request to "/emails" with values:
      | email            |
      | naruto@gmail.com |
    Then the response status code should be 201

  Scenario: Register a wrong email
    When I send a POST request to "/emails" with values:
      | email           |
      | naruto mail.com |
    Then the response status code should be 400
