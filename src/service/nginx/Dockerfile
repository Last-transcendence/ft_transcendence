FROM debian:bookworm-slim

LABEL	name="nginx" \
		version="1.0" \
		description="nginx"

# create nginx user/group first, to be consistent throughout docker variants
RUN set -x \
    && groupadd --system --gid 101 nginx \
    && useradd --system --gid nginx --no-create-home --home /nonexistent --comment "nginx user" --shell /bin/false --uid 101 nginx \
    && apt-get update \
    && apt-get install --no-install-recommends --no-install-suggests -y gnupg1 ca-certificates

RUN apt-get install -y nginx
RUN apt-get install -y openssl

COPY ./conf/default /etc/nginx/sites-available/default
COPY ./tool /tool

RUN chmod +x /tool/setup.sh

ENTRYPOINT [ "/bin/bash", "/tool/setup.sh" ]