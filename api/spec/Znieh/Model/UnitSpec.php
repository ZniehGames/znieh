<?php

namespace spec\Znieh\Model;

use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

use Znieh\Model\Armor;
use Znieh\Model\Weapon;
use Znieh\Model\Size;
use Znieh\Model\Physical;


class UnitSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType('Znieh\Model\Unit');
    }

    function it_has_no_id_by_default()
    {
        $this->getId()->shouldReturn(null);
    }

    function its_creation_time_is_undefined_by_default()
    {
        $this->getCreatedAt()->shouldReturn(null);
    }

    function its_last_update_time_is_undefined_by_default()
    {
        $this->getUpdatedAt()->shouldReturn(null);
    }

    function it_returns_points(Armor $armor, Weapon $weapon, Size $size, Physical $physical)
    {
        $this->getPoints()->shouldReturn(0);

        $armor->getPoints()->willReturn(1);
        $this->setArmor($armor);

        $weapon->getPoints()->willReturn(1);
        $this->setWeapon($weapon);

        $size->getPoints()->willReturn(1);
        $this->setSize($size);

        $physical->getPoints()->willReturn(1);
        $this->setPhysical($physical);

        $this->getPoints()->shouldReturn(4);
    }

    function it_returns_weight(Armor $armor)
    {
        $this->getWeight()->shouldReturn(0);

        $armor->getWeight()->willReturn(100);
        $this->setArmor($armor);

        $this->getWeight()->shouldReturn(100);
    }

    function it_returns_moves(Armor $armor)
    {
        $this->getMoves()->shouldReturn(7);

        $armor->getWeight()->willReturn(25);
        $this->setArmor($armor);

        $this->getMoves()->shouldReturn(2);

        $armor->getWeight()->willReturn(15);
        $this->setArmor($armor);

        $this->getMoves()->shouldReturn(4);

        $armor->getWeight()->willReturn(5);
        $this->setArmor($armor);

        $this->getMoves()->shouldReturn(5);
    }

    function it_has_default_life()
    {
        $this->getLife()->shouldReturn(100);
    }

}
