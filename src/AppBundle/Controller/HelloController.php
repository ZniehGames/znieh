<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

class HelloController extends Controller
{
    /**
     * @Route("/hello")
     */
    public function indexAction()
    {
        return new JsonResponse(['greg', 'florian', 'ramos']);
    }

    /**
     * @Route("/hello/{name}")
     */
    public function helloAction($name)
    {
        return new JsonResponse(['name' => $name]);
    }
}
