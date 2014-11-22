<?php

namespace Znieh\Model;

class WeaponPartType
{
    use \Znieh\Traits\NamableEntity;

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
