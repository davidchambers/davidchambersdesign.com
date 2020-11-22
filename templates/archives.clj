(html {}
  (head {}
    (map (lambda [x]
           (link {:rel "stylesheet"
                  :href (str "https://cdn.jsdelivr.net/gh/davidchambers/davidchambersdesign.com@e76370b258761898ea0b63d1e14aa4caa4e7c359/src/css/"
                             (get :name x))
                  :media (get :media x)}))
         [{:name "reset.css"  :media "all"}
          {:name "print.css"  :media "print"}
          {:name "screen.css" :media "screen"}])))
