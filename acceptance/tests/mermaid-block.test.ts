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

    // Mermaid's `startOnLoad` runs on the `load` event, which it only sees when
    // its chunk arrives first. A pending image holds the event back, as the
    // images of a real page do.
    await page.route('**/hold-load-event.png', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await route.abort();
    });
    await page.addInitScript(() => {
      document.addEventListener('DOMContentLoaded', () => {
        const image = document.createElement('img');
        image.src = '/hold-load-event.png';
        document.body.appendChild(image);
      });
    });
    await page.reload({ waitUntil: 'load' });
    await expect(page.locator('.mermaidWrapper > div > svg')).toBeVisible();
    await expect(page.locator('.block.mermaid')).not.toHaveAttribute(
      'data-processed',
    );
  });
});
