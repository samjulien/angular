import { HtmlElementAst, HtmlAttrAst, htmlVisitAll } from 'angular2/src/compiler/html_ast';
import { BaseException } from 'angular2/src/facade/exceptions';
/**
 * Expands special forms into elements.
 *
 * For example,
 *
 * ```
 * { messages.length, plural,
 *   =0 {zero}
 *   =1 {one}
 *   =other {more than one}
 * }
 * ```
 *
 * will be expanded into
 *
 * ```
 * <ul [ngPlural]="messages.length">
 *   <template [ngPluralCase]="0"><li i18n="plural_0">zero</li></template>
 *   <template [ngPluralCase]="1"><li i18n="plural_1">one</li></template>
 *   <template [ngPluralCase]="other"><li i18n="plural_other">more than one</li></template>
 * </ul>
 * ```
 */
export function expandNodes(nodes) {
    let e = new _Expander();
    let n = htmlVisitAll(e, nodes);
    return new ExpansionResult(n, e.expanded);
}
export class ExpansionResult {
    constructor(nodes, expanded) {
        this.nodes = nodes;
        this.expanded = expanded;
    }
}
class _Expander {
    constructor() {
        this.expanded = false;
    }
    visitElement(ast, context) {
        return new HtmlElementAst(ast.name, ast.attrs, htmlVisitAll(this, ast.children), ast.sourceSpan, ast.startSourceSpan, ast.endSourceSpan);
    }
    visitAttr(ast, context) { return ast; }
    visitText(ast, context) { return ast; }
    visitComment(ast, context) { return ast; }
    visitExpansion(ast, context) {
        this.expanded = true;
        return ast.type == "plural" ? _expandPluralForm(ast) : _expandDefaultForm(ast);
    }
    visitExpansionCase(ast, context) {
        throw new BaseException("Should not be reached");
    }
}
function _expandPluralForm(ast) {
    let children = ast.cases.map(c => {
        let expansionResult = expandNodes(c.expression);
        let i18nAttrs = expansionResult.expanded ?
            [] :
            [new HtmlAttrAst("i18n", `${ast.type}_${c.value}`, c.valueSourceSpan)];
        return new HtmlElementAst(`template`, [
            new HtmlAttrAst("ngPluralCase", c.value, c.valueSourceSpan),
        ], [
            new HtmlElementAst(`li`, i18nAttrs, expansionResult.nodes, c.sourceSpan, c.sourceSpan, c.sourceSpan)
        ], c.sourceSpan, c.sourceSpan, c.sourceSpan);
    });
    let switchAttr = new HtmlAttrAst("[ngPlural]", ast.switchValue, ast.switchValueSourceSpan);
    return new HtmlElementAst("ul", [switchAttr], children, ast.sourceSpan, ast.sourceSpan, ast.sourceSpan);
}
function _expandDefaultForm(ast) {
    let children = ast.cases.map(c => {
        let expansionResult = expandNodes(c.expression);
        let i18nAttrs = expansionResult.expanded ?
            [] :
            [new HtmlAttrAst("i18n", `${ast.type}_${c.value}`, c.valueSourceSpan)];
        return new HtmlElementAst(`template`, [
            new HtmlAttrAst("ngSwitchWhen", c.value, c.valueSourceSpan),
        ], [
            new HtmlElementAst(`li`, i18nAttrs, expansionResult.nodes, c.sourceSpan, c.sourceSpan, c.sourceSpan)
        ], c.sourceSpan, c.sourceSpan, c.sourceSpan);
    });
    let switchAttr = new HtmlAttrAst("[ngSwitch]", ast.switchValue, ast.switchValueSourceSpan);
    return new HtmlElementAst("ul", [switchAttr], children, ast.sourceSpan, ast.sourceSpan, ast.sourceSpan);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLWhUZDJSMTh6LnRtcC9hbmd1bGFyMi9zcmMvaTE4bi9leHBhbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiT0FBTyxFQUdMLGNBQWMsRUFDZCxXQUFXLEVBS1gsWUFBWSxFQUNiLE1BQU0sZ0NBQWdDO09BRWhDLEVBQUMsYUFBYSxFQUFDLE1BQU0sZ0NBQWdDO0FBRzVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsNEJBQTRCLEtBQWdCO0lBQzFDLElBQUksQ0FBQyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7SUFDeEIsSUFBSSxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMvQixNQUFNLENBQUMsSUFBSSxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBRUQ7SUFDRSxZQUFtQixLQUFnQixFQUFTLFFBQWlCO1FBQTFDLFVBQUssR0FBTCxLQUFLLENBQVc7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFTO0lBQUcsQ0FBQztBQUNuRSxDQUFDO0FBRUQ7SUFFRTtRQURBLGFBQVEsR0FBWSxLQUFLLENBQUM7SUFDWCxDQUFDO0lBRWhCLFlBQVksQ0FBQyxHQUFtQixFQUFFLE9BQVk7UUFDNUMsTUFBTSxDQUFDLElBQUksY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLENBQUMsVUFBVSxFQUNyRSxHQUFHLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsU0FBUyxDQUFDLEdBQWdCLEVBQUUsT0FBWSxJQUFTLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRTlELFNBQVMsQ0FBQyxHQUFnQixFQUFFLE9BQVksSUFBUyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUU5RCxZQUFZLENBQUMsR0FBbUIsRUFBRSxPQUFZLElBQVMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFcEUsY0FBYyxDQUFDLEdBQXFCLEVBQUUsT0FBWTtRQUNoRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxRQUFRLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVELGtCQUFrQixDQUFDLEdBQXlCLEVBQUUsT0FBWTtRQUN4RCxNQUFNLElBQUksYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDbkQsQ0FBQztBQUNILENBQUM7QUFFRCwyQkFBMkIsR0FBcUI7SUFDOUMsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixJQUFJLGVBQWUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELElBQUksU0FBUyxHQUFHLGVBQWUsQ0FBQyxRQUFRO1lBQ3BCLEVBQUU7WUFDRixDQUFDLElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBRTNGLE1BQU0sQ0FBQyxJQUFJLGNBQWMsQ0FBQyxVQUFVLEVBQ1Y7WUFDRSxJQUFJLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDO1NBQzVELEVBQ0Q7WUFDRSxJQUFJLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLGVBQWUsQ0FBQyxLQUFLLEVBQ3RDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDO1NBQzdELEVBQ0QsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN0RSxDQUFDLENBQUMsQ0FBQztJQUNILElBQUksVUFBVSxHQUFHLElBQUksV0FBVyxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQzNGLE1BQU0sQ0FBQyxJQUFJLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsVUFBVSxFQUM1RCxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDNUMsQ0FBQztBQUVELDRCQUE0QixHQUFxQjtJQUMvQyxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLElBQUksZUFBZSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEQsSUFBSSxTQUFTLEdBQUcsZUFBZSxDQUFDLFFBQVE7WUFDcEIsRUFBRTtZQUNGLENBQUMsSUFBSSxXQUFXLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFFM0YsTUFBTSxDQUFDLElBQUksY0FBYyxDQUFDLFVBQVUsRUFDVjtZQUNFLElBQUksV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUM7U0FDNUQsRUFDRDtZQUNFLElBQUksY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsZUFBZSxDQUFDLEtBQUssRUFDdEMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUM7U0FDN0QsRUFDRCxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RFLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxVQUFVLEdBQUcsSUFBSSxXQUFXLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDM0YsTUFBTSxDQUFDLElBQUksY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVLEVBQzVELEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM1QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSHRtbEFzdCxcbiAgSHRtbEFzdFZpc2l0b3IsXG4gIEh0bWxFbGVtZW50QXN0LFxuICBIdG1sQXR0ckFzdCxcbiAgSHRtbFRleHRBc3QsXG4gIEh0bWxDb21tZW50QXN0LFxuICBIdG1sRXhwYW5zaW9uQXN0LFxuICBIdG1sRXhwYW5zaW9uQ2FzZUFzdCxcbiAgaHRtbFZpc2l0QWxsXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9odG1sX2FzdCc7XG5cbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcblxuXG4vKipcbiAqIEV4cGFuZHMgc3BlY2lhbCBmb3JtcyBpbnRvIGVsZW1lbnRzLlxuICpcbiAqIEZvciBleGFtcGxlLFxuICpcbiAqIGBgYFxuICogeyBtZXNzYWdlcy5sZW5ndGgsIHBsdXJhbCxcbiAqICAgPTAge3plcm99XG4gKiAgID0xIHtvbmV9XG4gKiAgID1vdGhlciB7bW9yZSB0aGFuIG9uZX1cbiAqIH1cbiAqIGBgYFxuICpcbiAqIHdpbGwgYmUgZXhwYW5kZWQgaW50b1xuICpcbiAqIGBgYFxuICogPHVsIFtuZ1BsdXJhbF09XCJtZXNzYWdlcy5sZW5ndGhcIj5cbiAqICAgPHRlbXBsYXRlIFtuZ1BsdXJhbENhc2VdPVwiMFwiPjxsaSBpMThuPVwicGx1cmFsXzBcIj56ZXJvPC9saT48L3RlbXBsYXRlPlxuICogICA8dGVtcGxhdGUgW25nUGx1cmFsQ2FzZV09XCIxXCI+PGxpIGkxOG49XCJwbHVyYWxfMVwiPm9uZTwvbGk+PC90ZW1wbGF0ZT5cbiAqICAgPHRlbXBsYXRlIFtuZ1BsdXJhbENhc2VdPVwib3RoZXJcIj48bGkgaTE4bj1cInBsdXJhbF9vdGhlclwiPm1vcmUgdGhhbiBvbmU8L2xpPjwvdGVtcGxhdGU+XG4gKiA8L3VsPlxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHBhbmROb2Rlcyhub2RlczogSHRtbEFzdFtdKTogRXhwYW5zaW9uUmVzdWx0IHtcbiAgbGV0IGUgPSBuZXcgX0V4cGFuZGVyKCk7XG4gIGxldCBuID0gaHRtbFZpc2l0QWxsKGUsIG5vZGVzKTtcbiAgcmV0dXJuIG5ldyBFeHBhbnNpb25SZXN1bHQobiwgZS5leHBhbmRlZCk7XG59XG5cbmV4cG9ydCBjbGFzcyBFeHBhbnNpb25SZXN1bHQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbm9kZXM6IEh0bWxBc3RbXSwgcHVibGljIGV4cGFuZGVkOiBib29sZWFuKSB7fVxufVxuXG5jbGFzcyBfRXhwYW5kZXIgaW1wbGVtZW50cyBIdG1sQXN0VmlzaXRvciB7XG4gIGV4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICB2aXNpdEVsZW1lbnQoYXN0OiBIdG1sRWxlbWVudEFzdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gbmV3IEh0bWxFbGVtZW50QXN0KGFzdC5uYW1lLCBhc3QuYXR0cnMsIGh0bWxWaXNpdEFsbCh0aGlzLCBhc3QuY2hpbGRyZW4pLCBhc3Quc291cmNlU3BhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzdC5zdGFydFNvdXJjZVNwYW4sIGFzdC5lbmRTb3VyY2VTcGFuKTtcbiAgfVxuXG4gIHZpc2l0QXR0cihhc3Q6IEh0bWxBdHRyQXN0LCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gYXN0OyB9XG5cbiAgdmlzaXRUZXh0KGFzdDogSHRtbFRleHRBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBhc3Q7IH1cblxuICB2aXNpdENvbW1lbnQoYXN0OiBIdG1sQ29tbWVudEFzdCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIGFzdDsgfVxuXG4gIHZpc2l0RXhwYW5zaW9uKGFzdDogSHRtbEV4cGFuc2lvbkFzdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcbiAgICByZXR1cm4gYXN0LnR5cGUgPT0gXCJwbHVyYWxcIiA/IF9leHBhbmRQbHVyYWxGb3JtKGFzdCkgOiBfZXhwYW5kRGVmYXVsdEZvcm0oYXN0KTtcbiAgfVxuXG4gIHZpc2l0RXhwYW5zaW9uQ2FzZShhc3Q6IEh0bWxFeHBhbnNpb25DYXNlQXN0LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFwiU2hvdWxkIG5vdCBiZSByZWFjaGVkXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9leHBhbmRQbHVyYWxGb3JtKGFzdDogSHRtbEV4cGFuc2lvbkFzdCk6IEh0bWxFbGVtZW50QXN0IHtcbiAgbGV0IGNoaWxkcmVuID0gYXN0LmNhc2VzLm1hcChjID0+IHtcbiAgICBsZXQgZXhwYW5zaW9uUmVzdWx0ID0gZXhwYW5kTm9kZXMoYy5leHByZXNzaW9uKTtcbiAgICBsZXQgaTE4bkF0dHJzID0gZXhwYW5zaW9uUmVzdWx0LmV4cGFuZGVkID9cbiAgICAgICAgICAgICAgICAgICAgICAgIFtdIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZXcgSHRtbEF0dHJBc3QoXCJpMThuXCIsIGAke2FzdC50eXBlfV8ke2MudmFsdWV9YCwgYy52YWx1ZVNvdXJjZVNwYW4pXTtcblxuICAgIHJldHVybiBuZXcgSHRtbEVsZW1lbnRBc3QoYHRlbXBsYXRlYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEh0bWxBdHRyQXN0KFwibmdQbHVyYWxDYXNlXCIsIGMudmFsdWUsIGMudmFsdWVTb3VyY2VTcGFuKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBIdG1sRWxlbWVudEFzdChgbGlgLCBpMThuQXR0cnMsIGV4cGFuc2lvblJlc3VsdC5ub2RlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMuc291cmNlU3BhbiwgYy5zb3VyY2VTcGFuLCBjLnNvdXJjZVNwYW4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYy5zb3VyY2VTcGFuLCBjLnNvdXJjZVNwYW4sIGMuc291cmNlU3Bhbik7XG4gIH0pO1xuICBsZXQgc3dpdGNoQXR0ciA9IG5ldyBIdG1sQXR0ckFzdChcIltuZ1BsdXJhbF1cIiwgYXN0LnN3aXRjaFZhbHVlLCBhc3Quc3dpdGNoVmFsdWVTb3VyY2VTcGFuKTtcbiAgcmV0dXJuIG5ldyBIdG1sRWxlbWVudEFzdChcInVsXCIsIFtzd2l0Y2hBdHRyXSwgY2hpbGRyZW4sIGFzdC5zb3VyY2VTcGFuLCBhc3Quc291cmNlU3BhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3Quc291cmNlU3Bhbik7XG59XG5cbmZ1bmN0aW9uIF9leHBhbmREZWZhdWx0Rm9ybShhc3Q6IEh0bWxFeHBhbnNpb25Bc3QpOiBIdG1sRWxlbWVudEFzdCB7XG4gIGxldCBjaGlsZHJlbiA9IGFzdC5jYXNlcy5tYXAoYyA9PiB7XG4gICAgbGV0IGV4cGFuc2lvblJlc3VsdCA9IGV4cGFuZE5vZGVzKGMuZXhwcmVzc2lvbik7XG4gICAgbGV0IGkxOG5BdHRycyA9IGV4cGFuc2lvblJlc3VsdC5leHBhbmRlZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICBbXSA6XG4gICAgICAgICAgICAgICAgICAgICAgICBbbmV3IEh0bWxBdHRyQXN0KFwiaTE4blwiLCBgJHthc3QudHlwZX1fJHtjLnZhbHVlfWAsIGMudmFsdWVTb3VyY2VTcGFuKV07XG5cbiAgICByZXR1cm4gbmV3IEh0bWxFbGVtZW50QXN0KGB0ZW1wbGF0ZWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBIdG1sQXR0ckFzdChcIm5nU3dpdGNoV2hlblwiLCBjLnZhbHVlLCBjLnZhbHVlU291cmNlU3BhbiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgSHRtbEVsZW1lbnRBc3QoYGxpYCwgaTE4bkF0dHJzLCBleHBhbnNpb25SZXN1bHQubm9kZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLnNvdXJjZVNwYW4sIGMuc291cmNlU3BhbiwgYy5zb3VyY2VTcGFuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMuc291cmNlU3BhbiwgYy5zb3VyY2VTcGFuLCBjLnNvdXJjZVNwYW4pO1xuICB9KTtcbiAgbGV0IHN3aXRjaEF0dHIgPSBuZXcgSHRtbEF0dHJBc3QoXCJbbmdTd2l0Y2hdXCIsIGFzdC5zd2l0Y2hWYWx1ZSwgYXN0LnN3aXRjaFZhbHVlU291cmNlU3Bhbik7XG4gIHJldHVybiBuZXcgSHRtbEVsZW1lbnRBc3QoXCJ1bFwiLCBbc3dpdGNoQXR0cl0sIGNoaWxkcmVuLCBhc3Quc291cmNlU3BhbiwgYXN0LnNvdXJjZVNwYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN0LnNvdXJjZVNwYW4pO1xufSJdfQ==