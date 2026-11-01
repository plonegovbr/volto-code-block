import type { Page } from '@playwright/test';
import { expect } from './test';

/** Opens the document in edit mode, as a logged in editor. */
export async function editDocument(page: Page, path: string) {
  await page.goto(`${path}/edit`);
  await expect(page.locator('#toolbar-save')).toBeVisible();
}

/** Adds a block of the `text` group through the blocks chooser. */
export async function addTextBlock(page: Page, blockId: string) {
  const editor = page.locator('.block .slate-editor [contenteditable=true]');
  await editor.click();
  await editor.hover();
  await page.getByRole('button', { name: 'Add block', exact: true }).click();
  // Only the `mostUsed` group starts unfolded.
  await page
    .locator('.blocks-chooser .accordion .title')
    .filter({ hasText: /^Text$/ })
    .click();
  await page.locator(`.blocks-chooser .text .button.${blockId}`).click();
}

/** Saves the form and waits for the view of the content. */
export async function save(page: Page) {
  const contentURL = new URL(page.url());
  contentURL.pathname = contentURL.pathname.replace(/\/edit$/, '');
  contentURL.search = '';
  const saved = page.waitForResponse(
    (response) =>
      response.request().method() === 'PATCH' &&
      new URL(response.url()).pathname.endsWith(contentURL.pathname),
  );
  await page.locator('#toolbar-save').click();
  expect((await saved).ok()).toBeTruthy();
  await expect(page).toHaveURL(contentURL.toString());
}
