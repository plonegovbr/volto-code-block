context('Mermaid Block Acceptance Tests', () => {
  describe('Mermaid Block Tests', () => {
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

    it('As editor I can add a Mermaid Block', function () {
      cy.visit('/document');
      cy.navigate('/document/edit');
      cy.getSlate().click();

      cy.get('.button .block-add-button').click({ force: true });
      cy.get('.blocks-chooser .text .button.mermaidBlock').click({
        force: true,
      });
      cy.get('pre.language-mermaid + textarea')
        .click()
        .type(
          'sequenceDiagram\n    Alice->>John: Hello John, how are you?\nJohn-->>Alice: Great!\nAlice-)John: See you later!',
        );
      cy.get('#toolbar-save').click();
      cy.wait(100);
      cy.get('.mermaidWrapper > div > svg').should('be.visible');
    });
  });
});
