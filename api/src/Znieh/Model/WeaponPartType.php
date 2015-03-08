<?php

namespace Znieh\Model;

class WeaponPartType
{
    use \Znieh\Traits\NamableEntity;
    use \Znieh\Traits\HasGameObjectsEntity;

    private $id;
    protected $types;

    public function __construct()
    {
        $this->types = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Add object
     *
     * @param \Znieh\Model\WeaponType $type
     *
     * @return WeaponType
     */
    public function addType(\Znieh\Model\WeaponType $type)
    {
        $this->types[] = $type;
        return $this;
    }

    /**
     * Remove types
     *
     * @param \Znieh\Model\WeaponType $type
     */
    public function removeType(\Znieh\Model\WeaponType $type)
    {
        $this->types->removeElement($type);
    }

    /**
     * Get types
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getTypes()
    {
        return $this->types;
    }
}
