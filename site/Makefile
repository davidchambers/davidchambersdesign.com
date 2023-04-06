.PHONY: all
all: everything

.PHONY: everything
everything:
	deno run --allow-read=. --allow-write=lib ../lang/dist/serif.js src lib scripts/{check-links,everything}.serif
	deno run --allow-write=public lib/scripts/everything.js

.PHONY: check-links
check-links: all
	deno run --allow-net lib/scripts/check-links.js
