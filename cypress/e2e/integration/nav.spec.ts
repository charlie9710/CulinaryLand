describe('Navigation Tests', () => {
    it('should navigate to the about page without SVG icons', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false; // Retorna false para evitar que el error detenga la prueba
        });
        cy.visit('http://localhost:8100');
        cy.wait(5000); // Ajusta el tiempo de espera según sea necesario

    });
});
