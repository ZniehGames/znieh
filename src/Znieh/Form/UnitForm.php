<?php

namespace Znieh\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

use Znieh\Form\Type\WeaponType;
use Znieh\Form\Type\ArmorType;

class UnitForm extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name')
            ->add('size', 'entity', [
                'class' => 'AppBundle:Size',
                'property' => 'id'
            ])
            ->add('physical', 'entity', [
                'class' => 'AppBundle:Physical',
                'property' => 'id'
            ])
            ->add('weapon', new WeaponType)
            ->add('armor', new ArmorType)
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults([
            'data_class' => 'Znieh\Model\Unit',
            'csrf_protection' => false
        ]);
    }

    public function getName()
    {
        return '';
    }
}
