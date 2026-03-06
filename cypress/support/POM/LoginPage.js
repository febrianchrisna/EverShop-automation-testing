class LoginPage {
    // ELEMENT SELECTORS
    get emailField(){
        return cy.get('#field-email');
    }

    get passwordField(){
        return cy.get('#field-password');
    }

    get loginButton(){
        return cy.contains('Sign In');
    }

    get mutedPasswordIcon(){
        return cy.get('div.text-muted-foreground > button.transition-colors > svg')
    }
    
    get emailErrorMessage(){
        return cy.contains('Email is required');
    }

    get passwordErrorMessage(){
        return cy.contains('Password is required');
    }

    get passwordLengthErrorMessage(){
        return cy.contains('Password must be at least 6 characters long');
    }

    get errorMessage(){
        return cy.contains('Invalid email or password');
    }

    get spamErrorMessage(){
        return cy.contains('Too many login attempts. Please try again later.');
    }

    get forgotPasswordLink(){
        return cy.get('.login__page__options > .text-destructive')
    }

    get createAccountLink(){
        return cy.get('.text-interactive')
    }

    get breadcrumbHomeLink(){
        return cy.contains('Home')
    }

    // ACTION METHODS

    visit(){
        cy.visit('/account/login');
        cy.url().should('include', '/account/login');
    }

    fillEmail(email){
       if (email) this.emailField.clear().type(email);
    }

    fillPassword(password){
        if (password) this.passwordField.clear().type(password);
    }

    clickLoginButton(){
        this.loginButton.click();
    }

    login(email, password){
        this.fillEmail(email);
        this.fillPassword(password);
        this.clickLoginButton();
    }

    mutePassword(){
        this.mutedPasswordIcon.click();
    }

    createAccount(){
        this.createAccountLink.click();
    }

    forgotPassword(){
        this.forgotPasswordLink.click();
    }

    breadcrumbHome(){
        this.breadcrumbHomeLink.click();
    }

    // ASSERTION VALIDASI
    verifyLoginSuccess(){
        cy.wait(4000);
        cy.url().should('not.include', '/account/login');
    }

    verifyEmailErrorMessage(){
        this.emailErrorMessage.should('be.visible');
    }

    verifyPasswordErrorMessage(){
        this.passwordErrorMessage.should('be.visible');
    }

    verifyPasswordLengthErrorMessage(){
        this.passwordLengthErrorMessage.should('be.visible');
    }

    verifyInvalidCredentialsErrorMessage(){
        this.errorMessage.should('be.visible');
    }

    verifySpamLoginButton(){
        this.spamErrorMessage.should('be.visible');
    }
}

export default LoginPage;