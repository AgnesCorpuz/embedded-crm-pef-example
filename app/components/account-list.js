import Component from '@ember/component';

export default Component.extend({
    init(){
        this._super(...arguments);
        this.accounts = [
            {
                "Name": "Genesys",
                "Office": "Daly City",
                "Address": "2001 Junipero Serra Blvd Daly City, CA 94014",
                "Phone": "+1.650.466.1100"
            },
            {
                "Name": "Google",
                "Office": "Los Angeles",
                "Address": "340 Main Street Los Angeles, CA 90291",
                "Phone": "+1 310-310-6000"
            },
            {
                "Name": "Facebook",
                "Office": "California",
                "Address": "Facebook Headquarters 1 Hacker Way Menlo Park, CA 94025",
                "Phone": "+1 650-543-4800"
            }
        ];

        var account = new URLSearchParams(window.location.search).get('Account');

        if (account) {
            var accounts = this.accounts;
            this.toggleProperty('enabled');
            this.set("selectedAccount", account);
            this.set("accountList", accounts.filterBy('Name', account));
        }
    },
    selectedAccount: null,
    accountList: null,
    actions: {
        toggle: function(name) {
            var accounts = this.accounts;
            this.toggleProperty('enabled');
            this.set("selectedAccount", name);
            this.set("accountList", accounts.filterBy('Name', name));
        }
    }
});
