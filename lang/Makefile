.PHONY: all
all: grammar.js

grammar.js: grammar.pegjs
	node_modules/.bin/pegjs <'$<' >'$@'
