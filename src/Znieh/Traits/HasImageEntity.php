<?php

namespace Znieh\Traits;

trait HasImageEntity
{
    protected $image;

    /**
     * Set Image
     *
     * @param string $image
     */
    public function setImage($image)
    {
        $this->image = $image;

        return $this;
    }

    /**
     * Get Image
     *
     * @return string
     */
    public function getImage()
    {
        return $this->image;
    }
}
