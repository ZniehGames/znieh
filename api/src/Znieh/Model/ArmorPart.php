<?php

namespace Znieh\Model;

class ArmorPart extends GameObject
{
    use \Znieh\Traits\HasDefenseEntity;
    use \Znieh\Traits\HasWeightEntity;
    private $type;

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Set type.
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
     * Get type.
     *
     * @return \Znieh\Model\ArmorPartType
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Get Weight.
     *
     * @return integer
     */
    public function getWeight()
    {
        return $this->weight;
    }
}
