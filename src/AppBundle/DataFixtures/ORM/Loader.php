<?php

namespace AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Hautelook\AliceBundle\Alice\DataFixtureLoader;
use Nelmio\Alice\Fixtures;
use AppBundle\DataFixtures\ORM\UserProcessor as UserProcessor;

class Loader extends DataFixtureLoader implements OrderedFixtureInterface
{

    /**
     * {@inheritDoc}
     */
    protected function getProcessors()
     {
         return [];
     }

    /**
     * {@inheritDoc}
     */
    protected function getFixtures()
    {
        return  [
            __DIR__ . '/../Fixtures/users.yml',
        ];
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 2;
    }
}
