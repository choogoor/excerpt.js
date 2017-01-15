(function () {

  this.Excerpt = function (element, options) {
    let that = this;
    let textSliced;
    let textOvereage;

    let readMoreElement = document.createElement('a');
    let readMoreText = document.createTextNode('More');
    readMoreElement.appendChild(readMoreText);

    let readLessElement = document.createElement('a');
    let readLessText = document.createTextNode('Less');
    readLessElement.appendChild(readLessText);

    // Define option defaults
    let defaults = {
      characters: 3,
      elipsisText: '...',
      readMore: false,
      readMoreContent: readMoreElement ,
      readLessContent: readLessElement,
      toggle: false,
    }

    that.options = extendDefaults(defaults, options);

    if (element.textContent.length > that.options.characters) {
      textSliced = element.textContent.slice(0, that.options.characters);
      textOverage = element.textContent.slice(that.options.characters, element.textContent.length);
    }

    if (that.options.readMore) {

      let elipsis = document.createElement('span');
      elipsis.textContent = that.options.elipsisText;
      element.textContent = textSliced;
      element.appendChild(elipsis);
      element.appendChild(that.options.readMoreContent);

      if (that.options.toggle) {
        let hiddenContent = document.createElement('span');

        hiddenContent.textContent = textOverage;
        hiddenContent.style.display = 'none';
        hiddenContent.appendChild(readLessElement);

        element.appendChild(that.options.readMoreContent);
        element.appendChild(hiddenContent);
      }

    } else {
      element.textContent = textSliced + that.options.elipsisText;
    }

    that.options.readMoreContent.addEventListener('click', function (e) {
      e.preventDefault();

      this.style.display = 'none';
      this.previousElementSibling.style.display = 'none';
      this.nextElementSibling.style.display = '';
    });

    that.options.readLessContent.addEventListener('click', function (e) {
      e.preventDefault();

      this.parentNode.style.display = 'none';
      this.parentNode.previousElementSibling.style.display = '';
      this.parentNode.previousElementSibling.previousElementSibling.style.display = '';
    });
  }

  // Utility method to extend defaults with user options
  var extendDefaults = (source, properties) => {
    Object.keys(properties).forEach(function (key) {
      source[key] = properties[key];
    });

    return source;
  }

})();
