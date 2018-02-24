
export function makeRandom(length) {
    return Math.round((Math.pow(25, length + 1) - Math.random() * Math.pow(20, length))).toString(25).slice(1);
}

export function pathFromUrl(url) {
  return url && url.split("/");
}
