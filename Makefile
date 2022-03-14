LANG_JS = $(shell find src/lang -name '*.js' | sort)
SITE_JS = $(patsubst %.clj,%.js,$(shell find src/site -name '*.clj' | sort))
POSTS_CLJ = $(shell find src/site/posts -name '*.clj' | sort)
POSTS_JS = $(POSTS_CLJ:%.clj=%.js)
POSTS_HTML = $(POSTS_CLJ:src/site/posts/%.clj=public/%.html)


.PHONY: all
all: \
	$(patsubst %,public/%,$(shell find images -type f)) \
	$(patsubst %.js,%,$(shell cd src/site && find public/icons -name '*.js' | sort)) \
	public/css/screen.css \
	public/archives.html \
	public/tags.html \
	$(POSTS_HTML)

.PRECIOUS: src/site/posts/related/%.json

src/%.js:                               $(LANG_JS) src/site/scripts/module.js src/%.clj
src/site/posts/related/%.json:          $(LANG_JS) $(SITE_JS) src/site/scripts/related-posts.js

src/%.js:
	node src/site/scripts/module.js src/$*.clj >'$@'

src/site/posts/related/%.json:
	mkdir -p -- '$(@D)'
	node src/site/scripts/related-posts.js src/site/posts/$*.js $(POSTS_JS) >'$@'

public/images/%: images/%
	mkdir -p -- '$(@D)'
	cp -- '$<' '$@'

public/css/screen.css:                  $(LANG_JS) $(SITE_JS) src/site/public/css/screen.css.js
public/icons/nav/%.svg:                 $(LANG_JS) $(SITE_JS) src/site/public/icons/nav/%.svg.js src/site/render-icon.js
public/archives.html:                   $(LANG_JS) $(SITE_JS) src/site/public/archives.html.js
public/tags.html:                       $(LANG_JS) $(SITE_JS) src/site/public/tags.html.js
public/%.html:                          $(LANG_JS) $(SITE_JS) src/site/public/post.html.js src/site/posts/related/%.json

public/css/screen.css public/icons/nav/%.svg:
	node src/site/$@.js >'$@'

public/archives.html public/tags.html:
	node src/site/$@.js $(POSTS_JS) >'$@'

public/%.html:
	node src/site/public/post.html.js src/site/posts/$*.js $(POSTS_JS) >'$@'
