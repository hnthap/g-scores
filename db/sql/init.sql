DROP DATABASE IF EXISTS gscores;

CREATE DATABASE gscores;

CREATE TABLE gscores.djangobackend_student (
    sbd             CHAR(8) NOT NULL PRIMARY KEY,
    toan            DECIMAL(4, 2) DEFAULT NULL,
    ngu_van         DECIMAL(4, 2) DEFAULT NULL,
    ngoai_ngu       DECIMAL(4, 2) DEFAULT NULL,
    vat_li          DECIMAL(4, 2) DEFAULT NULL,
    hoa_hoc         DECIMAL(4, 2) DEFAULT NULL,
    sinh_hoc        DECIMAL(4, 2) DEFAULT NULL,
    lich_su         DECIMAL(4, 2) DEFAULT NULL,
    dia_li          DECIMAL(4, 2) DEFAULT NULL,
    gdcd            DECIMAL(4, 2) DEFAULT NULL,
    ma_ngoai_ngu    CHAR(2) DEFAULT NULL
);

LOAD DATA INFILE '/var/lib/mysql-files/scores.csv'
INTO TABLE gscores.djangobackend_student
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(
    sbd, toan, ngu_van, ngoai_ngu,
    vat_li, hoa_hoc, sinh_hoc,
    lich_su, dia_li, gdcd, ma_ngoai_ngu
);

DROP USER IF EXISTS '${MYSQL_USER}'@'%';
CREATE USER '${MYSQL_USER}'@'%'
IDENTIFIED WITH mysql_native_password
BY '${MYSQL_PASSWORD}';
GRANT ALL PRIVILEGES ON gscores.*
TO '${MYSQL_USER}'@'%';

DROP USER IF EXISTS '${MYSQL_USER}'@'localhost';
CREATE USER '${MYSQL_USER}'@'localhost'
IDENTIFIED WITH mysql_native_password BY '${MYSQL_PASSWORD}';
GRANT ALL PRIVILEGES ON gscores.*
TO '${MYSQL_USER}'@'localhost';

FLUSH PRIVILEGES;
