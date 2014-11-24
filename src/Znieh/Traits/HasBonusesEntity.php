<?php

namespace Znieh\Traits;

trait HasBonusesEntity
{
    protected $bonuses = [];

    public function getBonuses()
    {
        return $this->bonuses;
    }
}
