<?php

namespace spec\Znieh\Model;

use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class WeaponSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType('Znieh\Model\Weapon');
    }

    function it_return_points()
    {
        $this->getPoints()->shouldReturn(0);
    }

    function it_return_min_damage()
    {
        $this->getMinDamage()->shouldReturn(0);
    }

    function it_return_max_damage()
    {
        $this->getMaxDamage()->shouldReturn(0);
    }
}
