#!/bin/sh

set -e
set -u

# Exposed ENV variables
USER_COMMANDS=${USER_COMMANDS:=$@} # take extra commands from ENV variable OR arguments passed to docker run
RABBITMQ_PASS=${RABBITMQ_PASS:="password"}
RABBITMQ_CONFIG_FILE=${RABBITMQ_CONFIG_FILE:="/etc/rabbitmq/rabbitmq"}
RABBITMQ_LOGS=${RABBITMQ_LOGS:="/var/log/rabbitmq/rabbit@${HOSTNAME}.log"}
RABBITMQ_SASL_LOGS=${RABBITMQ_SASL_LOGS:="/var/log/rabbitmq/rabbit@${HOSTNAME}-sasl.log"}

# Export ENV variables which affects RabbitMQ
export RABBITMQ_CONFIG_FILE RABBITMQ_LOGS RABBITMQ_SASL_LOGS

function terminate_rabbit() {
  echo Stopping rabbitmq
  rabbitmqctl stop
  exit 0
}

# Trap INT and TERM signals to do clean shutdown
trap terminate_rabbit SIGINT SIGTERM

# make rabbit own its own files
touch $RABBITMQ_LOGS # We do tail/grep on this file right after server starts, make sure it exists...
chown -R rabbitmq:rabbitmq /var/lib/rabbitmq $RABBITMQ_LOGS

# Update the config file and show it on stdout
sed -i "s/<<\"password\">>/<<\"${RABBITMQ_PASS}\">>/g" "${RABBITMQ_CONFIG_FILE}.config"
echo "Config file ${RABBITMQ_CONFIG_FILE}.config:" && cat "${RABBITMQ_CONFIG_FILE}.config"

/usr/sbin/rabbitmq-server &
rabbitmq_pid=$!
tail -F $RABBITMQ_LOGS & # tail the log file to stdout

# Wait for the server to start
while true; do if grep -q -i "Server startup complete" $RABBITMQ_LOGS; then break; else sleep 0.5; fi; done

# Some command(s) has been passed to container? Execute them.
# This is useful to run some rabbitmqctl commands, add users, vhosts etc.
if [[ $USER_COMMANDS ]]; then
  echo
  echo "================== Executing user-provided commands: =================="
  echo "$USER_COMMANDS"
  echo "======================================================================="
  eval $USER_COMMANDS # exec user commands
  echo "======================= User commands executed. ======================="
fi

wait $rabbitmq_pid
