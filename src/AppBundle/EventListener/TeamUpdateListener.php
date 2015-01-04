<?php

namespace AppBundle\EventListener;

use AppBundle\Event\TeamUpdateEvent;
use Swarrot\Broker\Message;
use Doctrine\ORM\EntityManager;

class TeamUpdateListener
{

  private $em;

  public function __construct(EntityManager $em)
  {
     $this->em = $em;
  }

  public function onTeamUpdate(TeamUpdateEvent $event)
  {
      $team = $event->getTeam();

      if ($team->getSelected()) {
        $user = $team->getUser();
        $teams = $this->em->getRepository('AppBundle:Team')->findBy(['user' => $user]);
        foreach ($teams as $team) {
          $team->setselected(false);
        }
      }

  }
}
