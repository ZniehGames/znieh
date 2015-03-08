<?php

namespace Znieh\Traits;

trait HasGameObjectsEntity
{
    protected $objects;

    /**
     * Add object
     *
     * @param \Znieh\Model\GameObject $object
     *
     * @return GameObject
     */
    public function addObject(\Znieh\Model\GameObject $object)
    {
        $object->setObject($this);
        $this->objects[] = $object;
        return $this;
    }

    /**
     * Remove objects
     *
     * @param \Znieh\Model\GameObject $object
     */
    public function removeObject(\Znieh\Model\GameObject $object)
    {
        $this->objects->removeElement($object);
    }

    /**
     * Get objects
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getObjects()
    {
        return $this->objects;
    }
}
