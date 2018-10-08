import Service from '@ember/service';

export default Service.extend({
    processCallLog: null,
    init() {
        this._super(...arguments);
        this.set('processCallLog', []);
      }
});
