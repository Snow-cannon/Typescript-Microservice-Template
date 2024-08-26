# Typescript Microservice Template

This template uses Docker, Typescript, React and Mocha to allow for a full-stack containerized project with build in testing for individual services.

## Project Commands

The project uses a Makefile to simplify commands. You can run the following top-level commands from the top-level or any of the service folders:

```bash
make build-project
make clean-project
make clean-project-volumes
```

### make build-project

This command re-builds the containers using `docker compose up` and starts the containerized project

### make clean-project

This command stops the containers using `docker compose down` and auto-prunes the stopped containers if you enter 'yes'

### make clean-project-volumes

This command runs clean-project with the `--volumes` tag, so the volumes will get pruned as well. Use if you want to clear the database used with the project.

## Service Commands

### Backend

The backend service has its own Makefile that includes the top-level Makefile, allowing you to run the project commands as well. It also has its own service-level commands:

```bash
make test
make build-service
make start-service
make dev
```

All of these are aliases of the ```npm``` scripts within the package.json

### Frontend

The frontend also has a Makefile with aliased npm scripts:

```bash
make eject
make test
make build-service
make start-service
```