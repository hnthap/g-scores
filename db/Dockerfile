FROM mysql:8.0.41-debian

COPY my.cnf /etc/mysql/conf.d
COPY ./sql/init.sql /docker-entrypoint-initdb.d/

RUN chmod 644 /etc/mysql/conf.d/my.cnf && \
    mkdir -p /var/lib/mysql && \
    chown -R mysql:mysql /var/lib/mysql

CMD [ \
    "mysqld", \
    "--default-authentication-plugin=mysql_native_password", \
    "--character-set-server=utf8mb4", \
    "--collation-server=utf8mb4_unicode_ci" \
]
