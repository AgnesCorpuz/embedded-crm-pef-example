import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    queryParams: ['Account'],
    Account: null,

    filteredAccounts: computed('Account', function() {
        if (this.Account) {
            this.contactList = this.contacts.filterBy('Account', this.Account);
        } else {
            this.contactList = this.contacts;
        }
    })
});
