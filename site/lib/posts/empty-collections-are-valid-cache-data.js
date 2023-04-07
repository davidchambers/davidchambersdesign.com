import {code, p} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["When using Django's cache, ensure that empty collections\n    (", code(["[]"]), ", ", code(["()"]), ", ", code(["{}"]), ")\n    are treated as valid cache data."]), code$002Dblock("python")(`cached = cache.get(cache_key)
if cached:
    return cached

# perform expensive operation
`), p(["In the above snippet, if the call to ", code(["get"]), "\n    returns an empty collection the cached result is ignored\n    and the value is recalculated unnecessarily."]), p(["Avoid this by explicitly comparing the return value to ", code(["None"]), ":"]), code$002Dblock("python")(`cached = cache.get(cache_key)
if cached is not None: # much better!
    return cached
`), p(["Django's documentation wisely advises against caching the literal value ", code(["None"]), ", and the above snippet makes it clear why this is good\n    advice – the ", code(["get"]), " method returns ", code(["None"]), " when\n    the cache does not contain an entry for the supplied key."])];
export default {
  id: 57,
  slug: "empty-collections-are-valid-cache-data",
  title: ["Empty collections are valid cache data"],
  datetime: datetime("2010-07-06 09:34:00 (Pacific/Auckland)"),
  tags: ["django"],
  body
};
