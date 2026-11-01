import { addTextBlock, editDocument, save } from './blocks';
import { createContent } from './content';
import { login } from './login';
import { expect, test } from './test';

test.describe('Mermaid Block', () => {
  test.beforeEach(async ({ page, request }) => {
    await createContent(request, {
      contentType: 'Document',
      contentId: 'document',
      contentTitle: 'Test document',
    });
    await login(page);
  });

  test('As editor I can add a Mermaid Block', async ({ page }) => {
    await editDocument(page, '/document');
    await addTextBlock(page, 'mermaidBlock');

    await page
      .locator('pre.language-mermaid + textarea')
      .fill(
        'sequenceDiagram\n    Alice->>John: Hello John, how are you?\nJohn-->>Alice: Great!\nAlice-)John: See you later!',
      );
    await save(page);

    await expect(page.locator('.mermaidWrapper > div > svg')).toBeVisible();
  });
});
