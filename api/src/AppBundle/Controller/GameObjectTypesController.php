<?php

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;

class GameObjectTypesController extends FOSRestController
{
    /**
     * @Rest\View(serializerGroups={"default", "details"})
     *
     * @param Request $request
     *
     * @return View view instance
     */
    public function getUserArmorparttypesAction($user)
    {
        $em = $this->getDoctrine()->getEntityManager();
        $types = $em->getRepository('AppBundle:ArmorPartType')->findAll();

        return $types;
    }

    /**
     * @Rest\View(serializerGroups={"default", "details"})
     *
     * @param Request $request
     *
     * @return View view instance
     */
    public function getUserRunetypesAction($user)
    {
        $em = $this->getDoctrine()->getEntityManager();
        $types = $em->getRepository('AppBundle:RuneType')->findAll();

        return $types;
    }

    /**
     * @Rest\View(serializerGroups={"default", "details"})
     *
     * @param Request $request
     *
     * @return View view instance
     */
    public function getUserWeaponparttypesAction($user)
    {
        $em = $this->getDoctrine()->getEntityManager();
        $types = $em->getRepository('AppBundle:WeaponPartType')->findAll();

        return $types;
    }
}
