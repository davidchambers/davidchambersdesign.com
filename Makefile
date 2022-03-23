LANG_JS = $(shell (find src/lang -name '*.js' && echo src/lang/grammar.js | sort -u))
SITE_JS = $(patsubst %.clj,%.js,$(shell find src/site -name '*.clj' -not -path 'src/site/public/*' -not -path 'src/site/scripts/*' | sort))
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

src/lang/grammar.js: src/lang/grammar.pegjs
	node_modules/.bin/pegjs <'$<' >'$@'

src/site/kebab-case-keys.js: src/site/kebab-case-keys.clj $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/datetime.js: src/site/datetime.clj src/site/kebab-case-keys.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/elements.js: src/site/elements.clj src/site/scripts/module.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/components/caption.js: src/site/components/caption.clj src/site/scripts/module.js src/site/elements.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/components/captioned-image.js: src/site/components/captioned-image.clj src/site/scripts/module.js src/site/elements.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/components/captioned-images.js: src/site/components/captioned-images.clj src/site/scripts/module.js src/site/elements.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/components/code-block.js: src/site/components/code-block.clj src/site/scripts/module.js src/site/elements.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/components/decorative-image.js: src/site/components/decorative-image.clj src/site/scripts/module.js src/site/elements.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/components/interview-list.js: src/site/components/interview-list.clj src/site/scripts/module.js src/site/elements.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/components/pros-and-cons-list.js: src/site/components/pros-and-cons-list.clj src/site/scripts/module.js src/site/elements.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/components/uncaptioned-image.js: src/site/components/uncaptioned-image.clj src/site/scripts/module.js src/site/elements.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/components/update.js: src/site/components/update.clj src/site/scripts/module.js src/site/elements.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/posts/%.js: src/site/posts/%.clj src/site/scripts/module.js src/site/elements.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/base-template.js: src/site/base-template.clj src/site/scripts/module.js src/site/elements.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/render-fragment.js: src/site/render-fragment.clj src/site/scripts/module.js src/site/elements.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/render-document.js: src/site/render-document.clj src/site/scripts/module.js src/site/render-fragment.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/render-icon.js: src/site/render-icon.clj src/site/scripts/module.js src/site/elements.js src/site/render-fragment.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/tags.js: src/site/tags.clj src/site/scripts/module.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/render-tags.js: src/site/render-tags.clj src/site/scripts/module.js src/site/elements.js src/site/tags.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/render-archives.js: src/site/render-archives.clj src/site/elements.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/render-post.js: src/site/render-post.clj src/site/scripts/module.js src/site/elements.js src/site/tags.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/posts/related/%.json: src/site/scripts/related-posts.js $(LANG_JS) $(SITE_JS)
	mkdir -p -- '$(@D)'
	node -- '$<' src/site/posts/$*.js $(POSTS_JS) >'$@'

src/site/posts/%.js: src/site/posts/%.clj src/site/scripts/module.js src/site/elements.js src/site/components.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/css/screen.js: src/site/css/screen.clj src/site/scripts/module.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/generate-css.js: src/site/generate-css.clj src/site/css/screen.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/icons/nav/%.js: src/site/icons/nav/%.clj src/site/scripts/module.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/import-post.js: src/site/import-post.clj $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/pages/archives.js: src/site/pages/archives.clj src/site/import-post.js src/site/base-template.js src/site/render-document.js src/site/render-archives.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/pages/post.js: src/site/pages/post.clj src/site/base-template.js src/site/render-document.js src/site/render-icon.js src/site/render-post.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/pages/tags.js: src/site/pages/tags.clj src/site/import-post.js src/site/base-template.js src/site/render-document.js src/site/render-tags.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

src/site/related-posts.js: src/site/related-posts.clj src/site/import-post.js $(LANG_JS)
	node src/site/scripts/module.js '$<' >'$@'

public/images/%: images/%
	mkdir -p -- '$(@D)'
	cp -- '$<' '$@'

public/css/screen.css: src/site/public/css/screen.css.js $(LANG_JS) $(SITE_JS)
	node -- '$<' >'$@'

public/icons/nav/%.svg: src/site/public/icons/nav/%.svg.js src/site/icons/nav/%.js src/site/render-icon.js
	node -- '$<' >'$@'

public/archives.html: src/site/public/archives.html.js $(LANG_JS) $(SITE_JS)
	node -- '$<' $(POSTS_JS) >'$@'

public/tags.html: src/site/public/tags.html.js $(LANG_JS) $(SITE_JS)
	node -- '$<' $(POSTS_JS) >'$@'

public/%.html: src/site/public/post.html.js src/site/posts/related/%.json $(LANG_JS) $(SITE_JS)
	node -- '$<' src/site/posts/$*.js $(POSTS_JS) >'$@'
