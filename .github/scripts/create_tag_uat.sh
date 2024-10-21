#!/usr/bin/env bash

# Author: Samuel Nieto
# Mail: snieto@ryndem.mx

# Salida del script en caso de fallo
set -euo pipefail

# Obtiene la última versión de package.json
GIT_TAG_LATEST=$(jq -r '.version' < "./package.json")
echo "Última Versión: $GIT_TAG_LATEST"

# Divide la versión en componentes MAJOR, MINOR y PATCH
MAJOR=$(echo "$GIT_TAG_LATEST" | awk -F. '{print $1}')
MINOR=$(echo "$GIT_TAG_LATEST" | awk -F. '{print $2}')
PATCH=$(echo "$GIT_TAG_LATEST" | awk -F. '{print $3}')

# Incrementa la versión
PATCH=$((PATCH + 1))

# Si el PATCH llega a 10, reinicia el PATCH y aumenta el MINOR
if [ "$PATCH" -ge 10 ]; then
  PATCH=0
  MINOR=$((MINOR + 1))
fi

# Si el MINOR llega a 10, reinicia el MINOR y aumenta el MAJOR
if [ "$MINOR" -ge 10 ]; then
  MINOR=0
  MAJOR=$((MAJOR + 1))
fi

# Crea la nueva versión
VERSION_NEXT="$MAJOR.$MINOR.$PATCH"
echo "Nueva Versión: $VERSION_NEXT"


# Actualiza la versión en package.json
sed -i "s/\"version\": \".*\"/\"version\": \"$VERSION_NEXT\"/" ./package.json
git config --global user.email "snieto@ryndem.mx"
git config --global user.name "DevOps🚀"

git add package.json
git commit -m "🤖 Cambio de versión ------> nueva versión: - $VERSION_NEXT"
git push origin uat

#git tag -a "$VERSION_NEXT" -m "Release: $VERSION_NEXT"

#git push origin dev --follow-tags

#echo "Nueva versión: $(jq -r '.version' < "./package.json")"

#ng build --configuration dev
