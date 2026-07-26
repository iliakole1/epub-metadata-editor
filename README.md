# 📚 EPUB Library

A mobile-friendly web app for managing your EPUB books — a personal library you can
open from your phone. Import your books, browse them as a cover grid, and read/edit
their metadata (title, authors, series, description, subjects/tags, publisher,
language, identifiers, cover image).

**Everything runs locally in your browser and stays on your device.** Your books are
never uploaded anywhere — they're stored privately in your browser and processed
on-device. It works offline once loaded, and you can "Add to Home Screen" for an
app-like experience.

> **About Kobo (and other e-readers):** a web page can't reach a Kobo device or your
> Kobo account directly (USB storage isn't accessible from mobile browsers, and
> store-bought books are DRM-locked). What this app does is let you **prepare and
> organize** your sideloadable EPUBs — then on iPhone use *Share → Save to Files*
> to drop the exported book into a Dropbox/Google Drive folder your Kobo syncs from,
> which is how sideloading onto a Kobo works.

## Features

- 📥 **Import many books at once** from Files / iCloud / Drive (or drag & drop)
- 🗂️ **Cover-grid library** that persists between visits (stored in your browser)
- 🔎 Search by title/author and sort (recently added, title, author)
- ✏️ Tap a book to edit its metadata with a clean, touch-friendly form
- 👤 Multiple authors, subjects, and identifiers; series name + number
- 🖼️ Preview and replace the cover image (JPEG/PNG)
- 🛠️ **Auto-repairs truncated/corrupted EPUBs** (e.g. from an interrupted download)
  by rebuilding the archive index in-browser
- 💾 Save changes back into your library, or **Download / export** a clean copy
- 📱 Installable PWA · 🔒 100% client-side — no server, no tracking, no uploads

## Usage

Open the hosted page (see the repo's GitHub Pages URL), then:

1. Tap **Add** and choose one or more `.epub` files.
2. Tap a book to edit it; make your changes.
3. Tap **Save to Library** to keep the edits, or **Download** to export a copy.

On iPhone, after exporting you can *Share → Save to Files* into a cloud folder your
Kobo watches.

To run it locally, open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## How it works

An EPUB is a ZIP archive. This app uses [JSZip](https://stuk.github.io/jszip/) to:

1. Read `META-INF/container.xml` to locate the package (`.opf`) file.
2. Parse the OPF's `<metadata>` (Dublin Core, plus calibre-style series meta) into
   an editable form, and extract a cover thumbnail for the library grid.
3. Store each book (and its metadata/cover) locally in **IndexedDB**.
4. On save, write your changes back into the OPF and re-zip, keeping the `mimetype`
   entry stored first and uncompressed so the result stays a valid EPUB.

If an archive can't be opened (a common symptom of a download that was cut short —
the ZIP's central directory / end-of-archive record is missing), the app runs a
recovery pass: it scans the intact local file headers and reconstructs a fresh
central directory + end-of-central-directory record — the same approach as
`zip -FF` — then opens and stores a clean, valid copy.

## License

MIT
