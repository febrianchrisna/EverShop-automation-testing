import ForgotPassPage from '../../support/POM/ForgotPassPage';

describe('TC02 Forgot Password Page Tests', () => {
    const forgotPassPage = new ForgotPassPage();

    let resetData;

    before(() => {
        cy.fixture('loginUser').then((data) => {
            resetData = data;
        });
    })

    beforeEach(() => {
        forgotPassPage.visit();
    })

    context('TC02001 - Reset Password with Valid Email', () => {
        it('User berhasil melakukan reset password dengan email valid dan menampilkan pesan sukses', () => {
            const { email } = resetData.validLogin;
            forgotPassPage.resetPassword(email);
            forgotPassPage.verifyResetPasswordSuccess();
        });
    })

    context('TC02002 - Reset Password with Unregistered Email', () => {
        it('User gagal melakukan reset password dengan email tidak terdaftar dan menampilkan pesan error', () => {
            const { email } = resetData.unregisteredEmail;
            forgotPassPage.resetPassword(email);
            forgotPassPage.verifyInvalidEmailErrorMessage();
        });
    })

    context('TC02003 - Reset Password with Invalid Email Format', () => {
        it('User gagal melakukan reset password dengan format email tidak valid dan menampilkan pesan error', () => {
            const { email } = resetData.invalidEmailFormat;
            forgotPassPage.resetPassword(email);
            forgotPassPage.verifyInvalidEmailErrorMessage();
        });
    })

    context('TC02004 - Reset Password with Empty Email', () => {
        it('User gagal melakukan reset password dengan form kosong dan menampilkan pesan error', () => {
            const { email } = resetData.emptyData;
            forgotPassPage.resetPassword(email);
            forgotPassPage.verifyEmailRequiredErrorMessage();
        });
    })

    context('TC02005 - Reset Password Spam Button', () => {
        it('Melakukan Spaming reset button lebih dari 5 kali dan menampilkan pesan error', () => {
            const { email } = resetData.unregisteredEmail;
            for (let i = 0; i < 5; i++) {
                forgotPassPage.resetPassword(email);
            }
            forgotPassPage.verifyResetPasswordSpamErrorMessage();
        });
    })

    context('TC02006 - Button Breadcrumb Home', () => {
        it('User berhasil diarahkan ke halaman beranda ketika mengklik tombol breadcrumb Home', () => {
            forgotPassPage.breadcrumbHomeLink.click();
            cy.url().should('eq', `${Cypress.config().baseUrl}/`);
        });
    })

})