(import* [:base "../elements" "../components"] {

  :id 93

  :title "iTunes: Surprisingly useful when learning a foreign language"

  :datetime (datetime "2012-01-29" "19:20:00" :America/Los_Angeles)

  :tags [:itunes :language :mac-os-x]

  :body [

    (excerpt

       [(p
           ["I recently began learning Danish. I'm taking a weekly class, and
             the first week's homework involved listening to the conversations
             we covered during the lesson. I began by playing the audio files,
             following along in the Danish transcripts. I found myself wanting
             to listen to the difficult parts over and over, but scrubbing
             through a timeline is rather awkward."])

        (p
           ["It occurred to me that I could use iTunes to solve this problem.
             Normally, iTunes will play a track from beginning to end. It's
             possible, though, to specify a certain portion of the track to be
             played instead. By adding an audio file to a playlist many times
             and specifying consecutive portions (e.g. 0:00–0:02, 0:02–0:04.8,
             ...), a track can be broken into manageable clips for more
             convenient navigation."])

        (p
           ["Here's the end result:"])

        (uncaptioned-image
           "/images/posts/93/windows/lion/itunes-playlist-for-danish-dialogue.png"
           "iTunes playlist for Danish dialogue")])

    (h3 "Creating an iTunes playlist from a single audio file")

    (ol

       [(li

           [(p
               ["Open iTunes and create a playlist. I named mine
                 \"danske\"."])])

        (li

           [(p
               ["Locate the audio file in Finder."])])

        (li

           [(p
               ["Drag the file from the Finder window, and drop it
                 onto the iTunes icon in the dock. This will make a
                 copy of the file in your \"iTunes Music\" folder."])])

        (li

           [(p
               ["Drag the file from the Finder window, and drop it onto
                 the newly created playlist in the iTunes sidebar."])])

        (li

           [(p
               ["Select the track in iTunes, then hit " (strong "⌘I") "
                 (or select " (strong "Get Info") " from the "
                (strong "File") " menu)."])])

        (li

           [(p
               ["Click the " (strong "Options") " tab and enter a "
                (strong "Stop Time") ". Click " (strong "OK") "."])

            (uncaptioned-image
               "/images/posts/93/windows/lion/setting-the-stop-time.png"
               "Setting the clip's stop time")])

        (li

           [(p
               ["Play the clip, and adjust the stop time until the clip
                 contains just the desired portion of the dialogue."])])

        (li

           [(p
               ["Hit " (strong "⌘I") " again, and this time click the "
                (strong "Info") " tab. Type the clip's transcription
                 into the " (strong "Name") " field."])

            (uncaptioned-image
               "/images/posts/93/windows/lion/setting-the-name.png"
               "Setting the clip's name")])

        (li

           [(p
               ["Repeat steps 4 through 8 as necessary. Ensure that
                 each clip's start time is the same as the previous
                 clip's stop time."])])

        (li

           [(p
               ["Select all of the newly added clips. Hit " (strong "⌘I") ".
                 In the " (strong "Album") " field, type the name of the
                 audio file. Click " (strong "OK") "."])])])

    (p
       ["Having a dialog comprised of many short clips is very useful.
         It enables one to listen to a clip repeatedly to practise a
         difficult word or phrase, or to say each sentence aloud before
         listening to the \"answer\". And since the clips are contiguous
         one can still listen to the dialog from beginning to end."])

  ]

})