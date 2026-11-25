# Chorus

A Folio concept, the social reading direction: a bento home page, book discovery, book pages, author profiles,
a community forum and feed, a leaderboard, an AI content studio and a creator hub, all connected.

This is one of three independent Folio concept projects, each in its own repository with its own
dependencies, configuration and deployment. Nothing is shared, so you can change it freely.

## Run it

```bash
npm install
npm run dev       # http://localhost:5172
npm run build     # production build in dist/
npm run preview   # serve the build locally
```

Requires Node 20 or newer.

## Structure

```
index.html                 page shell and fonts
src/
  main.js                  entry point
  router.js                hash router (#/, #/discover, #/book …) with view transitions
  routes.js                the list of screens; add new screens here
  runtime.js               tiny rendering engine (template + bindings, DOM patching)
  shell/
    sidebar.html           sidebar (desktop) / tab bar (mobile) markup
    navigation.js          navigation items and badges
    shell.css              layout shared by all screens, mobile tab bar, page transitions
  screens/<name>/
    template.html          the screen's markup
    screen.js              its state, sample data and interactions
    style.css              styles loaded only while that screen is open
```

Each screen is self-contained: editing `screens/feed/` never changes another screen, and its
CSS is swapped in only while it is showing, so class names cannot clash.

## How templates work

- `{{name}}` or `{{post.title}}` is filled from the object `bindings()` returns in `screen.js`.
- `<for-each list="{{items}}" as="item">…</for-each>` repeats its content for each item.
- `<show-if value="{{isOpen}}">…</show-if>` renders only when the value is truthy.
- `onClick="{{handler}}"` (also `onChange`, `onPointerDown` …) calls a function from `bindings()`.
- `this.setState({ ... })` updates state and re-renders; the DOM is patched in place.
- Links between screens are ordinary anchors: `<a href="#/community">`.
- `<!--sidebar-->` in a template marks where the shared sidebar is inserted.

## Screens

| Route | Screen |
| --- | --- |
| `#/` | Home: currently reading, picks for you, live rooms, author drops |
| `#/discover` | Discover: search, moods, genres, shelves |
| `#/book` | Book: details, highlights, reviews, contributors, reading room |
| `#/author` | Author profile: daily stories, books, influence score |
| `#/feed` | Feed: posts, reactions, comments |
| `#/community` | Community forum: threads, replies, AI summaries |
| `#/leaderboard` | Leaderboard: authors, readers, reviewers |
| `#/studio` | AI Studio: turn community activity into content |
| `#/creator` | Creator hub: author analytics |

## Deploy

Linked to the Vercel project `chorus`. Every push to `main` redeploys; pull
requests get preview URLs. To deploy by hand: `npx vercel --prod`.
