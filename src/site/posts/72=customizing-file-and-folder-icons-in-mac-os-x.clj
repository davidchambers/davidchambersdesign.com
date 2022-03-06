(import* [:base "../elements" "../components"] {

  :title "Customizing file and folder icons in Mac OS X"

  :datetime (datetime "2010-09-29" "00:00:00" :Pacific/Auckland)

  :tags [:icons :mac-os-x :terminal.app]

  :body [

    (excerpt

       [(p
           ["Customizing the appearance of files and folders in OS X is
             a cinch. ⌘C, ⌘I, ⌘V, punctuated by a few mouse clicks."])

        (p
           [(strong "Actually, that's total bullshit.")])

        (p
           ["Sure, in the simplest of cases the copy and paste approach
             gets the job done, assuming one knows to copy from Preview.app
             if copying from the original source fails. As soon as one decides
             to do something a bit more advanced, such as providing versions
             for display at different sizes, one's shit outta luck."])])

    (h3 "Creating .icns and applying them to files, folders, or bundles")

    (ol

       [(li

           [(decorative-image
               "/images/posts/decorative/right/photoshop-icon.png")

            (p
               ["Create icon versions at one or more of the following sizes:
                 16, 32, 128, 256, and 512. (I've created two very different
                 images for this tutorial.)"])

            (uncaptioned-image
               "/images/posts/72/16x16-icon.png"
               "16x16 icon")

            (uncaptioned-image
               "/images/posts/72/32x32-icon.png"
               "32x32 icon")

            (p
               ["Save the images in a lossless format such as PNG.
                 (If saving from Photoshop, make sure to use "
                (strong "Save for Web & Devices") ". Icon Composer
                 doesn't like PNG files generated via Photoshop's "
                (strong "Save") " / " (strong "Save As") ".)"])

            (uncaptioned-image
               "/images/posts/72/save-for-web-and-devices.png"
               "Save for Web & Devices")])

        (li

           [(decorative-image
               "/images/posts/decorative/right/icon-composer-icon.png")

            (p
               ["Open "
                (a "http://en.wikipedia.org/wiki/Apple_Developer_Tools#Icon_Composer"
                   "Icon Composer") ", located in "
                (strong "/Developer/Applications/Utilities") ".
                 This is part of the "
                (a "http://developer.apple.com/technologies/tools/"
                   "Apple Developer Tools") ", which are free to "
                (a "http://developer.apple.com/technologies/xcode.html"
                   "download from Apple") ". If you're bandwidth-conscious
                 you can dig out your Mac OS X installation DVD to save
                 yourself a few GBs."])

            (captioned-image
               "/images/posts/72/icon-composer-interface.png"
               "Icon Composer interface"
               "Icon Composer interface")

            (p
               ["Copy and paste the various versions into their respective
                 slots. (The foolproof way to copy an icon is to open it in
                 Preview, ⌘A to select, then ⌘C to copy.)"])

            (p
               ["Save the Icon Composer file. This'll create a single "
                (strong ".icns") " file containing all the different
                 versions you included."])])

        (li

           [(decorative-image
               "/images/posts/decorative/right/terminal-icon.png")

            (p
               ["The final step is to apply attach the .icns file as
                 metadata to the file, folder, or bundle of interest.
                 There are a plethora of apps which provide this
                 functionality via attractive GUIs, but one shouldn't
                 need third-party software to change the appearance
                 of a folder!"])

            (p
               ["I scoured the Web for a way to edit this metadata
                 directly. I failed to find one, but came across "
                (a "http://www.cocoabuilder.com/archive/xcode/250445-custom-icon-for-bundle.html#250519"
                   "the next best thing") ": a shell script written and
                 kindly shared by Damien Bobillot. "
                (a "http://maxao.free.fr/telechargements/setfileicon.gz"
                   "Download setfileicon.gz") " then crack open Terminal.app,
                 located in " (strong "/Applications/Utilities") "."])

            (p
               ["In Terminal, navigate to your " (strong "Downloads") "
                 folder (or wherever you saved the script)."])

            (code-block :console

               """
               $ cd ~/Downloads
               $ ls
               """)

            (p
               ["Run the " (code "ls") " command to inspect the contents of
                 the directory. If you used Safari to download the script, you
                 should see a file named " (code "setfileicon") ". If you used
                 another browser you'll likely see " (code "setfileicon.gz") ";
                 unzip it by double-clicking the file in Finder."])

            (p
               ["Make the script executable and move it to your "
                (strong "/bin") " directory so that it can be run from
                 any directory (you'll be asked to enter your password)."])

            (code-block :console

               """
               $ chmod 555 setfileicon
               $ sudo mv setfileicon /bin/setfileicon
               """)

            (p
               ["Finally, run the script passing in two arguments: the
                 path to the .icns file; and the path to the file, folder,
                 or bundle to which you'd like to attach the icons."])

            (code-block :console

               """
               $ setfileicon ~/icons.icns ~/example
               """)])])

    (h3 "TL;DR")

    (p
       ["I agree. It shouldn't be this difficult. At least I've now
         documented the convoluted process. :s"])

    (captioned-image
       "/images/posts/72/icons-in-situ.png"
       "Icons in situ"
       "Icons in situ (note the 16x16 icon in the sidebar)")

  ]

})
