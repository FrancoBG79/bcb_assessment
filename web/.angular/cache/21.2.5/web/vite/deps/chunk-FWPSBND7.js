import {
  Observable
} from "./chunk-FNIQB2MS.js";
import {
  isFunction
} from "./chunk-EIDYSUSS.js";

// node_modules/rxjs/dist/esm5/internal/observable/throwError.js
function throwError(errorOrErrorFactory, scheduler) {
  var errorFactory = isFunction(errorOrErrorFactory) ? errorOrErrorFactory : function() {
    return errorOrErrorFactory;
  };
  var init = function(subscriber) {
    return subscriber.error(errorFactory());
  };
  return new Observable(scheduler ? function(subscriber) {
    return scheduler.schedule(init, 0, subscriber);
  } : init);
}

export {
  throwError
};
//# sourceMappingURL=chunk-FWPSBND7.js.map
