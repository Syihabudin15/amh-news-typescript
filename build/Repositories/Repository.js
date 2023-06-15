"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Repository {
    constructor(schema) {
        this._context = schema;
    }
    saveModel(entity) {
        throw new Error("Method not implemented.");
    }
    saveAllModel(entities) {
        throw new Error("Method not implemented.");
    }
    findById(id) {
        throw new Error("Method not implemented.");
    }
    findByCriteria(criteria) {
        throw new Error("Method not implemented.");
    }
    findByCriteriaPopulate(criteria, populate) {
        throw new Error("Method not implemented.");
    }
    findAll() {
        throw new Error("Method not implemented.");
    }
    findAllPaginate(page, size) {
        throw new Error("Method not implemented.");
    }
    findAllPaginatePopulate(page, size, populate) {
        throw new Error("Method not implemented.");
    }
    findAllCriteria(criteria) {
        throw new Error("Method not implemented.");
    }
    findAllCriteriaPaginate(criteria, page, size) {
        throw new Error("Method not implemented.");
    }
    findAllCriteriaPaginatePopulate(criteria, page, size, populate) {
        throw new Error("Method not implemented.");
    }
    updateModel(entity) {
        throw new Error("Method not implemented.");
    }
    updateModelById(id, entity) {
        throw new Error("Method not implemented.");
    }
    deleteById(id) {
        throw new Error("Method not implemented.");
    }
    deleteByCriteria(criteria) {
        throw new Error("Method not implemented.");
    }
}
exports.default = Repository;
//# sourceMappingURL=Repository.js.map