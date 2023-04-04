import S from "sanctuary";
const {XOR, OR, subtract, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, empty, reduce, reduceRight, filter, reject, map, flip, of, chain, contains} = {
  XOR: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => rhs.has(x))]);
      default:
        return lhs ^ rhs;
    }
  })(),
  OR: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs, ...rhs]]);
      default:
        return lhs | rhs;
    }
  })(),
  subtract: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => !rhs.has(x))]);
      default:
        return lhs - rhs;
    }
  })(),
  apply: f => args => f.apply(null, args),
  construct: constructor => args => globalThis.Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => match$0027(type)(x => CasesNotExhaustive),
  ["match'"]: type => type[globalThis.Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  quot: lhs => rhs => rhs === 0 ? DivisionByZero : lhs / rhs | 0,
  rem: lhs => rhs => rhs === 0 ? DivisionByZero : lhs % rhs,
  div: lhs => rhs => rhs === 0 ? DivisionByZero : globalThis.Math.floor(lhs / rhs),
  mod: lhs => rhs => rhs === 0 ? DivisionByZero : (lhs % rhs + rhs) % rhs,
  equals: this$ => that => globalThis.Array.isArray(this$) ? globalThis.Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => globalThis.Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  empty: typeRep => (() => {
    switch (typeRep.name) {
      case "Array":
        return [];
      case "Object":
        return {};
      case "String":
        return "";
      case "Set":
      case "Map":
        return globalThis.Reflect.construct(typeRep, [[]]);
      default:
        return typeRep["fantasy-land/empty"]();
    }
  })(),
  reduce: f => y => x => x[globalThis.Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => globalThis.Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => filter(x => !f(x)),
  map: f => x => globalThis.Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  of: typeRep => (() => {
    switch (typeRep.name) {
      case "Array":
        return globalThis.Array.of;
      case "Function":
        return x => y => x;
      case "Set":
        return x => globalThis.Reflect.construct(typeRep, [[x]]);
      default:
        return typeRep["fantasy-land/of"];
    }
  })(),
  chain: f => x => globalThis.Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f),
  contains: this$ => these => reduce(x => that => x || equals(this$)(that))(false)(these)
};
const base03 = "#002b36";
const base02 = "#073642";
const base01 = "#586e75";
const base00 = "#657b83";
const base0 = "#839496";
const base1 = "#93a1a1";
const base2 = "#eee8d5";
const base3 = "#fdf6e3";
const yellow = "#b58900";
const orange = "#cb4b16";
const red = "#dc322f";
const magenta = "#d33682";
const violet = "#6c71c4";
const blue = "#268bd2";
const cyan = "#2aa198";
const green = "#859900";
const mid$002Dgray = "#a9a9a9";
const pink = "#ff5e99";
const recycled$002Dpaper = "#fef9ec";
const tag$002Dbackground = count => concat("#")((args => target => target.repeat.apply(target, args))([3])((args => target => target.padStart.apply(target, args))([2, "0"])((args => target => target.toString.apply(target, args))([16])(Math.floor(subtract(Math.log2(count) * 5)(247))))));
const tag$002Dcolor = count => (alpha => "rgba(0, 0, 0, " + alpha + ")")((args => target => target.replace.apply(target, args))([RegExp("[.]000$|0*$"), ""])((args => target => target.toFixed.apply(target, args))([3])(Math.log2(count) * 0.1 + 0.3)));
const screen = `html {
  height: 100%;
  background-color: ${base3};
}

html > body {
  font-size: 12px;
}

body {
  position: relative;
  min-width: 675px;
  height: 100%;
  background-color: ${base3};
  font-size: 75%;
  font-family: 'Lucida Grande', 'Lucida Sans Unicode', 'Helvetica', 'Arial', sans-serif;
  color: ${base00};
  cursor: default;
}

#skip {
  position: absolute;
  left: -9999px;
}

#wrap {
  position: relative;
  height: auto;
  min-height: 100%;
  font-size: 1em;
  line-height: 1.75;
  overflow: hidden;
}

#header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 160px;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAACgCAYAAADNVQbCAAAAUElEQVQoke3JsQ0CQRAEwd5+EPlniYE3J+E8NxhEgfROOcXn/awAFxd/xsxEILYsZ4jQCMZ2r98yE+leUiMSnUZ6xLPn8rYbOe6RB5EXC4AvwzcoH+3LgngAAAAASUVORK5CYII=') repeat-x;
  z-index: 10;
}

#header header {
  position: relative;
  margin: 0 auto;
  width: 65%;
  min-width: 615px;
  max-width: 60em;
  padding: 24px 30px 0;
}

#header header hr {
  margin: 6px auto 0 0;
  width: 354px;
  text-align: left;
}

#header header p {
  margin: 0;
  height: 21px;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAAQCAYAAAAswXUEAAAByElEQVR42u2aO3bDMAwEef8b6LRwkyIvzw7xWZASPcUUiWwaWgJLGPIwswEAAPtABAAAjBgAACMGAACMGAAAIwYAgF1GfF2X/TB+4f2fis61O2Mgbn3sd8wzW6TZrlpcvQ+nekg6Hoz4DEMbBxkxWmHEGPGf0//d5ni6hE9rev6erTlLGgu8LyKcPSTuWUyeeNSxWiDPFBpn8tKjhwX3p1IHXo08BZ/Z887czmgRvY+oJlbMa28z+/b9I7lIxRxmCdeVsCNYNJ5rFiyKFXFbwGDGAo2juqpzY4dWKiP2GNIoHgbZz8jmi/qQUuZBd3wf189+LVF0akPYMXs2u9IRW6EgLWBiirirhafWOFKMuwtQbcTVOuj+fNU+ZEcbWW1Wa6K4/q+nKET03KyJjLjasVZmOrbw1K7EreqAlBpbkwE8zYjtQCO2Kz8jzWhTuc9sA1XxP9drqoP6ardWLZDoukOYOCuMOBO3qvDUGn+rESv2/e4dcWZ8qa6JVZpkrk9j6RxNKI04MxhXPqxbPZpQPazLjhmUGnePJiIPalZpdScjzsxru2uyeqh0PazL6lb+RvG0n10BnPqTQvjinGET4KRCwoThkTnzAjIvgGm0M2OfAAAAAElFTkSuQmCC') no-repeat;
  line-height: 10;
  overflow: hidden;
}

#header header form {
  position: absolute;
  right: 27px;
  top: 24px;
  width: 27px;
}

#header header form div {
  position: relative;
}

#header header form div label {
  position: absolute;
  left: -9999px;
}

#header header form div input[type='search'] {
  position: absolute;
  right: 27px;
  top: 0;
  display: block;
  float: left;
  width: 12.5em;
  max-width: 200px;
  height: 16px;
  font-size: 1.083em;
}

#header header form div input[type='submit'] {
  position: absolute;
  right: 0;
  top: 0;
  display: block;
  margin: 0;
  width: 0;
  height: 0;
  border: none;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABtklEQVRIx7WUsWrCUBSGMzt1dHAWhG5eFQyEFJwsSBxcSlsqYhwcKnYolIB3qZRSXESKYye7+AgpqQUnX8FH8Bluzx+OEIpWb5oGPg9E7/mu/z2JoZQy/pPwI5/PRxGEJAJiwwR8T0R/G0fQKZVKn/V6/X0ymTyv12tJDMbj8RPdm+E7/CauoGOa5tcLXXRPEh5xT9wRPeJ2OBw+lsvlxVaiIxDYXaT5A9EnukSbaBI3qFLKQbFYRGRCRyARS6Q5duwSV0SDcIga10a1Wn3DGh1BgMw5lj43v+CmFcIiTK4Vz/N6WKMj2OBAOfMu7xzNbQJRnBI5rmK5XJ5jja5gwAfa5lgq3DxLZIg016zv+2e6ggCjyNk3OWuLd4ymJ0SKa6bVal3rRoRDnmEUeVpqnHmOd57isYQkbVnWq+4hh2OKOT/0DxzHuRRCfOiOafig4SHCnO87AzQvFAr+fD5XPAD6rwo8RJhzjCKmBQeKzBELdj4ajdT2MgxDJv6ym06n9mq1Uq7rKtRDknivYFpGsqMkcQX2LkloTkiwV5Kk4CjJXwUHJUkIfpUkJdgpSVrwU2LHFujwDcrfprHNIpr7AAAAAElFTkSuQmCC') no-repeat 100%;
  padding: 24px 0 0 27px;
  cursor: pointer;
}

#title {
  display: block;
  width: 354px;
  height: 24px;
  mask-image: url(/svg/masthead-mask.svg);
  background: url(/svg/masthead.svg) no-repeat;
  line-height: 10;
  overflow: hidden;
}

a#title:focus,
a#title:hover,
a#title.hover {
  background-color: #ccc;
}

#nav > ul {
  position: relative;
  margin: 12px 0 0;
}

#nav > ul > li {
  float: left;
  margin: 0 6px 0 0;
}

#nav a {
  display: block;
  width: 28px;
  height: 28px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -ms-border-radius: 4px;
  -o-border-radius: 4px;
  border-radius: 4px;
  border: 1px solid #999999;
  background: no-repeat 50%;
}

#nav a:focus {
  border-color: ${orange};
  background-color: #eecc66;
}

#nav a:focus > span {
  visibility: visible;
}

#nav a:hover,
#nav a.hover {
  border-color: ${orange};
  background-color: white;
}

#nav a:hover > span,
#nav a.hover > span {
  visibility: visible;
  z-index: 20;
}

#nav a > span {
  position: absolute;
  left: 0;
  top: 36px;
  display: block;
  width: 354px;
  height: 10px;
  background: ${base3};
  line-height: 10;
  overflow: hidden;
  visibility: hidden;
}

#nav a[href='/about/'] > span {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAAKCAYAAACOjFT5AAABNUlEQVRo3u2YQRKDIAxFSac38k4eyjN5p3TjwlIJITEC0/822qJJDBA+0LIs6YCPK6VvSv/fyaWPfd9/Hty2LX+29fftcU7IaDmp2WjxYYpnXdcEQC9eSAEAAPTlfVIRdFy5oCb4dE9CW96uVaxJ8B2tBKX4LfZrebCodqvt0vvaHLXEyo7x4el/dvQLAFMpYhKKp9SusdsyQTQFvVQkIuK/ypFkJ4+DlX4ttqVvjFjkSCh8pOgrTxEmxeLg7V8AQhXxP/CECmJDHBRo25qn8wJxtVOiRt8ofABUFDELCmoGeLA4IlTnE4o2Kr89YwdgqqMJGmyisGKbnjLVlm+PgX/38A/5rY01AIY6mpDO9djRPkLRuSM+CpzUXtuRsfX2XbM/+vgDIBEzxAAAAIxwNAEAAKATH+FfdBZqw1WQAAAAAElFTkSuQmCC');
}

#nav a[href='/archives/'] > span {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAAKCAYAAACOjFT5AAACHElEQVRo3u1aWa7DIAxkqnejcCYOxZlyJ7+fRkKIzQbCUixVagIEPHaHiQuu61JfI6WUuu8bqtK01slnpdqttepFI+8agTZkxkK9a6Pm3d23VnOTIJdWxM2fM7WGoTlrjJk+8f9GTNqC7DslEm1KcMeOHVuAiB8CIq01uUTpqtdYW4pgQ+rXv+dfW2vpu5PBUcrk7XLwlDTF2joqaE4/MNS4347APYqorhLl4W5Cqedw1136hkGZsZRRVrPjWuKDBNeY+kRgbml8lbBvrXrn5A46r/F1+3DLDSEyTZUgfLKVmEvMD8m6xBtq76ygS+dA4sfObVeJ75K1hZJYuq6SsSGCogLfVsI15wMJ110SRzSIbwxnyZpUB/9r/VmfiFOEG1PDpSWIEFnHCDWklmOqeQOjzv1TBFNS15OMxQ/gysUrh51046qNLzmfkf638mdqIiY/yDXqtadZaymkelMljEUNTBJAY9IggbpuMXZ3XGfBrmQe6VvWCP9nzjmWIkatI7Xk7daHY2qYUzN++ixMzGjQX6pmSgmIKsb+Iq41uCNThui5Ic26UebGkVqkVCE+NfH8eZc7qtbCjDHwSTVGyowaMQKBArM/55UWjLmJSRxUQTQcTPx2VODZqrSwAq6tchGVxMKJEV4kMmnuvJlzfQFwzhE/BDu6/LBBZWGqetVOR/J+GdflyWaUrXCO+HPCtLWdc9H74XriuaH9AyA2SpOz0ppaAAAAAElFTkSuQmCC');
}

#nav a[href='https://bitbucket.org/davidchambers'] > span {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAAKCAYAAACOjFT5AAABvklEQVRo3u2awZaAIAhF+6e+1q91VnNOZyaDBw/UYuHCLELFK4LHeZ79Wnrvx7XcPdc+YxWGbERGa6231vqoPruspk+Grr9ydul3lf3XRaa9/QOUBlgF4gJxpq4F4CpvX2ciiEd16bkE6qd3tO9qvpXarCC+emijNgTqT/LQ/2plMPW7a4vo00gO2id0s/XqaLUX60lB+z+pbpGLjqU0HtZ+oXartd2I09kRFZpg1DVtKORR436aJKn+d3FpQYGA1CKDrZ8WkN5NDwESc8y942G1F6vHxtRHei9yPLPG/a4/HltM8YizQDySLW0WyIZihUNkHYGOF8RRIJkJYqtcj47e+fWCyePxWk5F6ImEMVcZ446sMzaMtwKxBNkn0O4AYu3krgZiBApfBrF1PtDQxEwQWzz5aBCzTmspoYnVQDxqQ/RBwxcreMSjY9LqIGZ5HZkgjpKNzq83OTwLxFYbnuERa8fdcgJghCzoMWKt54p4tp5EXwSImckQNNHBTPix++sFXSYstZtedrLOEiP2JlctAGImnK3/ZyfrPKEJN4jrmkqVr19Pqut177gWtvM8lGFUKSB8GABvAfHuc/ADvtWjgc0r3tgAAAAASUVORK5CYII=');
}

#nav a[href='/contact/'] > span {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAAKCAYAAACOjFT5AAACHUlEQVRo3u1aS67DIAy0n3qjciYOlTPlTtNNIyFkYhtISvs8qzYE8AeGwQo/n08iIlCBfd+ZJiGlBM+Y27Zp7SAiyjmfjpdzLsc6/JvhlzbWzLkCc/AtObvazrv9NM2Xc/73C/QhBAuxb4cQBByItRVwEzGdqeFD0UrtpdqVlG/ZN6WEo+1szFL1Ficm18+3bYOmih0ntXRyQ9gAqNq5NbZgMxsVAk42H5SNic5+PTFptbGihrT3RubV+kKJGTriRoqA4Y7coiNHVjXt9XM0P3FTNODPWlZokegZyZYEW/9ujVmWHmqiLf8PkLCXqLmxwNT5qzILDLeO1rxUPW8dDFJf6TkmxeSu2xMb5m3FV8sZGwioN2+e8Vxry+j7bD971qzVvlDEo/DWlCUyP6kfffIExcgJXtWpuZOALKrLajMUQkLV/4rY1/NY5kVHrFbGbHW4ku/85blZTxFfAUllLwh2ksDdm5c7bIaiWj7t14ji+ibgh3wJXEXEHrV6B+p6sdQuvaP1u1plaF9/TCIpj82Ww4Vn3AQcdkK4Ev86Qa14yN95sNbvRqniTcTlJoBU100pwfsZmlbGKMeUShEHwfaWJt790LgGsrAQuLFAeucfJSgYbCaDzXU/jezYaJs3pjNI+85N6/HHYqM3D6v46W0Ppd+ThPd3xCVRfloBR1bWUDOxocbjGDG8TrT8FB6xDALOEkfAdiWPGAbMeAE9OSswkuIpmQAAAABJRU5ErkJggg==');
}

#nav a[href='/flushcache/'] > span {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAAKCAYAAACOjFT5AAAAu0lEQVRo3u3a0QrCMAwF0PxT///b4rOyma7tsOp5OKAUQh3hNnRGay1PxMvnGavqfHwPmQmwVBVQglgQA5sFcfU9DqbqGJiy86ROtfZuvWcPVW1NA9waxDkQvD3BHBevPI5qxsRB0buHrt+iaYDdJ+Jqio2BIK6m1tG6Q1O7pgF+4WpiJohX1u09RAQx8HVBfEdgzkzos4fK07qmAXb410Tvi7TRq4m4+DJu5R7KupoGWB7EHgKAIAb4aw9tcYNEXXm9DwAAAABJRU5ErkJggg==');
}

#nav a[href='/tags/'] > span {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAAKCAYAAACOjFT5AAAB/klEQVRo3u1aWxKFIAiVO+1I19SiWpN74n410zipPLOH/JUWcIATVBBjxHAiOWcIA2Tbtt2eXX953BPu/vI66rUtPbU1rg5LwUF6a36PtOeJGN4dB0tsPHC+xT3XdT09v5SFMYqAX1ZgMIt4ktfHBKbPcll6G1JK2OqUy/Vy33HdkOSRAQh2AMQKaWg689q1lG4ZCF1HIHQk5TF0fAUjfDnYBqbuls3UeFP8a3XwPZtBgRMQ84waHy0WZ3jXcODkq6S2NHmhzTdqzXFrh07ER/JMKWFKCUuSpR4rybZFOEhwuLYfgn/XZqFD6nctAWs4c/WUSUjBFojjLRIKixtvZK5zbdbE7kh2Usw5WFDvhYJcbjUj2u6TmxfafKPWgthndkcskSN5C4DHj4y9UCEy7zEKlPiiEx4t3VfEG5l60MAu7ncQj+nSawSHh9g55NXFj0LCOWeQdLVlN+1UKPPdoy8RUYkaXhJbUBQ/XhQXK8y94ndnn28pP28FZwS+v+K4uGCe0hVbdVfhwfiOji047//qg/3LPmMLg6VHoi3S7K07faiDE6eACQo46rHyj2uPlb2c+0AvwS6KLSfePR0eeWXplwRzDhbBKZaaXPWyk2qH1E5yjCHG6DVCiKT2n91ImwY9QWeX9f54Tyw+hl/rP2LrkWMG/frReMqUKQ+WP8nkIlo7OqsfAAAAAElFTkSuQmCC');
}

#nav a[href='/twitter/'] > span {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAAKCAYAAACOjFT5AAAByklEQVRo3u1a7a2DMAzMVWzETgzFTOzk/o14IdjGdsxrLFVqUxLOd/4IEVjXlUrbUORGjbncMbUdx/FnbN/3IVgYfESbFsPdvAy+ZbXJXQ7Oh+iwbZt4zlKBsAA1A+t3bGo9uZs6GNki7DLa3+fv9Rg611x1N3qwwzvfFx2ceMgHp/tqfSajoOKsw9ltXGHljN/FjkfiWMRaFHdv4UCby5wc4qxXOlg1OnBwmOjyCew4qD534uCmeFtgaQnXwmAV8L3mJPWZO0/yOAchdm5yW+iGh2sUJX+UhLu3cSBZu/5fmydgNEOpDlwcJs3xwyxevd1K9NmqdZGEMCE0fMDRZ8tzLi12DlaU9z2SSzB7cpedAzKKt6d5YnUEEa6BdEdMAZhoYEBC6CsN9pnKOwvctP9h+KHaMLwQ44IEciJEIi45BAAG8KENaOtEoBfFLjUeG8k5NrJxl4GDyKKI5LGq5ntJ5AQajmAAkZH31vpsxdV5HSTU20MTC/4iucvKQe+c1jKXM9SGKxwmtlTv4ELQ9SDojpKzMwkG6+sl4mr5sPDhKdZihB1Omnrhi+QWQVhHc2AVu3DKXTjo4vHmUqod8bRp06ZlN7PiW9sX2+LFydcChv0AAAAASUVORK5CYII=');
}

#nav a[href='https://bitbucket.org/davidchambers'] {
  background-image: url(../svg/bitbucket.svg);
}

#nav a[href='/about/'] {
  background-image: url(../svg/about.svg);
}

#nav a[href='/archives/'] {
  background-image: url(../svg/archives.svg);
}

#nav a[href='/contact/'] {
  background-image: url(../svg/contact.svg);
}

#nav a[href='/flushcache/'] {
  background-image: url(../svg/flushcache.svg);
}

#nav a[href='/tags/'] {
  background-image: url(../svg/tags.svg);
}

#nav a[href='/twitter/'] {
  background-image: url(../svg/twitter.svg);
}

#main {
  margin: 0 auto;
  width: 65%;
  min-width: 615px;
  max-width: 60em;
  padding: 159px 0 10em;
}

#wrap + footer {
  position: relative;
  margin: -5.25em auto 0;
  width: 65%;
  min-width: 615px;
  max-width: 60em;
  border-top: 1px solid #cccccc;
  padding: 0.5em 0 1.25em;
  line-height: 1.75;
  z-index: 20;
}

#wrap + footer > :first-child {
  margin: -1px 0 0;
  color: ${base1};
}

::-moz-selection {
  background: ${pink};
  color: white;
  text-shadow: none;
}

::selection {
  background: ${pink};
  color: white;
  text-shadow: none;
}

a {
  font-weight: bold;
  text-decoration: none;
  color: ${blue};
}

a:focus {
  color: ${orange};
  outline: none;
}

a:hover {
  color: ${orange};
}

a code,
a var {
  color: inherit;
}

aside {
  margin: 1.75em 0 0;
  font-style: italic;
  color: ${base1};
}

blockquote {
  border-left: 0.5em solid ${base2};
  padding: 0 2.25em 0 1.75em;
  font-style: italic;
  color: ${base1};
}

blockquote em {
  font-style: normal;
}

caption {
  text-align: left;
  font-weight: normal;
}

code,
var {
  border: 1px solid ${base2};
  background: ${recycled$002Dpaper};
  padding: 1px 4px;
  font: normal 120%/1 'Courier', 'Courier New', monospace;
  color: ${base01};
}

pre code {
  display: block;
  border: none;
  background: none;
  padding: 0;
  font-size: 1em;
  line-height: 1.5;
  color: inherit;
}

del {
  text-decoration: line-through;
}

dl {
  position: relative;
}

dl dt {
  clear: left;
  margin: 1.75em 0 0;
  padding: 0.5em 0;
  font-weight: bold;
}

dl dt.textual,
dl dt.textual ~ dt {
  float: left;
  margin: 0;
  padding: 1.75em 0.5em 0 0;
}

dl dt.textual:after,
dl dt.textual ~ dt:after {
  content: ':';
}

dl dt.textual ~ dd {
  font-style: normal;
  color: inherit;
  padding: 1.75em 0 0;
}

dl dt embed,
dl dt img,
dl dt object {
  display: block;
  margin: 0 0 -1px;
}

dl dt embed,
dl dt img {
  border: 1px solid #cccccc;
}

dl dd {
  font-style: italic;
  color: ${base1};
}

em {
  font-style: italic;
}

h1,
h2,
h3,
h4 {
  font: bold 1.667em/1.05 'proxima-nova-1', 'proxima-nova-2', 'Helvetica', 'Arial', sans-serif;
  color: ${base01};
  text-shadow: 0 1px 0 white;
}

h2,
h3 {
  margin: 1.312em 0 0;
  font-size: 1.334em;
  line-height: 1.312;
}

h4 {
  margin: 1.5em 0 0;
  font-size: 1.167em;
  line-height: 1.5;
}

.unidentified span {
  float: left;
  margin: -159px 0 0;
}

.unidentified a {
  visibility: hidden;
}

.unidentified:hover a {
  visibility: visible;
}

hr {
  height: 0;
  border: none;
  border-bottom: 1px solid #999999;
}

iframe.video {
  display: block;
  margin: 1.75em 0 0;
  width: 100%;
  height: 385px;
}

dt > iframe.video {
  margin: 0;
}

img {
  display: block;
  vertical-align: text-bottom;
}

img[src*='/decorative/left/'] {
  float: left;
  margin: 0 1em 0 0;
  border: none !important;
}

img[src*='/decorative/right/'] {
  float: right;
  margin: 0 0 0 1em;
  border: none !important;
}

img[src*='/elam/'],
img[src*='/lightbox/'] {
  margin: 1.75em 0 -1px;
  border: 1px solid #cccccc;
}

img[src*='/lightbox/large/'] {
  margin: 0;
}

img[src*='/windows/'] {
  margin: 3px -40px -29px;
  max-width: none !important;
  border: none !important;
}

img[src*='/windows/lion/'] {
  margin: -6px -56px -52px;
}

dt > img[src*='/windows/'] {
  margin: -24px -40px -35px;
}

dt > img[src*='/windows/lion/'] {
  margin: -33px -56px -58px;
}

p > img[src*='/windows/'] {
  margin: -18px -40px -29px;
}

p > img[src*='/windows/lion/'] {
  margin: -27px -56px -52px;
}

p > img:only-child {
  border: 1px solid #cccccc;
}

img.margin-top {
  margin-top: 1.75em;
}

input[type='url'],
input[type='text'],
input[type='email'],
input[type='search'] {
  -webkit-box-sizing: content-box;
  height: 15px;
  border: 1px solid #cccccc;
  background: ${recycled$002Dpaper};
  padding: 3px 0.5em;
  font-size: 1em;
}

input[type='url']:focus,
input[type='text']:focus,
input[type='email']:focus,
input[type='search']:focus {
  border-color: ${blue};
  outline: none;
}

input.placeholder {
  color: ${"#a9a9a9"} !important;
}

ins {
  background-color: transparent;
  text-decoration: underline;
}

label {
  position: absolute;
  left: 19.833em;
  top: 0;
  margin: 1px 0 0;
  color: ${base1};
}

label.required:after {
  content: '*';
  color: #999999;
}

object.video {
  width: 100%;
  height: 385px;
}

ol {
  margin: 1.75em 0 0;
  list-style: decimal outside;
}

p {
  margin: 1.75em 0 0;
}

p.caption {
  margin: 0.5em 0 0;
  font-style: italic;
  color: ${base1};
}

pre {
  margin: 1.286em 0 -0.214em;
  border: 1px solid ${base2};
  background-color: ${recycled$002Dpaper};
  padding: 0.143em 0.714em;
  font: 1.167em/1.5 'Courier', 'Courier New', monospace;
  overflow: auto;
}

li pre {
  margin: 1.286em 0;
}

select {
  min-width: 150px;
}

strong {
  font-weight: bold;
}

textarea {
  display: block;
  width: 98%;
  height: 15em;
  border: 1px solid #cccccc;
  background: ${recycled$002Dpaper};
  padding: 0.333em 0.5em;
  font: 1em/1.25 'Monaco', monospace;
  outline: none;
  overflow: auto;
}

textarea:focus {
  border-color: ${blue};
}

time span {
  display: block;
  color: ${base1};
}

time span + span {
  color: darkgrey;
}

ul {
  margin: 1.75em 0 0;
  list-style: square outside url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAGElEQVQI12OYOXPmf3QMBAwM9JAAEdgwAMpjZprFgxhUAAAAAElFTkSuQmCC');
}

ul li.pro,
ul li.con {
  margin: 0;
  margin-left: -21px;
  background: no-repeat 0 0.25em;
  padding: 0 0 0 21px;
  list-style: none;
}

ul li.pro {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAhElEQVQoz6XTsRWAIAwE0BvG2oadModrOIRLUDOHa5wN0UCeBrW4wkd+Iiggia8B5FXYPEMwNkXAdV8IAVN5gRWmAs4ZPN8gwhZqpq02sBgCDkM72e4pgnX9OkVbGEGLXWGfHrrJcx6HDa7fzTW4gw7rIWmDJ+iwBhLDfs/P//Bd/tyqAxpBveS1AanvAAAAAElFTkSuQmCC');
}

ul li.con {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAh0lEQVQoz6WTyxGAIAxEt3TaoCMr4EYLthAFlYn5rAcPwDCPXdhkQAWghpg9GJ+TiEywlzKgjL0dmr/ED+jn2i5oX7B4V9yBwMDx7ebLuSmoDTKhyxwZZEIrDg0yYSSmEWzr3M02IzNwfWaZW5SZVZUZ4KsdlVR93cyqqg1cn58DiTDl+POrDsbXTGSpOZ/pAAAAAElFTkSuQmCC');
}

video {
  border: 1px solid #cccccc;
}

article > header > dl {
  margin: 1.571em 0 -0.071em;
  font: 1.167em/1.5 'Courier', 'Courier New', monospace;
  color: ${base1};
  overflow: auto;
}

article > header > dl > dt {
  float: left;
  margin: 0;
  min-width: 7em;
  padding: 0;
  font-weight: normal;
}

article > header > dl > dt:after {
  content: ':';
}

article > header > dl > dd {
  font-style: normal;
}

article > header > dl > dd > a {
  font-weight: normal;
}

#tags {
  margin: 1.75em 0 0;
  list-style: none;
}

#tags li {
  position: relative;
  float: left;
  margin: 0 1px 0 0;
  width: 24.5%;
  height: 3.5em;
}

#tags li:hover {
  z-index: 100;
}

#tags li a {
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  width: 100%;
  border: 1px solid #cccccc;
  padding: 10px 0;
  text-align: center;
  -moz-transition-property: top, left, -moz-box-shadow, padding, font-size, z-index;
  -webkit-transition-property: top, left, -webkit-box-shadow, padding, font-size, z-index;
  -o-transition-property: top, left, box-shadow, padding, font-size, z-index;
  transition-property: top, left, box-shadow, padding, font-size, z-index;
  -webkit-transition-property: top, left, box-shadow, padding, font-size, z-index;
  -moz-transition-property: top, left, box-shadow, padding, font-size, z-index;
  -o-transition-property: top, left, box-shadow, padding, font-size, z-index;
  transition-property: top, left, box-shadow, padding, font-size, z-index;
  -webkit-transition-duration: 0.2s, 0.2s, 0.2s, 0.2s, 0.167s, 0.2s;
  -moz-transition-duration: 0.2s, 0.2s, 0.2s, 0.2s, 0.167s, 0.2s;
  -o-transition-duration: 0.2s, 0.2s, 0.2s, 0.2s, 0.167s, 0.2s;
  transition-duration: 0.2s, 0.2s, 0.2s, 0.2s, 0.167s, 0.2s;
  -webkit-transition-timing-function: ease;
  -moz-transition-timing-function: ease;
  -o-transition-timing-function: ease;
  transition-timing-function: ease;
  background: ${tag$002Dbackground(20)};
  color: ${tag$002Dcolor(20)};
}

#tags li a:focus,
#tags li a:hover,
#tags li a.hover {
  left: -21px;
  top: -6px;
  width: 100%;
  padding: 16px 21px;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  font-size: 1.167em;
  z-index: 99;
}

${(args => target => target.trimEnd.apply(target, args))([])((args => target => target.join.apply(target, args))(["\n"])(map(count => `#tags li[data-count='${count}'] a {
  background: ${tag$002Dbackground(count)};
  color: ${tag$002Dcolor(count)};
}
`)(S.range(1)(20))))}

.hashify-editor {
  margin-top: 2px;
}

div.syntaxhighlighter {
  margin: 1.75em 0 -1px !important;
}

div.syntaxhighlighter code {
  border: none;
  background: none;
  padding: 0;
  color: inherit;
}

.clearfix {
  clear: both;
}

.filesize {
  color: ${base1};
}

.structural {
  position: absolute !important;
  left: -9999px !important;
}

ol li.interviewer {
  list-style: none;
}

ol li.interviewer ~ li {
  list-style: none;
  margin-top: 1.75em;
}

ol li.interviewer:nth-child(1),
ol li.interviewer ~ li:nth-child(odd) {
  color: ${base1};
}

#comments,
#related,
#respond {
  margin: 2.625em 0 0;
}

.unidentified.comments,
.unidentified.related,
.unidentified.respond {
  margin: 2.625em 0 0;
}

#main h2.unidentified a,
#main h3.unidentified a {
  visibility: hidden;
}

#main h2.unidentified:hover a,
#main h3.unidentified:hover a {
  visibility: visible;
  color: #cc0000;
}

#main > article + article,
#main > h1 + article {
  margin: 3.5em 0 0;
}

#main > article + h2 {
  margin: 2.625em 0 0;
}

#main img {
  max-width: 100%;
}

#main article header {
  line-height: 1;
}

#main article header h1,
#main article header h2 {
  display: inline;
  margin: 0 0.25em 0 0;
  font: bold 1.667em/1.05 'proxima-nova-1', 'proxima-nova-2', 'Helvetica', 'Arial', sans-serif;
  color: ${base01};
  text-shadow: 0 1px 0 white;
}

#main article header time {
  display: inline;
  font: bold 1.667em/1.05 'proxima-nova-1', 'proxima-nova-2', 'Helvetica', 'Arial', sans-serif;
  color: ${base01};
  text-shadow: 0 1px 0 white;
  font-weight: normal;
  color: ${base1};
  white-space: nowrap;
}

.update {
  margin: 1.75em 0 -1px;
  border-width: 1px 0;
  border-style: solid;
  border-color: ${base1};
  padding: 1.667em 0 1.75em;
}

.update + .update {
  margin-top: 0;
}

.update h4:first-child {
  margin: 0;
}

footer.metadata {
  margin-left: -1em;
  padding: 1.75em 0 0 1em;
  overflow: hidden;
}

footer.metadata a {
  float: left;
  margin: 0 0.5em 0 0;
}

footer.metadata ul {
  list-style: none;
}

footer.metadata ul a {
  margin-left: -0.833em;
  -webkit-border-radius: 0.875em;
  -moz-border-radius: 0.875em;
  -ms-border-radius: 0.875em;
  -o-border-radius: 0.875em;
  border-radius: 0.875em;
  background: ${blue};
  padding: 0 0.667em 0 0.833em;
  color: white;
}

footer.metadata ul a:focus,
footer.metadata ul a:hover {
  background: ${orange};
}

footer.metadata h4 {
  position: absolute;
  left: -9999px;
}

footer.metadata ol {
  margin: 0;
  list-style: none;
}

footer.metadata ol a {
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAiklEQVQoz5WR4RGAIAhGWaEVXKEVWsFZmsVZWqFZWsGA0yKUFO4++9N7CEIIIe/bApisAqPwQYJ8HZ/MCLgj/cwCKofggam8ghcuAn39KsDvABY509oIYoztwrSAwJq/EaTJLdBzuAS9LU4LGrhsdbg8rG5nKFu1nw1BE7ZGkKA1c1cgQQ8MumPNDbT9z/qqMmCfAAAAAElFTkSuQmCC') no-repeat 0;
  padding: 0 0 0 20px;
}

article article {
  margin: 0 0 0 -30px;
  border-bottom: 1px solid #cccccc;
  padding: 0.417em 0 1.25em 30px;
  overflow: auto;
}

article article > div {
  float: left;
  width: 65%;
}

article article > div > p:first-child {
  margin: 0;
}

article article > div > blockquote:first-child > p:first-child {
  margin: 0 !important;
}

article article footer {
  position: relative;
  float: right;
  width: 30%;
  padding: 0;
  color: black;
}

article article footer img {
  position: absolute;
  left: 0;
  top: 0.417em;
  display: block;
}

article article footer strong,
article article footer time {
  display: block;
  margin: 0 0 0 32px;
  padding: 0 0 0 1em;
}

article h2 + article {
  margin: 1.25em 0 0 -30px;
  border-top: 1px solid #cccccc;
}

form[action='comment/'] fieldset {
  margin: 1em 0 0;
}

fieldset#author-details {
  margin: 1.75em 0 0;
  padding: 0 0 0.083em;
}

fieldset#author-details + div + div {
  height: 1.75em;
}

fieldset#author-details + div + div + div {
  height: 3.5em;
}

fieldset#author-details ~ div:last-child {
  padding: 0 0 1px;
}

form div {
  position: relative;
}

form > fieldset {
  margin: 1.75em 0 0;
}

form > fieldset > div {
  height: 2.25em;
}

form > fieldset > div > label {
  text-transform: lowercase;
}

form > fieldset > div > input[type='url'],
form > fieldset > div > input[type='text'],
form > fieldset > div > input[type='email'] {
  position: absolute;
  left: 0;
  top: 0;
  margin: 0 0.75em 0 0;
  width: 18em;
  max-width: 300px;
}

form > fieldset + div > label {
  position: absolute;
  left: -9999px;
}

form > fieldset + div + div > label {
  left: 1.75em;
}

form > fieldset + div + div > input[type='checkbox'] {
  margin: 0;
}

input[type='submit'] {
  margin: 20px 0 0;
  height: 30px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -ms-border-radius: 4px;
  -o-border-radius: 4px;
  border-radius: 4px;
  border: 1px solid #999999;
  background: #dddddd;
  background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #eeeeee), color-stop(100%, #cccccc));
  background-image: -webkit-linear-gradient(#eeeeee, #cccccc);
  background-image: -moz-linear-gradient(#eeeeee, #cccccc);
  background-image: -o-linear-gradient(#eeeeee, #cccccc);
  background-image: linear-gradient(#eeeeee, #cccccc);
  padding: 0 10px;
  font: 1.167em/30px 'proxima-nova-1', 'proxima-nova-2', 'Lucida Grande', 'Lucida Sans Unicode', sans-serif;
  text-shadow: 0 1px 0 white;
}

input[type='submit']:focus {
  border-color: ${blue};
  outline: none;
}

input[type='submit']:hover {
  background: #cccccc;
  background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #dddddd), color-stop(100%, #bbbbbb));
  background-image: -webkit-linear-gradient(#dddddd, #bbbbbb);
  background-image: -moz-linear-gradient(#dddddd, #bbbbbb);
  background-image: -o-linear-gradient(#dddddd, #bbbbbb);
  background-image: linear-gradient(#dddddd, #bbbbbb);
  cursor: pointer;
}

input[type='submit']:active {
  background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #bbbbbb), color-stop(100%, #dddddd));
  background-image: -webkit-linear-gradient(#bbbbbb, #dddddd);
  background-image: -moz-linear-gradient(#bbbbbb, #dddddd);
  background-image: -o-linear-gradient(#bbbbbb, #dddddd);
  background-image: linear-gradient(#bbbbbb, #dddddd);
}

label[for='cc_sender'],
label[for='subscribe'] {
  position: relative;
  top: 5px;
  margin: 0;
}

#cc_sender,
#subscribe {
  position: absolute;
  left: 0;
  top: 10px;
}

ol.pages {
  list-style: none;
}

ol.posts {
  list-style: none;
  color: ${base1};
}

ol.archives {
  margin: 0;
  margin-left: -21px;
  list-style: none;
}

ol.archives li h2 {
  margin: 1.75em 0 0 21px;
  padding: 0;
  font: bold 1em/1.75 'Lucida Grande', 'Lucida Sans Unicode', 'Helvetica', 'Arial', sans-serif;
  color: ${base1};
}

ol.archives li ol {
  margin: 0;
  list-style: none;
}

ol.archives time {
  position: relative;
  display: block;
  float: left;
  margin: 0.167em 0.5em 0 0;
  width: 16px;
  height: 16px;
  background-image: url(../svg/archives.svg);
  background-repeat: no-repeat;
  line-height: 10;
  overflow: hidden;
}

ol.archives time:before,
ol.archives time:after {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  background-position-y: 6px;
  content: '';
}

ol.archives time[datetime*='10T']:before,
ol.archives time[datetime*='11T']:before,
ol.archives time[datetime*='12T']:before,
ol.archives time[datetime*='13T']:before,
ol.archives time[datetime*='14T']:before,
ol.archives time[datetime*='15T']:before,
ol.archives time[datetime*='16T']:before,
ol.archives time[datetime*='17T']:before,
ol.archives time[datetime*='18T']:before,
ol.archives time[datetime*='19T']:before {
  background-image: url(../svg/dates-1.svg);
}

ol.archives time[datetime*='20T']:before,
ol.archives time[datetime*='21T']:before,
ol.archives time[datetime*='22T']:before,
ol.archives time[datetime*='23T']:before,
ol.archives time[datetime*='24T']:before,
ol.archives time[datetime*='25T']:before,
ol.archives time[datetime*='26T']:before,
ol.archives time[datetime*='27T']:before,
ol.archives time[datetime*='28T']:before,
ol.archives time[datetime*='29T']:before {
  background-image: url(../svg/dates-2.svg);
}

ol.archives time[datetime*='30T']:before,
ol.archives time[datetime*='31T']:before {
  background-image: url(../svg/dates-3.svg);
}

ol.archives time[datetime*='0T']:after {
  background-image: url(../svg/dates-0.svg);
}

ol.archives time[datetime*='1T']:after {
  background-image: url(../svg/dates-1.svg);
}

ol.archives time[datetime*='2T']:after {
  background-image: url(../svg/dates-2.svg);
}

ol.archives time[datetime*='3T']:after {
  background-image: url(../svg/dates-3.svg);
}

ol.archives time[datetime*='4T']:after {
  background-image: url(../svg/dates-4.svg);
}

ol.archives time[datetime*='5T']:after {
  background-image: url(../svg/dates-5.svg);
}

ol.archives time[datetime*='6T']:after {
  background-image: url(../svg/dates-6.svg);
}

ol.archives time[datetime*='7T']:after {
  background-image: url(../svg/dates-7.svg);
}

ol.archives time[datetime*='8T']:after {
  background-image: url(../svg/dates-8.svg);
}

ol.archives time[datetime*='9T']:after {
  background-image: url(../svg/dates-9.svg);
}

ol.archives time[datetime*='01T']:after {
  background-position-x: 7px;
}

ol.archives time[datetime*='02T']:after {
  background-position-x: 6px;
}

ol.archives time[datetime*='03T']:after {
  background-position-x: 6px;
}

ol.archives time[datetime*='04T']:after {
  background-position-x: 6px;
}

ol.archives time[datetime*='05T']:after {
  background-position-x: 6px;
}

ol.archives time[datetime*='06T']:after {
  background-position-x: 6px;
}

ol.archives time[datetime*='07T']:after {
  background-position-x: 6px;
}

ol.archives time[datetime*='08T']:after {
  background-position-x: 6px;
}

ol.archives time[datetime*='09T']:after {
  background-position-x: 6px;
}

ol.archives time[datetime*='10T']:after {
  background-position-x: 8px;
}

ol.archives time[datetime*='11T']:after {
  background-position-x: 9px;
}

ol.archives time[datetime*='12T']:after {
  background-position-x: 8px;
}

ol.archives time[datetime*='13T']:after {
  background-position-x: 8px;
}

ol.archives time[datetime*='14T']:after {
  background-position-x: 8px;
}

ol.archives time[datetime*='15T']:after {
  background-position-x: 8px;
}

ol.archives time[datetime*='16T']:after {
  background-position-x: 8px;
}

ol.archives time[datetime*='17T']:after {
  background-position-x: 8px;
}

ol.archives time[datetime*='18T']:after {
  background-position-x: 8px;
}

ol.archives time[datetime*='19T']:after {
  background-position-x: 8px;
}

ol.archives time[datetime*='20T']:after {
  background-position-x: 9px;
}

ol.archives time[datetime*='21T']:after {
  background-position-x: 10px;
}

ol.archives time[datetime*='22T']:after {
  background-position-x: 9px;
}

ol.archives time[datetime*='23T']:after {
  background-position-x: 9px;
}

ol.archives time[datetime*='24T']:after {
  background-position-x: 9px;
}

ol.archives time[datetime*='25T']:after {
  background-position-x: 9px;
}

ol.archives time[datetime*='26T']:after {
  background-position-x: 9px;
}

ol.archives time[datetime*='27T']:after {
  background-position-x: 9px;
}

ol.archives time[datetime*='28T']:after {
  background-position-x: 9px;
}

ol.archives time[datetime*='29T']:after {
  background-position-x: 9px;
}

ol.archives time[datetime*='30T']:after {
  background-position-x: 9px;
}

ol.archives time[datetime*='31T']:after {
  background-position-x: 10px;
}

#cricket-field-diagrams dl {
  margin: 2.25em 0 0;
  height: 367px;
}

#cricket-field-diagrams dl dt {
  position: absolute;
  left: 0px;
  top: 0;
  margin: 0;
  width: 148px;
  height: 148px;
  border: 1px solid #cccccc;
  background-color: white;
  padding: 0;
}

#cricket-field-diagrams dl dt ~ dt {
  left: 170px;
}

#cricket-field-diagrams dl dt ~ dt ~ dt {
  left: 340px;
}

#cricket-field-diagrams dl dt ~ dt ~ dt ~ dt {
  left: 0px;
  top: 191px;
}

#cricket-field-diagrams dl dt ~ dt ~ dt ~ dt ~ dt {
  left: 170px;
}

#cricket-field-diagrams dl dt ~ dt ~ dt ~ dt ~ dt ~ dt {
  left: 340px;
}

#cricket-field-diagrams dl dt ~ dd {
  position: absolute;
  left: 0px;
  top: 155px;
  width: 150px;
  text-align: center;
}

#cricket-field-diagrams dl dt ~ dd ~ dd {
  left: 170px;
}

#cricket-field-diagrams dl dt ~ dd ~ dd ~ dd {
  left: 340px;
}

#cricket-field-diagrams dl dt ~ dd ~ dd ~ dd ~ dd {
  left: 0px;
  top: 346px;
}

#cricket-field-diagrams dl dt ~ dd ~ dd ~ dd ~ dd ~ dd {
  left: 170px;
}

#cricket-field-diagrams dl dt ~ dd ~ dd ~ dd ~ dd ~ dd ~ dd {
  left: 340px;
}

#cricket-field-diagrams dl dt img {
  margin: -1px;
  border: none;
}

.codehilite .hll {
  background-color: ${base2};
}

.codehilite .c {
  font-style: italic;
  color: ${base1};
}

.codehilite .k {
  font-weight: bold;
}

.codehilite .o {
  font-weight: bold;
}

.codehilite .cm {
  font-style: italic;
  color: ${base1};
}

.codehilite .cp {
  font-weight: bold;
  color: ${base1};
}

.codehilite .c1 {
  font-style: italic;
  color: ${base1};
}

.codehilite .cs {
  font-style: italic;
  font-weight: bold;
  color: ${base1};
}

.codehilite .ge {
  font-style: italic;
}

.codehilite .gr {
  color: ${red};
}

.codehilite .gh {
  color: ${base1};
}

.codehilite .go {
  color: ${base1};
}

.codehilite .gp {
  color: ${base1};
}

.codehilite .gs {
  font-weight: bold;
}

.codehilite .gu {
  color: ${base1};
}

.codehilite .gt {
  color: ${red};
}

.codehilite .kc {
  font-weight: bold;
}

.codehilite .kd {
  font-weight: bold;
}

.codehilite .kn {
  font-weight: bold;
}

.codehilite .kp {
  font-weight: bold;
}

.codehilite .kr {
  font-weight: bold;
}

.codehilite .kt {
  font-weight: bold;
}

.codehilite .m {
  color: ${cyan};
}

.codehilite .s {
  color: ${yellow};
}

.codehilite .na {
  color: ${cyan};
}

.codehilite .nc {
  font-weight: bold;
}

.codehilite .no {
  color: ${cyan};
}

.codehilite .ni {
  color: ${magenta};
}

.codehilite .ne {
  font-weight: bold;
  color: ${orange};
}

.codehilite .nf {
  font-weight: bold;
  color: ${orange};
}

.codehilite .nt {
  color: ${blue};
}

.codehilite .ow {
  font-weight: bold;
}

.codehilite .mf {
  color: ${cyan};
}

.codehilite .mh {
  color: ${cyan};
}

.codehilite .mi {
  color: ${cyan};
}

.codehilite .mo {
  color: ${cyan};
}

.codehilite .sb {
  color: ${yellow};
}

.codehilite .sc {
  color: ${yellow};
}

.codehilite .sd {
  color: ${yellow};
}

.codehilite .s2 {
  color: ${yellow};
}

.codehilite .se {
  color: ${yellow};
}

.codehilite .sh {
  color: ${yellow};
}

.codehilite .si {
  color: ${yellow};
}

.codehilite .sx {
  color: ${yellow};
}

.codehilite .sr {
  color: ${red};
}

.codehilite .s1 {
  color: ${yellow};
}

.codehilite .ss {
  color: ${yellow};
}

.codehilite .bp {
  color: ${base1};
}

.codehilite .vc {
  color: ${cyan};
}

.codehilite .vg {
  color: ${cyan};
}

.codehilite .vi {
  color: ${cyan};
}

.codehilite .il {
  color: ${cyan};
}
`;
export default screen;
