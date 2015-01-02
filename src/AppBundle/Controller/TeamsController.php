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

use Znieh\Model\Team;
use Znieh\Model\User;
use Znieh\Form\TeamForm;

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

    /**
     * @Rest\View()
     *
     * @param Request $request
     * @return View view instance
     *
     */
    public function postUserTeamsAction(Request $request, User $user)
    {
        $team = new Team();
        $form = $this->createForm(new TeamForm(), $team);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $team->setSelected(false);
            $team->setUser($user);
            $em = $this->getDoctrine()->getManager();
            $em->persist($team);
            $em->flush();
            return new JsonResponse(['message' => 'Team created.'], 201);
        }

        return $form;
    }

    /**
     * @Rest\View()
     *
     * @param Request $request
     * @return View view instance
     *
     */
    public function putUserTeamsAction(Request $request, User $user, Team $team)
    {
        $form = $this->createForm(new TeamForm(), $team, ['method' => 'PUT']);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->flush();
            return new JsonResponse([], 204);
        }

        return $form;
    }
}
