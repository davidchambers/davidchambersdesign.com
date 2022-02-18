'use strict';

module.exports = ($$ => {

  $$[Symbol.for ('text')] = value => ({
    [Symbol.for ('type')]: Symbol.for ('text'),
    [Symbol.for ('value')]: value,
  });

  $$[Symbol.for ('canonicalize-attrs')] = (
    $$[Symbol.for ('reduce-object')]
      (k => v => $$[Symbol.for ('insert')]
                   (k)
                   ($$[Symbol.for ('if-else')]
                      ($$[Symbol.for ('symbol?')])
                      ($$[Symbol.for ('symbol->string')])
                      (String)
                      (v)))
      ({})
  );

  $$[Symbol.for ('replace')] = this_ => that => text => (
    text.replace (this_, that)
  );

  $$[Symbol.for ('canonicalize-children')] = (
    $$[Symbol.for ('compose')]
      ($$[Symbol.for ('map')]
         ($$[Symbol.for ('when')]
            ($$[Symbol.for ('string?')])
            ($$[Symbol.for ('pipe')]
               ([$$[Symbol.for ('lines')],
                 $$[Symbol.for ('fold-map')]
                   (String)
                   ($$[Symbol.for ('replace')]
                      ($$[Symbol.for ('regex')] ('') ('^[ ]+'))
                      (' ')),
                 $$[Symbol.for ('replace')]
                   ($$[Symbol.for ('regex')] ('g') (' -- '))
                   ('\u2009\u2014\u2009'),
                 $$[Symbol.for ('text')]]))))
      ($$[Symbol.for ('unless')]
         ($$[Symbol.for ('array?')])
         ($$[Symbol.for ('of')] (Array)))
  );

  $$[Symbol.for ('block-element')] = tagName => attrs => children => ({
    [Symbol.for ('type')]: Symbol.for ('element'),
    [Symbol.for ('tag-name')]: tagName,
    [Symbol.for ('format')]: Symbol.for ('block'),
    [Symbol.for ('self-closing')]: false,
    [Symbol.for ('attrs')]: $$[Symbol.for ('canonicalize-attrs')] (attrs),
    [Symbol.for ('children')]: $$[Symbol.for ('canonicalize-children')] (children),
  });

  $$[Symbol.for ('inline-element')] = tagName => attrs => _children => {
    const children = $$[Symbol.for ('canonicalize-children')] (_children);
    return {
      [Symbol.for ('type')]: Symbol.for ('element'),
      [Symbol.for ('tag-name')]: tagName,
      [Symbol.for ('format')]: (
        $$[Symbol.for ('any')]
          (node => node[Symbol.for ('format')] === Symbol.for ('block'))
          (children) ?
        Symbol.for ('block') :
        Symbol.for ('inline')
      ),
      [Symbol.for ('self-closing')]: false,
      [Symbol.for ('attrs')]: $$[Symbol.for ('canonicalize-attrs')] (attrs),
      [Symbol.for ('children')]: children,
    };
  };

  $$[Symbol.for ('self-closing-element')] = tagName => attrs => ({
    [Symbol.for ('type')]: Symbol.for ('element'),
    [Symbol.for ('tag-name')]: tagName,
    [Symbol.for ('format')]: Symbol.for ('inline'),
    [Symbol.for ('self-closing')]: true,
    [Symbol.for ('attrs')]: $$[Symbol.for ('canonicalize-attrs')] (attrs),
  });

  $$[Symbol.for ('excerpt')] = children => ({
    [Symbol.for ('type')]: Symbol.for ('excerpt'),
    [Symbol.for ('children')]: $$[Symbol.for ('canonicalize-children')] (children),
  });

  $$[Symbol.for ("html'")] = $$[Symbol.for ('block-element')] (Symbol.for ('html'));

  $$[Symbol.for ("head'")] = $$[Symbol.for ('block-element')] (Symbol.for ('head'));
  $$[Symbol.for ("title'")] = $$[Symbol.for ('inline-element')] (Symbol.for ('title'));
  $$[Symbol.for ('link')] = $$[Symbol.for ('self-closing-element')] (Symbol.for ('link'));
  $$[Symbol.for ('meta')] = $$[Symbol.for ('self-closing-element')] (Symbol.for ('meta'));

  $$[Symbol.for ("body'")] = $$[Symbol.for ('block-element')] (Symbol.for ('body'));
  $$[Symbol.for ("article'")] = $$[Symbol.for ('block-element')] (Symbol.for ('article'));
  $$[Symbol.for ("nav'")] = $$[Symbol.for ('block-element')] (Symbol.for ('nav'));
  $$[Symbol.for ("aside'")] = $$[Symbol.for ('block-element')] (Symbol.for ('aside'));
  $$[Symbol.for ("h1'")] = $$[Symbol.for ('block-element')] (Symbol.for ('h1'));
  $$[Symbol.for ("h2'")] = $$[Symbol.for ('block-element')] (Symbol.for ('h2'));
  $$[Symbol.for ("h3'")] = $$[Symbol.for ('block-element')] (Symbol.for ('h3'));
  $$[Symbol.for ("h4'")] = $$[Symbol.for ('block-element')] (Symbol.for ('h4'));
  $$[Symbol.for ("h5'")] = $$[Symbol.for ('block-element')] (Symbol.for ('h5'));
  $$[Symbol.for ("h6'")] = $$[Symbol.for ('block-element')] (Symbol.for ('h6'));
  $$[Symbol.for ("header'")] = $$[Symbol.for ('block-element')] (Symbol.for ('header'));
  $$[Symbol.for ("footer'")] = $$[Symbol.for ('block-element')] (Symbol.for ('footer'));

  $$[Symbol.for ("p'")] = $$[Symbol.for ('inline-element')] (Symbol.for ('p'));
  $$[Symbol.for ("hr'")] = $$[Symbol.for ('self-closing-element')] (Symbol.for ('hr'));
  $$[Symbol.for ("pre'")] = $$[Symbol.for ('inline-element')] (Symbol.for ('pre'));
  $$[Symbol.for ("blockquote'")] = $$[Symbol.for ('block-element')] (Symbol.for ('blockquote'));
  $$[Symbol.for ("ol'")] = $$[Symbol.for ('block-element')] (Symbol.for ('ol'));
  $$[Symbol.for ("ul'")] = $$[Symbol.for ('block-element')] (Symbol.for ('ul'));
  $$[Symbol.for ("li'")] = $$[Symbol.for ('inline-element')] (Symbol.for ('li'));
  $$[Symbol.for ("dl'")] = $$[Symbol.for ('block-element')] (Symbol.for ('dl'));
  $$[Symbol.for ("dt'")] = $$[Symbol.for ('inline-element')] (Symbol.for ('dt'));
  $$[Symbol.for ("dd'")] = $$[Symbol.for ('inline-element')] (Symbol.for ('dd'));
  $$[Symbol.for ('div')] = $$[Symbol.for ('block-element')] (Symbol.for ('div'));

  return {
    [Symbol.for ('canonicalize-children')]: $$[Symbol.for ('canonicalize-children')],

    [Symbol.for ('text')]: $$[Symbol.for ('text')],
    [Symbol.for ('excerpt')]: $$[Symbol.for ('excerpt')],

    [Symbol.for ("article'")]: $$[Symbol.for ("article'")],
    [Symbol.for ('article')]: $$[Symbol.for ("article'")] ({}),
    [Symbol.for ("blockquote'")]: $$[Symbol.for ("blockquote'")],
    [Symbol.for ('blockquote')]: $$[Symbol.for ("blockquote'")] ({}),
    [Symbol.for ("body'")]: $$[Symbol.for ("body'")],
    [Symbol.for ('body')]: $$[Symbol.for ("body'")] ({}),
    [Symbol.for ('div')]: $$[Symbol.for ('div')],
    [Symbol.for ("dl'")]: $$[Symbol.for ("dl'")],
    [Symbol.for ('dl')]: $$[Symbol.for ("dl'")] ({}),
    [Symbol.for ("footer'")]: $$[Symbol.for ("footer'")],
    [Symbol.for ('footer')]: $$[Symbol.for ("footer'")] ({}),
    [Symbol.for ("head'")]: $$[Symbol.for ("head'")],
    [Symbol.for ('head')]: $$[Symbol.for ("head'")] ({}),
    [Symbol.for ("header'")]: $$[Symbol.for ("header'")],
    [Symbol.for ('header')]: $$[Symbol.for ("header'")] ({}),
    [Symbol.for ("html'")]: $$[Symbol.for ("html'")],
    [Symbol.for ('html')]: $$[Symbol.for ("html'")] ({}),
    [Symbol.for ('linearGradient')]: $$[Symbol.for ('block-element')] (Symbol.for ('linearGradient')),
    [Symbol.for ("nav'")]: $$[Symbol.for ("nav'")],
    [Symbol.for ('nav')]: $$[Symbol.for ("nav'")] ({}),
    [Symbol.for ('object')]: $$[Symbol.for ('block-element')] (Symbol.for ('object')),
    [Symbol.for ("ol'")]: $$[Symbol.for ("ol'")],
    [Symbol.for ('ol')]: $$[Symbol.for ("ol'")] ({}),
    [Symbol.for ('svg')]: $$[Symbol.for ('block-element')] (Symbol.for ('svg')),
    [Symbol.for ("ul'")]: $$[Symbol.for ("ul'")],
    [Symbol.for ('ul')]: $$[Symbol.for ("ul'")] ({}),
    [Symbol.for ("a'")]: $$[Symbol.for ('inline-element')] (Symbol.for ('a')),
    [Symbol.for ('a')]: href => $$[Symbol.for ('inline-element')] (Symbol.for ('a')) ({[Symbol.for ('href')]: href}),
    [Symbol.for ("aside'")]: $$[Symbol.for ("aside'")],
    [Symbol.for ('aside')]: $$[Symbol.for ("aside'")] ({}),
    [Symbol.for ("code'")]: $$[Symbol.for ('inline-element')] (Symbol.for ('code')),
    [Symbol.for ('code')]: $$[Symbol.for ('inline-element')] (Symbol.for ('code')) ({}),
    [Symbol.for ("dd'")]: $$[Symbol.for ("dd'")],
    [Symbol.for ('dd')]: $$[Symbol.for ("dd'")] ({}),
    [Symbol.for ("del'")]: $$[Symbol.for ('inline-element')] (Symbol.for ('del')),
    [Symbol.for ('del')]: $$[Symbol.for ('inline-element')] (Symbol.for ('del')) ({}),
    [Symbol.for ("dt'")]: $$[Symbol.for ("dt'")],
    [Symbol.for ('dt')]: $$[Symbol.for ("dt'")] ({}),
    [Symbol.for ("em'")]: $$[Symbol.for ('inline-element')] (Symbol.for ('em')),
    [Symbol.for ('em')]: $$[Symbol.for ('inline-element')] (Symbol.for ('em')) ({}),
    [Symbol.for ("h1'")]: $$[Symbol.for ("h1'")],
    [Symbol.for ('h1')]: $$[Symbol.for ("h1'")] ({}),
    [Symbol.for ("h2'")]: $$[Symbol.for ("h2'")],
    [Symbol.for ('h2')]: $$[Symbol.for ("h2'")] ({}),
    [Symbol.for ("h3'")]: $$[Symbol.for ("h3'")],
    [Symbol.for ('h3')]: $$[Symbol.for ("h3'")] ({}),
    [Symbol.for ("h4'")]: $$[Symbol.for ("h4'")],
    [Symbol.for ('h4')]: $$[Symbol.for ("h4'")] ({}),
    [Symbol.for ("h5'")]: $$[Symbol.for ("h5'")],
    [Symbol.for ('h5')]: $$[Symbol.for ("h5'")] ({}),
    [Symbol.for ("h6'")]: $$[Symbol.for ("h6'")],
    [Symbol.for ('h6')]: $$[Symbol.for ("h6'")] ({}),
    [Symbol.for ("i'")]: $$[Symbol.for ('inline-element')] (Symbol.for ('i')),
    [Symbol.for ('i')]: $$[Symbol.for ('inline-element')] (Symbol.for ('i')) ({}),
    [Symbol.for ("ins'")]: $$[Symbol.for ('inline-element')] (Symbol.for ('ins')),
    [Symbol.for ('ins')]: $$[Symbol.for ('inline-element')] (Symbol.for ('ins')) ({}),
    [Symbol.for ("li'")]: $$[Symbol.for ("li'")],
    [Symbol.for ('li')]: $$[Symbol.for ("li'")] ({}),
    [Symbol.for ("p'")]: $$[Symbol.for ("p'")],
    [Symbol.for ('p')]: $$[Symbol.for ("p'")] ({}),
    [Symbol.for ("pre'")]: $$[Symbol.for ("pre'")],
    [Symbol.for ('pre')]: $$[Symbol.for ("pre'")] ({}),
    [Symbol.for ('script')]: $$[Symbol.for ('inline-element')] (Symbol.for ('script')),
    [Symbol.for ('span')]: $$[Symbol.for ('inline-element')] (Symbol.for ('span')),
    [Symbol.for ("strong'")]: $$[Symbol.for ('inline-element')] (Symbol.for ('strong')),
    [Symbol.for ('strong')]: $$[Symbol.for ('inline-element')] (Symbol.for ('strong')) ({}),
    [Symbol.for ('time')]: $$[Symbol.for ('inline-element')] (Symbol.for ('time')),
    [Symbol.for ("title'")]: $$[Symbol.for ("title'")],
    [Symbol.for ('title')]: $$[Symbol.for ("title'")] ({}),
    [Symbol.for ("var'")]: $$[Symbol.for ('inline-element')] (Symbol.for ('var')),
    [Symbol.for ('var')]: $$[Symbol.for ('inline-element')] (Symbol.for ('var')) ({}),
    [Symbol.for ('video')]: $$[Symbol.for ('inline-element')] (Symbol.for ('video')),
    [Symbol.for ('embed')]: $$[Symbol.for ('self-closing-element')] (Symbol.for ('embed')),
    [Symbol.for ("hr'")]: $$[Symbol.for ("hr'")],
    [Symbol.for ('hr')]: $$[Symbol.for ("hr'")] ({}),
    [Symbol.for ('img')]: $$[Symbol.for ('self-closing-element')] (Symbol.for ('img')),
    [Symbol.for ('link')]: $$[Symbol.for ('link')],
    [Symbol.for ('meta')]: $$[Symbol.for ('meta')],
    [Symbol.for ('param')]: $$[Symbol.for ('self-closing-element')] (Symbol.for ('param')),
    [Symbol.for ('path')]: $$[Symbol.for ('self-closing-element')] (Symbol.for ('path')),
    [Symbol.for ('stop')]: $$[Symbol.for ('self-closing-element')] (Symbol.for ('stop')),
  };

}) (
  Object.create (
    ['./base.js', './sanctuary.js', './prelude.js'].reduce (
      ($$, path) => Object.assign (Object.create ($$), require (path)),
      Object.create (null),
    ),
  ),
);
