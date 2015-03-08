<?php

namespace spec\Znieh\Model;

use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

use Znieh\Model\ArmorPiece;

class ArmorSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType('Znieh\Model\Armor');
    }

    function it_return_points(ArmorPiece $piece)
    {
        $piece->getPoints()->willReturn(1);

        $this->setHelm($piece);
        $this->setTorso($piece);
        $this->setGloves($piece);
        $this->setGreaves($piece);
        $this->setBoots($piece);

        $this->getPoints()->shouldReturn(5);
    }

    function it_return_weight(ArmorPiece $piece)
    {
        $piece->getWeight()->willReturn(1);

        $this->setHelm($piece);
        $this->setTorso($piece);
        $this->setGloves($piece);
        $this->setGreaves($piece);
        $this->setBoots($piece);

        $this->getWeight()->shouldReturn(5);
    }

    function it_return_defense(ArmorPiece $piece)
    {
        $piece->getDefense()->willReturn(1);

        $this->setHelm($piece);
        $this->setTorso($piece);
        $this->setGloves($piece);
        $this->setGreaves($piece);
        $this->setBoots($piece);

        $this->getDefense()->shouldReturn(5);
    }

    function it_return_bonuses(ArmorPiece $piece)
    {
        $piece->getBonuses()->willReturn([
          ['attribute' => 'penetration', 'modifier' => 30]
        ]);

        $this->setHelm($piece);
        $this->setTorso($piece);
        $this->setGloves($piece);
        $this->setGreaves($piece);
        $this->setBoots($piece);

        $this->getBonuses()->shouldReturn([
          ['attribute' => 'penetration', 'modifier' => 30],
          ['attribute' => 'penetration', 'modifier' => 30],
          ['attribute' => 'penetration', 'modifier' => 30],
          ['attribute' => 'penetration', 'modifier' => 30],
          ['attribute' => 'penetration', 'modifier' => 30]
        ]);
    }

}
