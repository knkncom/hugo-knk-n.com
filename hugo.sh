#!/bin/sh

hugo_new() {
  SLUG=${1}
  FILENAME=$(date '+%F')-${SLUG}.md
  hugo new ${YEAR}/${MONTH}/${DAY}/${FILENAME}
  sed -i '' "s/slug: null/slug: ${SLUG}/g" content/archives/${FILENAME}
  open content/archives/${FILENAME}
}

hugo_server() {
  open http://localhost:1313/
  hugo server --watch --buildDrafts
}

publish() {
  aws s3 sync ./public s3://knk-n.com --delete --exclude=.DS_Store --cache-control "max-age=300" --acl=public-read
}

case $1 in
  'new')
    hugo_new $2
    ;;
  'server')
    hugo_server
    ;;
  'publish')
    publish
    ;;
  *)
    echo "Usage: $0 <new|server|publish>"
    exit 2
    ;;
esac
