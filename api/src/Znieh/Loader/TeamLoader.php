<?php

namespace Znieh\Loader;

use Symfony\Component\Yaml\Yaml;
use Znieh\Model\User;
use Znieh\Model\Team;
use Znieh\Model\Weapon;
use Znieh\Model\Armor;
use Znieh\Model\ArmorPiece;
use Znieh\Model\Unit;

class TeamLoader
{
  private $em;

  public function setEntityManager($em)
  {
     $this->em = $em;
  }

  public function getDefaultTeam(User $user)
  {
      $data = Yaml::parse(file_get_contents(__DIR__ . '/../../AppBundle/Resources/config/teams/default.yml'));

      if ($user->getUsername() == "test") {
        $data = Yaml::parse(file_get_contents(__DIR__ . '/../../AppBundle/Resources/config/teams/test.yml'));
      }

      $team = new Team();
      $team->setName($data['name']);
      $team->setUser($user);
      $team->setSelected(true);
      foreach ($data['units'] as $unitData) {

        $weaponData = $unitData['weapon'];
        $weapon = new Weapon();
        $weapon->setUser($user);
        $weapon->setType($this->em->getRepository('AppBundle:WeaponType')->findOneByName($weaponData['type']));
        foreach ($weaponData['parts'] as $part) {
            $weapon->addPart($this->em->getRepository('AppBundle:WeaponPart')->findOneByName($part));
        }

        $armorData = $unitData['armor'];
        $armor = new Armor();
        foreach ($armorData['pieces'] as $key => $pieceData) {
            $piece = new ArmorPiece();
            $piece->setPart($this->em->getRepository('AppBundle:ArmorPart')->findOneByName($pieceData['part']));
            $piece->setRune($this->em->getRepository('AppBundle:Rune')->findOneByName($pieceData['rune']));
            switch ($key) {
                case 'helm':
                    $armor->setHelm($piece);
                    break;
                case 'torso':
                    $armor->setTorso($piece);
                    break;
                case 'gloves':
                    $armor->setGloves($piece);
                    break;
                case 'greaves':
                    $armor->setGreaves($piece);
                    break;
                case 'boots':
                    $armor->setBoots($piece);
                    break;
                default:
                    break;
            }
        }

        $unit = new Unit();
        $unit
          ->setName($unitData['name'])
          ->setWeapon($weapon)
          ->setArmor($armor)
          ->setUser($user)
          ->setSprite($this->em->getRepository('AppBundle:Sprite')->findOneByName($unitData['sprite']))
          ->setSize($this->em->getRepository('AppBundle:Size')->findOneByName($unitData['size']))
          ->setPhysical($this->em->getRepository('AppBundle:Physical')->findOneByName($unitData['physical']))
        ;
        $team->addUnit($unit);
      }

      return $team;
  }

}
