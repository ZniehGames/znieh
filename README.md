Znieh
========================

## Pull the code

    git clone git@github.com:ZniehGames/znieh.git

    
## Grab submodules
    
    git submodule init
    git submodule update
    
## Generate the SSH keys :

    openssl genrsa -out app/var/jwt/private.pem -aes256 4096
    openssl rsa -pubout -in app/var/jwt/private.pem -out app/var/jwt/public.pem

## Install dependencies

    composer install
    npm install
    bower install

## Generate assets

    gulp



