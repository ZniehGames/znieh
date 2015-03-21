<?php

namespace Znieh\Mailer;

use Hip\MandrillBundle\Message;
use Hip\MandrillBundle\Dispatcher;

class GlobalMailer
{
  protected $dispatcher;

    public function __construct(Dispatcher $dispatcher)
    {
        $this->dispatcher = $dispatcher;
    }

    public function send($to, $subject, $html)
    {
        $message = new Message();

        $message
          ->setFromEmail('team@zniehgames.com')
          ->setFromName('Team Znieh Games')
          ->addTo($to)
          ->setSubject($subject)
          ->setHtml($html)
        ;

        return $this->dispatcher->send($message);
    }
}
