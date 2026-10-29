#!/bin/sh
set -xe
: "${SERVER_NAME?Precisa de uma variavel de ambiente SERVER_NAME}"

echo "DEBUG: VITE_SIGLA_API_URL=${VITE_SIGLA_API_URL}"
echo "DEBUG: VITE_ADMIN_USUARIOS_API_URL=${VITE_ADMIN_USUARIOS_API_URL}"

envsubst \
  '${VITE_SIGLA_API_URL} ${VITE_ADMIN_USUARIOS_API_URL}' \
  < /usr/share/nginx/html/env.js.template \
  > /tmp/env.js
mv /tmp/env.js /usr/share/nginx/html/env.js

echo "DEBUG: env.js content after envsubst:"
cat /usr/share/nginx/html/env.js

# Nginx: server_name no default.conf
sed -i "s,SERVER_NAME,$SERVER_NAME,g" /etc/nginx/conf.d/default.conf

exec "$@"
