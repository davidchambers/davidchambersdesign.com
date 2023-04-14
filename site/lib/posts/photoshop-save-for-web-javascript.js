import {p, a, code, strong} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["This is a JavaScript function for Photoshop which saves\n    the active document as a 24-bit PNG file. It is equivalent to\n    manually selecting ", strong(["File > Save for Web & Devices..."]), "\n    which means that the file size of the resulting PNG will be smaller\n    than would be the case using ", code(["PNGSaveOptions()"]), "."]), code$002Dblock("javascript")(`function saveForWebPNG(outputFolderStr, filename)
{
    var opts, file;
    opts = new ExportOptionsSaveForWeb();
    opts.format = SaveDocumentType.PNG;
    opts.PNG8 = false;
    opts.quality = 100;
    if (filename.length > 27) {
        file = new File(outputFolderStr + "/temp.png");
        activeDocument.exportDocument(file, ExportType.SAVEFORWEB, opts);
        file.rename(filename + ".png");
    }
    else {
        file = new File(outputFolderStr + "/" + filename + ".png");
        activeDocument.exportDocument(file, ExportType.SAVEFORWEB, opts);
    }
}
`), p(["Photoshop on Mac limits the length of a ", code(["File"]), "\n    object's file name to 31 characters. Credit for the rename\n    workaround should go to Mark Walsh who posted the solution\n    on the Adobe forums in a thread titled ", a({
  href: "http://forums.adobe.com/thread/290409"
})(["Save for web filename problems"]), "."])];
export default {
  id: 20,
  slug: "photoshop-save-for-web-javascript",
  title: ["Photoshop \"save for web\" JavaScript"],
  datetime: datetime("2009-07-28 03:27:00 (Pacific/Auckland)"),
  tags: ["javascript", "mac-os-x", "photoshop"],
  body
};
