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
use JMS\Serializer\SerializationContext;

use Znieh\Model\UnlockedGameObject;
use Znieh\Form\UnlockForm;

class UnlockController extends FOSRestController
{
    /**
     * @Rest\View()
     *
     * @param Request $request
     * @return View view instance
     *
     */
    public function postUnlocksAction(Request $request)
    {
        $unlock = new UnlockedGameObject();
        $form = $this->createForm(new UnlockForm(), $unlock);
        $form->handleRequest($request);

        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['message' => 'You must be logged in'], 400);
        }
        $unlock->setUser($user);

        if ($form->isValid()) {
            try {
                $em = $this->getDoctrine()->getManager();
                $em->persist($unlock);
                $em->flush();
                return new JsonResponse(['message' => 'Unlock created.'], 201);
            } catch(\Doctrine\DBAL\DBALException $e)
            {
                return new JsonResponse(['message' => 'Already unlocked'], 400);
            }
        }

        return $form;
    }
}
