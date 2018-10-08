import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    frameworkConfig: service('framework-config'),

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
        search(){
            this.transitionToRoute('search', {
                queryParams: {
                    query: this.queryString
                }   
            });
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

    callLogService: service('call-log'),
    addListeners: function() {
        var interactionID = null;

        window.addEventListener("message", (event) => {
            var message = JSON.parse(event.data);
                        
            if(message){
                if(message.type == "screenPop"){
                    // document.getElementById("screenPopPayload").value = event.data;
                    interactionID = message.data.interactionId.id;
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
                    } else if (message.data.category == "view" && message.data.data === "CallLog"){
                        document.getElementById("softphone").contentWindow.postMessage(JSON.stringify({
                            type: 'addAssociation',
                            data: {"type":"contact", "id":"1234", "text":"Weather Line", "select": true}
                        }), "*");

                        document.getElementById("softphone").contentWindow.postMessage(JSON.stringify({
                            type: 'addAttribute',
                            data: {"interactionId": interactionID,"attributes": {"PEF_ExampleWorkspaceKey": "https://exampleworkspaceurl.com"}}
                        }), "*");
                    }
                }  else if(message.type == "processCallLog"){
                    this.callLogService.processCallLog.pushObject(message);
                }
            }
        });
    }.on('init')
});
