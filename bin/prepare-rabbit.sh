#!/bin/sh

echo "# Enable rabbitmq_management plugin"
rabbitmq-plugins enable rabbitmq_management

if ! type "rabbitmqadmin" > /dev/null
then
    echo "# Installing rabbitmqadmin"
    curl -XGET http://127.0.0.1:15672/cli/rabbitmqadmin > /usr/local/bin/rabbitmqadmin
    chmod +x /usr/local/bin/rabbitmqadmin
fi

echo "# Declaring mapping"
rabbitmqadmin declare exchange name=email_registration type=direct auto_delete=false durable=true --vhost=/

rabbitmqadmin declare queue name=email_registration auto_delete=false durable=true --vhost=/

rabbitmqadmin declare binding source=email_registration destination=email_registration --vhost=/
