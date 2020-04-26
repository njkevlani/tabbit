import { curFocused, focusList } from './nav.js';

function fetchSubreddit(sr) {
  fetch(`https://www.reddit.com/r/${sr}.json`)
    .then((response) => response.json())
    .then((data) => {
      const lst = document.getElementById(sr).getElementsByTagName('ul')[0];
      lst.innerHTML = ''
      const postFocusList = []
      data.data.children.forEach((el) => {
        const p = el.data;

        const a = document.createElement('a');
        a.setAttribute('href', `https://www.reddit.com${p.permalink}`);
        a.innerText = p.title;

        postFocusList.push({
          anchor: a
        })

        const listElement = document.createElement('li')
        listElement.appendChild(a)

        lst.appendChild(listElement);
      });

      for (let i = 0; i < postFocusList.length; i++) {
        if (i > 0) {
          postFocusList[i].previous = postFocusList[i - 1]
        }
        if (i + 1 < postFocusList.length) {
          postFocusList[i].next = postFocusList[i + 1]
        }
      }

      curFocused.post = postFocusList[0];
      focusList.post = postFocusList;
      curFocused.post.anchor.focus();
    });
}

export { fetchSubreddit };
