.PHONY: all
all: everything

.PHONY: everything
everything:
	node -- ../lang/dist/serif.js src lib scripts/{check-links,everything}.serif
	NODE_ENV=production node -- lib/scripts/everything.js

.PHONY: check-links
check-links: all
	NODE_ENV=production node --no-warnings -- lib/scripts/check-links.js
