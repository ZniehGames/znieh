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
     * Load a data fixture class
     *
     * @param \Doctrine\Common\DataFixtures\Loader $loader    Data fixtures loader
     * @param string                               $className Class name of fixture
     */
    public function loadFixtureClass(Loader $loader, $className)
    {
        $fixture = new $className();
        if ($loader->hasFixture($fixture)) {
            unset($fixture);
            return;
        }
        $loader->addFixture(new $className);
        if ($fixture instanceof DependentFixtureInterface) {
            foreach ($fixture->getDependencies() as $dependency) {
                $this->loadFixtureClass($loader, $dependency);
            }
        }
    }

    /**
     * Load a data fixture class
     *
     * @param \Doctrine\Common\DataFixtures\Loader $loader     Data fixtures loader
     * @param array                                $classNames Array of class names of fixtures
     */
    public function loadFixtureClasses(Loader $loader, array $classNames)
    {
        foreach ($classNames as $className) {
            $this->loadFixtureClass($loader, $className);
        }
    }

    /**
     * Execute the fixtures
     *
     * @param \Doctrine\Common\DataFixtures\Loader $loader     Data fixtures loader
     */
    public function purgeAndExecuteFixtures(Loader $loader)
    {
        $executor = new ORMExecutor($this->getService('doctrine.orm.entity_manager'), new ORMPurger());
        $executor->execute($loader->getFixtures());
    }

    /**
     * @Given /^the database is empty$/
     */
    public function theDatabaseIsEmpty()
    {
        $this->purgeDatabase();
    }
}
