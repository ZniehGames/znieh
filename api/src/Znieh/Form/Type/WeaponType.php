<?php

namespace Znieh\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class WeaponType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('parts', 'entity', [
                'class' => 'AppBundle:WeaponPart',
                'multiple' => true,
                'property' => 'name',
            ])
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults([
            'data_class' => 'Znieh\Model\Weapon',
            'csrf_protection' => false,
        ]);
    }

    public function getName()
    {
        return '';
    }
}
