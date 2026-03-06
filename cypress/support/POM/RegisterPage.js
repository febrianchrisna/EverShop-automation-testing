class RegisterPage {
    // ELEMENT LOCATORS
    get FullNameField(){
        return cy.get('#field-full_name');
    }

    get EmailField(){
        return cy.get('#field-email');
    }

    get PasswordField(){
        return cy.get('#field-password');
    }

    get mutedPasswordIcon(){
        return cy.get('div.text-muted-foreground > button.transition-colors > svg')
    }
    
    get signUpButton(){
        return cy.contains('Sign Up');
    }

    get fullNameErrorMessage(){
        return cy.contains('Full Name is required');
    }

    get emailEmptyErrorMessage(){
        return cy.contains('Email is required');
    }

    get emailRegisteredErrorMessage(){
        return cy.contains('Email is already used');
    }

    get emailInvalidErrorMessage(){
        return cy.contains('Please enter a valid email address');
    }

    get passwordErrorMessage(){
        return cy.contains('Password is required');
    }

    get passwordLengthErrorMessage(){
        return cy.contains('Password must be at least 6 characters long');
    }

    get fullNameLengthErrorMessage(){
        return cy.contains('Full Name must be maximal 20 characters long');
    }

    get spamErrorMessage(){
        return cy.contains('Too many registration attempts. Please try again later.');
    }

    get breadcrumbHomeLink(){
        return cy.contains('Home')
    }

    get loginLink(){
        return cy.contains('Login');
    }

    // ACTION METHODS
    visit(){
        cy.visit('/account/register');
        cy.url().should('include', '/account/register');
    }

    fillFullName(fullName){
        if (fullName) this.FullNameField.clear().type(fullName);
    }

    fillEmail(email){
       if (email) this.EmailField.clear().type(email);
    }

    fillPassword(password){
        if (password) this.PasswordField.clear().type(password);
    }

    clickSignUpButton(){
        this.signUpButton.click();
    }

    register(fullName, email, password){
        this.fillFullName(fullName);
        this.fillEmail(email);
        this.fillPassword(password);
        this.clickSignUpButton();
    }

    mutePassword(){
        this.mutedPasswordIcon.click();
    }

    breadcrumbHome() {
        this.breadcrumbHomeLink.click();
    }

    loginLinkButton() {
        this.loginLink.click();
    }

    // ASSERTION VALIDASI
    verifyRegistrationSuccess() {
        cy.url().should('not.include', '/account/register');
    }

    verifyFullNameRequiredErrorMessage() {
        this.fullNameErrorMessage.should('be.visible');
    }

    verifyEmailRequiredErrorMessage() {
        this.emailEmptyErrorMessage.should('be.visible');
    }

    verifyEmailInvalidErrorMessage() {
        this.emailInvalidErrorMessage.should('be.visible');
    }

    verifyPasswordRequiredErrorMessage() {
        this.passwordErrorMessage.should('be.visible');
    }

    verifyPasswordLengthErrorMessage() {
        this.passwordLengthErrorMessage.should('be.visible');
    }

    verifyFullNameLengthErrorMessage() {
        this.fullNameLengthErrorMessage.should('be.visible');
    }

    verifyRegistrationSpamErrorMessage() {
        this.spamErrorMessage.should('be.visible');
    }

    verifyEmailAlreadyRegisteredErrorMessage() {
        this.emailRegisteredErrorMessage.should('be.visible');
    }
}

export default RegisterPage;