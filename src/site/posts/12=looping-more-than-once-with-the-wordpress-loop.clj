(import* [:base "../elements" "../components"] {

  :title "Looping more than once with the WordPress loop"

  :datetime (datetime "2009-04-17" "00:34:00" :Pacific/Auckland)

  :tags [:php :wordpress]

  :body [

    (p
       ["When I decided to write my own WordPress theme, I thought a
         good approach would be to duplicate the default theme and go
         from there. Since that day I have rewritten much of the code.
         The loop in the index.php file, however, remains unchanged.
         The loop looks like this:"])

    (code-block :php

       """
       if (have_posts()) :
           while (have_posts()) : the_post();
               // code
           endwhile;
       endif;
       """)

    (p
       ["As well as displaying the three most recent posts on the
         home page, I wanted to display links to slightly older
         posts on the sidebar. I discovered a WpRecipes post on "
        (a "http://www.wprecipes.com/avinash-asked-how-to-use-two-different-wordpress-loops"
           "using two different WordPress loops") " which suggests
         adding the following line of code just before the loop:"])

    (code-block :php

       """
       query_posts('showposts=5&offset=3');
       """)

    (p
       ["The " (code "offset") " ensures that posts do not appear
         in both places."])

  ]

})
