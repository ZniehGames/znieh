<?php

namespace Znieh\Model;

class Unit
{
    use \Znieh\Traits\TimestampableEntity;
    use \Znieh\Traits\NamableEntity;
    use \Znieh\Traits\OwnedByUserEntity;

    private $id;
    private $sprite;
    private $size;
    private $weight;
    private $weapon;
    private $armor;
    private $teams;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->teams = new \Doctrine\Common\Collections\ArrayCollection();
    }

    public function getPoints()
    {
        return
            ($this->armor != null)  ? $this->armor->getPoints() : 0  +
            ($this->weapon != null) ? $this->weapon->getPoints() : 0 +
            $this->size->getPoints() +
            $this->weight->getPoints()
        ;
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
     * Set weapon
     *
     * @param \Znieh\Model\Weapon $weapon
     *
     * @return Unit
     */
    public function setWeapon(\Znieh\Model\Weapon $weapon = null)
    {
        $this->weapon = $weapon;

        return $this;
    }

    /**
     * Get weapon
     *
     * @return \Znieh\Model\Weapon
     */
    public function getWeapon()
    {
        return $this->weapon;
    }

    /**
     * Set armor
     *
     * @param \Znieh\Model\Armor $armor
     *
     * @return Unit
     */
    public function setArmor(\Znieh\Model\Armor $armor = null)
    {
        $this->armor = $armor;

        return $this;
    }

    /**
     * Get armor
     *
     * @return \Znieh\Model\Armor
     */
    public function getArmor()
    {
        return $this->armor;
    }

    /**
     * Set size
     *
     * @param \Znieh\Model\Size $size
     *
     * @return Unit
     */
    public function setSize(\Znieh\Model\Size $size = null)
    {
        $this->size = $size;

        return $this;
    }

    /**
     * Get size
     *
     * @return \Znieh\Model\Size
     */
    public function getSize()
    {
        return $this->size;
    }

    /**
     * Set weight
     *
     * @param \Znieh\Model\Weight $weight
     *
     * @return Unit
     */
    public function setWeight(\Znieh\Model\Weight $weight = null)
    {
        $this->weight = $weight;

        return $this;
    }

    /**
     * Get weight
     *
     * @return \Znieh\Model\Weight
     */
    public function getWeight()
    {
        return $this->weight;
    }

    /**
     * Set sprite
     *
     * @param \Znieh\Model\Sprite $sprite
     *
     * @return Unit
     */
    public function setSprite(\Znieh\Model\Sprite $sprite = null)
    {
        $this->sprite = $sprite;

        return $this;
    }

    /**
     * Get sprite
     *
     * @return \Znieh\Model\Sprite
     */
    public function getSprite()
    {
        return $this->sprite;
    }

    /**
     * Add teams
     *
     * @param \Znieh\Model\Team $team
     *
     * @return Unit
     */
    public function addTeam(\Znieh\Model\Team $team)
    {
        if ($this->teams->contains($team)) {
            return $this;
        }

        $this->teams[] = $team;
        return $this;
    }

    /**
     * Remove teams
     *
     * @param \Znieh\Model\Team $team
     */
    public function removeTeam(\Znieh\Model\Team $team)
    {
        if (!$this->teams->contains($team)) {
            return $this;
        }

        $this->teams->removeElement($team);
    }

    /**
     * Get teams
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getTeams()
    {
        return $this->teams;
    }
}
