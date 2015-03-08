<?php

namespace Znieh\Model;

use Doctrine\ORM\Mapping as ORM;

class Building
{
    use \Znieh\Traits\NamableEntity;
    use \Znieh\Traits\HasDescriptionEntity;

    private $id;
    private $steps;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->steps = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Add steps
     *
     * @param \Znieh\Model\Step $steps
     * @return Building
     */
    public function addStep(\Znieh\Model\Step $step)
    {
        $this->steps[] = $step;

        return $this;
    }

    /**
     * Remove steps
     *
     * @param \Znieh\Model\Step $steps
     */
    public function removeStep(\Znieh\Model\Step $step)
    {
        $this->steps->removeElement($step);
    }

    /**
     * Get steps
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSteps()
    {
        return $this->steps;
    }
}
