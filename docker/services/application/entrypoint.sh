#!/bin/bash

rm -rf /var/www/api/app/cache/*
/bin/bash -l -c "$*"
