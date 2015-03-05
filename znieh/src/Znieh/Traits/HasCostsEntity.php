<?php

namespace Znieh\Traits;

trait HasCostsEntity
{
    protected $costs = [];

    public function getCosts()
    {
        return $this->costs;
    }

}
