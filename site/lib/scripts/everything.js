import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import S from 'sanctuary';
import { svg } from '../elements.js';
import base$002Dtemplate from '../base-template.js';
import * as masthead from '../masthead.js';
import related$002Dposts from '../related-posts.js';
import render$002Darchives from '../render-archives.js';
import render$002Dpage from '../render-page.js';
import render$002Dpost from '../render-post.js';
import render$002Dtags from '../render-tags.js';
import css$002Fscreen from '../css/screen.js';
import icon$002Fabout from '../icons/about.js';
import icon$002Farchives from '../icons/archives.js';
import icon$002Fbitbucket from '../icons/bitbucket.js';
import icon$002Fcontact from '../icons/contact.js';
import icon$002Fflushcache from '../icons/flushcache.js';
import icon$002Ftags from '../icons/tags.js';
import icon$002Ftwitter from '../icons/twitter.js';
import dates from '../icons/dates.js';
import page$002Fabout from '../pages/about.js';
import page$002Felam from '../pages/elam.js';
import post$002Fbeautiful$002Dpainted$002Dalphabet from '../posts/beautiful-painted-alphabet.js';
import post$002Fshow$002Dfull$002Ddirectory$002Dpath$002Din$002Dfinder$002Dwindow$002Dtitle$002Dbar from '../posts/show-full-directory-path-in-finder-window-title-bar.js';
import post$002Frounded$002Drectangles$002Din$002Dadobe$002Dillustrator$002Dcs3 from '../posts/rounded-rectangles-in-adobe-illustrator-cs3.js';
import post$002Fintelligent$002Dcss$002Dcaching from '../posts/intelligent-css-caching.js';
import post$002Fescape$002Dspecial$002Dcharacters$002Dfor$002Dsql$002Dregexp from '../posts/escape-special-characters-for-sql-regexp.js';
import post$002Fdavid$002Dcarsons$002D2003$002Dted$002Dlecture from '../posts/david-carsons-2003-ted-lecture.js';
import post$002Fwordpress$002Dlogin$002Dredirect from '../posts/wordpress-login-redirect.js';
import post$002Fvalid$002Dxhtml$002Dalternative$002Dto$002Dstrike from '../posts/valid-xhtml-alternative-to-strike.js';
import post$002Fchanging$002Dkeyboard$002Dshortcuts$002Din$002Dmac$002Dos$002Dx from '../posts/changing-keyboard-shortcuts-in-mac-os-x.js';
import post$002Finserting$002Dimages$002Din$002Dgmail$002Dmessages from '../posts/inserting-images-in-gmail-messages.js';
import post$002Fdjango$002Dsyntax$002Dhighlighting$002Dfor$002Dcoda from '../posts/django-syntax-highlighting-for-coda.js';
import post$002Flooping$002Dmore$002Dthan$002Donce$002Dwith$002Dthe$002Dwordpress$002Dloop from '../posts/looping-more-than-once-with-the-wordpress-loop.js';
import post$002Fsms$002Devent$002Dreminders$002Dfrom$002Dgoogle$002Dcalendar from '../posts/sms-event-reminders-from-google-calendar.js';
import post$002Ftiny$002Dcalendar$002Dicon$002Dset from '../posts/tiny-calendar-icon-set.js';
import post$002Fapplescript$002Dsyntax$002Dhighlighting from '../posts/applescript-syntax-highlighting.js';
import post$002Fphp$002Dbrush$002Dfor$002Dsyntaxhighlighter from '../posts/php-brush-for-syntaxhighlighter.js';
import post$002Fphp$002Dprint$002Dfilesize$002Dfunction from '../posts/php-print_filesize-function.js';
import post$002Fprototype$002Dloader$002Dfor$002Dsyntaxhighlighter from '../posts/prototype-loader-for-syntaxhighlighter.js';
import post$002Fassociative$002Darrays$002Din$002Djavascript from '../posts/associative-arrays-in-javascript.js';
import post$002Fphotoshop$002Dsave$002Dfor$002Dweb$002Djavascript from '../posts/photoshop-save-for-web-javascript.js';
import post$002Fincredible$002Dperformance$002Dby$002Dkseniya$002Dsimonova from '../posts/incredible-performance-by-kseniya-simonova.js';
import post$002Fcoda$002Dtheme$002Dfor$002Dsyntaxhighlighter from '../posts/coda-theme-for-syntaxhighlighter.js';
import post$002Ftiny$002Dcalendar$002Dicons$002Dsprite from '../posts/tiny-calendar-icons-sprite.js';
import post$002Fcaptions$002Dover$002Dimages from '../posts/captions-over-images.js';
import post$002Fembed$002Dyoutube$002Dclips$002Dusing$002Dvalid$002Dxhtml$002Dmarkup from '../posts/embed-youtube-clips-using-valid-xhtml-markup.js';
import post$002Fprototype$002Dimage$002Dslider from '../posts/prototype-image-slider.js';
import post$002Fsticky$002Dfooters from '../posts/sticky-footers.js';
import post$002Fmemorable$002Dpasswords$002Dfor$002Dprogrammers from '../posts/memorable-passwords-for-programmers.js';
import post$002Fmultisession$002Dcd$002Dburning$002Din$002Dsnow$002Dleopard from '../posts/multisession-cd-burning-in-snow-leopard.js';
import post$002Fcss$002Dfixed$002Dposition$002Dheaders from '../posts/css-fixed-position-headers.js';
import post$002Fusing$002Dhtml5$002Dtime$002Delement$002Din$002Dwordpress$002Dthemes from '../posts/using-html5-time-element-in-wordpress-themes.js';
import post$002Fprototype$002Dand$002Dscriptaculous$002Dcombined$002Dand$002Dcompressed from '../posts/prototype-and-scriptaculous-combined-and-compressed.js';
import post$002Fautopopulating$002Dinput$002Dfields$002Dwith$002Dprototype from '../posts/autopopulating-input-fields-with-prototype.js';
import post$002Faccessing$002Dmysql$002Dshell$002Dvia$002Dterminal from '../posts/accessing-mysql-shell-via-terminal.js';
import post$002Fduplicating$002Darrays$002Din$002Djavascript from '../posts/duplicating-arrays-in-javascript.js';
import post$002Fshockingly$002Dsimple$002Durl$002Dshortening from '../posts/shockingly-simple-url-shortening.js';
import post$002Fresize$002Dbrowser$002Dwindow$002Dto$002Dmatch$002Diphone$002Dviewport$002Ddimensions from '../posts/resize-browser-window-to-match-iphone-viewport-dimensions.js';
import post$002Fget$002Dattributes$002Dof$002Ddjango$002Dmodel$002Dor$002Dinstance from '../posts/get-attributes-of-django-model-or-instance.js';
import post$002Fgorgeous$002Dcss3$002Dbuttons$002Dinspired$002Dby$002Daqua from '../posts/gorgeous-css3-buttons-inspired-by-aqua.js';
import post$002Fcricket$002Dfield$002Ddiagrams from '../posts/cricket-field-diagrams.js';
import post$002Fmootools$002Devery$002Dmethod from '../posts/mootools-every-method.js';
import post$002Fforcing$002Dbrowsers$002Dto$002Drerender$002Delements from '../posts/forcing-browsers-to-rerender-elements.js';
import post$002Fcss$002Dimage$002Dswitcher$002Ddone$002Dthe$002Dright$002Dway from '../posts/css-image-switcher-done-the-right-way.js';
import post$002Ffascinating$002Dinsight$002Dinto$002Dthe$002Dmind$002Dof$002Da$002Dwindows$002Duser from '../posts/fascinating-insight-into-the-mind-of-a-windows-user.js';
import post$002Fusing$002Dgoogle$002Dfor$002Dsite$002Dsearch from '../posts/using-google-for-site-search.js';
import post$002Fextra$002Dcomma$002Dconsidered$002Dharmful from '../posts/extra-comma-considered-harmful.js';
import post$002Fapplication$002Dspecific$002Dvolume$002Dcontrol$002Din$002Dmac$002Dos$002Dx from '../posts/application-specific-volume-control-in-mac-os-x.js';
import post$002Flinkify$002Dtweets$002Dwith$002Dregex from '../posts/linkify-tweets-with-regex.js';
import post$002Fserializing$002Ddjango$002Dmodel$002Dinstances from '../posts/serializing-django-model-instances.js';
import post$002Ffreeing$002Dmyself$002Dof$002Dwordpress from '../posts/freeing-myself-of-wordpress.js';
import post$002Foptimization$002Dvia$002Dstringification from '../posts/optimization-via-stringification.js';
import post$002Fautopopulating$002Dinput$002Dfields$002Dwith$002Dmootools from '../posts/autopopulating-input-fields-with-mootools.js';
import post$002Fwmd$002Dftw from '../posts/wmd-ftw.js';
import post$002Ffirst$002Dmatching$002Ditem from '../posts/first-matching-item.js';
import post$002Fsettimeout$002Dfix$002Dfor$002Dwebkit$002Dtransition from '../posts/settimeout-fix-for-webkit-transition.js';
import post$002Ftesting$002Ddjango$002Dapps$002Dusing$002Dlocalhost$002Dsubdomains from '../posts/testing-django-apps-using-localhost-subdomains.js';
import post$002Fempty$002Dcollections$002Dare$002Dvalid$002Dcache$002Ddata from '../posts/empty-collections-are-valid-cache-data.js';
import post$002F$002Dwebkit$002Dbox$002Dsizing from '../posts/-webkit-box-sizing.js';
import post$002Fremove$002Dtextarea$002Dscrollbars$002Din$002Dinternet$002Dexplorer from '../posts/remove-textarea-scrollbars-in-internet-explorer.js';
import post$002Fpositioning$002Delements$002Dusing$002Dmootools from '../posts/positioning-elements-using-mootools.js';
import post$002Fjavascript$002Deverywhere from '../posts/javascript-everywhere.js';
import post$002Fdieter$002Drams$002Dvideo$002Dinterview from '../posts/dieter-rams-video-interview.js';
import post$002Fgmail$002Dfavicon$002Dconfusion from '../posts/gmail-favicon-confusion.js';
import post$002Fman$002Dafter$002Dmy$002Down$002Dheart from '../posts/man-after-my-own-heart.js';
import post$002Fdigitalcolor$002Dmeter from '../posts/digitalcolor-meter.js';
import post$002Fpython$002Dloops$002Dcan$002Dhave$002Delse$002Dclause from '../posts/python-loops-can-have-else-clause.js';
import post$002Fself$002Dcaching$002Dfunctions$002Din$002Djavascript$002Dand$002Dpython from '../posts/self-caching-functions-in-javascript-and-python.js';
import post$002Fefficient$002Drounding$002Din$002Djavascript from '../posts/efficient-rounding-in-javascript.js';
import post$002Ffiltering$002Dlists$002Din$002Dpython$002Druby$002Dand$002Djavascript from '../posts/filtering-lists-in-python-ruby-and-javascript.js';
import post$002Fconverting$002Dintegers$002Dto$002Dordinals from '../posts/converting-integers-to-ordinals.js';
import post$002Fbike$002Dshelf from '../posts/bike-shelf.js';
import post$002Fcustomizing$002Dfile$002Dand$002Dfolder$002Dicons$002Din$002Dmac$002Dos$002Dx from '../posts/customizing-file-and-folder-icons-in-mac-os-x.js';
import post$002Fridding$002Dmarkup$002Dof$002Dtextual$002Ddecoration from '../posts/ridding-markup-of-textual-decoration.js';
import post$002Fjavascript$002Ddate$002Dand$002Dtime$002Dlocalization from '../posts/javascript-date-and-time-localization.js';
import post$002Fbitwise$002Dnot$002Doperator$002Dproves$002Duseful$002Din$002Djavascript from '../posts/bitwise-not-operator-proves-useful-in-javascript.js';
import post$002Fcomposing$002Dmercurial$002Dcommit$002Dmessages$002Din$002Dtextmate from '../posts/composing-mercurial-commit-messages-in-textmate.js';
import post$002Fsafari$002Dkeyboard$002Dshortcut$002Dto$002Dopen$002Dcurrent$002Dpage$002Din$002Dgoogle$002Dchrome from '../posts/safari-keyboard-shortcut-to-open-current-page-in-google-chrome.js';
import post$002Fsimulating$002Dnonlocal$002Din$002Dpython$002D2$002Dx from '../posts/simulating-nonlocal-in-python-2.x.js';
import post$002Ffaster$002Dterminal$002Dnavigation$002Dvia$002Daliases from '../posts/faster-terminal-navigation-via-aliases.js';
import post$002Fcustomizing$002Dyour$002Dbash$002Dprompt$002Dfor$002Dpleasure$002Dand$002Dprofit from '../posts/customizing-your-bash-prompt-for-pleasure-and-profit.js';
import post$002Fmapping$002Dfile$002Dextensions$002Dto$002Demacs$002Dsyntax$002Dmodes from '../posts/mapping-file-extensions-to-emacs-syntax-modes.js';
import post$002Frepeating$002Dstrings$002Din$002Djavascript from '../posts/repeating-strings-in-javascript.js';
import post$002Fchanging$002Dthe$002Dcolour$002Dof$002Dlist$002Dbullets$002Dusing$002Dcss from '../posts/changing-the-colour-of-list-bullets-using-css.js';
import post$002Fsolarized from '../posts/solarized.js';
import post$002Fhashify$002Deditor from '../posts/hashify-editor.js';
import post$002Fend$002Dof$002Dstring$002Danchor$002Din$002Djavascript$002Dregular$002Dexpressions from '../posts/end-of-string-anchor-in-javascript-regular-expressions.js';
import post$002Fgetting$002Dtruth$002Dout$002Dof$002Dthe$002Ddom from '../posts/getting-truth-out-of-the-dom.js';
import post$002Fescaping$002Dhtml$002Din$002Djavascript from '../posts/escaping-html-in-javascript.js';
import post$002Fdecorators$002Din$002Djavascript from '../posts/decorators-in-javascript.js';
import post$002Fgetting$002Dstarted$002Dwith$002Dsocket$002Dio from '../posts/getting-started-with-socket.io.js';
import post$002Fhigher$002Dlevel$002Dstyle$002Dsheets from '../posts/higher-level-style-sheets.js';
import post$002Fhelveticards from '../posts/helveticards.js';
import post$002Fitunes$002Dis$002Dsurprisingly$002Duseful$002Dwhen$002Dlearning$002Da$002Dforeign$002Dlanguage from '../posts/itunes-is-surprisingly-useful-when-learning-a-foreign-language.js';
import post$002Fthe$002Dperils$002Dof$002Dusing$002Djavascript$002Dobjects$002Das$002Dsets from '../posts/the-perils-of-using-javascript-objects-as-sets.js';
import post$002Fgive$002Dand$002Dtake$002Dof$002Dcontinuation$002Dpassing$002Dstyle from '../posts/give-and-take-of-continuation-passing-style.js';
const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const pages = [
  page$002Fabout,
  page$002Felam
];
const posts = [
  post$002Fbeautiful$002Dpainted$002Dalphabet,
  post$002Fshow$002Dfull$002Ddirectory$002Dpath$002Din$002Dfinder$002Dwindow$002Dtitle$002Dbar,
  post$002Frounded$002Drectangles$002Din$002Dadobe$002Dillustrator$002Dcs3,
  post$002Fintelligent$002Dcss$002Dcaching,
  post$002Fescape$002Dspecial$002Dcharacters$002Dfor$002Dsql$002Dregexp,
  post$002Fdavid$002Dcarsons$002D2003$002Dted$002Dlecture,
  post$002Fwordpress$002Dlogin$002Dredirect,
  post$002Fvalid$002Dxhtml$002Dalternative$002Dto$002Dstrike,
  post$002Fchanging$002Dkeyboard$002Dshortcuts$002Din$002Dmac$002Dos$002Dx,
  post$002Finserting$002Dimages$002Din$002Dgmail$002Dmessages,
  post$002Fdjango$002Dsyntax$002Dhighlighting$002Dfor$002Dcoda,
  post$002Flooping$002Dmore$002Dthan$002Donce$002Dwith$002Dthe$002Dwordpress$002Dloop,
  post$002Fsms$002Devent$002Dreminders$002Dfrom$002Dgoogle$002Dcalendar,
  post$002Ftiny$002Dcalendar$002Dicon$002Dset,
  post$002Fapplescript$002Dsyntax$002Dhighlighting,
  post$002Fphp$002Dbrush$002Dfor$002Dsyntaxhighlighter,
  post$002Fphp$002Dprint$002Dfilesize$002Dfunction,
  post$002Fprototype$002Dloader$002Dfor$002Dsyntaxhighlighter,
  post$002Fassociative$002Darrays$002Din$002Djavascript,
  post$002Fphotoshop$002Dsave$002Dfor$002Dweb$002Djavascript,
  post$002Fincredible$002Dperformance$002Dby$002Dkseniya$002Dsimonova,
  post$002Fcoda$002Dtheme$002Dfor$002Dsyntaxhighlighter,
  post$002Ftiny$002Dcalendar$002Dicons$002Dsprite,
  post$002Fcaptions$002Dover$002Dimages,
  post$002Fembed$002Dyoutube$002Dclips$002Dusing$002Dvalid$002Dxhtml$002Dmarkup,
  post$002Fprototype$002Dimage$002Dslider,
  post$002Fsticky$002Dfooters,
  post$002Fmemorable$002Dpasswords$002Dfor$002Dprogrammers,
  post$002Fmultisession$002Dcd$002Dburning$002Din$002Dsnow$002Dleopard,
  post$002Fcss$002Dfixed$002Dposition$002Dheaders,
  post$002Fusing$002Dhtml5$002Dtime$002Delement$002Din$002Dwordpress$002Dthemes,
  post$002Fprototype$002Dand$002Dscriptaculous$002Dcombined$002Dand$002Dcompressed,
  post$002Fautopopulating$002Dinput$002Dfields$002Dwith$002Dprototype,
  post$002Faccessing$002Dmysql$002Dshell$002Dvia$002Dterminal,
  post$002Fduplicating$002Darrays$002Din$002Djavascript,
  post$002Fshockingly$002Dsimple$002Durl$002Dshortening,
  post$002Fresize$002Dbrowser$002Dwindow$002Dto$002Dmatch$002Diphone$002Dviewport$002Ddimensions,
  post$002Fget$002Dattributes$002Dof$002Ddjango$002Dmodel$002Dor$002Dinstance,
  post$002Fgorgeous$002Dcss3$002Dbuttons$002Dinspired$002Dby$002Daqua,
  post$002Fcricket$002Dfield$002Ddiagrams,
  post$002Fmootools$002Devery$002Dmethod,
  post$002Fforcing$002Dbrowsers$002Dto$002Drerender$002Delements,
  post$002Fcss$002Dimage$002Dswitcher$002Ddone$002Dthe$002Dright$002Dway,
  post$002Ffascinating$002Dinsight$002Dinto$002Dthe$002Dmind$002Dof$002Da$002Dwindows$002Duser,
  post$002Fusing$002Dgoogle$002Dfor$002Dsite$002Dsearch,
  post$002Fextra$002Dcomma$002Dconsidered$002Dharmful,
  post$002Fapplication$002Dspecific$002Dvolume$002Dcontrol$002Din$002Dmac$002Dos$002Dx,
  post$002Flinkify$002Dtweets$002Dwith$002Dregex,
  post$002Fserializing$002Ddjango$002Dmodel$002Dinstances,
  post$002Ffreeing$002Dmyself$002Dof$002Dwordpress,
  post$002Foptimization$002Dvia$002Dstringification,
  post$002Fautopopulating$002Dinput$002Dfields$002Dwith$002Dmootools,
  post$002Fwmd$002Dftw,
  post$002Ffirst$002Dmatching$002Ditem,
  post$002Fsettimeout$002Dfix$002Dfor$002Dwebkit$002Dtransition,
  post$002Ftesting$002Ddjango$002Dapps$002Dusing$002Dlocalhost$002Dsubdomains,
  post$002Fempty$002Dcollections$002Dare$002Dvalid$002Dcache$002Ddata,
  post$002F$002Dwebkit$002Dbox$002Dsizing,
  post$002Fremove$002Dtextarea$002Dscrollbars$002Din$002Dinternet$002Dexplorer,
  post$002Fpositioning$002Delements$002Dusing$002Dmootools,
  post$002Fjavascript$002Deverywhere,
  post$002Fdieter$002Drams$002Dvideo$002Dinterview,
  post$002Fgmail$002Dfavicon$002Dconfusion,
  post$002Fman$002Dafter$002Dmy$002Down$002Dheart,
  post$002Fdigitalcolor$002Dmeter,
  post$002Fpython$002Dloops$002Dcan$002Dhave$002Delse$002Dclause,
  post$002Fself$002Dcaching$002Dfunctions$002Din$002Djavascript$002Dand$002Dpython,
  post$002Fefficient$002Drounding$002Din$002Djavascript,
  post$002Ffiltering$002Dlists$002Din$002Dpython$002Druby$002Dand$002Djavascript,
  post$002Fconverting$002Dintegers$002Dto$002Dordinals,
  post$002Fbike$002Dshelf,
  post$002Fcustomizing$002Dfile$002Dand$002Dfolder$002Dicons$002Din$002Dmac$002Dos$002Dx,
  post$002Fridding$002Dmarkup$002Dof$002Dtextual$002Ddecoration,
  post$002Fjavascript$002Ddate$002Dand$002Dtime$002Dlocalization,
  post$002Fbitwise$002Dnot$002Doperator$002Dproves$002Duseful$002Din$002Djavascript,
  post$002Fcomposing$002Dmercurial$002Dcommit$002Dmessages$002Din$002Dtextmate,
  post$002Fsafari$002Dkeyboard$002Dshortcut$002Dto$002Dopen$002Dcurrent$002Dpage$002Din$002Dgoogle$002Dchrome,
  post$002Fsimulating$002Dnonlocal$002Din$002Dpython$002D2$002Dx,
  post$002Ffaster$002Dterminal$002Dnavigation$002Dvia$002Daliases,
  post$002Fcustomizing$002Dyour$002Dbash$002Dprompt$002Dfor$002Dpleasure$002Dand$002Dprofit,
  post$002Fmapping$002Dfile$002Dextensions$002Dto$002Demacs$002Dsyntax$002Dmodes,
  post$002Frepeating$002Dstrings$002Din$002Djavascript,
  post$002Fchanging$002Dthe$002Dcolour$002Dof$002Dlist$002Dbullets$002Dusing$002Dcss,
  post$002Fsolarized,
  post$002Fhashify$002Deditor,
  post$002Fend$002Dof$002Dstring$002Danchor$002Din$002Djavascript$002Dregular$002Dexpressions,
  post$002Fgetting$002Dtruth$002Dout$002Dof$002Dthe$002Ddom,
  post$002Fescaping$002Dhtml$002Din$002Djavascript,
  post$002Fdecorators$002Din$002Djavascript,
  post$002Fgetting$002Dstarted$002Dwith$002Dsocket$002Dio,
  post$002Fhigher$002Dlevel$002Dstyle$002Dsheets,
  post$002Fhelveticards,
  post$002Fitunes$002Dis$002Dsurprisingly$002Duseful$002Dwhen$002Dlearning$002Da$002Dforeign$002Dlanguage,
  post$002Fthe$002Dperils$002Dof$002Dusing$002Djavascript$002Dobjects$002Das$002Dsets,
  post$002Fgive$002Dand$002Dtake$002Dof$002Dcontinuation$002Dpassing$002Dstyle
];
const public_ = components => path.join(dirname, '..', '..', 'public', ...components);
const write$002Dfile = filename => data => fs.writeFileSync(filename, data);
write$002Dfile(public_([
  'css',
  'screen.css'
]))(css$002Fscreen);
const render$002Dsvg = attrs => paths => `<?xml version="1.0" standalone="no"?>\n${ svg({
  xmlns: 'http://www.w3.org/2000/svg',
  version: '1.1',
  ...attrs
})(paths).render('  ')(0)(false) }`;
write$002Dfile(public_([
  'svg',
  'masthead.svg'
]))(render$002Dsvg({})(masthead.fill));
write$002Dfile(public_([
  'svg',
  'masthead-mask.svg'
]))(render$002Dsvg({})(masthead.mask));
write$002Dfile(public_([
  'svg',
  'about.svg'
]))(render$002Dsvg({
  width: 16,
  height: 16
})(icon$002Fabout));
write$002Dfile(public_([
  'svg',
  'archives.svg'
]))(render$002Dsvg({
  width: 16,
  height: 16
})(icon$002Farchives));
write$002Dfile(public_([
  'svg',
  'bitbucket.svg'
]))(render$002Dsvg({
  width: 16,
  height: 16
})(icon$002Fbitbucket));
S.range(0)(10).forEach(n => write$002Dfile(public_([
  'svg',
  `dates-${ n }.svg`
]))(render$002Dsvg({})(dates[n])));
write$002Dfile(public_([
  'svg',
  'contact.svg'
]))(render$002Dsvg({
  width: 16,
  height: 16
})(icon$002Fcontact));
write$002Dfile(public_([
  'svg',
  'flushcache.svg'
]))(render$002Dsvg({
  width: 16,
  height: 16
})(icon$002Fflushcache));
write$002Dfile(public_([
  'svg',
  'tags.svg'
]))(render$002Dsvg({
  width: 16,
  height: 16
})(icon$002Ftags));
write$002Dfile(public_([
  'svg',
  'twitter.svg'
]))(render$002Dsvg({
  width: 16,
  height: 16
})(icon$002Ftwitter));
const render$002Ddocument = element => `<!DOCTYPE html>\n${ element.render('  ')(0)(false) }`;
write$002Dfile(public_(['archives.html']))(render$002Ddocument(base$002Dtemplate('Archives')(render$002Darchives(posts))));
write$002Dfile(public_(['tags.html']))(render$002Ddocument(base$002Dtemplate('Tags')(render$002Dtags(posts))));
pages.forEach(page => write$002Dfile(public_([`${ page.slug }.html`]))(render$002Ddocument(base$002Dtemplate(page.title)(render$002Dpage(page)))));
posts.forEach(post => write$002Dfile(public_([`${ post.slug }.html`]))(render$002Ddocument(base$002Dtemplate(post.title)(render$002Dpost(post)(related$002Dposts(posts)(post))))));
