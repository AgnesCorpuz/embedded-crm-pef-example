import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
        window.addEventListener("message", function(event) {
            var message = JSON.parse(event.data);
            if(message){
                if(message.type == "screenPop"){
                    document.getElementById("screenPopPayload").value = event.data;
                } else if(message.type == "contactSearch") {
                    document.getElementById("softphone").contentWindow.postMessage(JSON.stringify({
                        type: 'sendContactSearch',
                        data: [{"type": "external", "name": "Weather Line", "phone":[{ "number":"(317) 222-2222", "label":"Cell"}]}]
                    }), "*");
                }
            }
        });
      }
});
