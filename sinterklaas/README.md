# 📕 Het Grote Boek van Sinterklaas

A shared Sinterklaas wish-list app for a small group (interface in Dutch). It opens with the cover
of the Big Book: tap to open it, pick your name, enter your PIN. Pages turn with an animation, and
there are synthesised sound effects (mute button top right).

- Everyone picks their name and protects it with a PIN (set on first login).
- **My list**: add what you'd like, with an optional link and price; edit or delete items.
- **Everyone**: see everyone else's lists and strike a wish off by swiping across it (or tapping
  the word or the box on the left; links stay tappable). Others see who struck what, so nobody
  buys the same thing twice. Swipe back to erase your own strike.
- **The surprise rule**: you never see ticks on your own list. The app doesn't even download them.
- **I'm buying**: everything you've ticked, grouped per person, with a price total.

Until Firebase is connected (`firebase: null` in `config.js`) the app runs in **demo mode**:
data is only saved on the device you're using.

## Changing the names

Edit the `names` list in [`config.js`](config.js).

## Connecting Firebase (one-time, ~5 minutes)

1. Go to <https://console.firebase.google.com>, click **Create a project**, give it a name
   (e.g. `sinterklaas-lists`), turn Google Analytics **off**, and create it.
2. In the left menu open **Build → Realtime Database** → **Create database**. Pick a location
   (e.g. *Belgium (europe-west1)*), choose **Start in locked mode**, and click **Enable**.
3. Open the **Rules** tab of the database, replace everything with the contents of
   [`database.rules.json`](database.rules.json), and click **Publish**.
4. Click the ⚙️ gear next to *Project Overview* → **Project settings**. Under *Your apps* click the
   web icon **`</>`**, give it a nickname, and click **Register app** (no hosting needed).
5. Copy the `firebaseConfig = { … }` object it shows (it must include a `databaseURL`), and
   paste it into `config.js` as the value of `firebase`. The config is not a secret: it's meant
   to be in the web page.

## Resetting a forgotten PIN

In the Firebase console open **Realtime Database → Data**, go to `people → <name>`, and delete
`pinHash`. That person can then choose a new PIN on their next login.

## How private is it?

The PIN stops people from casually opening someone else's list or seeing the ticks on their own.
It is not bank-grade security: someone technical could still read the database directly. That's
fine for a family gift list, but don't put anything truly secret in it.
