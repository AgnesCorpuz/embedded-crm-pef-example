import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    actions: {
        openModal: function(target) {
            var modal = this.get('comp-' + target);
            modal.send('toggleModal');
        }
    },

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

        // Sogtphone language
        `&userLanguage=${this.frameworkConfig.userLanguage}` +

        // Theme
        `&primarycolor=${encodeURIComponent(this.frameworkConfig.theme.primary)}` +
        `&textcolor=${encodeURIComponent(this.frameworkConfig.theme.text)}`;
    },

    frameworkConfig: service('framework-config')
});
