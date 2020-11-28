SRC = $(shell find src -type f | sort)
POSTDIR = /Users/dc/github.com/davidchambers/davidchambersdesign.com
REPRS = $(patsubst %.text,cache/%.clj,$(shell find '$(POSTDIR)' -name '*=*.text' -print0 | xargs -0 basename | sort -n | cut -d = -f 2))

cache/%.clj: $(POSTDIR)/*\=%.text
	bin/eval-file '$(CURDIR)/src/extract-post.clj' '$<' >'$@'

public/archives.html: $(REPRS) $(SRC)
	bin/eval-file '$(CURDIR)/src/archives.clj' $(REPRS:%=$(CURDIR)/%) >'$@'

public/%.html: cache/%.clj $(SRC)
	bin/eval-file '$(CURDIR)/src/post.clj' '$(<:%=$(CURDIR)/%)' >'$@'
