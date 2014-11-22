<?php

namespace Znieh\Repository;

use Doctrine\ORM\EntityRepository;

class TeamRepository extends EntityRepository
{

    public function findOneByUserSelected($user)
    {
        $qb = $this->createQueryBuilder('t');

        return $qb
                 ->leftJoin('t.user', 'u')
                 ->addSelect('u')
                 ->leftJoin('t.units', 'un')
                 ->addSelect('un')
                 ->where($qb->expr()->eq('u.id', $user))
                 ->andWhere($qb->expr()->eq('t.selected', true))
                 ->getQuery()
                 ->getResult();
    }

   public function findAllByUser($user)
   {
      $qb = $this->createQueryBuilder('t');

      return $qb->leftJoin('t.user', 'u')
                ->addSelect('u')
                ->leftJoin('t.units', 'un')
                ->addSelect('un')
                ->where($qb->expr()->eq('u.id', $user))
                ->getQuery()
                ->getResult();
    }
}
