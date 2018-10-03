import Component from '@ember/component';

export default Component.extend({    
    actions: {
        clickToDial(num) {
            document.getElementById("softphone").contentWindow.postMessage(JSON.stringify({
                type: 'clickToDial',
                data: { number: num, autoPlace: true }
            }), "*");
        }
      }
});
