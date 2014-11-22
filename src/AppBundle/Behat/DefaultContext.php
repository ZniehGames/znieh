<?php

namespace AppBundle\Behat;

use Behat\Behat\Context\Context;
use Behat\Behat\Hook\Scope\BeforeScenarioScope;
use Behat\MinkExtension\Context\RawMinkContext;
use Behat\Symfony2Extension\Context\KernelAwareContext;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\DataFixtures\Purger\ORMPurger;
use Doctrine\Common\DataFixtures\Executor\ORMExecutor;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\Loader;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

use Faker\Factory as FakerFactory;
use Faker\Generator;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Security\Core\SecurityContextInterface;
use Symfony\Component\Security\Core\User\UserInterface;


abstract class DefaultContext extends RawMinkContext implements Context, KernelAwareContext
{
    /**
     * Faker.
     *
     * @var Generator
     */
    protected $faker;

    /**
     * @var KernelInterface
     */
    protected $kernel;

    public function __construct()
    {
        $this->faker = FakerFactory::create();
    }

    /**
     * {@inheritdoc}
     */
    public function setKernel(KernelInterface $kernel)
    {
        $this->kernel = $kernel;
    }

    public function purgeDatabase()
    {
        $purger = new ORMPurger($this->getService('doctrine.orm.entity_manager'));
        $purger->purge();
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
     * Returns Container instance.
     *
     * @return ContainerInterface
     */
    protected function getContainer()
    {
        return $this->kernel->getContainer();
    }

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
        $token = $this->getSecurityContext()->getToken();

        if (null === $token) {
            throw new \Exception('No token found in security context.');
        }

        return $token->getUser();
    }

    /**
     * Get security context.
     *
     * @return SecurityContextInterface
     */
    protected function getSecurityContext()
    {
        return $this->getContainer()->get('security.context');
    }

    /**
     * Generate url.
     *
     * @param string  $route
     * @param array   $parameters
     * @param Boolean $absolute
     *
     * @return string
     */
    protected function generateUrl($route, array $parameters = array(), $absolute = false)
    {
        return $this->locatePath($this->getService('router')->generate($route, $parameters, $absolute));
    }

    /**
     * Execute the fixtures
     *
     * @param \Doctrine\Common\DataFixtures\Loader $loader     Data fixtures loader
     */
    public function purgeAndExecuteFixtures(Loader $loader)
    {
        $manager = $this->getService('h4cc_alice_fixtures.manager');
        $objects = $manager->loadFiles([
            __DIR__.'/../DataFixtures/Fixtures/sizes.yml',
            __DIR__.'/../DataFixtures/Fixtures/weights.yml',
            __DIR__.'/../DataFixtures/Fixtures/sprites.yml',
            __DIR__.'/../DataFixtures/Fixtures/buildings.yml',
            __DIR__.'/../DataFixtures/Fixtures/steps.yml',
            __DIR__.'/../DataFixtures/Fixtures/armorPartTypes.yml',
            __DIR__.'/../DataFixtures/Fixtures/armorTypes.yml',
            __DIR__.'/../DataFixtures/Fixtures/armorParts.yml',
            __DIR__.'/../DataFixtures/Fixtures/weaponPartTypes.yml',
            __DIR__.'/../DataFixtures/Fixtures/weaponTypes.yml',
            __DIR__.'/../DataFixtures/Fixtures/weaponParts.yml',
            __DIR__.'/../DataFixtures/Fixtures/runeTypes.yml',
            __DIR__.'/../DataFixtures/Fixtures/runes.yml',
        ], 'yaml');
        $manager->persist($objects, true);
        $objects = $manager->loadFiles([
            __DIR__.'/../DataFixtures/Fixtures/users.yml',
            __DIR__.'/../DataFixtures/Fixtures/units.yml',
            __DIR__.'/../DataFixtures/Fixtures/teams.yml',
        ], 'yaml');
        $manager->persist($objects, false);
    }

    /**
     * @Given /^the database is empty$/
     */
    public function theDatabaseIsEmpty()
    {
        $this->purgeDatabase();
    }
}
