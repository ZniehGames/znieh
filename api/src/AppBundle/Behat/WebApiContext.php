<?php

namespace AppBundle\Behat;

use GuzzleHttp\Client;
use Behat\Gherkin\Node\PyStringNode;
use Behat\Gherkin\Node\TableNode;

class WebApiContext extends DefaultContext
{
    public $client;
    public $token;
    public $response;

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @BeforeScenario
     */
    public function createClient()
    {
        $this->client = new Client(['base_url' => $this->getParameter('base_url')]);
        $this->token = null;
    }

    /**
     * @When /^I am logged in as "([^"]+)"$/
     */
    public function iAmLoggedIn($username)
    {
        $this->createAuthenticatedClient($username, $username);
    }

    /**
     * Create a client with a default Authorization header.
     *
     * @param string $username
     * @param string $password
     *
     * @return \Symfony\Bundle\FrameworkBundle\Client
     */
    protected function createAuthenticatedClient($username = 'test', $password = 'test')
    {
        $request = $this->client->createRequest(
            'POST',
            'app_test.php/login_check',
            [
                'body' => [
                    'username' => $username,
                    'password' => $password,
                ],
             ]
        );

        $response = $this->client->send($request);
        $this->token = $response->json()['token'];
    }

    /**
     * Sends HTTP request to specific relative URL.
     *
     * @param string $method request method
     * @param string $url    relative url
     *
     * @When /^(?:I )?send a ([A-Z]+) request to "([^"]+)"$/
     */
    public function iSendARequest($method, $url)
    {
        $request = $this->client->createRequest($method, 'app_test.php'.$url, [
            'headers' => ['Authorization' => sprintf('Bearer %s', $this->token)],
        ]);
        $this->response = $this->client->send($request);
    }

    /**
     * Sends HTTP request to specific URL with field values from Table.
     *
     * @param string    $method request method
     * @param string    $url    relative url
     * @param TableNode $values table of values
     *
     * @When /^(?:I )?send a ([A-Z]+) request to "([^"]+)" with values:$/
     */
    public function iSendARequestWithValues($method, $url, TableNode $table)
    {
        $request = $this->client->createRequest($method, 'app_test.php'.$url, [
            'body' => $table->getHash(),
            'exceptions' => false,
            'headers' => ['Authorization' => sprintf('Bearer %s', $this->token)],
        ]);
        $this->response = $this->client->send($request);
    }

    /**
     * Sends HTTP request to specific URL with field values from Table.
     *
     * @param string    $method request method
     * @param string    $url    relative url
     * @param TableNode $values table of values
     *
     * @When /^(?:I )?send a ([A-Z]+) request to "([^"]+)" with json:$/
     */
    public function iSendARequestWithJson($method, $url, PyStringNode $string)
    {
        $request = $this->client->createRequest($method, 'app_test.php'.$url, [
            'body' => $string->getRaw(),
            'exceptions' => false,
            'headers' => ['Authorization' => sprintf('Bearer %s', $this->token)],
        ]);
        $this->response = $this->client->send($request);
        var_dump((string) $this->response->getBody());
    }

    /**
     * Checks that response has specific status code.
     *
     * @param string $code status code
     *
     * @Then /^(?:the )?response status code should be (\d+)$/
     */
    public function theResponseStatusCodeShouldBe($code)
    {
        \PHPUnit_Framework_Assert::assertSame(intval($code), intval($this->response->getStatusCode()));
    }

    /**
     * @Then /^the JSON response should match:$/
     */
    public function theJsonResponseShouldMatch(PyStringNode $pattern)
    {
        $this->response->json(); // check if json
        var_dump((string) $this->response->getBody()); // eases debug
        \PHPUnit_Framework_Assert::assertTrue(match((string) $this->response->getBody(), $pattern->getRaw()));
    }
}
