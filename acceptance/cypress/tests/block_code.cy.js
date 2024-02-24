context('Code Block Acceptance Tests', () => {
  describe('Code Block Tests', () => {
    beforeEach(() => {
      // given a logged in editor and a page in edit mode
      cy.visit('/');
      cy.autologin();
      cy.createContent({
        contentType: 'Document',
        contentId: 'document',
        contentTitle: 'Test document',
      });
      cy.createContent({
        contentType: 'Document',
        contentId: 'my-page',
        contentTitle: 'My Page',
        path: '/document',
      });
      cy.visit('/document');
      cy.navigate('/document/edit');
    });

    it('As editor I can add a Code Block', function () {
      cy.intercept('PATCH', '/**/document').as('edit');
      cy.intercept('GET', '/**/document').as('content');
      cy.intercept('GET', '/**/Document').as('schema');

      cy.getSlate().click();
      cy.get('.button .block-add-button').click({ force: true });
      cy.get('.blocks-chooser .text .button.codeBlock').click({ force: true });

      cy.get(
        '.inline.field.field-wrapper-showLineNumbers .ui.checkbox',
      ).click();

      cy.get('.code-block-wrapper.edit textarea')
        .click()
        .type('from plone import api\n\nuser=api.user.get(username="admin")');

      cy.get('#toolbar-save').click();
    });
  });
});
