POSTS = $(shell find posts -name '*.clj')
SRC = $(shell find src -type f)
SLUGS = $(shell find posts -name '*=*.text' -print0 | xargs -0 basename -s .text | sort -n | cut -d = -f 2)
ICONS = $(patsubst src/%.clj,public/%.svg,$(shell find src/icons/nav -name '*.clj'))
IMAGES = $(patsubst %,public/%,$(shell find images -type f))


.PHONY: all
all: \
		public/archives.html \
		$(SLUGS:%=public/%.html) \
		$(ICONS) \
		$(IMAGES)

public:
public/css:
public/icons/nav:
	mkdir -p -- '$@'

public/css/%.css: public/css
	curl --silent 'https://raw.githubusercontent.com/davidchambers/davidchambersdesign.com/static/src/css/$*.css' >'$@'

public/images/%: images/%
	mkdir -p -- '$(@D)'
	cp -- '$<' '$@'

public/icons/nav/twitter.svg: src/icons/nav/twitter.clj public/icons/nav
	bin/eval-file '$(CURDIR)/$<' >'$@'

public/icons/nav/%.svg: src/icons/nav/%.clj src/icon.clj public/icons/nav
	bin/eval-file '$(CURDIR)/src/icon.clj' '$(CURDIR)/$<' >'$@'

public/archives.html: $(POSTS) $(SRC) public
	bin/eval-file '$(CURDIR)/src/archives.clj' $(POSTS:%=$(CURDIR)/%) >'$@'

public/%.html: posts/*\=%.clj
	bin/eval-file '$(CURDIR)/src/post.clj' '$(CURDIR)/$<' >'$@'
