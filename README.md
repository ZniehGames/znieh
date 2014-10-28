Znieh
========================

## Development

    git clone git@github.com:ZniehGames/znieh.git
    git submodule update --init

It's recommended that you use the provided [vagrant](https://github.com/ZniehGames/znieh-vagrant) environment.
Inside vagrant in /var/www/znieh run the following commands:

* composer install for symfony deps
* npm install for gulp and Node.js deps
* bower install for frontend deps
* gulp  to build
* gulp watch  to build & rebuild on changes

## Using in production

You must generate your own SSH keys for JWT Authentification

    openssl genrsa -out app/var/jwt/private.pem -aes256 4096
    openssl rsa -pubout -in app/var/jwt/private.pem -out app/var/jwt/public.pem

Then modify SSH keys path and the pass phrase in app/config/parameters.yml according to your needs.
