<?php

namespace Znieh\Model;

class ArmorPart extends GameObject
{
    private $type;
    private $defense;

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Set type
     *
     * @param \Znieh\Model\ArmorPartType $type
     *
     * @return ArmorPart
     */
    public function setType(\Znieh\Model\ArmorPartType $type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return \Znieh\Model\ArmorPartType
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Gets the value of defense.
     *
     * @return mixed
     */
    public function getDefense()
    {
        return $this->defense;
    }

    /**
     * Sets the value of defense.
     *
     * @param mixed $defense the defense
     *
     * @return self
     */
    private function setDefense($defense)
    {
        $this->defense = $defense;

        return $this;
    }
}
