<?php

namespace AppBundle\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\Security\Core\User\UserInterface;

class JWTResponseListener
{
  /**
   * @param AuthenticationSuccessEvent $event
   */
  public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
  {
      $data = $event->getData();
      $user = $event->getUser();

      if (!$user instanceof UserInterface) {
          return;
      }

      // $data['token'] contains the JWT
      $data['user'] = [
        'username' => $user->getUsername(),
        'roles'    => $user->getRoles()
      ];

      $event->setData($data);
  }

}
