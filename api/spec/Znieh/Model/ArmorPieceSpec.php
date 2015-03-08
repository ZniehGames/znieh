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

    function it_return_points(ArmorPart $part, Rune $rune)
    {
        $this->getPoints()->shouldReturn(0);

        $part->getPoints()->willReturn(1);
        $rune->getPoints()->willReturn(1);

        $this->setPart($part);
        $this->setRune($rune);

        $this->getPoints()->shouldReturn(2);
    }

    function it_return_weight(ArmorPart $part)
    {
        $this->getWeight()->shouldReturn(0);

        $part->getWeight()->willReturn(1);
        $this->setPart($part);

        $this->getWeight()->shouldReturn(1);
    }

    function it_return_defense(ArmorPart $part)
    {
        $this->getDefense()->shouldReturn(0);

        $part->getDefense()->willReturn(1);
        $this->setPart($part);

        $this->getDefense()->shouldReturn(1);
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
