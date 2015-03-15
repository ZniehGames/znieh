<?php

namespace Znieh\Model;

class Email
{
  private $email;
    private $createdAt;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }

    public function getEmail()
    {
        return $this->email;
    }
}
