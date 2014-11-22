<?php

namespace Znieh\Model;

class Weight
{
  use \Znieh\Traits\NamableEntity;

  private $id;

  /**
   * Get id
   *
   * @return integer
   */
  public function getId()
  {
      return $this->id;
  }
}
