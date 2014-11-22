<?php

namespace Znieh\Model;

class RuneType
{
    use \Znieh\Traits\NamableEntity;
    use \Znieh\Traits\HasBuildingEntity;

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
