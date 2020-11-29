SRC = $(shell find src -type f | sort)
POSTDIR = /Users/dc/github.com/davidchambers/davidchambersdesign.com
SLUGS = $(shell find '$(POSTDIR)' -name '*=*.text' -print0 | xargs -0 basename -s .text | sort -n | cut -d = -f 2)
REPRS = $(patsubst %,cache/%.clj,$(SLUGS))
ICONS = $(patsubst src/%.clj,public/%.svg,$(shell find src/icons/nav -name '*.clj'))


.PHONY: all
all: \
		public/archives.html \
		$(SLUGS:%=public/%.html) \
		$(ICONS)

cache/%.clj: $(POSTDIR)/*\=%.text
	bin/eval-file '$(CURDIR)/src/extract-post.clj' '$<' >'$@'

public:
	mkdir -p -- '$@'

public/icons/nav:
	mkdir -p -- '$@'

public/icons/nav/twitter.svg: src/icons/nav/twitter.clj public/icons/nav
	bin/eval-file '$(CURDIR)/$<' >'$@'

public/icons/nav/%.svg: src/icons/nav/%.clj src/icon.clj public/icons/nav
	bin/eval-file '$(CURDIR)/src/icon.clj' '$(CURDIR)/$<' >'$@'

public/archives.html: $(REPRS) $(SRC) public
	bin/eval-file '$(CURDIR)/src/archives.clj' $(REPRS:%=$(CURDIR)/%) >'$@'

public/%.html: cache/%.clj $(SRC) public
	bin/eval-file '$(CURDIR)/src/post.clj' '$(<:%=$(CURDIR)/%)' >'$@'
