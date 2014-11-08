<?php

namespace AppBundle\Behat;

use Behat\Gherkin\Node\TableNode;
use Doctrine\Common\DataFixtures\Loader;

class UserContext extends WebApiContext
{
    /**
     * @Given /^There is a user "([^"]+)"$/
     */
    public function thereIsUser($username)
    {
      $userManager = $this->getService('fos_user.user_manager');
      $user = $userManager->createUser();
      $user->setUsername($username);
      $user->setEmail($username. '@gmail.com');
      $user->setPassword($username);
      $userManager->updateUser($user);
    }
}
