import Component from '@ember/component';

export default Component.extend({
    init(){
        this._super(...arguments);
        this.accounts = [
            {
                "Name": "Genesys",
                "Office": "Daly City",
                "Address": "2001 Junipero Serra Blvd Daly City, CA 94014",
                "TollFree": "888.GENESYS"
            },
            {
                "Name": "Other",
                "Office": "Somewhere City",
                "Address": "1234 Something Blvd Somewhere City, XX 12345",
                "TollFree": "123.TOLLFREE"
            }
        ]
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
