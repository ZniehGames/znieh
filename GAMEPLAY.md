Documentation of Gameplay

## Caractéristiques de bases d'un personnage :

- life
- defense
- weight
- moves = int(7*2^(-weight/20))

| Attributes         | Naked      |
|:------------------:|:----------:|
| life               |  100       |
| defense            |  0   	  |
| weight             |  0   	  |

## Weapon

| Attributes         | Sword 			   | Hammer				  | Axe				    |
|:------------------:|:-------------------:|:--------------------:|:-------------------:|
| damage_type        |  physical+tranchant | physical+contandant  | physical+perforant	|
| average min_damage |  10   	           | 8					  | 5                   |
| average max_damage |  20   	           | 30					  | 25                  |
| average critique   |  20%   	           | 20%  				  | 20%                 |

Utilisation de moyenne car tout dépend du type de lame choisi. Encore une fois à * par le coef du matériaux utilisé pour les dommages.

Dégats = random_int(min, max)
Dégats critiques = int(max*1.4142)

## Armor

| Attributes         | 1 armor piece heavy | 1 armor piece medium | 1 armor piece light |
|:------------------:|:-------------------:|:--------------------:|:-------------------:|
| defense            |  +20*coef	       | +10*coef			  | +5*coef				|
| weight             |  +5   	           | +3					  | +1                  |

| Attributes         | 5 armor piece heavy | 5 armor piece medium | 5 armor piece light |
|:------------------:|:-------------------:|:--------------------:|:-------------------:|
| defense            |  100*coef           | 50*coef			  | 25*coef				|
| weight             |  25   	           | 15					  | 5                   |

Les points de défense augmentent en fonction des matériaux utilisés (coef)

Dégats effectifs = int(Dégâts*2^(-defense/50)) + bonusDégâtsIgnorantArmure - malus

## Position de frappe du coup

### 2 utilités :
- pour déterminer le type d'armure frappé
- ne prendre en compte que la défense de la pièce frappé ? (belles promesses de combot mais plus complexe)

| Position           | Probabilité		  |
|:------------------:|:------------------:|
| Tête				 | 12,5%			  |
| Tronc				 | 37,5%			  |
| Mains				 | 12,5%			  |
| Jambes			 | 25%  			  |
| Pieds				 | 12,5%			  |

Les probas pourrait être liées à l'arme, certaines compétences frapper une seule partie d'armure.

## Bonuses

MVP :

| Attributes         | Effects                                                          |
|:------------------:|:----------------------------------------------------------------:|
| Life               |  la vie du personnage                                 			|
| Defense;            |  réduit les dégats infligés au personnage via un algo 			|
| Intelligence       |  augmente la puissance des sorts                      			|
| Focus    |  augmente les dégats infligés par les conditions (%)  			|
| Precision          |  augmente le pourcentage de couts critiques de l'arme (%) 		|
| Dodge            |  augmente le pourcentage d'éviter totalement un coup cac			|
| Parry           |  augmente le pourcentage de réduire les dommages d'un coup cac  	|
| Penetration        |  diminue la réduction de dommages des points de défense      	|
| mvp+PenetrationHeavy   |  diminue la réduction de dommages des points de défense lourd    |
| mvp+PenetrationMedium  |  diminue la réduction de dommages des points de défense medium   |
| mvp+PenetrationLight   |  diminue la réduction de dommages des points de défense light    |
| Strength				 |  Influence parry et penetration			|
| Agility | influence preciSion et dodge |
## Size

| Attributes         | Grand | Normal | Petit |
|:------------------:|:-----:|:------:|:-----:|
| defense            |       | 		  |       |
| weight             |       |   	  |       |

## Physical

| Attributes         | Musclé | Normal | Fin |
|:------------------:|:-----:|:------:|:-----:|
| defense            |       | 		  |       |
| weight             |       |   	  |       |
