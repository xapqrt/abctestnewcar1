# VibeCheck

browser extension that filters bad vibes from ur social feed

## what it does

- scans twitter/reddit/linkedin feeds in real time
- uses word-based sentiment scoring to detect negative content
- blurs toxic posts with a reveal button
- customizable threshold and settings
- per platform sensitivity (twitter/reddit/linkedin each have their own slider)
- whitelist keywords or users so their posts never get blurred
- tracks stats on how many posts got filtered
- handles SPA navigation (no page refresh needed)
- negation detection ("not angry" wont trigger anger)

## how to install

1. clone this repo
2. open chrome and go to `chrome://extensions`
3. enable developer mode
4. click "load unpacked" and select the vibecheck folder
5. extension should show up in ur toolbar

## how to use

- click the extension icon to open settings
- adjust sensitivity threshold (more negative = more strict)
- toggle what types of content to block (anger/sadness/toxic)
- add whitelist keywords or @usernames (one per line) to skip certain posts
- adjust per-platform sliders if u want different strictness per site
- browse twitter/reddit/linkedin and watch it filter
- changing settings re-scans posts automatically, no refresh needed

## platforms supported

- Twitter/X (data-testid="tweet")
- Reddit (shreddit-post + backup selectors for different layouts)
- LinkedIn (feed-shared-update-v2 + backup selectors)

## how it works

- mutation observer watches for new posts loading in
- extracts text content from posts (innerText + textContent fallback)
- scores text using a word-weight dictionary (87 bad words, 51 good words)
- negation words flip the score (e.g. "not hate" becomes slightly positive)
- all caps multiplier only kicks in when bad words are present
- if score falls below the platform threshold, injects blur overlay with emoji
- click reveal to see the content anyway
- SPA navigation detected via url polling every 1s

## settings

- enable/disable toggle
- global sensitivity threshold slider (-5 to 0)
- category toggles (anger, sadness, toxic)
- whitelist textarea (keywords/usernames, one per line)
- per-platform sensitivity sliders (twitter/reddit/linkedin)
- stats display with clear button

## known issues

- twitter DOM changes sometimes so selectors might break eventually
- all caps detection only triggers with negative words present
- long posts (5000+ chars) are skipped for performance
- reddit shadow DOM might cause text extraction issues on some layouts

## tech stack

- vanilla js (no frameworks)
- chrome extension manifest v3
- backdrop-filter for blur effect
- chrome.storage.sync for settings
- chrome.storage.local for stats

## dev notes

check notes/ideas.txt for random thoughts and todos

built during a 48hr coding session lol
