import createElement from './helper/createElement.js';

export default class Excerpt {
  constructor (element, options = {}) {
    this.element = element;

    this.options = Object.assign({
      characters: 30,
      elipsisText: '...',
      expand: false,
      collapse: false,
      readMoreText: 'More',
      readLessText: 'Less',
    }, options);

    this.options.readMoreContent = this.options.readMoreContent || createElement('a', this.options.readMoreText);
    this.options.readLessContent = this.options.readLessContent || createElement('a', this.options.readLessText);

    this._onShow();
    this._onHide();
    this._turncateText();
  }

  _onShow() {
    this.options.readMoreContent.addEventListener('click', (e) => {
      e.preventDefault();

      e.target.style.display = 'none';
      e.target.previousElementSibling.style.display = 'none';
      e.target.nextElementSibling.style.display = '';
    })
  }

  _onHide() {
    this.options.readLessContent.addEventListener('click', (e) => {
      e.preventDefault();

      e.target.parentNode.style.display = 'none';
      e.target.parentNode.previousElementSibling.style.display = '';
      e.target.parentNode.previousElementSibling.previousElementSibling.style.display = '';
    })
  }

  _turncateText() {
    if (this.element.textContent.length > this.options.characters) {
      let textSliced = this.element.textContent.slice(0, this.options.characters);
      let textOverage = this.element.textContent.slice(this.options.characters, this.element.textContent.length);
      let hiddenContent = createElement('span', textOverage);

      if (this.options.expand) {
        let elipsis = createElement('span', this.options.elipsisText);

        hiddenContent.style.display = 'none';
        this.element.textContent = textSliced;
        this.element.appendChild(elipsis);
        this.element.appendChild(this.options.readMoreContent);
        this.element.appendChild(hiddenContent);
      } else {
        this.element.textContent = textSliced + this.options.elipsisText;
      }

      if (this.options.collapse) {
        hiddenContent.appendChild(this.options.readLessContent);
      }
    }
  }
}
