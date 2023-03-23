.PHONY: all
all: \
		src/grammar.js \
		dist/codegen.js \
		dist/grammar.js \
		dist/index.js \
		dist/repl.js \
		dist/serif.js \
		dist/prelude.js \
		dist/rewrite.js

src/grammar.js: serif.pegjs
	node_modules/.bin/peggy --format es --dependencies '{"* as Serif": "./types.js"}' <'$<' >'$@'

.PHONY: dist/prelude.js
dist/prelude.js: src/prelude.serif
	node -- dist/serif.js '$(CURDIR)/src' '$(CURDIR)/dist' '$(CURDIR)/$<'

.PHONY: dist/rewrite.js
dist/rewrite.js: src/rewrite.serif
	node -- dist/serif.js '$(CURDIR)/src' '$(CURDIR)/dist' '$(CURDIR)/$<'

dist/%: src/%
	cp -- '$<' '$@'

.PHONY: test
test:
	node -- node_modules/.bin/oletus -- src/test/grammar.js
