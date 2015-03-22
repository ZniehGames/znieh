# Docker

L'utilisation de Docker n'est pas obligatoire.

## Installer Docker

Sous MacOSX, il faut utiliser boot2docker :

```
brew install boot2docker
brew install docker
boot2docker download
boot2docker init
boot2docker up
```

Sous linux (debian-based), installer Docker suffit :
```
apt-get install docker
```


## Installer docker-compose

docker-compose permet de configurer et de lancer plusieurs containers Docker interagissants ensemble

http://docs.docker.com/compose/install/

## Lancer la stack

```
boot2docker shellinit
```

Copier / Coller les commandes d'exports dans votre terminal, puis lancer les commandes suivantes :

```
docker-compose build
docker-compose up
```

## Accèder depuis votre navigateur

Ajoutez dans /etc/hosts :

127.0.0.1      znieh.dev
127.0.0.1      api.znieh.dev
127.0.0.1      gs.znieh.dev 

## Executer des commandes à l'interieur de votre stack (fabric, php, node, gulp)

Il suffit d'executer un terminal dans votre stack gràace à la commande suivante :

```
docker exec -t -i znieh_application_1 /bin/bash
```

Vous pouvez ensuite aller sur `/var/www` qui est le repertoire root du projet znieh.
