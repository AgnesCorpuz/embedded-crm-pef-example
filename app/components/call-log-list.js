import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    callLogService: service('call-log'),
    callLogs: null,
    test: null,
    init(){
        this._super(...arguments);
        this.callLogs = this.callLogService.processCallLog;
    }
});
