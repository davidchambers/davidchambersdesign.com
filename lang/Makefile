.PHONY: all
all: \
		src/grammar.js \
		dist/codegen.js \
		dist/grammar.js \
		dist/index.js \
		dist/prelude.js \
		dist/repl.js \
		dist/rewrite.js \
		dist/serif.js \
		dist/types.js

src/grammar.js: serif.pegjs
	node_modules/.bin/peggy --format es --dependencies '{"* as Serif": "./types.js"}' <'$<' >'$@'

.PHONY: dist/types.js
dist/types.js: src/types.serif
	node -- dist/serif.js '$(CURDIR)/src' '$(CURDIR)/dist' '$(CURDIR)/$<'

dist/%: src/%
	cp -- '$<' '$@'

.PHONY: test
test:
	node -- node_modules/.bin/oletus -- src/test/grammar.js
