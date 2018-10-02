import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    init(){
        this._super(...arguments);

        // Dynamically build the URL
        this.frameWorkURL = 
        `https://apps.mypurecloud.com/crm/index.html?` +
        `crm=framework-local-secure` +
        `&color=darkgrey` + 
        `&embedWebRTCByDefault=${this.frameworkConfig.embedWebRTCByDefault}` +
        `&enableCallLogs=${this.frameworkConfig.enableCallLogs}` +
        `&dedicatedLoginWindow=${this.frameworkConfig.dedicatedLoginWindow}` +
        `&userLanguage=${this.frameworkConfig.userLanguage}`;
    },

    frameworkConfig: service('framework-config')
});
