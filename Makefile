# Easier docker commands

.PHONY: build-project clean-project clean-volume

build-project:
	@docker compose up --build

clean-project:
	@docker compose down
	@docker container prune

clean-project-volume:
	@docker compose down --volumes
	@docker container prune

# END