### Getting Started with react-file-dl

---

### Questions

1. For req #1 - are files with "scheduled" status selectable? Asking for clarification between selectable file versus downloadable file.
2. For req #7 - is intermediate state to unselected state a valid transition?
3. For req #9 - what is the expected UI for the alert box? It can be as simple as a native browser alert, download prompt, or a custom modal window.

### Assumptions

1. Selectable vs Downloadable - **Assumption:** if status of the file is 'scheduled', they are neither selectable nor downloadable.
2. Unselect all -
3. Data - can be passed to the FileDownloader from the parent component, or it can assume the responsibility of fetching data from a passed endpoint URL. **Assumption:** file data is passed to the FileDownloader.
4. Pagination - some form dynamic or configurable pagination may be needed - if FD component needs to handle large number of files. This is important from both UX and performance perspectives. **Assumption:** FileDownloader needs to handle a few dozen files only.
5. Responsive/Mobile UI - provided mock appears to be created for the desktop web environment. **Assumption:** limited or no support is required for mobile web environments.
6. Alert Box - **Assumption:** use a custom modal with scrollable contents.
7. File paths - are different for linux/macOS and windows OS. **Assumption:** delegating the responsibility of passing valid file paths to the consumer of the FileDownloader.

### Notes

1. Search for `@note` in the source code for additional comments on author's design decisions etc.
2. Only test specs `FDProvider` are added, but this component has the bulk of component business logic.

---

### Installation

- Option 1. Using github bundle

Clone repo

```
$: git clone <BUNDLE_PATH>
```

Go to project directory

```
$: cd react-file-dl
```

Install project dependencies

```
$: yarn install
```

Start project in local webserver

```
$: yarn start
```

**Optional:** Run unit test suite

```
$: yarn test
```

**Skipped:** Production build version not tested

```
$: yarn build
```

- Option 2. Using cloud IDE [stackblitz](https://stackblitz.com/edit/react-file-downloader)

1. Go to [https://react-file-downloader.stackblitz](https://react-file-downloader.stackblitz.io/) URL to preview the functionality and user experience of the component within a sample use case.
2. Go to [src/FileDownloader](https://stackblitz.com/edit/react-file-downloader?file=src%2FFileDownloader%2Findex.ts) directory in the editor to view the source code for the resuable `FileDownloader` component.
3. Go to [Example.tsx](https://stackblitz.com/edit/react-file-downloader?file=src%2Fexample%2FExample.tsx) file to view the sample usage of the `FileDownloader` component.

---

### Known Issues

1. Support responsive mobile layout is minimal.
2. accent-color for intermediate state is not blue.

---
