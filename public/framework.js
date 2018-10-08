var contactSearchCallback;

window.Framework = {
    config: {
        name:"testApp",
        clientIds: {
            'mypurecloud.com': 'bd13529b-865c-4ffd-8f07-e055a9eb5a76'
        },        
        settings: {
            embedWebRTCByDefault: (() => {
                let embedWebRTCByDefault = new URLSearchParams(window.location.search).get('embedWebRTCByDefault');

                if(!embedWebRTCByDefault) return true;

                return embedWebRTCByDefault;
            })(),

            enableCallLogs: (() => {
                let enableCallLogs = new URLSearchParams(window.location.search).get('enableCallLogs');

                if(!enableCallLogs) return true;

                return enableCallLogs;
            })(),

            dedicatedLoginWindow: (() => {
                let dedicatedLoginWindow = new URLSearchParams(window.location.search).get('dedicatedLoginWindow');

                if(!dedicatedLoginWindow) return true;

                return dedicatedLoginWindow;
            })(),

            enableTransferContext: true,
            searchTargets: ['people', 'queues', 'frameworkcontacts'],

            // UI theme of the embedded softphone
            theme: {
                primary: (() => {
                    let primarycolor = new URLSearchParams(window.location.search).get('primarycolor');
    
                    if(!primarycolor) return '#666';
    
                    return decodeURI(primarycolor);
                })(),
                text: (() => {
                    let textcolor = new URLSearchParams(window.location.search).get('textcolor');
    
                    if(!textcolor) return '#fff';
    
                    return decodeURI(textcolor);
                })()
            }
        },
        helpLinks: {
            InteractionList: "https://help.mypurecloud.com/articles/about-interaction-list/",
            CallLog: "https://help.mypurecloud.com/articles/about-call-logs/", 
            Settings: "https://help.mypurecloud.com/articles/about-settings/" 
        },
        customInteractionAttributes: (() => {
            let customAttributes = new URLSearchParams(window.location.search).get('customAttributes');

            if(!customAttributes) return [];

            return customAttributes.split(",");
        })(),
        getUserLanguage: function(callback) {
            let lang = new URLSearchParams(window.location.search).get('userLanguage');
            if(!lang){
                // Default to English
                callback("en-US");
            }else{
                callback(lang);
            }
        }
    },

    crmDomain: null,
    initialSetup: function () {
        console.log("=================  PURECLOUD EMBEDDABLE SETUP ============");
        crmDomain = new URLSearchParams(window.location.search).get('crm_domain');
        console.log("crm_domain : ", decodeURI(crmDomain));
        if (!crmDomain) {
        console.warn("========== crm_domain parameter is null =================");
            return;
        }

        window.PureCloud.subscribe([
            {
                type: 'UserAction', 
                callback: function (category, data) {
                    window.parent.postMessage(JSON.stringify({type:"userActionSubscription", data:{category:category, data:data}}), this.crmDomain);
                }  
            }
        ]);

        window.addEventListener("message", function(event) {
            var message = JSON.parse(event.data);
            if(message){
                if(message.type == "clickToDial"){
                    window.PureCloud.clickToDial(message.data);
                } else if(message.type == "addTransferContext"){
                    window.PureCloud.addTransferContext(message.data);
                } else if(message.type == "sendContactSearch"){
                    if(contactSearchCallback) {
                        contactSearchCallback(message.data);
                    }
                } else if(message.type == "updateUserStatus"){
                    window.PureCloud.User.updateStatus(message.data);
                }
            }
        });
    },
    screenPop: (searchString, interaction) => {
        window.parent.postMessage(JSON.stringify({
            type:"screenPop", 
            data: {
                searchString:searchString, 
                interactionId:interaction
            }
        }) , this.crmDomain);
    },
    processCallLog: (callLog, interaction, eventName, onSuccess, onFailure) => {
        
    },
    openCallLog: (callLog, interaction) => {
        
    },
    contactSearch: (searchString, onSuccess, onFailure) => {
        contactSearchCallback = onSuccess;
        window.parent.postMessage(JSON.stringify({type:"contactSearch" , data:{searchString:searchString}}) , this.crmDomain);
    }
};