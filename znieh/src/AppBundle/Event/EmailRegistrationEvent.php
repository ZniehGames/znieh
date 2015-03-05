<?php

namespace AppBundle\Event;

use Symfony\Component\EventDispatcher\Event;


class EmailRegistrationEvent extends Event
{
    protected $email;

    public function __construct($email)
    {
        $this->email = $email;
    }

    public function getEmail()
    {
        return $this->email;
    }
}

