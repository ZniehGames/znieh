# Znieh Games
## Customize your units like never before

[![Build Status](https://travis-ci.org/ZniehGames/znieh.svg?branch=master)](https://travis-ci.org/ZniehGames/znieh)

For issues, including feature requests, see the [Issue Tracker](https://github.com/ZniehGames/znieh/issues).

See [CONTRIBUTING.md](https://github.com/ZniehGames/znieh/tree/master/CONTRIBUTING.md) for information
on structure, documentation, and code conventions.

## Development

    git clone git@github.com:ZniehGames/znieh.git

It's recommended that you use the provided [docker](https://github.com/ZniehGames/znieh/tree/master/docker) environment.

## Using in production

You must generate your own SSH keys for JWT Authentification

    openssl genrsa -out app/var/jwt/private.pem -aes256 4096
    openssl rsa -pubout -in app/var/jwt/private.pem -out app/var/jwt/public.pem

Then modify SSH keys path and the pass phrase in app/config/parameters.yml according to your needs.
