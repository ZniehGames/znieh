<?php

namespace spec\Znieh\Model;

use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

use Symfony\Component\Validator\ExecutionContextInterface;
use Znieh\Model\WeaponPart;
use Znieh\Model\WeaponPartType;
use Znieh\Model\WeaponType;

class WeaponSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType('Znieh\Model\Weapon');
    }

    function it_return_points()
    {
        $this->getPoints()->shouldReturn(0);
    }

    function it_return_min_damage()
    {
        $this->getMinDamage()->shouldReturn(0);
    }

    function it_return_max_damage()
    {
        $this->getMaxDamage()->shouldReturn(0);
    }

    function it_guess_weapon_type(ExecutionContextInterface $context, WeaponPart $part1, WeaponPart $part2, WeaponPart $part3, WeaponPart $part4)
    {
        $this->guessWeaponType($context)->shouldReturn(null);
        $context->addViolationAt('parts', 'Weapon not valid')->shouldBeCalled();

        $partType1 = (new WeaponPartType)->setName('lame');
        $partType2 = (new WeaponPartType)->setName('pommeau');
        $partType3 = (new WeaponPartType)->setName('garde');
        $partType4 = (new WeaponPartType)->setName('manche');
        $partType5 = (new WeaponPartType)->setName('tete_hache');
        $partType6 = (new WeaponPartType)->setName('hampe');
        $partType7 = (new WeaponPartType)->setName('poignee');
        $partType8 = (new WeaponPartType)->setName('tete_marteau');

        $type1 = (new WeaponType)->setName('sword');
        $type1->addPart($partType1)->addPart($partType2)->addPart($partType3)->addPart($partType4);
        $type2 = (new WeaponType)->setName('axe');
        $type2->addPart($partType5)->addPart($partType6)->addPart($partType7);
        $type3 = (new WeaponType)->setName('hammer');
        $type3->addPart($partType6)->addPart($partType7)->addPart($partType8);

        // We add the 4 sword parts
        $part1->getType()->willReturn($partType1);
        $part2->getType()->willReturn($partType2);
        $part3->getType()->willReturn($partType3);
        $part4->getType()->willReturn($partType4);
        $this->addPart($part1)->addPart($part2)->addPart($part3)->addPart($part4);
        $this->guessWeaponType($context)->shouldReturn(true);

        $this->removePart($part1)->removePart($part2)->removePart($part3)->removePart($part4);

        // We add only 3 sword parts
        $this->addPart($part1)->addPart($part2)->addPart($part3);
        $this->guessWeaponType($context)->shouldReturn(null);

        $this->removePart($part1)->removePart($part2)->removePart($part3);

        // We add 2 sword parts and 2 hammer parts
        $part1->getType()->willReturn($partType1);
        $part2->getType()->willReturn($partType2);
        $part3->getType()->willReturn($partType7);
        $part4->getType()->willReturn($partType8);
        $this->addPart($part1)->addPart($part2)->addPart($part3)->addPart($part4);
        $this->guessWeaponType($context)->shouldReturn(null);

        $this->removePart($part1)->removePart($part2)->removePart($part3)->removePart($part4);

        // We add the 3 hammer parts
        $part1->getType()->willReturn($partType6);
        $part2->getType()->willReturn($partType7);
        $part3->getType()->willReturn($partType8);
        $this->addPart($part1)->addPart($part2)->addPart($part3);
        $this->guessWeaponType($context)->shouldReturn(true);
    }
}
