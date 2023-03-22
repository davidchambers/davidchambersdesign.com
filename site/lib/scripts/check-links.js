import {
  attemptP,
  bichain,
  fork,
  parallel,
  resolve
} from 'fluture';
import S from 'sanctuary';
import posts from '../posts/index.js';
const absolute$003F = url => url.startsWith('http:') || url.startsWith('https:');
const links = node => node.name === 'a' ? [node.attributes.href].filter(absolute$003F) : 'children' in node ? node.children.flatMap(links) : [];
const status = url => bichain(err => resolve({
  url: url,
  status: err.cause.code
}))(res => resolve({
  url: url,
  status: res.status
}))(attemptP(() => fetch(url, {
  method: 'HEAD',
  redirect: 'manual'
})));
const bold = text => `\x1B[1m${ text }\x1B[22m`;
const invert = text => `\x1B[7m${ text }\x1B[27m`;
const red = text => `\x1B[31m${ text }\x1B[0m`;
const yellow = text => `\x1B[33m${ text }\x1B[0m`;
const cyan = text => `\x1B[36m${ text }\x1B[0m`;
const format = ({
  url: url,
  status: status
}) => typeof status === 'string' ? (() => {
  const indent = ' '.repeat(Math.max(0, 15 - status.length));
  return red(`${ indent }${ invert(bold(status)) } ${ url }`);
})() : status >= 200 && status < 300 ? `            ${ bold(status) } ${ url }` : status >= 300 && status < 400 ? yellow(`            ${ bold(status) } ${ url }`) : status >= 400 && status < 500 ? red(`            ${ bold(status) } ${ url }`) : cyan(`            ${ bold(status) } ${ url }`);
const program = Array.isArray(Array.isArray(parallel(16)(Array.isArray(S.sort(Array.from(Reflect.construct(Set, [S.chain(post => S.chain(links)(post.body))(posts)]).values()))) ? S.sort(Array.from(Reflect.construct(Set, [S.chain(post => S.chain(links)(post.body))(posts)]).values())).map($0024 => status($0024)) : S.sort(Array.from(Reflect.construct(Set, [S.chain(post => S.chain(links)(post.body))(posts)]).values()))['fantasy-land/map'](status))) ? parallel(16)(Array.isArray(S.sort(Array.from(Reflect.construct(Set, [S.chain(post => S.chain(links)(post.body))(posts)]).values()))) ? S.sort(Array.from(Reflect.construct(Set, [S.chain(post => S.chain(links)(post.body))(posts)]).values())).map($0024 => status($0024)) : S.sort(Array.from(Reflect.construct(Set, [S.chain(post => S.chain(links)(post.body))(posts)]).values()))['fantasy-land/map'](status)).map($0024 => (result => Array.isArray(result) ? result.map($0024 => format($0024)) : result['fantasy-land/map'](format))($0024)) : parallel(16)(Array.isArray(S.sort(Array.from(Reflect.construct(Set, [S.chain(post => S.chain(links)(post.body))(posts)]).values()))) ? S.sort(Array.from(Reflect.construct(Set, [S.chain(post => S.chain(links)(post.body))(posts)]).values())).map($0024 => status($0024)) : S.sort(Array.from(Reflect.construct(Set, [S.chain(post => S.chain(links)(post.body))(posts)]).values()))['fantasy-land/map'](status))['fantasy-land/map'](result => Array.isArray(result) ? result.map($0024 => format($0024)) : result['fantasy-land/map'](format))) ? (Array.isArray(parallel(16)(Array.isArray(S.sort(Array.from(Reflect.construct(Set, [S.chain(post => S.chain(links)(post.body))(posts)]).values()))) ? S.sort(Array.from(Reflect.construct(Set, [S.chain(post => S.chain(links)(post.body))(posts)]).values())).map($0024 => status($0024)) : S.sort(Array.from(Reflect.construct(Set, [S.chain(post => S.chain(links)(post.body))(posts)]).values()))['fantasy-land/map'](status))) ? parallel(16)(Array.isArray(S.sort(Array.from(Reflect.construct(Set, [S.chain(post => S.chain(links)(post.body))(posts)]).values()))) ? S.sort(Array.from(Reflect.construct(Set, [S.chain(post => S.chain(links)(post.body))(posts)]).values())).map($0024 => status($0024)) : S.sort(Array.from(Reflect.construct(Set, [S.chain(post => S.chain(links)(post.body))(posts)]).values()))['fantasy-land/map'](status)).map($0024 => (result => Array.isArray(result) ? result.map($0024 => format($0024)) : result['fantasy-land/map'](format))($0024)) : parallel(16)(Array.isArray(S.sort(Array.from(Reflect.construct(Set, [S.chain(post => S.chain(links)(post.body))(posts)]).values()))) ? S.sort(Array.from(Reflect.construct(Set, [S.chain(post => S.chain(links)(post.body))(posts)]).values())).map($0024 => status($0024)) : S.sort(Array.from(Reflect.construct(Set, [S.chain(post => S.chain(links)(post.body))(posts)]).values()))['fantasy-land/map'](status))['fantasy-land/map'](result => Array.isArray(result) ? result.map($0024 => format($0024)) : result['fantasy-land/map'](format))).map($0024 => S.joinWith('\n')($0024)) : (Array.isArray(parallel(16)(Array.isArray(S.sort(Array.from(Reflect.construct(Set, [S.chain(post => S.chain(links)(post.body))(posts)]).values()))) ? S.sort(Array.from(Reflect.construct(Set, [S.chain(post => S.chain(links)(post.body))(posts)]).values())).map($0024 => status($0024)) : S.sort(Array.from(Reflect.construct(Set, [S.chain(post => S.chain(links)(post.body))(posts)]).values()))['fantasy-land/map'](status))) ? parallel(16)(Array.isArray(S.sort(Array.from(Reflect.construct(Set, [S.chain(post => S.chain(links)(post.body))(posts)]).values()))) ? S.sort(Array.from(Reflect.construct(Set, [S.chain(post => S.chain(links)(post.body))(posts)]).values())).map($0024 => status($0024)) : S.sort(Array.from(Reflect.construct(Set, [S.chain(post => S.chain(links)(post.body))(posts)]).values()))['fantasy-land/map'](status)).map($0024 => (result => Array.isArray(result) ? result.map($0024 => format($0024)) : result['fantasy-land/map'](format))($0024)) : parallel(16)(Array.isArray(S.sort(Array.from(Reflect.construct(Set, [S.chain(post => S.chain(links)(post.body))(posts)]).values()))) ? S.sort(Array.from(Reflect.construct(Set, [S.chain(post => S.chain(links)(post.body))(posts)]).values())).map($0024 => status($0024)) : S.sort(Array.from(Reflect.construct(Set, [S.chain(post => S.chain(links)(post.body))(posts)]).values()))['fantasy-land/map'](status))['fantasy-land/map'](result => Array.isArray(result) ? result.map($0024 => format($0024)) : result['fantasy-land/map'](format)))['fantasy-land/map'](S.joinWith('\n'));
fork(console.error)(console.log)(program);
