function _verifyAttributes(element, argList, message) {
  argList.forEach(arg => {
    if (!element.hasAttribute(arg)) {
      throw new Error(message);
    }
  });
}

function _verifyXData(element, argList, message) {
  const xdataString = element.getAttribute('x-data');
  const xdata = new Function('return ' + xdataString + ';')();
  const keys = Object.keys(xdata);
  argList.forEach(arg => {
    if (!keys.includes(arg)) {
      throw new Error(message);
    }
  })
}

function lines(text) {
  if (!text) {
    return [];
  }
  const line = text.split("\n");
  let lines = "";
  for (let i = 0; i < line.length; i++) {
    lines += '<p x-text="`' + line[i] + '`"></p>';
  }
  return lines;
}

function imageArray(path, max, extension) {
  let images = [];
  for (let i = 1; i <= max; i++) {
    images.push({ src: `${path}/${i}.${extension}` });
  }
  return images;
}