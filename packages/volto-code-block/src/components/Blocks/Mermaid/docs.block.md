---
block: mermaidBlock
---

Renders a Mermaid diagram from its text definition, with an optional caption.

The diagram is drawn in the browser, and the block renders nothing while `code` is empty.

### Fields

- `code`: the diagram, in Mermaid syntax, with `\n` line breaks. It is not in the schema, because editors type it in the block itself.
- `caption_title`: title of the caption. The caption is only shown when it is set.
- `caption_description`: text of the caption, below the title. Use `\n` to break lines.
- `styles`: an object with `align` (`left`, `center` or `right`, by default `center`).

### Examples

```json
{ "@type": "mermaidBlock" }
```

```json
{
  "@type": "mermaidBlock",
  "code": "graph TD;\n  A-->B;\n  A-->C;",
  "caption_title": "A simple flow",
  "caption_description": "From A to B and C.",
  "styles": { "align": "center" }
}
```
