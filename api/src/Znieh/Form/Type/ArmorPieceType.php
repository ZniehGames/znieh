<?php

namespace Znieh\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ArmorPieceType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('part', 'entity', [
                'class' => 'AppBundle:ArmorPart',
                'property' => 'name',
            ])
            ->add('rune', 'entity', [
                'class' => 'AppBundle:Rune',
                'property' => 'name',
            ])
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults([
            'data_class' => 'Znieh\Model\ArmorPiece',
            'csrf_protection' => false,
        ]);
    }

    public function getName()
    {
        return '';
    }
}
