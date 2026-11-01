---
block: codeBlock
---

Shows source code with syntax highlighting, optional line numbers and a caption.

The block renders nothing while `code` is empty.

### Fields

- `code`: the source code, as plain text with `\n` line breaks. It is not in the schema, because editors type it in the block itself.
- `language`: key of the language used to highlight `code`. The accepted keys are the choices of this field in the schema, and they come from `config.settings.codeBlock.languages`. Without a value the block uses `{{defaultLanguage}}`, and a key without a grammar is shown as plain text.
- `style`: color scheme, `dark` or `light`. Without a value the block uses `{{defaultStyle}}`.
- `showLineNumbers`: `false` to hide the line numbers. By default they are shown.
- `wrapLongLines`: `false` to scroll long lines instead of wrapping them. By default they wrap.
- `lineNbr`: number of the first line, by default `1`. It is used when line numbers are shown.
- `caption_title`: title of the caption. The caption is only shown when it is set.
- `caption_description`: text of the caption, below the title. Use `\n` to break lines.
- `styles`: an object with `align` (`left`, `center` or `right`, by default `center`) and `size` (`s`, `m` or `l`, by default `l`).

### Examples

```json
{ "@type": "codeBlock" }
```

```json
{
  "@type": "codeBlock",
  "code": "from plone import api\n\nuser = api.user.get(username=\"admin\")",
  "language": "python",
  "style": "dark",
  "showLineNumbers": true,
  "wrapLongLines": true,
  "lineNbr": 1,
  "caption_title": "Get a user",
  "caption_description": "Uses plone.api.",
  "styles": { "align": "center", "size": "l" }
}
```
