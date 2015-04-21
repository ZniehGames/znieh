FROM centos:centos7
MAINTAINER Aurélien David <adavid@jolicode.com>

# Install RabbitMQ
RUN \
  yum update -y && \
  yum install -y epel-release wget && \
  yum install -y rabbitmq-server && \
  rabbitmq-plugins enable rabbitmq_management && \
  yum clean all

RUN /usr/sbin/rabbitmq-plugins enable rabbitmq_mqtt rabbitmq_stomp rabbitmq_management

# Install rabbitmqadmin CLI
RUN \
    wget https://raw.githubusercontent.com/rabbitmq/rabbitmq-management/rabbitmq_v3_5_1/bin/rabbitmqadmin && \
    chmod 777 rabbitmqadmin && \
    mv rabbitmqadmin /usr/local/bin

# Add config
ADD rabbitmq.config /etc/rabbitmq/
RUN chmod 755 /etc/rabbitmq/rabbitmq.config

# Add scripts
ADD run.sh /run.sh
RUN chmod 755 ./*.sh

EXPOSE 5672 15672

# Import bindings config
# /usr/local/bin/rabbitmqadmin -q import rabbitmq.json

ENV USER_COMMANDS \
    rabbitmqctl add_user znieh znieh && \
    rabbitmqctl set_user_tags znieh administrator && \
    rabbitmqctl set_permissions -p / znieh ".*" ".*" ".*"  && \
    rabbitmqctl set_policy TTL ".*" '{"message-ttl":60000}' && \
    rabbitmqctl set_policy AutoExpire "amq*" '{"expires":1800000}' && \
    rabbitmqadmin -u znieh -p znieh declare exchange name=email_registration type=direct auto_delete=false durable=true --vhost=/ && \
    rabbitmqadmin -u znieh -p znieh declare queue name=email_registration auto_delete=false durable=true --vhost=/ && \
    rabbitmqadmin -u znieh -p znieh declare binding source=email_registration destination=email_registration --vhost=/

CMD ["/run.sh"]
