import * as $ from 'jquery';
export var JrummyErrors = (function () {
    function JrummyErrors() {
    }
    JrummyErrors.prototype.handleError = function (error) {
        console.log("log" + error);
        $(document).trigger("jrummy-error-raised");
    };
    return JrummyErrors;
}());
//# sourceMappingURL=jrummy-errors.js.map