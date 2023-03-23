.PHONY: all
all: everything

.PHONY: everything
everything:
	node -- ../lang/dist/serif.js '$(CURDIR)/src' '$(CURDIR)/lib' '$(CURDIR)/src/scripts/everything.serif'
	NODE_ENV=production node -- '$(CURDIR)/lib/scripts/everything.js'

.PHONY: check-links
check-links:
	node -- ../lang/dist/serif.js '$(CURDIR)/src' '$(CURDIR)/lib' '$(CURDIR)/src/scripts/check-links.serif'
	NODE_ENV=production node --no-warnings -- '$(CURDIR)/lib/scripts/check-links.js'
