<?php

namespace AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Hautelook\AliceBundle\Alice\DataFixtureLoader;
use Nelmio\Alice\Fixtures;

class ContentLoader extends DataFixtureLoader implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    protected function getFixtures()
    {
        return  [
            __DIR__ . '/../Fixtures/sizes.yml',
            __DIR__ . '/../Fixtures/weights.yml',
            __DIR__ . '/../Fixtures/sprites.yml',
            __DIR__ . '/../Fixtures/buildings.yml',
            __DIR__ . '/../Fixtures/steps.yml',
            __DIR__ . '/../Fixtures/armorPartTypes.yml',
            __DIR__ . '/../Fixtures/armorTypes.yml',
            __DIR__ . '/../Fixtures/armorParts.yml',
            __DIR__ . '/../Fixtures/weaponPartTypes.yml',
            __DIR__ . '/../Fixtures/weaponTypes.yml',
            __DIR__ . '/../Fixtures/weaponParts.yml',
            __DIR__ . '/../Fixtures/runeTypes.yml',
            __DIR__ . '/../Fixtures/runes.yml',
        ];
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 1;
    }
}
