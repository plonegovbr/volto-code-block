const MARKER = '<span class="line-number"></span>';

/**
 * Adds an empty marker at the start of each line of highlighted code, which the
 * theme numbers with a CSS counter and moves to the gutter.
 *
 * A marker follows the line inside a multi-line token, and wrapped lines get no
 * second number. Newlines in Prism's output are always text, never in a tag.
 */
export const addLineMarkers = (html: string): string =>
  MARKER + html.replace(/\n/g, `\n${MARKER}`);
