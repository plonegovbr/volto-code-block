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

      // Volto styles any `.block .toolbar`, so Prism's needs its own rules.
      cy.get('.code-toolbar > .toolbar')
        .should('have.css', 'opacity', '1')
        .and('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        .then(($toolbar) => {
          const toolbar = $toolbar[0].getBoundingClientRect();
          const pre = Cypress.$('.code-toolbar pre')[0].getBoundingClientRect();
          expect(pre.right - toolbar.right).to.be.lessThan(20);
          expect(toolbar.width).to.be.lessThan(120);
        });
      cy.get('.code-toolbar pre').should('have.css', 'white-space', 'pre-wrap');
    });
  });
});
