<?php

namespace Znieh\Traits;

trait OwnedByUserEntity
{
    protected $user;

    /**
     * Set user
     *
     * @param \Znieh\Model\User $user
     *
     */
    public function setUser(\Znieh\Model\User $user)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \Znieh\Model\User
     */
    public function getUser()
    {
        return $this->user;
    }
}
