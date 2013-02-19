.PHONY: all clean setup

coffee = lib/coffee-script/bin/coffee

all: dist/favicon.ico \
     $(shell find src/images -name '*.coffee' | sed 's!^src/\(.*\).coffee$$!dist/\1.svg!') \
     $(shell find src/images -not -name '*.coffee' -type f | sed 's!^src!dist!') \
     dist/styles/screen.css \
     $(shell find src/css/*.css | sed 's!.*/\(.*\)$$!dist/styles/\1!') \
     $(shell find src/coffee/*.coffee | sed 's!.*/\(.*\).coffee$$!dist/scripts/\1.js!')

dist/favicon.ico: src/favicon.ico
	@mkdir -p $(dir $@)
	@cp $< $@

dist/images/%.svg: src/images/%.coffee
	@mkdir -p $(dir $@)
	@$(coffee) bin/svg ../$< > $@

dist/images/%: src/images/%
	@mkdir -p $(dir $@)
	@cp $< $@

dist/styles/screen.css: src/sass/screen.sass
	@bundle exec compass compile . $< --css-dir $(dir $@) --sass-dir $(dir $<) --quiet

dist/styles/%.css: src/css/%.css
	@mkdir -p $(dir $@)
	@cp $< $@

dist/scripts/%.js: src/coffee/%.coffee
	@mkdir -p $(dir $@)
	@$(coffee) --compile --output $(dir $@) $<

clean:
	@rm -rf dist

setup:
	@git submodule update --init
	@bundle install
