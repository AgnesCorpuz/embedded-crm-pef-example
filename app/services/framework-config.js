import Service from '@ember/service';

export default Service.extend({
    embedWebRTCByDefault: true,
    enableCallLogs: true, 
    dedicatedLoginWindow: true,
    userLanguage: "",

    init(){
        this._super(...arguments);
        
        // Set default values
        this.set('embedWebRTCByDefault', true);
        this.set('enableCallLogs', true);
        this.set('dedicatedLoginWindow', true);
        this.set('userLanguage', "en-US");
        this.set('theme', {
            'primary': '#666', 
            'text': '#fff'
        });

        // Custom Attributes 
        // This is not saved in localStorage as this should be constant anyway
        this.set('customAttributes', [
            'PEF_URLPop',
            'PEF_SearchValue',
            'PEF_TransferContext',
            'PEF_ExampleWorkspaceKey'
        ]);


        // Check if there are saved settings in the localstorage
        if(localStorage.getItem("embedWebRTCByDefault") !== null)
            this.set('embedWebRTCByDefault', (localStorage.getItem("embedWebRTCByDefault") === 'true'));

        if(localStorage.getItem("enableCallLogs") !== null)
            this.set('enableCallLogs', (localStorage.getItem("enableCallLogs") === 'true'));

        if(localStorage.getItem("dedicatedLoginWindow") !== null)
            this.set('dedicatedLoginWindow',(localStorage.getItem("dedicatedLoginWindow") === 'true'));

        if(localStorage.getItem("userLanguage") !== null)
            this.set('userLanguage', localStorage.getItem("userLanguage"));

        if(localStorage.getItem("theme") !== null) 
            this.set('theme', JSON.parse(localStorage.getItem("theme")));
    },

    saveConfiguration(){
        localStorage.setItem('embedWebRTCByDefault', this.embedWebRTCByDefault);
        localStorage.setItem('enableCallLogs', this.enableCallLogs);
        localStorage.setItem('dedicatedLoginWindow', this.dedicatedLoginWindow);
        localStorage.setItem('userLanguage', this.userLanguage);
        localStorage.setItem('theme', JSON.stringify(this.theme));
    }
});
