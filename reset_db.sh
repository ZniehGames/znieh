#! /bin/bash

mode="dev"
if [[ -n "$1" ]]
then
   mode=$1
fi

if [ $mode = "test" ]
then
   php app/console doctrine:schema:drop --force --env=test
   php app/console doctrine:schema:update --force --env=test
   php app/console doctrine:fixtures:load -n --env=test
elif [ $mode = "dev" ]
then
   php app/console doctrine:schema:drop --force
   php app/console doctrine:schema:update --force
   php app/console doctrine:fixtures:load -n
fi

php app/console c:c --env=dev
php app/console c:c --env=test