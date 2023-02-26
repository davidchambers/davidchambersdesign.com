.PHONY: all
all:
	NODE_ENV=production node --experimental-vm-modules --no-warnings -- ../lang/bin/serif.js '$(CURDIR)/src' '$(CURDIR)/lib' '$(CURDIR)/src/scripts/everything.serif'
	NODE_ENV=production node -- '$(CURDIR)/lib/scripts/everything.js'
