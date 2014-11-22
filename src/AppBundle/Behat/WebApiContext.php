<?php

namespace AppBundle\Behat;

use GuzzleHttp\Client;
use Behat\Gherkin\Node\PyStringNode;
use Behat\Gherkin\Node\TableNode;
use Behat\Testwork\Hook\Scope\BeforeScenarioScope;

class WebApiContext extends DefaultContext
{
    public $client;
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
        $request = $this->client->createRequest($method, 'app_test.php'.$url);
        $this->response = $this->client->send($request);
    }

    /**
     * Sends HTTP request to specific URL with field values from Table.
     *
     * @param string    $method request method
     * @param string    $url    relative url
     * @param TableNode $values   table of values
     *
     * @When /^(?:I )?send a ([A-Z]+) request to "([^"]+)" with values:$/
     */
    public function iSendARequestWithValues($method, $url, TableNode $table)
    {
        $request = $this->client->createRequest($method, 'app_test.php'.$url, ['body' => $table->getHash(), 'exceptions' => false]);
        $this->response = $this->client->send($request);
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
