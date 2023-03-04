.PHONY: all
all: src/grammar.js
	node_modules/.bin/tsc

src/grammar.js: serif.pegjs
	node_modules/.bin/peggy --format es <'$<' >'$@'
