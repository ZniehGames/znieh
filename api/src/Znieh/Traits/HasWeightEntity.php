<?php

namespace Znieh\Traits;

trait HasWeightEntity
{
    private $weight;

    /**
     * Gets the value of weight.
     *
     * @return mixed
     */
    public function getWeight()
    {
        return $this->weight;
    }

    /**
     * Sets the value of weight.
     *
     * @param mixed $weight the weight
     *
     * @return self
     */
    private function setWeight($weight)
    {
        $this->weight = $weight;

        return $this;
    }
}
