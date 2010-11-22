document.observe('dom:loaded', function () {
    var Lightbox = Class.create({
        initialize: function (images) {
            var border, open, close, isActive, bg, body, frame, fontSize, slides = [], dimensions = [], space = {}, padding = 1.75;
            border = { thickness: 1, color: '#ccc' };
            open = this.open.bind(this);
            close = this.close.bind(this);
            isActive = this.isActive.bind(this);
            bg = new Element('div', { style: 'position: fixed; width: 100%; height: 100%; background-color: #333; z-index: 1000;' });
            bg.setOpacity(0.0).hide();
            body = $$('body')[0];
            body.insert({ 'top': bg });
            frame = new Element('div', { style: 'position: fixed; top: 0; left: 50%; background-color: #fff; padding: ' + padding + 'em; z-index: 1001;' });
            frame.setOpacity(0.0);
            bg.insert({ 'after': frame });
            images.each(function (img, i) {
                var alt, pos, src = img.getAttribute('src');
                if (src) {
                    pos = src.lastIndexOf('/');
                    if (pos != -1) {
                        src = src.substr(0, pos) + '/large' + src.substr(pos);
                        alt = img.getAttribute('alt');
                        (function () {
                            var image, a;
                            image = new Element('img', { alt: alt, style: 'border: ' + border.thickness + 'px solid ' + border.color });
                            image.observe('load', function () {
                                frame.update(this);
                                slides[i] = this;
                                dimensions[i] = { width: this.getWidth(), height: this.getHeight() };
                                frame.update();
                            });
                            image.src = src;
                            a = new Element('a', { href: src });
                            img.insert({ 'before': a });
                            a.appendChild(img);
                            Event.observe(a, 'click', function (event) {
                                open(i);
                                event.stop();
                            });
                        }());
                    }
                }
            });
            Event.observe(bg, 'click', function () {
                close();
            });
            Event.observe(document, 'keydown', function (event) {
                if (isActive()) {
                    if (event.keyCode == Event.KEY_ESC || event.keyCode == Event.KEY_TAB || event.keyCode == Event.KEY_RETURN) {
                        close();
                        if (event.keyCode == Event.KEY_RETURN) event.stop();
                    }
                }
            });
            fontSize = body.getStyle('font-size').replace('px', '');
            space.inner = Math.round(padding * fontSize);
            space.outer = Math.round(space.inner / 1.618); // golden ratio is aesthetically pleasing
            space.total = space.inner + border.thickness + space.outer;
            this.space = space;
            this.border = border;
            this.slides = slides;
            this.dimensions = dimensions;
            this.frame = frame;
            this.bg = bg;
            this.active = false;
        },

        isActive: function () {
            return this.active;
        },

        getOffsets: function (n) {
            var offsets = {};
            offsets.viewport = document.viewport.getDimensions();
            offsets.horizontal = Math.floor((offsets.viewport.width - this.slides[n].width) / 2 - this.border.thickness - this.space.inner);
            offsets.vertical = Math.floor((offsets.viewport.height - this.slides[n].height) / 2 - this.border.thickness - this.space.inner);
            return offsets;
        },

        setImageDimensions: function (n) {
            var vp, available, w, h, d;
            vp = document.viewport.getDimensions();
            available = { width: vp.width - 2 * this.space.total, height: vp.height - 2 * this.space.total };
            if (this.dimensions[n].width > available.width) { // too wide
                h = Math.round(this.dimensions[n].height * available.width / this.dimensions[n].width);
                d = (h > available.height ? { width: Math.round(this.dimensions[n].width * available.height / this.dimensions[n].height), height: available.height }
                                          : { width: available.width, height: h });
            }
            else if (this.dimensions[n].height > available.height) { // too tall
                w = Math.round(this.dimensions[n].width * available.height / this.dimensions[n].height);
                d = (w > available.width ? { width: available.width, height: Math.round(this.dimensions[n].height * available.width / this.dimensions[n].width) }
                                         : { width: w, height: available.height });
            }
            else {
                d = { width: this.dimensions[n].width, height: this.dimensions[n].height };
            }
            this.slides[n].width = d.width;
            this.slides[n].height = d.height;
        },

        setSlide: function (n) {
            this.setImageDimensions(n);
            var offsets = this.getOffsets(n);
            this.slides[n].setOpacity(0.0);
            this.frame.update(this.slides[n]);
            this.frame.setStyle({
                marginTop: offsets.vertical + 'px',
                marginLeft: '-' + Math.floor(this.space.inner + this.border.thickness + this.slides[n].width/2) + 'px'
            });
            new Effect.Opacity(this.slides[n], { from: 0.0, to: 1.0, duration: 0.5 });
        },

        open: function (n) {
            this.active = true;
            var frame, setSlide;
            frame = this.frame;
            setSlide = this.setSlide.bind(this);
            this.bg.setOpacity(0.0).show();
            new Effect.Opacity(this.bg, { from: 0.0, to: 0.8, duration: 0.5,
                afterFinish: function () {
                    frame.setOpacity(0.0).show();
                    new Effect.Opacity(frame, { from: 0.0, to: 1.0, duration: 0.5,
                        afterFinish: setSlide(n)
                    });
                }
            });
        },

        close: function () {
            this.active = false;
            this.frame.hide();
            this.bg.hide();
        }
    });

    var images = $$('img[src*="/lightbox/"]');
    if (images.length) new Lightbox(images);
});
