<?php

namespace spec\Znieh\Model;

use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

use Znieh\Model\ArmorPart;
use Znieh\Model\Rune;

class ArmorPieceSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType('Znieh\Model\ArmorPiece');
    }

    function it_return_points()
    {
        $this->getPoints()->shouldReturn(0);
    }

    function it_return_weight()
    {
        $this->getWeight()->shouldReturn(0);
    }

    function it_return_defense()
    {
        $this->getDefense()->shouldReturn(0);
    }

    function it_return_bonuses(ArmorPart $part, Rune $rune)
    {
        $this->getBonuses()->shouldReturn([]);

        $part->getBonuses()->willReturn([
          ['attribute' => 'penetration', 'modifier' => 30]
        ]);
        $this->setPart($part);

        $rune->getBonuses()->willReturn([
          ['attribute' => 'penetration', 'modifier' => 30]
        ]);
        $this->setRune($rune);

        $this->getBonuses()->shouldReturn([
          ['attribute' => 'penetration', 'modifier' => 30],
          ['attribute' => 'penetration', 'modifier' => 30]
        ]);
    }
}
