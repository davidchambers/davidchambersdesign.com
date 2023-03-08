import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import { svg } from '../elements.js';
import _base$002Dtemplate from '../base-template.js';
import _generate$002Dcss from '../generate-css.js';
import masthead from '../masthead.js';
import _related$002Dposts from '../related-posts.js';
import _render$002Darchives from '../render-archives.js';
import _render$002Dpage from '../render-page.js';
import _render$002Dpost from '../render-post.js';
import _render$002Dtags from '../render-tags.js';
import s from '../sanctuary.js';
import _icon$002Fabout from '../icons/about.js';
import _icon$002Farchives from '../icons/archives.js';
import _icon$002Fbitbucket from '../icons/bitbucket.js';
import _icon$002Fcontact from '../icons/contact.js';
import _icon$002Fflushcache from '../icons/flushcache.js';
import _icon$002Ftags from '../icons/tags.js';
import _icon$002Ftwitter from '../icons/twitter.js';
import dates from '../icons/dates.js';
import _page$002Fabout from '../pages/about.js';
import _page$002Felam from '../pages/elam.js';
import _post$002Fbeautiful$002Dpainted$002Dalphabet from '../posts/beautiful-painted-alphabet.js';
import _post$002Fshow$002Dfull$002Ddirectory$002Dpath$002Din$002Dfinder$002Dwindow$002Dtitle$002Dbar from '../posts/show-full-directory-path-in-finder-window-title-bar.js';
import _post$002Frounded$002Drectangles$002Din$002Dadobe$002Dillustrator$002Dcs3 from '../posts/rounded-rectangles-in-adobe-illustrator-cs3.js';
import _post$002Fintelligent$002Dcss$002Dcaching from '../posts/intelligent-css-caching.js';
import _post$002Fescape$002Dspecial$002Dcharacters$002Dfor$002Dsql$002Dregexp from '../posts/escape-special-characters-for-sql-regexp.js';
import _post$002Fdavid$002Dcarsons$002D2003$002Dted$002Dlecture from '../posts/david-carsons-2003-ted-lecture.js';
import _post$002Fwordpress$002Dlogin$002Dredirect from '../posts/wordpress-login-redirect.js';
import _post$002Fvalid$002Dxhtml$002Dalternative$002Dto$002Dstrike from '../posts/valid-xhtml-alternative-to-strike.js';
import _post$002Fchanging$002Dkeyboard$002Dshortcuts$002Din$002Dmac$002Dos$002Dx from '../posts/changing-keyboard-shortcuts-in-mac-os-x.js';
import _post$002Finserting$002Dimages$002Din$002Dgmail$002Dmessages from '../posts/inserting-images-in-gmail-messages.js';
import _post$002Fdjango$002Dsyntax$002Dhighlighting$002Dfor$002Dcoda from '../posts/django-syntax-highlighting-for-coda.js';
import _post$002Flooping$002Dmore$002Dthan$002Donce$002Dwith$002Dthe$002Dwordpress$002Dloop from '../posts/looping-more-than-once-with-the-wordpress-loop.js';
import _post$002Fsms$002Devent$002Dreminders$002Dfrom$002Dgoogle$002Dcalendar from '../posts/sms-event-reminders-from-google-calendar.js';
import _post$002Ftiny$002Dcalendar$002Dicon$002Dset from '../posts/tiny-calendar-icon-set.js';
import _post$002Fapplescript$002Dsyntax$002Dhighlighting from '../posts/applescript-syntax-highlighting.js';
import _post$002Fphp$002Dbrush$002Dfor$002Dsyntaxhighlighter from '../posts/php-brush-for-syntaxhighlighter.js';
import _post$002Fphp$002Dprint$005Ffilesize$002Dfunction from '../posts/php-print_filesize-function.js';
import _post$002Fprototype$002Dloader$002Dfor$002Dsyntaxhighlighter from '../posts/prototype-loader-for-syntaxhighlighter.js';
import _post$002Fassociative$002Darrays$002Din$002Djavascript from '../posts/associative-arrays-in-javascript.js';
import _post$002Fphotoshop$002Dsave$002Dfor$002Dweb$002Djavascript from '../posts/photoshop-save-for-web-javascript.js';
import _post$002Fincredible$002Dperformance$002Dby$002Dkseniya$002Dsimonova from '../posts/incredible-performance-by-kseniya-simonova.js';
import _post$002Fcoda$002Dtheme$002Dfor$002Dsyntaxhighlighter from '../posts/coda-theme-for-syntaxhighlighter.js';
import _post$002Ftiny$002Dcalendar$002Dicons$002Dsprite from '../posts/tiny-calendar-icons-sprite.js';
import _post$002Fcaptions$002Dover$002Dimages from '../posts/captions-over-images.js';
import _post$002Fembed$002Dyoutube$002Dclips$002Dusing$002Dvalid$002Dxhtml$002Dmarkup from '../posts/embed-youtube-clips-using-valid-xhtml-markup.js';
import _post$002Fprototype$002Dimage$002Dslider from '../posts/prototype-image-slider.js';
import _post$002Fsticky$002Dfooters from '../posts/sticky-footers.js';
import _post$002Fmemorable$002Dpasswords$002Dfor$002Dprogrammers from '../posts/memorable-passwords-for-programmers.js';
import _post$002Fmultisession$002Dcd$002Dburning$002Din$002Dsnow$002Dleopard from '../posts/multisession-cd-burning-in-snow-leopard.js';
import _post$002Fcss$002Dfixed$002Dposition$002Dheaders from '../posts/css-fixed-position-headers.js';
import _post$002Fusing$002Dhtml5$002Dtime$002Delement$002Din$002Dwordpress$002Dthemes from '../posts/using-html5-time-element-in-wordpress-themes.js';
import _post$002Fprototype$002Dand$002Dscriptaculous$002Dcombined$002Dand$002Dcompressed from '../posts/prototype-and-scriptaculous-combined-and-compressed.js';
import _post$002Fautopopulating$002Dinput$002Dfields$002Dwith$002Dprototype from '../posts/autopopulating-input-fields-with-prototype.js';
import _post$002Faccessing$002Dmysql$002Dshell$002Dvia$002Dterminal from '../posts/accessing-mysql-shell-via-terminal.js';
import _post$002Fduplicating$002Darrays$002Din$002Djavascript from '../posts/duplicating-arrays-in-javascript.js';
import _post$002Fshockingly$002Dsimple$002Durl$002Dshortening from '../posts/shockingly-simple-url-shortening.js';
import _post$002Fresize$002Dbrowser$002Dwindow$002Dto$002Dmatch$002Diphone$002Dviewport$002Ddimensions from '../posts/resize-browser-window-to-match-iphone-viewport-dimensions.js';
import _post$002Fget$002Dattributes$002Dof$002Ddjango$002Dmodel$002Dor$002Dinstance from '../posts/get-attributes-of-django-model-or-instance.js';
import _post$002Fgorgeous$002Dcss3$002Dbuttons$002Dinspired$002Dby$002Daqua from '../posts/gorgeous-css3-buttons-inspired-by-aqua.js';
import _post$002Fcricket$002Dfield$002Ddiagrams from '../posts/cricket-field-diagrams.js';
import _post$002Fmootools$002Devery$002Dmethod from '../posts/mootools-every-method.js';
import _post$002Fforcing$002Dbrowsers$002Dto$002Drerender$002Delements from '../posts/forcing-browsers-to-rerender-elements.js';
import _post$002Fcss$002Dimage$002Dswitcher$002Ddone$002Dthe$002Dright$002Dway from '../posts/css-image-switcher-done-the-right-way.js';
import _post$002Ffascinating$002Dinsight$002Dinto$002Dthe$002Dmind$002Dof$002Da$002Dwindows$002Duser from '../posts/fascinating-insight-into-the-mind-of-a-windows-user.js';
import _post$002Fusing$002Dgoogle$002Dfor$002Dsite$002Dsearch from '../posts/using-google-for-site-search.js';
import _post$002Fextra$002Dcomma$002Dconsidered$002Dharmful from '../posts/extra-comma-considered-harmful.js';
import _post$002Fapplication$002Dspecific$002Dvolume$002Dcontrol$002Din$002Dmac$002Dos$002Dx from '../posts/application-specific-volume-control-in-mac-os-x.js';
import _post$002Flinkify$002Dtweets$002Dwith$002Dregex from '../posts/linkify-tweets-with-regex.js';
import _post$002Fserializing$002Ddjango$002Dmodel$002Dinstances from '../posts/serializing-django-model-instances.js';
import _post$002Ffreeing$002Dmyself$002Dof$002Dwordpress from '../posts/freeing-myself-of-wordpress.js';
import _post$002Foptimization$002Dvia$002Dstringification from '../posts/optimization-via-stringification.js';
import _post$002Fautopopulating$002Dinput$002Dfields$002Dwith$002Dmootools from '../posts/autopopulating-input-fields-with-mootools.js';
import _post$002Fwmd$002Dftw from '../posts/wmd-ftw.js';
import _post$002Ffirst$002Dmatching$002Ditem from '../posts/first-matching-item.js';
import _post$002Fsettimeout$002Dfix$002Dfor$002Dwebkit$002Dtransition from '../posts/settimeout-fix-for-webkit-transition.js';
import _post$002Ftesting$002Ddjango$002Dapps$002Dusing$002Dlocalhost$002Dsubdomains from '../posts/testing-django-apps-using-localhost-subdomains.js';
import _post$002Fempty$002Dcollections$002Dare$002Dvalid$002Dcache$002Ddata from '../posts/empty-collections-are-valid-cache-data.js';
import _post$002F$002Dwebkit$002Dbox$002Dsizing from '../posts/-webkit-box-sizing.js';
import _post$002Fremove$002Dtextarea$002Dscrollbars$002Din$002Dinternet$002Dexplorer from '../posts/remove-textarea-scrollbars-in-internet-explorer.js';
import _post$002Fpositioning$002Delements$002Dusing$002Dmootools from '../posts/positioning-elements-using-mootools.js';
import _post$002Fjavascript$002Deverywhere from '../posts/javascript-everywhere.js';
import _post$002Fdieter$002Drams$002Dvideo$002Dinterview from '../posts/dieter-rams-video-interview.js';
import _post$002Fgmail$002Dfavicon$002Dconfusion from '../posts/gmail-favicon-confusion.js';
import _post$002Fman$002Dafter$002Dmy$002Down$002Dheart from '../posts/man-after-my-own-heart.js';
import _post$002Fdigitalcolor$002Dmeter from '../posts/digitalcolor-meter.js';
import _post$002Fpython$002Dloops$002Dcan$002Dhave$002Delse$002Dclause from '../posts/python-loops-can-have-else-clause.js';
import _post$002Fself$002Dcaching$002Dfunctions$002Din$002Djavascript$002Dand$002Dpython from '../posts/self-caching-functions-in-javascript-and-python.js';
import _post$002Fefficient$002Drounding$002Din$002Djavascript from '../posts/efficient-rounding-in-javascript.js';
import _post$002Ffiltering$002Dlists$002Din$002Dpython$002Druby$002Dand$002Djavascript from '../posts/filtering-lists-in-python-ruby-and-javascript.js';
import _post$002Fconverting$002Dintegers$002Dto$002Dordinals from '../posts/converting-integers-to-ordinals.js';
import _post$002Fbike$002Dshelf from '../posts/bike-shelf.js';
import _post$002Fcustomizing$002Dfile$002Dand$002Dfolder$002Dicons$002Din$002Dmac$002Dos$002Dx from '../posts/customizing-file-and-folder-icons-in-mac-os-x.js';
import _post$002Fridding$002Dmarkup$002Dof$002Dtextual$002Ddecoration from '../posts/ridding-markup-of-textual-decoration.js';
import _post$002Fjavascript$002Ddate$002Dand$002Dtime$002Dlocalization from '../posts/javascript-date-and-time-localization.js';
import _post$002Fbitwise$002Dnot$002Doperator$002Dproves$002Duseful$002Din$002Djavascript from '../posts/bitwise-not-operator-proves-useful-in-javascript.js';
import _post$002Fcomposing$002Dmercurial$002Dcommit$002Dmessages$002Din$002Dtextmate from '../posts/composing-mercurial-commit-messages-in-textmate.js';
import _post$002Fsafari$002Dkeyboard$002Dshortcut$002Dto$002Dopen$002Dcurrent$002Dpage$002Din$002Dgoogle$002Dchrome from '../posts/safari-keyboard-shortcut-to-open-current-page-in-google-chrome.js';
import _post$002Fsimulating$002Dnonlocal$002Din$002Dpython$002D2$002Dx from '../posts/simulating-nonlocal-in-python-2.x.js';
import _post$002Ffaster$002Dterminal$002Dnavigation$002Dvia$002Daliases from '../posts/faster-terminal-navigation-via-aliases.js';
import _post$002Fcustomizing$002Dyour$002Dbash$002Dprompt$002Dfor$002Dpleasure$002Dand$002Dprofit from '../posts/customizing-your-bash-prompt-for-pleasure-and-profit.js';
import _post$002Fmapping$002Dfile$002Dextensions$002Dto$002Demacs$002Dsyntax$002Dmodes from '../posts/mapping-file-extensions-to-emacs-syntax-modes.js';
import _post$002Frepeating$002Dstrings$002Din$002Djavascript from '../posts/repeating-strings-in-javascript.js';
import _post$002Fchanging$002Dthe$002Dcolour$002Dof$002Dlist$002Dbullets$002Dusing$002Dcss from '../posts/changing-the-colour-of-list-bullets-using-css.js';
import _post$002Fsolarized from '../posts/solarized.js';
import _post$002Fhashify$002Deditor from '../posts/hashify-editor.js';
import _post$002Fend$002Dof$002Dstring$002Danchor$002Din$002Djavascript$002Dregular$002Dexpressions from '../posts/end-of-string-anchor-in-javascript-regular-expressions.js';
import _post$002Fgetting$002Dtruth$002Dout$002Dof$002Dthe$002Ddom from '../posts/getting-truth-out-of-the-dom.js';
import _post$002Fescaping$002Dhtml$002Din$002Djavascript from '../posts/escaping-html-in-javascript.js';
import _post$002Fdecorators$002Din$002Djavascript from '../posts/decorators-in-javascript.js';
import _post$002Fgetting$002Dstarted$002Dwith$002Dsocket$002Dio from '../posts/getting-started-with-socket.io.js';
import _post$002Fhigher$002Dlevel$002Dstyle$002Dsheets from '../posts/higher-level-style-sheets.js';
import _post$002Fhelveticards from '../posts/helveticards.js';
import _post$002Fitunes$002Dis$002Dsurprisingly$002Duseful$002Dwhen$002Dlearning$002Da$002Dforeign$002Dlanguage from '../posts/itunes-is-surprisingly-useful-when-learning-a-foreign-language.js';
import _post$002Fthe$002Dperils$002Dof$002Dusing$002Djavascript$002Dobjects$002Das$002Dsets from '../posts/the-perils-of-using-javascript-objects-as-sets.js';
import _post$002Fgive$002Dand$002Dtake$002Dof$002Dcontinuation$002Dpassing$002Dstyle from '../posts/give-and-take-of-continuation-passing-style.js';
const _$005F$005Fdirname = path['dirname'](url['fileURLToPath'](import.meta['url']));
const pages = [
  _page$002Fabout,
  _page$002Felam
];
const posts = [
  _post$002Fbeautiful$002Dpainted$002Dalphabet,
  _post$002Fshow$002Dfull$002Ddirectory$002Dpath$002Din$002Dfinder$002Dwindow$002Dtitle$002Dbar,
  _post$002Frounded$002Drectangles$002Din$002Dadobe$002Dillustrator$002Dcs3,
  _post$002Fintelligent$002Dcss$002Dcaching,
  _post$002Fescape$002Dspecial$002Dcharacters$002Dfor$002Dsql$002Dregexp,
  _post$002Fdavid$002Dcarsons$002D2003$002Dted$002Dlecture,
  _post$002Fwordpress$002Dlogin$002Dredirect,
  _post$002Fvalid$002Dxhtml$002Dalternative$002Dto$002Dstrike,
  _post$002Fchanging$002Dkeyboard$002Dshortcuts$002Din$002Dmac$002Dos$002Dx,
  _post$002Finserting$002Dimages$002Din$002Dgmail$002Dmessages,
  _post$002Fdjango$002Dsyntax$002Dhighlighting$002Dfor$002Dcoda,
  _post$002Flooping$002Dmore$002Dthan$002Donce$002Dwith$002Dthe$002Dwordpress$002Dloop,
  _post$002Fsms$002Devent$002Dreminders$002Dfrom$002Dgoogle$002Dcalendar,
  _post$002Ftiny$002Dcalendar$002Dicon$002Dset,
  _post$002Fapplescript$002Dsyntax$002Dhighlighting,
  _post$002Fphp$002Dbrush$002Dfor$002Dsyntaxhighlighter,
  _post$002Fphp$002Dprint$005Ffilesize$002Dfunction,
  _post$002Fprototype$002Dloader$002Dfor$002Dsyntaxhighlighter,
  _post$002Fassociative$002Darrays$002Din$002Djavascript,
  _post$002Fphotoshop$002Dsave$002Dfor$002Dweb$002Djavascript,
  _post$002Fincredible$002Dperformance$002Dby$002Dkseniya$002Dsimonova,
  _post$002Fcoda$002Dtheme$002Dfor$002Dsyntaxhighlighter,
  _post$002Ftiny$002Dcalendar$002Dicons$002Dsprite,
  _post$002Fcaptions$002Dover$002Dimages,
  _post$002Fembed$002Dyoutube$002Dclips$002Dusing$002Dvalid$002Dxhtml$002Dmarkup,
  _post$002Fprototype$002Dimage$002Dslider,
  _post$002Fsticky$002Dfooters,
  _post$002Fmemorable$002Dpasswords$002Dfor$002Dprogrammers,
  _post$002Fmultisession$002Dcd$002Dburning$002Din$002Dsnow$002Dleopard,
  _post$002Fcss$002Dfixed$002Dposition$002Dheaders,
  _post$002Fusing$002Dhtml5$002Dtime$002Delement$002Din$002Dwordpress$002Dthemes,
  _post$002Fprototype$002Dand$002Dscriptaculous$002Dcombined$002Dand$002Dcompressed,
  _post$002Fautopopulating$002Dinput$002Dfields$002Dwith$002Dprototype,
  _post$002Faccessing$002Dmysql$002Dshell$002Dvia$002Dterminal,
  _post$002Fduplicating$002Darrays$002Din$002Djavascript,
  _post$002Fshockingly$002Dsimple$002Durl$002Dshortening,
  _post$002Fresize$002Dbrowser$002Dwindow$002Dto$002Dmatch$002Diphone$002Dviewport$002Ddimensions,
  _post$002Fget$002Dattributes$002Dof$002Ddjango$002Dmodel$002Dor$002Dinstance,
  _post$002Fgorgeous$002Dcss3$002Dbuttons$002Dinspired$002Dby$002Daqua,
  _post$002Fcricket$002Dfield$002Ddiagrams,
  _post$002Fmootools$002Devery$002Dmethod,
  _post$002Fforcing$002Dbrowsers$002Dto$002Drerender$002Delements,
  _post$002Fcss$002Dimage$002Dswitcher$002Ddone$002Dthe$002Dright$002Dway,
  _post$002Ffascinating$002Dinsight$002Dinto$002Dthe$002Dmind$002Dof$002Da$002Dwindows$002Duser,
  _post$002Fusing$002Dgoogle$002Dfor$002Dsite$002Dsearch,
  _post$002Fextra$002Dcomma$002Dconsidered$002Dharmful,
  _post$002Fapplication$002Dspecific$002Dvolume$002Dcontrol$002Din$002Dmac$002Dos$002Dx,
  _post$002Flinkify$002Dtweets$002Dwith$002Dregex,
  _post$002Fserializing$002Ddjango$002Dmodel$002Dinstances,
  _post$002Ffreeing$002Dmyself$002Dof$002Dwordpress,
  _post$002Foptimization$002Dvia$002Dstringification,
  _post$002Fautopopulating$002Dinput$002Dfields$002Dwith$002Dmootools,
  _post$002Fwmd$002Dftw,
  _post$002Ffirst$002Dmatching$002Ditem,
  _post$002Fsettimeout$002Dfix$002Dfor$002Dwebkit$002Dtransition,
  _post$002Ftesting$002Ddjango$002Dapps$002Dusing$002Dlocalhost$002Dsubdomains,
  _post$002Fempty$002Dcollections$002Dare$002Dvalid$002Dcache$002Ddata,
  _post$002F$002Dwebkit$002Dbox$002Dsizing,
  _post$002Fremove$002Dtextarea$002Dscrollbars$002Din$002Dinternet$002Dexplorer,
  _post$002Fpositioning$002Delements$002Dusing$002Dmootools,
  _post$002Fjavascript$002Deverywhere,
  _post$002Fdieter$002Drams$002Dvideo$002Dinterview,
  _post$002Fgmail$002Dfavicon$002Dconfusion,
  _post$002Fman$002Dafter$002Dmy$002Down$002Dheart,
  _post$002Fdigitalcolor$002Dmeter,
  _post$002Fpython$002Dloops$002Dcan$002Dhave$002Delse$002Dclause,
  _post$002Fself$002Dcaching$002Dfunctions$002Din$002Djavascript$002Dand$002Dpython,
  _post$002Fefficient$002Drounding$002Din$002Djavascript,
  _post$002Ffiltering$002Dlists$002Din$002Dpython$002Druby$002Dand$002Djavascript,
  _post$002Fconverting$002Dintegers$002Dto$002Dordinals,
  _post$002Fbike$002Dshelf,
  _post$002Fcustomizing$002Dfile$002Dand$002Dfolder$002Dicons$002Din$002Dmac$002Dos$002Dx,
  _post$002Fridding$002Dmarkup$002Dof$002Dtextual$002Ddecoration,
  _post$002Fjavascript$002Ddate$002Dand$002Dtime$002Dlocalization,
  _post$002Fbitwise$002Dnot$002Doperator$002Dproves$002Duseful$002Din$002Djavascript,
  _post$002Fcomposing$002Dmercurial$002Dcommit$002Dmessages$002Din$002Dtextmate,
  _post$002Fsafari$002Dkeyboard$002Dshortcut$002Dto$002Dopen$002Dcurrent$002Dpage$002Din$002Dgoogle$002Dchrome,
  _post$002Fsimulating$002Dnonlocal$002Din$002Dpython$002D2$002Dx,
  _post$002Ffaster$002Dterminal$002Dnavigation$002Dvia$002Daliases,
  _post$002Fcustomizing$002Dyour$002Dbash$002Dprompt$002Dfor$002Dpleasure$002Dand$002Dprofit,
  _post$002Fmapping$002Dfile$002Dextensions$002Dto$002Demacs$002Dsyntax$002Dmodes,
  _post$002Frepeating$002Dstrings$002Din$002Djavascript,
  _post$002Fchanging$002Dthe$002Dcolour$002Dof$002Dlist$002Dbullets$002Dusing$002Dcss,
  _post$002Fsolarized,
  _post$002Fhashify$002Deditor,
  _post$002Fend$002Dof$002Dstring$002Danchor$002Din$002Djavascript$002Dregular$002Dexpressions,
  _post$002Fgetting$002Dtruth$002Dout$002Dof$002Dthe$002Ddom,
  _post$002Fescaping$002Dhtml$002Din$002Djavascript,
  _post$002Fdecorators$002Din$002Djavascript,
  _post$002Fgetting$002Dstarted$002Dwith$002Dsocket$002Dio,
  _post$002Fhigher$002Dlevel$002Dstyle$002Dsheets,
  _post$002Fhelveticards,
  _post$002Fitunes$002Dis$002Dsurprisingly$002Duseful$002Dwhen$002Dlearning$002Da$002Dforeign$002Dlanguage,
  _post$002Fthe$002Dperils$002Dof$002Dusing$002Djavascript$002Dobjects$002Das$002Dsets,
  _post$002Fgive$002Dand$002Dtake$002Dof$002Dcontinuation$002Dpassing$002Dstyle
];
const _public = function _public(components) {
  return path['join'](...[
    _$005F$005Fdirname,
    '..',
    '..',
    'public',
    ...components
  ]);
};
const _write$002Dfile = function _write$002Dfile(filename) {
  return data => fs['writeFileSync'](...[
    filename,
    data
  ]);
};
_write$002Dfile(_public([
  'css',
  'screen.css'
]))(_generate$002Dcss);
const _render$002Dsvg = function _render$002Dsvg(attrs) {
  return paths => (() => {
    const _attrs$0027 = {
      [Symbol.for('xmlns')]: 'http://www.w3.org/2000/svg',
      [Symbol.for('version')]: '1.1',
      ...attrs
    };
    return '<?xml version="1.0" standalone="no"?>\n' + svg(_attrs$0027)(paths)[Symbol.for('render')]('  ')(0)(false);
  })();
};
_write$002Dfile(_public([
  'svg',
  'masthead.svg'
]))(_render$002Dsvg({})(masthead[Symbol.for('fill')]));
_write$002Dfile(_public([
  'svg',
  'masthead-mask.svg'
]))(_render$002Dsvg({})(masthead[Symbol.for('mask')]));
_write$002Dfile(_public([
  'svg',
  'about.svg'
]))(_render$002Dsvg({
  [Symbol.for('width')]: 16,
  [Symbol.for('height')]: 16
})(_icon$002Fabout));
_write$002Dfile(_public([
  'svg',
  'archives.svg'
]))(_render$002Dsvg({
  [Symbol.for('width')]: 16,
  [Symbol.for('height')]: 16
})(_icon$002Farchives));
_write$002Dfile(_public([
  'svg',
  'bitbucket.svg'
]))(_render$002Dsvg({
  [Symbol.for('width')]: 16,
  [Symbol.for('height')]: 16
})(_icon$002Fbitbucket));
_write$002Dfile(_public([
  'svg',
  'dates-0.svg'
]))(_render$002Dsvg({})(dates[0]));
_write$002Dfile(_public([
  'svg',
  'dates-1.svg'
]))(_render$002Dsvg({})(dates[1]));
_write$002Dfile(_public([
  'svg',
  'dates-2.svg'
]))(_render$002Dsvg({})(dates[2]));
_write$002Dfile(_public([
  'svg',
  'dates-3.svg'
]))(_render$002Dsvg({})(dates[3]));
_write$002Dfile(_public([
  'svg',
  'dates-4.svg'
]))(_render$002Dsvg({})(dates[4]));
_write$002Dfile(_public([
  'svg',
  'dates-5.svg'
]))(_render$002Dsvg({})(dates[5]));
_write$002Dfile(_public([
  'svg',
  'dates-6.svg'
]))(_render$002Dsvg({})(dates[6]));
_write$002Dfile(_public([
  'svg',
  'dates-7.svg'
]))(_render$002Dsvg({})(dates[7]));
_write$002Dfile(_public([
  'svg',
  'dates-8.svg'
]))(_render$002Dsvg({})(dates[8]));
_write$002Dfile(_public([
  'svg',
  'dates-9.svg'
]))(_render$002Dsvg({})(dates[9]));
_write$002Dfile(_public([
  'svg',
  'contact.svg'
]))(_render$002Dsvg({
  [Symbol.for('width')]: 16,
  [Symbol.for('height')]: 16
})(_icon$002Fcontact));
_write$002Dfile(_public([
  'svg',
  'flushcache.svg'
]))(_render$002Dsvg({
  [Symbol.for('width')]: 16,
  [Symbol.for('height')]: 16
})(_icon$002Fflushcache));
_write$002Dfile(_public([
  'svg',
  'tags.svg'
]))(_render$002Dsvg({
  [Symbol.for('width')]: 16,
  [Symbol.for('height')]: 16
})(_icon$002Ftags));
_write$002Dfile(_public([
  'svg',
  'twitter.svg'
]))(_render$002Dsvg({
  [Symbol.for('width')]: 16,
  [Symbol.for('height')]: 16
})(_icon$002Ftwitter));
const _render$002Ddocument = function _render$002Ddocument(element) {
  return (() => {
    return '<!DOCTYPE html>\n' + element[Symbol.for('render')]('  ')(0)(false);
  })();
};
_write$002Dfile(_public(['archives.html']))(_render$002Ddocument(_base$002Dtemplate('Archives')(_render$002Darchives(posts))));
_write$002Dfile(_public(['tags.html']))(_render$002Ddocument(_base$002Dtemplate('Tags')(_render$002Dtags(posts))));
s[Symbol.for('map')](page => _write$002Dfile(_public([page[Symbol.for('slug')] + '.html']))(_render$002Ddocument(_base$002Dtemplate(page[Symbol.for('title')])(_render$002Dpage(page)))))(pages);
s[Symbol.for('map')](post => _write$002Dfile(_public([post[Symbol.for('slug')] + '.html']))(_render$002Ddocument(_base$002Dtemplate(post[Symbol.for('title')])(_render$002Dpost(post)(_related$002Dposts(posts)(post))))))(posts);
