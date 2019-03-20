"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var customers = [
            { id: 1, name: 'HANAR' },
            { id: 2, name: 'VINER' },
            { id: 3, name: 'JOHN' },
            { id: 4, name: 'TOMSP' },
            { id: 5, name: 'SUPRD' }
        ];
        return { customers: customers };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
