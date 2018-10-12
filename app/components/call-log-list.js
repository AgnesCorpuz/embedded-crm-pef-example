import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    contactService: service('contacts-service'),
    callLogs: null,
    init(){
        this._super(...arguments);
        this.callLogs = this.contactService.logs;
    }
});
