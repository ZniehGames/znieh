<?php

namespace Znieh\Traits;

trait HasDefenseEntity
{
    private $defense;

    /**
     * Gets the value of defense.
     *
     * @return mixed
     */
    public function getDefense()
    {
        return $this->defense;
    }

    /**
     * Sets the value of defense.
     *
     * @param mixed $defense the defense
     *
     * @return self
     */
    private function setDefense($defense)
    {
        $this->defense = $defense;

        return $this;
    }
}
