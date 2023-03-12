.PHONY: all
all: src/grammar.js lib/grammar.js
	node_modules/.bin/tsc

src/grammar.js: serif.pegjs
	node_modules/.bin/peggy --format es --dependencies '{"* as Serif": "./types.js"}' <'$<' >'$@'

lib/grammar.js: src/grammar.js
	cp -- '$<' '$@'

.PHONY: test
test:
	node_modules/.bin/tsc
	node -- node_modules/.bin/oletus -- lib/test/grammar.js
