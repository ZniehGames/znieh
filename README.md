Znieh
========================

## Pull the code

    git clone git@github.com:ZniehGames/znieh.git
    git submodule init
    git submodule update
    
## Installation

It's recommended that you use the provided [vagrant](https://github.com/ZniehGames/znieh-vagrant) environment.

Inside vagrant (/var/www/znieh) run the following commands:
    
### Generate the SSH keys

    openssl genrsa -out app/var/jwt/private.pem -aes256 4096
    openssl rsa -pubout -in app/var/jwt/private.pem -out app/var/jwt/public.pem
    
    Note that the pass phrase will be asked at the end of composer install (default value: spyl)

### Install dependencies

    composer install
    npm install
    bower install
    
### Issues

    php -d memory_limit=-1 /usr/local/bin/composer update
    php -d memory_limit=-1 /usr/local/bin/composer install

### Generate assets

    gulp

### Development

    gulp watch


