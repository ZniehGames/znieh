<?php

namespace Znieh\Model;

class ArmorPartType
{
    use \Znieh\Traits\NamableEntity;
    use \Znieh\Traits\HasBonusesEntity;

    private $id;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }
}
