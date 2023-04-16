import {h3, p, ol, li, a, code, strong, img} from "../elements.js";
import {captioned$002Dimages, code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const excerpt = [p(["Customizing the appearance of files and folders in OS X is ", "a cinch. ⌘C, ⌘I, ⌘V, punctuated by a few mouse clicks."]), p([strong(["Actually, that's total bullshit."])]), p(["Sure, in the simplest of cases the copy and paste approach ", "gets the job done, assuming one knows to copy from Preview.app ", "if copying from the original source fails. As soon as one decides ", "to do something a bit more advanced, such as providing versions ", "for display at different sizes, one's shit outta luck."])];
const body = [...excerpt, h3(["Creating .icns and applying them to files, folders, or bundles"]), ol([li([p([img({
  alt: "",
  src: "/images/posts/decorative/right/photoshop-icon.png"
})]), p(["Create icon versions at one or more of the following sizes: ", "16, 32, 128, 256, and 512. (I've created two very different ", "images for this tutorial.)"]), p([img({
  alt: "16x16 icon",
  src: "/images/posts/72/16x16-icon.png"
})]), p([img({
  alt: "32x32 icon",
  src: "/images/posts/72/32x32-icon.png"
})]), p(["Save the images in a lossless format such as PNG. ", "(If saving from Photoshop, make sure to use ", strong(["Save for Web & Devices"]), ". Icon Composer ", "doesn't like PNG files generated via Photoshop's ", strong(["Save"]), " / ", strong(["Save As"]), ".)"]), p([img({
  alt: "Save for Web & Devices",
  src: "/images/posts/72/save-for-web-and-devices.png"
})])]), li([p([img({
  alt: "",
  src: "/images/posts/decorative/right/icon-composer-icon.png"
})]), p(["Open ", a({
  href: "http://en.wikipedia.org/wiki/Apple_Developer_Tools#Icon_Composer"
})(["Icon Composer"]), ", ", "located in ", strong(["/Developer/Applications/Utilities"]), ". ", "This is part of the ", a({
  href: "http://developer.apple.com/technologies/tools/"
})(["Apple Developer Tools"]), ", which are free to ", a({
  href: "http://developer.apple.com/technologies/xcode.html"
})(["download from Apple"]), ". If you're bandwidth-conscious ", "you can dig out your Mac OS X installation DVD to save ", "yourself a few GBs."]), captioned$002Dimages([{
  alt: "Icon Composer interface",
  src: "/images/posts/72/icon-composer-interface.png",
  caption: ["Icon Composer interface"]
}]), p(["Copy and paste the various versions into their respective ", "slots. (The foolproof way to copy an icon is to open it in ", "Preview, ⌘A to select, then ⌘C to copy.)"]), p(["Save the Icon Composer file. This'll create a single ", strong([".icns"]), " file containing all the different ", "versions you included."])]), li([p([img({
  alt: "",
  src: "/images/posts/decorative/right/terminal-icon.png"
})]), p(["The final step is to apply attach the .icns file as ", "metadata to the file, folder, or bundle of interest. ", "There are a plethora of apps which provide this ", "functionality via attractive GUIs, but one shouldn't ", "need third-party software to change the appearance ", "of a folder!"]), p(["I scoured the Web for a way to edit this metadata ", "directly. I failed to find one, but came across ", a({
  href: "http://www.cocoabuilder.com/archive/xcode/250445-custom-icon-for-bundle.html#250519"
})(["the next best thing"]), ": a shell script written and ", "kindly shared by Damien Bobillot. ", a({
  href: "http://maxao.free.fr/telechargements/setfileicon.gz"
})(["Download setfileicon.gz"]), " then crack open Terminal.app, ", "located in ", strong(["/Applications/Utilities"]), "."]), p(["In Terminal, navigate to your ", strong(["Downloads"]), " ", "folder (or wherever you saved the script)."]), code$002Dblock("console")("$ cd ~/Downloads\n$ ls\n      "), p(["Run the ", code(["ls"]), " command to inspect the contents of ", "the directory. If you used Safari to download the script, you ", "should see a file named ", code(["setfileicon"]), ". If you used ", "another browser you'll likely see ", code(["setfileicon.gz"]), "; ", "unzip it by double-clicking the file in Finder."]), p(["Make the script executable and move it to your ", strong(["/bin"]), " directory so that it can be run from ", "any directory (you'll be asked to enter your password)."]), code$002Dblock("console")("$ chmod 555 setfileicon\n$ sudo mv setfileicon /bin/setfileicon\n      "), p(["Finally, run the script passing in two arguments: the ", "path to the .icns file; and the path to the file, folder, ", "or bundle to which you'd like to attach the icons."]), code$002Dblock("console")("$ setfileicon ~/icons.icns ~/example\n      ")])]), h3(["TL;DR"]), p(["I agree. It shouldn't be this difficult. At least I've now ", "documented the convoluted process. :s"]), captioned$002Dimages([{
  alt: "Icons in situ",
  src: "/images/posts/72/icons-in-situ.png",
  caption: ["Icons in situ (note the 16x16 icon in the sidebar)"]
}])];
export default {
  id: 72,
  slug: "customizing-file-and-folder-icons-in-mac-os-x",
  title: ["Customizing file and folder icons in Mac OS X"],
  datetime: datetime("2010-09-29 00:00:00 (Pacific/Auckland)"),
  tags: ["icons", "mac-os-x", "terminal.app"],
  body
};
