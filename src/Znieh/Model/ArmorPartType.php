<?php

namespace Znieh\Model;

class ArmorPartType
{
    use \Znieh\Traits\NamableEntity;
    use \Znieh\Traits\HasBonusesEntity;
    use \Znieh\Traits\HasDefenseEntity;
    use \Znieh\Traits\HasWeightEntity;
    use \Znieh\Traits\HasTypeEntity;
    use \Znieh\Traits\HasGameObjectsEntity;

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
