<?php

namespace Znieh\Model;

class Weapon
{
  use \Znieh\Traits\NamableEntity;
  use \Znieh\Traits\TimestampableEntity;
  use \Znieh\Traits\OwnedByUserEntity;

  private $id;
  private $parts;
  private $type;

  public function getDamageType()
  {
     return "Physical";
  }

  public function getPoints()
  {
      $points = 0;
      if ($this->parts) foreach ($this->parts as $part) {
        $points += $part->getPoints();
      }
      return $points;
  }

  public function getMinDamage()
  {
      if ($this->parts) foreach ($this->parts as $part) {
        if ($part->getMinDamage() != null) {
            return $part->getMinDamage();
        }
      }
      return 0;
  }

  public function getMaxDamage()
  {
    if ($this->parts) foreach ($this->parts as $part) {
      if ($part->getMaxDamage() != null) {
          return $part->getMaxDamage();
      }
    }
    return 0;
  }

  public function getBonuses()
  {
      $bonuses = [];
      if ($this->parts) foreach ($this->parts as $part) {
        $bonuses = array_merge($bonuses, $part->getBonuses());
      }
      return $bonuses;
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
   * Set type
   *
   * @param \Znieh\Model\WeaponType $type
   *
   * @return Weapon
   */
  public function setType(\Znieh\Model\WeaponType $type)
  {
      $this->type = $type;
      return $this;
  }

  /**
   * Get type
   *
   * @return \Znieh\Model\WeaponType
   */
  public function getType()
  {
      return $this->type;
  }

  /**
   * Add parts
   *
   * @param \Znieh\Model\WeaponPart $parts
   *
   * @return Weapon
   */
  public function addPart(\Znieh\Model\WeaponPart $parts)
  {
      $this->parts[] = $parts;
      return $this;
  }

  /**
   * Remove parts
   *
   * @param \Znieh\Model\WeaponPart $parts
   */
  public function removePart(\Znieh\Model\WeaponPart $parts)
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
