'use strict';"use strict";
var browser_adapter_1 = require('angular2/src/platform/browser/browser_adapter');
var browser_1 = require('angular2/src/facade/browser');
var lang_1 = require('angular2/src/facade/lang');
var exceptions_1 = require('angular2/src/facade/exceptions');
var DOM = new browser_adapter_1.BrowserDomAdapter();
function getIntParameter(name) {
    return lang_1.NumberWrapper.parseInt(getStringParameter(name), 10);
}
exports.getIntParameter = getIntParameter;
function getStringParameter(name) {
    var els = DOM.querySelectorAll(browser_1.document, "input[name=\"" + name + "\"]");
    var value;
    var el;
    for (var i = 0; i < els.length; i++) {
        el = els[i];
        var type = DOM.type(el);
        if ((type != 'radio' && type != 'checkbox') || DOM.getChecked(el)) {
            value = DOM.getValue(el);
            break;
        }
    }
    if (lang_1.isBlank(value)) {
        throw new exceptions_1.BaseException("Could not find and input field with name " + name);
    }
    return value;
}
exports.getStringParameter = getStringParameter;
function bindAction(selector, callback) {
    var el = DOM.querySelector(browser_1.document, selector);
    DOM.on(el, 'click', function (_) { callback(); });
}
exports.bindAction = bindAction;
function microBenchmark(name, iterationCount, callback) {
    var durationName = name + "/" + iterationCount;
    browser_1.window.console.time(durationName);
    callback();
    browser_1.window.console.timeEnd(durationName);
}
exports.microBenchmark = microBenchmark;
function windowProfile(name) {
    browser_1.window.console.profile(name);
}
exports.windowProfile = windowProfile;
function windowProfileEnd(name) {
    browser_1.window.console.profileEnd(name);
}
exports.windowProfileEnd = windowProfileEnd;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVuY2htYXJrX3V0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLTJlWmhLTnhTLnRtcC9hbmd1bGFyMi9zcmMvdGVzdGluZy9iZW5jaG1hcmtfdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsZ0NBQWdDLCtDQUErQyxDQUFDLENBQUE7QUFDaEYsd0JBQStCLDZCQUE2QixDQUFDLENBQUE7QUFDN0QscUJBQXFDLDBCQUEwQixDQUFDLENBQUE7QUFDaEUsMkJBQThDLGdDQUFnQyxDQUFDLENBQUE7QUFFL0UsSUFBSSxHQUFHLEdBQUcsSUFBSSxtQ0FBaUIsRUFBRSxDQUFDO0FBRWxDLHlCQUFnQyxJQUFZO0lBQzFDLE1BQU0sQ0FBQyxvQkFBYSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBRmUsdUJBQWUsa0JBRTlCLENBQUE7QUFFRCw0QkFBbUMsSUFBWTtJQUM3QyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsa0JBQVEsRUFBRSxrQkFBZSxJQUFJLFFBQUksQ0FBQyxDQUFDO0lBQ2xFLElBQUksS0FBSyxDQUFDO0lBQ1YsSUFBSSxFQUFFLENBQUM7SUFFUCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNwQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1osSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxPQUFPLElBQUksSUFBSSxJQUFJLFVBQVUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xFLEtBQUssR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pCLEtBQUssQ0FBQztRQUNSLENBQUM7SUFDSCxDQUFDO0lBRUQsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixNQUFNLElBQUksMEJBQWEsQ0FBQyw4Q0FBNEMsSUFBTSxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDZixDQUFDO0FBbkJlLDBCQUFrQixxQkFtQmpDLENBQUE7QUFFRCxvQkFBMkIsUUFBZ0IsRUFBRSxRQUFrQjtJQUM3RCxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLGtCQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDL0MsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQVMsQ0FBQyxJQUFJLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkQsQ0FBQztBQUhlLGtCQUFVLGFBR3pCLENBQUE7QUFFRCx3QkFBK0IsSUFBSSxFQUFFLGNBQWMsRUFBRSxRQUFRO0lBQzNELElBQUksWUFBWSxHQUFNLElBQUksU0FBSSxjQUFnQixDQUFDO0lBQy9DLGdCQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNsQyxRQUFRLEVBQUUsQ0FBQztJQUNYLGdCQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN2QyxDQUFDO0FBTGUsc0JBQWMsaUJBSzdCLENBQUE7QUFFRCx1QkFBOEIsSUFBWTtJQUNsQyxnQkFBTSxDQUFDLE9BQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEMsQ0FBQztBQUZlLHFCQUFhLGdCQUU1QixDQUFBO0FBRUQsMEJBQWlDLElBQVk7SUFDckMsZ0JBQU0sQ0FBQyxPQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pDLENBQUM7QUFGZSx3QkFBZ0IsbUJBRS9CLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jyb3dzZXJEb21BZGFwdGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlci9icm93c2VyX2FkYXB0ZXInO1xuaW1wb3J0IHtkb2N1bWVudCwgd2luZG93fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2Jyb3dzZXInO1xuaW1wb3J0IHtOdW1iZXJXcmFwcGVyLCBpc0JsYW5rfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCBXcmFwcGVkRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuXG52YXIgRE9NID0gbmV3IEJyb3dzZXJEb21BZGFwdGVyKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbnRQYXJhbWV0ZXIobmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBOdW1iZXJXcmFwcGVyLnBhcnNlSW50KGdldFN0cmluZ1BhcmFtZXRlcihuYW1lKSwgMTApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RyaW5nUGFyYW1ldGVyKG5hbWU6IHN0cmluZykge1xuICB2YXIgZWxzID0gRE9NLnF1ZXJ5U2VsZWN0b3JBbGwoZG9jdW1lbnQsIGBpbnB1dFtuYW1lPVwiJHtuYW1lfVwiXWApO1xuICB2YXIgdmFsdWU7XG4gIHZhciBlbDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGVscy5sZW5ndGg7IGkrKykge1xuICAgIGVsID0gZWxzW2ldO1xuICAgIHZhciB0eXBlID0gRE9NLnR5cGUoZWwpO1xuICAgIGlmICgodHlwZSAhPSAncmFkaW8nICYmIHR5cGUgIT0gJ2NoZWNrYm94JykgfHwgRE9NLmdldENoZWNrZWQoZWwpKSB7XG4gICAgICB2YWx1ZSA9IERPTS5nZXRWYWx1ZShlbCk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoaXNCbGFuayh2YWx1ZSkpIHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgQ291bGQgbm90IGZpbmQgYW5kIGlucHV0IGZpZWxkIHdpdGggbmFtZSAke25hbWV9YCk7XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5kQWN0aW9uKHNlbGVjdG9yOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICB2YXIgZWwgPSBET00ucXVlcnlTZWxlY3Rvcihkb2N1bWVudCwgc2VsZWN0b3IpO1xuICBET00ub24oZWwsICdjbGljaycsIGZ1bmN0aW9uKF8pIHsgY2FsbGJhY2soKTsgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaWNyb0JlbmNobWFyayhuYW1lLCBpdGVyYXRpb25Db3VudCwgY2FsbGJhY2spIHtcbiAgdmFyIGR1cmF0aW9uTmFtZSA9IGAke25hbWV9LyR7aXRlcmF0aW9uQ291bnR9YDtcbiAgd2luZG93LmNvbnNvbGUudGltZShkdXJhdGlvbk5hbWUpO1xuICBjYWxsYmFjaygpO1xuICB3aW5kb3cuY29uc29sZS50aW1lRW5kKGR1cmF0aW9uTmFtZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3aW5kb3dQcm9maWxlKG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAoPGFueT53aW5kb3cuY29uc29sZSkucHJvZmlsZShuYW1lKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdpbmRvd1Byb2ZpbGVFbmQobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICg8YW55PndpbmRvdy5jb25zb2xlKS5wcm9maWxlRW5kKG5hbWUpO1xufVxuIl19