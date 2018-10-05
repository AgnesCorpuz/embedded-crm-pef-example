import Component from '@ember/component';

export default Component.extend({
    // TODO: Consolidate assignment of event listener to this Controller
    didInsertElement(){
        window.addEventListener("message", function(event) {
            var message = JSON.parse(event.data);
            
            if(message){
                if(message.type == "screenPop"){
                    console.log('====================================');
                    console.log(message);
                } 
            }
        });
    }
});
