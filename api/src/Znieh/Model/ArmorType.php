<?php

namespace Znieh\Model;

class ArmorType
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
     * @param \Znieh\Model\ArmorPartType $parts
     *
     * @return ArmorType
     */
    public function addPart(\Znieh\Model\ArmorPartType $parts)
    {
        $this->parts[] = $parts;

        return $this;
    }

    /**
     * Remove parts
     *
     * @param \Znieh\Model\ArmorPartType $parts
     */
    public function removePart(\Znieh\Model\ArmorPartType $parts)
    {
        $this->parts->removeElement($parts);
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
