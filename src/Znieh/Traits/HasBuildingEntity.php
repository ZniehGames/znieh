<?php

namespace Znieh\Traits;

trait HasBuildingEntity
{
    private $building;

    /**
     * Set building
     *
     * @param \Znieh\Model\Building $building
     *
     * @return Step
     */
    public function setBuilding(\Znieh\Model\Building $building)
    {
        $this->building = $building;

        return $this;
    }

    /**
     * Get building
     *
     * @return \Znieh\Model\Building
     */
    public function getBuilding()
    {
        return $this->building;
    }
}
