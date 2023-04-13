.PHONY: all
all:
	node_modules/.bin/peggy --format es --dependencies '{"* as Maybe": "./Maybe.js", "* as Node": "./Node.js"}' <serif.pegjs >dist/grammar.js
	deno run --allow-read=. --allow-write=dist dist/serif.js src dist {repl,serif}.serif
