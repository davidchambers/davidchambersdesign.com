.PHONY: all
all: src/grammar.js

src/grammar.js: serif.pegjs
	node_modules/.bin/peggy --format es <'$<' >'$@'
