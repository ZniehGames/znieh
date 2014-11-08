<?php

namespace spec\AppBundle\Controller;

use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class EmailsControllerSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType('AppBundle\Controller\EmailsController');
    }
}
