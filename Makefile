SRC = $(shell find src -type f | sort)
POSTS = $(shell find /Users/dc/github.com/davidchambers/davidchambersdesign.com -name '*=*.text' | sort)

public/archives.html: bin/eval-file Makefile $(SRC) $(POSTS)
	NODE_ENV=production '$<' '$(CURDIR)/src/archives.clj' -- $(POSTS) >'$@'
