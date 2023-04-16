import {p, a, code, strong} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["This is a JavaScript function for Photoshop which saves the active ", "document as a 24-bit PNG file. It is equivalent to manually selecting ", strong(["File > Save for Web & Devices..."]), " which means that the file ", "size of the resulting PNG will be smaller than would be the case using ", code(["PNGSaveOptions()"]), "."]), code$002Dblock("javascript")("function saveForWebPNG(outputFolderStr, filename)\n{\n    var opts, file;\n    opts = new ExportOptionsSaveForWeb();\n    opts.format = SaveDocumentType.PNG;\n    opts.PNG8 = false;\n    opts.quality = 100;\n    if (filename.length > 27) {\n        file = new File(outputFolderStr + \"/temp.png\");\n        activeDocument.exportDocument(file, ExportType.SAVEFORWEB, opts);\n        file.rename(filename + \".png\");\n    }\n    else {\n        file = new File(outputFolderStr + \"/\" + filename + \".png\");\n        activeDocument.exportDocument(file, ExportType.SAVEFORWEB, opts);\n    }\n}\n  "), p(["Photoshop on Mac limits the length of a ", code(["File"]), " ", "object's file name to 31 characters. Credit for the rename ", "workaround should go to Mark Walsh who posted the solution ", "on the Adobe forums in a thread titled ", a({
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
