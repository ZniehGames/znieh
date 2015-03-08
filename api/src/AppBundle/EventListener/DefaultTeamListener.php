<?php

namespace AppBundle\EventListener;

use Doctrine\ORM\Event\LifecycleEventArgs;
use Znieh\Loader\TeamLoader;
use Znieh\Model\User;

class DefaultTeamListener
{
    protected $loader;

    public function __construct(TeamLoader $loader)
    {
        $this->loader = $loader;
    }

    public function postPersist(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();
        if ($entity instanceof User) {
           $em = $args->getEntityManager();
           $this->loader->setEntityManager($em);
           $team = $this->loader->getDefaultTeam($entity);
           $em->persist($team);
           $em->flush();
        }

    }
}
