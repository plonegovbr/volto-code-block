---
block: gistBlock
---

Embeds a public GitHub Gist, with all of its files or only one of them, and an optional caption.

The block stores a reference to the Gist, not its content, and the browser loads the content from GitHub.

### Fields

- `gistId`: path of the Gist, as `username/id`. Nothing is embedded without it.
- `file`: name of one file of the Gist. Without it, all the files are shown.
- `caption_title`: title of the caption. The caption is only shown when it is set.
- `caption_description`: text of the caption, below the title. Use `\n` to break lines.
- `styles`: an object with `align` (`left`, `center` or `right`, by default `center`) and `size` (`s`, `m` or `l`, by default `l`).

### Examples

```json
{ "@type": "gistBlock" }
```

```json
{
  "@type": "gistBlock",
  "gistId": "username/6f876b895a60d07925796190a37e8263",
  "file": "docker-compose.yml",
  "caption_title": "Docker Compose",
  "caption_description": "The stack of this project.",
  "styles": { "align": "center", "size": "m" }
}
```
