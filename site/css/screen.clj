(coerce ->

   (let [s (require "../sanctuary")

         . s/compose

         % (. (+ "%") coerce)
         em (. (+ "em") coerce)
         px (. (+ "px") coerce)

         ' (s/pipe [(.replace (s/regex "g" "(?=')") "\\" _)
                    (+ _ "'")
                    (+ "'")])

         , (. (s/join-with ", ") (s/map coerce))

         sans-serif (. , (. (s/append :sans-serif) (s/map ')))
         monospace (. , (. (s/append :monospace) (s/map ')))

         rgba (r g b a -> (.join "" ["rgba(" (, [r g b a]) ")"]))

         url (url -> (.join "" ["url(" url ")"]))

         !important (. (+ " !important") coerce)

         base03         "#002b36"
         base02         "#073642"
         base01         "#586e75"
         base00         "#657b83"
         base0          "#839496"
         base1          "#93a1a1"
         base2          "#eee8d5"
         base3          "#fdf6e3"
         yellow         "#b58900"
         orange         "#cb4b16"
         red            "#dc322f"
         magenta        "#d33682"
         violet         "#6c71c4"
         blue           "#268bd2"
         cyan           "#2aa198"
         green          "#859900"

         mid-gray       "#a9a9a9"
         pink           "#ff5e99"
         recycled-paper "#fef9ec"

         tag-background
           (s/pipe [Math.log2
                    (* 5)
                    (- _ 247)
                    Math.floor
                    (.toString 16 _)
                    (.padStart 2 "0" _)
                    (.repeat 3 _)
                    (s/concat "#")])
         tag-color
           (s/pipe [Math.log2
                    (* 0.1)
                    (+ 0.3)
                    (.toFixed 3 _)
                    (.replace (s/regex "" "0*$") "" _)
                    (.replace (s/regex "" "[.]$") "" _)
                    (rgba 0 0 0)])]

   (s/join [[

     ["html"] [
       :height (% 100)
       :background-color base3
     ]
     ["html > body"] [
       :font-size (px 12)
     ]

     ["body"] [
       :position :relative
       :min-width (px 675)
       :height (% 100)
       :background-color base3
       :font-size (% 75)
       :font-family (sans-serif ["Lucida Grande" "Lucida Sans Unicode" "Helvetica" "Arial"])
       :color base00
       :cursor :default
     ]

     ["#skip"] [
       :position :absolute
       :left (px -9999)
     ]

     ["#wrap"] [
       :position :relative
       :height :auto
       :min-height (% 100)
       :font-size (em 1)
       :line-height 1.75
       :overflow :hidden
     ]

     ["#header"] [
       :position :fixed
       :left 0
       :top 0
       :width (% 100)
       :height (px 160)
       :background [(url "'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAACgCAYAAADNVQbCAAAAUElEQVQoke3JsQ0CQRAEwd5+EPlniYE3J+E8NxhEgfROOcXn/awAFxd/xsxEILYsZ4jQCMZ2r98yE+leUiMSnUZ6xLPn8rYbOe6RB5EXC4AvwzcoH+3LgngAAAAASUVORK5CYII='") :repeat-x]
       :z-index 10
     ]
     ["#header header"] [
       :position :relative
       :margin [0 :auto]
       :width (% 65)
       :min-width (px 615)
       :max-width (em 60)
       :padding [(px 24) (px 30) 0]
     ]
     ["#header header hr"] [
       :margin [(px 6) :auto 0 0]
       :width (px 354)
       :text-align :left
     ]
     ["#header header p"] [
       :margin 0
       :height (px 21)
       :background [(url "'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAAQCAYAAAAswXUEAAAByElEQVR42u2aO3bDMAwEef8b6LRwkyIvzw7xWZASPcUUiWwaWgJLGPIwswEAAPtABAAAjBgAACMGAACMGAAAIwYAgF1GfF2X/TB+4f2fis61O2Mgbn3sd8wzW6TZrlpcvQ+nekg6Hoz4DEMbBxkxWmHEGPGf0//d5ni6hE9rev6erTlLGgu8LyKcPSTuWUyeeNSxWiDPFBpn8tKjhwX3p1IHXo08BZ/Z887czmgRvY+oJlbMa28z+/b9I7lIxRxmCdeVsCNYNJ5rFiyKFXFbwGDGAo2juqpzY4dWKiP2GNIoHgbZz8jmi/qQUuZBd3wf189+LVF0akPYMXs2u9IRW6EgLWBiirirhafWOFKMuwtQbcTVOuj+fNU+ZEcbWW1Wa6K4/q+nKET03KyJjLjasVZmOrbw1K7EreqAlBpbkwE8zYjtQCO2Kz8jzWhTuc9sA1XxP9drqoP6ardWLZDoukOYOCuMOBO3qvDUGn+rESv2/e4dcWZ8qa6JVZpkrk9j6RxNKI04MxhXPqxbPZpQPazLjhmUGnePJiIPalZpdScjzsxru2uyeqh0PazL6lb+RvG0n10BnPqTQvjinGET4KRCwoThkTnzAjIvgGm0M2OfAAAAAElFTkSuQmCC'") :no-repeat]
       :line-height 10
       :overflow :hidden
     ]
     ["#header header form"] [
       :position :absolute
       :right (px 27)
       :top (px 24)
       :width (px 27)
     ]
     ["#header header form div"] [
       :position :relative
     ]
     ["#header header form div label"] [
       :position :absolute
       :left (px -9999)
     ]
     ["#header header form div input[type='search']"] [
       :position :absolute
       :right (px 27)
       :top 0
       :display :block
       :float :left
       :width (em 12.5)
       :max-width (px 200)
       :height (px 16)
       :font-size (em 1.083)
     ]
     ["#header header form div input[type='submit']"] [
       :position :absolute
       :right 0
       :top 0
       :display :block
       :margin 0
       :width 0
       :height 0
       :border :none
       :background [(url "'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABtklEQVRIx7WUsWrCUBSGMzt1dHAWhG5eFQyEFJwsSBxcSlsqYhwcKnYolIB3qZRSXESKYye7+AgpqQUnX8FH8Bluzx+OEIpWb5oGPg9E7/mu/z2JoZQy/pPwI5/PRxGEJAJiwwR8T0R/G0fQKZVKn/V6/X0ymTyv12tJDMbj8RPdm+E7/CauoGOa5tcLXXRPEh5xT9wRPeJ2OBw+lsvlxVaiIxDYXaT5A9EnukSbaBI3qFLKQbFYRGRCRyARS6Q5duwSV0SDcIga10a1Wn3DGh1BgMw5lj43v+CmFcIiTK4Vz/N6WKMj2OBAOfMu7xzNbQJRnBI5rmK5XJ5jja5gwAfa5lgq3DxLZIg016zv+2e6ggCjyNk3OWuLd4ymJ0SKa6bVal3rRoRDnmEUeVpqnHmOd57isYQkbVnWq+4hh2OKOT/0DxzHuRRCfOiOafig4SHCnO87AzQvFAr+fD5XPAD6rwo8RJhzjCKmBQeKzBELdj4ajdT2MgxDJv6ym06n9mq1Uq7rKtRDknivYFpGsqMkcQX2LkloTkiwV5Kk4CjJXwUHJUkIfpUkJdgpSVrwU2LHFujwDcrfprHNIpr7AAAAAElFTkSuQmCC'") :no-repeat (% 100)]
       :padding [(px 24) 0 0 (px 27)]
       :cursor :pointer
     ]

     ["#title"] [
       :display :block
       :width (px 354)
       :height (px 24)
       :mask-image (url "/svg/masthead-mask.svg")
       :background [(url "/svg/masthead.svg") :no-repeat]
       :line-height 10
       :overflow :hidden
     ]

     ["a#title:focus"
      "a#title:hover"
      "a#title.hover"] [
       :background-color "#ccc"
     ]

     ["#nav > ul"] [
       :position :relative
       :margin [(px 12) 0 0]
     ]
     ["#nav > ul > li"] [
       :float :left
       :margin [0 (px 6) 0 0]
     ]
     ["#nav a"] [
       :display :block
       :width (px 28)
       :height (px 28)
       :border-radius (px 4)
       :border [(px 1) :solid "#999999"]
       :background [:no-repeat (% 50)]
     ]
     ["#nav a:focus"] [
       :border-color orange
       :background-color "#eecc66"
     ]
     ["#nav a:focus > span"] [
       :visibility :visible
     ]
     ["#nav a:hover"
      "#nav a.hover"] [
       :border-color orange
       :background-color :white
     ]
     ["#nav a:hover > span"
      "#nav a.hover > span"] [
       :visibility :visible
       :z-index 20
     ]
     ["#nav a > span"] [
       :position :absolute
       :left 0
       :top (px 36)
       :display :block
       :width (px 354)
       :height (px 10)
       :background base3
       :line-height 10
       :overflow :hidden
       :visibility :hidden
     ]
     ["#nav a[href='/about/'] > span"] [
       :background-image (url "'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAAKCAYAAACOjFT5AAABNUlEQVRo3u2YQRKDIAxFSac38k4eyjN5p3TjwlIJITEC0/822qJJDBA+0LIs6YCPK6VvSv/fyaWPfd9/Hty2LX+29fftcU7IaDmp2WjxYYpnXdcEQC9eSAEAAPTlfVIRdFy5oCb4dE9CW96uVaxJ8B2tBKX4LfZrebCodqvt0vvaHLXEyo7x4el/dvQLAFMpYhKKp9SusdsyQTQFvVQkIuK/ypFkJ4+DlX4ttqVvjFjkSCh8pOgrTxEmxeLg7V8AQhXxP/CECmJDHBRo25qn8wJxtVOiRt8ofABUFDELCmoGeLA4IlTnE4o2Kr89YwdgqqMJGmyisGKbnjLVlm+PgX/38A/5rY01AIY6mpDO9djRPkLRuSM+CpzUXtuRsfX2XbM/+vgDIBEzxAAAAIxwNAEAAKATH+FfdBZqw1WQAAAAAElFTkSuQmCC'")
     ]
     ["#nav a[href='/archives/'] > span"] [
       :background-image (url "'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAAKCAYAAACOjFT5AAACHElEQVRo3u1aWa7DIAxkqnejcCYOxZlyJ7+fRkKIzQbCUixVagIEPHaHiQuu61JfI6WUuu8bqtK01slnpdqttepFI+8agTZkxkK9a6Pm3d23VnOTIJdWxM2fM7WGoTlrjJk+8f9GTNqC7DslEm1KcMeOHVuAiB8CIq01uUTpqtdYW4pgQ+rXv+dfW2vpu5PBUcrk7XLwlDTF2joqaE4/MNS4347APYqorhLl4W5Cqedw1136hkGZsZRRVrPjWuKDBNeY+kRgbml8lbBvrXrn5A46r/F1+3DLDSEyTZUgfLKVmEvMD8m6xBtq76ygS+dA4sfObVeJ75K1hZJYuq6SsSGCogLfVsI15wMJ110SRzSIbwxnyZpUB/9r/VmfiFOEG1PDpSWIEFnHCDWklmOqeQOjzv1TBFNS15OMxQ/gysUrh51046qNLzmfkf638mdqIiY/yDXqtadZaymkelMljEUNTBJAY9IggbpuMXZ3XGfBrmQe6VvWCP9nzjmWIkatI7Xk7daHY2qYUzN++ixMzGjQX6pmSgmIKsb+Iq41uCNThui5Ic26UebGkVqkVCE+NfH8eZc7qtbCjDHwSTVGyowaMQKBArM/55UWjLmJSRxUQTQcTPx2VODZqrSwAq6tchGVxMKJEV4kMmnuvJlzfQFwzhE/BDu6/LBBZWGqetVOR/J+GdflyWaUrXCO+HPCtLWdc9H74XriuaH9AyA2SpOz0ppaAAAAAElFTkSuQmCC'")
     ]
     ["#nav a[href='https://bitbucket.org/davidchambers'] > span"] [
       :background-image (url "'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAAKCAYAAACOjFT5AAABvklEQVRo3u2awZaAIAhF+6e+1q91VnNOZyaDBw/UYuHCLELFK4LHeZ79Wnrvx7XcPdc+YxWGbERGa6231vqoPruspk+Grr9ydul3lf3XRaa9/QOUBlgF4gJxpq4F4CpvX2ciiEd16bkE6qd3tO9qvpXarCC+emijNgTqT/LQ/2plMPW7a4vo00gO2id0s/XqaLUX60lB+z+pbpGLjqU0HtZ+oXartd2I09kRFZpg1DVtKORR436aJKn+d3FpQYGA1CKDrZ8WkN5NDwESc8y942G1F6vHxtRHei9yPLPG/a4/HltM8YizQDySLW0WyIZihUNkHYGOF8RRIJkJYqtcj47e+fWCyePxWk5F6ImEMVcZ446sMzaMtwKxBNkn0O4AYu3krgZiBApfBrF1PtDQxEwQWzz5aBCzTmspoYnVQDxqQ/RBwxcreMSjY9LqIGZ5HZkgjpKNzq83OTwLxFYbnuERa8fdcgJghCzoMWKt54p4tp5EXwSImckQNNHBTPix++sFXSYstZtedrLOEiP2JlctAGImnK3/ZyfrPKEJN4jrmkqVr19Pqut177gWtvM8lGFUKSB8GABvAfHuc/ADvtWjgc0r3tgAAAAASUVORK5CYII='")
     ]
     ["#nav a[href='/contact/'] > span"] [
       :background-image (url "'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAAKCAYAAACOjFT5AAACHUlEQVRo3u1aS67DIAy0n3qjciYOlTPlTtNNIyFkYhtISvs8qzYE8AeGwQo/n08iIlCBfd+ZJiGlBM+Y27Zp7SAiyjmfjpdzLsc6/JvhlzbWzLkCc/AtObvazrv9NM2Xc/73C/QhBAuxb4cQBByItRVwEzGdqeFD0UrtpdqVlG/ZN6WEo+1szFL1Ficm18+3bYOmih0ntXRyQ9gAqNq5NbZgMxsVAk42H5SNic5+PTFptbGihrT3RubV+kKJGTriRoqA4Y7coiNHVjXt9XM0P3FTNODPWlZokegZyZYEW/9ujVmWHmqiLf8PkLCXqLmxwNT5qzILDLeO1rxUPW8dDFJf6TkmxeSu2xMb5m3FV8sZGwioN2+e8Vxry+j7bD971qzVvlDEo/DWlCUyP6kfffIExcgJXtWpuZOALKrLajMUQkLV/4rY1/NY5kVHrFbGbHW4ku/85blZTxFfAUllLwh2ksDdm5c7bIaiWj7t14ji+ibgh3wJXEXEHrV6B+p6sdQuvaP1u1plaF9/TCIpj82Ww4Vn3AQcdkK4Ev86Qa14yN95sNbvRqniTcTlJoBU100pwfsZmlbGKMeUShEHwfaWJt790LgGsrAQuLFAeucfJSgYbCaDzXU/jezYaJs3pjNI+85N6/HHYqM3D6v46W0Ppd+ThPd3xCVRfloBR1bWUDOxocbjGDG8TrT8FB6xDALOEkfAdiWPGAbMeAE9OSswkuIpmQAAAABJRU5ErkJggg=='")
     ]
     ["#nav a[href='/flushcache/'] > span"] [
       :background-image (url "'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAAKCAYAAACOjFT5AAAAu0lEQVRo3u3a0QrCMAwF0PxT///b4rOyma7tsOp5OKAUQh3hNnRGay1PxMvnGavqfHwPmQmwVBVQglgQA5sFcfU9DqbqGJiy86ROtfZuvWcPVW1NA9waxDkQvD3BHBevPI5qxsRB0buHrt+iaYDdJ+Jqio2BIK6m1tG6Q1O7pgF+4WpiJohX1u09RAQx8HVBfEdgzkzos4fK07qmAXb410Tvi7TRq4m4+DJu5R7KupoGWB7EHgKAIAb4aw9tcYNEXXm9DwAAAABJRU5ErkJggg=='")
     ]
     ["#nav a[href='/tags/'] > span"] [
       :background-image (url "'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAAKCAYAAACOjFT5AAAB/klEQVRo3u1aWxKFIAiVO+1I19SiWpN74n410zipPLOH/JUWcIATVBBjxHAiOWcIA2Tbtt2eXX953BPu/vI66rUtPbU1rg5LwUF6a36PtOeJGN4dB0tsPHC+xT3XdT09v5SFMYqAX1ZgMIt4ktfHBKbPcll6G1JK2OqUy/Vy33HdkOSRAQh2AMQKaWg689q1lG4ZCF1HIHQk5TF0fAUjfDnYBqbuls3UeFP8a3XwPZtBgRMQ84waHy0WZ3jXcODkq6S2NHmhzTdqzXFrh07ER/JMKWFKCUuSpR4rybZFOEhwuLYfgn/XZqFD6nctAWs4c/WUSUjBFojjLRIKixtvZK5zbdbE7kh2Usw5WFDvhYJcbjUj2u6TmxfafKPWgthndkcskSN5C4DHj4y9UCEy7zEKlPiiEx4t3VfEG5l60MAu7ncQj+nSawSHh9g55NXFj0LCOWeQdLVlN+1UKPPdoy8RUYkaXhJbUBQ/XhQXK8y94ndnn28pP28FZwS+v+K4uGCe0hVbdVfhwfiOji047//qg/3LPmMLg6VHoi3S7K07faiDE6eACQo46rHyj2uPlb2c+0AvwS6KLSfePR0eeWXplwRzDhbBKZaaXPWyk2qH1E5yjCHG6DVCiKT2n91ImwY9QWeX9f54Tyw+hl/rP2LrkWMG/frReMqUKQ+WP8nkIlo7OqsfAAAAAElFTkSuQmCC'")
     ]
     ["#nav a[href='/twitter/'] > span"] [
       :background-image (url "'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAAKCAYAAACOjFT5AAAByklEQVRo3u1a7a2DMAzMVWzETgzFTOzk/o14IdjGdsxrLFVqUxLOd/4IEVjXlUrbUORGjbncMbUdx/FnbN/3IVgYfESbFsPdvAy+ZbXJXQ7Oh+iwbZt4zlKBsAA1A+t3bGo9uZs6GNki7DLa3+fv9Rg611x1N3qwwzvfFx2ceMgHp/tqfSajoOKsw9ltXGHljN/FjkfiWMRaFHdv4UCby5wc4qxXOlg1OnBwmOjyCew4qD534uCmeFtgaQnXwmAV8L3mJPWZO0/yOAchdm5yW+iGh2sUJX+UhLu3cSBZu/5fmydgNEOpDlwcJs3xwyxevd1K9NmqdZGEMCE0fMDRZ8tzLi12DlaU9z2SSzB7cpedAzKKt6d5YnUEEa6BdEdMAZhoYEBC6CsN9pnKOwvctP9h+KHaMLwQ44IEciJEIi45BAAG8KENaOtEoBfFLjUeG8k5NrJxl4GDyKKI5LGq5ntJ5AQajmAAkZH31vpsxdV5HSTU20MTC/4iucvKQe+c1jKXM9SGKxwmtlTv4ELQ9SDojpKzMwkG6+sl4mr5sPDhKdZihB1Omnrhi+QWQVhHc2AVu3DKXTjo4vHmUqod8bRp06ZlN7PiW9sX2+LFydcChv0AAAAASUVORK5CYII='")
     ]
     ["#nav a[href='https://bitbucket.org/davidchambers']"] [
       :background-image (url "../svg/bitbucket.svg")
     ]

   ]

   (s/chain (slug -> [[(.join "" ["#nav a[href='/" slug "/']"])]
                      [:background-image (url (.join "" ["../svg/" slug ".svg"]))]])
            ["about" "archives" "contact" "flushcache" "tags" "twitter"])

   [

     ["#main"] [
       :margin [0 :auto]
       :width (% 65)
       :min-width (px 615)
       :max-width (em 60)
       :padding [(px 159) 0 (em 10)]
     ]

     ["#wrap + footer"] [
       :position :relative
       :margin [(em -5.25) :auto 0]
       :width (% 65)
       :min-width (px 615)
       :max-width (em 60)
       :border-top [(px 1) :solid "#cccccc"]
       :padding [(em 0.5) 0 (em 1.25)]
       :line-height 1.75
       :z-index 20
     ]
     ["#wrap + footer > :first-child"] [
       :margin [(px -1) 0 0]
       :color base1
     ]

     ["::-moz-selection"] [
       :background pink
       :color :white
       :text-shadow :none
     ]

     ["::selection"] [
       :background pink
       :color :white
       :text-shadow :none
     ]

     ["a"] [
       :font-weight :bold
       :text-decoration :none
       :color blue
     ]
     ["a:focus"] [
       :color orange
       :outline :none
     ]
     ["a:hover"] [
       :color orange
     ]
     ["a code"
      "a var"] [
       :color :inherit
     ]

     ["aside"] [
       :margin [(em 1.75) 0 0]
       :font-style :italic
       :color base1
     ]

     ["blockquote"] [
       :border-left [(em 0.5) :solid base2]
       :padding [0 (em 2.25) 0 (em 1.75)]
       :font-style :italic
       :color base1
     ]
     ["blockquote em"] [
       :font-style :normal
     ]

     ["caption"] [
       :text-align :left
       :font-weight :normal
     ]

     ["code"
      "var"] [
       :border [(px 1) :solid base2]
       :background recycled-paper
       :padding [(px 1) (px 4)]
       :font [:normal "120%/1" (monospace ["Courier" "Courier New"])]
       :color base01
     ]

     ["pre code"] [
       :display :block
       :border :none
       :background :none
       :padding 0
       :font-size (em 1)
       :line-height 1.5
       :color :inherit
     ]

     ["del"] [
       :text-decoration :line-through
     ]

     ["dl"] [
       :position :relative
     ]
     ["dl dt"] [
       :clear :left
       :margin [(em 1.75) 0 0]
       :padding [(em 0.5) 0]
       :font-weight :bold
     ]
     ["dl dt.textual"
      "dl dt.textual ~ dt"] [
       :float :left
       :margin 0
       :padding [(em 1.75) (em 0.5) 0 0]
     ]
     ["dl dt.textual:after"
      "dl dt.textual ~ dt:after"] [
       :content "':'"
     ]
     ["dl dt.textual ~ dd"] [
       :font-style :normal
       :color :inherit
       :padding [(em 1.75) 0 0]
     ]
     ["dl dt embed"
      "dl dt img"
      "dl dt object"] [
       :display :block
       :margin [0 0 (px -1)]
     ]
     ["dl dt embed"
      "dl dt img"] [
       :border [(px 1) :solid "#cccccc"]
     ]
     ["dl dd"] [
       :font-style :italic
       :color base1
     ]

     ["em"] [
       :font-style :italic
     ]

     ["h1"
      "h2"
      "h3"
      "h4"] [
       :font [:bold "1.667em/1.05" (sans-serif ["proxima-nova-1" "proxima-nova-2" "Helvetica" "Arial"])]
       :color base01
       :text-shadow [0 (px 1) 0 :white]
     ]

     ["h2"
      "h3"] [
       :margin [(em 1.312) 0 0]
       :font-size (em 1.334)
       :line-height 1.312
     ]

     ["h4"] [
       :margin [(em 1.5) 0 0]
       :font-size (em 1.167)
       :line-height 1.5
     ]

     [".unidentified span"] [
       :float :left
       :margin [(px -159) 0 0]
     ]
     [".unidentified a"] [
       :visibility :hidden
     ]
     [".unidentified:hover a"] [
       :visibility :visible
     ]

     ["hr"] [
       :height 0
       :border :none
       :border-bottom [(px 1) :solid "#999999"]
     ]

     ["iframe.video"] [
       :display :block
       :margin [(em 1.75) 0 0]
       :width (% 100)
       :height (px 385)
     ]
     ["dt > iframe.video"] [
       :margin 0
     ]

     ["img"] [
       :display :block
       :vertical-align :text-bottom
     ]
     ["img[src*='/decorative/left/']"] [
       :float :left
       :margin [0 (em 1) 0 0]
       :border (!important :none)
     ]
     ["img[src*='/decorative/right/']"] [
       :float :right
       :margin [0 0 0 (em 1)]
       :border (!important :none)
     ]
     ["img[src*='/elam/']"
      "img[src*='/lightbox/']"] [
       :margin [(em 1.75) 0 (px -1)]
       :border [(px 1) :solid "#cccccc"]
     ]
     ["img[src*='/lightbox/large/']"] [
       :margin 0
     ]
     ["img[src*='/windows/']"] [
       :margin [(px 3) (px -40) (px -29)]
       :max-width (!important :none)
       :border (!important :none)
     ]
     ["img[src*='/windows/lion/']"] [
       :margin [(px -6) (px -56) (px -52)]
     ]
     ["dt > img[src*='/windows/']"] [
       :margin [(px -24) (px -40) (px -35)]
     ]
     ["dt > img[src*='/windows/lion/']"] [
       :margin [(px -33) (px -56) (px -58)]
     ]
     ["p > img[src*='/windows/']"] [
       :margin [(px -18) (px -40) (px -29)]
     ]
     ["p > img[src*='/windows/lion/']"] [
       :margin [(px -27) (px -56) (px -52)]
     ]
     ["p > img:only-child"] [
       :border [(px 1) :solid "#cccccc"]
     ]
     ["img.margin-top"] [
       :margin-top (em 1.75)
     ]

     ["input[type='url']"
      "input[type='text']"
      "input[type='email']"
      "input[type='search']"] [
       :-webkit-box-sizing :content-box
       :height (px 15)
       :border [(px 1) :solid "#cccccc"]
       :background recycled-paper
       :padding [(px 3) (em 0.5)]
       :font-size (em 1)
     ]
     ["input[type='url']:focus"
      "input[type='text']:focus"
      "input[type='email']:focus"
      "input[type='search']:focus"] [
       :border-color blue
       :outline :none
     ]
     ["input.placeholder"] [
       :color (!important mid-gray)
     ]

     ["ins"] [
       :background-color :transparent
       :text-decoration :underline
     ]

     ["label"] [
       :position :absolute
       :left [(em 19.833)]
       :top 0
       :margin [(px 1) 0 0]
       :color base1
     ]
     ["label.required:after"] [
       :content "'*'"
       :color "#999999"
     ]

     ["object.video"] [
       :width (% 100)
       :height (px 385)
     ]

     ["ol"] [
       :margin [(em 1.75) 0 0]
       :list-style [:decimal :outside]
     ]

     ["p"] [
       :margin [(em 1.75) 0 0]
     ]
     ["p.caption"] [
       :margin [(em 0.5) 0 0]
       :font-style :italic
       :color base1
     ]

     ["pre"] [
       :margin [(em 1.286) 0 (em -0.214)]
       :border [(px 1) :solid base2]
       :background-color recycled-paper
       :padding [(em 0.143) (em 0.714)]
       :font ["1.167em/1.5" (monospace ["Courier" "Courier New"])]
       :overflow :auto
     ]
     ["li pre"] [
       :margin [(em 1.286) 0]
     ]

     ["select"] [
       :min-width (px 150)
     ]

     ["strong"] [
       :font-weight :bold
     ]

     ["textarea"] [
       :display :block
       :width (% 98)
       :height (em 15)
       :border [(px 1) :solid "#cccccc"]
       :background recycled-paper
       :padding [(em 0.333) (em 0.5)]
       :font ["1em/1.25" (monospace ["Monaco"])]
       :outline :none
       :overflow :auto
     ]
     ["textarea:focus"] [
       :border-color blue
     ]

     ["time span"] [
       :display :block
       :color base1
     ]
     ["time span + span"] [
       :color :darkgrey
     ]

     ["ul"] [
       :margin [(em 1.75) 0 0]
       :list-style [:square :outside (url "'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAGElEQVQI12OYOXPmf3QMBAwM9JAAEdgwAMpjZprFgxhUAAAAAElFTkSuQmCC'")]
     ]
     ["ul li.pro"
      "ul li.con"] [
       :margin 0
       :margin-left (px -21)
       :background [:no-repeat 0 (em 0.25)]
       :padding [0 0 0 (px 21)]
       :list-style :none
     ]
     ["ul li.pro"] [
       :background-image (url "'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAhElEQVQoz6XTsRWAIAwE0BvG2oadModrOIRLUDOHa5wN0UCeBrW4wkd+Iiggia8B5FXYPEMwNkXAdV8IAVN5gRWmAs4ZPN8gwhZqpq02sBgCDkM72e4pgnX9OkVbGEGLXWGfHrrJcx6HDa7fzTW4gw7rIWmDJ+iwBhLDfs/P//Bd/tyqAxpBveS1AanvAAAAAElFTkSuQmCC'")
     ]
     ["ul li.con"] [
       :background-image (url "'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAh0lEQVQoz6WTyxGAIAxEt3TaoCMr4EYLthAFlYn5rAcPwDCPXdhkQAWghpg9GJ+TiEywlzKgjL0dmr/ED+jn2i5oX7B4V9yBwMDx7ebLuSmoDTKhyxwZZEIrDg0yYSSmEWzr3M02IzNwfWaZW5SZVZUZ4KsdlVR93cyqqg1cn58DiTDl+POrDsbXTGSpOZ/pAAAAAElFTkSuQmCC'")
     ]

     ["video"] [
       :border [(px 1) :solid "#cccccc"]
     ]

     ["article > header > dl"] [
       :margin [(em 1.571) 0 (em -0.071)]
       :font ["1.167em/1.5" (monospace ["Courier" "Courier New"])]
       :color base1
       :overflow :auto
     ]
     ["article > header > dl > dt"] [
       :float :left
       :margin 0
       :min-width (em 7)
       :padding 0
       :font-weight :normal
     ]
     ["article > header > dl > dt:after"] [
       :content "':'"
     ]
     ["article > header > dl > dd"] [
       :font-style :normal
     ]
     ["article > header > dl > dd > a"] [
       :font-weight :normal
     ]

     ["#tags"] [
       :margin [(em 1.75) 0 0]
       :list-style :none
     ]
     ["#tags li"] [
       :position :relative
       :float :left
       :margin [0 (px 1) 0 0]
       :width (% 24.5)
       :height (em 3.5)
     ]
     ["#tags li:hover"] [
       :z-index 100
     ]
     ["#tags li a"] [
       :position :absolute
       :left 0
       :top 0
       :display :block
       :width (% 100)
       :border [(px 1) :solid "#cccccc"]
       :padding [(px 10) 0]
       :text-align :center
       :-moz-transition-property    (, [:top :left    :-moz-box-shadow :padding :font-size :z-index])
       :-webkit-transition-property (, [:top :left :-webkit-box-shadow :padding :font-size :z-index])
       :-o-transition-property      (, [:top :left         :box-shadow :padding :font-size :z-index])
       :transition-property         (, [:top :left         :box-shadow :padding :font-size :z-index])
       :-webkit-transition-property (, [:top :left         :box-shadow :padding :font-size :z-index])
       :-moz-transition-property    (, [:top :left         :box-shadow :padding :font-size :z-index])
       :-o-transition-property      (, [:top :left         :box-shadow :padding :font-size :z-index])
       :transition-property         (, [:top :left         :box-shadow :padding :font-size :z-index])
       :transition-duration (, ["0.2s" "0.2s" "0.2s" "0.2s" "0.167s" "0.2s"])
       :transition-timing-function :ease
       :background (tag-background 20)
       :color (tag-color 20)
     ]
     ["#tags li a:focus"
      "#tags li a:hover"
      "#tags li a.hover"] [
       :left (px -21)
       :top (px -6)
       :width (% 100)
       :padding [(px 16) (px 21)]
       :box-shadow [0 (px 1) (px 3) (rgba 0 0 0 0.2)]
       :font-size (em 1.167)
       :z-index 99
     ]

   ]

   (s/fold-map Array
               (count -> [[(.join "" ["#tags li[data-count='" count "'] a"])]
                          [:background (tag-background count)
                           :color (tag-color count)]])
               (s/range 1 20))

   [

     [".hashify-editor"] [
       :margin-top (px 2)
     ]

     ["div.syntaxhighlighter"] [
       :margin (!important [(em 1.75) 0 (px -1)])
     ]
     ["div.syntaxhighlighter code"] [
       :border :none
       :background :none
       :padding 0
       :color :inherit
     ]

     [".clearfix"] [
       :clear :both
     ]

     [".filesize"] [
       :color base1
     ]

     [".structural"] [
       :position (!important :absolute)
       :left (!important (px -9999))
     ]

     ["ol li.interviewer"] [
       :list-style :none
     ]
     ["ol li.interviewer ~ li"] [
       :list-style :none
       :margin-top (em 1.75)
     ]
     ["ol li.interviewer:nth-child(1)"
      "ol li.interviewer ~ li:nth-child(odd)"] [
       :color base1
     ]

     ["#comments"
      "#related"
      "#respond"] [
       :margin [(em 2.625) 0 0]
     ]

     [".unidentified.comments"
      ".unidentified.related"
      ".unidentified.respond"] [
       :margin [(em 2.625) 0 0]
     ]

     ["#main h2.unidentified a"
      "#main h3.unidentified a"] [
       :visibility :hidden
     ]
     ["#main h2.unidentified:hover a"
      "#main h3.unidentified:hover a"] [
       :visibility :visible
       :color "#cc0000"
     ]
     ["#main > article + article"
      "#main > h1 + article"] [
       :margin [(em 3.5) 0 0]
     ]
     ["#main > article + h2"] [
       :margin [(em 2.625) 0 0]
     ]
     ["#main img"] [
       :max-width (% 100)
     ]
     ["#main article header"] [
       :line-height 1
     ]
     ["#main article header h1"
      "#main article header h2"] [
       :display :inline
       :margin [0 (em 0.25) 0 0]
       :font [:bold "1.667em/1.05" (sans-serif ["proxima-nova-1" "proxima-nova-2" "Helvetica" "Arial"])]
       :color base01
       :text-shadow [0 (px 1) 0 :white]
     ]
     ["#main article header time"] [
       :display :inline
       :font [:bold "1.667em/1.05" (sans-serif ["proxima-nova-1" "proxima-nova-2" "Helvetica" "Arial"])]
       :color base01
       :text-shadow [0 (px 1) 0 :white]
       :font-weight :normal
       :color base1
       :white-space :nowrap
     ]

     [".update"] [
       :margin [(em 1.75) 0 (px -1)]
       :border-width [(px 1) 0]
       :border-style :solid
       :border-color base1
       :padding [(em 1.667) 0 (em 1.75)]
     ]
     [".update + .update"] [
       :margin-top 0
     ]
     [".update h4:first-child"] [
       :margin 0
     ]

     ["footer.metadata"] [
       :margin-left (em -1)
       :padding [(em 1.75) 0 0 (em 1)]
       :overflow :hidden
     ]
     ["footer.metadata a"] [
       :float :left
       :margin [0 (em 0.5) 0 0]
     ]
     ["footer.metadata ul"] [
       :list-style :none
     ]
     ["footer.metadata ul a"] [
       :margin-left (em -0.833)
       :border-radius (em 0.875)
       :background blue
       :padding [0 (em 0.667) 0 (em 0.833)]
       :color :white
     ]
     ["footer.metadata ul a:focus"
      "footer.metadata ul a:hover"] [
       :background orange
     ]
     ["footer.metadata h4"] [
       :position :absolute
       :left (px -9999)
     ]
     ["footer.metadata ol"] [
       :margin 0
       :list-style :none
     ]
     ["footer.metadata ol a"] [
       :background [(url "'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAiklEQVQoz5WR4RGAIAhGWaEVXKEVWsFZmsVZWqFZWsGA0yKUFO4++9N7CEIIIe/bApisAqPwQYJ8HZ/MCLgj/cwCKofggam8ghcuAn39KsDvABY509oIYoztwrSAwJq/EaTJLdBzuAS9LU4LGrhsdbg8rG5nKFu1nw1BE7ZGkKA1c1cgQQ8MumPNDbT9z/qqMmCfAAAAAElFTkSuQmCC'") :no-repeat 0]
       :padding [0 0 0 (px 20)]
     ]

     ["article article"] [
       :margin [0 0 0 (px -30)]
       :border-bottom [(px 1) :solid "#cccccc"]
       :padding [(em 0.417) 0 (em 1.25) (px 30)]
       :overflow :auto
     ]
     ["article article > div"] [
       :float :left
       :width (% 65)
     ]
     ["article article > div > p:first-child"] [
       :margin 0
     ]
     ["article article > div > blockquote:first-child > p:first-child"] [
       :margin (!important 0)
     ]
     ["article article footer"] [
       :position :relative
       :float :right
       :width (% 30)
       :padding 0
       :color :black
     ]
     ["article article footer img"] [
       :position :absolute
       :left 0
       :top (em 0.417)
       :display :block
     ]
     ["article article footer strong"
      "article article footer time"] [
       :display :block
       :margin [0 0 0 (px 32)]
       :padding [0 0 0 (em 1)]
     ]
     ["article h2 + article"] [
       :margin [(em 1.25) 0 0 (px -30)]
       :border-top [(px 1) :solid "#cccccc"]
     ]

     ["form[action='comment/'] fieldset"] [
       :margin [(em 1) 0 0]
     ]
     ["fieldset#author-details"] [
       :margin [(em 1.75) 0 0]
       :padding [0 0 (em 0.083)]
     ]
     ["fieldset#author-details + div + div"] [
       :height (em 1.75)
     ]
     ["fieldset#author-details + div + div + div"] [
       :height (em 3.5)
     ]
     ["fieldset#author-details ~ div:last-child"] [
       :padding [0 0 (px 1)]
     ]

     ["form div"] [
       :position :relative
     ]
     ["form > fieldset"] [
       :margin [(em 1.75) 0 0]
     ]
     ["form > fieldset > div"] [
       :height (em 2.25)
     ]
     ["form > fieldset > div > label"] [
       :text-transform :lowercase
     ]
     ["form > fieldset > div > input[type='url']"
      "form > fieldset > div > input[type='text']"
      "form > fieldset > div > input[type='email']"] [
       :position :absolute
       :left 0
       :top 0
       :margin [0 (em 0.75) 0 0]
       :width (em 18)
       :max-width (px 300)
     ]
     ["form > fieldset + div > label"] [
       :position :absolute
       :left (px -9999)
     ]
     ["form > fieldset + div + div > label"] [
       :left (em 1.75)
     ]
     ["form > fieldset + div + div > input[type='checkbox']"] [
       :margin 0
     ]

     ["input[type='submit']"] [
       :margin [(px 20) 0 0]
       :height (px 30)
       :border-radius (px 4)
       :border [(px 1) :solid "#999999"]
       :background "#dddddd"
       :background-image "-webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #eeeeee), color-stop(100%, #cccccc))"
       :background-image "-webkit-linear-gradient(#eeeeee, #cccccc)"
       :background-image "-moz-linear-gradient(#eeeeee, #cccccc)"
       :background-image "-o-linear-gradient(#eeeeee, #cccccc)"
       :background-image "linear-gradient(#eeeeee, #cccccc)"
       :padding [0 (px 10)]
       :font ["1.167em/30px" (sans-serif ["proxima-nova-1" "proxima-nova-2" "Lucida Grande" "Lucida Sans Unicode"])]
       :text-shadow [0 (px 1) 0 :white]
     ]
     ["input[type='submit']:focus"] [
       :border-color blue
       :outline :none
     ]
     ["input[type='submit']:hover"] [
       :background "#cccccc"
       :background-image "-webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #dddddd), color-stop(100%, #bbbbbb))"
       :background-image "-webkit-linear-gradient(#dddddd, #bbbbbb)"
       :background-image "-moz-linear-gradient(#dddddd, #bbbbbb)"
       :background-image "-o-linear-gradient(#dddddd, #bbbbbb)"
       :background-image "linear-gradient(#dddddd, #bbbbbb)"
       :cursor :pointer
     ]
     ["input[type='submit']:active"] [
       :background-image "-webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #bbbbbb), color-stop(100%, #dddddd))"
       :background-image "-webkit-linear-gradient(#bbbbbb, #dddddd)"
       :background-image "-moz-linear-gradient(#bbbbbb, #dddddd)"
       :background-image "-o-linear-gradient(#bbbbbb, #dddddd)"
       :background-image "linear-gradient(#bbbbbb, #dddddd)"
     ]

     ["label[for='cc_sender']"
      "label[for='subscribe']"] [
       :position :relative
       :top (px 5)
       :margin 0
     ]

     ["#cc_sender"
      "#subscribe"] [
       :position :absolute
       :left 0
       :top (px 10)
     ]

     ["ol.pages"] [
       :list-style :none
     ]

     ["ol.posts"] [
       :list-style :none
       :color base1
     ]

     ["ol.archives"] [
       :margin 0
       :margin-left (px -21)
       :list-style :none
     ]
     ["ol.archives li h2"] [
       :margin [(em 1.75) 0 0 (px 21)]
       :padding 0
       :font [:bold "1em/1.75" (sans-serif ["Lucida Grande" "Lucida Sans Unicode" "Helvetica" "Arial"])]
       :color base1
     ]
     ["ol.archives li ol"] [
       :margin 0
       :list-style :none
     ]
     ["ol.archives time"] [
       :position :relative
       :display :block
       :float :left
       :margin [(em 0.167) (em 0.5) 0 0]
       :width (px 16)
       :height (px 16)
       :background-image (url "../svg/archives.svg")
       :background-repeat :no-repeat
       :line-height 10
       :overflow :hidden
     ]
     ["ol.archives time:before"
      "ol.archives time:after"] [
       :position :absolute
       :top 0
       :left 0
       :right 0
       :bottom 0
       :display :block
       :background-position-y (px 6)
       :content "''"
     ]
     ["ol.archives time[datetime*='10T']:before"
      "ol.archives time[datetime*='11T']:before"
      "ol.archives time[datetime*='12T']:before"
      "ol.archives time[datetime*='13T']:before"
      "ol.archives time[datetime*='14T']:before"
      "ol.archives time[datetime*='15T']:before"
      "ol.archives time[datetime*='16T']:before"
      "ol.archives time[datetime*='17T']:before"
      "ol.archives time[datetime*='18T']:before"
      "ol.archives time[datetime*='19T']:before"] [
       :background-image (url "../svg/dates-1.svg")
     ]
     ["ol.archives time[datetime*='20T']:before"
      "ol.archives time[datetime*='21T']:before"
      "ol.archives time[datetime*='22T']:before"
      "ol.archives time[datetime*='23T']:before"
      "ol.archives time[datetime*='24T']:before"
      "ol.archives time[datetime*='25T']:before"
      "ol.archives time[datetime*='26T']:before"
      "ol.archives time[datetime*='27T']:before"
      "ol.archives time[datetime*='28T']:before"
      "ol.archives time[datetime*='29T']:before"] [
       :background-image (url "../svg/dates-2.svg")
     ]
     ["ol.archives time[datetime*='30T']:before"
      "ol.archives time[datetime*='31T']:before"] [
       :background-image (url "../svg/dates-3.svg")
     ]
     ["ol.archives time[datetime*='0T']:after"] [:background-image (url "../svg/dates-0.svg")]
     ["ol.archives time[datetime*='1T']:after"] [:background-image (url "../svg/dates-1.svg")]
     ["ol.archives time[datetime*='2T']:after"] [:background-image (url "../svg/dates-2.svg")]
     ["ol.archives time[datetime*='3T']:after"] [:background-image (url "../svg/dates-3.svg")]
     ["ol.archives time[datetime*='4T']:after"] [:background-image (url "../svg/dates-4.svg")]
     ["ol.archives time[datetime*='5T']:after"] [:background-image (url "../svg/dates-5.svg")]
     ["ol.archives time[datetime*='6T']:after"] [:background-image (url "../svg/dates-6.svg")]
     ["ol.archives time[datetime*='7T']:after"] [:background-image (url "../svg/dates-7.svg")]
     ["ol.archives time[datetime*='8T']:after"] [:background-image (url "../svg/dates-8.svg")]
     ["ol.archives time[datetime*='9T']:after"] [:background-image (url "../svg/dates-9.svg")]
     ["ol.archives time[datetime*='01T']:after"] [:background-position-x (px  7)]
     ["ol.archives time[datetime*='02T']:after"] [:background-position-x (px  6)]
     ["ol.archives time[datetime*='03T']:after"] [:background-position-x (px  6)]
     ["ol.archives time[datetime*='04T']:after"] [:background-position-x (px  6)]
     ["ol.archives time[datetime*='05T']:after"] [:background-position-x (px  6)]
     ["ol.archives time[datetime*='06T']:after"] [:background-position-x (px  6)]
     ["ol.archives time[datetime*='07T']:after"] [:background-position-x (px  6)]
     ["ol.archives time[datetime*='08T']:after"] [:background-position-x (px  6)]
     ["ol.archives time[datetime*='09T']:after"] [:background-position-x (px  6)]
     ["ol.archives time[datetime*='10T']:after"] [:background-position-x (px  8)]
     ["ol.archives time[datetime*='11T']:after"] [:background-position-x (px  9)]
     ["ol.archives time[datetime*='12T']:after"] [:background-position-x (px  8)]
     ["ol.archives time[datetime*='13T']:after"] [:background-position-x (px  8)]
     ["ol.archives time[datetime*='14T']:after"] [:background-position-x (px  8)]
     ["ol.archives time[datetime*='15T']:after"] [:background-position-x (px  8)]
     ["ol.archives time[datetime*='16T']:after"] [:background-position-x (px  8)]
     ["ol.archives time[datetime*='17T']:after"] [:background-position-x (px  8)]
     ["ol.archives time[datetime*='18T']:after"] [:background-position-x (px  8)]
     ["ol.archives time[datetime*='19T']:after"] [:background-position-x (px  8)]
     ["ol.archives time[datetime*='20T']:after"] [:background-position-x (px  9)]
     ["ol.archives time[datetime*='21T']:after"] [:background-position-x (px 10)]
     ["ol.archives time[datetime*='22T']:after"] [:background-position-x (px  9)]
     ["ol.archives time[datetime*='23T']:after"] [:background-position-x (px  9)]
     ["ol.archives time[datetime*='24T']:after"] [:background-position-x (px  9)]
     ["ol.archives time[datetime*='25T']:after"] [:background-position-x (px  9)]
     ["ol.archives time[datetime*='26T']:after"] [:background-position-x (px  9)]
     ["ol.archives time[datetime*='27T']:after"] [:background-position-x (px  9)]
     ["ol.archives time[datetime*='28T']:after"] [:background-position-x (px  9)]
     ["ol.archives time[datetime*='29T']:after"] [:background-position-x (px  9)]
     ["ol.archives time[datetime*='30T']:after"] [:background-position-x (px  9)]
     ["ol.archives time[datetime*='31T']:after"] [:background-position-x (px 10)]

     ["#cricket-field-diagrams dl"] [
       :margin [(em 2.25) 0 0]
       :height (px 367)
     ]
     ["#cricket-field-diagrams dl dt"] [
       :position :absolute
       :left (px 0)
       :top 0
       :margin 0
       :width (px 148)
       :height (px 148)
       :border [(px 1) :solid "#cccccc"]
       :background-color :white
       :padding 0
     ]
     ["#cricket-field-diagrams dl dt ~ dt"] [
       :left (px 170)
     ]
     ["#cricket-field-diagrams dl dt ~ dt ~ dt"] [
       :left (px 340)
     ]
     ["#cricket-field-diagrams dl dt ~ dt ~ dt ~ dt"] [
       :left (px 0)
       :top (px 191)
     ]
     ["#cricket-field-diagrams dl dt ~ dt ~ dt ~ dt ~ dt"] [
       :left (px 170)
     ]
     ["#cricket-field-diagrams dl dt ~ dt ~ dt ~ dt ~ dt ~ dt"] [
       :left (px 340)
     ]
     ["#cricket-field-diagrams dl dt ~ dd"] [
       :position :absolute
       :left (px 0)
       :top (px 155)
       :width (px 150)
       :text-align :center
     ]
     ["#cricket-field-diagrams dl dt ~ dd ~ dd"] [
       :left (px 170)
     ]
     ["#cricket-field-diagrams dl dt ~ dd ~ dd ~ dd"] [
       :left (px 340)
     ]
     ["#cricket-field-diagrams dl dt ~ dd ~ dd ~ dd ~ dd"] [
       :left (px 0)
       :top (px 346)
     ]
     ["#cricket-field-diagrams dl dt ~ dd ~ dd ~ dd ~ dd ~ dd"] [
       :left (px 170)
     ]
     ["#cricket-field-diagrams dl dt ~ dd ~ dd ~ dd ~ dd ~ dd ~ dd"] [
       :left (px 340)
     ]
     ["#cricket-field-diagrams dl dt img"] [
       :margin (px -1)
       :border :none
     ]

     [".codehilite .hll"] [
       :background-color base2
     ]
     ; Comment
     [".codehilite .c"] [
       :font-style :italic
       :color base1
     ]
     ; Keyword
     [".codehilite .k"] [
       :font-weight :bold
     ]
     ; Operator
     [".codehilite .o"] [
       :font-weight :bold
     ]
     ; Comment.Multiline
     [".codehilite .cm"] [
       :font-style :italic
       :color base1
     ]
     ; Comment.Preproc
     [".codehilite .cp"] [
       :font-weight :bold
       :color base1
     ]
     ; Comment.Single
     [".codehilite .c1"] [
       :font-style :italic
       :color base1
     ]
     ; Comment.Special
     [".codehilite .cs"] [
       :font-style :italic
       :font-weight :bold
       :color base1
     ]
     ; Generic.Emph
     [".codehilite .ge"] [
       :font-style :italic
     ]
     ; Generic.Error
     [".codehilite .gr"] [
       :color red
     ]
     ; Generic.Heading
     [".codehilite .gh"] [
       :color base1
     ]
     ; Generic.Output
     [".codehilite .go"] [
       :color base1
     ]
     ; Generic.Prompt
     [".codehilite .gp"] [
       :color base1
     ]
     ; Generic.Strong
     [".codehilite .gs"] [
       :font-weight :bold
     ]
     ; Generic.Subheading
     [".codehilite .gu"] [
       :color base1
     ]
     ; Generic.Traceback
     [".codehilite .gt"] [
       :color red
     ]
     ; Keyword.Constant
     [".codehilite .kc"] [
       :font-weight :bold
     ]
     ; Keyword.Declaration
     [".codehilite .kd"] [
       :font-weight :bold
     ]
     ; Keyword.Namespace
     [".codehilite .kn"] [
       :font-weight :bold
     ]
     ; Keyword.Pseudo
     [".codehilite .kp"] [
       :font-weight :bold
     ]
     ; Keyword.Reserved
     [".codehilite .kr"] [
       :font-weight :bold
     ]
     ; Keyword.Type
     [".codehilite .kt"] [
       :font-weight :bold
     ]
     ; Literal.Number
     [".codehilite .m"] [
       :color cyan
     ]
     ; Literal.String
     [".codehilite .s"] [
       :color yellow
     ]
     ; Name.Attribute
     [".codehilite .na"] [
       :color cyan
     ]
     ; Name.Class
     [".codehilite .nc"] [
       :font-weight :bold
     ]
     ; Name.Constant
     [".codehilite .no"] [
       :color cyan
     ]
     ; Name.Entity
     [".codehilite .ni"] [
       :color magenta
     ]
     ; Name.Exception
     [".codehilite .ne"] [
       :font-weight :bold
       :color orange
     ]
     ; Name.Function
     [".codehilite .nf"] [
       :font-weight :bold
       :color orange
     ]
     ; Name.Tag
     [".codehilite .nt"] [
       :color blue
     ]
     ; Operator.Word
     [".codehilite .ow"] [
       :font-weight :bold
     ]
     ; Literal.Number.Float
     [".codehilite .mf"] [
       :color cyan
     ]
     ; Literal.Number.Hex
     [".codehilite .mh"] [
       :color cyan
     ]
     ; Literal.Number.Integer
     [".codehilite .mi"] [
       :color cyan
     ]
     ; Literal.Number.Oct
     [".codehilite .mo"] [
       :color cyan
     ]
     ; Literal.String.Backtick
     [".codehilite .sb"] [
       :color yellow
     ]
     ; Literal.String.Char
     [".codehilite .sc"] [
       :color yellow
     ]
     ; Literal.String.Doc
     [".codehilite .sd"] [
       :color yellow
     ]
     ; Literal.String.Double
     [".codehilite .s2"] [
       :color yellow
     ]
     ; Literal.String.Escape
     [".codehilite .se"] [
       :color yellow
     ]
     ; Literal.String.Heredoc
     [".codehilite .sh"] [
       :color yellow
     ]
     ; Literal.String.Interpol
     [".codehilite .si"] [
       :color yellow
     ]
     ; Literal.String.Other
     [".codehilite .sx"] [
       :color yellow
     ]
     ; Literal.String.Regex
     [".codehilite .sr"] [
       :color red
     ]
     ; Literal.String.Single
     [".codehilite .s1"] [
       :color yellow
     ]
     ; Literal.String.Symbol
     [".codehilite .ss"] [
       :color yellow
     ]
     ; Name.Builtin.Pseudo
     [".codehilite .bp"] [
       :color base1
     ]
     ; Name.Variable.Class
     [".codehilite .vc"] [
       :color cyan
     ]
     ; Name.Variable.Global
     [".codehilite .vg"] [
       :color cyan
     ]
     ; Name.Variable.Instance
     [".codehilite .vi"] [
       :color cyan
     ]
     ; Literal.Number.Integer.Long
     [".codehilite .il"] [
       :color cyan
     ]

   ]])))