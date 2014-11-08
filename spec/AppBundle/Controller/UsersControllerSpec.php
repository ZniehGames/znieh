<?php

namespace spec\AppBundle\Controller;

use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class UsersControllerSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType('AppBundle\Controller\UsersController');
    }
}
