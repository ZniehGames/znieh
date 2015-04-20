#!/bin/bash

set -m

if [ ! -f /.rabbitmq_password_set ]; then
    /set_rabbitmq_password.sh
fi

# make rabbit own its own files
chown -R rabbitmq:rabbitmq /var/lib/rabbitmq

echo "# Declaring mapping"

# /usr/bin/rabbitmqadmin -p $RABBITMQ_PASS declare exchange name=email_registration type=direct auto_delete=false durable=true --vhost=/
# /usr/bin/rabbitmqadmin -p $RABBITMQ_PASS declare queue name=email_registration auto_delete=false durable=true --vhost=/
# /usr/bin/rabbitmqadmin -p $RABBITMQ_PASS declare binding source=email_registration destination=email_registration --vhost=/

/usr/sbin/rabbitmq-server
