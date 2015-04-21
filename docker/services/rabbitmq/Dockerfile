FROM ubuntu:trusty
MAINTAINER Aurélien David <adavid@jolicode.com>

# Install RabbitMQ
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys F7B8CEA6056E8E56 && \
    echo "deb http://www.rabbitmq.com/debian/ testing main" >> /etc/apt/sources.list && \
    apt-get update && \
    apt-get install -y rabbitmq-server pwgen && \
    rabbitmq-plugins enable rabbitmq_management && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN /usr/sbin/rabbitmq-plugins enable rabbitmq_mqtt rabbitmq_stomp rabbitmq_management

# Add config
ADD rabbitmq.config /etc/rabbitmq/
RUN chmod 755 /etc/rabbitmq/rabbitmq.config

# Add scripts
ADD run.sh /run.sh
RUN chmod 755 ./*.sh

EXPOSE 5672 15672
CMD ["/run.sh"]
