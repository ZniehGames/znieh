<?php

namespace AppBundle\Processor;

use Swarrot\Broker\Message;
use Swarrot\Processor\ProcessorInterface;
use Znieh\Mailer\GlobalMailer;

class EmailRegistrationProcessor implements ProcessorInterface
{
  protected $mailer;
    protected $template;

    public function __construct(GlobalMailer $mailer, $template)
    {
        $this->mailer = $mailer;
        $this->template = $template;
    }

    public function process(Message $message, array $options)
    {
        echo sprintf("Consume message #%d\n", $message->getId());
        $data = json_decode($message->getBody(), true);

        $this->mailer->send(
        $data['email'],
        'Bienvenue dans l\'aventure Znieh Games !',
        $this->template->render('Emails/email_registration.html.twig')
      );

        return;
    }
}
