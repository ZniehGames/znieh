<?php

namespace AppBundle\Behat;

use Behat\Symfony2Extension\Context\KernelDictionary;
use Behat\Symfony2Extension\Context\KernelAwareContext;

use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;
use Symfony\Component\Security\Core\User\UserInterface;


abstract class DefaultContext implements KernelAwareContext
{
    use KernelDictionary;

    /**
     * Get service by id.
     *
     * @param string $id
     *
     * @return object
     */
    protected function getService($id)
    {
        return $this->getContainer()->get($id);
    }

    /**
     * Get entity manager.
     *
     * @return ObjectManager
     */
    protected function getEntityManager()
    {
        return $this->getService('doctrine')->getManager();
    }

    /**
     * Get parameter by id.
     *
     * @param string $id
     *
     * @return object
     */
    protected function getParameter($id)
    {
        return $this->getContainer()->getParameter($id);
    }

    /**
     * Get current user instance.
     *
     * @return null|UserInterface
     *
     * @throws \Exception
     */
    protected function getUser()
    {
        $token = $this->getService('security.token_storage')->getToken();
        if (null === $token) {
            throw new \Exception('No token found in token storage.');
        }
        return $token->getUser();
    }

    /**
     * @BeforeSuite
     */
    public static function reinitDatabase()
    {
        exec('app/console d:s:u -e test --force');
        DefaultContext::databaseContainsFixtures();
    }
    /**
     * @AfterScenario @database
     */
    public static function databaseContainsFixtures()
    {
        exec('php app/console doctrine:fixtures:load -n -e test');
    }

}
