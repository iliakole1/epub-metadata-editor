# 📖 EPUB Metadata Editor

A tiny, mobile-friendly web app for reading and editing the metadata inside `.epub` files — title, authors, description, subjects/tags, publisher, language, identifiers (ISBN), publication date, and the cover image.

**Everything runs locally in your browser.** Your books are never uploaded anywhere — the app opens the EPUB, edits the package file, and saves a new copy right on your device. It works offline once loaded.

## Features

- 📂 Open an `.epub` by tapping to browse or dragging a file in
- ✏️ Edit Dublin Core metadata with a clean, touch-friendly form
- 👤 Multiple authors, subjects, and identifiers (add/remove rows)
- 🖼️ Preview and replace the cover image (JPEG/PNG)
- 💾 Save a new `(edited).epub` — the original file is left untouched
- 📱 "Add to Home Screen" support (PWA) for an app-like feel
- 🔒 100% client-side — no server, no tracking, no uploads

## Usage

Open the hosted page (see the repo's GitHub Pages URL), then:

1. Tap **Open an EPUB** and pick a file.
2. Edit any of the fields.
3. Tap **Save EPUB** to download the edited copy.

To run it locally instead, just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## How it works

An EPUB is a ZIP archive. This app uses [JSZip](https://stuk.github.io/jszip/) to:

1. Read `META-INF/container.xml` to locate the package (`.opf`) file.
2. Parse the OPF's `<metadata>` (Dublin Core) into an editable form.
3. Write your changes back into the OPF and re-zip, keeping the `mimetype`
   entry stored first and uncompressed so the result stays a valid EPUB.

## License

MIT
