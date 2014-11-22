<?php

namespace AppBundle\DataFixtures\ORM;

use Hautelook\AliceBundle\Alice\DataFixtureLoader;
use Nelmio\Alice\Fixtures;

class Loader extends DataFixtureLoader
{
    /**
     * {@inheritDoc}
     */
    protected function getFixtures()
    {
        return  [
            __DIR__ . '/../Fixtures/users.yml',
            __DIR__ . '/../Fixtures/units.yml',
            __DIR__ . '/../Fixtures/teams.yml',
        ];
    }
}
