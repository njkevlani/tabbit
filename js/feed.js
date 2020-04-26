import { curFocused, focusList } from './nav.js'

function fetchSubreddit (sr) {
  window.fetch(`https://www.reddit.com/r/${sr}.json`)
    .then((response) => response.json())
    .then((data) => {
      const lst = document.getElementById(sr).getElementsByTagName('tbody')[0]
      lst.innerHTML = ''
      const postFocusList = []
      data.data.children.forEach((el) => {
        const p = el.data

        const a = document.createElement('a')
        a.setAttribute('href', `https://www.reddit.com${p.permalink}`)
        a.innerText = p.title

        postFocusList.push({
          anchor: a
        })

        const atd = document.createElement('td')
        atd.classList.add('feedData')
        atd.appendChild(a)

        const s = document.createElement('td')
        s.classList.add('feedData')
        if (p.score > 999) {
          s.innerText = `${(p.score / 1000).toFixed(2)}K `
        } else {
          s.innerText = `${p.score} `
        }

        const listElement = document.createElement('tr')
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
