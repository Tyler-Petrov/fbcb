# FBCB website

One static page, [index.html](index.html), with no build step. It's a single scrolling page with a sticky nav (Times, Events, Sermons, About, Visit), patterned on misfitsforjesus.com. Any free static host can serve the folder as-is.

## Day-to-day upkeep

- **Events:** post them to the church Facebook page. They appear on the site automatically.
- **Sermons:** upload to YouTube. The newest one plays on the site automatically.
- **The "Next" badge** in the service times card moves itself to the next gathering.
- **The Friendsgiving card** removes itself after Dec 6, 2026.

The only things that ever need a file edit are service times, address, or pastor changes.

## Still placeholders (search the file for `PLACEHOLDER` and `ADDRESS`)

- Cover photo: save it as `assets/christmas-eve.jpg` and swap in the `<img>`.
- Facebook page URL: uncomment the events embed and fix the links marked `data-placeholder="facebook"`.
- YouTube channel ID: uncomment the sermon player and fix the links marked `data-placeholder="youtube"`.
- Street address: 220 vs 200 S Main St, which appears in two text spots. The map and Directions links search by church name, so they don't depend on it.

## Suggested hosting (nothing created yet)

Cloudflare Pages (free) plus Cloudflare Registrar, which sells domains at cost: about $10–11/yr for .org or .com. GitHub Pages or Netlify's free tier would also work.
