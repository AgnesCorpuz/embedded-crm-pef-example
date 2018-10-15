import Component from '@ember/component';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

const Log = EmberObject.extend({});

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
                // Screenpop Configuration
                if(message.type == "screenPop"){
                    console.log('====================================');
                    console.log(message);

                    let attributes = message.data.interactionId.attributes;

                    if(this.frameworkService.enablePEFUrlPop && attributes){
                        if(attributes.pef_urlpop){
                            let urlpop = decodeURIComponent(attributes.pef_urlpop);

                            console.log('================================');
                            console.log('PEF SEARCHURLPOP VALUE DETECTED ' + urlpop);
                        
                            this.get('router').transitionTo(urlpop);
                        }
                    }else if(this.frameworkService.enablePEFSearchValue && attributes){
                        let searchVal = attributes.pef_searchvalue ? 
                                            attributes.pef_searchvalue : 
                                            "";

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

                // Logs for Chat Interactions
                else if ((message.type == "processCallLog") &&
                        (message.data.interactionId.isChat)) {
                    console.log("IT's a chat!!!!!!!!!!!!!!!!!!!!");

                    let data = message.data;
                    let interaction = data.interactionId;
                    
                    // Get entry from chatLogs in Contacts Service
                    // If does not exist, create one and store reference
                    let entryRef = null;
                    let existing = this.contactsService.chatLogs.filter((log) => 
                        log.id.localeCompare(interaction.id) == 0
                    );
                    if(existing.length > 0){
                        entryRef = existing[0];
                    } else {
                        entryRef = Log.create();
                        this.contactsService.chatLogs.pushObject(entryRef);
                    } 

                    // Assign values to properties
                    entryRef.set('id', interaction.id);
                    entryRef.set('name', interaction.name);
                    entryRef.set('notes', (() => {
                            if(data.callLog.notes){
                                return data.callLog.notes;
                            }else{
                                if(!entryRef.get('notes')) return "";
                                else return entryRef.get('notes');
                            }
                    })()); 
                    entryRef.set('priority', (() => {
                        if(data.callLog.attributes && data.callLog.attributes.pef_priority){
                            return data.callLog.attributes.pef_priority;
                        }else{
                            if(!entryRef.get('priority')) return "-";
                            else return entryRef.get('priority');
                        }
                    })());
                    entryRef.set('association', (() => {
                        if(data.callLog.selectedContact){
                            return data.callLog.selectedContact.text;
                        }else{
                            if(!entryRef.get('association')) return "-";
                            else return entryRef.get('association');
                        }
                    })());

                    // Call the Framework to request the transcript
                    document.getElementById("softphone").contentWindow.postMessage(JSON.stringify({
                        type: 'getTranscript',
                        data: {
                            'interactionId': interaction.id
                        }
                    }), "*");
                    
                    console.log('======================');
                    console.log(entryRef);
                    console.log(this.contactsService.chatLogs);
                
                
                } else if(message.type == "chatTranscript"){
                    let entryRef = this.contactsService.chatLogs.filter((log) => 
                        log.id.localeCompare(message.interactionId) == 0
                    )[0];

                    entryRef.set('transcript', JSON.stringify(message.data));
                }
            }
        });
    }
});
