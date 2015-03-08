<?php

namespace Znieh\Model;

class Rune extends GameObject
{
    private $type;

    /**
     * Set type
     *
     * @param \Znieh\Model\RuneType $type
     *
     * @return Rune
     */
    public function setType(\Znieh\Model\RuneType $type = null)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return \Znieh\Model\RuneType
     */
    public function getType()
    {
        return $this->type;
    }
}
