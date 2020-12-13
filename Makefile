IMAGES = $(patsubst %,public/%,$(shell find images -type f))


.PHONY: all
all: $(IMAGES)
	bin/eval-file src/generate.clj

public:
public/css:
	mkdir -p -- '$@'

public/css/screen.css: public/css
	bin/eval-file src/generate-css.clj >'$@'

public/css/%.css: public/css
	curl --silent 'https://raw.githubusercontent.com/davidchambers/davidchambersdesign.com/static/src/css/$*.css' >'$@'

public/images/%: images/%
	mkdir -p -- '$(@D)'
	cp -- '$<' '$@'
