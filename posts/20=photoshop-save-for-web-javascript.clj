(import* ["../src/elements.clj" "../src/components.clj"] {

  :title "Photoshop \"save for web\" JavaScript"

  :datetime (datetime "2009-07-28" "03:27:00" :Pacific/Auckland)

  :tags [:javascript :mac-os-x :photoshop]

  :body [

    (p
       ["This is a JavaScript function for Photoshop which saves
         the active document as a 24-bit PNG file. It is equivalent to
         manually selecting " (strong "File > Save for Web & Devices...") "
         which means that the file size of the resulting PNG will be smaller
         than would be the case using " (code "PNGSaveOptions()") "."])

    (code-block :javascript
       "function saveForWebPNG(outputFolderStr, filename)
        {
            var opts, file;
            opts = new ExportOptionsSaveForWeb();
            opts.format = SaveDocumentType.PNG;
            opts.PNG8 = false;
            opts.quality = 100;
            if (filename.length > 27) {
                file = new File(outputFolderStr + \"/temp.png\");
                activeDocument.exportDocument(file, ExportType.SAVEFORWEB, opts);
                file.rename(filename + \".png\");
            }
            else {
                file = new File(outputFolderStr + \"/\" + filename + \".png\");
                activeDocument.exportDocument(file, ExportType.SAVEFORWEB, opts);
            }
        }")

    (p
       ["Photoshop on Mac limits the length of a " (code "File") "
         object's file name to 31 characters. Credit for the rename
         workaround should go to Mark Walsh who posted the solution
         on the Adobe forums in a thread titled "
        (a "http://forums.adobe.com/thread/290409"
           "Save for web filename problems") "."])

  ]

})
