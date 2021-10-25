export function pluralize(word, count) {
  return count === 1 ? word : `${word}s`;
}

function typeOf(value) {
  return Object.prototype.toString.call(value).toLowerCase().slice(8, -1);
}

const jsonTypes = ['string', 'number', 'boolean', 'null', 'array', 'object'];

function replacer(_, value) {
  if (value === undefined) {
    return '<undefined>';
  }

  if (typeOf(value) === 'object' && String(value) !== '[object Object]') {
    return String(value);
  }

  if (typeof value === 'function') {
    return String(value);
  }

  if (!jsonTypes.includes(typeOf(value))) {
    return Object.prototype.toString.call(value);
  }

  return value;
}

export function format(value, isIndented) {
  const space = isIndented ? 2 : 0;

  try {
    const result = JSON.stringify(value, replacer, space)
      .replace(/"<undefined>"/g, 'undefined')
      .replace(/\\"/g, "'")
      .replace(/"/g, "'");

    return result.includes('\n') ? `\`\n${result}\n\`` : `\`${result}\``;
  } catch (e) {
    return value;
  }
}

export function formatItems(items, isIndented) {
  return items.map(item => format(item, isIndented));
}
