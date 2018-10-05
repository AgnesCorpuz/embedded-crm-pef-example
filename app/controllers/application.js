import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
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
        }
    },

    frameworkConfig: service('framework-config'),

    init(){
        this._super(...arguments);

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
        window.addEventListener("message", function(event) {
            var message = JSON.parse(event.data);
            
            if(message){
                if(message.type == "screenPop"){
                    // document.getElementById("screenPopPayload").value = event.data;
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
                }
            }
        });
    }.on('init')
});
