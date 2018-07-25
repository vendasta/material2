`va-icon` provides support for image-based icons or letter-on-colour icons.

For regular material icons, use `mat-icon` instead.

<!-- example(va-icon-overview) -->

### VaIcon with url and name

`<va-icon>` accepts a url and name input. When the url input is set, the icon will display the icon from the url.

### VaIcon with only name

When `<va-icon>` only has a name set, the icon will display a background color with the initial of the name as the content (see example above).

### VaIcon with no url nor name

When `<va-icon>` has no input name or url, it will display a grey stencil placeholder.
