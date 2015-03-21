<?php

namespace Znieh\Model;

class Size
{
  use \Znieh\Traits\NamableEntity;
    use \Znieh\Traits\HasPointsEntity;

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
