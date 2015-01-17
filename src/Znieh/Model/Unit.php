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
    private $physical;
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
        $i = 0;
        $i += ($this->armor != null)  ? $this->armor->getPoints() : 0;
        $i += ($this->weapon != null) ? $this->weapon->getPoints() : 0;
        $i += ($this->size != null) ? $this->size->getPoints() : 0;
        $i += ($this->physical != null) ? $this->physical->getPoints() : 0;
        return $i;
    }

    public function getWeight()
    {
        return ($this->armor != null)  ? $this->armor->getWeight() : 0;
    }

    public function getMoves()
    {
        return intval(abs(round(7*2^(-$this->getWeight()/20))));
    }

    public function getLife()
    {
        return 100 + $this->getStats()['life'];
    }

    public function getStats()
    {
        $stats = [
            'life' => 0,
            'strength' => 0,
            'intelligence' => 0,
            'parade' => 0,
            'precision' => 0,
            'dodge' => 0,
            'penetration' => 0,
        ];

        if($this->armor != null) foreach ($this->armor->getBonuses() as $bonus) {
            $stats[$bonus['attribute']] += $bonus['modifier'];
        }
        if($this->weapon != null) foreach ($this->weapon->getBonuses() as $bonus) {
            $stats[$bonus['attribute']] += $bonus['modifier'];
        }
        return $stats;
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
     * Set physical
     *
     * @param \Znieh\Model\Physical $physical
     *
     * @return Unit
     */
    public function setPhysical(\Znieh\Model\Physical $physical = null)
    {
        $this->physical = $physical;

        return $this;
    }

    /**
     * Get physical
     *
     * @return \Znieh\Model\Physical
     */
    public function getPhysical()
    {
        return $this->physical;
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
