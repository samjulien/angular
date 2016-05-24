import { AbstractControlDirective } from './abstract_control_directive';
import { unimplemented } from 'angular2/src/facade/exceptions';
/**
 * A base class that all control directive extend.
 * It binds a {@link Control} object to a DOM element.
 *
 * Used internally by Angular forms.
 */
export class NgControl extends AbstractControlDirective {
    constructor(...args) {
        super(...args);
        this.name = null;
        this.valueAccessor = null;
    }
    get validator() { return unimplemented(); }
    get asyncValidator() { return unimplemented(); }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtaFRkMlIxOHoudG1wL2FuZ3VsYXIyL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy9uZ19jb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUNPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSw4QkFBOEI7T0FDOUQsRUFBQyxhQUFhLEVBQUMsTUFBTSxnQ0FBZ0M7QUFHNUQ7Ozs7O0dBS0c7QUFDSCwrQkFBd0Msd0JBQXdCO0lBQWhFO1FBQXdDLGVBQXdCO1FBQzlELFNBQUksR0FBVyxJQUFJLENBQUM7UUFDcEIsa0JBQWEsR0FBeUIsSUFBSSxDQUFDO0lBTTdDLENBQUM7SUFKQyxJQUFJLFNBQVMsS0FBa0IsTUFBTSxDQUFjLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNyRSxJQUFJLGNBQWMsS0FBdUIsTUFBTSxDQUFtQixhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFHdEYsQ0FBQztBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sRGlyZWN0aXZlfSBmcm9tICcuL2Fic3RyYWN0X2NvbnRyb2xfZGlyZWN0aXZlJztcbmltcG9ydCB7dW5pbXBsZW1lbnRlZH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7QXN5bmNWYWxpZGF0b3JGbiwgVmFsaWRhdG9yRm59IGZyb20gJy4vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogQSBiYXNlIGNsYXNzIHRoYXQgYWxsIGNvbnRyb2wgZGlyZWN0aXZlIGV4dGVuZC5cbiAqIEl0IGJpbmRzIGEge0BsaW5rIENvbnRyb2x9IG9iamVjdCB0byBhIERPTSBlbGVtZW50LlxuICpcbiAqIFVzZWQgaW50ZXJuYWxseSBieSBBbmd1bGFyIGZvcm1zLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmdDb250cm9sIGV4dGVuZHMgQWJzdHJhY3RDb250cm9sRGlyZWN0aXZlIHtcbiAgbmFtZTogc3RyaW5nID0gbnVsbDtcbiAgdmFsdWVBY2Nlc3NvcjogQ29udHJvbFZhbHVlQWNjZXNzb3IgPSBudWxsO1xuXG4gIGdldCB2YWxpZGF0b3IoKTogVmFsaWRhdG9yRm4geyByZXR1cm4gPFZhbGlkYXRvckZuPnVuaW1wbGVtZW50ZWQoKTsgfVxuICBnZXQgYXN5bmNWYWxpZGF0b3IoKTogQXN5bmNWYWxpZGF0b3JGbiB7IHJldHVybiA8QXN5bmNWYWxpZGF0b3JGbj51bmltcGxlbWVudGVkKCk7IH1cblxuICBhYnN0cmFjdCB2aWV3VG9Nb2RlbFVwZGF0ZShuZXdWYWx1ZTogYW55KTogdm9pZDtcbn1cbiJdfQ==