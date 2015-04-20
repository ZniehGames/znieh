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

# RUN apt-get update && apt-get install -y python
# ADD https://raw.githubusercontent.com/rabbitmq/rabbitmq-management/rabbitmq_v3_5_1/bin/rabbitmqadmin /usr/bin/rabbitmqadmin
# RUN chmod u+x /usr/bin/rabbitmqadmin

# Add scripts
ADD run.sh /run.sh
ADD set_rabbitmq_password.sh /set_rabbitmq_password.sh
RUN chmod 755 ./*.sh

EXPOSE 5672 15672
CMD ["/run.sh"]
