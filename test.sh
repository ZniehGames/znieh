#!/bin/sh

sudo chmod -R 777 /tmp/cache /tmp/logs

pids=$(pidof /usr/bin/Xvfb)
if ! [ -n "$pids" ]; then
    /usr/bin/Xvfb :99 -ac -screen 0 1024x768x24 &
fi

export CHROME_BIN=chromium-browser
export DISPLAY=:99

gulp
# Unit testing
# php bin/phpspec run
# karma start karma.conf.js --single-run
# jasmine-node gameserver
# # Functional testing
# php bin/behat
protractor protractor.conf.js
