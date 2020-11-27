SRC = $(shell find src -type f | sort)
POSTDIR = /Users/dc/github.com/davidchambers/davidchambersdesign.com
POSTS = $(shell find $(POSTDIR) -name '*=*.text' | sort)

public/archives.html: bin/eval-file Makefile $(SRC) $(POSTS)
	NODE_ENV=production '$<' '$(CURDIR)/src/archives.clj' -- $(POSTS) >'$@'

public/tiny-calendar-icon-set.html: $(POSTDIR)/14\=tiny-calendar-icon-set.text bin/eval-file Makefile $(SRC) $(POSTS)
	NODE_ENV=production bin/eval-file '$(CURDIR)/src/tiny-calendar-icon-set.clj' -- '$<' >'$@'
