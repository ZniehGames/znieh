<?php

namespace Znieh\Model;

class WeaponPart extends GameObject
{
    private $type;
    private $minDamage;
    private $maxDamage;

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Set type.
     *
     * @param \Znieh\Model\WeaponPartType $type
     *
     * @return WeaponPart
     */
    public function setType(\Znieh\Model\WeaponPartType $type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type.
     *
     * @return \Znieh\Model\WeaponPartType
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Gets the value of minDamage.
     *
     * @return mixed
     */
    public function getMinDamage()
    {
        return $this->minDamage;
    }

    /**
     * Sets the value of minDamage.
     *
     * @param mixed $minDamage the min damage
     *
     * @return self
     */
    private function setMinDamage($minDamage)
    {
        $this->minDamage = $minDamage;

        return $this;
    }

    /**
     * Gets the value of maxDamage.
     *
     * @return mixed
     */
    public function getMaxDamage()
    {
        return $this->maxDamage;
    }

    /**
     * Sets the value of maxDamage.
     *
     * @param mixed $maxDamage the max damage
     *
     * @return self
     */
    private function setMaxDamage($maxDamage)
    {
        $this->maxDamage = $maxDamage;

        return $this;
    }
}
