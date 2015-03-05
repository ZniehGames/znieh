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

## C'est extrêmement lent

Oui, le montage de fichier par défaut des différents composants de boot2docker est nul.... (vboxsf, système de fichier par défaut de virtual box).

Il est possible de changer la méthode de partage en NFS.

### Partager son repertoire /Users en nfs

Modifier le fichier /etc/exports (ou le créer s'il n'existe pas) et rajouter la ligne suivante :

```
/Users 192.168.59.103 -alldirs -mapall=501:20
```

Relancer le service nfsd de MacOSX

```
sudo nfsd restart
```

### Changer le montage sur boot2docker

Cette opération sera à executer à chaque fois que boot2docker est redemarré :

```
boot2docker ssh
sudo umount /Users
sudo /usr/local/etc/init.d/nfs-client start
sudo mount -t nfs -o rw 192.168.59.3:/Users /Users
```
