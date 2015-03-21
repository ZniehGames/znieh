<?php

namespace Znieh\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ArmorType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('helm', new ArmorPieceType())
            ->add('torso', new ArmorPieceType())
            ->add('gloves', new ArmorPieceType())
            ->add('greaves', new ArmorPieceType())
            ->add('boots', new ArmorPieceType())
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults([
            'data_class' => 'Znieh\Model\Armor',
            'csrf_protection' => false,
        ]);
    }

    public function getName()
    {
        return '';
    }
}
