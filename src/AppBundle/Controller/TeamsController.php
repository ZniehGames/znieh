<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

use FOS\RestBundle\View\View;
use FOS\RestBundle\Util\Codes;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;

class TeamsController extends FOSRestController
{
    /**
     * @Rest\View(serializerGroups={"default"})
     *
     * @param Request $request
     * @return View view instance
     *
     */
    public function getUserTeamsAction($user)
    {
        $em = $this->getDoctrine()->getEntityManager();
        $teams = $em->getRepository('AppBundle:Team')->findAllByUser($user);
        return $teams;
    }

    /**
     * @Rest\View(serializerGroups={"default"})
     *
     * @param Request $request
     * @return View view instance
     *
     */
    public function getUserTeamAction($user)
    {
        $em = $this->getDoctrine()->getEntityManager();
        $team = $em->getRepository('AppBundle:Team')->findOneByUserSelected($user);
        return $team;
    }
}
