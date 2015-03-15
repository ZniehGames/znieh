<?php

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Znieh\Model\Team;
use Znieh\Form\TeamForm;
use AppBundle\Event\TeamUpdateEvent;
use AppBundle\AppEvents;

class TeamsController extends FOSRestController
{
    /**
     * @Rest\View(serializerGroups={"default"})
     *
     * @param Request $request
     *
     * @return View view instance
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
     *
     * @return View view instance
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
     *
     * @return View view instance
     */
    public function postTeamsAction(Request $request)
    {
        $team = new Team();
        $form = $this->createForm(new TeamForm(), $team);
        $form->handleRequest($request);

        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['message' => 'You must be logged in'], 400);
        }
        $team->setUser($user);

        if ($form->isValid()) {
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
     *
     * @return View view instance
     */
    public function putTeamsAction(Request $request, Team $team)
    {
        $form = $this->createForm(new TeamForm(), $team, ['method' => 'PUT']);
        // we need to avoid that fields that aren't included in the submitted data, will be set to null.
        $form->submit($request->request->all(), false);

        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['message' => 'You must be logged in'], 400);
        }
        if ($team->getUser() != $user) {
            return new JsonResponse(['message' => 'You can only edit your teams'], 400);
        }

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $this->get('event_dispatcher')->dispatch(AppEvents::TEAM_UPDATE, new TeamUpdateEvent($team));
            $em->flush();

            return new JsonResponse(['message' => 'Team edited.'], 204);
        }

        return $form;
    }
}
