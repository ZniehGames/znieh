FROM debian:wheezy

MAINTAINER Aurélien David <adavid@jolicode.com>

RUN groupadd -r mysql && useradd -r -g mysql mysql

# Install mariadb server
RUN apt-get update && \
    apt-get install -y perl libaio1 python-software-properties && \
    apt-key adv --recv-keys --keyserver keyserver.ubuntu.com 0xcbcb082a1bb943db && \
    add-apt-repository 'deb http://nwps.ws/pub/mariadb/repo/10.0/debian wheezy main' && \
    apt-get update && \
    apt-get install -y mariadb-server && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    rm -rf /var/lib/mysql/*

# Change bind address to 0.0.0.0
RUN sed -i -r 's/bind-address.*$/bind-address = 0.0.0.0/' /etc/mysql/my.cnf

ADD create_mariadb_user.sh /create_mariadb_user.sh
ADD entrypoint.sh /entrypoint.sh
RUN chmod 775 /*.sh

# Add VOLUMEs to allow backup of config and databases
VOLUME  ["/etc/mysql", "/var/lib/mysql"]

#Added to avoid in container connection to the database with mysql client error message "TERM environment variable not set"
ENV TERM dumb

EXPOSE 3306
CMD ["/entrypoint.sh"]

