import s from '../sanctuary.js';
const _$0027 = function _$0027(text) {
  return '\'' + text['replace'](new RegExp('(?=\')', 'g'), '\\') + '\'';
};
const base03 = '#002b36';
const base02 = '#073642';
const base01 = '#586e75';
const base00 = '#657b83';
const base0 = '#839496';
const base1 = '#93a1a1';
const base2 = '#eee8d5';
const base3 = '#fdf6e3';
const yellow = '#b58900';
const orange = '#cb4b16';
const red = '#dc322f';
const magenta = '#d33682';
const violet = '#6c71c4';
const blue = '#268bd2';
const cyan = '#2aa198';
const green = '#859900';
const _mid$002Dgray = '#a9a9a9';
const pink = '#ff5e99';
const _recycled$002Dpaper = '#fef9ec';
const screen = function screen(coerce) {
  return (() => {
    const _$0025 = function _$0025(x) {
      return coerce(x) + '%';
    };
    const em = function em(x) {
      return coerce(x) + 'em';
    };
    const px = function px(x) {
      return coerce(x) + 'px';
    };
    const _sans$002Dserif = function _sans$002Dserif(names) {
      return s[Symbol.for('join-with')](', ')([
        ...s[Symbol.for('map')](_$0027)(names),
        'sans-serif'
      ]);
    };
    const monospace = function monospace(names) {
      return s[Symbol.for('join-with')](', ')([
        ...s[Symbol.for('map')](_$0027)(names),
        'monospace'
      ]);
    };
    const rgba = function rgba(r) {
      return g => b => a => 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
    };
    const _$0021important = function _$0021important(x) {
      return coerce(x) + ' !important';
    };
    const _tag$002Dbackground = s[Symbol.for('pipe')]([
      Math['log2'],
      n => n * 5,
      n => 247 - n,
      Math['floor'],
      n => n['toString'](16),
      s => s['padStart'](2, '0'),
      s => s['repeat'](3),
      s => '#' + s
    ]);
    const _tag$002Dcolor = s[Symbol.for('pipe')]([
      Math['log2'],
      n => n * 0.1,
      n => n + 0.3,
      n => n['toFixed'](3),
      s => s['replace'](new RegExp('0*$', ''), ''),
      s => s['replace'](new RegExp('[.]$', ''), ''),
      rgba(0)(0)(0)
    ]);
    return s[Symbol.for('join')]([
      [
        ['html'],
        [
          Symbol.for('height'),
          _$0025(100),
          Symbol.for('background-color'),
          base3
        ],
        ['html > body'],
        [
          Symbol.for('font-size'),
          px(12)
        ],
        ['body'],
        [
          Symbol.for('position'),
          Symbol.for('relative'),
          Symbol.for('min-width'),
          px(675),
          Symbol.for('height'),
          _$0025(100),
          Symbol.for('background-color'),
          base3,
          Symbol.for('font-size'),
          _$0025(75),
          Symbol.for('font-family'),
          _sans$002Dserif([
            'Lucida Grande',
            'Lucida Sans Unicode',
            'Helvetica',
            'Arial'
          ]),
          Symbol.for('color'),
          base00,
          Symbol.for('cursor'),
          Symbol.for('default')
        ],
        ['#skip'],
        [
          Symbol.for('position'),
          Symbol.for('absolute'),
          Symbol.for('left'),
          px(-9999)
        ],
        ['#wrap'],
        [
          Symbol.for('position'),
          Symbol.for('relative'),
          Symbol.for('height'),
          Symbol.for('auto'),
          Symbol.for('min-height'),
          _$0025(100),
          Symbol.for('font-size'),
          em(1),
          Symbol.for('line-height'),
          1.75,
          Symbol.for('overflow'),
          Symbol.for('hidden')
        ],
        ['#header'],
        [
          Symbol.for('position'),
          Symbol.for('fixed'),
          Symbol.for('left'),
          0,
          Symbol.for('top'),
          0,
          Symbol.for('width'),
          _$0025(100),
          Symbol.for('height'),
          px(160),
          Symbol.for('background'),
          [
            'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAACgCAYAAADNVQbCAAAAUElEQVQoke3JsQ0CQRAEwd5+EPlniYE3J+E8NxhEgfROOcXn/awAFxd/xsxEILYsZ4jQCMZ2r98yE+leUiMSnUZ6xLPn8rYbOe6RB5EXC4AvwzcoH+3LgngAAAAASUVORK5CYII=\')',
            Symbol.for('repeat-x')
          ],
          Symbol.for('z-index'),
          10
        ],
        ['#header header'],
        [
          Symbol.for('position'),
          Symbol.for('relative'),
          Symbol.for('margin'),
          [
            0,
            Symbol.for('auto')
          ],
          Symbol.for('width'),
          _$0025(65),
          Symbol.for('min-width'),
          px(615),
          Symbol.for('max-width'),
          em(60),
          Symbol.for('padding'),
          [
            px(24),
            px(30),
            0
          ]
        ],
        ['#header header hr'],
        [
          Symbol.for('margin'),
          [
            px(6),
            Symbol.for('auto'),
            0,
            0
          ],
          Symbol.for('width'),
          px(354),
          Symbol.for('text-align'),
          Symbol.for('left')
        ],
        ['#header header p'],
        [
          Symbol.for('margin'),
          0,
          Symbol.for('height'),
          px(21),
          Symbol.for('background'),
          [
            'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAAQCAYAAAAswXUEAAAByElEQVR42u2aO3bDMAwEef8b6LRwkyIvzw7xWZASPcUUiWwaWgJLGPIwswEAAPtABAAAjBgAACMGAACMGAAAIwYAgF1GfF2X/TB+4f2fis61O2Mgbn3sd8wzW6TZrlpcvQ+nekg6Hoz4DEMbBxkxWmHEGPGf0//d5ni6hE9rev6erTlLGgu8LyKcPSTuWUyeeNSxWiDPFBpn8tKjhwX3p1IHXo08BZ/Z887czmgRvY+oJlbMa28z+/b9I7lIxRxmCdeVsCNYNJ5rFiyKFXFbwGDGAo2juqpzY4dWKiP2GNIoHgbZz8jmi/qQUuZBd3wf189+LVF0akPYMXs2u9IRW6EgLWBiirirhafWOFKMuwtQbcTVOuj+fNU+ZEcbWW1Wa6K4/q+nKET03KyJjLjasVZmOrbw1K7EreqAlBpbkwE8zYjtQCO2Kz8jzWhTuc9sA1XxP9drqoP6ardWLZDoukOYOCuMOBO3qvDUGn+rESv2/e4dcWZ8qa6JVZpkrk9j6RxNKI04MxhXPqxbPZpQPazLjhmUGnePJiIPalZpdScjzsxru2uyeqh0PazL6lb+RvG0n10BnPqTQvjinGET4KRCwoThkTnzAjIvgGm0M2OfAAAAAElFTkSuQmCC\')',
            Symbol.for('no-repeat')
          ],
          Symbol.for('line-height'),
          10,
          Symbol.for('overflow'),
          Symbol.for('hidden')
        ],
        ['#header header form'],
        [
          Symbol.for('position'),
          Symbol.for('absolute'),
          Symbol.for('right'),
          px(27),
          Symbol.for('top'),
          px(24),
          Symbol.for('width'),
          px(27)
        ],
        ['#header header form div'],
        [
          Symbol.for('position'),
          Symbol.for('relative')
        ],
        ['#header header form div label'],
        [
          Symbol.for('position'),
          Symbol.for('absolute'),
          Symbol.for('left'),
          px(-9999)
        ],
        ['#header header form div input[type=\'search\']'],
        [
          Symbol.for('position'),
          Symbol.for('absolute'),
          Symbol.for('right'),
          px(27),
          Symbol.for('top'),
          0,
          Symbol.for('display'),
          Symbol.for('block'),
          Symbol.for('float'),
          Symbol.for('left'),
          Symbol.for('width'),
          em(12.5),
          Symbol.for('max-width'),
          px(200),
          Symbol.for('height'),
          px(16),
          Symbol.for('font-size'),
          em(1.083)
        ],
        ['#header header form div input[type=\'submit\']'],
        [
          Symbol.for('position'),
          Symbol.for('absolute'),
          Symbol.for('right'),
          0,
          Symbol.for('top'),
          0,
          Symbol.for('display'),
          Symbol.for('block'),
          Symbol.for('margin'),
          0,
          Symbol.for('width'),
          0,
          Symbol.for('height'),
          0,
          Symbol.for('border'),
          Symbol.for('none'),
          Symbol.for('background'),
          [
            'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABtklEQVRIx7WUsWrCUBSGMzt1dHAWhG5eFQyEFJwsSBxcSlsqYhwcKnYolIB3qZRSXESKYye7+AgpqQUnX8FH8Bluzx+OEIpWb5oGPg9E7/mu/z2JoZQy/pPwI5/PRxGEJAJiwwR8T0R/G0fQKZVKn/V6/X0ymTyv12tJDMbj8RPdm+E7/CauoGOa5tcLXXRPEh5xT9wRPeJ2OBw+lsvlxVaiIxDYXaT5A9EnukSbaBI3qFLKQbFYRGRCRyARS6Q5duwSV0SDcIga10a1Wn3DGh1BgMw5lj43v+CmFcIiTK4Vz/N6WKMj2OBAOfMu7xzNbQJRnBI5rmK5XJ5jja5gwAfa5lgq3DxLZIg016zv+2e6ggCjyNk3OWuLd4ymJ0SKa6bVal3rRoRDnmEUeVpqnHmOd57isYQkbVnWq+4hh2OKOT/0DxzHuRRCfOiOafig4SHCnO87AzQvFAr+fD5XPAD6rwo8RJhzjCKmBQeKzBELdj4ajdT2MgxDJv6ym06n9mq1Uq7rKtRDknivYFpGsqMkcQX2LkloTkiwV5Kk4CjJXwUHJUkIfpUkJdgpSVrwU2LHFujwDcrfprHNIpr7AAAAAElFTkSuQmCC\')',
            Symbol.for('no-repeat'),
            _$0025(100)
          ],
          Symbol.for('padding'),
          [
            px(24),
            0,
            0,
            px(27)
          ],
          Symbol.for('cursor'),
          Symbol.for('pointer')
        ],
        ['#title'],
        [
          Symbol.for('display'),
          Symbol.for('block'),
          Symbol.for('width'),
          px(354),
          Symbol.for('height'),
          px(24),
          Symbol.for('mask-image'),
          'url(/svg/masthead-mask.svg)',
          Symbol.for('background'),
          [
            'url(/svg/masthead.svg)',
            Symbol.for('no-repeat')
          ],
          Symbol.for('line-height'),
          10,
          Symbol.for('overflow'),
          Symbol.for('hidden')
        ],
        [
          'a#title:focus',
          'a#title:hover',
          'a#title.hover'
        ],
        [
          Symbol.for('background-color'),
          '#ccc'
        ],
        ['#nav > ul'],
        [
          Symbol.for('position'),
          Symbol.for('relative'),
          Symbol.for('margin'),
          [
            px(12),
            0,
            0
          ]
        ],
        ['#nav > ul > li'],
        [
          Symbol.for('float'),
          Symbol.for('left'),
          Symbol.for('margin'),
          [
            0,
            px(6),
            0,
            0
          ]
        ],
        ['#nav a'],
        [
          Symbol.for('display'),
          Symbol.for('block'),
          Symbol.for('width'),
          px(28),
          Symbol.for('height'),
          px(28),
          Symbol.for('border-radius'),
          px(4),
          Symbol.for('border'),
          [
            px(1),
            Symbol.for('solid'),
            '#999999'
          ],
          Symbol.for('background'),
          [
            Symbol.for('no-repeat'),
            _$0025(50)
          ]
        ],
        ['#nav a:focus'],
        [
          Symbol.for('border-color'),
          orange,
          Symbol.for('background-color'),
          '#eecc66'
        ],
        ['#nav a:focus > span'],
        [
          Symbol.for('visibility'),
          Symbol.for('visible')
        ],
        [
          '#nav a:hover',
          '#nav a.hover'
        ],
        [
          Symbol.for('border-color'),
          orange,
          Symbol.for('background-color'),
          Symbol.for('white')
        ],
        [
          '#nav a:hover > span',
          '#nav a.hover > span'
        ],
        [
          Symbol.for('visibility'),
          Symbol.for('visible'),
          Symbol.for('z-index'),
          20
        ],
        ['#nav a > span'],
        [
          Symbol.for('position'),
          Symbol.for('absolute'),
          Symbol.for('left'),
          0,
          Symbol.for('top'),
          px(36),
          Symbol.for('display'),
          Symbol.for('block'),
          Symbol.for('width'),
          px(354),
          Symbol.for('height'),
          px(10),
          Symbol.for('background'),
          base3,
          Symbol.for('line-height'),
          10,
          Symbol.for('overflow'),
          Symbol.for('hidden'),
          Symbol.for('visibility'),
          Symbol.for('hidden')
        ],
        ['#nav a[href=\'/about/\'] > span'],
        [
          Symbol.for('background-image'),
          'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAAKCAYAAACOjFT5AAABNUlEQVRo3u2YQRKDIAxFSac38k4eyjN5p3TjwlIJITEC0/822qJJDBA+0LIs6YCPK6VvSv/fyaWPfd9/Hty2LX+29fftcU7IaDmp2WjxYYpnXdcEQC9eSAEAAPTlfVIRdFy5oCb4dE9CW96uVaxJ8B2tBKX4LfZrebCodqvt0vvaHLXEyo7x4el/dvQLAFMpYhKKp9SusdsyQTQFvVQkIuK/ypFkJ4+DlX4ttqVvjFjkSCh8pOgrTxEmxeLg7V8AQhXxP/CECmJDHBRo25qn8wJxtVOiRt8ofABUFDELCmoGeLA4IlTnE4o2Kr89YwdgqqMJGmyisGKbnjLVlm+PgX/38A/5rY01AIY6mpDO9djRPkLRuSM+CpzUXtuRsfX2XbM/+vgDIBEzxAAAAIxwNAEAAKATH+FfdBZqw1WQAAAAAElFTkSuQmCC\')'
        ],
        ['#nav a[href=\'/archives/\'] > span'],
        [
          Symbol.for('background-image'),
          'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAAKCAYAAACOjFT5AAACHElEQVRo3u1aWa7DIAxkqnejcCYOxZlyJ7+fRkKIzQbCUixVagIEPHaHiQuu61JfI6WUuu8bqtK01slnpdqttepFI+8agTZkxkK9a6Pm3d23VnOTIJdWxM2fM7WGoTlrjJk+8f9GTNqC7DslEm1KcMeOHVuAiB8CIq01uUTpqtdYW4pgQ+rXv+dfW2vpu5PBUcrk7XLwlDTF2joqaE4/MNS4347APYqorhLl4W5Cqedw1136hkGZsZRRVrPjWuKDBNeY+kRgbml8lbBvrXrn5A46r/F1+3DLDSEyTZUgfLKVmEvMD8m6xBtq76ygS+dA4sfObVeJ75K1hZJYuq6SsSGCogLfVsI15wMJ110SRzSIbwxnyZpUB/9r/VmfiFOEG1PDpSWIEFnHCDWklmOqeQOjzv1TBFNS15OMxQ/gysUrh51046qNLzmfkf638mdqIiY/yDXqtadZaymkelMljEUNTBJAY9IggbpuMXZ3XGfBrmQe6VvWCP9nzjmWIkatI7Xk7daHY2qYUzN++ixMzGjQX6pmSgmIKsb+Iq41uCNThui5Ic26UebGkVqkVCE+NfH8eZc7qtbCjDHwSTVGyowaMQKBArM/55UWjLmJSRxUQTQcTPx2VODZqrSwAq6tchGVxMKJEV4kMmnuvJlzfQFwzhE/BDu6/LBBZWGqetVOR/J+GdflyWaUrXCO+HPCtLWdc9H74XriuaH9AyA2SpOz0ppaAAAAAElFTkSuQmCC\')'
        ],
        ['#nav a[href=\'https://bitbucket.org/davidchambers\'] > span'],
        [
          Symbol.for('background-image'),
          'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAAKCAYAAACOjFT5AAABvklEQVRo3u2awZaAIAhF+6e+1q91VnNOZyaDBw/UYuHCLELFK4LHeZ79Wnrvx7XcPdc+YxWGbERGa6231vqoPruspk+Grr9ydul3lf3XRaa9/QOUBlgF4gJxpq4F4CpvX2ciiEd16bkE6qd3tO9qvpXarCC+emijNgTqT/LQ/2plMPW7a4vo00gO2id0s/XqaLUX60lB+z+pbpGLjqU0HtZ+oXartd2I09kRFZpg1DVtKORR436aJKn+d3FpQYGA1CKDrZ8WkN5NDwESc8y942G1F6vHxtRHei9yPLPG/a4/HltM8YizQDySLW0WyIZihUNkHYGOF8RRIJkJYqtcj47e+fWCyePxWk5F6ImEMVcZ446sMzaMtwKxBNkn0O4AYu3krgZiBApfBrF1PtDQxEwQWzz5aBCzTmspoYnVQDxqQ/RBwxcreMSjY9LqIGZ5HZkgjpKNzq83OTwLxFYbnuERa8fdcgJghCzoMWKt54p4tp5EXwSImckQNNHBTPix++sFXSYstZtedrLOEiP2JlctAGImnK3/ZyfrPKEJN4jrmkqVr19Pqut177gWtvM8lGFUKSB8GABvAfHuc/ADvtWjgc0r3tgAAAAASUVORK5CYII=\')'
        ],
        ['#nav a[href=\'/contact/\'] > span'],
        [
          Symbol.for('background-image'),
          'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAAKCAYAAACOjFT5AAACHUlEQVRo3u1aS67DIAy0n3qjciYOlTPlTtNNIyFkYhtISvs8qzYE8AeGwQo/n08iIlCBfd+ZJiGlBM+Y27Zp7SAiyjmfjpdzLsc6/JvhlzbWzLkCc/AtObvazrv9NM2Xc/73C/QhBAuxb4cQBByItRVwEzGdqeFD0UrtpdqVlG/ZN6WEo+1szFL1Ficm18+3bYOmih0ntXRyQ9gAqNq5NbZgMxsVAk42H5SNic5+PTFptbGihrT3RubV+kKJGTriRoqA4Y7coiNHVjXt9XM0P3FTNODPWlZokegZyZYEW/9ujVmWHmqiLf8PkLCXqLmxwNT5qzILDLeO1rxUPW8dDFJf6TkmxeSu2xMb5m3FV8sZGwioN2+e8Vxry+j7bD971qzVvlDEo/DWlCUyP6kfffIExcgJXtWpuZOALKrLajMUQkLV/4rY1/NY5kVHrFbGbHW4ku/85blZTxFfAUllLwh2ksDdm5c7bIaiWj7t14ji+ibgh3wJXEXEHrV6B+p6sdQuvaP1u1plaF9/TCIpj82Ww4Vn3AQcdkK4Ev86Qa14yN95sNbvRqniTcTlJoBU100pwfsZmlbGKMeUShEHwfaWJt790LgGsrAQuLFAeucfJSgYbCaDzXU/jezYaJs3pjNI+85N6/HHYqM3D6v46W0Ppd+ThPd3xCVRfloBR1bWUDOxocbjGDG8TrT8FB6xDALOEkfAdiWPGAbMeAE9OSswkuIpmQAAAABJRU5ErkJggg==\')'
        ],
        ['#nav a[href=\'/flushcache/\'] > span'],
        [
          Symbol.for('background-image'),
          'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAAKCAYAAACOjFT5AAAAu0lEQVRo3u3a0QrCMAwF0PxT///b4rOyma7tsOp5OKAUQh3hNnRGay1PxMvnGavqfHwPmQmwVBVQglgQA5sFcfU9DqbqGJiy86ROtfZuvWcPVW1NA9waxDkQvD3BHBevPI5qxsRB0buHrt+iaYDdJ+Jqio2BIK6m1tG6Q1O7pgF+4WpiJohX1u09RAQx8HVBfEdgzkzos4fK07qmAXb410Tvi7TRq4m4+DJu5R7KupoGWB7EHgKAIAb4aw9tcYNEXXm9DwAAAABJRU5ErkJggg==\')'
        ],
        ['#nav a[href=\'/tags/\'] > span'],
        [
          Symbol.for('background-image'),
          'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAAKCAYAAACOjFT5AAAB/klEQVRo3u1aWxKFIAiVO+1I19SiWpN74n410zipPLOH/JUWcIATVBBjxHAiOWcIA2Tbtt2eXX953BPu/vI66rUtPbU1rg5LwUF6a36PtOeJGN4dB0tsPHC+xT3XdT09v5SFMYqAX1ZgMIt4ktfHBKbPcll6G1JK2OqUy/Vy33HdkOSRAQh2AMQKaWg689q1lG4ZCF1HIHQk5TF0fAUjfDnYBqbuls3UeFP8a3XwPZtBgRMQ84waHy0WZ3jXcODkq6S2NHmhzTdqzXFrh07ER/JMKWFKCUuSpR4rybZFOEhwuLYfgn/XZqFD6nctAWs4c/WUSUjBFojjLRIKixtvZK5zbdbE7kh2Usw5WFDvhYJcbjUj2u6TmxfafKPWgthndkcskSN5C4DHj4y9UCEy7zEKlPiiEx4t3VfEG5l60MAu7ncQj+nSawSHh9g55NXFj0LCOWeQdLVlN+1UKPPdoy8RUYkaXhJbUBQ/XhQXK8y94ndnn28pP28FZwS+v+K4uGCe0hVbdVfhwfiOji047//qg/3LPmMLg6VHoi3S7K07faiDE6eACQo46rHyj2uPlb2c+0AvwS6KLSfePR0eeWXplwRzDhbBKZaaXPWyk2qH1E5yjCHG6DVCiKT2n91ImwY9QWeX9f54Tyw+hl/rP2LrkWMG/frReMqUKQ+WP8nkIlo7OqsfAAAAAElFTkSuQmCC\')'
        ],
        ['#nav a[href=\'/twitter/\'] > span'],
        [
          Symbol.for('background-image'),
          'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAAKCAYAAACOjFT5AAAByklEQVRo3u1a7a2DMAzMVWzETgzFTOzk/o14IdjGdsxrLFVqUxLOd/4IEVjXlUrbUORGjbncMbUdx/FnbN/3IVgYfESbFsPdvAy+ZbXJXQ7Oh+iwbZt4zlKBsAA1A+t3bGo9uZs6GNki7DLa3+fv9Rg611x1N3qwwzvfFx2ceMgHp/tqfSajoOKsw9ltXGHljN/FjkfiWMRaFHdv4UCby5wc4qxXOlg1OnBwmOjyCew4qD534uCmeFtgaQnXwmAV8L3mJPWZO0/yOAchdm5yW+iGh2sUJX+UhLu3cSBZu/5fmydgNEOpDlwcJs3xwyxevd1K9NmqdZGEMCE0fMDRZ8tzLi12DlaU9z2SSzB7cpedAzKKt6d5YnUEEa6BdEdMAZhoYEBC6CsN9pnKOwvctP9h+KHaMLwQ44IEciJEIi45BAAG8KENaOtEoBfFLjUeG8k5NrJxl4GDyKKI5LGq5ntJ5AQajmAAkZH31vpsxdV5HSTU20MTC/4iucvKQe+c1jKXM9SGKxwmtlTv4ELQ9SDojpKzMwkG6+sl4mr5sPDhKdZihB1Omnrhi+QWQVhHc2AVu3DKXTjo4vHmUqod8bRp06ZlN7PiW9sX2+LFydcChv0AAAAASUVORK5CYII=\')'
        ],
        ['#nav a[href=\'https://bitbucket.org/davidchambers\']'],
        [
          Symbol.for('background-image'),
          'url(../svg/bitbucket.svg)'
        ],
        ['#nav a[href=\'/about/\']'],
        [
          Symbol.for('background-image'),
          'url(../svg/about.svg)'
        ],
        ['#nav a[href=\'/archives/\']'],
        [
          Symbol.for('background-image'),
          'url(../svg/archives.svg)'
        ],
        ['#nav a[href=\'/contact/\']'],
        [
          Symbol.for('background-image'),
          'url(../svg/contact.svg)'
        ],
        ['#nav a[href=\'/flushcache/\']'],
        [
          Symbol.for('background-image'),
          'url(../svg/flushcache.svg)'
        ],
        ['#nav a[href=\'/tags/\']'],
        [
          Symbol.for('background-image'),
          'url(../svg/tags.svg)'
        ],
        ['#nav a[href=\'/twitter/\']'],
        [
          Symbol.for('background-image'),
          'url(../svg/twitter.svg)'
        ],
        ['#main'],
        [
          Symbol.for('margin'),
          [
            0,
            Symbol.for('auto')
          ],
          Symbol.for('width'),
          _$0025(65),
          Symbol.for('min-width'),
          px(615),
          Symbol.for('max-width'),
          em(60),
          Symbol.for('padding'),
          [
            px(159),
            0,
            em(10)
          ]
        ],
        ['#wrap + footer'],
        [
          Symbol.for('position'),
          Symbol.for('relative'),
          Symbol.for('margin'),
          [
            em(-5.25),
            Symbol.for('auto'),
            0
          ],
          Symbol.for('width'),
          _$0025(65),
          Symbol.for('min-width'),
          px(615),
          Symbol.for('max-width'),
          em(60),
          Symbol.for('border-top'),
          [
            px(1),
            Symbol.for('solid'),
            '#cccccc'
          ],
          Symbol.for('padding'),
          [
            em(0.5),
            0,
            em(1.25)
          ],
          Symbol.for('line-height'),
          1.75,
          Symbol.for('z-index'),
          20
        ],
        ['#wrap + footer > :first-child'],
        [
          Symbol.for('margin'),
          [
            px(-1),
            0,
            0
          ],
          Symbol.for('color'),
          base1
        ],
        ['::-moz-selection'],
        [
          Symbol.for('background'),
          pink,
          Symbol.for('color'),
          Symbol.for('white'),
          Symbol.for('text-shadow'),
          Symbol.for('none')
        ],
        ['::selection'],
        [
          Symbol.for('background'),
          pink,
          Symbol.for('color'),
          Symbol.for('white'),
          Symbol.for('text-shadow'),
          Symbol.for('none')
        ],
        ['a'],
        [
          Symbol.for('font-weight'),
          Symbol.for('bold'),
          Symbol.for('text-decoration'),
          Symbol.for('none'),
          Symbol.for('color'),
          blue
        ],
        ['a:focus'],
        [
          Symbol.for('color'),
          orange,
          Symbol.for('outline'),
          Symbol.for('none')
        ],
        ['a:hover'],
        [
          Symbol.for('color'),
          orange
        ],
        [
          'a code',
          'a var'
        ],
        [
          Symbol.for('color'),
          Symbol.for('inherit')
        ],
        ['aside'],
        [
          Symbol.for('margin'),
          [
            em(1.75),
            0,
            0
          ],
          Symbol.for('font-style'),
          Symbol.for('italic'),
          Symbol.for('color'),
          base1
        ],
        ['blockquote'],
        [
          Symbol.for('border-left'),
          [
            em(0.5),
            Symbol.for('solid'),
            base2
          ],
          Symbol.for('padding'),
          [
            0,
            em(2.25),
            0,
            em(1.75)
          ],
          Symbol.for('font-style'),
          Symbol.for('italic'),
          Symbol.for('color'),
          base1
        ],
        ['blockquote em'],
        [
          Symbol.for('font-style'),
          Symbol.for('normal')
        ],
        ['caption'],
        [
          Symbol.for('text-align'),
          Symbol.for('left'),
          Symbol.for('font-weight'),
          Symbol.for('normal')
        ],
        [
          'code',
          'var'
        ],
        [
          Symbol.for('border'),
          [
            px(1),
            Symbol.for('solid'),
            base2
          ],
          Symbol.for('background'),
          _recycled$002Dpaper,
          Symbol.for('padding'),
          [
            px(1),
            px(4)
          ],
          Symbol.for('font'),
          [
            Symbol.for('normal'),
            '120%/1',
            monospace([
              'Courier',
              'Courier New'
            ])
          ],
          Symbol.for('color'),
          base01
        ],
        ['pre code'],
        [
          Symbol.for('display'),
          Symbol.for('block'),
          Symbol.for('border'),
          Symbol.for('none'),
          Symbol.for('background'),
          Symbol.for('none'),
          Symbol.for('padding'),
          0,
          Symbol.for('font-size'),
          em(1),
          Symbol.for('line-height'),
          1.5,
          Symbol.for('color'),
          Symbol.for('inherit')
        ],
        ['del'],
        [
          Symbol.for('text-decoration'),
          Symbol.for('line-through')
        ],
        ['dl'],
        [
          Symbol.for('position'),
          Symbol.for('relative')
        ],
        ['dl dt'],
        [
          Symbol.for('clear'),
          Symbol.for('left'),
          Symbol.for('margin'),
          [
            em(1.75),
            0,
            0
          ],
          Symbol.for('padding'),
          [
            em(0.5),
            0
          ],
          Symbol.for('font-weight'),
          Symbol.for('bold')
        ],
        [
          'dl dt.textual',
          'dl dt.textual ~ dt'
        ],
        [
          Symbol.for('float'),
          Symbol.for('left'),
          Symbol.for('margin'),
          0,
          Symbol.for('padding'),
          [
            em(1.75),
            em(0.5),
            0,
            0
          ]
        ],
        [
          'dl dt.textual:after',
          'dl dt.textual ~ dt:after'
        ],
        [
          Symbol.for('content'),
          '\':\''
        ],
        ['dl dt.textual ~ dd'],
        [
          Symbol.for('font-style'),
          Symbol.for('normal'),
          Symbol.for('color'),
          Symbol.for('inherit'),
          Symbol.for('padding'),
          [
            em(1.75),
            0,
            0
          ]
        ],
        [
          'dl dt embed',
          'dl dt img',
          'dl dt object'
        ],
        [
          Symbol.for('display'),
          Symbol.for('block'),
          Symbol.for('margin'),
          [
            0,
            0,
            px(-1)
          ]
        ],
        [
          'dl dt embed',
          'dl dt img'
        ],
        [
          Symbol.for('border'),
          [
            px(1),
            Symbol.for('solid'),
            '#cccccc'
          ]
        ],
        ['dl dd'],
        [
          Symbol.for('font-style'),
          Symbol.for('italic'),
          Symbol.for('color'),
          base1
        ],
        ['em'],
        [
          Symbol.for('font-style'),
          Symbol.for('italic')
        ],
        [
          'h1',
          'h2',
          'h3',
          'h4'
        ],
        [
          Symbol.for('font'),
          [
            Symbol.for('bold'),
            '1.667em/1.05',
            _sans$002Dserif([
              'proxima-nova-1',
              'proxima-nova-2',
              'Helvetica',
              'Arial'
            ])
          ],
          Symbol.for('color'),
          base01,
          Symbol.for('text-shadow'),
          [
            0,
            px(1),
            0,
            Symbol.for('white')
          ]
        ],
        [
          'h2',
          'h3'
        ],
        [
          Symbol.for('margin'),
          [
            em(1.312),
            0,
            0
          ],
          Symbol.for('font-size'),
          em(1.334),
          Symbol.for('line-height'),
          1.312
        ],
        ['h4'],
        [
          Symbol.for('margin'),
          [
            em(1.5),
            0,
            0
          ],
          Symbol.for('font-size'),
          em(1.167),
          Symbol.for('line-height'),
          1.5
        ],
        ['.unidentified span'],
        [
          Symbol.for('float'),
          Symbol.for('left'),
          Symbol.for('margin'),
          [
            px(-159),
            0,
            0
          ]
        ],
        ['.unidentified a'],
        [
          Symbol.for('visibility'),
          Symbol.for('hidden')
        ],
        ['.unidentified:hover a'],
        [
          Symbol.for('visibility'),
          Symbol.for('visible')
        ],
        ['hr'],
        [
          Symbol.for('height'),
          0,
          Symbol.for('border'),
          Symbol.for('none'),
          Symbol.for('border-bottom'),
          [
            px(1),
            Symbol.for('solid'),
            '#999999'
          ]
        ],
        ['iframe.video'],
        [
          Symbol.for('display'),
          Symbol.for('block'),
          Symbol.for('margin'),
          [
            em(1.75),
            0,
            0
          ],
          Symbol.for('width'),
          _$0025(100),
          Symbol.for('height'),
          px(385)
        ],
        ['dt > iframe.video'],
        [
          Symbol.for('margin'),
          0
        ],
        ['img'],
        [
          Symbol.for('display'),
          Symbol.for('block'),
          Symbol.for('vertical-align'),
          Symbol.for('text-bottom')
        ],
        ['img[src*=\'/decorative/left/\']'],
        [
          Symbol.for('float'),
          Symbol.for('left'),
          Symbol.for('margin'),
          [
            0,
            em(1),
            0,
            0
          ],
          Symbol.for('border'),
          _$0021important(Symbol.for('none'))
        ],
        ['img[src*=\'/decorative/right/\']'],
        [
          Symbol.for('float'),
          Symbol.for('right'),
          Symbol.for('margin'),
          [
            0,
            0,
            0,
            em(1)
          ],
          Symbol.for('border'),
          _$0021important(Symbol.for('none'))
        ],
        [
          'img[src*=\'/elam/\']',
          'img[src*=\'/lightbox/\']'
        ],
        [
          Symbol.for('margin'),
          [
            em(1.75),
            0,
            px(-1)
          ],
          Symbol.for('border'),
          [
            px(1),
            Symbol.for('solid'),
            '#cccccc'
          ]
        ],
        ['img[src*=\'/lightbox/large/\']'],
        [
          Symbol.for('margin'),
          0
        ],
        ['img[src*=\'/windows/\']'],
        [
          Symbol.for('margin'),
          [
            px(3),
            px(-40),
            px(-29)
          ],
          Symbol.for('max-width'),
          _$0021important(Symbol.for('none')),
          Symbol.for('border'),
          _$0021important(Symbol.for('none'))
        ],
        ['img[src*=\'/windows/lion/\']'],
        [
          Symbol.for('margin'),
          [
            px(-6),
            px(-56),
            px(-52)
          ]
        ],
        ['dt > img[src*=\'/windows/\']'],
        [
          Symbol.for('margin'),
          [
            px(-24),
            px(-40),
            px(-35)
          ]
        ],
        ['dt > img[src*=\'/windows/lion/\']'],
        [
          Symbol.for('margin'),
          [
            px(-33),
            px(-56),
            px(-58)
          ]
        ],
        ['p > img[src*=\'/windows/\']'],
        [
          Symbol.for('margin'),
          [
            px(-18),
            px(-40),
            px(-29)
          ]
        ],
        ['p > img[src*=\'/windows/lion/\']'],
        [
          Symbol.for('margin'),
          [
            px(-27),
            px(-56),
            px(-52)
          ]
        ],
        ['p > img:only-child'],
        [
          Symbol.for('border'),
          [
            px(1),
            Symbol.for('solid'),
            '#cccccc'
          ]
        ],
        ['img.margin-top'],
        [
          Symbol.for('margin-top'),
          em(1.75)
        ],
        [
          'input[type=\'url\']',
          'input[type=\'text\']',
          'input[type=\'email\']',
          'input[type=\'search\']'
        ],
        [
          Symbol.for('-webkit-box-sizing'),
          Symbol.for('content-box'),
          Symbol.for('height'),
          px(15),
          Symbol.for('border'),
          [
            px(1),
            Symbol.for('solid'),
            '#cccccc'
          ],
          Symbol.for('background'),
          _recycled$002Dpaper,
          Symbol.for('padding'),
          [
            px(3),
            em(0.5)
          ],
          Symbol.for('font-size'),
          em(1)
        ],
        [
          'input[type=\'url\']:focus',
          'input[type=\'text\']:focus',
          'input[type=\'email\']:focus',
          'input[type=\'search\']:focus'
        ],
        [
          Symbol.for('border-color'),
          blue,
          Symbol.for('outline'),
          Symbol.for('none')
        ],
        ['input.placeholder'],
        [
          Symbol.for('color'),
          _$0021important(_mid$002Dgray)
        ],
        ['ins'],
        [
          Symbol.for('background-color'),
          Symbol.for('transparent'),
          Symbol.for('text-decoration'),
          Symbol.for('underline')
        ],
        ['label'],
        [
          Symbol.for('position'),
          Symbol.for('absolute'),
          Symbol.for('left'),
          [em(19.833)],
          Symbol.for('top'),
          0,
          Symbol.for('margin'),
          [
            px(1),
            0,
            0
          ],
          Symbol.for('color'),
          base1
        ],
        ['label.required:after'],
        [
          Symbol.for('content'),
          '\'*\'',
          Symbol.for('color'),
          '#999999'
        ],
        ['object.video'],
        [
          Symbol.for('width'),
          _$0025(100),
          Symbol.for('height'),
          px(385)
        ],
        ['ol'],
        [
          Symbol.for('margin'),
          [
            em(1.75),
            0,
            0
          ],
          Symbol.for('list-style'),
          [
            Symbol.for('decimal'),
            Symbol.for('outside')
          ]
        ],
        ['p'],
        [
          Symbol.for('margin'),
          [
            em(1.75),
            0,
            0
          ]
        ],
        ['p.caption'],
        [
          Symbol.for('margin'),
          [
            em(0.5),
            0,
            0
          ],
          Symbol.for('font-style'),
          Symbol.for('italic'),
          Symbol.for('color'),
          base1
        ],
        ['pre'],
        [
          Symbol.for('margin'),
          [
            em(1.286),
            0,
            em(-0.214)
          ],
          Symbol.for('border'),
          [
            px(1),
            Symbol.for('solid'),
            base2
          ],
          Symbol.for('background-color'),
          _recycled$002Dpaper,
          Symbol.for('padding'),
          [
            em(0.143),
            em(0.714)
          ],
          Symbol.for('font'),
          [
            '1.167em/1.5',
            monospace([
              'Courier',
              'Courier New'
            ])
          ],
          Symbol.for('overflow'),
          Symbol.for('auto')
        ],
        ['li pre'],
        [
          Symbol.for('margin'),
          [
            em(1.286),
            0
          ]
        ],
        ['select'],
        [
          Symbol.for('min-width'),
          px(150)
        ],
        ['strong'],
        [
          Symbol.for('font-weight'),
          Symbol.for('bold')
        ],
        ['textarea'],
        [
          Symbol.for('display'),
          Symbol.for('block'),
          Symbol.for('width'),
          _$0025(98),
          Symbol.for('height'),
          em(15),
          Symbol.for('border'),
          [
            px(1),
            Symbol.for('solid'),
            '#cccccc'
          ],
          Symbol.for('background'),
          _recycled$002Dpaper,
          Symbol.for('padding'),
          [
            em(0.333),
            em(0.5)
          ],
          Symbol.for('font'),
          [
            '1em/1.25',
            monospace(['Monaco'])
          ],
          Symbol.for('outline'),
          Symbol.for('none'),
          Symbol.for('overflow'),
          Symbol.for('auto')
        ],
        ['textarea:focus'],
        [
          Symbol.for('border-color'),
          blue
        ],
        ['time span'],
        [
          Symbol.for('display'),
          Symbol.for('block'),
          Symbol.for('color'),
          base1
        ],
        ['time span + span'],
        [
          Symbol.for('color'),
          Symbol.for('darkgrey')
        ],
        ['ul'],
        [
          Symbol.for('margin'),
          [
            em(1.75),
            0,
            0
          ],
          Symbol.for('list-style'),
          [
            Symbol.for('square'),
            Symbol.for('outside'),
            'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAGElEQVQI12OYOXPmf3QMBAwM9JAAEdgwAMpjZprFgxhUAAAAAElFTkSuQmCC\')'
          ]
        ],
        [
          'ul li.pro',
          'ul li.con'
        ],
        [
          Symbol.for('margin'),
          0,
          Symbol.for('margin-left'),
          px(-21),
          Symbol.for('background'),
          [
            Symbol.for('no-repeat'),
            0,
            em(0.25)
          ],
          Symbol.for('padding'),
          [
            0,
            0,
            0,
            px(21)
          ],
          Symbol.for('list-style'),
          Symbol.for('none')
        ],
        ['ul li.pro'],
        [
          Symbol.for('background-image'),
          'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAhElEQVQoz6XTsRWAIAwE0BvG2oadModrOIRLUDOHa5wN0UCeBrW4wkd+Iiggia8B5FXYPEMwNkXAdV8IAVN5gRWmAs4ZPN8gwhZqpq02sBgCDkM72e4pgnX9OkVbGEGLXWGfHrrJcx6HDa7fzTW4gw7rIWmDJ+iwBhLDfs/P//Bd/tyqAxpBveS1AanvAAAAAElFTkSuQmCC\')'
        ],
        ['ul li.con'],
        [
          Symbol.for('background-image'),
          'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAh0lEQVQoz6WTyxGAIAxEt3TaoCMr4EYLthAFlYn5rAcPwDCPXdhkQAWghpg9GJ+TiEywlzKgjL0dmr/ED+jn2i5oX7B4V9yBwMDx7ebLuSmoDTKhyxwZZEIrDg0yYSSmEWzr3M02IzNwfWaZW5SZVZUZ4KsdlVR93cyqqg1cn58DiTDl+POrDsbXTGSpOZ/pAAAAAElFTkSuQmCC\')'
        ],
        ['video'],
        [
          Symbol.for('border'),
          [
            px(1),
            Symbol.for('solid'),
            '#cccccc'
          ]
        ],
        ['article > header > dl'],
        [
          Symbol.for('margin'),
          [
            em(1.571),
            0,
            em(-0.071)
          ],
          Symbol.for('font'),
          [
            '1.167em/1.5',
            monospace([
              'Courier',
              'Courier New'
            ])
          ],
          Symbol.for('color'),
          base1,
          Symbol.for('overflow'),
          Symbol.for('auto')
        ],
        ['article > header > dl > dt'],
        [
          Symbol.for('float'),
          Symbol.for('left'),
          Symbol.for('margin'),
          0,
          Symbol.for('min-width'),
          em(7),
          Symbol.for('padding'),
          0,
          Symbol.for('font-weight'),
          Symbol.for('normal')
        ],
        ['article > header > dl > dt:after'],
        [
          Symbol.for('content'),
          '\':\''
        ],
        ['article > header > dl > dd'],
        [
          Symbol.for('font-style'),
          Symbol.for('normal')
        ],
        ['article > header > dl > dd > a'],
        [
          Symbol.for('font-weight'),
          Symbol.for('normal')
        ],
        ['#tags'],
        [
          Symbol.for('margin'),
          [
            em(1.75),
            0,
            0
          ],
          Symbol.for('list-style'),
          Symbol.for('none')
        ],
        ['#tags li'],
        [
          Symbol.for('position'),
          Symbol.for('relative'),
          Symbol.for('float'),
          Symbol.for('left'),
          Symbol.for('margin'),
          [
            0,
            px(1),
            0,
            0
          ],
          Symbol.for('width'),
          _$0025(24.5),
          Symbol.for('height'),
          em(3.5)
        ],
        ['#tags li:hover'],
        [
          Symbol.for('z-index'),
          100
        ],
        ['#tags li a'],
        [
          Symbol.for('position'),
          Symbol.for('absolute'),
          Symbol.for('left'),
          0,
          Symbol.for('top'),
          0,
          Symbol.for('display'),
          Symbol.for('block'),
          Symbol.for('width'),
          _$0025(100),
          Symbol.for('border'),
          [
            px(1),
            Symbol.for('solid'),
            '#cccccc'
          ],
          Symbol.for('padding'),
          [
            px(10),
            0
          ],
          Symbol.for('text-align'),
          Symbol.for('center'),
          Symbol.for('-moz-transition-property'),
          'top, left, -moz-box-shadow, padding, font-size, z-index',
          Symbol.for('-webkit-transition-property'),
          'top, left, -webkit-box-shadow, padding, font-size, z-index',
          Symbol.for('-o-transition-property'),
          'top, left, box-shadow, padding, font-size, z-index',
          Symbol.for('transition-property'),
          'top, left, box-shadow, padding, font-size, z-index',
          Symbol.for('-webkit-transition-property'),
          'top, left, box-shadow, padding, font-size, z-index',
          Symbol.for('-moz-transition-property'),
          'top, left, box-shadow, padding, font-size, z-index',
          Symbol.for('-o-transition-property'),
          'top, left, box-shadow, padding, font-size, z-index',
          Symbol.for('transition-property'),
          'top, left, box-shadow, padding, font-size, z-index',
          Symbol.for('transition-duration'),
          '0.2s, 0.2s, 0.2s, 0.2s, 0.167s, 0.2s',
          Symbol.for('transition-timing-function'),
          Symbol.for('ease'),
          Symbol.for('background'),
          _tag$002Dbackground(20),
          Symbol.for('color'),
          _tag$002Dcolor(20)
        ],
        [
          '#tags li a:focus',
          '#tags li a:hover',
          '#tags li a.hover'
        ],
        [
          Symbol.for('left'),
          px(-21),
          Symbol.for('top'),
          px(-6),
          Symbol.for('width'),
          _$0025(100),
          Symbol.for('padding'),
          [
            px(16),
            px(21)
          ],
          Symbol.for('box-shadow'),
          [
            0,
            px(1),
            px(3),
            rgba(0)(0)(0)(0.2)
          ],
          Symbol.for('font-size'),
          em(1.167),
          Symbol.for('z-index'),
          99
        ]
      ],
      s[Symbol.for('fold-map')](Array)(count => [
        ['#tags li[data-count=\'' + count + '\'] a'],
        [
          Symbol.for('background'),
          _tag$002Dbackground(count),
          Symbol.for('color'),
          _tag$002Dcolor(count)
        ]
      ])(s[Symbol.for('range')](1)(20)),
      [
        ['.hashify-editor'],
        [
          Symbol.for('margin-top'),
          px(2)
        ],
        ['div.syntaxhighlighter'],
        [
          Symbol.for('margin'),
          _$0021important([
            em(1.75),
            0,
            px(-1)
          ])
        ],
        ['div.syntaxhighlighter code'],
        [
          Symbol.for('border'),
          Symbol.for('none'),
          Symbol.for('background'),
          Symbol.for('none'),
          Symbol.for('padding'),
          0,
          Symbol.for('color'),
          Symbol.for('inherit')
        ],
        ['.clearfix'],
        [
          Symbol.for('clear'),
          Symbol.for('both')
        ],
        ['.filesize'],
        [
          Symbol.for('color'),
          base1
        ],
        ['.structural'],
        [
          Symbol.for('position'),
          _$0021important(Symbol.for('absolute')),
          Symbol.for('left'),
          _$0021important(px(-9999))
        ],
        ['ol li.interviewer'],
        [
          Symbol.for('list-style'),
          Symbol.for('none')
        ],
        ['ol li.interviewer ~ li'],
        [
          Symbol.for('list-style'),
          Symbol.for('none'),
          Symbol.for('margin-top'),
          em(1.75)
        ],
        [
          'ol li.interviewer:nth-child(1)',
          'ol li.interviewer ~ li:nth-child(odd)'
        ],
        [
          Symbol.for('color'),
          base1
        ],
        [
          '#comments',
          '#related',
          '#respond'
        ],
        [
          Symbol.for('margin'),
          [
            em(2.625),
            0,
            0
          ]
        ],
        [
          '.unidentified.comments',
          '.unidentified.related',
          '.unidentified.respond'
        ],
        [
          Symbol.for('margin'),
          [
            em(2.625),
            0,
            0
          ]
        ],
        [
          '#main h2.unidentified a',
          '#main h3.unidentified a'
        ],
        [
          Symbol.for('visibility'),
          Symbol.for('hidden')
        ],
        [
          '#main h2.unidentified:hover a',
          '#main h3.unidentified:hover a'
        ],
        [
          Symbol.for('visibility'),
          Symbol.for('visible'),
          Symbol.for('color'),
          '#cc0000'
        ],
        [
          '#main > article + article',
          '#main > h1 + article'
        ],
        [
          Symbol.for('margin'),
          [
            em(3.5),
            0,
            0
          ]
        ],
        ['#main > article + h2'],
        [
          Symbol.for('margin'),
          [
            em(2.625),
            0,
            0
          ]
        ],
        ['#main img'],
        [
          Symbol.for('max-width'),
          _$0025(100)
        ],
        ['#main article header'],
        [
          Symbol.for('line-height'),
          1
        ],
        [
          '#main article header h1',
          '#main article header h2'
        ],
        [
          Symbol.for('display'),
          Symbol.for('inline'),
          Symbol.for('margin'),
          [
            0,
            em(0.25),
            0,
            0
          ],
          Symbol.for('font'),
          [
            Symbol.for('bold'),
            '1.667em/1.05',
            _sans$002Dserif([
              'proxima-nova-1',
              'proxima-nova-2',
              'Helvetica',
              'Arial'
            ])
          ],
          Symbol.for('color'),
          base01,
          Symbol.for('text-shadow'),
          [
            0,
            px(1),
            0,
            Symbol.for('white')
          ]
        ],
        ['#main article header time'],
        [
          Symbol.for('display'),
          Symbol.for('inline'),
          Symbol.for('font'),
          [
            Symbol.for('bold'),
            '1.667em/1.05',
            _sans$002Dserif([
              'proxima-nova-1',
              'proxima-nova-2',
              'Helvetica',
              'Arial'
            ])
          ],
          Symbol.for('color'),
          base01,
          Symbol.for('text-shadow'),
          [
            0,
            px(1),
            0,
            Symbol.for('white')
          ],
          Symbol.for('font-weight'),
          Symbol.for('normal'),
          Symbol.for('color'),
          base1,
          Symbol.for('white-space'),
          Symbol.for('nowrap')
        ],
        ['.update'],
        [
          Symbol.for('margin'),
          [
            em(1.75),
            0,
            px(-1)
          ],
          Symbol.for('border-width'),
          [
            px(1),
            0
          ],
          Symbol.for('border-style'),
          Symbol.for('solid'),
          Symbol.for('border-color'),
          base1,
          Symbol.for('padding'),
          [
            em(1.667),
            0,
            em(1.75)
          ]
        ],
        ['.update + .update'],
        [
          Symbol.for('margin-top'),
          0
        ],
        ['.update h4:first-child'],
        [
          Symbol.for('margin'),
          0
        ],
        ['footer.metadata'],
        [
          Symbol.for('margin-left'),
          em(-1),
          Symbol.for('padding'),
          [
            em(1.75),
            0,
            0,
            em(1)
          ],
          Symbol.for('overflow'),
          Symbol.for('hidden')
        ],
        ['footer.metadata a'],
        [
          Symbol.for('float'),
          Symbol.for('left'),
          Symbol.for('margin'),
          [
            0,
            em(0.5),
            0,
            0
          ]
        ],
        ['footer.metadata ul'],
        [
          Symbol.for('list-style'),
          Symbol.for('none')
        ],
        ['footer.metadata ul a'],
        [
          Symbol.for('margin-left'),
          em(-0.833),
          Symbol.for('border-radius'),
          em(0.875),
          Symbol.for('background'),
          blue,
          Symbol.for('padding'),
          [
            0,
            em(0.667),
            0,
            em(0.833)
          ],
          Symbol.for('color'),
          Symbol.for('white')
        ],
        [
          'footer.metadata ul a:focus',
          'footer.metadata ul a:hover'
        ],
        [
          Symbol.for('background'),
          orange
        ],
        ['footer.metadata h4'],
        [
          Symbol.for('position'),
          Symbol.for('absolute'),
          Symbol.for('left'),
          px(-9999)
        ],
        ['footer.metadata ol'],
        [
          Symbol.for('margin'),
          0,
          Symbol.for('list-style'),
          Symbol.for('none')
        ],
        ['footer.metadata ol a'],
        [
          Symbol.for('background'),
          [
            'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAiklEQVQoz5WR4RGAIAhGWaEVXKEVWsFZmsVZWqFZWsGA0yKUFO4++9N7CEIIIe/bApisAqPwQYJ8HZ/MCLgj/cwCKofggam8ghcuAn39KsDvABY509oIYoztwrSAwJq/EaTJLdBzuAS9LU4LGrhsdbg8rG5nKFu1nw1BE7ZGkKA1c1cgQQ8MumPNDbT9z/qqMmCfAAAAAElFTkSuQmCC\')',
            Symbol.for('no-repeat'),
            0
          ],
          Symbol.for('padding'),
          [
            0,
            0,
            0,
            px(20)
          ]
        ],
        ['article article'],
        [
          Symbol.for('margin'),
          [
            0,
            0,
            0,
            px(-30)
          ],
          Symbol.for('border-bottom'),
          [
            px(1),
            Symbol.for('solid'),
            '#cccccc'
          ],
          Symbol.for('padding'),
          [
            em(0.417),
            0,
            em(1.25),
            px(30)
          ],
          Symbol.for('overflow'),
          Symbol.for('auto')
        ],
        ['article article > div'],
        [
          Symbol.for('float'),
          Symbol.for('left'),
          Symbol.for('width'),
          _$0025(65)
        ],
        ['article article > div > p:first-child'],
        [
          Symbol.for('margin'),
          0
        ],
        ['article article > div > blockquote:first-child > p:first-child'],
        [
          Symbol.for('margin'),
          _$0021important(0)
        ],
        ['article article footer'],
        [
          Symbol.for('position'),
          Symbol.for('relative'),
          Symbol.for('float'),
          Symbol.for('right'),
          Symbol.for('width'),
          _$0025(30),
          Symbol.for('padding'),
          0,
          Symbol.for('color'),
          Symbol.for('black')
        ],
        ['article article footer img'],
        [
          Symbol.for('position'),
          Symbol.for('absolute'),
          Symbol.for('left'),
          0,
          Symbol.for('top'),
          em(0.417),
          Symbol.for('display'),
          Symbol.for('block')
        ],
        [
          'article article footer strong',
          'article article footer time'
        ],
        [
          Symbol.for('display'),
          Symbol.for('block'),
          Symbol.for('margin'),
          [
            0,
            0,
            0,
            px(32)
          ],
          Symbol.for('padding'),
          [
            0,
            0,
            0,
            em(1)
          ]
        ],
        ['article h2 + article'],
        [
          Symbol.for('margin'),
          [
            em(1.25),
            0,
            0,
            px(-30)
          ],
          Symbol.for('border-top'),
          [
            px(1),
            Symbol.for('solid'),
            '#cccccc'
          ]
        ],
        ['form[action=\'comment/\'] fieldset'],
        [
          Symbol.for('margin'),
          [
            em(1),
            0,
            0
          ]
        ],
        ['fieldset#author-details'],
        [
          Symbol.for('margin'),
          [
            em(1.75),
            0,
            0
          ],
          Symbol.for('padding'),
          [
            0,
            0,
            em(0.083)
          ]
        ],
        ['fieldset#author-details + div + div'],
        [
          Symbol.for('height'),
          em(1.75)
        ],
        ['fieldset#author-details + div + div + div'],
        [
          Symbol.for('height'),
          em(3.5)
        ],
        ['fieldset#author-details ~ div:last-child'],
        [
          Symbol.for('padding'),
          [
            0,
            0,
            px(1)
          ]
        ],
        ['form div'],
        [
          Symbol.for('position'),
          Symbol.for('relative')
        ],
        ['form > fieldset'],
        [
          Symbol.for('margin'),
          [
            em(1.75),
            0,
            0
          ]
        ],
        ['form > fieldset > div'],
        [
          Symbol.for('height'),
          em(2.25)
        ],
        ['form > fieldset > div > label'],
        [
          Symbol.for('text-transform'),
          Symbol.for('lowercase')
        ],
        [
          'form > fieldset > div > input[type=\'url\']',
          'form > fieldset > div > input[type=\'text\']',
          'form > fieldset > div > input[type=\'email\']'
        ],
        [
          Symbol.for('position'),
          Symbol.for('absolute'),
          Symbol.for('left'),
          0,
          Symbol.for('top'),
          0,
          Symbol.for('margin'),
          [
            0,
            em(0.75),
            0,
            0
          ],
          Symbol.for('width'),
          em(18),
          Symbol.for('max-width'),
          px(300)
        ],
        ['form > fieldset + div > label'],
        [
          Symbol.for('position'),
          Symbol.for('absolute'),
          Symbol.for('left'),
          px(-9999)
        ],
        ['form > fieldset + div + div > label'],
        [
          Symbol.for('left'),
          em(1.75)
        ],
        ['form > fieldset + div + div > input[type=\'checkbox\']'],
        [
          Symbol.for('margin'),
          0
        ],
        ['input[type=\'submit\']'],
        [
          Symbol.for('margin'),
          [
            px(20),
            0,
            0
          ],
          Symbol.for('height'),
          px(30),
          Symbol.for('border-radius'),
          px(4),
          Symbol.for('border'),
          [
            px(1),
            Symbol.for('solid'),
            '#999999'
          ],
          Symbol.for('background'),
          '#dddddd',
          Symbol.for('background-image'),
          '-webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #eeeeee), color-stop(100%, #cccccc))',
          Symbol.for('background-image'),
          '-webkit-linear-gradient(#eeeeee, #cccccc)',
          Symbol.for('background-image'),
          '-moz-linear-gradient(#eeeeee, #cccccc)',
          Symbol.for('background-image'),
          '-o-linear-gradient(#eeeeee, #cccccc)',
          Symbol.for('background-image'),
          'linear-gradient(#eeeeee, #cccccc)',
          Symbol.for('padding'),
          [
            0,
            px(10)
          ],
          Symbol.for('font'),
          [
            '1.167em/30px',
            _sans$002Dserif([
              'proxima-nova-1',
              'proxima-nova-2',
              'Lucida Grande',
              'Lucida Sans Unicode'
            ])
          ],
          Symbol.for('text-shadow'),
          [
            0,
            px(1),
            0,
            Symbol.for('white')
          ]
        ],
        ['input[type=\'submit\']:focus'],
        [
          Symbol.for('border-color'),
          blue,
          Symbol.for('outline'),
          Symbol.for('none')
        ],
        ['input[type=\'submit\']:hover'],
        [
          Symbol.for('background'),
          '#cccccc',
          Symbol.for('background-image'),
          '-webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #dddddd), color-stop(100%, #bbbbbb))',
          Symbol.for('background-image'),
          '-webkit-linear-gradient(#dddddd, #bbbbbb)',
          Symbol.for('background-image'),
          '-moz-linear-gradient(#dddddd, #bbbbbb)',
          Symbol.for('background-image'),
          '-o-linear-gradient(#dddddd, #bbbbbb)',
          Symbol.for('background-image'),
          'linear-gradient(#dddddd, #bbbbbb)',
          Symbol.for('cursor'),
          Symbol.for('pointer')
        ],
        ['input[type=\'submit\']:active'],
        [
          Symbol.for('background-image'),
          '-webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #bbbbbb), color-stop(100%, #dddddd))',
          Symbol.for('background-image'),
          '-webkit-linear-gradient(#bbbbbb, #dddddd)',
          Symbol.for('background-image'),
          '-moz-linear-gradient(#bbbbbb, #dddddd)',
          Symbol.for('background-image'),
          '-o-linear-gradient(#bbbbbb, #dddddd)',
          Symbol.for('background-image'),
          'linear-gradient(#bbbbbb, #dddddd)'
        ],
        [
          'label[for=\'cc_sender\']',
          'label[for=\'subscribe\']'
        ],
        [
          Symbol.for('position'),
          Symbol.for('relative'),
          Symbol.for('top'),
          px(5),
          Symbol.for('margin'),
          0
        ],
        [
          '#cc_sender',
          '#subscribe'
        ],
        [
          Symbol.for('position'),
          Symbol.for('absolute'),
          Symbol.for('left'),
          0,
          Symbol.for('top'),
          px(10)
        ],
        ['ol.pages'],
        [
          Symbol.for('list-style'),
          Symbol.for('none')
        ],
        ['ol.posts'],
        [
          Symbol.for('list-style'),
          Symbol.for('none'),
          Symbol.for('color'),
          base1
        ],
        ['ol.archives'],
        [
          Symbol.for('margin'),
          0,
          Symbol.for('margin-left'),
          px(-21),
          Symbol.for('list-style'),
          Symbol.for('none')
        ],
        ['ol.archives li h2'],
        [
          Symbol.for('margin'),
          [
            em(1.75),
            0,
            0,
            px(21)
          ],
          Symbol.for('padding'),
          0,
          Symbol.for('font'),
          [
            Symbol.for('bold'),
            '1em/1.75',
            _sans$002Dserif([
              'Lucida Grande',
              'Lucida Sans Unicode',
              'Helvetica',
              'Arial'
            ])
          ],
          Symbol.for('color'),
          base1
        ],
        ['ol.archives li ol'],
        [
          Symbol.for('margin'),
          0,
          Symbol.for('list-style'),
          Symbol.for('none')
        ],
        ['ol.archives time'],
        [
          Symbol.for('position'),
          Symbol.for('relative'),
          Symbol.for('display'),
          Symbol.for('block'),
          Symbol.for('float'),
          Symbol.for('left'),
          Symbol.for('margin'),
          [
            em(0.167),
            em(0.5),
            0,
            0
          ],
          Symbol.for('width'),
          px(16),
          Symbol.for('height'),
          px(16),
          Symbol.for('background-image'),
          'url(../svg/archives.svg)',
          Symbol.for('background-repeat'),
          Symbol.for('no-repeat'),
          Symbol.for('line-height'),
          10,
          Symbol.for('overflow'),
          Symbol.for('hidden')
        ],
        [
          'ol.archives time:before',
          'ol.archives time:after'
        ],
        [
          Symbol.for('position'),
          Symbol.for('absolute'),
          Symbol.for('top'),
          0,
          Symbol.for('left'),
          0,
          Symbol.for('right'),
          0,
          Symbol.for('bottom'),
          0,
          Symbol.for('display'),
          Symbol.for('block'),
          Symbol.for('background-position-y'),
          px(6),
          Symbol.for('content'),
          '\'\''
        ],
        [
          'ol.archives time[datetime*=\'10T\']:before',
          'ol.archives time[datetime*=\'11T\']:before',
          'ol.archives time[datetime*=\'12T\']:before',
          'ol.archives time[datetime*=\'13T\']:before',
          'ol.archives time[datetime*=\'14T\']:before',
          'ol.archives time[datetime*=\'15T\']:before',
          'ol.archives time[datetime*=\'16T\']:before',
          'ol.archives time[datetime*=\'17T\']:before',
          'ol.archives time[datetime*=\'18T\']:before',
          'ol.archives time[datetime*=\'19T\']:before'
        ],
        [
          Symbol.for('background-image'),
          'url(../svg/dates-1.svg)'
        ],
        [
          'ol.archives time[datetime*=\'20T\']:before',
          'ol.archives time[datetime*=\'21T\']:before',
          'ol.archives time[datetime*=\'22T\']:before',
          'ol.archives time[datetime*=\'23T\']:before',
          'ol.archives time[datetime*=\'24T\']:before',
          'ol.archives time[datetime*=\'25T\']:before',
          'ol.archives time[datetime*=\'26T\']:before',
          'ol.archives time[datetime*=\'27T\']:before',
          'ol.archives time[datetime*=\'28T\']:before',
          'ol.archives time[datetime*=\'29T\']:before'
        ],
        [
          Symbol.for('background-image'),
          'url(../svg/dates-2.svg)'
        ],
        [
          'ol.archives time[datetime*=\'30T\']:before',
          'ol.archives time[datetime*=\'31T\']:before'
        ],
        [
          Symbol.for('background-image'),
          'url(../svg/dates-3.svg)'
        ],
        ['ol.archives time[datetime*=\'0T\']:after'],
        [
          Symbol.for('background-image'),
          'url(../svg/dates-0.svg)'
        ],
        ['ol.archives time[datetime*=\'1T\']:after'],
        [
          Symbol.for('background-image'),
          'url(../svg/dates-1.svg)'
        ],
        ['ol.archives time[datetime*=\'2T\']:after'],
        [
          Symbol.for('background-image'),
          'url(../svg/dates-2.svg)'
        ],
        ['ol.archives time[datetime*=\'3T\']:after'],
        [
          Symbol.for('background-image'),
          'url(../svg/dates-3.svg)'
        ],
        ['ol.archives time[datetime*=\'4T\']:after'],
        [
          Symbol.for('background-image'),
          'url(../svg/dates-4.svg)'
        ],
        ['ol.archives time[datetime*=\'5T\']:after'],
        [
          Symbol.for('background-image'),
          'url(../svg/dates-5.svg)'
        ],
        ['ol.archives time[datetime*=\'6T\']:after'],
        [
          Symbol.for('background-image'),
          'url(../svg/dates-6.svg)'
        ],
        ['ol.archives time[datetime*=\'7T\']:after'],
        [
          Symbol.for('background-image'),
          'url(../svg/dates-7.svg)'
        ],
        ['ol.archives time[datetime*=\'8T\']:after'],
        [
          Symbol.for('background-image'),
          'url(../svg/dates-8.svg)'
        ],
        ['ol.archives time[datetime*=\'9T\']:after'],
        [
          Symbol.for('background-image'),
          'url(../svg/dates-9.svg)'
        ],
        ['ol.archives time[datetime*=\'01T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(7)
        ],
        ['ol.archives time[datetime*=\'02T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(6)
        ],
        ['ol.archives time[datetime*=\'03T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(6)
        ],
        ['ol.archives time[datetime*=\'04T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(6)
        ],
        ['ol.archives time[datetime*=\'05T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(6)
        ],
        ['ol.archives time[datetime*=\'06T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(6)
        ],
        ['ol.archives time[datetime*=\'07T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(6)
        ],
        ['ol.archives time[datetime*=\'08T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(6)
        ],
        ['ol.archives time[datetime*=\'09T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(6)
        ],
        ['ol.archives time[datetime*=\'10T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(8)
        ],
        ['ol.archives time[datetime*=\'11T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(9)
        ],
        ['ol.archives time[datetime*=\'12T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(8)
        ],
        ['ol.archives time[datetime*=\'13T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(8)
        ],
        ['ol.archives time[datetime*=\'14T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(8)
        ],
        ['ol.archives time[datetime*=\'15T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(8)
        ],
        ['ol.archives time[datetime*=\'16T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(8)
        ],
        ['ol.archives time[datetime*=\'17T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(8)
        ],
        ['ol.archives time[datetime*=\'18T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(8)
        ],
        ['ol.archives time[datetime*=\'19T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(8)
        ],
        ['ol.archives time[datetime*=\'20T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(9)
        ],
        ['ol.archives time[datetime*=\'21T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(10)
        ],
        ['ol.archives time[datetime*=\'22T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(9)
        ],
        ['ol.archives time[datetime*=\'23T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(9)
        ],
        ['ol.archives time[datetime*=\'24T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(9)
        ],
        ['ol.archives time[datetime*=\'25T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(9)
        ],
        ['ol.archives time[datetime*=\'26T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(9)
        ],
        ['ol.archives time[datetime*=\'27T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(9)
        ],
        ['ol.archives time[datetime*=\'28T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(9)
        ],
        ['ol.archives time[datetime*=\'29T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(9)
        ],
        ['ol.archives time[datetime*=\'30T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(9)
        ],
        ['ol.archives time[datetime*=\'31T\']:after'],
        [
          Symbol.for('background-position-x'),
          px(10)
        ],
        ['#cricket-field-diagrams dl'],
        [
          Symbol.for('margin'),
          [
            em(2.25),
            0,
            0
          ],
          Symbol.for('height'),
          px(367)
        ],
        ['#cricket-field-diagrams dl dt'],
        [
          Symbol.for('position'),
          Symbol.for('absolute'),
          Symbol.for('left'),
          px(0),
          Symbol.for('top'),
          0,
          Symbol.for('margin'),
          0,
          Symbol.for('width'),
          px(148),
          Symbol.for('height'),
          px(148),
          Symbol.for('border'),
          [
            px(1),
            Symbol.for('solid'),
            '#cccccc'
          ],
          Symbol.for('background-color'),
          Symbol.for('white'),
          Symbol.for('padding'),
          0
        ],
        ['#cricket-field-diagrams dl dt ~ dt'],
        [
          Symbol.for('left'),
          px(170)
        ],
        ['#cricket-field-diagrams dl dt ~ dt ~ dt'],
        [
          Symbol.for('left'),
          px(340)
        ],
        ['#cricket-field-diagrams dl dt ~ dt ~ dt ~ dt'],
        [
          Symbol.for('left'),
          px(0),
          Symbol.for('top'),
          px(191)
        ],
        ['#cricket-field-diagrams dl dt ~ dt ~ dt ~ dt ~ dt'],
        [
          Symbol.for('left'),
          px(170)
        ],
        ['#cricket-field-diagrams dl dt ~ dt ~ dt ~ dt ~ dt ~ dt'],
        [
          Symbol.for('left'),
          px(340)
        ],
        ['#cricket-field-diagrams dl dt ~ dd'],
        [
          Symbol.for('position'),
          Symbol.for('absolute'),
          Symbol.for('left'),
          px(0),
          Symbol.for('top'),
          px(155),
          Symbol.for('width'),
          px(150),
          Symbol.for('text-align'),
          Symbol.for('center')
        ],
        ['#cricket-field-diagrams dl dt ~ dd ~ dd'],
        [
          Symbol.for('left'),
          px(170)
        ],
        ['#cricket-field-diagrams dl dt ~ dd ~ dd ~ dd'],
        [
          Symbol.for('left'),
          px(340)
        ],
        ['#cricket-field-diagrams dl dt ~ dd ~ dd ~ dd ~ dd'],
        [
          Symbol.for('left'),
          px(0),
          Symbol.for('top'),
          px(346)
        ],
        ['#cricket-field-diagrams dl dt ~ dd ~ dd ~ dd ~ dd ~ dd'],
        [
          Symbol.for('left'),
          px(170)
        ],
        ['#cricket-field-diagrams dl dt ~ dd ~ dd ~ dd ~ dd ~ dd ~ dd'],
        [
          Symbol.for('left'),
          px(340)
        ],
        ['#cricket-field-diagrams dl dt img'],
        [
          Symbol.for('margin'),
          px(-1),
          Symbol.for('border'),
          Symbol.for('none')
        ],
        ['.codehilite .hll'],
        [
          Symbol.for('background-color'),
          base2
        ],
        ['.codehilite .c'],
        [
          Symbol.for('font-style'),
          Symbol.for('italic'),
          Symbol.for('color'),
          base1
        ],
        ['.codehilite .k'],
        [
          Symbol.for('font-weight'),
          Symbol.for('bold')
        ],
        ['.codehilite .o'],
        [
          Symbol.for('font-weight'),
          Symbol.for('bold')
        ],
        ['.codehilite .cm'],
        [
          Symbol.for('font-style'),
          Symbol.for('italic'),
          Symbol.for('color'),
          base1
        ],
        ['.codehilite .cp'],
        [
          Symbol.for('font-weight'),
          Symbol.for('bold'),
          Symbol.for('color'),
          base1
        ],
        ['.codehilite .c1'],
        [
          Symbol.for('font-style'),
          Symbol.for('italic'),
          Symbol.for('color'),
          base1
        ],
        ['.codehilite .cs'],
        [
          Symbol.for('font-style'),
          Symbol.for('italic'),
          Symbol.for('font-weight'),
          Symbol.for('bold'),
          Symbol.for('color'),
          base1
        ],
        ['.codehilite .ge'],
        [
          Symbol.for('font-style'),
          Symbol.for('italic')
        ],
        ['.codehilite .gr'],
        [
          Symbol.for('color'),
          red
        ],
        ['.codehilite .gh'],
        [
          Symbol.for('color'),
          base1
        ],
        ['.codehilite .go'],
        [
          Symbol.for('color'),
          base1
        ],
        ['.codehilite .gp'],
        [
          Symbol.for('color'),
          base1
        ],
        ['.codehilite .gs'],
        [
          Symbol.for('font-weight'),
          Symbol.for('bold')
        ],
        ['.codehilite .gu'],
        [
          Symbol.for('color'),
          base1
        ],
        ['.codehilite .gt'],
        [
          Symbol.for('color'),
          red
        ],
        ['.codehilite .kc'],
        [
          Symbol.for('font-weight'),
          Symbol.for('bold')
        ],
        ['.codehilite .kd'],
        [
          Symbol.for('font-weight'),
          Symbol.for('bold')
        ],
        ['.codehilite .kn'],
        [
          Symbol.for('font-weight'),
          Symbol.for('bold')
        ],
        ['.codehilite .kp'],
        [
          Symbol.for('font-weight'),
          Symbol.for('bold')
        ],
        ['.codehilite .kr'],
        [
          Symbol.for('font-weight'),
          Symbol.for('bold')
        ],
        ['.codehilite .kt'],
        [
          Symbol.for('font-weight'),
          Symbol.for('bold')
        ],
        ['.codehilite .m'],
        [
          Symbol.for('color'),
          cyan
        ],
        ['.codehilite .s'],
        [
          Symbol.for('color'),
          yellow
        ],
        ['.codehilite .na'],
        [
          Symbol.for('color'),
          cyan
        ],
        ['.codehilite .nc'],
        [
          Symbol.for('font-weight'),
          Symbol.for('bold')
        ],
        ['.codehilite .no'],
        [
          Symbol.for('color'),
          cyan
        ],
        ['.codehilite .ni'],
        [
          Symbol.for('color'),
          magenta
        ],
        ['.codehilite .ne'],
        [
          Symbol.for('font-weight'),
          Symbol.for('bold'),
          Symbol.for('color'),
          orange
        ],
        ['.codehilite .nf'],
        [
          Symbol.for('font-weight'),
          Symbol.for('bold'),
          Symbol.for('color'),
          orange
        ],
        ['.codehilite .nt'],
        [
          Symbol.for('color'),
          blue
        ],
        ['.codehilite .ow'],
        [
          Symbol.for('font-weight'),
          Symbol.for('bold')
        ],
        ['.codehilite .mf'],
        [
          Symbol.for('color'),
          cyan
        ],
        ['.codehilite .mh'],
        [
          Symbol.for('color'),
          cyan
        ],
        ['.codehilite .mi'],
        [
          Symbol.for('color'),
          cyan
        ],
        ['.codehilite .mo'],
        [
          Symbol.for('color'),
          cyan
        ],
        ['.codehilite .sb'],
        [
          Symbol.for('color'),
          yellow
        ],
        ['.codehilite .sc'],
        [
          Symbol.for('color'),
          yellow
        ],
        ['.codehilite .sd'],
        [
          Symbol.for('color'),
          yellow
        ],
        ['.codehilite .s2'],
        [
          Symbol.for('color'),
          yellow
        ],
        ['.codehilite .se'],
        [
          Symbol.for('color'),
          yellow
        ],
        ['.codehilite .sh'],
        [
          Symbol.for('color'),
          yellow
        ],
        ['.codehilite .si'],
        [
          Symbol.for('color'),
          yellow
        ],
        ['.codehilite .sx'],
        [
          Symbol.for('color'),
          yellow
        ],
        ['.codehilite .sr'],
        [
          Symbol.for('color'),
          red
        ],
        ['.codehilite .s1'],
        [
          Symbol.for('color'),
          yellow
        ],
        ['.codehilite .ss'],
        [
          Symbol.for('color'),
          yellow
        ],
        ['.codehilite .bp'],
        [
          Symbol.for('color'),
          base1
        ],
        ['.codehilite .vc'],
        [
          Symbol.for('color'),
          cyan
        ],
        ['.codehilite .vg'],
        [
          Symbol.for('color'),
          cyan
        ],
        ['.codehilite .vi'],
        [
          Symbol.for('color'),
          cyan
        ],
        ['.codehilite .il'],
        [
          Symbol.for('color'),
          cyan
        ]
      ]
    ]);
  })();
};
export default screen;
