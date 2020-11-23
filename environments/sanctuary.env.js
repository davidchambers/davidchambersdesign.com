import S from 'sanctuary';


//    rename :: String -> String
const rename = name => (
  name
  .replace (/(?!\b)[A-Z]/g, c => '-' + c.toLowerCase ())
  .replace (/_/g, "'")
);

//    renameKeys :: Object -> Object
const renameKeys = object => (
  Object.fromEntries (
    Object.entries (object)
    .map (([key, value]) => [rename (key), value])
  )
);

export default {...(renameKeys (S)), unchecked: renameKeys (S.unchecked)};
