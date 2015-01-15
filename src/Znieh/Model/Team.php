<?php

namespace Znieh\Model;

class Team
{
    use \Znieh\Traits\TimestampableEntity;
    use \Znieh\Traits\NamableEntity;
    use \Znieh\Traits\OwnedByUserEntity;

    private $id;
    private $units;
    private $selected = false;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->units = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Set selected
     *
     * @param boolean $selected
     *
     * @return Team
     */
    public function setSelected($selected)
    {
        $this->selected = $selected;
        return $this;
    }
    /**
     * Get selected
     *
     * @return boolean
     */
    public function getSelected()
    {
        return $this->selected;
    }

    /**
     * Add units
     *
     * @param \Znieh\Model\Unit $unit
     *
     * @return Team
     */
    public function addUnit(\Znieh\Model\Unit $unit)
    {
        if ($this->units->contains($unit)) {
            return $this;
        }

        $this->units[] = $unit;
        return $this;
    }

    /**
     * Remove units
     *
     * @param \Znieh\Model\Unit $unit
     */
    public function removeUnit(\Znieh\Model\Unit $unit)
    {
        if (!$this->units->contains($unit)) {
            return $this;
        }

        $this->units->removeElement($unit);
    }

    /**
     * Get teams
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getUnits()
    {
        return $this->units;
    }
}
