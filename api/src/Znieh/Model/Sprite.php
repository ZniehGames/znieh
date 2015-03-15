<?php

namespace Znieh\Model;

class Sprite
{
  use \Znieh\Traits\NamableEntity;

    private $id;

  /**
   * Get id.
   *
   * @return integer
   */
  public function getId()
  {
      return $this->id;
  }
}
