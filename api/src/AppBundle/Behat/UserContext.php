<?php

namespace AppBundle\Behat;

use Doctrine\Common\DataFixtures\Loader;
use Znieh\Model\UnlockedGameObject;
use Znieh\Model\Team;

class UserContext extends WebApiContext
{
    /**
     * @Given /^the database contains fixtures$/
     */
    public function theDatabaseContainsFixtures()
    {
        $this->purgeAndExecuteFixtures(new Loader());
    }

    /**
     * @Given /^There is a user "([^"]+)"$/
     */
    public function thereIsUser($username)
    {
        $userManager = $this->getService('fos_user.user_manager');
        $user = $userManager->createUser();
        $user->setUsername($username);
        $user->setEmail($username.'@gmail.com');
        $user->setPassword($username);
        $userManager->updateUser($user);
    }

    /**
     * @Given /^"([^"]+)" has unlocked object "([^"]+)"$/
     */
    public function hasUnlockedObject($username, $id)
    {
        $em = $this->getService('doctrine')->getManager();
        $user = $em->getRepository('AppBundle:User')->findOneBy(['username' => $username]);
        $object = $em->getRepository('AppBundle:GameObject')->find($id);
        $unlock = new UnlockedGameObject();
        $unlock->setUser($user);
        $unlock->setObject($object);
        $em->persist($unlock);
        $em->flush();
    }

    /**
     * @Given /^"([^"]+)" has no money$/
     */
    public function userHasNoMoney($username)
    {
        $em = $this->getService('doctrine')->getManager();
        $user = $em->getRepository('AppBundle:User')->findOneBy(['username' => $username]);
        $user->setCurrencies(['gold' => 0, 'wood' => 0]);
        $em->flush();
    }

    /**
     * @Given /^User "([^"]+)" has many teams$/
     */
    public function userHasManyTeams($id)
    {
        $em = $this->getService('doctrine')->getManager();
        $user = $em->getRepository('AppBundle:User')->find($id);
        $team = new Team();
        $team->setName('Team de ouf');
        $team->setUser($user);
        $em->persist($team);
        $em->flush();
    }

    /**
     * @Then /^team "([^"]+)" should be the only user "([^"]+)" selected team$/
     */
    public function onlyOneTeamSelected($teamId, $userId)
    {
        $em = $this->getService('doctrine')->getManager();
        $user = $em->getRepository('AppBundle:User')->find($userId);
        $teams = $em->getRepository('AppBundle:Team')->findBy(['user' => $user, 'selected' => true]);

        \PHPUnit_Framework_Assert::assertCount(1, $teams);
        \PHPUnit_Framework_Assert::assertEquals($teamId, $teams[0]->getId());
    }
}
