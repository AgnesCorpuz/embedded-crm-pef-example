import Route from '@ember/routing/route';

export default Route.extend({
    actions: {
        clickToDial(num) {
            document.getElementById("softphone").contentWindow.postMessage(JSON.stringify({
                type: 'clickToDial',
                data: { number: num, autoPlace: true }
            }), "*");
        }
      }
});
