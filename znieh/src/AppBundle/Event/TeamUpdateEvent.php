<?php

namespace AppBundle\Event;

use Symfony\Component\EventDispatcher\Event;


class TeamUpdateEvent extends Event
{
    protected $team;

    public function __construct($team)
    {
        $this->team = $team;
    }

    public function getTeam()
    {
        return $this->team;
    }
}

