[![Stories in Ready](https://badge.waffle.io/ZniehGames/znieh.png?label=ready&title=Ready)](https://waffle.io/ZniehGames/znieh)
# Znieh Games
## Customize your units like never before

[![Circle CI](https://circleci.com/gh/ZniehGames/znieh.svg?style=svg)](https://circleci.com/gh/ZniehGames/znieh)

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
