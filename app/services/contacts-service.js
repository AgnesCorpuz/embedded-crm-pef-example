import Service from '@ember/service';

export default Service.extend({
    init(){
        this._super(...arguments);

        this.contacts = [
            {
                "id": "1",
                "FirstName": "Agnes",
                "LastName": "Corpuz",
                "Account": "Genesys",
                "Phone": "+6328406444",
                "Email": "testuser1@testdomain.com"
            },
            {
                "id": "2",
                "FirstName": "Prince",
                "LastName": "Merluza",
                "Account": "Genesys",
                "Phone": "+6328643338",
                "Email": "testuser2@testdomain.com"
            },
            {
                "id": "3",
                "FirstName": "Larry",
                "LastName": "Page",
                "Account": "Google",
                "Phone": "+13172222222",
                "Email": "testuser3@testdomain.com"
            },
            {
                "id": "4",
                "FirstName": "Mark",
                "LastName": "Zuckerberg",
                "Account": "Facebook",
                "Phone": "+13172222222",
                "Email": "testuser4@testdomain.com"
            }
        ];
    },
    getContact(contactId){
        let contact = this.contacts.filter((contact) => 
                            contact.id === contactId);
        return contact[0];
    }
});
