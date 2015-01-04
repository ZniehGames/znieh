<?php

namespace Znieh\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class TeamForm extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name')
            ->add('units', 'entity', [
                'class' => 'AppBundle:Unit',
                'multiple' => true,
                'property' => 'name'
            ])
            ->add('selected', null, ['required' => false])
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults([
            'data_class' => 'Znieh\Model\Team',
            'csrf_protection' => false
        ]);
    }

    public function getName()
    {
        return '';
    }
}
