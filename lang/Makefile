.PHONY: all
all: src/grammar.js

src/grammar.js: serif.pegjs
	node_modules/.bin/peggy --format es --dependencies '{"* as Serif": "./types.js"}' <'$<' >'$@'

.PHONY: test
test:
	node -- node_modules/.bin/oletus -- src/test/grammar.js
