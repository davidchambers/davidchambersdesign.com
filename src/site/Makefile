.PHONY: all
all: $(patsubst %,public/%,$(shell find images -type f))
	NODE_ENV=production node scripts/everything.js

public/images/%: images/%
	mkdir -p -- '$(@D)'
	cp -- '$<' '$@'
