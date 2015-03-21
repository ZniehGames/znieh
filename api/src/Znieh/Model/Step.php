<?php

namespace Znieh\Model;

class Step
{
    use \Znieh\Traits\NamableEntity;
    use \Znieh\Traits\HasCostsEntity;
    use \Znieh\Traits\HasPointsEntity;
    use \Znieh\Traits\HasBuildingEntity;

    private $id;
    private $parent;

    /**
     * Get id.
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set parent.
     *
     * @param \Znieh\Model\Step $parent
     *
     * @return Step
     */
    public function setParent(\Znieh\Model\Step $parent = null)
    {
        $this->parent = $parent;

        return $this;
    }

    /**
     * Get parent.
     *
     * @return \Znieh\Model\Step
     */
    public function getParent()
    {
        return $this->parent;
    }
}
