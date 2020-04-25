function fetchSubreddit(sr) {
  fetch(`https://www.reddit.com/r/${sr}.json`)
    .then((response) => response.json())
    .then((data) => {
      const c = document.getElementById(sr);
      data.data.children.forEach((el) => {
        const p = el.data;
        const a = document.createElement('a');
        a.setAttribute('href', p.url);
        a.innerText = p.title;
        c.appendChild(a);
      });
    });
}

export default fetchSubreddit;
