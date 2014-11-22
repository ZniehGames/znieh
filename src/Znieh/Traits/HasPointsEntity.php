<?php

namespace Znieh\Traits;

trait HasPointsEntity
{
    protected $points;

    public function setPoints($points)
    {
        $this->points = $points;
        return $this;
    }

    /**
     * Returns points.
     *
     * @return integer
     */
    public function getPoints()
    {
        return $this->points;
    }
}
