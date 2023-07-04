"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Repository {
    constructor(schema) {
        this._context = schema;
    }
    saveModel(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._context.create(entity);
            return result;
        });
    }
    saveAllModel(entities) {
        return __awaiter(this, void 0, void 0, function* () {
            entities.forEach((e) => __awaiter(this, void 0, void 0, function* () {
                yield this._context.create(e);
            }));
            return entities;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._context.findById(id);
            return result;
        });
    }
    findByCriteria(criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._context.findOne(criteria);
            return result;
        });
    }
    findByCriteriaPopulate(criteria, populate) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._context.findOne(criteria).populate(populate);
            return result;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._context.find();
            return result;
        });
    }
    findAllPopulate(populate) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._context.find().populate(populate);
            return result;
        });
    }
    findAllPaginate(page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * size;
            const result = yield this._context.find().skip(skip).limit(size);
            return result;
        });
    }
    findAllPaginatePopulate(page, size, populate) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * size;
            const result = yield this._context.find().populate(populate).skip(skip).limit(size);
            return result;
        });
    }
    findAllCriteria(criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._context.find(criteria);
            return result;
        });
    }
    findAllCriteriaPaginate(criteria, page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * size;
            const result = yield this._context.find(criteria).skip(skip).limit(size);
            return result;
        });
    }
    findAllCriteriaPaginatePopulate(criteria, page, size, populate) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * size;
            const result = yield this._context.find(criteria).populate(populate).skip(skip).limit(size);
            return result;
        });
    }
    updateModel(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    updateModelById(id, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._context.updateOne({ _id: id }, obj);
            return true;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._context.findByIdAndDelete(id);
        });
    }
    deleteByCriteria(criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._context.deleteOne(criteria);
        });
    }
}
exports.default = Repository;
//# sourceMappingURL=Repository.js.map