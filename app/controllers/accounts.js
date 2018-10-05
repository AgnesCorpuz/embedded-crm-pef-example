import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    queryParams: ['Account'],
    Account: null,

    filteredAccounts: computed('Account', function() {
        let account = this.Account;

        if (account) {
            var accounts = this.accounts;
            this.toggleProperty('enabled');
            this.set("selectedAccount", name);
            this.set("accountList", accounts.filterBy('Name', name));
        }
    })
});
