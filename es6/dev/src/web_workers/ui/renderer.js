var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from 'angular2/src/core/di';
import { MessageBus } from 'angular2/src/web_workers/shared/message_bus';
import { Serializer, PRIMITIVE, RenderStoreObject } from 'angular2/src/web_workers/shared/serializer';
import { RootRenderer, RenderComponentType } from 'angular2/src/core/render/api';
import { EVENT_CHANNEL, RENDERER_CHANNEL } from 'angular2/src/web_workers/shared/messaging_api';
import { bind } from './bind';
import { EventDispatcher } from 'angular2/src/web_workers/ui/event_dispatcher';
import { RenderStore } from 'angular2/src/web_workers/shared/render_store';
import { ServiceMessageBrokerFactory } from 'angular2/src/web_workers/shared/service_message_broker';
export let MessageBasedRenderer = class MessageBasedRenderer {
    constructor(_brokerFactory, _bus, _serializer, _renderStore, _rootRenderer) {
        this._brokerFactory = _brokerFactory;
        this._bus = _bus;
        this._serializer = _serializer;
        this._renderStore = _renderStore;
        this._rootRenderer = _rootRenderer;
    }
    start() {
        var broker = this._brokerFactory.createMessageBroker(RENDERER_CHANNEL);
        this._bus.initChannel(EVENT_CHANNEL);
        this._eventDispatcher = new EventDispatcher(this._bus.to(EVENT_CHANNEL), this._serializer);
        broker.registerMethod("renderComponent", [RenderComponentType, PRIMITIVE], bind(this._renderComponent, this));
        broker.registerMethod("selectRootElement", [RenderStoreObject, PRIMITIVE, PRIMITIVE], bind(this._selectRootElement, this));
        broker.registerMethod("createElement", [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], bind(this._createElement, this));
        broker.registerMethod("createViewRoot", [RenderStoreObject, RenderStoreObject, PRIMITIVE], bind(this._createViewRoot, this));
        broker.registerMethod("createTemplateAnchor", [RenderStoreObject, RenderStoreObject, PRIMITIVE], bind(this._createTemplateAnchor, this));
        broker.registerMethod("createText", [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], bind(this._createText, this));
        broker.registerMethod("projectNodes", [RenderStoreObject, RenderStoreObject, RenderStoreObject], bind(this._projectNodes, this));
        broker.registerMethod("attachViewAfter", [RenderStoreObject, RenderStoreObject, RenderStoreObject], bind(this._attachViewAfter, this));
        broker.registerMethod("detachView", [RenderStoreObject, RenderStoreObject], bind(this._detachView, this));
        broker.registerMethod("destroyView", [RenderStoreObject, RenderStoreObject, RenderStoreObject], bind(this._destroyView, this));
        broker.registerMethod("setElementProperty", [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], bind(this._setElementProperty, this));
        broker.registerMethod("setElementAttribute", [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], bind(this._setElementAttribute, this));
        broker.registerMethod("setBindingDebugInfo", [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], bind(this._setBindingDebugInfo, this));
        broker.registerMethod("setElementClass", [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], bind(this._setElementClass, this));
        broker.registerMethod("setElementStyle", [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], bind(this._setElementStyle, this));
        broker.registerMethod("invokeElementMethod", [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], bind(this._invokeElementMethod, this));
        broker.registerMethod("setText", [RenderStoreObject, RenderStoreObject, PRIMITIVE], bind(this._setText, this));
        broker.registerMethod("listen", [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], bind(this._listen, this));
        broker.registerMethod("listenGlobal", [RenderStoreObject, PRIMITIVE, PRIMITIVE, PRIMITIVE], bind(this._listenGlobal, this));
        broker.registerMethod("listenDone", [RenderStoreObject, RenderStoreObject], bind(this._listenDone, this));
    }
    _renderComponent(renderComponentType, rendererId) {
        var renderer = this._rootRenderer.renderComponent(renderComponentType);
        this._renderStore.store(renderer, rendererId);
    }
    _selectRootElement(renderer, selector, elId) {
        this._renderStore.store(renderer.selectRootElement(selector), elId);
    }
    _createElement(renderer, parentElement, name, elId) {
        this._renderStore.store(renderer.createElement(parentElement, name), elId);
    }
    _createViewRoot(renderer, hostElement, elId) {
        var viewRoot = renderer.createViewRoot(hostElement);
        if (this._renderStore.serialize(hostElement) !== elId) {
            this._renderStore.store(viewRoot, elId);
        }
    }
    _createTemplateAnchor(renderer, parentElement, elId) {
        this._renderStore.store(renderer.createTemplateAnchor(parentElement), elId);
    }
    _createText(renderer, parentElement, value, elId) {
        this._renderStore.store(renderer.createText(parentElement, value), elId);
    }
    _projectNodes(renderer, parentElement, nodes) {
        renderer.projectNodes(parentElement, nodes);
    }
    _attachViewAfter(renderer, node, viewRootNodes) {
        renderer.attachViewAfter(node, viewRootNodes);
    }
    _detachView(renderer, viewRootNodes) {
        renderer.detachView(viewRootNodes);
    }
    _destroyView(renderer, hostElement, viewAllNodes) {
        renderer.destroyView(hostElement, viewAllNodes);
        for (var i = 0; i < viewAllNodes.length; i++) {
            this._renderStore.remove(viewAllNodes[i]);
        }
    }
    _setElementProperty(renderer, renderElement, propertyName, propertyValue) {
        renderer.setElementProperty(renderElement, propertyName, propertyValue);
    }
    _setElementAttribute(renderer, renderElement, attributeName, attributeValue) {
        renderer.setElementAttribute(renderElement, attributeName, attributeValue);
    }
    _setBindingDebugInfo(renderer, renderElement, propertyName, propertyValue) {
        renderer.setBindingDebugInfo(renderElement, propertyName, propertyValue);
    }
    _setElementClass(renderer, renderElement, className, isAdd) {
        renderer.setElementClass(renderElement, className, isAdd);
    }
    _setElementStyle(renderer, renderElement, styleName, styleValue) {
        renderer.setElementStyle(renderElement, styleName, styleValue);
    }
    _invokeElementMethod(renderer, renderElement, methodName, args) {
        renderer.invokeElementMethod(renderElement, methodName, args);
    }
    _setText(renderer, renderNode, text) {
        renderer.setText(renderNode, text);
    }
    _listen(renderer, renderElement, eventName, unlistenId) {
        var unregisterCallback = renderer.listen(renderElement, eventName, (event) => this._eventDispatcher.dispatchRenderEvent(renderElement, null, eventName, event));
        this._renderStore.store(unregisterCallback, unlistenId);
    }
    _listenGlobal(renderer, eventTarget, eventName, unlistenId) {
        var unregisterCallback = renderer.listenGlobal(eventTarget, eventName, (event) => this._eventDispatcher.dispatchRenderEvent(null, eventTarget, eventName, event));
        this._renderStore.store(unregisterCallback, unlistenId);
    }
    _listenDone(renderer, unlistenCallback) { unlistenCallback(); }
};
MessageBasedRenderer = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [ServiceMessageBrokerFactory, MessageBus, Serializer, RenderStore, RootRenderer])
], MessageBasedRenderer);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLWhUZDJSMTh6LnRtcC9hbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvdWkvcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O09BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0I7T0FDeEMsRUFBQyxVQUFVLEVBQUMsTUFBTSw2Q0FBNkM7T0FDL0QsRUFBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sNENBQTRDO09BQzVGLEVBQUMsWUFBWSxFQUFZLG1CQUFtQixFQUFDLE1BQU0sOEJBQThCO09BQ2pGLEVBQUMsYUFBYSxFQUFFLGdCQUFnQixFQUFDLE1BQU0sK0NBQStDO09BRXRGLEVBQUMsSUFBSSxFQUFDLE1BQU0sUUFBUTtPQUNwQixFQUFDLGVBQWUsRUFBQyxNQUFNLDhDQUE4QztPQUNyRSxFQUFDLFdBQVcsRUFBQyxNQUFNLDhDQUE4QztPQUNqRSxFQUFDLDJCQUEyQixFQUFDLE1BQU0sd0RBQXdEO0FBR2xHO0lBR0UsWUFBb0IsY0FBMkMsRUFBVSxJQUFnQixFQUNyRSxXQUF1QixFQUFVLFlBQXlCLEVBQzFELGFBQTJCO1FBRjNCLG1CQUFjLEdBQWQsY0FBYyxDQUE2QjtRQUFVLFNBQUksR0FBSixJQUFJLENBQVk7UUFDckUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUMxRCxrQkFBYSxHQUFiLGFBQWEsQ0FBYztJQUFHLENBQUM7SUFFbkQsS0FBSztRQUNILElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFB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a0IsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQ3hCLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FDaEQsYUFBYSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNyRixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRU8sYUFBYSxDQUFDLFFBQWtCLEVBQUUsV0FBbUIsRUFBRSxTQUFpQixFQUMxRCxVQUFrQjtRQUN0QyxJQUFJLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQzFDLFdBQVcsRUFBRSxTQUFTLEVBQ3RCLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQy9GLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFTyxXQUFXLENBQUMsUUFBa0IsRUFBRSxnQkFBMEIsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM3RixDQUFDO0FBbEtEO0lBQUMsVUFBVSxFQUFFOzt3QkFBQTtBQWtLWiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7U2VyaWFsaXplciwgUFJJTUlUSVZFLCBSZW5kZXJTdG9yZU9iamVjdH0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJpYWxpemVyJztcbmltcG9ydCB7Um9vdFJlbmRlcmVyLCBSZW5kZXJlciwgUmVuZGVyQ29tcG9uZW50VHlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVuZGVyL2FwaSc7XG5pbXBvcnQge0VWRU5UX0NIQU5ORUwsIFJFTkRFUkVSX0NIQU5ORUx9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvbWVzc2FnaW5nX2FwaSc7XG5pbXBvcnQge1R5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge2JpbmR9IGZyb20gJy4vYmluZCc7XG5pbXBvcnQge0V2ZW50RGlzcGF0Y2hlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3VpL2V2ZW50X2Rpc3BhdGNoZXInO1xuaW1wb3J0IHtSZW5kZXJTdG9yZX0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9yZW5kZXJfc3RvcmUnO1xuaW1wb3J0IHtTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3Rvcnl9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VydmljZV9tZXNzYWdlX2Jyb2tlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNZXNzYWdlQmFzZWRSZW5kZXJlciB7XG4gIHByaXZhdGUgX2V2ZW50RGlzcGF0Y2hlcjogRXZlbnREaXNwYXRjaGVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2Jyb2tlckZhY3Rvcnk6IFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSwgcHJpdmF0ZSBfYnVzOiBNZXNzYWdlQnVzLFxuICAgICAgICAgICAgICBwcml2YXRlIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyLCBwcml2YXRlIF9yZW5kZXJTdG9yZTogUmVuZGVyU3RvcmUsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3Jvb3RSZW5kZXJlcjogUm9vdFJlbmRlcmVyKSB7fVxuXG4gIHN0YXJ0KCk6IHZvaWQge1xuICAgIHZhciBicm9rZXIgPSB0aGlzLl9icm9rZXJGYWN0b3J5LmNyZWF0ZU1lc3NhZ2VCcm9rZXIoUkVOREVSRVJfQ0hBTk5FTCk7XG4gICAgdGhpcy5fYnVzLmluaXRDaGFubmVsKEVWRU5UX0NIQU5ORUwpO1xuICAgIHRoaXMuX2V2ZW50RGlzcGF0Y2hlciA9IG5ldyBFdmVudERpc3BhdGNoZXIodGhpcy5fYnVzLnRvKEVWRU5UX0NIQU5ORUwpLCB0aGlzLl9zZXJpYWxpemVyKTtcblxuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcInJlbmRlckNvbXBvbmVudFwiLCBbUmVuZGVyQ29tcG9uZW50VHlwZSwgUFJJTUlUSVZFXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9yZW5kZXJDb21wb25lbnQsIHRoaXMpKTtcblxuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcInNlbGVjdFJvb3RFbGVtZW50XCIsIFtSZW5kZXJTdG9yZU9iamVjdCwgUFJJTUlUSVZFLCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX3NlbGVjdFJvb3RFbGVtZW50LCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwiY3JlYXRlRWxlbWVudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBQUklNSVRJVkUsIFBSSU1JVElWRV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fY3JlYXRlRWxlbWVudCwgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcImNyZWF0ZVZpZXdSb290XCIsIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fY3JlYXRlVmlld1Jvb3QsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJjcmVhdGVUZW1wbGF0ZUFuY2hvclwiLCBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX2NyZWF0ZVRlbXBsYXRlQW5jaG9yLCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwiY3JlYXRlVGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBQUklNSVRJVkUsIFBSSU1JVElWRV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fY3JlYXRlVGV4dCwgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcInByb2plY3ROb2Rlc1wiLCBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fcHJvamVjdE5vZGVzLCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwiYXR0YWNoVmlld0FmdGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9hdHRhY2hWaWV3QWZ0ZXIsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJkZXRhY2hWaWV3XCIsIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3RdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX2RldGFjaFZpZXcsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJkZXN0cm95Vmlld1wiLCBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fZGVzdHJveVZpZXcsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJzZXRFbGVtZW50UHJvcGVydHlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUFJJTUlUSVZFLCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX3NldEVsZW1lbnRQcm9wZXJ0eSwgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcInNldEVsZW1lbnRBdHRyaWJ1dGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUFJJTUlUSVZFLCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX3NldEVsZW1lbnRBdHRyaWJ1dGUsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJzZXRCaW5kaW5nRGVidWdJbmZvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRSwgUFJJTUlUSVZFXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9zZXRCaW5kaW5nRGVidWdJbmZvLCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwic2V0RWxlbWVudENsYXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRSwgUFJJTUlUSVZFXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9zZXRFbGVtZW50Q2xhc3MsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJzZXRFbGVtZW50U3R5bGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUFJJTUlUSVZFLCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX3NldEVsZW1lbnRTdHlsZSwgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcImludm9rZUVsZW1lbnRNZXRob2RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUFJJTUlUSVZFLCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX2ludm9rZUVsZW1lbnRNZXRob2QsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJzZXRUZXh0XCIsIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fc2V0VGV4dCwgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcImxpc3RlblwiLCBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBQUklNSVRJVkUsIFBSSU1JVElWRV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fbGlzdGVuLCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwibGlzdGVuR2xvYmFsXCIsIFtSZW5kZXJTdG9yZU9iamVjdCwgUFJJTUlUSVZFLCBQUklNSVRJVkUsIFBSSU1JVElWRV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fbGlzdGVuR2xvYmFsLCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwibGlzdGVuRG9uZVwiLCBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9saXN0ZW5Eb25lLCB0aGlzKSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW5kZXJDb21wb25lbnQocmVuZGVyQ29tcG9uZW50VHlwZTogUmVuZGVyQ29tcG9uZW50VHlwZSwgcmVuZGVyZXJJZDogbnVtYmVyKSB7XG4gICAgdmFyIHJlbmRlcmVyID0gdGhpcy5fcm9vdFJlbmRlcmVyLnJlbmRlckNvbXBvbmVudChyZW5kZXJDb21wb25lbnRUeXBlKTtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZShyZW5kZXJlciwgcmVuZGVyZXJJZCk7XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3RSb290RWxlbWVudChyZW5kZXJlcjogUmVuZGVyZXIsIHNlbGVjdG9yOiBzdHJpbmcsIGVsSWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHJlbmRlcmVyLnNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yKSwgZWxJZCk7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVFbGVtZW50KHJlbmRlcmVyOiBSZW5kZXJlciwgcGFyZW50RWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcsIGVsSWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQocGFyZW50RWxlbWVudCwgbmFtZSksIGVsSWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlVmlld1Jvb3QocmVuZGVyZXI6IFJlbmRlcmVyLCBob3N0RWxlbWVudDogYW55LCBlbElkOiBudW1iZXIpIHtcbiAgICB2YXIgdmlld1Jvb3QgPSByZW5kZXJlci5jcmVhdGVWaWV3Um9vdChob3N0RWxlbWVudCk7XG4gICAgaWYgKHRoaXMuX3JlbmRlclN0b3JlLnNlcmlhbGl6ZShob3N0RWxlbWVudCkgIT09IGVsSWQpIHtcbiAgICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHZpZXdSb290LCBlbElkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVUZW1wbGF0ZUFuY2hvcihyZW5kZXJlcjogUmVuZGVyZXIsIHBhcmVudEVsZW1lbnQ6IGFueSwgZWxJZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUocmVuZGVyZXIuY3JlYXRlVGVtcGxhdGVBbmNob3IocGFyZW50RWxlbWVudCksIGVsSWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlVGV4dChyZW5kZXJlcjogUmVuZGVyZXIsIHBhcmVudEVsZW1lbnQ6IGFueSwgdmFsdWU6IHN0cmluZywgZWxJZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUocmVuZGVyZXIuY3JlYXRlVGV4dChwYXJlbnRFbGVtZW50LCB2YWx1ZSksIGVsSWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcHJvamVjdE5vZGVzKHJlbmRlcmVyOiBSZW5kZXJlciwgcGFyZW50RWxlbWVudDogYW55LCBub2RlczogYW55W10pIHtcbiAgICByZW5kZXJlci5wcm9qZWN0Tm9kZXMocGFyZW50RWxlbWVudCwgbm9kZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXR0YWNoVmlld0FmdGVyKHJlbmRlcmVyOiBSZW5kZXJlciwgbm9kZTogYW55LCB2aWV3Um9vdE5vZGVzOiBhbnlbXSkge1xuICAgIHJlbmRlcmVyLmF0dGFjaFZpZXdBZnRlcihub2RlLCB2aWV3Um9vdE5vZGVzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2RldGFjaFZpZXcocmVuZGVyZXI6IFJlbmRlcmVyLCB2aWV3Um9vdE5vZGVzOiBhbnlbXSkge1xuICAgIHJlbmRlcmVyLmRldGFjaFZpZXcodmlld1Jvb3ROb2Rlcyk7XG4gIH1cblxuICBwcml2YXRlIF9kZXN0cm95VmlldyhyZW5kZXJlcjogUmVuZGVyZXIsIGhvc3RFbGVtZW50OiBhbnksIHZpZXdBbGxOb2RlczogYW55W10pIHtcbiAgICByZW5kZXJlci5kZXN0cm95Vmlldyhob3N0RWxlbWVudCwgdmlld0FsbE5vZGVzKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpZXdBbGxOb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5fcmVuZGVyU3RvcmUucmVtb3ZlKHZpZXdBbGxOb2Rlc1tpXSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2V0RWxlbWVudFByb3BlcnR5KHJlbmRlcmVyOiBSZW5kZXJlciwgcmVuZGVyRWxlbWVudDogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5VmFsdWU6IGFueSkge1xuICAgIHJlbmRlcmVyLnNldEVsZW1lbnRQcm9wZXJ0eShyZW5kZXJFbGVtZW50LCBwcm9wZXJ0eU5hbWUsIHByb3BlcnR5VmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0RWxlbWVudEF0dHJpYnV0ZShyZW5kZXJlcjogUmVuZGVyZXIsIHJlbmRlckVsZW1lbnQ6IGFueSwgYXR0cmlidXRlTmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVZhbHVlOiBzdHJpbmcpIHtcbiAgICByZW5kZXJlci5zZXRFbGVtZW50QXR0cmlidXRlKHJlbmRlckVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldEJpbmRpbmdEZWJ1Z0luZm8ocmVuZGVyZXI6IFJlbmRlcmVyLCByZW5kZXJFbGVtZW50OiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5VmFsdWU6IHN0cmluZykge1xuICAgIHJlbmRlcmVyLnNldEJpbmRpbmdEZWJ1Z0luZm8ocmVuZGVyRWxlbWVudCwgcHJvcGVydHlOYW1lLCBwcm9wZXJ0eVZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldEVsZW1lbnRDbGFzcyhyZW5kZXJlcjogUmVuZGVyZXIsIHJlbmRlckVsZW1lbnQ6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBpc0FkZDogYm9vbGVhbikge1xuICAgIHJlbmRlcmVyLnNldEVsZW1lbnRDbGFzcyhyZW5kZXJFbGVtZW50LCBjbGFzc05hbWUsIGlzQWRkKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldEVsZW1lbnRTdHlsZShyZW5kZXJlcjogUmVuZGVyZXIsIHJlbmRlckVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZVZhbHVlOiBzdHJpbmcpIHtcbiAgICByZW5kZXJlci5zZXRFbGVtZW50U3R5bGUocmVuZGVyRWxlbWVudCwgc3R5bGVOYW1lLCBzdHlsZVZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ludm9rZUVsZW1lbnRNZXRob2QocmVuZGVyZXI6IFJlbmRlcmVyLCByZW5kZXJFbGVtZW50OiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzOiBhbnlbXSkge1xuICAgIHJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QocmVuZGVyRWxlbWVudCwgbWV0aG9kTmFtZSwgYXJncyk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRUZXh0KHJlbmRlcmVyOiBSZW5kZXJlciwgcmVuZGVyTm9kZTogYW55LCB0ZXh0OiBzdHJpbmcpIHtcbiAgICByZW5kZXJlci5zZXRUZXh0KHJlbmRlck5vZGUsIHRleHQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbGlzdGVuKHJlbmRlcmVyOiBSZW5kZXJlciwgcmVuZGVyRWxlbWVudDogYW55LCBldmVudE5hbWU6IHN0cmluZywgdW5saXN0ZW5JZDogbnVtYmVyKSB7XG4gICAgdmFyIHVucmVnaXN0ZXJDYWxsYmFjayA9IHJlbmRlcmVyLmxpc3RlbihyZW5kZXJFbGVtZW50LCBldmVudE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZXZlbnQpID0+IHRoaXMuX2V2ZW50RGlzcGF0Y2hlci5kaXNwYXRjaFJlbmRlckV2ZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlckVsZW1lbnQsIG51bGwsIGV2ZW50TmFtZSwgZXZlbnQpKTtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZSh1bnJlZ2lzdGVyQ2FsbGJhY2ssIHVubGlzdGVuSWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbGlzdGVuR2xvYmFsKHJlbmRlcmVyOiBSZW5kZXJlciwgZXZlbnRUYXJnZXQ6IHN0cmluZywgZXZlbnROYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmxpc3RlbklkOiBudW1iZXIpIHtcbiAgICB2YXIgdW5yZWdpc3RlckNhbGxiYWNrID0gcmVuZGVyZXIubGlzdGVuR2xvYmFsKFxuICAgICAgICBldmVudFRhcmdldCwgZXZlbnROYW1lLFxuICAgICAgICAoZXZlbnQpID0+IHRoaXMuX2V2ZW50RGlzcGF0Y2hlci5kaXNwYXRjaFJlbmRlckV2ZW50KG51bGwsIGV2ZW50VGFyZ2V0LCBldmVudE5hbWUsIGV2ZW50KSk7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUodW5yZWdpc3RlckNhbGxiYWNrLCB1bmxpc3RlbklkKTtcbiAgfVxuXG4gIHByaXZhdGUgX2xpc3RlbkRvbmUocmVuZGVyZXI6IFJlbmRlcmVyLCB1bmxpc3RlbkNhbGxiYWNrOiBGdW5jdGlvbikgeyB1bmxpc3RlbkNhbGxiYWNrKCk7IH1cbn1cbiJdfQ==