(import* ["../elements"]

(let [
  uncaptioned-image (require "../components/uncaptioned-image")
] {

  :slug "elam"

  :title "Elam"

  :body [

    (p
       ["I attended Elam School of Fine Arts in Auckland between 2002 and 2005.
         After the general first-year course I majored in graphic design. Below
         are examples of the work I produced as part of that programme."])

    (ul
       [(li (a "#2003" "2003"))
        (li (a "#2004" "2004"))
        (li (a "#2005" "2005"))])

    (h3' {:id "2003"} "2003")

    (h4 "Design philosophies poster")

    (p
       [(b "Brief.") " Express your personal design philosophies in a design
        manifesto. This may take the form of a booklet, pamphlet or poster."])

    (uncaptioned-image
       "/images/elam/lightbox/design-philosophies-poster.png"
       "Design philosophies: simple, sensible, sustainable")

    (h4 "Sugar awareness billboard campaign")

    (p
       [(b "Brief.") " Create a billboard campaign to increase public awareness
        of the dangers of excessive sugar consumption. The aim is to present the
        dangers without coming across as \"preachy\"."])

    (uncaptioned-image
       "/images/elam/sugar-billboards/dizzy-snake.jpg"
       "Excessive sugar consumption can cause dizziness")

    (uncaptioned-image
       "/images/elam/sugar-billboards/breast-cancer.jpg"
       "Excessive sugar consumption can cause breast cancer")

    (uncaptioned-image
       "/images/elam/sugar-billboards/plane-crash.jpg"
       "Excessive sugar consumption can impair concentration")

    (h3' {:id "2004"} "2004")

    (h4 [(i "Caligula") " poster"])

    (p
       [(b "Brief.") " Design a poster to promote the Auckland Theatre Company's
        production of " (i "Caligula") ". The poster must appeal to young people,
        as this play was chosen as part of an effort to attract more young people
        to theatre. Copy provided. A1."])

    (uncaptioned-image
       "/images/elam/lightbox/caligula-poster.png"
       "Poster for the play Caligula")

    (uncaptioned-image
       "/images/elam/caligula-typography.png"
       "Typography used in Caligula poster")

    (h4 [(i "tyypo") " magazine"])

    (p
       [(b "Brief.") " Design a magazine of any size and any nature.
        (I chose to design a typography magazine, which I named " (i "tyypo") ".
        Actual size: A4.)"])

    (uncaptioned-image
       "/images/elam/lightbox/tyypo-cover.png"
       "tyypo magazine cover")

    (h4 "Elam open days poster")

    (p
       [(b "Brief.") " Design a poster to advertise the 2004 Elam open days.
        To be displayed around the city, and sent to secondary schools. A1."])

    (uncaptioned-image
       "/images/elam/lightbox/elam-open-days-poster.png"
       "Elam open days poster")

    (h4 "Panprint calendar competition")

    (p
       [(b "Brief.") " Design a page for possible inclusion in the 2004 Panprint
        calendar. Panprint produces a calendar each year as a way to promote its
        services, and the work of young designers. This year the theme is \"true
        colours\". A1."])

    (uncaptioned-image
       "/images/elam/lightbox/panprint-poster.jpg"
       "Panprint poster")

    (h3' {:id "2005"} "2005")

    (h4 "Gameplayer brand identity")

    (p
       [(b "Brief.") " Design a brand identity for Gameplayer, a company
        that runs tournaments in Auckland for four trading card games: "
        (i "Magic: The Gathering") ", " (i "Duel Masters") ", " (i "Yu-Gi-Oh!") "
        and " (i "VS System") ". The identity must appeal to those between 12
        and 24 years of age, without marginalizing older players of the games."])

    (uncaptioned-image
       "/images/elam/gameplayer-business-card-james.png"
       "Gameplayer business card (James)")

    (uncaptioned-image
       "/images/elam/gameplayer-business-card-cici.png"
       "Gameplayer business card (Cici)")

    (uncaptioned-image
       "/images/elam/gameplayer-promotional-card.png"
       "Gameplayer promotional card")

    (h4 "Playing card design")

    (p
       ["Playing cards are an example of graphic design in its purest form.
         Balance, composition and consistency are all vitally important
         ingredients in playing card design. Typography, too, plays an
         important role."])

    (p
       ["Rockwell was used as the starting point for the characters on each card.
         As an eccentric, slab-serif typeface Rockwell has few applications, but
         the consistent weight and overall blackness of its letterforms make it
         suitable for this purpose. Several of the characters were tweaked to iron
         out idiosyncrasies: Rockwell's \"A\" is not symmetrical, for example.
         The \"J\" and the \"Q\" required complete remodelling."])

    (p
       ["Geometry was the driving force behind the design of the suit symbols.
         Initially, the diamond was a square rotated forty-five degrees, and
         the heart-shaped element of the spade was identical in shape and size
         to the heart itself."])

    (p
       ["It soon became apparent that geometry should not drive the design
         of the symbols – instead, the human eye should be the judge. Many
         adjustments were made on this basis: the heart was increased in size
         to bring its surface area close to that of the spade; the club's upper
         leaf was made slightly larger so that all three leaves appear equal
         in size; and all straight edges were given gentle concave curves to
         prevent them from \"bulging\"."])

    (uncaptioned-image
       "/images/elam/playing-cards.jpg"
       "Playing cards")

    (h4 [(i "Exposure05") " catalogue"])

    (p
       [(b "Brief.") " Design the catalogue for the annual end-of-year
        exposition organized by the University of Auckland Postgraduate
        Students' Association."])

    (uncaptioned-image
       "/images/elam/exposure-cover.jpg"
       "Exposure magazine cover")

    (uncaptioned-image
       "/images/elam/exposure-spread.jpg"
       "Exposure magazine spread")

    (h4 "\"Insight Drive\"")

    (p
       ["While at Insight, I was asked to design the packaging for an unusual
         Christmas gift. Earlier in the year, Insight had sent branded model
         Mini Coopers to its most valued clients. These cars had proven
         extremely popular, so it was decided that a faster motor would be
         sent to each Mini owner at the end of the year (to get a little more
         mileage from the initiative). The engines themselves did not possess
         much aesthetic appeal, so the challenge was to package them in an
         exciting way."])

    (uncaptioned-image
       "/images/elam/insight-drive.jpg"
       "Packaged motors ready to send")

  ]

}))
