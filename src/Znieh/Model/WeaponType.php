<?php

namespace Znieh\Model;

class WeaponType
{
    use \Znieh\Traits\NamableEntity;
    use \Znieh\Traits\HasBuildingEntity;

    private $id;
    private $parts;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->parts = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Add parts
     *
     * @param \Znieh\Model\WeaponPartType $parts
     * @return WeaponType
     */
    public function addPart(\Znieh\Model\WeaponPartType $part)
    {
        $part->addType($this);
        $this->parts[] = $part;

        return $this;
    }

    /**
     * Remove parts
     *
     * @param \Znieh\Model\WeaponPartType $parts
     */
    public function removePart(\Znieh\Model\WeaponPartType $part)
    {
        $part->removeType($this);
        $this->parts->removeElement($part);
    }

    /**
     * Get parts
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getParts()
    {
        return $this->parts;
    }
}
