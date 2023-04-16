.PHONY: all
all:
	deno run --allow-read=. --allow-write=dist ../lang/dist/serif.js src dist {index,motivation}.serif
	deno run dist/index.js >public/index.html
	deno run dist/motivation.js >public/motivation.html
