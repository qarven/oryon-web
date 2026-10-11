.PHONY: help install run build translate fix clean test podman-build podman-run
PM ?= bun
RUN = $(PM) run

help: ## List available targets.
	@awk -F ':.*## ' '/^[a-zA-Z0-9_-]+:.*## / { printf "%-18s %s\n", $$1, $$2 }' Makefile
	@printf "\n"

install: ## Install dependencies (PM=bun|pnpm|npm|yarn), remove other lockfiles.
	@if [ "$(PM)" = "bun" ]; then \
		rm -f nub.lock pnpm-lock.yaml package-lock.json yarn.lock; \
	elif [ "$(PM)" = "nub" ]; then \
		rm -f bun.lock bun.lockb pnpm-lock.yaml package-lock.json yarn.lock; \
	elif [ "$(PM)" = "pnpm" ]; then \
		rm -f nub.lock bun.lock bun.lockb package-lock.json yarn.lock; \
	elif [ "$(PM)" = "npm" ]; then \
		rm -f nub.lock bun.lock bun.lockb pnpm-lock.yaml yarn.lock; \
	elif [ "$(PM)" = "yarn" ]; then \
		rm -f nub.lock bun.lock bun.lockb pnpm-lock.yaml package-lock.json; \
	else \
		echo "Unsupported PM: $(PM)"; \
		exit 1; \
	fi
	@$(PM) install

run: ## Start Vite dev server.
	$(RUN) dev

build: ## Build for production.
	@$(RUN) build

translate: ## Run translator.
	@$(RUN) translate

fix: ## Run all checks: lint + format + type check
	@$(RUN) fix

clean: ## Cleaning the app
	@rm -rf .output
	@rm -rf .tanstack
	@rm -rf .playwright
	@rm -rf node_modules

test: ## Run Playwright tests.
	@$(RUN) test

podman-build: ## Build production Podman image.
	@if podman image inspect oryon-web:latest>/dev/null 2>&1; then podman rmi -f oryon-web:latest; fi
	@set -a; . ./.env; set +a; \
	podman build -t oryon-web:latest -f Dockerfile \
		--build-arg VITE_APP_TITLE="$$VITE_APP_TITLE" \
		--build-arg VITE_SITE_URL="$$VITE_SITE_URL" \
		--build-arg VITE_APP_TURNSTILE_SITE_KEY="$$VITE_APP_TURNSTILE_SITE_KEY" \
		.

podman-run: ## Run production Podman image.
	@set -a; . ./.env; set +a; \
	podman run --rm -p 3000:3000 \
		-e SERVER_URL \
		-e TURNSTILE_SECRET_KEY \
		oryon-web:latest