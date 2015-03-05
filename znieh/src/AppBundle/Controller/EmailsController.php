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

use Znieh\Model\Email;
use Znieh\Form\EmailRegistrationForm;
use AppBundle\Event\EmailRegistrationEvent;
use AppBundle\AppEvents;

class EmailsController extends FOSRestController
{
    /**
     * Create a new email
     *
     * @ApiDoc(
     *   resource = true,
     *   input = "Znieh\Model\Email",
     *   statusCodes = {
     *     201 = "Returned when successful",
     *     400 = "Returned when the form has errors"
     *   }
     * )
     * @Rest\View(statusCode = Codes::HTTP_BAD_REQUEST)
     *
     * @param Request $request
     * @return View view instance
     *
     */
    public function postEmailsAction(Request $request)
    {
        $email = new Email();
        $form = $this->createForm(new EmailRegistrationForm(), $email);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $dispatcher = $this->get('event_dispatcher');
            $em->persist($email);
            $em->flush();
            $dispatcher->dispatch(AppEvents::EMAIL_REGISTRATION, new EmailRegistrationEvent($email));
            return new JsonResponse(['message' => 'Email created.'], 201);
        }

        return $form;
    }
}
