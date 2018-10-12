import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    frameworkService: service('framework-config'),
    contactsService: service('contacts-service'),
    router: service('router'),

    // TODO: Consolidate assignment of event listener to this Controller
    didInsertElement(){
        
        window.addEventListener("message", (event) => {
            // console.log('====================================');
            // console.log(this);
            // console.log(this.frameworkService);
            var message = JSON.parse(event.data);
            
            if(message){
                if(message.type == "screenPop"){
                    console.log('====================================');
                    console.log(message);

                    let attributes = message.data.interactionId.attributes;


                    if(this.frameworkService.enablePEFUrlPop){
                        let urlpop = decodeURIComponent(attributes.pef_urlpop);

                        console.log('================================');
                        console.log('PEF SEARCHURLPOP VALUE DETECTED ' + urlpop);
                       
                        this.get('router').transitionTo(urlpop);

                    }else if(this.frameworkService.enablePEFSearchValue){
                        let searchVal = attributes.pef_searchvalue;

                        // Check if E.164 ANI is used for searching and strip the 'tel:'
                        if(searchVal.substring(0,4).toLowerCase().localeCompare("tel:") === 0){
                            searchVal = searchVal.substring(4);
                        }
                        
                        searchVal = encodeURIComponent(searchVal);
                        
                        console.log('================================');
                        console.log('PEF SEARCHVALUE DETECTED ' + searchVal);
                        
                        let results = this.contactsService.searchContact(searchVal);
                        if(results.length == 1){
                            console.log("JUST 1!");
                            this.get('router').transitionTo('contacts.contact', results[0].id);
                        }else{
                            this.get('router').transitionTo('search', {
                                queryParams: {
                                    query: searchVal
                                }   
                            });
                        }
                    }else{
                        // TODO: Default behavior for screen pop
                    }
                } 
            }
        });
    }
});
