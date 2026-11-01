context('Code Block Acceptance Tests', () => {
  describe('Code Block Tests', () => {
    beforeEach(() => {
      // Given a logged in editor
      cy.viewport('macbook-16');
      cy.createContent({
        contentType: 'Document',
        contentId: 'document',
        contentTitle: 'Test document',
      });
      cy.autologin();
    });

    it('As editor I can add a Code Block', function () {
      cy.visit('/document');
      cy.navigate('/document/edit');
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
