<?php

namespace Znieh\Traits;

trait HasCostsEntity
{
    protected $costs = [];

    public function addCostValues($key, $cost)
    {
        if (!in_array($cost, $this->costs, true)) {
            $this->costs[$key] = $cost;
        }
        return $this;
    }

    public function removeCost($cost)
    {
        if (false !== $key = array_search($cost, $this->costs, true)) {
            unset($this->costs[$key]);
            $this->costs = array_values($this->costs);
        }
        return $this;
    }

    public function getCosts()
    {
        return $this->costs;
    }

    public function setCosts(array $costs)
    {
        foreach ($costs as $key => $cost) {
            $this->addCostValues($key, $cost);
        }
        return $this;
    }
}
