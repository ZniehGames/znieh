from __future__ import with_statement

import requests
import os

from fabric.api import *
from fabric.context_managers import lcd
from fabric.colors import red, green
# from libsaas.services import github

# GH_USER  = 'jolicode'
# REPO     = 'naissance'

# env.circleci  = False
env.local_dir = env.real_fabfile[:-10]

# @task
# def circleci():
#     env.circleci = True
#     env.gh_token = os.environ['GH_TOKEN']

# def create_PR_comment(type, result, pr):
#     if os.getenv('GH_TOKEN', True):
#         try:
#             prId      = int(pr.split('/')[-1])
#             gh_client = github.Github(env.gh_token)
#             gh_pr     = gh_client.repo(GH_USER, REPO).issue(prId).comments().create('Warning: You should check your '+type+' files.\n '+result)
#         except ValueError:
#             print 'Can\'t retrieve pr id'
@task
def config():
    with lcd(env.local_dir):
        local('cp api/app/config/parameters.yml.dist api/app/config/parameters.yml')
        local('cp frontend/config/main.json.dist frontend/config/main.json')
        local('cp gameserver/config/default.json.dist gameserver/config/default.json')

@task
def config_ci():
    with lcd(env.local_dir):
        local('cp api/app/config/parameters.yml.ci api/app/config/parameters.yml')
        local('cp frontend/config/main.json.ci frontend/config/main.json')
        local('cp gameserver/config/ci.json gameserver/config/default.json')

@task
def gulp():
    with lcd(env.local_dir+'frontend/'):
        local('gulp')

@task
def build():
    with lcd(env.local_dir+'frontend/'):
        local('npm install')
        local('bower install --config.interactive=false --allow-root')
        local('gulp')

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
    with lcd(env.local_dir+'frontend/'):
        with settings(warn_only=True):
            local('gulp', capture=True)
            local('gulp sass-lint', capture=True)
            result = local('gulp js-lint', capture=True)
            if result.return_code == 0:
                print(green('JS: OK'))
            elif result.return_code == 1:
                print result
                print(red('JS: /!\ You should fix your JS files!'))
                # if env.circleci:
                #     create_PR_comment('JS', result, pr)

            else: #print error to user
                print result
                raise SystemExit()

    with lcd(env.local_dir+'api/'):
        with settings(warn_only=True):
            result = local('php-cs-fixer fix . --config=sf23 --dry-run', capture=True)

            if result.return_code == 0:
                print(green('PHP: OK'))
            elif result.return_code == 1:
                print result
                print(red('PHP: /!\ You should fix your PHP files!'))

                # if env.circleci:
                #     create_PR_comment('PHP', result, pr)
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

    with lcd(env.local_dir+'frontend/'):
        local('karma start karma.conf.js --single-run')
        local('protractor')


@task
def reinit():
    build()
    build_db()
    add_data()
