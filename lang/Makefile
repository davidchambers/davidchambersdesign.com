.PHONY: all
all:
	node_modules/.bin/peggy --format es --dependencies '{"Node": "./Node.js"}' <serif.pegjs >dist/grammar.js
	node -- dist/serif.js src dist {repl,serif}.serif
