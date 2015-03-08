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


## Installer fig (bientôt docker-compose)

Fig permet de configurer et de lancer plusieurs containers Docker interagissants ensemble

```
brew install fig
```

## Lancer la stack

```
boot2docker shellinit
```

Copier / Coller les commandes d'exports dans votre terminal, puis lancer les commandes suivantes :

```
fig -f docker-compose.yml build
fig -f docker-compose.yml up
```

## Executer des commandes à l'interieur de votre stack (php, gulp, bower)

Il suffit d'executer un terminal dans votre stack gràace à la commande suivante :

```
docker exec -t -i znieh_application_1 /bin/bash
```

Vous pouvez ensuite aller sur `/var/www` qui est le repertoire root du projet znieh.