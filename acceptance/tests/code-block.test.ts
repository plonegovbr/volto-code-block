import { addTextBlock, editDocument, save } from './blocks';
import { createContent } from './content';
import { login } from './login';
import { expect, test } from './test';

test.describe('Code Block', () => {
  test.beforeEach(async ({ page, request }) => {
    await createContent(request, {
      contentType: 'Document',
      contentId: 'document',
      contentTitle: 'Test document',
    });
    await login(page);
  });

  test('As editor I can add a Code Block', async ({ page }) => {
    await editDocument(page, '/document');
    await addTextBlock(page, 'codeBlock');

    await page
      .locator('.inline.field.field-wrapper-showLineNumbers .ui.checkbox')
      .click();
    await page
      .locator('.code-block-wrapper.edit textarea')
      .fill('from plone import api\n\nuser=api.user.get(username="admin")');
    await save(page);

    // Volto styles any `.block .toolbar`, so Prism's needs its own rules.
    const toolbar = page.locator('.code-toolbar > .toolbar');
    const code = page.locator('.code-toolbar pre');
    await expect(toolbar).toHaveCSS('opacity', '1');
    await expect(toolbar).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(code).toHaveCSS('white-space', 'pre-wrap');

    const toolbarBox = await toolbar.boundingBox();
    const codeBox = await code.boundingBox();
    if (!toolbarBox || !codeBox) {
      throw new Error('The code block is not rendered');
    }
    const toolbarRight = toolbarBox.x + toolbarBox.width;
    expect(codeBox.x + codeBox.width - toolbarRight).toBeLessThan(20);
    expect(toolbarBox.width).toBeLessThan(120);
  });

  test('As editor I see the line numbers while editing', async ({ page }) => {
    await editDocument(page, '/document');
    await addTextBlock(page, 'codeBlock');

    const textarea = page.locator('.code-block-wrapper.edit textarea');
    const numbers = page.locator('.code-block-wrapper.edit .line-number');
    await textarea.fill('"""two\nlines"""\n\nvalue = 1');
    await expect(numbers).toHaveCount(4);

    // The caret only matches the text if both layers start at the same place.
    const pre = page.locator('.code-block-wrapper.edit pre');
    const left = await pre.evaluate((el) => getComputedStyle(el).paddingLeft);
    expect(parseFloat(left)).toBeGreaterThan(10);
    await expect(textarea).toHaveCSS('padding-left', left);

    // Every number is in the gutter, also those inside a multi-line token.
    const preBox = await pre.boundingBox();
    if (!preBox) {
      throw new Error('The code block is not rendered');
    }
    const offsets = await numbers.evaluateAll((elements) =>
      elements.map((element) => element.getBoundingClientRect().x),
    );
    expect(offsets).toEqual(Array(4).fill(preBox.x));

    await page.locator('#field-lineNbr').fill('5');
    await expect(
      page.locator('.code-block-wrapper.edit > div').first(),
    ).toHaveCSS('counter-reset', 'linenumber 4');

    await page
      .locator('.inline.field.field-wrapper-showLineNumbers .ui.checkbox')
      .click();
    await expect(numbers).toHaveCount(0);
    await expect(textarea).toHaveCSS('padding-left', '10px');
  });

  test('The line numbers survive a full load', async ({ page }) => {
    await editDocument(page, '/document');
    await addTextBlock(page, 'codeBlock');
    await page
      .locator('.code-block-wrapper.edit textarea')
      .fill('from plone import api\n\nuser=api.user.get(username="admin")');
    await save(page);

    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    // Puts anything scheduled with `requestAnimationFrame` after the hydration,
    // as in a tab that is in the background while the page loads.
    await page.addInitScript(() => {
      const { requestAnimationFrame } = window;
      window.requestAnimationFrame = (callback) =>
        window.setTimeout(() => requestAnimationFrame(callback), 3000);
    });
    await page.reload({ waitUntil: 'load' });
    await page.waitForTimeout(5000);

    const rows = page.locator('pre.line-numbers .line-numbers-rows > span');
    await expect(rows).toHaveCount(3);
    await expect(page.locator('pre.line-numbers .token').first()).toBeVisible();
    expect(errors).toEqual([]);
  });
});
