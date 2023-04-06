.PHONY: all
all:
	deno run --allow-read=. --allow-write=dist ../lang/dist/serif.js src dist index.serif
	deno run dist/index.js >public/index.html
