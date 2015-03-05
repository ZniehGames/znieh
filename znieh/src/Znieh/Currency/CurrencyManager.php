<?php

namespace Znieh\Currency;

class CurrencyManager
{

  public function __construct()
  {

  }

  public function unlock($user, $object)
  {
      $result = $this->calculateCurrencies($user->getCurrencies(), $object->getCosts());

      if ($this->isTransactionValid($result)) {
          $user->setCurrencies($result);
          return true;
      }
      return false;
  }

  private function calculateCurrencies($currencies, $costs)
  {
    foreach ($costs as $cost) {
      $currencies[$cost['currency']] -= $cost['value'];
    }
    return $currencies;
  }

  private function isTransactionValid($result)
  {
     foreach ($result as $currency) {
       if ($currency < 0) return false;
     }
     return true;
  }

}
