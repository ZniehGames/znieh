<?php

namespace spec\Znieh\Currency;

use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

use Znieh\Model\User;
use Znieh\Model\GameObject;

class CurrencyManagerSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType('Znieh\Currency\CurrencyManager');
    }

    function it_reduce_currencies_with_costs(User $user, GameObject $object)
    {
      $user->getCurrencies()->willReturn([
        'wood' => 100,
        'gold' => 100
      ]);

      $object->getCosts()->willReturn([
        ['currency' => 'wood', 'value' => 50],
        ['currency' => 'gold', 'value' => 50]
      ]);

      $user->setCurrencies(["wood" => 50, "gold" => 50])->shouldBeCalled();

      $this->unlock($user, $object)->shouldReturn(true);
    }

    function it_doesnt_reduce_currencies_with_higher_costs(User $user, GameObject $object)
    {
      $user->getCurrencies()->willReturn([
        'wood' => 50,
        'gold' => 50
      ]);

      $object->getCosts()->willReturn([
        ['currency' => 'wood', 'value' => 150],
        ['currency' => 'gold', 'value' => 50]
      ]);

      $this->unlock($user, $object)->shouldReturn(false);
    }
}
