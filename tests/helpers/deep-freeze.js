//copy from substack so we can use it with ember :)
//https://github.com/substack/deep-freeze/blob/master/index.js

/* jshint ignore:start */
export default function deepFreeze(o) {
  Object.freeze(o);

  Object.getOwnPropertyNames(o).forEach(function (prop) {
    if (o.hasOwnProperty(prop)
    && o[prop] !== null
    && (typeof o[prop] === "object" || typeof o[prop] === "function")
    && !Object.isFrozen(o[prop])) {
      deepFreeze(o[prop]);
    }
  });

  return o;
};
/* jshint ignore:end */
