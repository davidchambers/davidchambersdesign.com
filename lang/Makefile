.PHONY: all
all:
	node_modules/.bin/peggy --format es <serif.pegjs >dist/grammar.js
	node -- dist/serif.js '$(CURDIR)/src' '$(CURDIR)/dist' '$(CURDIR)/src/serif.serif' '$(CURDIR)/src/repl.serif'
