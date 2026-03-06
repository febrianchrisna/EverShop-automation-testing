import LoginPage from "../../support/POM/LoginPage";

describe('TC01 Login Page Tests', () => {
    const loginPage = new LoginPage();

    let loginData;

    before(() => {
        cy.fixture('loginUser').then((data) => {
            loginData = data;
        });
    });

    beforeEach(() => {
        loginPage.visit();
    })

    context('TC01001 - Login User (Valid Data)', () => {
        it('User berhasil melakukan login dan diarahkan ke halaman beranda', () => {
            const { email, password } = loginData.validLogin;
            loginPage.login(email, password);
            loginPage.verifyLoginSuccess();
        });
    })

    context('TC01002 - Login User Email Kapital', () => {
        it('User berhasil melakukan login dengan email kapital dan diarahkan ke halaman beranda', () => {
            const { email, password } = loginData.capitalizedEmail;
            loginPage.login(email, password);
            loginPage.verifyLoginSuccess();
        });
    })

    context('TC01003 - Login User Email Tidak Terdaftar', () => {
        it('User gagal melakukan login dengan email tidak terdaftar dan menampilkan pesan error', () => {
            const { email, password } = loginData.unregisteredEmail;
            loginPage.login(email, password);
            loginPage.verifyInvalidCredentialsErrorMessage();
        });
    })

    context('TC01004 - Login User Email Tidak Valid', () => {
        it('User gagal melakukan login dengan format email tidak valid (tanpa @) dan menampilkan pesan error', () => {
            const { email, password } = loginData.invalidEmailFormat;
            loginPage.login(email, password);
            loginPage.verifyInvalidCredentialsErrorMessage();
        });
    })

    context('TC01005 - Login User Form Kosong', () => {
        it('User gagal melakukan login dengan form kosong dan menampilkan pesan error untuk email dan password', () => {
            const { email, password } = loginData.emptyData;
            loginPage.login(email, password);
            loginPage.verifyEmailErrorMessage();
            loginPage.verifyPasswordErrorMessage();
        });
    })

    context('TC01006 - Login User Password 250 Karakter', () => {
        it('User gagal melakukan login dengan Password 250 Karakter dan menampilkan pesan error', () => {
            const { email, password } = loginData.manyPasswordCharacters;
            loginPage.login(email, password);
            loginPage.verifyPasswordLengthErrorMessage();
        });
    })

    context('TC01007 - Button Validation Checking', () => {
        it('Semua button dapat berfungsi sebagaimana mestinya', () => {
            loginPage.mutePassword();
            loginPage.mutePassword();
            loginPage.createAccount();
            cy.url().should('include', '/account/register');
            loginPage.visit();
            loginPage.forgotPassword();
            cy.url().should('include', '/account/reset-password');
            loginPage.visit();
            loginPage.breadcrumbHome();
            cy.url().should('eq', `${Cypress.config().baseUrl}/`);
        });
    })

    context('TC01008 - Login User Spam Button Ketika Error', () => {
        it('Button Sign In di Block dan menampilkan pesan Please Try Again Later', () => {
            const { email, password } = loginData.unregisteredEmail;
            for (let i = 0; i < 5; i++) {
                loginPage.login(email, password);
            }
            loginPage.verifySpamLoginButton();
        });
    })

    context('TC01009 - Login User Password Dibawah Minimum Karakter', () => {
        it('User gagal melakukan login dengan Password dibawah minimum karakter dan menampilkan pesan error', () => {
            const { email, password } = loginData.belowMinimumPasswordCharacters;
            loginPage.login(email, password);
            loginPage.verifyPasswordLengthErrorMessage();
        });
    })
});