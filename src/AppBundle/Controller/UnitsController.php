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

use Znieh\Model\Unit;
use Znieh\Form\UnitForm;

class UnitsController extends FOSRestController
{
    /**
     * @Rest\View()
     *
     * @param Request $request
     * @return View view instance
     *
     */
    public function postUnitsAction(Request $request)
    {
        $unit = new Unit();
        $form = $this->createForm(new UnitForm(), $unit);
        $form->handleRequest($request);

        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['message' => 'You must be logged in'], 400);
        }
        $unit->setUser($user);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($unit);
            $em->flush();
            return new JsonResponse(['message' => 'Unit created.'], 201);
        }

        return $form;
    }

    /**
     * @param Request $request
     */
    public function postUnitsPreviewAction(Request $request)
    {
        $serializer = $this->get('jms_serializer');
        $unit = new Unit();
        $form = $this->createForm(new UnitForm(), $unit);
        $form->handleRequest($request);

        return new JsonResponse(
            $serializer->serialize(
                $unit,
                'json',
                SerializationContext::create()->setGroups(['default'])
            )
        , 200);
    }
}
