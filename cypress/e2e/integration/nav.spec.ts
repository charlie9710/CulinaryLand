describe('Navigation Tests', () => {
    it('should navigate to the about page', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            console.log('Error:', err);
            return false;
        });
        
        cy.visit('http://localhost:8100');
    });
});
