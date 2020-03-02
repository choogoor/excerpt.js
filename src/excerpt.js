let extendDefaults = (source, properties) => {
  Object.keys(properties).forEach((key) => {
    source[key] = properties[key];
  });

  return source;
};

let createElement = (type, text) => {
  let element = document.createElement(type);
  let elementText = document.createTextNode(text);
  element.appendChild(elementText);

  return element;
};

export default {
  new: function (element, options) {

    let textSliced;
    let textOvereage;
    let readMoreElement = createElement('a', 'More');
    let readLessElement = createElement('a', 'Less');

    let defaults = {
      characters: 3,
      elipsisText: '...',
      readMore: false,
      readMoreContent: readMoreElement,
      readLessContent: readLessElement,
      toggle: false,

      onShow: () => {
        this.options.readMoreContent.addEventListener('click', (e) => {
          e.preventDefault();

          e.target.style.display = 'none';
          e.target.previousElementSibling.style.display = 'none';
          e.target.nextElementSibling.style.display = '';
        })
      },

      onHide: () => {
        this.options.readLessContent.addEventListener('click', (e) => {
          e.preventDefault();

          e.target.parentNode.style.display = 'none';
          e.target.parentNode.previousElementSibling.style.display = '';
          e.target.parentNode.previousElementSibling.previousElementSibling.style.display = '';
        })
      },
    }

    this.options = extendDefaults(defaults, options);

    if (element.textContent.length > this.options.characters) {
      let textSliced = element.textContent.slice(0, this.options.characters);
      let textOverage = element.textContent.slice(this.options.characters, element.textContent.length);

      if (this.options.readMore) {
        let elipsis = createElement('span', this.options.elipsisText);

        element.textContent = textSliced;
        element.appendChild(elipsis);
        element.appendChild(this.options.readMoreContent);

        if (this.options.toggle) {
          let hiddenContent = createElement('span', textOverage);

          hiddenContent.style.display = 'none';
          hiddenContent.appendChild(readLessElement);

          element.appendChild(this.options.readMoreContent);
          element.appendChild(hiddenContent);
        } else {
          let hiddenContent = createElement('span', textOverage);

          hiddenContent.style.display = 'none';

          element.appendChild(this.options.readMoreContent);
          element.appendChild(hiddenContent);
        }
      } else {
        element.textContent = textSliced + this.options.elipsisText;
      }
    }

    this.options.onShow.call(this);

    this.options.onHide.call(this);
  }
};

