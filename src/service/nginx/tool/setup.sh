#!/bin/sh
# vim:sw=4:ts=4:et

set -e

$LOCAL && openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout $NEXTJS_CERTS_KEY -out $NEXTJS_CERTS -subj "/C=MO/L=KH/O=1337/OU=student/CN=www.$DOMAIN_NAME"
$LOCAL && openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout $NESTJS_CERTS_KEY -out $NESTJS_CERTS -subj "/C=MO/L=KH/O=1337/OU=student/CN=dev.$DOMAIN_NAME"

sed -i "s|nextjs_port|$NEXTJS_PORT|g"			"/etc/nginx/conf.d/default.conf"
sed -i "s|nextjs_certs_key|$NEXTJS_CERTS_KEY|g"	"/etc/nginx/conf.d/default.conf"
sed -i "s|nextjs_certs|$NEXTJS_CERTS|g"			"/etc/nginx/conf.d/default.conf"
sed -i "s|nestjs_port|$NESTJS_PORT|g"			"/etc/nginx/conf.d/default.conf"
sed -i "s|nestjs_certs_key|$NESTJS_CERTS_KEY|g"	"/etc/nginx/conf.d/default.conf"
sed -i "s|nestjs_certs|$NESTJS_CERTS|g"			"/etc/nginx/conf.d/default.conf"
sed -i "s|my_domain|$DOMAIN_NAME|g"				"/etc/nginx/conf.d/default.conf"