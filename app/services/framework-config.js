import Service from '@ember/service';

export default Service.extend({
    embedWebRTCByDefault: true,
    enableCallLogs: true, 
    dedicatedLoginWindow: true,
    userLanguage: "",

    init(){
        this._super(...arguments);
        
        // Load values from localStorage
        this.set('embedWebRTCByDefault', (localStorage.getItem("embedWebRTCByDefault") === 'true'));
        this.set('enableCallLogs', (localStorage.getItem("enableCallLogs") === 'true'));
        this.set('dedicatedLoginWindow',(localStorage.getItem("dedicatedLoginWindow") === 'true'));
        this.set('userLanguage', localStorage.getItem("userLanguage"));

        // Default Values
        if(this.embedWebRTCByDefault === null) this.set('embedWebRTCByDefault', true);
        if(this.enableCallLogs === null) this.set('enableCallLogs', true);
        if(this.dedicatedLoginWindow === null) this.set('dedicatedLoginWindow', true);
        if(this.userLanguage === null) this.set('userLanguage', 'en-US');
    },

    saveConfiguration(){
        localStorage.setItem('embedWebRTCByDefault', this.embedWebRTCByDefault);
        localStorage.setItem('enableCallLogs', this.enableCallLogs);
        localStorage.setItem('dedicatedLoginWindow', this.dedicatedLoginWindow);
        localStorage.setItem('userLanguage', this.userLanguage);
    }
});
