export default (type, text) => {
  let element = document.createElement(type);
  let elementText = document.createTextNode(text);

  element.appendChild(elementText);

  if (type === 'a') {
    element.href = '#';
  }

  return element;
};
