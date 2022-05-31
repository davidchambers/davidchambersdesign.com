.PHONY: all
all:
	NODE_ENV=production ../lang/bin/serif '$(CURDIR)/src' '$(CURDIR)/lib' '$(CURDIR)/src/scripts/everything.serif'
	NODE_ENV=production node -- '$(CURDIR)/lib/scripts/everything.mjs'
