import { curFocused, focusList } from './nav.js'

function timeSince (date) {
  var seconds = Math.floor((new Date() - date) / 1000)
  var interval = Math.floor(seconds / 31536000)

  if (interval >= 1) {
    return interval + 'Y'
  }
  interval = Math.floor(seconds / 2592000)
  if (interval >= 1) {
    return interval + 'M'
  }
  interval = Math.floor(seconds / 86400)
  if (interval >= 1) {
    return interval + 'D'
  }
  interval = Math.floor(seconds / 3600)
  if (interval >= 1) {
    return interval + 'H'
  }
  interval = Math.floor(seconds / 60)
  if (interval >= 1) {
    return interval + 'M'
  }
  return Math.floor(seconds) + 'S'
}

function fetchSubreddit (sr) {
  window.fetch(`https://www.reddit.com/r/${sr}/hot.json`)
    .then((response) => response.json())
    .then((data) => {
      const lst = document.getElementById(sr).getElementsByTagName('tbody')[0]
      lst.innerHTML = ''
      const postFocusList = []
      data.data.children.forEach((el) => {
        const p = el.data

        const a = document.createElement('a')
        a.setAttribute('href', `https://www.reddit.com${p.permalink}`)
        a.innerHTML = p.title

        postFocusList.push({
          anchor: a
        })

        const atd = document.createElement('td')
        atd.classList.add('feedData')
        atd.appendChild(a)

        const s = document.createElement('td')
        s.classList.add('feedData')
        s.classList.add('singleLine')
        if (p.score > 999) {
          s.innerText = `${(p.score / 1000).toFixed(2)}K `
        } else {
          s.innerText = `${p.score} `
        }

        const t = document.createElement('td')
        t.classList.add('feedData')
        t.classList.add('singleLine')
        t.innerText = timeSince(new Date(p.created_utc * 1000))

        const listElement = document.createElement('tr')
        listElement.appendChild(t)
        listElement.appendChild(s)
        listElement.appendChild(atd)

        lst.appendChild(listElement)
      })

      for (let i = 0; i < postFocusList.length; i++) {
        if (i > 0) {
          postFocusList[i].previous = postFocusList[i - 1]
        }
        if (i + 1 < postFocusList.length) {
          postFocusList[i].next = postFocusList[i + 1]
        }
      }

      curFocused.post = postFocusList[0]
      focusList.post = postFocusList
      curFocused.post.anchor.focus()
    })
}

export { fetchSubreddit }
