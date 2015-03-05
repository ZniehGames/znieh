FROM debian:wheezy

MAINTAINER Joël Wurtz <jwurtz@jolicode.com>

VOLUME ["/var/lib/mysql"]

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

WORKDIR /usr/local/mysql

EXPOSE 3306

COPY entrypoint.sh /entrypoint.sh

ENV PATH $PATH:/usr/local/mysql/bin:/usr/local/mysql/scripts

ENTRYPOINT ["/entrypoint.sh"]

CMD ["mysqld", "--datadir=/var/lib/mysql", "--user=mysql"]
