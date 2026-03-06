import Checkout from '../../support/POM/Checkout';

describe('TC05 Checkout Unregistered User Tests', () => {
    const checkouUnregistered = new Checkout();
    let checkoutUnregisteredData;
    let loginData;

    before(() => {
        cy.fixture('checkoutUser').then((data) => {
            checkoutUnregisteredData = data;
        });
        cy.fixture('loginUser').then((data) => {
            loginData = data;
        });
    })

    beforeEach(() => {
        checkouUnregistered.visit();
    })

    context('TC05001 - Checkout with Unregistered User', () => {
        it('User berhasil melakukan checkout dengan data valid dan diarahkan ke halaman konfirmasi', () => {
            const { fullName, telephone, address, address2, city, country, province, postalCode, shippingMethod, billingOption, paymentMethod } = checkoutUnregisteredData.validShippingAddressData;
            checkouUnregistered.addToCart();
            checkouUnregistered.checkout();
            checkouUnregistered.fillGuestEmail(loginData.validLogin.email);
            checkouUnregistered.fillShippingAddressForm(fullName, telephone, address, address2, city, country, province, postalCode);
            checkouUnregistered.selectShippingMethod(shippingMethod);
            checkouUnregistered.selectBillingOption(billingOption);
            checkouUnregistered.selectPaymentMethod(paymentMethod);
            checkouUnregistered.placeOrder();
            checkouUnregistered.verifyOrderSuccess();
        });
    })

    context('TC05002 - Checkout with Different Billing Address', () => {
        it('User berhasil melakukan checkout dengan billing address berbeda dari shipping address', () => {
            const { fullName, telephone, address, address2, city, country, province, postalCode, 
                shippingMethod, billingOption, 
                billingFullName, billingTelephone, billingAddress, billingAddress2, billingCity, billingCountry, billingProvince, billingPostalCode,
                paymentMethod 
            } = checkoutUnregisteredData.differentBillingData;
            
            checkouUnregistered.addToCart();
            checkouUnregistered.checkout();
            checkouUnregistered.fillGuestEmail(loginData.validLogin.email);
            checkouUnregistered.fillShippingAddressForm(fullName, telephone, address, address2, city, country, province, postalCode);
            checkouUnregistered.selectShippingMethod(shippingMethod);
            checkouUnregistered.selectBillingOption(billingOption);
            checkouUnregistered.fillBillingForm(billingFullName, billingTelephone, billingAddress, billingAddress2, billingCity, billingCountry, billingProvince, billingPostalCode);
            checkouUnregistered.selectPaymentMethod(paymentMethod);
            checkouUnregistered.placeOrder();
            checkouUnregistered.verifyOrderSuccess();
        });
    })

    context('TC05003 - Checkout with overstock Quantity', () => {
        it('User gagal melakukan checkout dengan quantity melebihi stok yang tersedia dan menampilkan pesan error', () => {
            const { color, quantity } = checkoutUnregisteredData.overStockQuantity;
            checkouUnregistered.itemDetails();
            checkouUnregistered.itemDetailsColor(color);
            checkouUnregistered.fillItemQuantity(quantity);
            checkouUnregistered.itemDetailsAddToCart();
            checkouUnregistered.verifyItemQuantityInvalidStockErrorMessage();
        });
    })

    context('TC05004 - Checkout with Empty Color and Quantity Field', () => {
        it('User gagal melakukan checkout dengan mengkosongkan field Color dan Quantity dan menampilkan pesan error', () => {
            const { color, quantity } = checkoutUnregisteredData.emptyData;
            checkouUnregistered.itemDetails();
            checkouUnregistered.itemDetailsColor(color);
            checkouUnregistered.fillItemQuantity(quantity);
            checkouUnregistered.itemDetailsAddToCart();
            checkouUnregistered.verifyItemColorErrorMessage();
            checkouUnregistered.verifyItemQuantityEmptyErrorMessage();
        });
    })

    context('TC05005 - Checkout with Empty Shipping Address', () => {
        it('User gagal melakukan checkout dengan mengkosongkan field Shipping Address dan menampilkan pesan error', () => {
            const { fullName, telephone, address, address2, city, country, province, postalCode, paymentMethod } = checkoutUnregisteredData.emptyCheckoutData;
            checkouUnregistered.addToCart();
            checkouUnregistered.checkout();
            checkouUnregistered.fillShippingAddressForm(fullName, telephone, address, address2, city, country, province, postalCode);
            checkouUnregistered.selectPaymentMethod(paymentMethod);
            checkouUnregistered.placeOrder();
            checkouUnregistered.verifyAllAddressFieldsErrorMessage();
            checkouUnregistered.verifyExpressShippingMethodErrorMessage()
        });
    })

    context('TC05006 - Checkout with 250 Characters in All Mandatory Fields', () => {
        it('User gagal melakukan checkout dengan mengisi semua mandatory field 250 karakter dan menampilkan pesan error', () => {
            const { fullName, telephone, address, address2, city, country, province, postalCode, shippingMethod, billingOption, paymentMethod } = checkoutUnregisteredData.manyCharactersCheckoutData;
            
            checkouUnregistered.addToCart();
            checkouUnregistered.checkout();
            checkouUnregistered.fillGuestEmail(loginData.unregiteredCheckoutEmail.email);
            checkouUnregistered.fillShippingAddressForm(fullName, telephone, address, address2, city, country, province, postalCode);
            checkouUnregistered.selectShippingMethod(shippingMethod);
            checkouUnregistered.selectBillingOption(billingOption);
            checkouUnregistered.selectPaymentMethod(paymentMethod);
            checkouUnregistered.placeOrder();
            checkouUnregistered.verifyOrderFailedError();
        });
    })

    context('TC05007 - Checkout with Valid VISA Credit Card Payment', () => {
        it('User berhasil melakukan checkout dengan payment method VISA credit card dan data valid', () => {
            const { fullName, telephone, address, address2, city, country, province, postalCode, shippingMethod, billingOption, paymentMethod, cardTab, cardNumber, cardExpiry, cardCvc, cardCountry } = checkoutUnregisteredData.visaCheckoutData;
            
            checkouUnregistered.addToCart();
            checkouUnregistered.checkout();
            checkouUnregistered.fillGuestEmail(loginData.validLogin.email);
            checkouUnregistered.fillShippingAddressForm(fullName, telephone, address, address2, city, country, province, postalCode);
            checkouUnregistered.selectShippingMethod(shippingMethod);
            checkouUnregistered.selectBillingOption(billingOption);
            checkouUnregistered.selectPaymentMethod(paymentMethod);
            checkouUnregistered.fillCreditCardForm(cardTab, cardNumber, cardExpiry, cardCvc, cardCountry);
            checkouUnregistered.placeOrder();
        });
    })


    context('TC05008 - Checkout with Insufficient Funds Credit Card', () => {
        it('User gagal melakukan checkout dengan credit card saldo tidak cukup dan menampilkan pesan error', () => {
            const { fullName, telephone, address, address2, city, country, province, postalCode, shippingMethod, billingOption, paymentMethod, cardTab, cardNumber, cardExpiry, cardCvc, cardCountry } = checkoutUnregisteredData.insufficientFundsCardData;
            
            checkouUnregistered.addToCart();
            checkouUnregistered.checkout();
            checkouUnregistered.fillGuestEmail(loginData.validLogin.email);
            checkouUnregistered.fillShippingAddressForm(fullName, telephone, address, address2, city, country, province, postalCode);
            checkouUnregistered.selectShippingMethod(shippingMethod);
            checkouUnregistered.selectBillingOption(billingOption);
            checkouUnregistered.selectPaymentMethod(paymentMethod);
            checkouUnregistered.fillCreditCardForm(cardTab, cardNumber, cardExpiry, cardCvc, cardCountry);
            checkouUnregistered.placeOrder();
            
            checkouUnregistered.verifyOrderFailedError();
        });
    })

    context('TC05009 - Checkout with Invalid Credit Card Format', () => {
        it('User gagal melakukan checkout dengan format credit card tidak valid dan menampilkan pesan error', () => {
            const { fullName, telephone, address, address2, city, country, province, postalCode, shippingMethod, billingOption, paymentMethod, cardTab, cardNumber, cardExpiry, cardCvc, cardCountry } = checkoutUnregisteredData.invalidCreditCardData;
            
            checkouUnregistered.addToCart();
            checkouUnregistered.checkout();
            checkouUnregistered.fillGuestEmail(loginData.validLogin.email);
            checkouUnregistered.fillShippingAddressForm(fullName, telephone, address, address2, city, country, province, postalCode);
            checkouUnregistered.selectShippingMethod(shippingMethod);
            checkouUnregistered.selectBillingOption(billingOption);
            checkouUnregistered.selectPaymentMethod(paymentMethod);
            checkouUnregistered.fillCreditCardForm(cardTab, cardNumber, cardExpiry, cardCvc, cardCountry);
            checkouUnregistered.verifyCreditCardNumberInvalidError();
            checkouUnregistered.verifyCreditCardExpirationPastError();
        });
    })

    context('TC05010 - Checkout with another Credit card method (amazon pay)', () => {
        it('User berhasil melakukan checkout', () => {
            const { fullName, telephone, address, address2, city, country, province, postalCode, shippingMethod, billingOption, paymentMethod, cardTab } = checkoutUnregisteredData.webhookFailedSimulationData;

            checkouUnregistered.addToCart();
            checkouUnregistered.checkout();
            checkouUnregistered.fillGuestEmail(loginData.validLogin.email);
            checkouUnregistered.fillShippingAddressForm(fullName, telephone, address, address2, city, country, province, postalCode);
            checkouUnregistered.selectShippingMethod(shippingMethod);
            checkouUnregistered.selectBillingOption(billingOption);
            checkouUnregistered.selectPaymentMethod(paymentMethod);
            checkouUnregistered.fillCreditCardForm(cardTab)
            checkouUnregistered.placeOrder();            
        });
    })
    
    
})