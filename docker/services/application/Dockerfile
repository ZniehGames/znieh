FROM debian:wheezy

MAINTAINER Joël Wurtz <jwurtz@jolicode.com>

# Install basic
RUN apt-get update && \
    apt-get install -y wget runit locales && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install node js and deps for npm install
RUN apt-get update && \
    apt-get install -y wget bzip2 git libpng-dev && \
    wget https://deb.nodesource.com/setup -O- -q | bash - && \
    apt-get install -y nodejs npm && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install ruby / compass
RUN apt-get update && \
    apt-get install -y ruby rubygems ruby-dev && \
    gem install compass --no-ri --no-rdoc && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install nginx and php (fpm)
RUN echo "deb http://packages.dotdeb.org wheezy all" > /etc/apt/sources.list.d/dotdeb.list && \
    echo "deb-src http://packages.dotdeb.org wheezy all" >> /etc/apt/sources.list.d/dotdeb.list && \
    echo "deb http://packages.dotdeb.org wheezy-php56 all" >> /etc/apt/sources.list.d/dotdeb.list && \
    echo "deb-src http://packages.dotdeb.org wheezy-php56 all" >> /etc/apt/sources.list.d/dotdeb.list && \
    wget http://www.dotdeb.org/dotdeb.gpg -O- -q | apt-key add - && \
    apt-get update && \
    apt-get install -y nginx php5-fpm php5-curl php5-intl php5-mysqli && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /etc/apt/sources.list.d/*

# Update npm - Install gulp / bower
RUN npm install -g npm && \
    npm install -g gulp bower

# Install composer / phpunit / php-cs-fixer
RUN wget https://getcomposer.org/composer.phar -O- -q >> /usr/local/bin/composer && \
    chmod +x /usr/local/bin/composer && \
    wget https://phar.phpunit.de/phpunit.phar -O- -q >> /usr/local/bin/phpunit && \
    chmod +x /usr/local/bin/phpunit && \
    wget http://get.sensiolabs.org/php-cs-fixer.phar -O- -q >> /usr/local/bin/php-cs-fixer && \
    chmod +x /usr/local/bin/php-cs-fixer

# Install fake user 1000
RUN addgroup --gid=1000 znieh && \
    adduser --system --uid=1000 --home /home/znieh --shell /bin/bash znieh

# Use utf 8
RUN echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen && locale-gen
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

# Service
COPY nginx/run             /etc/service/nginx/run
COPY php-fpm/run           /etc/service/php-fpm/run

# Configuration
COPY nginx/nginx.conf      /etc/nginx/nginx.conf
COPY php-fpm/fpm.conf      /etc/service/php-fpm/fpm.conf
COPY php-fpm/znieh.ini /etc/php5/fpm/conf.d/znieh.ini
COPY php-fpm/znieh.ini /etc/php5/cli/conf.d/znieh.ini

# Volume for log / cache
VOLUME /var/www/znieh/app/cache
VOLUME /var/www/znieh/app/logs

EXPOSE 80

# Default command
CMD ["/usr/bin/runsvdir", "-P", "/etc/service"]
