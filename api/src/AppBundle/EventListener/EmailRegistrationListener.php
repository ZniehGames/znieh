<?php

namespace AppBundle\EventListener;

use AppBundle\Event\EmailRegistrationEvent;
use Swarrot\Broker\Message;

class EmailRegistrationListener
{
  private $publisher;

    public function __construct($publisher)
    {
        $this->publisher = $publisher;
    }

    public function onEmailRegistration(EmailRegistrationEvent $event)
    {
        $email = $event->getEmail();
        $this->publisher->publish(
        'email_registration',
        new Message(json_encode(['email' => $email->getEmail()]))
      );
    }
}
