import fetchSubreddit from './feed.js';

const srList = [
  'all',
  'programming',
  'golang',
  'rust',
  'python',
  'india',
  'bangalore',
  'battlestations',
  'battletops',
  'archlinux',
  'linux',
  'thinkpad',
  'unixporn',
  'vim',
  'xfce',
];

function getNavItem(sr) {
  // <li class="tab col s3"><a href="#target">Target</a></li>
  const navItem = document.createElement('li');
  navItem.classList.add('tab');
  navItem.classList.add('col');
  navItem.classList.add('s3');

  const navTarget = document.createElement('a');
  navTarget.innerText = sr;
  navTarget.setAttribute('href', `#${sr}`);
  navItem.appendChild(navTarget);
  return navItem;
}

function getFeedSection(sr) {
  // <div id="target" class="col s12">Target Description</div>
  const section = document.createElement('div');
  section.classList.add('col');
  section.classList.add('s12');
  section.id = sr;
  section.innerHTML = `<h2>r/${sr}</h2><ul></ul>`;
  return section;
}

const navList = document.getElementById('navList');
const feed = document.getElementById('feed');
srList.forEach((sr) => {
  navList.appendChild(getNavItem(sr));
  feed.appendChild(getFeedSection(sr));
});

fetchSubreddit(srList[0]);

$('ul.tabs').on('click', 'a', (e) => {
  // console.log(e);
  const sr = e.currentTarget.hash.substring(1);
  fetchSubreddit(sr);
});

var curFocused = {
  post: null,
  subreddit: navList.firstChild.firstChild
};

document.onkeypress = function (e) {
  e = e || window.event;
  if (e.key == 'j' && curFocused.post) {
    // move down: next post
    const nextParent = curFocused.post.parentNode.nextElementSibling;
    if (nextParent) {
      const next = nextParent.firstChild;
      curFocused.post = next;
      next.focus();
    }
  } else if (e.key == 'k' && curFocused.post) {
    // move up previous post
    const previousParent = curFocused.post.parentNode.previousElementSibling;
    if (previousParent) {
      const previous = previousParent.firstChild;
      curFocused.post = previous;
      previous.focus();
    }
  } else if (e.key == 'h' && curFocused.subreddit) {
    //  move left: previous subreddit
    const previousParent = curFocused.subreddit.parentElement.previousElementSibling;
    if (previousParent) {
      const previous = previousParent.firstChild;
      curFocused.subreddit = previous;
      previous.focus();
    }
  } else if (e.key == 'l') {
    //  move right: next subreddit
    const nextParent = curFocused.subreddit.parentElement.nextElementSibling;
    if (nextParent) {
      const next = nextParent.firstChild;
      curFocused.subreddit = next;
      next.focus();
    }
  }
};

export default curFocused;
