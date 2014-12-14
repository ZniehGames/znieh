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

class GameObjectTypesController extends FOSRestController
{
    /**
     * @Rest\View()
     *
     * @param Request $request
     * @return View view instance
     *
     */
    public function getUserArmorparttypesAction($user)
    {
        $em = $this->getDoctrine()->getEntityManager();
        $types = $em->getRepository('AppBundle:ArmorPartType')->findAll();
        return $types;
    }

    /**
     * @Rest\View()
     *
     * @param Request $request
     * @return View view instance
     *
     */
    public function getUserRunetypesAction($user)
    {
        $em = $this->getDoctrine()->getEntityManager();
        $types = $em->getRepository('AppBundle:RuneType')->findAll();
        return $types;
    }

    /**
     * @Rest\View()
     *
     * @param Request $request
     * @return View view instance
     *
     */
    public function getUserWeaponparttypesAction($user)
    {
        $em = $this->getDoctrine()->getEntityManager();
        $types = $em->getRepository('AppBundle:WeaponPartType')->findAll();
        return $types;
    }

}
