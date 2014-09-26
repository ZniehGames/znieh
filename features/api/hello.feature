Feature: hello
  In order to see if travis is working
  As a developer
  I need to be able to see if test pass

Scenario: hello by name
    Given I send a GET request to "/hello/greg"
    Then the JSON response should match:
"""
{
"name": "greg"
}
"""
