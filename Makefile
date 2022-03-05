IMAGES = $(patsubst %,public/%,$(shell find images -type f))
CLJ = $(shell find src/site -name '*.clj' | sort)
JS = $(CLJ:%.clj=%.js)


.PHONY: all
all: $(JS)
	node src/site/generate.js

src/site/base-template.js: \
	src/lang/modules/base.js \
	src/lang/modules/sanctuary.js \
	src/site/elements.js

src/site/generate.js: \
	src/lang/modules/base.js \
	src/lang/modules/node.js \
	src/lang/modules/fs.js \
	src/lang/modules/path.js \
	src/lang/modules/sanctuary.js \
	src/lang/modules/prelude.js \
	src/site/base-template.js \
	src/site/render-document.js \
	src/site/render-archives.js \
	src/site/render-tags.js \
	src/site/render-icon.js \
	src/site/render-post.js

src/site/generate-css.js: \
	src/site/css/screen.js

public:
public/css:
	mkdir -p -- '$@'

public/css/screen.css: src/site/generate-css.js public/css
	node --print 'require("./$<").trimEnd()' >'$@'

public/images/%: images/%
	mkdir -p -- '$(@D)'
	cp -- '$<' '$@'

src/%.js: src/%.clj
	node src/lang/codegen.js '$<' >'$@'
