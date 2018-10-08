import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    queryParams: ['Account'],
    Account: null,

    contactList: computed('Account', function() {
        let account = this.Account;

        if (account) {
            return this.contacts.filterBy('Account', account);
        } else {
            return this.contacts;
        }
    })
});
