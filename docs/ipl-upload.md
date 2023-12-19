---
title: ipl-upload
---

# ipl-upload

::: demo UploadExample

### Note on drag-and-drop functionality

For dragging and dropping to upload a file to work, the default behavior for the `drop` and `dragover` events
must be disabled. To do this, include a script like this in your page:

```js
window.addEventListener('drop', e => {
    e.preventDefault();
});
window.addEventListener('dragover', e => {
    e.preventDefault();
});
```

### Using the uploaded file

The following is an abridged version of a function used in the ipl-overlay-controls project ([Source](https://github.com/inkfarer/ipl-overlay-controls/blob/47d49af64e576a2462d06edc20ab1ea74ba9dbfc/src/dashboard/store/tournamentDataStore.ts#L68-L79))

```ts
// 'file' is the object obtained through the uploader's v-model property.
async function sendFile(file: File): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/upload-file', { method: 'POST', body: formData });
    // [...]
}
```
