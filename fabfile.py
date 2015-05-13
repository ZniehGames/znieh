from __future__ import with_statement

from fabric.api import *
from fabric.context_managers import lcd
from fabric.colors import red, green

env.local_dir = env.real_fabfile[:-10]

@task
def restart():
    with lcd(env.local_dir):
        local('boot2docker restart --vbox-share=disable')
        local('boot2docker up')
        local('docker-compose up -d')
@task
def docker():
    with lcd(env.local_dir):
        local('docker exec -it znieh_application_1 bash')

@task
def watch():
    with lcd(env.local_dir+'frontend/'):
        local('brunch watch')

@task
def build():
    with lcd(env.local_dir+'frontend/'):
        local('npm install')
        local('bower install --config.interactive=false --allow-root')
        local('brunch build --production')

    with lcd(env.local_dir+'gameserver/'):
        local('npm install')

    with lcd(env.local_dir+'api/'):
        local('composer install --prefer-source --no-interaction --optimize-autoloader --no-scripts')




@task
def build_db():
    with lcd(env.local_dir+'api/'):
        local('php app/console doctrine:schema:update --force')
        local('php app/console doctrine:schema:update --force -e test')

@task
def add_data():
    with lcd(env.local_dir+'api/'):
        local('php app/console doctrine:fixtures:load --no-interaction')
        local('php app/console doctrine:fixtures:load --no-interaction -e test')
        # local('php app/console fos:elastica:populate')

@task
def lint(pr=''):
    with lcd(env.local_dir+'api/'):
        with settings(warn_only=True):
            result = local('php-cs-fixer fix . --config=sf23 --dry-run', capture=True)

            if result.return_code == 0:
                print(green('PHP: OK'))
            elif result.return_code == 1:
                print result
                print(red('PHP: /!\ You should fix your PHP files!'))
            else: #print error to user
                print result
                raise SystemExit()

@task
def check():
    with lcd(env.local_dir+'api/'):
        local('php app/console security:check')

@task
def test():
    with lcd(env.local_dir+'api/'):
        local('php bin/phpspec run')
        local('php bin/behat')

    # with lcd(env.local_dir+'frontend/'):
    #     local('karma start karma.conf.js --single-run')
    #     local('protractor')


@task
def reinit():
    build()
    build_db()
    add_data()
