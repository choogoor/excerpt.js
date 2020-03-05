# excerpt.js

This is a small lib used to generate a trimmed-down version of your text, written in vanilla JS with no dependencies.

[DEMO](https://codepen.io/choogoor/pen/WNvZyGX)

## Usage

### Install
```console
$ npm install excerpt.js
```

### Example
```js
import Excerpt from 'excerpt.js';

const excerpt = new Excerpt(document.getElementById('your-element-id'), {
  characters: 100
});

```

## Options

There are the few options that you can edit, such as:

```js
const excerpt = new Excerpt(document.getElementById('your-element-id'), {
  characters: 100,
  elipsisText: '...',
  expand: true,
  collapse: true,
  readMoreText: 'Show',
  readLessText: 'Hide',
});

```

- `characters` - number of characters of your text that you wish to show in excerpt after trimming. Default value is *30* characters.
- `elipsisText` - text that follows your excerpt. Default value is *hellip [...]* (A three-dot symbol used to show an incomplete statement).
- `expand` - allows you to make your excerpt expandable to the full version of your text. Default value is *false*.
- `collapse` - allows you to toggle your excerpt, once you made your text expandable. Default value is *false*.
- `readMoreText` - you can set the value for your excerpt expanding link. Default value is *More*.
- `readLessText` - you can set the value for your excerpt collapsing link. Default value is *Less*.
- `readMoreContent` and `readLessContent` - you can specify your own toggle handle elements. Default values are *anchor* tags with *#* as *href* option.

## Licence

Licensed under the MIT license.
