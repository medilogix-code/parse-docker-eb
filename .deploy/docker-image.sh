#!/bin/bash

set -e

REPO_OWNER="zealmurapa"
REPO_NAME=$(basename "$(pwd)")
REPOSITORY="$REPO_OWNER/$REPO_NAME"

if [ -z "$GITHUB_TOKEN" ]; then
    GITHUB_TOKEN=$(security find-generic-password -a zealmurapa -s github-token -w 2>/dev/null || echo "")
fi

if [ -z "$GITHUB_TOKEN" ] || [ "$GITHUB_TOKEN" = "null" ]; then
    echo "Error: GITHUB_TOKEN is null, empty, or not found" >&2
    echo "Set it as: export GITHUB_TOKEN=your_token" >&2
    echo "Or store in keychain: security add-generic-password -a zealmurapa -s github-token -w your_token" >&2
    exit 1
fi

if [ ! -f "src/version.json" ]; then
    echo "Error: src/version.json not found" >&2
    exit 1
fi

VERSION=$(grep '"version":' src/version.json | sed -E 's/.*"version": "([^"]+)".*/\1/')

if [ -z "$VERSION" ]; then
    echo "Error: version is empty or not found in src/version.json" >&2
    exit 1
fi

echo "Building Docker image for version: $VERSION"

docker build \
    -t ghcr.io/$REPOSITORY:$VERSION \
    -t ghcr.io/$REPOSITORY:latest \
    .

echo "Logging in to GitHub Container Registry..."
if ! echo "$GITHUB_TOKEN" | docker login ghcr.io -u "$REPO_OWNER" --password-stdin; then
    echo "Error: Docker login failed. Check your GITHUB_TOKEN has packages:write permission" >&2
    exit 1
fi

echo "Pushing Docker images..."
docker push ghcr.io/$REPOSITORY:$VERSION
docker push ghcr.io/$REPOSITORY:latest

echo "Build and push completed successfully!"
