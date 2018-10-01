var contactSearchCallback;

window.Framework = {
    config: {
        name:"testApp",
        clientIds: {
            'mypurecloud.com': 'bd13529b-865c-4ffd-8f07-e055a9eb5a76'
        },        
        settings: {
            embedWebRTCByDefault: true,
            enableCallLogs: true,
            dedicatedLoginWindow: true,
            enableTransferContext: true,
            searchTargets: ['people', 'queues', 'frameworkcontacts']
        },
        helpLinks: {
            InteractionList: "https://help.mypurecloud.com/articles/about-interaction-list/",
            CallLog: "https://help.mypurecloud.com/articles/about-call-logs/", 
            Settings: "https://help.mypurecloud.com/articles/about-settings/" 
        },
        customInteractionAttributes: ['PEF_URLPop', 'PEF_SearchValue', 'PEF_TransferContext'],
        getUserLanguage: function(callback) {
            callback("en-US");
        }
    },

    initialSetup: function () {
        window.PureCloud.subscribe([
            {
                type: 'UserAction', 
                callback: function (category, data) {
                    window.parent.postMessage(JSON.stringify({type:"userActionSubscription", data:{category:category, data:data}}) , "*");
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
    screenPop: function (searchString, interaction) {
        window.parent.postMessage(JSON.stringify({type:"screenPop", data:{searchString:searchString, interactionId:interaction}}) , "*");
    },
    processCallLog: function (callLog, interaction, eventName, onSuccess, onFailure) {
        
    },
    openCallLog: function(callLog, interaction){
        
    },
    contactSearch: function(searchString, onSuccess, onFailure) {
        contactSearchCallback = onSuccess;
        window.parent.postMessage(JSON.stringify({type:"contactSearch" , data:{searchString:searchString}}) , "*");
    }
};