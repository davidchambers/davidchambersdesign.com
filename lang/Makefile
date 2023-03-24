.PHONY: all
all: \
		dist/codegen.js \
		dist/grammar.js \
		dist/index.js \
		dist/repl.js \
		dist/serif.js
	node -- dist/serif.js '$(CURDIR)/src' '$(CURDIR)/dist' '$(CURDIR)/src/serif.serif' '$(CURDIR)/src/repl.serif'

dist/grammar.js: serif.pegjs
	node_modules/.bin/peggy --format es <'$<' >'$@'

dist/%: src/%
	cp -- '$<' '$@'

.PHONY: test
test:
	node -- node_modules/.bin/oletus -- src/test/grammar.js
