(function () {

  this.Excerpt = (function () {
    return {
      new: (element, options) => {
        const that = this;

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
            readMoreElement.addEventListener('click', (e) => {
              e.preventDefault();

              e.target.style.display = 'none';
              e.target.previousElementSibling.style.display = 'none';
              e.target.nextElementSibling.style.display = '';
            })
          },

          onHide: () => {
            readLessElement.addEventListener('click', (e) => {
              e.preventDefault();

              e.target.parentNode.style.display = 'none';
              e.target.parentNode.previousElementSibling.style.display = '';
              e.target.parentNode.previousElementSibling.previousElementSibling.style.display = '';
            })
          },
        }

        that.options = extendDefaults(defaults, options);

        if (element.textContent.length > that.options.characters) {
          textSliced = element.textContent.slice(0, that.options.characters);
          textOverage = element.textContent.slice(that.options.characters, element.textContent.length);
        }

        if (that.options.readMore) {
          let elipsis = createElement('span', that.options.elipsisText);

          element.textContent = textSliced;
          element.appendChild(elipsis);
          element.appendChild(that.options.readMoreContent);

          if (that.options.toggle) {
            let hiddenContent = createElement('span', textOverage);

            hiddenContent.style.display = 'none';
            hiddenContent.appendChild(readLessElement);

            element.appendChild(that.options.readMoreContent);
            element.appendChild(hiddenContent);
          }
        } else {
          element.textContent = textSliced + that.options.elipsisText;
        }

        that.options.onShow.call(this);

        that.options.onHide.call(this);
      }
    };
  }());

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

})();
