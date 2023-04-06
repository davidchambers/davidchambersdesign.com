import * as path from "https://deno.land/std@0.182.0/path/mod.ts";
const apply = f => args => f.apply(null, args);
const basename = path_ => suffix => apply(path.basename)([path_, suffix]);
const dirname = path.dirname;
const $join = apply(path.join);
const relative = from => to => apply(path.relative)([from, to]);
export {basename, dirname, $join as join, relative};
