<?php

namespace spec\Znieh\Form\Type;

use PhpSpec\ObjectBehavior;
use Prophecy\Argument;
use Symfony\Component\Form\FormBuilder;

class ArmorTypeSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType('Znieh\Form\Type\ArmorType');
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
          ->add('helm', Argument::any())
          ->shouldBeCalled()
          ->willReturn($builder);
      $builder
          ->add('torso', Argument::any())
          ->shouldBeCalled()
          ->willReturn($builder);
      $builder
          ->add('gloves', Argument::any())
          ->shouldBeCalled()
          ->willReturn($builder);
      $builder
          ->add('greaves', Argument::any())
          ->shouldBeCalled()
          ->willReturn($builder);
      $builder
          ->add('boots', Argument::any())
          ->shouldBeCalled()
          ->willReturn($builder);
      $this->buildForm($builder, []);
    }
}
