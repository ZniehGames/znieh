<?php

namespace Znieh\Model;

use Symfony\Component\Validator\ExecutionContextInterface;

class Weapon
{
  use \Znieh\Traits\NamableEntity;
  use \Znieh\Traits\TimestampableEntity;
  use \Znieh\Traits\OwnedByUserEntity;

  private $id;
  private $parts;
  private $type;

  public function __construct()
  {
      $this->parts = new \Doctrine\Common\Collections\ArrayCollection();
  }

   public function guessWeaponType(ExecutionContextInterface $context)
   {
      if (count($this->parts) < 3) {
        $context->addViolationAt('parts', 'Weapon not valid');
        return;
      }
      $availablesTypes = $this->parts->first()->getType()->getTypes();

      foreach ($this->parts as $key => $part) {
          foreach ($availablesTypes as $availableType) {
            $found = false;
            foreach ($part->getType()->getTypes() as $type) {
                if ($type->getName() == $availableType->getName()) {
                    $found = true;
                }
            }
            if (!$found) {
                $availablesTypes->removeElement($availableType);
            }
          }
      }
      $type = $availablesTypes->first();
      if (count($availablesTypes) != 1 || count($type->getParts()) != count($this->parts)) {
        $context->addViolationAt('parts', 'Weapon not valid');
        return;
      }
      $this->setType($type);
      return true;
  }

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
   * Add part
   *
   * @param \Znieh\Model\WeaponPart $part
   *
   * @return Weapon
   */
  public function addPart(\Znieh\Model\WeaponPart $part)
  {
      $this->parts[] = $part;
      return $this;
  }

  /**
   * Remove part
   *
   * @param \Znieh\Model\WeaponPart $part
   */
  public function removePart(\Znieh\Model\WeaponPart $part)
  {
      $this->parts->removeElement($part);
      return $this;
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
