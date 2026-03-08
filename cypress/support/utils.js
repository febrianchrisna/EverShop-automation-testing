export function uniqueEmail(email) {
    const [local, domain] = email.split('@');
    return `${local}_${Date.now()}@${domain}`;
}

export function uniqueName(name) {
    return `${name} ${Date.now()}`;
}

// export function disableProtections() {
//     Cypress.on('window:before:load', (win) => {
//         // Force window.open to stay in the same tab
//         win.open = (url) => {
//             if (url) {
//                 win.location.href = url;
//             }
//             return win;
//         };

//         // Hapus proteksi context menu
//         Object.defineProperty(win, 'oncontextmenu', {
//             get: () => null,
//             set: () => {},
//         });

//         // Stop event listener keydown
//         win.document.addEventListener('keydown', (e) => {
//             e.stopImmediatePropagation();
//         }, true);

//         // Nonaktifkan alert dan console
//         win.console.log = () => {};
//         win.console.warn = () => {};
//         win.console.error = () => {};
//         win.alert = () => {};

//         // Hapus navigator.webdriver
//         delete win.navigator.__proto__.webdriver;
//     });
// }

// // Setup intercept untuk disable devtool - dipanggil terpisah
// export function interceptDevtool() {
//     cy.intercept('GET', 'https://cdn.jsdelivr.net/npm/disable-devtool@latest', {
//         body: '',
//     }).as('disableDevtool');
// }