<?php

namespace Znieh\Model;

class UnlockedGameObject
{
    use \Znieh\Traits\OwnedByUserEntity;

    protected $createdAt;
    protected $object;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
    }

    /**
     * Set createdAt.
     *
     * @param \DateTime $createdAt
     *
     * @return UnlockedGameObject
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt.
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set object.
     *
     * @param \Znieh\Model\GameObject $object
     *
     * @return UnlockedGameObject
     */
    public function setObject(\Znieh\Model\GameObject $object)
    {
        $this->object = $object;

        return $this;
    }

    /**
     * Get object.
     *
     * @return \Znieh\Model\GameObject
     */
    public function getObject()
    {
        return $this->object;
    }
}
