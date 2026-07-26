# 📖 Ebook Metadata Editor

A tiny, mobile-friendly web app for reading and editing the metadata inside your
ebook files — **EPUB, PDF, and MOBI / AZW**. Edit the title, authors, description,
subjects/tags, and more, plus repair damaged EPUBs and replace EPUB covers.

**Everything runs locally in your browser.** Your files are never uploaded anywhere —
the app opens the file, edits its metadata on your device, and saves a new copy right
back to you. It works offline once loaded.

## Supported formats

| Format | Reads & edits |
|---|---|
| **EPUB** | Title, authors, description, subjects/tags, publisher, date, language, rights, identifiers (ISBN/UUID), **cover image**. Auto-repairs truncated/corrupted files. |
| **PDF** | Title, author, subject, keywords (the PDF document-info fields). |
| **MOBI / AZW** | Title, authors, publisher, description, subjects, date, language, ISBN (EXTH metadata). DRM-free files only. |

## Features

- 📂 Open a book by tapping to browse or dragging a file in
- ✏️ Edit metadata with a clean, touch-friendly form that adapts to the format
- 🛠️ **Auto-repairs truncated/corrupted EPUBs** (e.g. from an interrupted download)
  by rebuilding the archive index in-browser
- 🖼️ Preview and replace the EPUB cover image (JPEG/PNG)
- 💾 Save a new `(edited)` copy — the original file is left untouched
- 📱 "Add to Home Screen" support (PWA)
- 🔒 100% client-side — no server, no tracking, no uploads

## Usage

Open the hosted page (see the repo's GitHub Pages URL), then:

1. Tap **Open a book** and pick an `.epub`, `.pdf`, or `.mobi` / `.azw` file.
2. Edit any of the fields.
3. Tap **Save** to download the edited copy.

To run it locally instead, open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## How it works

- **EPUB** is a ZIP archive. The app uses [JSZip](https://stuk.github.io/jszip/) to read
  `META-INF/container.xml`, parse the OPF's Dublin Core `<metadata>`, and re-zip your
  changes while keeping the `mimetype` entry stored first and uncompressed so the result
  stays valid. If the archive can't be opened (a truncated download — missing central
  directory / end-of-archive record), it rebuilds those from the intact local file
  headers, the same idea as `zip -FF`.
- **PDF** metadata is edited via [pdf-lib](https://pdf-lib.js.org/) — the document
  information dictionary (Title, Author, Subject, Keywords).
- **MOBI / AZW** metadata lives in the Palm-database EXTH records. The app parses them,
  rewrites the managed fields, rebuilds each header record, and recomputes the record
  offset table — leaving the book text and any unmanaged records (e.g. cover offset)
  untouched. Combined MOBI + KF8 (AZW3) files carry two header records; both are updated
  so they stay in sync. Only DRM-free files can be edited.

## License

MIT
