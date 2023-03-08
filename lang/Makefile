.PHONY: all
all: src/grammar.js lib/grammar.js
	node_modules/.bin/tsc

src/grammar.js: serif.pegjs
	node_modules/.bin/peggy --format es <'$<' >'$@'

lib/grammar.js: src/grammar.js
	cp -- '$<' '$@'
