(import* [:base "../elements" "../components"] {

  :id 64

  :title "Man after my own heart"

  :datetime (datetime "2010-07-23" "00:07:00" :Pacific/Auckland)

  :tags [:architecture :design]

  :body [

    (p
       ["From Wikipedia on Mies van der Rohe's "
        (a "http://en.wikipedia.org/wiki/Seagram_Building"
           "Seagram Building") ":"])

    (blockquote
       [(p
           ["[An] interesting feature of the Seagram Building is the
             window blinds. As was common with International Style
             architects, Mies wanted the building to have a uniform
             appearance. One aspect of a façade which Mies disliked,
             was the disordered irregularity when window blinds are
             drawn. Inevitably, people using different windows will
             draw blinds to different heights, making the building
             appear disorganized. To reduce this disproportionate
             appearance, Mies specified window blinds which only
             operated in three positions – fully open, halfway
             open/closed, or fully closed."])])

    (p
       ["This, taken from Werner Blaser's " (i "Mies van der Rohe") ",
         is also brilliant:"])

    (blockquote
       [(p
           ["The plan of the brick villa is a good example of the
             way in which Mies van der Rohe developed the art of
             structure from the very beginning. The structure of
             a brick wall begins with the smallest unit into which
             the whole can be divided: the brick. The dimensions are
             calculated in terms of the basic unit of the brick."])])

  ]

})