POSTS = $(shell find /Users/dc/github.com/davidchambers/davidchambersdesign.com -name '*=*.text' | sort)

public/archives.html: lib/index.js $(POSTS)
	NODE_ENV=production node --experimental-modules '$<' $(POSTS) >'$@'
