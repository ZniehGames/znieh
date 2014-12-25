<?php

namespace spec\Znieh\Form\Type;

use PhpSpec\ObjectBehavior;
use Prophecy\Argument;
use Symfony\Component\Form\FormBuilder;


class WeaponTypeSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType('Znieh\Form\Type\WeaponType');
    }

    function it_is_a_type()
    {
        $this->shouldImplement('Symfony\Component\Form\AbstractType');
    }

    function it_has_an_empty_name()
    {
        $this->getName()->shouldReturn('');
    }

    function it_builds_form_with_proper_fields(FormBuilder $builder)
    {
      $builder
          ->add('parts', 'entity', Argument::any())
          ->shouldBeCalled()
          ->willReturn($builder);
      $this->buildForm($builder, []);
    }
}
