<?php

namespace Znieh\Model;

class Armor
{
  use \Znieh\Traits\NamableEntity;
  use \Znieh\Traits\TimestampableEntity;
  use \Znieh\Traits\OwnedByUserEntity;

  private $id;
  private $helm;
  private $torso;
  private $gloves;
  private $greaves;
  private $boots;

  public function getWeight()
  {
      return $this->helm->getWeight()  +
             $this->torso->getWeight() +
             $this->gloves->getWeight() +
             $this->greaves->getWeight() +
             $this->boots->getWeight()
          ;
  }

  public function getPoints()
  {
      return $this->helm->getPoints()  +
             $this->torso->getPoints() +
             $this->gloves->getPoints() +
             $this->greaves->getPoints() +
             $this->boots->getPoints()
          ;
  }

  public function getDefense()
  {
      return $this->helm->getDefense()  +
             $this->torso->getDefense() +
             $this->gloves->getDefense() +
             $this->greaves->getDefense() +
             $this->boots->getDefense()
          ;
  }

  public function getBonuses()
  {
      return array_merge(
        $this->helm->getBonuses(),
        $this->torso->getBonuses(),
        $this->gloves->getBonuses(),
        $this->greaves->getBonuses(),
        $this->boots->getBonuses()
      );
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
   * Set helm
   *
   * @param \Znieh\Model\ArmorPiece $helm
   *
   * @return Armor
   */
  public function setHelm(\Znieh\Model\ArmorPiece $helm = null)
  {
      $this->helm = $helm;
      return $this;
  }

  /**
   * Get helm
   *
   * @return \Znieh\Model\ArmorPiece
   */
  public function getHelm()
  {
      return $this->helm;
  }

  /**
   * Set torso
   *
   * @param \Znieh\Model\ArmorPiece $torso
   *
   * @return Armor
   */
  public function setTorso(\Znieh\Model\ArmorPiece $torso = null)
  {
      $this->torso = $torso;
      return $this;
  }

  /**
   * Get torso
   *
   * @return \Znieh\Model\ArmorPiece
   */
  public function getTorso()
  {
      return $this->torso;
  }

  /**
   * Set gloves
   *
   * @param \Znieh\Model\ArmorPiece $gloves
   *
   * @return Armor
   */
  public function setGloves(\Znieh\Model\ArmorPiece $gloves = null)
  {
      $this->gloves = $gloves;
      return $this;
  }

  /**
   * Get gloves
   *
   * @return \Znieh\Model\ArmorPiece
   */
  public function getGloves()
  {
      return $this->gloves;
  }

  /**
   * Set greaves
   *
   * @param \Znieh\Model\ArmorPiece $greaves
   *
   * @return Armor
   */
  public function setGreaves(\Znieh\Model\ArmorPiece $greaves = null)
  {
      $this->greaves = $greaves;
      return $this;
  }

  /**
   * Get greaves
   *
   * @return \Znieh\Model\ArmorPiece
   */
  public function getGreaves()
  {
      return $this->greaves;
  }

  /**
   * Set boots
   *
   * @param \Znieh\Model\ArmorPiece $boots
   *
   * @return Armor
   */
  public function setBoots(\Znieh\Model\ArmorPiece $boots = null)
  {
      $this->boots = $boots;
      return $this;
  }

  /**
   * Get boots
   *
   * @return \Znieh\Model\ArmorPiece
   */
  public function getBoots()
  {
      return $this->boots;
  }
}
