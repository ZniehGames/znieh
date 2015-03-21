<?php

namespace AppBundle\EventListener;

use AppBundle\Event\TeamUpdateEvent;
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
        $updatedTeam = $event->getTeam();

        if ($updatedTeam->getSelected()) {
            $user = $updatedTeam->getUser();
            $teams = $this->em->getRepository('AppBundle:Team')->findBy(['user' => $user]);
            foreach ($teams as $team) {
                if ($team->getId() != $updatedTeam->getId()) {
                    $team->setselected(false);
                }
            }
        }
    }
}
