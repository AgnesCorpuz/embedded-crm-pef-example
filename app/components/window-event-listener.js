import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    frameworkService: service('framework-config'),
    contactService: service('contacts-service'),
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
                        

                        let searchVal = encodeURIComponent(attributes.pef_searchvalue);
                        
                        console.log('================================');
                        console.log('PEF SEARCHVALUE DETECTED ' + searchVal);
                        
                        this.get('router').transitionTo('search', {
                            queryParams: {
                                query: decodeURIComponent(searchVal)
                            }
                        });
                    }else{
                        // TODO: Default behavior for screen pop
                    }
                } 
            }
        });
    }
});
