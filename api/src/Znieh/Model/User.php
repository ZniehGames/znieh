<?php

namespace Znieh\Model;

use FOS\UserBundle\Model\User as BaseUser;

class User extends BaseUser
{
  public function __construct()
  {
      parent::__construct();
  }

    protected $currencies = [];

    public function getCurrencies()
    {
        return $this->currencies;
    }

    public function setCurrencies($currencies)
    {
        $this->currencies = $currencies;

        return $this;
    }
}
