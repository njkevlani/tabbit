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
  section.innerHTML = `<h2>r/${sr}</h2>`;
  return section;
}

const navList = document.getElementById('navList');
const feed = document.getElementById('feed');
srList.forEach((sr) => {
  navList.appendChild(getNavItem(sr));
  feed.appendChild(getFeedSection(sr));
});

$('ul.tabs').on('click', 'a', (e) => {
  // console.log(e);
  const sr = e.currentTarget.hash.substring(1);
  fetchSubreddit(sr);
});
