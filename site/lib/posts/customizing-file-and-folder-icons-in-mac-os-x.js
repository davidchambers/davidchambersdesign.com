import {a, code, h3, img, li, ol, p, strong} from "../elements.js";
import {captioned$002Dimages, code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const Prelude = {
  operators: {
    unary: {
      ["~"]: operand => ~operand
    },
    binary: {
      ["<<"]: rhs => lhs => lhs << rhs,
      [">>"]: rhs => lhs => lhs >> rhs,
      [">>>"]: rhs => lhs => lhs >>> rhs,
      ["&"]: rhs => lhs => lhs & rhs,
      ["^"]: rhs => lhs => lhs ^ rhs,
      ["|"]: rhs => lhs => lhs | rhs
    }
  },
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => Prelude["match'"](type)(x => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  quot: lhs => rhs => rhs === 0 ? DivisionByZero : lhs / rhs | 0,
  rem: lhs => rhs => rhs === 0 ? DivisionByZero : lhs % rhs,
  div: lhs => rhs => rhs === 0 ? DivisionByZero : Math.floor(lhs / rhs),
  mod: lhs => rhs => rhs === 0 ? DivisionByZero : (lhs % rhs + rhs) % rhs,
  equals: this$ => that => Array.isArray(this$) ? Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => Prelude.equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => x => x[Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => Prelude.filter(x => Prelude.not(f(x))),
  map: f => x => Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => x => Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f)
};
const {operators, _apply, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
const excerpt = [p(["Customizing the appearance of files and folders in OS X is\n    a cinch. ⌘C, ⌘I, ⌘V, punctuated by a few mouse clicks."]), p([strong(["Actually, that's total bullshit."])]), p(["Sure, in the simplest of cases the copy and paste approach\n    gets the job done, assuming one knows to copy from Preview.app\n    if copying from the original source fails. As soon as one decides\n    to do something a bit more advanced, such as providing versions\n    for display at different sizes, one's shit outta luck."])];
const body = [...excerpt, h3(["Creating .icns and applying them to files, folders, or bundles"]), ol([li([p([img({
  alt: "",
  src: "/images/posts/decorative/right/photoshop-icon.png"
})]), p(["Create icon versions at one or more of the following sizes:\n        16, 32, 128, 256, and 512. (I've created two very different\n        images for this tutorial.)"]), p([img({
  alt: "16x16 icon",
  src: "/images/posts/72/16x16-icon.png"
})]), p([img({
  alt: "32x32 icon",
  src: "/images/posts/72/32x32-icon.png"
})]), p(["Save the images in a lossless format such as PNG.\n        (If saving from Photoshop, make sure to use ", strong(["Save for Web & Devices"]), ". Icon Composer\n        doesn't like PNG files generated via Photoshop's ", strong(["Save"]), " / ", strong(["Save As"]), ".)"]), p([img({
  alt: "Save for Web & Devices",
  src: "/images/posts/72/save-for-web-and-devices.png"
})])]), li([p([img({
  alt: "",
  src: "/images/posts/decorative/right/icon-composer-icon.png"
})]), p(["Open ", a({
  href: "http://en.wikipedia.org/wiki/Apple_Developer_Tools#Icon_Composer"
})(["Icon Composer"]), ",\n        located in ", strong(["/Developer/Applications/Utilities"]), ".\n        This is part of the ", a({
  href: "http://developer.apple.com/technologies/tools/"
})(["Apple Developer Tools"]), ", which are free to ", a({
  href: "http://developer.apple.com/technologies/xcode.html"
})(["download from Apple"]), ". If you're bandwidth-conscious\n        you can dig out your Mac OS X installation DVD to save\n        yourself a few GBs."]), captioned$002Dimages([{
  alt: "Icon Composer interface",
  src: "/images/posts/72/icon-composer-interface.png",
  caption: ["Icon Composer interface"]
}]), p(["Copy and paste the various versions into their respective\n        slots. (The foolproof way to copy an icon is to open it in\n        Preview, ⌘A to select, then ⌘C to copy.)"]), p(["Save the Icon Composer file. This'll create a single ", strong([".icns"]), " file containing all the different\n        versions you included."])]), li([p([img({
  alt: "",
  src: "/images/posts/decorative/right/terminal-icon.png"
})]), p(["The final step is to apply attach the .icns file as\n        metadata to the file, folder, or bundle of interest.\n        There are a plethora of apps which provide this\n        functionality via attractive GUIs, but one shouldn't\n        need third-party software to change the appearance\n        of a folder!"]), p(["I scoured the Web for a way to edit this metadata\n        directly. I failed to find one, but came across ", a({
  href: "http://www.cocoabuilder.com/archive/xcode/250445-custom-icon-for-bundle.html#250519"
})(["the next best thing"]), ": a shell script written and\n        kindly shared by Damien Bobillot. ", a({
  href: "http://maxao.free.fr/telechargements/setfileicon.gz"
})(["Download setfileicon.gz"]), " then crack open Terminal.app,\n        located in ", strong(["/Applications/Utilities"]), "."]), p(["In Terminal, navigate to your ", strong(["Downloads"]), "\n        folder (or wherever you saved the script)."]), code$002Dblock("console")(`$ cd ~/Downloads
$ ls
`), p(["Run the ", code(["ls"]), " command to inspect the contents of\n        the directory. If you used Safari to download the script, you\n        should see a file named ", code(["setfileicon"]), ". If you used\n        another browser you'll likely see ", code(["setfileicon.gz"]), ";\n        unzip it by double-clicking the file in Finder."]), p(["Make the script executable and move it to your ", strong(["/bin"]), " directory so that it can be run from\n        any directory (you'll be asked to enter your password)."]), code$002Dblock("console")(`$ chmod 555 setfileicon
$ sudo mv setfileicon /bin/setfileicon
`), p(["Finally, run the script passing in two arguments: the\n        path to the .icns file; and the path to the file, folder,\n        or bundle to which you'd like to attach the icons."]), code$002Dblock("console")(`$ setfileicon ~/icons.icns ~/example
`)])]), h3(["TL;DR"]), p(["I agree. It shouldn't be this difficult. At least I've now\n    documented the convoluted process. :s"]), captioned$002Dimages([{
  alt: "Icons in situ",
  src: "/images/posts/72/icons-in-situ.png",
  caption: ["Icons in situ (note the 16x16 icon in the sidebar)"]
}])];
export default {
  id: 72,
  slug: "customizing-file-and-folder-icons-in-mac-os-x",
  title: ["Customizing file and folder icons in Mac OS X"],
  datetime: datetime("2010-09-29")("00:00:00")("Pacific/Auckland"),
  tags: ["icons", "mac-os-x", "terminal.app"],
  body
};
