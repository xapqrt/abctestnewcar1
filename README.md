# VibeCheck

browser extension that filters bad vibes from ur social feed

## what it does

- scans twitter/reddit/linkedin feeds in real time
- uses word-based sentiment scoring to detect negative content
- blurs toxic posts with a reveal button
- customizable threshold and settings

## how to install

1. clone this repo
2. open chrome and go to `chrome://extensions`
3. enable developer mode
4. click "load unpacked" and select the vibecheck folder
5. extension should show up in ur toolbar

## how to use

- click the extension icon to open settings
- adjust sensitivity threshold (more negative = more strict)
- toggle what types of content to block
- browse twitter/reddit/linkedin and watch it filter

## platforms supported

- Twitter/X (data-testid="tweet")
- Reddit (new and old layout)
- LinkedIn (feed posts)

## how it works

- mutation observer watches for new posts
- extracts text content from posts
- scores based on word weights (bad words vs good words)
- if score below threshold, injects blur overlay
- click reveal to see the content anyway

## settings

- enable/disable toggle
- sensitivity threshold slider (-5 to 0)
- category toggles (anger, sadness, toxic)

## known issues

- twitter DOM changes frequently so selectors might break
- all caps detection only works with negative words now
- long posts (5000+ chars) are skipped for performance
- enable/disable requires page refresh

## tech stack

- vanilla js (no frameworks)
- chrome extension manifest v3
- backdrop-filter for blur effect
- chrome.storage.sync for settings

## dev notes

check notes/ideas.txt for random thoughts and todos

built during a 48hr coding session lol
