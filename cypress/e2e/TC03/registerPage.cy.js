import RegisterPage from '../../support/POM/RegisterPage';
import { uniqueEmail } from '../../support/utils';

describe('TC03 Register Page Tests', () => {
    const registerPage = new RegisterPage();

    let registerData;

    before(() => {
        cy.fixture('registerUser').then((data) => {
            registerData = data;
            registerData.validRegister.email = uniqueEmail(registerData.validRegister.email);
            registerData.capitalizedData.email = uniqueEmail(registerData.capitalizedData.email);
        });
    })

    beforeEach(() => {
        registerPage.visit();
    })

    context('TC03001 - Register User (Valid Data)', () => {
        it('User berhasil melakukan registrasi dengan data valid dan diarahkan ke halaman beranda', () => {
            const { fullName, email, password } = registerData.validRegister;
            registerPage.register(fullName, email, password);
            registerPage.verifyRegistrationSuccess();
        });
    })

    context('TC03002 - Register User with capitalized Full Name and Email', () => {
        it('User berhasil melakukan registrasi dengan nama lengkap dan email kapital dan diarahkan ke halaman beranda', () => {
            const { fullName, email, password } = registerData.capitalizedData;
            registerPage.register(fullName, email, password);
            registerPage.verifyRegistrationSuccess();
        });
    })

    context('TC03003 - Register User with Registered Email', () => {
        it('User gagal melakukan registrasi dengan email yang sudah terdaftar dan menampilkan pesan error', () => {
            const { fullName, email, password } = registerData.registeredEmail;
            registerPage.register(fullName, email, password);
            registerPage.verifyEmailAlreadyRegisteredErrorMessage();
        });
    })

    context('TC03004 - Register User with Invalid Email Format', () => {
        it('User gagal melakukan registrasi dengan format email tidak valid dan menampilkan pesan error', () => {
            const { fullName, email, password } = registerData.invalidEmailFormat;
            registerPage.register(fullName, email, password);
            registerPage.verifyEmailInvalidErrorMessage();
        });
    })

    context('TC03005 - Register User with Empty Form', () => {
        it('User gagal melakukan registrasi dengan form kosong dan menampilkan pesan error untuk setiap field', () => {
            const { fullName, email, password } = registerData.emptyData;
            registerPage.register(fullName, email, password);
            registerPage.verifyFullNameRequiredErrorMessage();
            registerPage.verifyEmailRequiredErrorMessage();
            registerPage.verifyPasswordRequiredErrorMessage();
        });
    })

    context('TC03006 - Register User with 250 Characters Data', () => {
        it('User gagal melakukan registrasi dengan data 250 karakter dan menampilkan pesan error untuk setiap field', () => {
            const { fullName, email, password } = registerData.manyDataCharacters;
            registerPage.register(fullName, email, password);
            registerPage.verifyFullNameLengthErrorMessage();
            registerPage.verifyPasswordLengthErrorMessage();
        });
    })

    context('TC03007 - Register User Button Validation', () => {
        it('Semua button dapat berfungsi sebagaimana mestinya', () => {
            registerPage.mutePassword();
            registerPage.mutePassword();
            registerPage.breadcrumbHome();
            registerPage.visit();
            registerPage.loginLinkButton();
            registerPage.visit();
        });
    })

    context('TC03008 - Register User Spam Button', () => {
        it('Melakukan Spaming register button lebih dari 5 kali dan menampilkan pesan error', () => {
            const { fullName, email, password } = registerData.registeredEmail;
            for (let i = 0; i < 5; i++) {
                registerPage.register(fullName, email, password);
            }
            registerPage.verifyRegistrationSpamErrorMessage();
        });
    })

    context('TC03009 - Register User with Password Below Minimum Characters', () => {
        it('User gagal melakukan registrasi dengan password dibawah minimum karakter dan menampilkan pesan error', () => {
            const { fullName, email, password } = registerData.belowMinimumPasswordCharacters;
            registerPage.register(fullName, email, password);
            registerPage.verifyPasswordLengthErrorMessage();
        });
    })
})