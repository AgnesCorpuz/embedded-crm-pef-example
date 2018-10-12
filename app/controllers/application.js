import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    frameworkConfig: service('framework-config'),
    contactsService: service('contacts-service'),
    selectedStatus: null,

    actions: {
        openModal: function(target) {
            var modal = this.get('comp-' + target);
            modal.send('toggleModal');
        },
        setStatus: function(selected) {
            this.set("selectedStatus", selected);
            document.getElementById("softphone").contentWindow.postMessage(JSON.stringify({
                type: 'updateUserStatus',
                data: { id: this.get('selectedStatus') }
            }), "*");
        },
        search(queryString){
            let results = this.contactsService.searchContact(queryString);
            if(results.length == 1){
                console.log("JUST 1!");
                this.transitionToRoute('contacts.contact', results[0].id);
            }else{
                this.transitionToRoute('search', {
                    queryParams: {
                        query: this.queryString
                    }   
                });
            }
        }
    },

    init(){
        this._super(...arguments);

        // For searching
        this.queryString = null;

        // Dynamically build the URL for the Embedded Softphone
        this.frameWorkURL = 
        `https://apps.mypurecloud.com/crm/index.html?` +
        `crm=framework-local-secure` +
        `&crm_domain=${encodeURIComponent('https://localhost')}` +

        // Embedded softphone settings
        `&embedWebRTCByDefault=${this.frameworkConfig.embedWebRTCByDefault}` +
        `&enableCallLogs=${this.frameworkConfig.enableCallLogs}` +
        `&dedicatedLoginWindow=${this.frameworkConfig.dedicatedLoginWindow}` +

        // Softphone language
        `&userLanguage=${this.frameworkConfig.userLanguage}` +

        // Custom Attributes
        `&customAttributes=${this.frameworkConfig.customAttributes.join(",")}` + 

        // Theme
        `&primarycolor=${encodeURIComponent(this.frameworkConfig.theme.primary)}` +
        `&textcolor=${encodeURIComponent(this.frameworkConfig.theme.text)}`;        
    },
    
    addListeners: function() {
        window.addEventListener("message", (event) => {
            var message = JSON.parse(event.data);
                        
            if(message){
                if(message.type == "screenPop"){
                    this.contactsService.interactionId = message.data.interactionId.id;
                } else if(message.type == "contactSearch") {
                    document.getElementById("softphone").contentWindow.postMessage(JSON.stringify({
                        type: 'sendContactSearch',
                        data: [{"type": "external", "name": "Weather Line", "phone":[{ "number":"(317) 222-2222", "label":"Cell"}]}]
                    }), "*");

                    document.getElementById("softphone").contentWindow.postMessage(JSON.stringify({
                        type: 'addTransferContext',
                        data: {"name": "Case: 1234 - Broken Phone","attributes": {"PEF_TransferContext": "Sample Transfer Context 1234"}}
                    }), "*");
                } else if(message.type == "userActionSubscription"){
                    if(message.data.category == "status") {
                        toastr.info("User Status: " + message.data.data.status);
                    }
                }  else if((message.type == "processCallLog") && !message.data.interactionId.isChat){
                    this.contactsService.processCallLog.pushObject(message);

                    var arrayBuilder = {};
                    var logs = this.get('contactsService.logs');

                    arrayBuilder.interactionId = message.data.interactionId.id;
                    arrayBuilder.ani = message.data.interactionId.ani;

                    if(message.data.callLog.hasOwnProperty('notes')) {
                        arrayBuilder.notes = message.data.callLog.notes;
                    } else {
                        arrayBuilder.notes = "";
                    }

                    if(message.data.callLog.hasOwnProperty('attributes')) {
                        if(message.data.callLog.attributes.hasOwnProperty('pef_priority')) { 
                            arrayBuilder.attr = message.data.callLog.attributes.pef_priority;
                        }  else {
                            arrayBuilder.attr = "";
                        }
                    } else {
                        arrayBuilder.attr = "";
                    }

                    if(message.data.callLog.hasOwnProperty('selectedContact')) {
                        arrayBuilder.assoc = message.data.callLog.selectedContact.text;
                    } else {
                        arrayBuilder.assoc = "";
                    }
                    
                    this.contactsService.logs.pushObject(arrayBuilder);

                    if(logs.length > 0) {
                        for (var i = 0, len = logs.length; i < len; i++) {
                            if(logs[i].interactionId == this.contactsService.interactionId) {
                                if(logs[i].notes == "") {
                                    if(message.data.callLog.hasOwnProperty('notes')) {
                                        arrayBuilder.notes = message.data.callLog.notes;
                                    } else {
                                        arrayBuilder.notes = "";
                                    }
                                } else {
                                    arrayBuilder.notes = logs[i].notes;
                                }

                                if(logs[i].attr == "") { 
                                    if(message.data.callLog.hasOwnProperty('attributes')) {
                                        if(message.data.callLog.attributes.hasOwnProperty('pef_priority')) {
                                            arrayBuilder.attr = message.data.callLog.attributes.pef_priority;
                                        } else {
                                            arrayBuilder.attr = "";
                                        }
                                    } else {
                                        arrayBuilder.attr = "";
                                    }
                                } else {
                                    arrayBuilder.attr = logs[i].attr;
                                }

                                if(logs[i].assoc == "") {
                                    if(message.data.callLog.hasOwnProperty('selectedContact')) {
                                        arrayBuilder.assoc = message.data.callLog.selectedContact.text;
                                    } else {
                                        arrayBuilder.assoc = "";
                                    }
                                } else {
                                    arrayBuilder.assoc = logs[i].assoc;
                                }

                                this.contactsService.logs.removeObject(logs.objectAt(i));
                                this.contactsService.logs.pushObject(arrayBuilder);
                            }
                        }
                    }
                }
            }
        });
    }.on('init')
});
