<?php

namespace Znieh\Model;

class GameObject
{
    use \Znieh\Traits\NamableEntity;
    use \Znieh\Traits\HasBonusesEntity;
    use \Znieh\Traits\HasDescriptionEntity;
    use \Znieh\Traits\HasPointsEntity;

    protected $id;
    protected $unlockeds;
    protected $step;

    public function __construct()
    {
        $this->unlockeds = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get costs
     *
     * @return array
     */
    public function getCosts()
    {
        return $this->step->getCosts();
    }

    /**
     * Set step
     *
     * @param \Znieh\Model\Step $step
     * @return GameObject
     */
    public function setStep(\Znieh\Model\Step $step)
    {
        $this->step = $step;
        return $this;
    }

    /**
     * Get step
     *
     * @return \Znieh\Model\Step
     */
    public function getStep()
    {
        return $this->step;
    }

    /**
     * Add unlockeds
     *
     * @param \Znieh\Model\UnlockedGameObject $unlocked
     *
     * @return GameObject
     */
    public function addUnlocked(\Znieh\Model\UnlockedGameObject $unlocked)
    {
        $unlocked->setObject($this);
        $this->unlockeds[] = $unlocked;
        return $this;
    }

    /**
     * Remove unlockeds
     *
     * @param \Znieh\Model\UnlockedGameObject $unlocked
     */
    public function removeUnlocked(\Znieh\Model\UnlockedGameObject $unlocked)
    {
        $this->unlockeds->removeElement($unlocked);
    }

    /**
     * Get unlockeds
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getUnlockeds()
    {
        return $this->unlockeds;
    }
}
