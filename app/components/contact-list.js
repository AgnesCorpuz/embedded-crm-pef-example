import Component from '@ember/component';

export default Component.extend({
    init(){
        this._super(...arguments);
        this.contacts = [
            {
                "FirstName": "Agnes",
                "LastName": "Corpuz",
                "Account": "Genesys",
                "Phone": "+632-840-6444",
                "Email": "testuser1@testdomain.com"
            },
            {
                "FirstName": "Prince",
                "LastName": "Merluza",
                "Account": "Genesys",
                "Phone": "3172222222",
                "Email": "testuser2@testdomain.com"
            },
            {
                "FirstName": "Test",
                "LastName": "User",
                "Account": "Other",
                "Phone": "3172222222",
                "Email": "testuser3@testdomain.com"
            }
        ];

        var contactList;
        var account = new URLSearchParams(window.location.search).get('Account');

        if (account) {
            contactList = this.contacts.filterBy('Account', account);
            this.contactList = contactList;
        } else {
            contactList = this.contacts;
            this.contactList = this.contacts;
        }
    },
    actions: {
        clickToDial(num) {
            document.getElementById("softphone").contentWindow.postMessage(JSON.stringify({
                type: 'clickToDial',
                data: { number: num, autoPlace: true }
            }), "*");
        }
    }
});
