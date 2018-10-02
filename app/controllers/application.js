import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        openModal: function(target) {
            var modal = this.get('comp-' + target);
            modal.send('toggleModal');
        }
    }
});
