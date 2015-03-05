<?php

namespace spec\Znieh\Model;

use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class UserSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType('Znieh\Model\User');
    }
}
