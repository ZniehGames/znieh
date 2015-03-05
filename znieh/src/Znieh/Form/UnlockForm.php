<?php

namespace Znieh\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class UnlockForm extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('object', 'entity', [
                'class' => 'AppBundle:GameObject',
                'property' => 'id'
            ])
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults([
            'data_class' => 'Znieh\Model\UnlockedGameObject',
            'csrf_protection' => false
        ]);
    }

    public function getName()
    {
        return '';
    }
}
