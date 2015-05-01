Feature: Registration

  @database
  Scenario: Register new user
    When I send a POST request to "/users" with values:
      | username | plainPassword | email            |
      | Naruto   | ilovemangas   | naruto@gmail.com |
    Then the response status code should be 201

  Scenario: Register new user with wrong email
    When I send a POST request to "/users" with values:
      | username  | plainPassword | email             |
      | Naruto123 | ilovemangas   | pas bon gmail.com |
    Then the response status code should be 400

  Scenario: Register new user with an already existing username
    Given There is a user "Naruto"
    When I send a POST request to "/users" with values:
      | username | plainPassword | email            |
      | Naruto   | ilovemangas   | naruto@gmail.com |
    Then the response status code should be 400
