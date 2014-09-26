#!/bin/sh

sudo chmod -R 777 /tmp/cache /tmp/logs

pids=$(pidof /usr/bin/Xvfb)
if ! [ -n "$pids" ]; then
    /usr/bin/Xvfb :99 -ac -screen 0 1024x768x24 &
fi

export DISPLAY=:99

gulp
php bin/phpspec run
php bin/behat
protractor cucumberConf.js
