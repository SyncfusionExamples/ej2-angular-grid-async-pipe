"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var Subject_1 = require("rxjs/Subject");
var httpOptions = {
    headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' })
};
var CrudService = (function (_super) {
    __extends(CrudService, _super);
    function CrudService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.customersUrl = 'api/customers'; // URL to web api
        return _this;
    }
    CrudService.prototype.execute = function (state) {
        var _this = this;
        this.getAllData().subscribe(function (x) { return _super.prototype.next.call(_this, x); });
    };
    //  this.getData(state).subscribe(x => super.next(x));
    /** GET all data from the server */
    CrudService.prototype.getAllData = function () {
        return this.http.get(this.customersUrl)
            .map(function (response) { return ({
            result: response,
            count: response.length
        }); })
            .map(function (data) { return data; });
    };
    /** POST: add a new record  to the server */
    CrudService.prototype.addRecord = function (state) {
        return this.http.post(this.customersUrl, state.data, httpOptions);
    };
    /** DELETE: delete the record from the server */
    CrudService.prototype.deleteRecord = function (state) {
        var id = state.data[0].id;
        var url = this.customersUrl + "/" + id;
        return this.http.delete(url, httpOptions);
    };
    /** PUT: update the record on the server */
    CrudService.prototype.updateRecord = function (state) {
        return this.http.put(this.customersUrl, state.data, httpOptions);
    };
    return CrudService;
}(Subject_1.Subject));
CrudService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.HttpClient !== "undefined" && http_1.HttpClient) === "function" && _a || Object])
], CrudService);
exports.CrudService = CrudService;
var _a;
