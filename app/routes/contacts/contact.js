import Route from '@ember/routing/route';
import { inject as service }from '@ember/service';

export default Route.extend({
    contactsService: service('contacts-service'),

    model(params){
        console.log('=============================');
        console.log(params);
        return this.contactsService.getContact(params.contact_id);
    }
});
