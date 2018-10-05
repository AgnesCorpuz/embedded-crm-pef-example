import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    queryParams: ['Account'],
    Account: null,

    filteredAccounts: computed('Account', function() {
        let account = this.Account;
        var contactList;

        if (account) {
            contactList = this.contacts.filterBy('Account', account);
            this.contactList = contactList;
        } else {
            contactList = this.contacts;
            this.contactList = this.contacts;
        }
    })
});
