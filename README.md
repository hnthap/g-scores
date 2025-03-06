# G-Scores

<div style="
    --padding-horizontal: 20px;
    padding-top: 10px; 
    padding-bottom: 20px; 
    padding-left: var(--padding-horizontal);
    padding-right: var(--padding-horizontal);
    width: calc(100% - 2 * var(--padding-horizontal)); 
    display: flex; 
    flex-direction: row; 
    flex-wrap: wrap; 
    justify-content: center;
  ">
    <img alt="docker" src="https://img.shields.io/badge/-Docker-1D63ED?style=flat-square&logo=docker&logoColor=white" />
    <img alt="mysql" src="https://img.shields.io/badge/-MySQL-003B57?style=flat-square&logo=mysql&logoColor=white" />
    <img alt="nestjs" src="https://img.shields.io/badge/-NestJS-auto?style=flat-square&logo=NestJS&logoColor=auto" />
    <img alt="typescript" src="https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" />
</div>

This is **G-Scores**, a web application for looking up the result of the [High School Graduation Examination](https://en.wikipedia.org/wiki/High_School_Graduation_Examination).


## Requirements

* Docker (Docker CLI and Docker Compose).

## Setup

At the root of this repository, add a file `db.docker.env` with the content:

```dotenv
MYSQL_HOST=db
MYSQL_USER=<replace this with the actual username>
MYSQL_PASSWORD=<replace this with the actual password>
MYSQL_ROOT_PASSWORD=<replace this with the actual root password>
```

Then run:

```bash
docker-compose up --build --detach
```

The backend serves at `http://localhost:8000`, and the frontend serves at `http://localhost:3000`. 

