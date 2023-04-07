import * as path from "https://deno.land/std@0.182.0/path/mod.ts";
const basename = path_ => suffix => path.basename(path_, suffix);
const dirname = path.dirname;
const $join = components => path.join(...components);
const relative = from => to => path.relative(from, to);
export {basename, dirname, $join as join, relative};
