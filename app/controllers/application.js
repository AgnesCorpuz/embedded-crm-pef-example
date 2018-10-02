import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        openModal: function(target) {
            var modal = this.get('comp-' + target);
            modal.send('toggleModal');
        }
    },

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
