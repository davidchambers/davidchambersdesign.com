(import ["../elements"]

(let [
  code-block          (require "../components/code-block")
  datetime            (require "../datetime")
] {

  :id 7

  :slug "wordpress-login-redirect"

  :title "WordPress login redirect"

  :datetime (datetime "2009-03-01" "03:01:00" :Pacific/Auckland)

  :tags [:php :wordpress]

  :body [

    (p
       ["Sometimes we require users to log in to a WordPress site in order
         to access " (em "front-end") " functionality hidden from guests.
         In such instances, we can simply provide a standard login link:"])

    (code-block :php

       "
       <a href=\"<?php bloginfo('url'); ?>/wp-login.php\">log in</a>
       ")

    (p
       ["While this gets the job done, it takes users to the dashboard after
         they have logged in: they must then click on a link to return to the
         front-end, at which point an additional click may be required to get
         them back to the page they were viewing. Since WordPress 2.6.2 it has
         been possible to circumvent this round trip from " (strong "origin") "
         to " (strong "wp-login.php") " to " (strong "wp-admin/") " to "
        (strong "/") " and finally back to " (strong "origin") " by including
         a value for " (code "redirect_to") " in the href:"])

    (code-block :php

       "
       <a href=\"<?php bloginfo('url'); ?>/wp-login.php?redirect_to=<?php echo urlencode($_SERVER['REQUEST_URI']); ?>\">log in</a>
       ")

    (p
       ["The above returns users to their starting point after they've
         logged in."])

  ]

}))
