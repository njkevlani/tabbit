import curFocused from './nav.js';

function fetchSubreddit(sr) {
  fetch(`https://www.reddit.com/r/${sr}.json`)
    .then((response) => response.json())
    .then((data) => {
      const lst = document.getElementById(sr).getElementsByTagName('ul')[0];
      lst.innerHTML = ''
      data.data.children.forEach((el) => {
        const p = el.data;

        const a = document.createElement('a');
        a.setAttribute('href', `https://www.reddit.com${p.permalink}`);
        a.innerText = p.title;

        const listElement = document.createElement('li')
        listElement.appendChild(a)

        lst.appendChild(listElement);
      });
      lst.firstChild.firstChild.focus();
      curFocused.post = lst.firstChild.firstChild;
    });
}

export default fetchSubreddit;
