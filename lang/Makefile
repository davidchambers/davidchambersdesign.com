.PHONY: all
all:
	deno run --allow-read=. --allow-write=dist dist/serif.js src dist Pattern.serif
	node_modules/.bin/peggy --format es --dependencies '{"* as Maybe": "./Maybe.js", "* as Node": "./SourceNode.js", "* as Pattern": "./Pattern.js"}' <serif.pegjs >dist/grammar.js
	deno run --allow-read=. --allow-write=dist dist/serif.js src dist {repl,serif}.serif
