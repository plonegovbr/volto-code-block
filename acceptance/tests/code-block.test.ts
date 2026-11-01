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
});
