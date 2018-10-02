import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    init(){
        this._super(...arguments);
        this.languages = [
            {
            "language": "German",
            "code": "de"
            },
            {
            "language": "American English",
            "code": "en-US"
            },
            {
            "language": "Spanish",
            "code": "es"
            },
            {
            "language": "French",
            "code": "fr"
            },
            {
            "language": "Italian",
            "code": "it"
            },
            {
            "language": "Japanese",
            "code": "jp"
            },
            {
            "language": "Dutch",
            "code": "nl"
            },
            {
            "language": "Norwegian",
            "code": "no"
            },
            {
            "language": "Polish",
            "code": "pl"
            },
            {
            "language": "Brazilian Portugese",
            "code": "pt-BR"
            },
            {
            "language": "Swedish",
            "code": "sv"
            },
            {
            "language": "Turkish",
            "code": "tr"
            },
            {
            "language": "Chinese",
            "code": "zh-CH"
            },
            {
            "language": "Taiwanese",
            "code": "zh-TW"
            }
        ];
    },

    frameworkConfig: service('framework-config'),

    actions: {
        saveConfig(){
            
            this.frameworkConfig.saveConfiguration();
            window.location.reload(true);
        },
        setLanguage: function(lang){
            this.set('frameworkConfig.userLanguage', lang);
        }
    }
});
