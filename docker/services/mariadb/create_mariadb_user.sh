#!/bin/bash

/usr/bin/mysqld_safe > /dev/null 2>&1 &

RET=1
while [[ RET -ne 0 ]]; do
    echo "=> Waiting for confirmation of MariaDB service startup"
    sleep 5
    mysql -uroot -e "status" > /dev/null 2>&1
    RET=$?
done


echo "=> Creating MariaDB 'znieh' user with 'znieh' password"

mysql -uroot -e "CREATE USER 'znieh'@'%' IDENTIFIED BY 'znieh'"
mysql -uroot -e "GRANT ALL PRIVILEGES ON *.* TO 'znieh'@'%' WITH GRANT OPTION"

echo "=> Creating 'znieh' and 'znieh_test' databases"

mysql -uroot -e "CREATE DATABASE znieh"
mysql -uroot -e "CREATE DATABASE znieh_test"

echo "=> Done!"

mysqladmin -uroot shutdown
