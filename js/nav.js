import { fetchSubreddit } from './feed.js';

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
  navTarget.classList.add('tabAnchor');
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

const srFocusList = []
navList.childNodes.forEach((el) => {
  srFocusList.push({
    anchor: el.getElementsByClassName('tabAnchor')[0],
  });
});

for (let i = 0; i < srFocusList.length; i++) {
  if (i > 0) {
    srFocusList[i].previous = srFocusList[i - 1]
  }
  if (i + 1 < srFocusList.length) {
    srFocusList[i].next = srFocusList[i + 1]
  }
}

var focusList = {
  post: null,
  subreddit: srFocusList
};

var curFocused = {
  post: null,
  subreddit: focusList.subreddit[0]
};

document.onkeypress = function (e) {
  e = e || window.event;
  if (e.key == 'j' && curFocused.post) {
    // move down: next post
    const next = curFocused.post.next;
    if (next) {
      next.anchor.focus();
      curFocused.post = next;
    }
  } else if (e.key == 'k' && curFocused.post) {
    // move up previous post
    const previous = curFocused.post.previous;
    if (previous) {
      previous.anchor.focus();
      curFocused.post = previous;
    }
  } else if (e.key == 'h' && curFocused.subreddit) {
    //  move left: previous subreddit
    const previous = curFocused.subreddit.previous;
    if (previous) {
      previous.anchor.focus();
      curFocused.subreddit = previous;
    }
  } else if (e.key == 'l') {
    //  move right: next subreddit
    const next = curFocused.subreddit.next;
    if (next) {
      next.anchor.focus();
      curFocused.subreddit = next;
    }
  }
};

$('ul.tabs').on('click', 'a', (e) => {
  // console.log(e);
  const sr = e.currentTarget.hash.substring(1);
  fetchSubreddit(sr);
});

fetchSubreddit(srList[0]);

export { curFocused, focusList };
