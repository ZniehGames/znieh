<?php

namespace Znieh\Model;

class ArmorPiece
{
  private $id;
    private $part;
    private $rune;

    public function getPoints()
    {
        $i =  $this->part != null ? $this->part->getPoints() : 0;
        $i += $this->rune != null ? $this->rune->getPoints() : 0;

        return $i;
    }

    public function getWeight()
    {
        return $this->part != null ? $this->part->getWeight() : 0;
    }

    public function getDefense()
    {
        return $this->part != null ? $this->part->getDefense() : 0;
    }

    public function getBonuses()
    {
        $bonuses = [];
        if ($this->part != null) {
            $bonuses = array_merge($bonuses, $this->part->getBonuses());
        }
        if ($this->rune != null) {
            $bonuses = array_merge($bonuses, $this->rune->getBonuses());
        }

        return $bonuses;
    }

  /**
   * Get id.
   *
   * @return integer
   */
  public function getId()
  {
      return $this->id;
  }

  /**
   * Set rune.
   *
   * @param \Znieh\Model\Rune $rune
   *
   * @return ArmorPiece
   */
  public function setRune(\Znieh\Model\Rune $rune = null)
  {
      $this->rune = $rune;

      return $this;
  }

  /**
   * Get rune.
   *
   * @return \Znieh\Model\Rune
   */
  public function getRune()
  {
      return $this->rune;
  }

  /**
   * Set part.
   *
   * @param \Znieh\Model\ArmorPart $part
   *
   * @return ArmorPiece
   */
  public function setPart(\Znieh\Model\ArmorPart $part = null)
  {
      $this->part = $part;

      return $this;
  }

  /**
   * Get part.
   *
   * @return \Znieh\Model\ArmorPart
   */
  public function getPart()
  {
      return $this->part;
  }
}
