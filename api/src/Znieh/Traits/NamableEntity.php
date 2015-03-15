<?php

namespace Znieh\Traits;

trait NamableEntity
{
    protected $name;

    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Returns name.
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }
}
