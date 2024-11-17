/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(2), exports);
__exportStar(__webpack_require__(142), exports);
__exportStar(__webpack_require__(143), exports);
__exportStar(__webpack_require__(144), exports);
__exportStar(__webpack_require__(131), exports);
__exportStar(__webpack_require__(145), exports);
__exportStar(__webpack_require__(146), exports);
__exportStar(__webpack_require__(5), exports);
__exportStar(__webpack_require__(149), exports);
__exportStar(__webpack_require__(8), exports);


/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseController = void 0;
const swagger_1 = __webpack_require__(3);
const nestjs_i18n_1 = __webpack_require__(4);
const dto_1 = __webpack_require__(5);
const enums_1 = __webpack_require__(8);
const common_1 = __webpack_require__(28);
const shared_1 = __webpack_require__(32);
const auth_strategy_1 = __webpack_require__(79);
const functions_1 = __webpack_require__(131);
let BaseController = class BaseController {
    constructor() { }
    async createControllerByUser(payload, user = null) {
        payload.created_at = new Date();
        payload.updated_at = new Date();
        if (user) {
            payload.created_by = functions_1.Common.toObjectId(user.sub);
            payload.updated_by = functions_1.Common.toObjectId(user.sub);
        }
        return payload;
    }
    async updateControllerByUser(payload, user = null) {
        payload.updated_at = new Date();
        if (user) {
            payload.updated_by = functions_1.Common.toObjectId(user.sub);
        }
        return payload;
    }
    async returnResponse(result, type) {
        let message = '';
        switch (type) {
            case enums_1.RESPONSE.CREATE:
                message = await this.i18n.translate('messages.MR0001', {
                    args: {
                        parameter: (await this.i18n.translate('models.' + this.model_name)) ?? '',
                    },
                });
                break;
            case enums_1.RESPONSE.UPDATE:
                message = await this.i18n.translate('messages.MR0002', {
                    args: {
                        parameter: (await this.i18n.translate('models.' + this.model_name)) ?? '',
                    },
                });
                break;
            case enums_1.RESPONSE.UPDATE_STATUS:
                message = await this.i18n.translate('messages.MR0003', {
                    args: {
                        parameter: (await this.i18n.translate('models.' + this.model_name)) ?? '',
                    },
                });
                break;
            case enums_1.RESPONSE.GET:
                message = await this.i18n.translate('messages.MR0004');
        }
        return {
            message,
            data: result,
        };
    }
};
exports.BaseController = BaseController;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", typeof (_a = typeof nestjs_i18n_1.I18nService !== "undefined" && nestjs_i18n_1.I18nService) === "function" ? _a : Object)
], BaseController.prototype, "i18n", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", typeof (_b = typeof shared_1.LoggerService !== "undefined" && shared_1.LoggerService) === "function" ? _b : Object)
], BaseController.prototype, "logger", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", typeof (_c = typeof auth_strategy_1.AuthConfigStrategy !== "undefined" && auth_strategy_1.AuthConfigStrategy) === "function" ? _c : Object)
], BaseController.prototype, "test", void 0);
exports.BaseController = BaseController = __decorate([
    (0, swagger_1.ApiUnauthorizedResponse)({
        type: dto_1.BaseUnauthorizedResponseDTO,
        isArray: false,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        type: dto_1.BaseServerErrorResponseDTO,
        isArray: false,
    }),
    (0, swagger_1.ApiForbiddenResponse)({
        type: dto_1.BaseForbiddenResponseDTO,
        isArray: false,
    }),
    __metadata("design:paramtypes", [])
], BaseController);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("nestjs-i18n");

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(6), exports);
__exportStar(__webpack_require__(25), exports);
__exportStar(__webpack_require__(29), exports);
__exportStar(__webpack_require__(30), exports);
__exportStar(__webpack_require__(31), exports);


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseCreateDTO = void 0;
const class_validator_1 = __webpack_require__(7);
const swagger_1 = __webpack_require__(3);
const enums_1 = __webpack_require__(8);
class BaseCreateDTO {
    constructor() {
        this.status = enums_1.ENUM_STATUS.ACTIVE;
    }
}
exports.BaseCreateDTO = BaseCreateDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)([enums_1.ENUM_STATUS.ACTIVE, enums_1.ENUM_STATUS.ACTIVE], {
        message: '$constraint1',
    }),
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Trạng thái',
        enum: enums_1.ENUM_STATUS,
        example: enums_1.ENUM_STATUS.ACTIVE,
    }),
    __metadata("design:type", Object)
], BaseCreateDTO.prototype, "status", void 0);


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(9), exports);
__exportStar(__webpack_require__(14), exports);
__exportStar(__webpack_require__(15), exports);
__exportStar(__webpack_require__(16), exports);
__exportStar(__webpack_require__(17), exports);
__exportStar(__webpack_require__(18), exports);
__exportStar(__webpack_require__(19), exports);
__exportStar(__webpack_require__(20), exports);
__exportStar(__webpack_require__(21), exports);
__exportStar(__webpack_require__(22), exports);
__exportStar(__webpack_require__(23), exports);
__exportStar(__webpack_require__(24), exports);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ENUM_MONGO_OPERATOR = exports.VERSION_API_INFO = exports.ENUM_DATE_TIME = exports.ENUM_KPI_UNIT = exports.ENUM_SCOPE = exports.ENUM_NOTIFY_DISPLAY_TYPE = exports.ENUM_NOTIFY_TYPE = exports.ENUM_NOTIFY_SEND_TYPE = exports.ENUM_NOTIFY = exports.SOCKET_EVENT_TYPE_ENUM = exports.ENUM_DATE_FORMAT = exports.TIME_IN_SECONDS = exports.QUEUE_TYPE_ENUM = exports.REDIS_NAME_ENUM = exports.QUEUE_CONFIG_KEY_ENUM = exports.ENUM_GLOBAL_VARIABLE = exports.ENUM_POPULATE_AGGREGATE = exports.ENUM_POPULATE = exports.ENUM_CURRENCY_UNIT = exports.ENUM_TYPE_VARIABLE = exports.ENUM_VALIDATION_ACTION_TYPE = exports.EVENT_EMITTER_ENUM = exports.ENUM_RESOURCE_SYSTEM = exports.RESPONSE = exports.LOG_ACTION = exports.CONNECTION_NAME = exports.ENUM_STATUS = void 0;
__webpack_require__(10);
var ENUM_STATUS;
(function (ENUM_STATUS) {
    ENUM_STATUS["EXPIRED"] = "EXPIRED";
    ENUM_STATUS["ACTIVE"] = "ACTIVE";
    ENUM_STATUS["INACTIVE"] = "INACTIVE";
    ENUM_STATUS["INIT"] = "INIT";
})(ENUM_STATUS || (exports.ENUM_STATUS = ENUM_STATUS = {}));
var CONNECTION_NAME;
(function (CONNECTION_NAME) {
    CONNECTION_NAME["PRIMARY"] = "PRIMARY";
    CONNECTION_NAME["SECONDARY"] = "SECONDARY";
})(CONNECTION_NAME || (exports.CONNECTION_NAME = CONNECTION_NAME = {}));
var LOG_ACTION;
(function (LOG_ACTION) {
    LOG_ACTION["CREATE"] = "CREATE";
    LOG_ACTION["UPDATE"] = "UPDATE";
    LOG_ACTION["UPDATE_STATUS"] = "UPDATE_STATUS";
})(LOG_ACTION || (exports.LOG_ACTION = LOG_ACTION = {}));
var RESPONSE;
(function (RESPONSE) {
    RESPONSE["CREATE"] = "CREATE";
    RESPONSE["UPDATE"] = "UPDATE";
    RESPONSE["UPDATE_STATUS"] = "UPDATE_STATUS";
    RESPONSE["GET"] = "GET";
})(RESPONSE || (exports.RESPONSE = RESPONSE = {}));
var ENUM_RESOURCE_SYSTEM;
(function (ENUM_RESOURCE_SYSTEM) {
    ENUM_RESOURCE_SYSTEM["CLIENT_WEB"] = "CLIENT_WEB";
    ENUM_RESOURCE_SYSTEM["ADMIN_WEB"] = "ADMIN_WEB";
    ENUM_RESOURCE_SYSTEM["PUBLISHER_WEB"] = "PUBLISHER_WEB";
    ENUM_RESOURCE_SYSTEM["SYSTEM"] = "SYSTEM";
})(ENUM_RESOURCE_SYSTEM || (exports.ENUM_RESOURCE_SYSTEM = ENUM_RESOURCE_SYSTEM = {}));
var EVENT_EMITTER_ENUM;
(function (EVENT_EMITTER_ENUM) {
    EVENT_EMITTER_ENUM["UPDATE"] = ".update";
    EVENT_EMITTER_ENUM["LOGIN"] = ".login";
    EVENT_EMITTER_ENUM["SAVE_ACTION_HISTORY"] = ".saveActionHistory";
    EVENT_EMITTER_ENUM["CREATED"] = ".created";
})(EVENT_EMITTER_ENUM || (exports.EVENT_EMITTER_ENUM = EVENT_EMITTER_ENUM = {}));
var ENUM_VALIDATION_ACTION_TYPE;
(function (ENUM_VALIDATION_ACTION_TYPE) {
    ENUM_VALIDATION_ACTION_TYPE["CREATE"] = "CREATE";
    ENUM_VALIDATION_ACTION_TYPE["UPDATE"] = "UPDATE";
    ENUM_VALIDATION_ACTION_TYPE["UPDATE_STATUS"] = "UPDATE_STATUS";
    ENUM_VALIDATION_ACTION_TYPE["DELETE"] = "DELETE";
})(ENUM_VALIDATION_ACTION_TYPE || (exports.ENUM_VALIDATION_ACTION_TYPE = ENUM_VALIDATION_ACTION_TYPE = {}));
var ENUM_TYPE_VARIABLE;
(function (ENUM_TYPE_VARIABLE) {
    ENUM_TYPE_VARIABLE["STRING"] = "STRING";
    ENUM_TYPE_VARIABLE["NUMER"] = "NUMER";
    ENUM_TYPE_VARIABLE["BOOLEAN"] = "BOOLEAN";
    ENUM_TYPE_VARIABLE["OBJECT"] = "OBJECT";
    ENUM_TYPE_VARIABLE["ARRAY_OBJECT"] = "ARRAY_OBJECT";
    ENUM_TYPE_VARIABLE["ARRAY"] = "ARRAY";
})(ENUM_TYPE_VARIABLE || (exports.ENUM_TYPE_VARIABLE = ENUM_TYPE_VARIABLE = {}));
var ENUM_CURRENCY_UNIT;
(function (ENUM_CURRENCY_UNIT) {
    ENUM_CURRENCY_UNIT["VND"] = "VND";
    ENUM_CURRENCY_UNIT["USD"] = "USD";
})(ENUM_CURRENCY_UNIT || (exports.ENUM_CURRENCY_UNIT = ENUM_CURRENCY_UNIT = {}));
var ENUM_POPULATE;
(function (ENUM_POPULATE) {
    ENUM_POPULATE["USER"] = "avatar name code phone email roles status";
    ENUM_POPULATE["ROLE"] = "code name";
    ENUM_POPULATE["MASTER_DATA"] = "_id code name";
})(ENUM_POPULATE || (exports.ENUM_POPULATE = ENUM_POPULATE = {}));
exports.ENUM_POPULATE_AGGREGATE = {
    USER: {
        avatar: 1,
        name: 1,
        code: 1,
        title: 1,
        phone: 1,
        email: 1,
        roles: 1,
        status: 1,
    },
    ROLE: { code: 1, name: 1 },
    MASTER_DATA: {
        type: 1,
        code: 1,
        name: 1,
        status: 1,
        parent: 1,
    },
    ATTRIBUTE_COMMON: {
        name: 1,
        code: 1,
        image: 1,
        description: 1,
    },
};
var ENUM_GLOBAL_VARIABLE;
(function (ENUM_GLOBAL_VARIABLE) {
    ENUM_GLOBAL_VARIABLE["resource_system_name"] = "resource_system_name";
})(ENUM_GLOBAL_VARIABLE || (exports.ENUM_GLOBAL_VARIABLE = ENUM_GLOBAL_VARIABLE = {}));
var QUEUE_CONFIG_KEY_ENUM;
(function (QUEUE_CONFIG_KEY_ENUM) {
    QUEUE_CONFIG_KEY_ENUM["SPONSOR_CONFIG"] = "sponsor-config";
})(QUEUE_CONFIG_KEY_ENUM || (exports.QUEUE_CONFIG_KEY_ENUM = QUEUE_CONFIG_KEY_ENUM = {}));
var REDIS_NAME_ENUM;
(function (REDIS_NAME_ENUM) {
    REDIS_NAME_ENUM["SPONSOR_REDIS"] = "sponsor-redis";
    REDIS_NAME_ENUM["BLACKLIST"] = "blacklist";
})(REDIS_NAME_ENUM || (exports.REDIS_NAME_ENUM = REDIS_NAME_ENUM = {}));
var QUEUE_TYPE_ENUM;
(function (QUEUE_TYPE_ENUM) {
    QUEUE_TYPE_ENUM["INSERT_QUEUE"] = "sponsor-insert-queue";
})(QUEUE_TYPE_ENUM || (exports.QUEUE_TYPE_ENUM = QUEUE_TYPE_ENUM = {}));
var TIME_IN_SECONDS;
(function (TIME_IN_SECONDS) {
    TIME_IN_SECONDS[TIME_IN_SECONDS["FIVE_MINUTE"] = 300] = "FIVE_MINUTE";
    TIME_IN_SECONDS[TIME_IN_SECONDS["TEN_MINUTE"] = 600] = "TEN_MINUTE";
    TIME_IN_SECONDS[TIME_IN_SECONDS["FIVE_HOUR"] = 18000] = "FIVE_HOUR";
})(TIME_IN_SECONDS || (exports.TIME_IN_SECONDS = TIME_IN_SECONDS = {}));
var ENUM_DATE_FORMAT;
(function (ENUM_DATE_FORMAT) {
    ENUM_DATE_FORMAT["TIMEZONE_07"] = "+07";
})(ENUM_DATE_FORMAT || (exports.ENUM_DATE_FORMAT = ENUM_DATE_FORMAT = {}));
var SOCKET_EVENT_TYPE_ENUM;
(function (SOCKET_EVENT_TYPE_ENUM) {
    SOCKET_EVENT_TYPE_ENUM["JOIN"] = "JOIN";
    SOCKET_EVENT_TYPE_ENUM["LEAVE"] = "LEAVE";
    SOCKET_EVENT_TYPE_ENUM["MESSAGE"] = "MESSAGE";
    SOCKET_EVENT_TYPE_ENUM["ALL_MESSAGES"] = "ALL_MESSAGES";
})(SOCKET_EVENT_TYPE_ENUM || (exports.SOCKET_EVENT_TYPE_ENUM = SOCKET_EVENT_TYPE_ENUM = {}));
var ENUM_NOTIFY;
(function (ENUM_NOTIFY) {
    ENUM_NOTIFY["INIT"] = "INIT";
    ENUM_NOTIFY["PROCESSING"] = "PROCESSING";
    ENUM_NOTIFY["SENT"] = "SENT";
    ENUM_NOTIFY["FAIL"] = "FAIL";
})(ENUM_NOTIFY || (exports.ENUM_NOTIFY = ENUM_NOTIFY = {}));
var ENUM_NOTIFY_SEND_TYPE;
(function (ENUM_NOTIFY_SEND_TYPE) {
    ENUM_NOTIFY_SEND_TYPE["ALL"] = "ALL";
    ENUM_NOTIFY_SEND_TYPE["USER"] = "USER";
    ENUM_NOTIFY_SEND_TYPE["ROLE"] = "ROLE";
})(ENUM_NOTIFY_SEND_TYPE || (exports.ENUM_NOTIFY_SEND_TYPE = ENUM_NOTIFY_SEND_TYPE = {}));
var ENUM_NOTIFY_TYPE;
(function (ENUM_NOTIFY_TYPE) {
    ENUM_NOTIFY_TYPE["ALL"] = "ALL";
    ENUM_NOTIFY_TYPE["NORMAL"] = "NORMAL";
    ENUM_NOTIFY_TYPE["NEWS"] = "NEWS";
    ENUM_NOTIFY_TYPE["SYSTEM"] = "SYSTEM";
    ENUM_NOTIFY_TYPE["CHAT"] = "CHAT";
})(ENUM_NOTIFY_TYPE || (exports.ENUM_NOTIFY_TYPE = ENUM_NOTIFY_TYPE = {}));
var ENUM_NOTIFY_DISPLAY_TYPE;
(function (ENUM_NOTIFY_DISPLAY_TYPE) {
    ENUM_NOTIFY_DISPLAY_TYPE["NORMAL"] = "NORMAL";
    ENUM_NOTIFY_DISPLAY_TYPE["TOP"] = "TOP";
})(ENUM_NOTIFY_DISPLAY_TYPE || (exports.ENUM_NOTIFY_DISPLAY_TYPE = ENUM_NOTIFY_DISPLAY_TYPE = {}));
var ENUM_SCOPE;
(function (ENUM_SCOPE) {
    ENUM_SCOPE["BROWSE"] = "BROWSE";
    ENUM_SCOPE["CREATE"] = "CREATE";
    ENUM_SCOPE["DELETE"] = "DELETE";
    ENUM_SCOPE["EXPORT"] = "EXPORT";
    ENUM_SCOPE["IMPORT"] = "IMPORT";
    ENUM_SCOPE["READ"] = "READ";
    ENUM_SCOPE["UPDATE"] = "UPDATE";
    ENUM_SCOPE["UPDATE_STATUS"] = "UPDATE_STATUS";
})(ENUM_SCOPE || (exports.ENUM_SCOPE = ENUM_SCOPE = {}));
var ENUM_KPI_UNIT;
(function (ENUM_KPI_UNIT) {
    ENUM_KPI_UNIT["MONEY"] = "\u0111";
    ENUM_KPI_UNIT["TIME"] = "Gi\u1EDD";
    ENUM_KPI_UNIT["WEIGHT"] = "Kg";
    ENUM_KPI_UNIT["PERCENT"] = "%";
})(ENUM_KPI_UNIT || (exports.ENUM_KPI_UNIT = ENUM_KPI_UNIT = {}));
var ENUM_DATE_TIME;
(function (ENUM_DATE_TIME) {
    ENUM_DATE_TIME["HHmmDDMMYYYY"] = "HH:mm DD-MM-YYYY";
    ENUM_DATE_TIME["YYYY_MM_DD"] = "YYYY-MM-DD";
    ENUM_DATE_TIME["YYYYMMDDHHMMSS"] = "YYYYMMDDHHmmss";
    ENUM_DATE_TIME["DDMMYYYYHHmmss"] = "DDMMYYYYHHmmss";
    ENUM_DATE_TIME["START_OFFSET"] = "T00:00:00.000+07:00";
    ENUM_DATE_TIME["END_OFFSET"] = "T23:59:59.999+07:00";
    ENUM_DATE_TIME["YYYY_MM_DD_TIMEZONE"] = "YYYY-MM-DD HH:mm:ss+07:00";
    ENUM_DATE_TIME["TIME_OFFSET"] = "+07:00";
})(ENUM_DATE_TIME || (exports.ENUM_DATE_TIME = ENUM_DATE_TIME = {}));
var VERSION_API_INFO;
(function (VERSION_API_INFO) {
    VERSION_API_INFO["VERSION"] = "0.0.1";
})(VERSION_API_INFO || (exports.VERSION_API_INFO = VERSION_API_INFO = {}));
var ENUM_MONGO_OPERATOR;
(function (ENUM_MONGO_OPERATOR) {
    ENUM_MONGO_OPERATOR["ADD_TO_SET"] = "ADD_TO_SET";
    ENUM_MONGO_OPERATOR["PUSH"] = "PUSH";
    ENUM_MONGO_OPERATOR["PULL"] = "PULL";
    ENUM_MONGO_OPERATOR["NORMAL"] = "NORMAL";
    ENUM_MONGO_OPERATOR["UNSET"] = "UNSET";
})(ENUM_MONGO_OPERATOR || (exports.ENUM_MONGO_OPERATOR = ENUM_MONGO_OPERATOR = {}));


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getEnvFilePath = void 0;
const dotenv_1 = __webpack_require__(11);
const path_1 = __webpack_require__(12);
const process_1 = __webpack_require__(13);
const getEnvFilePath = (NODE_ENV) => {
    const joinPath = (path) => (0, path_1.join)((0, process_1.cwd)(), 'config', path);
    switch (NODE_ENV) {
        case 'dev':
        case 'development':
            return joinPath('.env.dev');
        case 'local':
            return joinPath('.env.local');
        case 'uat':
            return joinPath('.env.uat');
        case 'prod':
            return joinPath('.env.prod');
        default:
            return joinPath('.env');
    }
};
exports.getEnvFilePath = getEnvFilePath;
(0, dotenv_1.config)({ path: (0, exports.getEnvFilePath)(process.env['NODE' + '_ENV']) });


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("process");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ENUM_INSERT_QUEUE_FUNCTION_KEY = exports.ALL_TOPIC_NOTIFY = void 0;
const common_enum_1 = __webpack_require__(9);
__webpack_require__(10);
exports.ALL_TOPIC_NOTIFY = process.env.ENVIRONMENT === 'prod' ? 'SPONSOR_PRO' : 'SPONSOR_DEV';
exports.ENUM_INSERT_QUEUE_FUNCTION_KEY = `${common_enum_1.QUEUE_TYPE_ENUM.INSERT_QUEUE}-${exports.ALL_TOPIC_NOTIFY}`;


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SESSION_TYPE = exports.EMITTER = void 0;
var EMITTER;
(function (EMITTER) {
    EMITTER["UPDATE_ROLE_PERMISSIONS"] = "UPDATE_ROLE_PERMISSIONS";
    EMITTER["SYNCHORONIZED_PASSWORD"] = "SYNCHORONIZED_PASSWORD";
    EMITTER["REFRESH_TOKEN"] = "REFRESH_TOKEN";
    EMITTER["SYNCHORONIZED_ACCOUNT"] = "SYNCHORONIZED_ACCOUNT";
    EMITTER["SESSION_LOGS"] = "SESSION_LOGS";
    EMITTER["SYNCHORONIZED_SCHEDULER_CRON"] = "SYNCHORONIZED_SCHEDULER_CRON";
})(EMITTER || (exports.EMITTER = EMITTER = {}));
var SESSION_TYPE;
(function (SESSION_TYPE) {
    SESSION_TYPE["LOGIN"] = "LOGIN";
    SESSION_TYPE["LOGOUT"] = "LOGOUT";
    SESSION_TYPE["REFRESH_TOKEN"] = "REFRESH_TOKEN";
    SESSION_TYPE["UPDATE_USER"] = "UPDATE_USER";
})(SESSION_TYPE || (exports.SESSION_TYPE = SESSION_TYPE = {}));


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ENUM_VERSION = exports.LANGUAGE = exports.ENVIROMENT_VARIABLE = exports.ENVIROMENT = void 0;
var ENVIROMENT;
(function (ENVIROMENT) {
    ENVIROMENT["DEV"] = "dev";
    ENVIROMENT["UAT"] = "uat";
    ENVIROMENT["PROD"] = "prod";
    ENVIROMENT["LOCAL"] = "local";
})(ENVIROMENT || (exports.ENVIROMENT = ENVIROMENT = {}));
var ENVIROMENT_VARIABLE;
(function (ENVIROMENT_VARIABLE) {
    ENVIROMENT_VARIABLE["ENVIRONMENT"] = "ENVIRONMENT";
    ENVIROMENT_VARIABLE["IS_DEBUG"] = "IS_DEBUG";
    ENVIROMENT_VARIABLE["MONGO_URI"] = "MONGO_URI";
    ENVIROMENT_VARIABLE["MONGO_URI_READONLY"] = "MONGO_URI_READONLY";
    ENVIROMENT_VARIABLE["JWT_SECRET"] = "JWT_SECRET";
    ENVIROMENT_VARIABLE["JWT_ACCESS_TOKEN_EXPIRE"] = "JWT_ACCESS_TOKEN_EXPIRE";
    ENVIROMENT_VARIABLE["JWT_REFRESH_TOKEN_EXPIRE"] = "JWT_REFRESH_TOKEN_EXPIRE";
    ENVIROMENT_VARIABLE["JWT_EXPIRES_IN"] = "JWT_EXPIRES_IN";
    ENVIROMENT_VARIABLE["HOST_NAME"] = "HOST_NAME";
    ENVIROMENT_VARIABLE["DEFAULT_LANGUAGE"] = "DEFAULT_LANGUAGE";
    ENVIROMENT_VARIABLE["CLIENT_API_PORT"] = "CLIENT_API_PORT";
    ENVIROMENT_VARIABLE["ADMIN_API_PORT"] = "ADMIN_API_PORT";
    ENVIROMENT_VARIABLE["PUBLISHER_API_PORT"] = "PUBLISHER_API_PORT";
    ENVIROMENT_VARIABLE["SCHUDULER_API_PORT"] = "SCHUDULER_API_PORT";
    ENVIROMENT_VARIABLE["CLIENT_WEB_URL"] = "CLIENT_WEB_URL";
    ENVIROMENT_VARIABLE["ADMIN_WEB_URL"] = "ADMIN_WEB_URL";
    ENVIROMENT_VARIABLE["PUBLISHER_WEB_URL"] = "PUBLISHER_WEB_URL";
    ENVIROMENT_VARIABLE["SERVER_MEDIA_URL"] = "SERVER_MEDIA_URL";
    ENVIROMENT_VARIABLE["ACCESS_TOKEN"] = "ACCESS_TOKEN";
    ENVIROMENT_VARIABLE["DEFAULT_PASSWORD"] = "DEFAULT_PASSWORD";
    ENVIROMENT_VARIABLE["SOCKET_URL"] = "SOCKET_URL";
    ENVIROMENT_VARIABLE["TELEGRAM_BOT_ID"] = "TELEGRAM_BOT_ID";
    ENVIROMENT_VARIABLE["TELEGRAM_GROUP_ID"] = "TELEGRAM_GROUP_ID";
    ENVIROMENT_VARIABLE["ASYNC_POOL"] = "ASYNC_POOL";
    ENVIROMENT_VARIABLE["MAX_POOL_SIZE"] = "MAX_POOL_SIZE";
    ENVIROMENT_VARIABLE["PROCESS_PER_ASYNC_POOL"] = "PROCESS_PER_ASYNC_POOL";
    ENVIROMENT_VARIABLE["SERVER_REQUEST_TIMEMOUT"] = "SERVER_REQUEST_TIMEMOUT";
    ENVIROMENT_VARIABLE["SERVER_MONGO_SELECTION_TIMEMOUT"] = "SERVER_MONGO_SELECTION_TIMEMOUT";
    ENVIROMENT_VARIABLE["SERVER_MONGO_CONNECT_TIMEOUT"] = "SERVER_MONGO_CONNECT_TIMEOUT";
    ENVIROMENT_VARIABLE["SERVER_MONGO_SOCKET_TIMEOUT"] = "SERVER_MONGO_SOCKET_TIMEOUT";
    ENVIROMENT_VARIABLE["REDIS_HOST"] = "REDIS_HOST";
    ENVIROMENT_VARIABLE["REDIS_PORT"] = "REDIS_PORT";
    ENVIROMENT_VARIABLE["REDIS_PASSWORD"] = "REDIS_PASSWORD";
    ENVIROMENT_VARIABLE["TTL_KEY_CACHE"] = "TTL_KEY_CACHE";
    ENVIROMENT_VARIABLE["TTL_KEY_CACHE_SECOND"] = "TTL_KEY_CACHE_SECOND";
    ENVIROMENT_VARIABLE["TTL_KEY_QUEUE"] = "TTL_KEY_QUEUE";
    ENVIROMENT_VARIABLE["HOST_NAME_SCHEDULE"] = "HOST_NAME_SCHEDULE";
    ENVIROMENT_VARIABLE["MY_SECRET_KEY_API_SCHEDULE"] = "MY_SECRET_KEY_API_SCHEDULE";
    ENVIROMENT_VARIABLE["EMAIL_ADMIN"] = "EMAIL_ADMIN";
    ENVIROMENT_VARIABLE["HOST_MAIL"] = "HOST_MAIL";
    ENVIROMENT_VARIABLE["EMAIL_PASS"] = "EMAIL_PASS";
    ENVIROMENT_VARIABLE["IV_KEY"] = "IV_KEY";
    ENVIROMENT_VARIABLE["SALT_KEY"] = "SALT_KEY";
    ENVIROMENT_VARIABLE["SCHUDULER_API_URL"] = "SCHUDULER_API_URL";
    ENVIROMENT_VARIABLE["SMTP_HOST"] = "SMTP_HOST";
    ENVIROMENT_VARIABLE["SMTP_PORT"] = "SMTP_PORT";
    ENVIROMENT_VARIABLE["SMTP_USER"] = "SMTP_USER";
    ENVIROMENT_VARIABLE["SMTP_PASSWORD"] = "SMTP_PASSWORD";
    ENVIROMENT_VARIABLE["SMTP_DEFAULT_EMAIL"] = "SMTP_DEFAULT_EMAIL";
    ENVIROMENT_VARIABLE["ADMIN_MAIL"] = "ADMIN_MAIL";
})(ENVIROMENT_VARIABLE || (exports.ENVIROMENT_VARIABLE = ENVIROMENT_VARIABLE = {}));
var LANGUAGE;
(function (LANGUAGE) {
    LANGUAGE["VI"] = "vi";
    LANGUAGE["ENG"] = "eng";
})(LANGUAGE || (exports.LANGUAGE = LANGUAGE = {}));
var ENUM_VERSION;
(function (ENUM_VERSION) {
    ENUM_VERSION["V1"] = "1";
    ENUM_VERSION["V2"] = "2";
    ENUM_VERSION["V3"] = "3";
})(ENUM_VERSION || (exports.ENUM_VERSION = ENUM_VERSION = {}));


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BACKUP_CACHE_TTL = exports.CACHE_TTL = exports.TOKEN_TYPE = exports.JWT_ERROR_MESSAGE = void 0;
var JWT_ERROR_MESSAGE;
(function (JWT_ERROR_MESSAGE) {
    JWT_ERROR_MESSAGE["EXPIRED"] = "jwt expired";
    JWT_ERROR_MESSAGE["INVALID_TOKEN"] = "invalid signature";
    JWT_ERROR_MESSAGE["INVALID_PUBLIC_KEY"] = "secretOrPublicKey must be an asymmetric key when using RS256";
})(JWT_ERROR_MESSAGE || (exports.JWT_ERROR_MESSAGE = JWT_ERROR_MESSAGE = {}));
var TOKEN_TYPE;
(function (TOKEN_TYPE) {
    TOKEN_TYPE["BEARER"] = "Bearer";
    TOKEN_TYPE["REFRESH"] = "Refresh";
})(TOKEN_TYPE || (exports.TOKEN_TYPE = TOKEN_TYPE = {}));
const HOUR = 60 * 60;
const DAY = HOUR * 24;
const MINUTE = 60;
var CACHE_TTL;
(function (CACHE_TTL) {
    CACHE_TTL[CACHE_TTL["USER_INFO"] = 18000] = "USER_INFO";
    CACHE_TTL[CACHE_TTL["BUSINESS_ORG_INFO"] = 86400] = "BUSINESS_ORG_INFO";
    CACHE_TTL[CACHE_TTL["DETAIL"] = 604800] = "DETAIL";
    CACHE_TTL[CACHE_TTL["AUTHENTICATE"] = 120] = "AUTHENTICATE";
    CACHE_TTL[CACHE_TTL["EMAIL"] = 86400] = "EMAIL";
    CACHE_TTL[CACHE_TTL["REQUEST_UPDATE_PASSWORD"] = 300] = "REQUEST_UPDATE_PASSWORD";
    CACHE_TTL[CACHE_TTL["ROLE"] = 18000] = "ROLE";
    CACHE_TTL[CACHE_TTL["ORGANIZATION"] = 300] = "ORGANIZATION";
    CACHE_TTL[CACHE_TTL["BUSINESS_TYPE"] = 300] = "BUSINESS_TYPE";
    CACHE_TTL[CACHE_TTL["STABLE"] = 0] = "STABLE";
    CACHE_TTL[CACHE_TTL["RELATED_AUTHENTICATE"] = 172800] = "RELATED_AUTHENTICATE";
    CACHE_TTL[CACHE_TTL["DDOS"] = 30] = "DDOS";
    CACHE_TTL[CACHE_TTL["MENU_FRAME"] = 604800] = "MENU_FRAME";
})(CACHE_TTL || (exports.CACHE_TTL = CACHE_TTL = {}));
var BACKUP_CACHE_TTL;
(function (BACKUP_CACHE_TTL) {
    BACKUP_CACHE_TTL[BACKUP_CACHE_TTL["DEFAULT"] = 2000] = "DEFAULT";
    BACKUP_CACHE_TTL[BACKUP_CACHE_TTL["RELATED_AUTHENTICATE"] = 5000] = "RELATED_AUTHENTICATE";
})(BACKUP_CACHE_TTL || (exports.BACKUP_CACHE_TTL = BACKUP_CACHE_TTL = {}));


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ENUM_ADMIN_MENUS = void 0;
var ENUM_ADMIN_MENUS;
(function (ENUM_ADMIN_MENUS) {
    ENUM_ADMIN_MENUS["MASTER_DATA"] = "MASTER_DATA";
    ENUM_ADMIN_MENUS["SETTING"] = "SETTING";
    ENUM_ADMIN_MENUS["USER"] = "USER";
})(ENUM_ADMIN_MENUS || (exports.ENUM_ADMIN_MENUS = ENUM_ADMIN_MENUS = {}));


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ENUM_MODEL = void 0;
var ENUM_MODEL;
(function (ENUM_MODEL) {
    ENUM_MODEL["USER"] = "USER";
    ENUM_MODEL["SPONSOR"] = "SPONSOR";
    ENUM_MODEL["MASTER_DATA"] = "MASTER_DATA";
    ENUM_MODEL["BLACKLIST"] = "BLACKLIST";
    ENUM_MODEL["GROUP"] = "GROUP";
    ENUM_MODEL["SETTING"] = "SETTING";
    ENUM_MODEL["SESSION"] = "SESSION";
    ENUM_MODEL["ATTRIBUTE"] = "ATTRIBUTE";
    ENUM_MODEL["ATTRIBUTE_CAST"] = "ATTRIBUTE_CAST";
    ENUM_MODEL["ATTRIBUTE_CAST_PROFESSION"] = "ATTRIBUTE_CAST_PROFESSION";
    ENUM_MODEL["ATTRIBUTE_CATEGORY"] = "ATTRIBUTE_CATEGORY";
    ENUM_MODEL["ATTRIBUTE_HASHTAG"] = "ATTRIBUTE_HASHTAG";
    ENUM_MODEL["ATTRIBUTE_PLATFORM"] = "ATTRIBUTE_PLATFORM";
    ENUM_MODEL["ATTRIBUTE_SPONSORSHIP_FORM"] = "ATTRIBUTE_SPONSORSHIP_FORM";
    ENUM_MODEL["ATTRIBUTE_BUDGET_RANGE"] = "ATTRIBUTE_BUDGET_RANGE";
    ENUM_MODEL["ATTRIBUTE_SPONSORSHIP_BENEFIT"] = "ATTRIBUTE_SPONSORSHIP_BENEFIT";
})(ENUM_MODEL || (exports.ENUM_MODEL = ENUM_MODEL = {}));


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ACTION = exports.PERMISSION = void 0;
var PERMISSION;
(function (PERMISSION) {
    PERMISSION["CREATE_ACCOUNT"] = "ACCOUNT.CREATE";
    PERMISSION["UPDATE_ACCOUNT"] = "ACCOUNT.UPDATE";
    PERMISSION["VIEW_ACCOUNT"] = "ACCOUNT.VIEW";
    PERMISSION["REPORT_ACCOUNT"] = "ACCOUNT.REPORT";
    PERMISSION["VIEW_SPONSOR"] = "SPONSOR.VIEW";
    PERMISSION["APPROVE_SPONSOR"] = "SPONSOR.APPROVE";
    PERMISSION["UPDATE_SPONSOR"] = "SPONSOR.UPDATE";
    PERMISSION["REPORT_SPONSOR"] = "SPONSOR.REPORT";
    PERMISSION["CREATE_BLOG"] = "BLOG.CREATE";
    PERMISSION["UPDATE_BLOG"] = "BLOG.UPDATE";
    PERMISSION["VIEW_BLOG"] = "BLOG.VIEW";
    PERMISSION["CREATE_GROUP"] = "GROUP.CREATE";
    PERMISSION["UPDATE_GROUP"] = "GROUP.UPDATE";
    PERMISSION["VIEW_GROUP"] = "GROUP.VIEW";
})(PERMISSION || (exports.PERMISSION = PERMISSION = {}));
var ACTION;
(function (ACTION) {
    ACTION["CREATE"] = "CREATE";
    ACTION["UPDATE"] = "UPDATE";
    ACTION["VIEW"] = "VIEW";
    ACTION["APPROVE"] = "APPROVE";
    ACTION["REPORT"] = "REPORT";
})(ACTION || (exports.ACTION = ACTION = {}));


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SUB_PAYLOAD_ERROR = exports.DATA_TYPE = exports.PERMISSION_ACTION = exports.COMPARE_ALLOWED_FIELDS = exports.ERROR = exports.PAYLOAD_ERROR = exports.PAYLOAD_PROPERTY = void 0;
var PAYLOAD_PROPERTY;
(function (PAYLOAD_PROPERTY) {
    PAYLOAD_PROPERTY["phone"] = "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i";
    PAYLOAD_PROPERTY["first_name"] = "T\u00EAn ng\u01B0\u1EDDi d\u00F9ng";
    PAYLOAD_PROPERTY["last_name"] = "H\u1ECD ng\u01B0\u1EDDi d\u00F9ng";
    PAYLOAD_PROPERTY["email"] = "Email";
    PAYLOAD_PROPERTY["resource"] = "T\u00E0i nguy\u00EAn";
    PAYLOAD_PROPERTY["per_page"] = "Ph\u00E2n trang";
    PAYLOAD_PROPERTY["page"] = "S\u1ED1 trang";
    PAYLOAD_PROPERTY["system"] = "H\u1EC7 th\u1ED1ng";
    PAYLOAD_PROPERTY["password"] = "M\u1EADt kh\u1EA9u";
    PAYLOAD_PROPERTY["company"] = "C\u00F4ng ty";
    PAYLOAD_PROPERTY["role"] = "Ch\u1EE9c v\u1EE5";
    PAYLOAD_PROPERTY["role_id"] = "Ch\u1EE9c v\u1EE5";
    PAYLOAD_PROPERTY["request_type"] = "Lo\u1EA1i request";
    PAYLOAD_PROPERTY["verify_type"] = "Lo\u1EA1i verify";
    PAYLOAD_PROPERTY["contact_phone"] = "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i li\u00EAn h\u1EC7";
    PAYLOAD_PROPERTY["business_type_id"] = "ID H\u1EC7 th\u1ED1ng";
    PAYLOAD_PROPERTY["business_type_client_id"] = "ID client h\u1EC7 th\u1ED1ng";
    PAYLOAD_PROPERTY["business_type_organization_id"] = "ID c\u00F4ng ty h\u1EC7 th\u1ED1ng";
    PAYLOAD_PROPERTY["is_app"] = "Portal/app";
    PAYLOAD_PROPERTY["records"] = "Danh s\u00E1ch migrate";
    PAYLOAD_PROPERTY["role_code"] = "M\u00E3 vai tr\u00F2";
    PAYLOAD_PROPERTY["gender"] = "Gi\u1EDBi t\u00EDnh";
    PAYLOAD_PROPERTY["value"] = "Gi\u00E1 tr\u1ECB";
    PAYLOAD_PROPERTY["permissions"] = "Quy\u1EC1n";
    PAYLOAD_PROPERTY["sponsor_name"] = "T\u00EAn Ch\u01B0\u01A1ng Tr\u00ECnh";
    PAYLOAD_PROPERTY["cover_image"] = "Cover image";
    PAYLOAD_PROPERTY["banner_image"] = "Banner image";
    PAYLOAD_PROPERTY["product_limited_is_limit"] = "Tr\u1EA1ng th\u00E1i h\u1EA1n ch\u1EBF ng\u00E0nh h\u00E0ng";
    PAYLOAD_PROPERTY["product_limited_description"] = "M\u00F4 t\u1EA3 h\u1EA1n ch\u1EBF ng\u00E0nh h\u00E0ng";
    PAYLOAD_PROPERTY["start_date"] = "Th\u1EDDi gian b\u1EAFt \u0111\u1EA7u";
    PAYLOAD_PROPERTY["end_date"] = "Th\u1EDDi gian k\u1EBFt th\u00FAc";
    PAYLOAD_PROPERTY["sponsorship_expiration_date"] = "Th\u1EDDi gian h\u1EBFt h\u1EA1n t\u00E0i tr\u1EE3";
    PAYLOAD_PROPERTY["display_status"] = "Tr\u1EA1ng th\u00E1i hi\u1EC3n th\u1ECB";
    PAYLOAD_PROPERTY["sponsorship_status"] = "Tr\u1EA1ng th\u00E1i tr\u00E0i tr\u1EE3";
    PAYLOAD_PROPERTY["production_status"] = "Tr\u1EA1ng th\u00E1i s\u1EA3n xu\u1EA5t";
    PAYLOAD_PROPERTY["short_description"] = "M\u00F4 t\u1EA3 ng\u1EAFn";
    PAYLOAD_PROPERTY["detailed_description"] = "M\u00F4 t\u1EA3 chi ti\u1EBFt";
    PAYLOAD_PROPERTY["introduction_images"] = "H\u00ECnh \u1EA3nh gi\u1EDBi thi\u1EC7u";
    PAYLOAD_PROPERTY["sponsor_hashtags"] = "Tags";
    PAYLOAD_PROPERTY["casts"] = "Ng\u01B0\u1EDDi n\u1ED5i ti\u1EBFng, KOL tham gia";
    PAYLOAD_PROPERTY["sponsor_categories"] = "Th\u1EC3 lo\u1EA1i ch\u01B0\u01A1ng tr\u00ECnh";
    PAYLOAD_PROPERTY["platforms"] = "Danh s\u00E1ch n\u1EC1n t\u1EA3ng";
    PAYLOAD_PROPERTY["sponsorship_forms"] = "H\u00ECnh th\u1EE9c t\u00E0i tr\u1EE3";
    PAYLOAD_PROPERTY["sponsorship_packages"] = "Gi\u00E1 tr\u1ECB g\u00F3i t\u00E0i tr\u1EE3";
    PAYLOAD_PROPERTY["sponsor_schedulers"] = "L\u1ECBch tr\u00ECnh ch\u01B0\u01A1ng tr\u00ECnh";
    PAYLOAD_PROPERTY["sponsor_kpi"] = "KPI d\u1EF1 ki\u1EBFn";
    PAYLOAD_PROPERTY["reason_rejected"] = "L\u00FD do Admin t\u1EEB ch\u1ED1i duy\u1EC7t";
    PAYLOAD_PROPERTY["priority"] = "\u0110\u1ED9 \u01B0u ti\u00EAn hi\u1EC3n th\u1ECB";
    PAYLOAD_PROPERTY["platform"] = "N\u1EC1n t\u1EA3ng";
    PAYLOAD_PROPERTY["link"] = "N\u1EC1n t\u1EA3ng (link)";
    PAYLOAD_PROPERTY["sponsorship_form"] = "H\u00ECnh th\u1EE9c t\u00E0i tr\u1EE3";
    PAYLOAD_PROPERTY["media"] = "H\u00ECnh th\u1EE9c t\u00E0i tr\u1EE3 (H\u00ECnh \u1EA3nh demo)";
    PAYLOAD_PROPERTY["package_name"] = "T\u00EAn g\u00F3i t\u00E0i tr\u1EE3";
    PAYLOAD_PROPERTY["package_unit"] = "\u0110\u01A1n v\u1ECB g\u00F3i t\u00E0i tr\u1EE3";
    PAYLOAD_PROPERTY["package_value"] = "Gi\u00E1 tr\u1ECB g\u00F3i t\u00E0i tr\u1EE3";
    PAYLOAD_PROPERTY["status"] = "Tr\u1EA1ng th\u00E1i t\u00E0i tr\u01A1 c\u1EE7a g\u00F3i t\u00E0i tr\u1EE3";
})(PAYLOAD_PROPERTY || (exports.PAYLOAD_PROPERTY = PAYLOAD_PROPERTY = {}));
var PAYLOAD_ERROR;
(function (PAYLOAD_ERROR) {
    PAYLOAD_ERROR["isString"] = "ph\u1EA3i l\u00E0 ki\u1EC3u d\u1EEF li\u1EC7u chu\u1ED7i!";
    PAYLOAD_ERROR["isNotEmpty"] = "l\u00E0 b\u1EAFt bu\u1ED9c!";
    PAYLOAD_ERROR["arrayNotEmpty"] = "l\u00E0 b\u1EAFt bu\u1ED9c!";
    PAYLOAD_ERROR["isArray"] = "ph\u1EA3i l\u00E0 m\u1EA3ng";
    PAYLOAD_ERROR["nestedValidation"] = "ph\u1EA7n t\u1EED d\u1EEF li\u1EC7u trong m\u1EA3ng kh\u00F4ng h\u1EE3p l\u1EC7!";
    PAYLOAD_ERROR["minLength"] = "t\u1ED1i thi\u1EC3u";
    PAYLOAD_ERROR["maxLength"] = "t\u1ED1i \u0111a";
    PAYLOAD_ERROR["isEmail"] = "kh\u00F4ng \u0111\u00FAng \u0111\u1ECBnh d\u1EA1ng!";
    PAYLOAD_ERROR["isMongoId"] = "kh\u00F4ng \u0111\u00FAng \u0111\u1ECBnh d\u1EA1ng ID!";
    PAYLOAD_ERROR["isNumber"] = "ph\u1EA3i l\u00E0 ki\u1EC3u d\u1EEF li\u1EC7u s\u1ED1";
    PAYLOAD_ERROR["atLeastUpperCase"] = "t\u1ED1i thi\u1EC3u 1 ch\u1EEF hoa!";
    PAYLOAD_ERROR["atLeastLowerCase"] = "t\u1ED1i thi\u1EC3u 1 ch\u1EEF th\u01B0\u1EDDng!";
    PAYLOAD_ERROR["atLeastSpecialCharater"] = "t\u1ED1i thi\u1EC3u 1 k\u00ED t\u1EF1 \u0111\u1EB7c bi\u1EC7t!";
    PAYLOAD_ERROR["atLeastNumber"] = "t\u1ED1i thi\u1EC3u 1 k\u00ED t\u1EF1 s\u1ED1";
    PAYLOAD_ERROR["verifyConfirmPassword"] = "kh\u00F4ng kh\u1EDBp v\u1EDBi m\u1EADt kh\u1EA9u!";
    PAYLOAD_ERROR["isEnum"] = "kh\u00F4ng thu\u1ED9c \u0111\u1ECBnh d\u1EA1ng h\u1EE3p l\u1EC7";
    PAYLOAD_ERROR["businessTypeSettingKeyValues"] = "kh\u00F4ng \u0111\u00FAng \u0111\u1ECBnh d\u1EA1ng";
})(PAYLOAD_ERROR || (exports.PAYLOAD_ERROR = PAYLOAD_ERROR = {}));
var ERROR;
(function (ERROR) {
    ERROR["MIN_LENGTH"] = "minLength";
    ERROR["MAX_LENGTH"] = "maxLength";
})(ERROR || (exports.ERROR = ERROR = {}));
var COMPARE_ALLOWED_FIELDS;
(function (COMPARE_ALLOWED_FIELDS) {
    COMPARE_ALLOWED_FIELDS["UPDATE_STATUS"] = "status";
    COMPARE_ALLOWED_FIELDS["SYSTEM"] = "name,admin_url,base_url,description,name,root_url,redirect_uri";
    COMPARE_ALLOWED_FIELDS["COMPANY"] = "name,third_party_company_code,contact_phone";
    COMPARE_ALLOWED_FIELDS["SCOPE"] = "description";
    COMPARE_ALLOWED_FIELDS["ROLE"] = "name,mapping_code,reference_system";
    COMPARE_ALLOWED_FIELDS["USER"] = "email,first_name,last_name,avatar";
    COMPARE_ALLOWED_FIELDS["MENU"] = "name,parent_menu,code";
})(COMPARE_ALLOWED_FIELDS || (exports.COMPARE_ALLOWED_FIELDS = COMPARE_ALLOWED_FIELDS = {}));
var PERMISSION_ACTION;
(function (PERMISSION_ACTION) {
    PERMISSION_ACTION["CREATE"] = "CREATE";
    PERMISSION_ACTION["UPDATE"] = "UPDATE";
    PERMISSION_ACTION["DELETE"] = "DELETE";
})(PERMISSION_ACTION || (exports.PERMISSION_ACTION = PERMISSION_ACTION = {}));
var DATA_TYPE;
(function (DATA_TYPE) {
    DATA_TYPE["NUMBER"] = "number";
    DATA_TYPE["BOOLEAN"] = "boolean";
    DATA_TYPE["OBJECT"] = "object";
})(DATA_TYPE || (exports.DATA_TYPE = DATA_TYPE = {}));
var SUB_PAYLOAD_ERROR;
(function (SUB_PAYLOAD_ERROR) {
    SUB_PAYLOAD_ERROR["isValidEmail"] = "Mail kh\u00F4ng h\u1EE3p l\u1EC7";
    SUB_PAYLOAD_ERROR["isValidPhoneNumber"] = "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i kh\u00F4ng h\u1EE3p l\u1EC7";
    SUB_PAYLOAD_ERROR["notValidatePhoneNumberLength"] = "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i t\u1ED1i thi\u1EC3u 10 t\u1ED1i \u0111a 12 s\u1ED1";
    SUB_PAYLOAD_ERROR["notValidatePhoneNumberOrEmail"] = "Mail / S\u1ED1 \u0111i\u1EC7n tho\u1EA1i kh\u00F4ng h\u1EE3p l\u1EC7!";
})(SUB_PAYLOAD_ERROR || (exports.SUB_PAYLOAD_ERROR = SUB_PAYLOAD_ERROR = {}));


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ENUM_REDIS_TYPE = exports.ENUM_REDIS_FUNCTION_KEY = void 0;
var ENUM_REDIS_FUNCTION_KEY;
(function (ENUM_REDIS_FUNCTION_KEY) {
    ENUM_REDIS_FUNCTION_KEY["SETTING"] = "SETTING";
    ENUM_REDIS_FUNCTION_KEY["USER_PROFILE"] = "USER_PROFILE";
    ENUM_REDIS_FUNCTION_KEY["MASTER_DATA"] = "MASTER_DATA";
    ENUM_REDIS_FUNCTION_KEY["ROLE"] = "ROLE";
})(ENUM_REDIS_FUNCTION_KEY || (exports.ENUM_REDIS_FUNCTION_KEY = ENUM_REDIS_FUNCTION_KEY = {}));
var ENUM_REDIS_TYPE;
(function (ENUM_REDIS_TYPE) {
    ENUM_REDIS_TYPE["GET"] = "GET";
    ENUM_REDIS_TYPE["SET"] = "SET";
    ENUM_REDIS_TYPE["DELETE"] = "DELETE";
})(ENUM_REDIS_TYPE || (exports.ENUM_REDIS_TYPE = ENUM_REDIS_TYPE = {}));


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.POPULATE = exports.COLLECTION = exports.ACCOUNT_TYPE = exports.GENDER = void 0;
var GENDER;
(function (GENDER) {
    GENDER["MALE"] = "MALE";
    GENDER["FEMALE"] = "FEMALE";
    GENDER["NO_MENTION"] = "NO_MENTION";
})(GENDER || (exports.GENDER = GENDER = {}));
var ACCOUNT_TYPE;
(function (ACCOUNT_TYPE) {
    ACCOUNT_TYPE["ADMIN"] = "ADMIN";
    ACCOUNT_TYPE["PUBLISHER"] = "PUBLISHER";
    ACCOUNT_TYPE["CLIENT"] = "CLIENT";
})(ACCOUNT_TYPE || (exports.ACCOUNT_TYPE = ACCOUNT_TYPE = {}));
var COLLECTION;
(function (COLLECTION) {
    COLLECTION["USER"] = "users";
    COLLECTION["SPONSOR"] = "sponsors";
    COLLECTION["MASTER_DATA"] = "master_datas";
    COLLECTION["GROUP"] = "groups";
    COLLECTION["SETTING"] = "settings";
    COLLECTION["ATTRIBUTE_CAST"] = "attribute_casts";
    COLLECTION["ATTRIBUTE_CAST_PROFESSION"] = "attribute_cast_professions";
    COLLECTION["ATTRIBUTE_CATEGORY"] = "attribute_categories";
    COLLECTION["ATTRIBUTE_HASHTAG"] = "attribute_hashtags";
    COLLECTION["ATTRIBUTE_PLATFORM"] = "attribute_platforms";
    COLLECTION["ATTRIBUTE_SPONSORSHIP_BENEFIT"] = "attribute_sponsorship_benefits";
    COLLECTION["ATTRIBUTE_SPONSORSHIP_FORM"] = "attribute_sponsorship_forms";
    COLLECTION["ATTRIBUTE_BUDGET_RANGE"] = "attribute_budget_ranges";
    COLLECTION["BLACKLIST"] = "blacklist";
    COLLECTION["SESSION"] = "sessions";
    COLLECTION["SPONSOR_LOG"] = "sponsor_logs";
})(COLLECTION || (exports.COLLECTION = COLLECTION = {}));
var POPULATE;
(function (POPULATE) {
    POPULATE["USER"] = "username email type";
    POPULATE["GROUP"] = "type description name";
})(POPULATE || (exports.POPULATE = POPULATE = {}));


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TYPE_MONGODB = void 0;
exports.TYPE_MONGODB = {
    MISSING: {
        KEY: 'missing',
        NUMBER: 0,
    },
    STRING: {
        KEY: 'string',
        NUMBER: 2,
    },
    DOUBLE: {
        KEY: 'double',
        NUMBER: 1,
    },
    INTERGER_32_BIT: {
        KEY: 'int',
        NUMBER: 16,
    },
    INTERGER_64_BIT: {
        KEY: 'long',
        NUMBER: 18,
    },
    DECIMAL_128: {
        KEY: 'decimal',
        NUMBER: 10,
    },
    BOOLEAN: {
        KEY: 'bool',
        NUMBER: 8,
    },
    DATE: {
        KEY: 'date',
        NUMBER: 9,
    },
    TIMESTAMP: {
        KEY: 'timestamp',
        NUMBER: 17,
    },
    OBJECT: {
        KEY: 'object',
        NUMBER: 3,
    },
    ARRAY: {
        KEY: 'array',
        NUMBER: 4,
    },
    OBJECTID: {
        KEY: 'objectId',
        NUMBER: 7,
    },
    NULL: {
        KEY: 'null',
        NUMBER: 10,
    },
    REGULAR_EXPRESSION: {
        KEY: 'regex',
        NUMBER: 11,
    },
    BINARY_DATA: {
        KEY: 'binData',
        NUMBER: 5,
    },
    JAVASCRIPT: {
        KEY: 'javascript',
        NUMBER: 13,
    },
    MIN_KEY: {
        KEY: 'minKey',
        NUMBER: -1,
    },
    MAX_KEY: {
        KEY: 'maxKey',
        NUMBER: 127,
    },
};


/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseOkResponseDTO = exports.BaseServerErrorResponseDTO = exports.BaseUnauthorizedResponseDTO = exports.BaseForbiddenResponseDTO = exports.BaseQueryFilterDTO = void 0;
exports.SwaggerResponseDTO = SwaggerResponseDTO;
const swagger_1 = __webpack_require__(3);
const class_validator_1 = __webpack_require__(7);
const boolean_transform_1 = __webpack_require__(26);
const common_1 = __webpack_require__(28);
class BaseQueryFilterDTO {
}
exports.BaseQueryFilterDTO = BaseQueryFilterDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, boolean_transform_1.ToBoolean)(),
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        example: 1,
        required: false,
        description: 'Cho phép phân trang (default = 1)',
    }),
    __metadata("design:type", Boolean)
], BaseQueryFilterDTO.prototype, "is_paging", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        type: Number,
        example: 20,
        required: false,
        description: 'Số dòng mỗi trang',
    }),
    __metadata("design:type", Number)
], BaseQueryFilterDTO.prototype, "per_page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        type: Number,
        example: 1,
        required: false,
        description: 'Trang hiện tại',
    }),
    __metadata("design:type", Number)
], BaseQueryFilterDTO.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 'ACTIVE',
        description: 'Trạng thái',
        enum: ['ACTIVE'],
    }),
    __metadata("design:type", String)
], BaseQueryFilterDTO.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        description: 'Tìm kiếm theo từ khóa',
        example: 'string',
    }),
    __metadata("design:type", String)
], BaseQueryFilterDTO.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        example: 'code,name',
        required: false,
        description: 'Trường hợp select box, chỉ trả về những field select',
    }),
    __metadata("design:type", String)
], BaseQueryFilterDTO.prototype, "select_fields", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        example: '5f9b8d8dd0afd399bbf328a1',
        description: '_id',
    }),
    __metadata("design:type", Object)
], BaseQueryFilterDTO.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        example: 'name, code',
        description: 'Tên cần sắp xếp: name, code',
    }),
    __metadata("design:type", String)
], BaseQueryFilterDTO.prototype, "sort_name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        example: 'ascend, descend',
        description: 'Loại sắp xếp ascend, descend',
    }),
    __metadata("design:type", String)
], BaseQueryFilterDTO.prototype, "sort_type", void 0);
function SwaggerResponseDTO(statusCode, message) {
    class Error {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'Mã code HTTP',
            example: statusCode,
            required: true,
        }),
        __metadata("design:type", Number)
    ], Error.prototype, "statusCode", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: message,
            description: 'Mô tả API',
            required: true,
        }),
        __metadata("design:type", String)
    ], Error.prototype, "message", void 0);
    return Error;
}
class BaseForbiddenResponseDTO extends SwaggerResponseDTO(common_1.HttpStatus.FORBIDDEN, 'Truy cập bị từ chối!.') {
}
exports.BaseForbiddenResponseDTO = BaseForbiddenResponseDTO;
class BaseUnauthorizedResponseDTO extends SwaggerResponseDTO(common_1.HttpStatus.UNAUTHORIZED, 'Xác thực không hợp lệ!.') {
}
exports.BaseUnauthorizedResponseDTO = BaseUnauthorizedResponseDTO;
class BaseServerErrorResponseDTO extends SwaggerResponseDTO(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Đã xảy ra lỗi của hệ thống. Vui lòng liên hệ admin!.') {
}
exports.BaseServerErrorResponseDTO = BaseServerErrorResponseDTO;
class BaseOkResponseDTO extends SwaggerResponseDTO(common_1.HttpStatus.OK, '') {
}
exports.BaseOkResponseDTO = BaseOkResponseDTO;


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ToBoolean = ToBoolean;
const class_transformer_1 = __webpack_require__(27);
const class_validator_1 = __webpack_require__(7);
function ToBoolean() {
    return (0, class_transformer_1.Transform)((value) => {
        let newData;
        if (typeof value === 'object')
            newData = value.value;
        else if (typeof value === 'string')
            newData = JSON.parse(value);
        switch (newData) {
            case 'true':
                return true;
                break;
            case true:
                return true;
                break;
            case '1':
                return true;
                break;
            case 1:
                return true;
                break;
            case '0':
                return false;
                break;
            case 0:
                return false;
                break;
            case 'false':
                return false;
                break;
            case false:
                return false;
                break;
            default:
                if ((0, class_validator_1.IsBoolean)(newData)) {
                    return Boolean(newData);
                }
                return newData;
                break;
        }
    });
}


/***/ }),
/* 27 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 28 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 29 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseUpdateStatusDTO = void 0;
const class_validator_1 = __webpack_require__(7);
const swagger_1 = __webpack_require__(3);
class BaseUpdateStatusDTO {
}
exports.BaseUpdateStatusDTO = BaseUpdateStatusDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(['ACTIVE', 'INACTIVE'], {
        message: '$constraint1',
    }),
    (0, swagger_1.ApiProperty)({
        example: 'ACTIVE',
        description: 'Trạng thái',
        required: true,
        enum: ['ACTIVE', 'INACTIVE'],
    }),
    __metadata("design:type", String)
], BaseUpdateStatusDTO.prototype, "status", void 0);


/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseUpdateDTO = void 0;
const class_validator_1 = __webpack_require__(7);
const swagger_1 = __webpack_require__(3);
class BaseUpdateDTO {
}
exports.BaseUpdateDTO = BaseUpdateDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        description: 'id',
    }),
    __metadata("design:type", String)
], BaseUpdateDTO.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        description: 'Mã',
    }),
    __metadata("design:type", String)
], BaseUpdateDTO.prototype, "code", void 0);


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidationFormDTO = void 0;
class ValidationFormDTO {
}
exports.ValidationFormDTO = ValidationFormDTO;


/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(33), exports);
__exportStar(__webpack_require__(37), exports);
__exportStar(__webpack_require__(60), exports);
__exportStar(__webpack_require__(63), exports);
__exportStar(__webpack_require__(68), exports);
__exportStar(__webpack_require__(74), exports);
__exportStar(__webpack_require__(83), exports);
__exportStar(__webpack_require__(87), exports);
__exportStar(__webpack_require__(94), exports);
__exportStar(__webpack_require__(97), exports);
__exportStar(__webpack_require__(104), exports);
__exportStar(__webpack_require__(107), exports);
__exportStar(__webpack_require__(111), exports);
__exportStar(__webpack_require__(116), exports);
__exportStar(__webpack_require__(46), exports);
__exportStar(__webpack_require__(117), exports);
__exportStar(__webpack_require__(120), exports);
__exportStar(__webpack_require__(83), exports);


/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(34), exports);


/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BullDynamicModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BullDynamicModule = void 0;
const bull_1 = __webpack_require__(35);
const common_1 = __webpack_require__(28);
const config_1 = __webpack_require__(36);
let BullDynamicModule = BullDynamicModule_1 = class BullDynamicModule {
    static forRootAsync({ configKey }) {
        return {
            module: BullDynamicModule_1,
            imports: [
                bull_1.BullModule.forRootAsync(configKey, {
                    useFactory: (configService) => ({
                        redis: {
                            host: configService.get('REDIS_HOST') ?? 'localhost',
                            port: Number(configService.get('REDIS_PORT')) ?? 6379,
                            password: configService.get('REDIS_PASSWORD') ?? undefined,
                        },
                    }),
                    inject: [config_1.ConfigService],
                }),
            ],
            exports: [bull_1.BullModule],
        };
    }
    static registerQueue(options) { }
};
exports.BullDynamicModule = BullDynamicModule;
exports.BullDynamicModule = BullDynamicModule = BullDynamicModule_1 = __decorate([
    (0, common_1.Module)({})
], BullDynamicModule);


/***/ }),
/* 35 */
/***/ ((module) => {

module.exports = require("@nestjs/bull");

/***/ }),
/* 36 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(38), exports);
__exportStar(__webpack_require__(42), exports);
__exportStar(__webpack_require__(57), exports);
__exportStar(__webpack_require__(58), exports);


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CacheDynamicModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheDynamicModule = void 0;
const common_1 = __webpack_require__(28);
const cache_manager_1 = __webpack_require__(39);
const config_1 = __webpack_require__(36);
const redisStore = __webpack_require__(40);
const redis_config_1 = __webpack_require__(41);
const cache_service_1 = __webpack_require__(42);
let CacheDynamicModule = CacheDynamicModule_1 = class CacheDynamicModule {
    static register(isGlobal = true, ttl = 3600) {
        return {
            module: CacheDynamicModule_1,
            imports: [
                cache_manager_1.CacheModule.registerAsync({
                    imports: [config_1.ConfigModule.forRoot({ load: [redis_config_1.default] })],
                    isGlobal,
                    useFactory: (configService) => ({
                        store: redisStore,
                        url: configService.get('redis.url'),
                        password: configService.get('redis.password') ?? undefined,
                        ttl,
                    }),
                    inject: [config_1.ConfigService],
                }),
            ],
        };
    }
};
exports.CacheDynamicModule = CacheDynamicModule;
exports.CacheDynamicModule = CacheDynamicModule = CacheDynamicModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [cache_service_1.CacheService],
        exports: [cache_service_1.CacheService],
    })
], CacheDynamicModule);


/***/ }),
/* 39 */
/***/ ((module) => {

module.exports = require("@nestjs/cache-manager");

/***/ }),
/* 40 */
/***/ ((module) => {

module.exports = require("cache-manager-redis-store");

/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(36);
exports["default"] = (0, config_1.registerAs)('redis', () => ({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    password: process.env.REDIS_PASSWORD,
}));


/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CacheService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheService = void 0;
const common_1 = __webpack_require__(28);
const cache_manager_1 = __webpack_require__(43);
const cache_manager_2 = __webpack_require__(39);
const lodash = __webpack_require__(44);
const key_patterns_constant_1 = __webpack_require__(45);
const utils_1 = __webpack_require__(46);
let CacheService = CacheService_1 = class CacheService {
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
        this.logger = new common_1.Logger(CacheService_1.name);
    }
    onModuleInit() {
        this.client = this.cacheManager;
    }
    async get(key) {
        return this.cacheManager.get(key);
    }
    async mGet(...args) {
        const mGetData = await this.cacheManager.store.mget(...args.flat(1));
        return mGetData.reduce((prevVal, curVal, i) => {
            prevVal[args.flat(1)[i]] = (0, utils_1.isJsonString)(curVal)
                ? JSON.parse(curVal)
                : curVal;
            return prevVal;
        }, {});
    }
    async set(key, value, options) {
        this.logger.log('************ CacheSet ***************');
        return await this.cacheManager.set(key, value, options);
    }
    async mSet(mData, ttl = 3600) {
        const mSetValue = this.mSetValue(mData);
        return await this.cacheManager.store.mset(mSetValue);
    }
    async keys(...args) {
        return this.cacheManager.store.keys(...args.flat(1));
    }
    async del(key) {
        return this.cacheManager.del(key);
    }
    mSetValue(mData) {
        if ((0, utils_1.typeOf)(mData) === 'array') {
            const mDataConvert = mData.map((item) => {
                const [key] = lodash.keys(item);
                const value = JSON.stringify(item[key]);
                return { [key]: value };
            });
            return mDataConvert.flatMap(Object.entries).flat(1);
        }
        return Object.entries(mData).reduce((result, [key, val]) => {
            result.push(key);
            result.push(JSON.stringify(val));
            return result;
        }, []);
    }
    async handleToQueueIncreaseActionCacheErrorCount(command, model_name, code, functionName) {
        const cacheKey = key_patterns_constant_1.REDIS_KEY_PATTERNS.ACTION.ERRORS_COUNT(command, model_name, code, functionName);
        const data = await this.cacheManager.get(cacheKey);
        const errorCount = (0, utils_1.convertValueToNumber)(data?.count) + 1;
        await this.cacheManager.set(cacheKey, { count: errorCount }, 900);
        return errorCount;
    }
    async handleCleanRelatedActionCacheToQueue(command, model_name, code, functionName) {
        const cacheKey = key_patterns_constant_1.REDIS_KEY_PATTERNS.ACTION.ERRORS_COUNT(command, model_name, code, functionName);
        await this.cacheManager.del(cacheKey);
    }
    async timeoutSet(key, value, ttlSec, msTimeout) {
        return Promise.race([
            this.set(key, value, { ttl: ttlSec }),
            new Promise((_, reject) => setTimeout(() => {
                reject('SET REDIS TIMEOUT');
            }, msTimeout)),
        ]);
    }
    async timeoutGet(key, msTimeout) {
        const cachedValue = Promise.race([
            this.get(key),
            new Promise((_, reject) => setTimeout(() => {
                return reject(`GET REDIS TIMEOUT - KEY ${key}`);
            }, msTimeout)),
        ]);
        if (typeof cachedValue === 'string') {
            return JSON.parse(cachedValue);
        }
        return cachedValue;
    }
    async getKeysByKeyword(keyword) {
        const now = Date.now();
        this.logger.log(`************ Cache Get Keys With Keyword: ${keyword}***************`);
        const value = await this.cacheManager.store.keys(keyword);
        this.logger.log(`************ Cache Get Keys With Keyword After: ${Date.now() - now}ms***************`);
        return value;
    }
};
exports.CacheService = CacheService;
exports.CacheService = CacheService = CacheService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_2.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeof (_a = typeof cache_manager_1.Cache !== "undefined" && cache_manager_1.Cache) === "function" ? _a : Object])
], CacheService);


/***/ }),
/* 43 */
/***/ ((module) => {

module.exports = require("cache-manager");

/***/ }),
/* 44 */
/***/ ((module) => {

module.exports = require("lodash");

/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.REDIS_KEY_PATTERNS = void 0;
const enums_1 = __webpack_require__(8);
const DELIMITER = ':';
const concatSubKey = (...args) => [prefixKey, ...args].filter(Boolean).join(DELIMITER);
const prefixKey = enums_1.REDIS_NAME_ENUM.SPONSOR_REDIS.toLowerCase();
exports.REDIS_KEY_PATTERNS = {
    ACTION: {
        ERRORS_COUNT: (command, model_name, code, functionName) => [prefixKey, model_name, 'ERRORS_COUNT', command, code, functionName].join(':'),
    },
    BLACKLIST: (token) => [prefixKey, enums_1.REDIS_NAME_ENUM.BLACKLIST, token].join(':'),
    ACCOUNT: {
        EMAIL_PASSWORD: (id, timestamp) => timestamp
            ? [prefixKey, id, 'UPDATE_PASSWORD', timestamp].join(':')
            : [prefixKey, id, 'UPDATE_PASSWORD'].join(':'),
    },
};


/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(47), exports);
__exportStar(__webpack_require__(49), exports);
__exportStar(__webpack_require__(10), exports);
__exportStar(__webpack_require__(53), exports);
__exportStar(__webpack_require__(51), exports);
__exportStar(__webpack_require__(54), exports);
__exportStar(__webpack_require__(55), exports);


/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Cryptography = void 0;
const common_1 = __webpack_require__(1);
const common_2 = __webpack_require__(28);
const config_1 = __webpack_require__(36);
const crypto = __webpack_require__(48);
let Cryptography = class Cryptography {
    constructor(configService) {
        this.configService = configService;
    }
    genRandomString(length) {
        return crypto
            .randomBytes(Math.ceil(+length / 2))
            .toString('hex')
            .slice(0, length);
    }
    encodeBase64(str) {
        return Buffer.from(str, 'utf8').toString('base64');
    }
    decodeBase64(buffer) {
        return Buffer.from(buffer, 'base64').toString('utf8');
    }
    getStringValue(data) {
        if (typeof data === 'number' || data instanceof Number) {
            return data.toString();
        }
        if (!Buffer.isBuffer(data) && typeof data !== 'string') {
            throw new TypeError('Data for password or salt must be a string or a buffer');
        }
        return data;
    }
    saltHashString(password) {
        const salt = this.genRandomString(32);
        return this.sha512(this.getStringValue(password), salt);
    }
    desaltHashString(password, salt) {
        const hash = crypto.createHmac('sha512', this.getStringValue(this.decodeBase64(salt)));
        hash.update(this.getStringValue(password));
        return this.encodeBase64(hash.digest('hex'));
    }
    sha512(str, _secretKey) {
        const hash = crypto.createHmac('sha512', this.getStringValue(_secretKey));
        hash.update(this.getStringValue(str));
        const hashedData = hash.digest('hex');
        return {
            secretKey: this.encodeBase64(_secretKey),
            hashedData: this.encodeBase64(hashedData),
        };
    }
    isPublicKeyMatching(publicKey, configPrivateKey = 'MERCHANT_CLIENT_PRIVATE_KEY', configSecretKey = 'MERCHANT_CLIENT_SECRET_KEY') {
        const privateKey = this.configService.get(configPrivateKey);
        const secretKey = this.configService.get(configSecretKey);
        const hashedPublicKey = this.desaltHashString(publicKey, privateKey);
        if (hashedPublicKey === secretKey)
            return true;
        return false;
    }
    hashSaltPassword(password) {
        const salt = common_1.Common.genRandomString(10).toString();
        const hash = crypto.createHmac('sha512', salt).update(password);
        const hashedPassword = hash.digest('hex');
        return { hashedPassword, salt };
    }
    deHashSaltPassword(password, salt) {
        return crypto.createHmac('sha512', salt).update(password).digest('hex');
    }
    encryptOrDecryptData(data, isEncrypt = true) {
        const ivKey = this.configService.get(common_1.ENVIROMENT_VARIABLE.IV_KEY);
        const saltKey = this.configService.get(common_1.ENVIROMENT_VARIABLE.SALT_KEY);
        const ivBuffer = Buffer.from(ivKey, 'base64');
        const saltBuffer = Buffer.from(saltKey, 'base64');
        if (isEncrypt) {
            const cipher = crypto.createCipheriv('aes-256-ctr', saltBuffer, ivBuffer);
            return Buffer.concat([cipher.update(data), cipher.final()]).toString('base64');
        }
        else {
            const decipher = crypto.createDecipheriv('aes-256-ctr', saltBuffer, ivBuffer);
            return Buffer.concat([
                decipher.update(Buffer.from(data, 'base64')),
                decipher.final(),
            ]).toString('utf8');
        }
    }
};
exports.Cryptography = Cryptography;
exports.Cryptography = Cryptography = __decorate([
    (0, common_2.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], Cryptography);


/***/ }),
/* 48 */
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertMillisecondsToHours = exports.kpiDateTime = exports.endOfToday = exports.startOfToday = exports.now = exports.formatDateYMDHM = exports.formatDateYMD = exports.ISO8601Formats = exports.formatDate = exports.toDate = exports.fromDate = exports.nowDate = exports.dateFromNow = exports.tomorrow = exports.yesterday = exports.start30Day = exports.start14Day = exports.start7Day = exports.beforeThirtyDays = exports.previousDaysFromNow = exports.endOfWeek = exports.startOfWeek = exports.endOfLastMonth = exports.startOfLastMonth = exports.endOfMonth = exports.startOfMonth = exports.endOfDay = exports.startOfDay = exports.today = exports.dateTimeFormatByLocale = exports.longDateFormatWithoutSecondByLocale = exports.longDateFormatByLocale = exports.checkValidTimestamp = exports.formatTime = exports.formatDateTime = exports.day = exports.month = exports.year = exports.formatMySQLTimeStamp = exports.dateFormatDM_hm = exports.dateFormatDM_hms = exports.dateFormat_hms24h = exports.dateFormatDMY_hms24h = exports.dateFormatYMD_hms24h = exports.dateFormatYMD_hmsA = exports.dateFormatDMY_hm = exports.dateFormatYMD_hm = exports.dateFormatYMD_hms = exports.dateFormatDMY = exports.dateFormatYMD = void 0;
exports.targetFromSourceDate = exports.dateDiff = exports.toDay = exports.toMonth = exports.toYear = exports.CURRENT = exports.formatHoursToHHMM = exports.convertSecondsToHours = void 0;
const moment = __webpack_require__(50);
const functions_util_1 = __webpack_require__(51);
exports.dateFormatYMD = 'YYYY-MM-DD';
exports.dateFormatDMY = 'DD-MM-YYYY';
exports.dateFormatYMD_hms = 'YYYY-MM-DD HH:mm:ss';
exports.dateFormatYMD_hm = 'YYYY-MM-DD hh:mm';
exports.dateFormatDMY_hm = 'DD-MM-YYYY hh:mm';
exports.dateFormatYMD_hmsA = 'YYYY-MM-DD hh:mm:ss a';
exports.dateFormatYMD_hms24h = 'YYYY-MM-DD HH:mm:ss';
exports.dateFormatDMY_hms24h = 'DD-MM-YYYY HH:mm:ss';
exports.dateFormat_hms24h = 'HH:mm:ss';
exports.dateFormatDM_hms = 'DD/MM hh:mm:ss';
exports.dateFormatDM_hm = 'DD/MM hh:mm';
const formatMySQLTimeStamp = (timestamp = new Date()) => moment(timestamp).format(exports.dateFormatYMD_hms);
exports.formatMySQLTimeStamp = formatMySQLTimeStamp;
const year = (timestamp) => new Date(timestamp).getFullYear();
exports.year = year;
const month = (timestamp) => new Date(timestamp).getMonth() + 1;
exports.month = month;
const day = (timestamp) => new Date(timestamp).getDate();
exports.day = day;
const formatDateTime = (timestamp = new Date(), formatType = exports.dateFormatYMD) => timestamp && (0, exports.checkValidTimestamp)(timestamp)
    ? moment(timestamp).format(formatType)
    : null;
exports.formatDateTime = formatDateTime;
const formatTime = (timestamp = new Date()) => moment(timestamp).format('HH:mm:ss');
exports.formatTime = formatTime;
const checkValidTimestamp = (timestamp) => moment(timestamp).isValid();
exports.checkValidTimestamp = checkValidTimestamp;
const longDateFormatByLocale = (timestamp = new Date(), locale = 'vi') => {
    moment.locale(locale);
    return moment(timestamp).format(exports.dateFormatDMY_hms24h);
};
exports.longDateFormatByLocale = longDateFormatByLocale;
const longDateFormatWithoutSecondByLocale = (timestamp = new Date(), locale = 'vi') => {
    moment.locale(locale);
    return moment(timestamp).format(exports.dateFormatDMY_hm);
};
exports.longDateFormatWithoutSecondByLocale = longDateFormatWithoutSecondByLocale;
const dateTimeFormatByLocale = (timestamp = new Date(), locale = 'vi') => {
    moment.locale(locale);
    return moment(timestamp).format(exports.dateFormatDMY);
};
exports.dateTimeFormatByLocale = dateTimeFormatByLocale;
const today = (dateFormat = exports.dateFormatYMD) => moment().format(dateFormat);
exports.today = today;
const startOfDay = (date = new Date()) => new Date(moment(date).startOf('day').format(exports.dateFormatYMD_hms24h));
exports.startOfDay = startOfDay;
const endOfDay = (date = new Date()) => new Date(moment(date).endOf('day').format(exports.dateFormatYMD_hms24h));
exports.endOfDay = endOfDay;
const startOfMonth = (dateTime = new Date(), dateFormat = exports.dateFormatYMD_hms24h) => new Date(moment(dateTime).startOf('month').format(dateFormat));
exports.startOfMonth = startOfMonth;
const endOfMonth = (dateTime, dateFormat = exports.dateFormatYMD_hms24h) => new Date(moment(dateTime).endOf('month').format(dateFormat));
exports.endOfMonth = endOfMonth;
const startOfLastMonth = (dateFormat) => moment()
    .subtract(1, 'months')
    .startOf('month')
    .format(dateFormat ? dateFormat : exports.dateFormatYMD);
exports.startOfLastMonth = startOfLastMonth;
const endOfLastMonth = (dateFormat) => moment()
    .subtract(1, 'months')
    .endOf('month')
    .format(dateFormat ? dateFormat : exports.dateFormatYMD);
exports.endOfLastMonth = endOfLastMonth;
const startOfWeek = (dateFormat) => moment()
    .startOf('week')
    .format(dateFormat ? dateFormat : exports.dateFormatYMD);
exports.startOfWeek = startOfWeek;
const endOfWeek = (dateFormat) => moment()
    .endOf('week')
    .format(dateFormat ? dateFormat : exports.dateFormatYMD);
exports.endOfWeek = endOfWeek;
const previousDaysFromNow = (prevDay, dateFormat = exports.dateFormatYMD) => moment().subtract(prevDay, 'days').format(dateFormat);
exports.previousDaysFromNow = previousDaysFromNow;
const beforeThirtyDays = (dateFormat) => moment()
    .subtract(30, 'days')
    .format(dateFormat ? dateFormat : exports.dateFormatYMD);
exports.beforeThirtyDays = beforeThirtyDays;
const start7Day = (dateFormat) => moment()
    .subtract(7, 'days')
    .format(dateFormat ? dateFormat : exports.dateFormatYMD);
exports.start7Day = start7Day;
const start14Day = (dateFormat) => moment()
    .subtract(14, 'days')
    .format(dateFormat ? dateFormat : exports.dateFormatYMD);
exports.start14Day = start14Day;
const start30Day = (dateFormat) => moment()
    .subtract(30, 'days')
    .format(dateFormat ? dateFormat : exports.dateFormatYMD);
exports.start30Day = start30Day;
const yesterday = (dateFormat = exports.dateFormatYMD) => new Date(moment().subtract(1, 'days').format(dateFormat));
exports.yesterday = yesterday;
const tomorrow = (dateFormat) => moment()
    .add(1, 'days')
    .format(dateFormat ? dateFormat : exports.dateFormatYMD);
exports.tomorrow = tomorrow;
const dateFromNow = (numberOfDays, dateFormat) => moment()
    .add(numberOfDays, 'days')
    .format(dateFormat ? dateFormat : exports.dateFormatYMD);
exports.dateFromNow = dateFromNow;
const nowDate = (dateFormat) => moment().format(dateFormat ? dateFormat : exports.dateFormatYMD);
exports.nowDate = nowDate;
const fromDate = (dateFormat) => moment(exports.beforeThirtyDays, dateFormat ? dateFormat : exports.dateFormatYMD);
exports.fromDate = fromDate;
const toDate = (dateFormat) => moment(exports.nowDate, dateFormat ? dateFormat : exports.dateFormatYMD);
exports.toDate = toDate;
const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
};
const formatDate = (date) => {
    return ([
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-') +
        ' ' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join(':'));
};
exports.formatDate = formatDate;
const ISO8601Formats = (timestamp) => moment(new Date(timestamp)).format(exports.dateFormatYMD_hms24h);
exports.ISO8601Formats = ISO8601Formats;
const formatDateYMD = (timestamp) => moment(new Date(timestamp)).format(exports.dateFormatYMD);
exports.formatDateYMD = formatDateYMD;
const formatDateYMDHM = (timestamp) => moment(new Date(timestamp)).format(exports.dateFormatYMD_hm);
exports.formatDateYMDHM = formatDateYMDHM;
exports.now = moment();
exports.startOfToday = exports.now.startOf('day').toString();
exports.endOfToday = exports.now.endOf('day').toString();
exports.kpiDateTime = {
    toDay: new Date().getDate(),
    currentMonth: new Date().getMonth() + 1,
    currentYear: new Date().getFullYear(),
};
const convertMillisecondsToHours = (milliseconds) => milliseconds / 60 / 60 / 1000;
exports.convertMillisecondsToHours = convertMillisecondsToHours;
const convertSecondsToHours = (seconds) => seconds / 60 / 60;
exports.convertSecondsToHours = convertSecondsToHours;
const formatHoursToHHMM = (hours) => {
    const parseHour = Math.floor(hours);
    const parseMinute = (0, functions_util_1.convertValueToNumber)((hours % parseHour) * 60, 0);
    return `${parseHour} giờ ${parseMinute} phút`;
};
exports.formatHoursToHHMM = formatHoursToHHMM;
const CURRENT = (timeType) => {
    switch (timeType) {
        case 'DAY':
            return new Date().getDate();
        case 'MONTH':
            return new Date().getMonth() + 1;
        case 'YEAR':
            return new Date().getFullYear();
        case 'FULLTIME':
            return new Date();
    }
};
exports.CURRENT = CURRENT;
const toYear = (dateTime) => new Date(dateTime).getFullYear();
exports.toYear = toYear;
const toMonth = (dateTime) => new Date(dateTime).getMonth() + 1;
exports.toMonth = toMonth;
const toDay = (dateTime) => new Date(dateTime).getDate();
exports.toDay = toDay;
const dateDiff = (date1, date2) => new Date(date1).getTime() - new Date(date2).getTime();
exports.dateDiff = dateDiff;
const targetFromSourceDate = (duration, sourceDate = new Date(), operator = 'add', unit = 'day') => moment(sourceDate)[operator](duration, unit).toDate();
exports.targetFromSourceDate = targetFromSourceDate;


/***/ }),
/* 50 */
/***/ ((module) => {

module.exports = require("moment");

/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.splitIntoChunkData = exports.mergeArrays = exports.calcPercentage = exports.getIdField = exports.debounce = exports.pullItemsFromArray = exports.convertDataToArray = exports.convertArrayToObject = exports.hasItemInArray = exports.pushItemsToUniqArray = exports.isJsonString = exports.hasMultipleConditionInArrayObject = exports.itemIndexInMultipleConditionArrayObject = exports.setUniqueListObjectId = exports.convertValueToNumber = exports.formatNumberAsCurrency = exports.toMongoObjectId = exports.replacer = exports.typeOf = exports.returnDataList = exports.$getMetadataAggregate = exports.getMetaData = void 0;
exports.getPageSkipLimit = getPageSkipLimit;
const common_1 = __webpack_require__(1);
const lodash = __webpack_require__(44);
const mongoose_1 = __webpack_require__(52);
function getPageSkipLimit(params) {
    let { page, per_page, is_paging } = params;
    is_paging = common_1.Common.valueToBoolean(is_paging);
    page = Number(page) || 1;
    const limit = common_1.Common.valueToBoolean(is_paging) === false
        ? Number.MAX_SAFE_INTEGER
        : Math.min(Number(per_page) || 10, 100);
    const skip = (page - 1) * limit;
    return { page, skip, limit };
}
const getMetaData = (currentPage, limit, totalItems) => ({
    limit: Number(limit),
    currentPage: Number(currentPage),
    totalItems: Number(totalItems),
    totalPages: Number(totalItems) % Number(limit) == 0
        ? Number(totalItems) / Number(limit)
        : Math.ceil(Number(totalItems) / Number(limit)),
});
exports.getMetaData = getMetaData;
const $getMetadataAggregate = (currentPage, limit, $totalItems) => ({
    perPage: Number(limit),
    currentPage: Number(currentPage),
    totalItems: $totalItems,
    totalPages: {
        $cond: [
            { $eq: [{ $mod: [$totalItems, limit] }, 0] },
            { $divide: [$totalItems, limit] },
            { $ceil: { $divide: [$totalItems, limit] } },
        ],
    },
});
exports.$getMetadataAggregate = $getMetadataAggregate;
const returnDataList = ({ data, count, page, limit, }) => ({
    data,
    meta: (0, exports.getMetaData)(page, limit, count),
});
exports.returnDataList = returnDataList;
const typeOf = (value) => Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
exports.typeOf = typeOf;
const replacer = (key, value) => {
    if ((0, exports.typeOf)(value) === 'regexp')
        return value?.toString();
    return value;
};
exports.replacer = replacer;
const toMongoObjectId = (id) => {
    try {
        return new mongoose_1.default.Types.ObjectId(id);
    }
    catch (error) {
        return id;
    }
};
exports.toMongoObjectId = toMongoObjectId;
const formatNumberAsCurrency = (number, suffix = '', signal = ',', locale = 'vn-VI') => {
    const convertToNumber = (0, exports.convertValueToNumber)(number);
    return (0, exports.typeOf)(number === 'number')
        ? `${Intl.NumberFormat(locale)
            .format(convertToNumber)
            .toString()}${suffix}`
            .trim()
            .replace(/,/g, signal)
        : `${String(convertToNumber)}${suffix}`;
};
exports.formatNumberAsCurrency = formatNumberAsCurrency;
const convertValueToNumber = (value, decimal = 2) => {
    return isNaN(Number(value)) ? 0 : +Number(value).toFixed(decimal);
};
exports.convertValueToNumber = convertValueToNumber;
const setUniqueListObjectId = (list, id) => lodash
    .uniq([...list, (0, exports.toMongoObjectId)(id)].map(String))
    .map((item) => (0, exports.toMongoObjectId)(item));
exports.setUniqueListObjectId = setUniqueListObjectId;
const itemIndexInMultipleConditionArrayObject = (list, fields) => list.findIndex((item) => Object.entries(fields).every(([key, val]) => String(item[key]) === String(val)));
exports.itemIndexInMultipleConditionArrayObject = itemIndexInMultipleConditionArrayObject;
const hasMultipleConditionInArrayObject = (list, fields) => (0, exports.itemIndexInMultipleConditionArrayObject)(list, fields) > -1;
exports.hasMultipleConditionInArrayObject = hasMultipleConditionInArrayObject;
const isJsonString = (value) => {
    try {
        JSON.parse(value);
    }
    catch (e) {
        return false;
    }
    return true;
};
exports.isJsonString = isJsonString;
const pushItemsToUniqArray = (list, items, mapType = 'String') => {
    return lodash
        .uniq((list || [])
        .map(String)
        .concat((0, exports.typeOf)(items) === 'array' ? [...items.map(String)] : String(items)))
        .map((item) => {
        switch (mapType) {
            case 'ObjectId':
                return (0, exports.toMongoObjectId)(item);
            case 'Number':
                return Number(item);
            case 'Boolean':
                return !!item;
            default:
                return String(item);
        }
    });
};
exports.pushItemsToUniqArray = pushItemsToUniqArray;
const hasItemInArray = (list, item, listField) => (list || []).some((listItem) => listField
    ? String(listItem[listField]) === String(item)
    : String(listItem) === String(item));
exports.hasItemInArray = hasItemInArray;
const convertArrayToObject = (arr, key) => {
    return arr.reduce((obj, ele) => {
        const valueByKey = ele[key];
        obj[valueByKey] = ele;
        return obj;
    }, {});
};
exports.convertArrayToObject = convertArrayToObject;
const convertDataToArray = (data) => (0, exports.typeOf)(data) === 'array' ? data : [data].filter(Boolean);
exports.convertDataToArray = convertDataToArray;
const pullItemsFromArray = (list, items, objectKey) => {
    const itemList = (0, exports.convertDataToArray)(items);
    return list.filter((ele) => !itemList.some((item) => (0, exports.typeOf)(ele) === 'object' && objectKey
        ? String(ele[objectKey]) === String(item)
        : String(item) === String(ele)));
};
exports.pullItemsFromArray = pullItemsFromArray;
const debounce = (milliseconds = 3000) => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(true);
    }, milliseconds);
});
exports.debounce = debounce;
const getIdField = (fieldName) => fieldName?._id || fieldName;
exports.getIdField = getIdField;
const calcPercentage = (numerator, denominator, digits = 2) => (0, exports.convertValueToNumber)(Math.min((0, exports.convertValueToNumber)(numerator) /
    ((0, exports.convertValueToNumber)(denominator) || 1), 1) * 100, digits);
exports.calcPercentage = calcPercentage;
const mergeArrays = (...arrs) => [...new Set(arrs.flat(1))];
exports.mergeArrays = mergeArrays;
const splitIntoChunkData = (data, concurrently = 5) => lodash.chunk(data, concurrently);
exports.splitIntoChunkData = splitIntoChunkData;
function initPublicKey(key) {
    return '-----BEGIN CERTIFICATE-----\n' + key + '\n-----END CERTIFICATE-----';
}


/***/ }),
/* 52 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.$uniqArray = exports.$cond = exports._fillDollarSign = exports.$sizeOfArray = exports.$multiply = exports.$divide = exports.$round = exports.$flatTwoDimensionArray = exports.$isMissingCondition = exports.$concatTwoDimensionArray = exports.$firstItem = exports.$ifMissingThen = exports.$IfNullThen = exports.getMetadataAggregate = exports.LookupManyToOne = exports.LookupOneToMany = exports.LookupOneToOne = void 0;
const functions_util_1 = __webpack_require__(51);
const LookupOneToOne = ({ from, localField, project, extraPipelineStage = [], foreignField = '_id', as = undefined, }) => {
    const alias = as ?? localField;
    return [
        {
            $lookup: {
                from,
                let: { refId: { $toObjectId: `$${localField}` } },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ['$$refId', { $toObjectId: '$' + `${foreignField}` }],
                            },
                        },
                    },
                    ...extraPipelineStage,
                    project && { $project: project },
                ].filter(Boolean),
                as: alias,
            },
        },
        {
            $set: {
                [alias]: {
                    $ifNull: [
                        {
                            $arrayElemAt: [`$${alias}`, 0],
                        },
                        null,
                    ],
                },
            },
        },
    ];
};
exports.LookupOneToOne = LookupOneToOne;
const LookupOneToMany = ({ from, localField, project, extraPipelineStage = [], foreignField = '_id', $matchOperator = '$eq', as = undefined, }) => {
    const alias = as ?? localField;
    return [
        {
            $lookup: {
                from,
                let: { refId: `$${localField}` },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                [$matchOperator]: ['$$refId', '$' + `${foreignField}`],
                            },
                        },
                    },
                    ...extraPipelineStage,
                    project && { $project: project },
                ].filter(Boolean),
                as: alias,
            },
        },
    ];
};
exports.LookupOneToMany = LookupOneToMany;
const LookupManyToOne = ({ from, localField, project, extraPipelineStage = [], foreignField = '_id', $matchOperator = '$in', as = undefined, }) => {
    const alias = as ?? localField;
    return [
        {
            $lookup: {
                from,
                let: { refIds: `$${localField}` },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                [$matchOperator]: ['$' + `${foreignField}`, '$$refId'],
                            },
                        },
                    },
                    ...extraPipelineStage,
                    project && { $project: project },
                ].filter(Boolean),
                as: alias,
            },
        },
    ];
};
exports.LookupManyToOne = LookupManyToOne;
const getMetadataAggregate = (page, limit) => {
    return [
        {
            $count: 'count',
        },
        {
            $addFields: (0, functions_util_1.$getMetadataAggregate)(page, limit, '$count'),
        },
        {
            $unset: ['count'],
        },
    ];
};
exports.getMetadataAggregate = getMetadataAggregate;
const $IfNullThen = ($field, $default = 0) => ({
    $ifNull: [$field, $default],
});
exports.$IfNullThen = $IfNullThen;
const $ifMissingThen = ($field, $value, $default = $field) => ({
    $cond: [(0, exports.$isMissingCondition)($field), $value, $default],
});
exports.$ifMissingThen = $ifMissingThen;
const $firstItem = ($field) => ({
    $arrayElemAt: [$field, 0],
});
exports.$firstItem = $firstItem;
const $concatTwoDimensionArray = ($field) => ({
    $reduce: {
        input: $field,
        initialValue: [],
        in: {
            $concatArrays: ['$$value', '$$this'],
        },
    },
});
exports.$concatTwoDimensionArray = $concatTwoDimensionArray;
const $isMissingCondition = ($field) => ({
    $or: [
        { $in: [$field, [null, undefined, [], {}, NaN]] },
        { $eq: [{ $type: $field }, 'missing'] },
    ],
});
exports.$isMissingCondition = $isMissingCondition;
const $flatTwoDimensionArray = ($field) => ({
    $addFields: {
        [$field.replace('$', '')]: {
            $reduce: {
                input: (0, exports._fillDollarSign)($field),
                initialValue: [],
                in: {
                    $concatArrays: [
                        '$$value',
                        { $cond: [{ $isArray: '$$this' }, '$$this', ['$$this']] },
                    ],
                },
            },
        },
    },
});
exports.$flatTwoDimensionArray = $flatTwoDimensionArray;
const $round = ($field, decimal = 2) => ({
    $round: [(0, exports.$IfNullThen)($field, 0), decimal],
});
exports.$round = $round;
const $divide = ($divider, $dividend) => ({
    $divide: [
        (0, exports._fillDollarSign)($divider),
        {
            $cond: [
                { $eq: [(0, exports._fillDollarSign)($dividend), 0] },
                1,
                (0, exports._fillDollarSign)($dividend),
            ],
        },
    ],
});
exports.$divide = $divide;
const $multiply = (...$fields) => ({
    $multiply: $fields.flat(1),
});
exports.$multiply = $multiply;
const $sizeOfArray = ($field) => ({
    $size: (0, exports.$IfNullThen)((0, exports._fillDollarSign)($field), []),
});
exports.$sizeOfArray = $sizeOfArray;
const _fillDollarSign = ($field) => $field.startsWith('$') ? $field : `$${$field}`;
exports._fillDollarSign = _fillDollarSign;
const $cond = (condition, thenValue, elseValue) => ({
    $cond: [condition, thenValue, elseValue],
});
exports.$cond = $cond;
const $uniqArray = ($field, subField = '', getOnlySubField = true) => {
    const $property = [(0, exports._fillDollarSign)($field), getOnlySubField ? subField : '']
        .filter(Boolean)
        .join('.');
    return {
        $reduce: {
            input: $property,
            initialValue: [],
            in: {
                $concatArrays: [
                    '$$value',
                    (0, exports.$cond)({
                        $in: [
                            ['$$this', getOnlySubField ? '' : subField]
                                .filter(Boolean)
                                .join('.'),
                            ['$$value', getOnlySubField ? '' : subField]
                                .filter(Boolean)
                                .join('.'),
                        ],
                    }, [], ['$$this']),
                ],
            },
        },
    };
};
exports.$uniqArray = $uniqArray;


/***/ }),
/* 55 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(56), exports);


/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 57 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(45), exports);


/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(59), exports);


/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 60 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(61), exports);
__exportStar(__webpack_require__(62), exports);
__exportStar(__webpack_require__(41), exports);


/***/ }),
/* 61 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigDynamicModule = void 0;
const common_1 = __webpack_require__(28);
const config_1 = __webpack_require__(36);
const config_validation_1 = __webpack_require__(62);
const path = __webpack_require__(12);
let ConfigDynamicModule = class ConfigDynamicModule {
};
exports.ConfigDynamicModule = ConfigDynamicModule;
exports.ConfigDynamicModule = ConfigDynamicModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: [
                    path.resolve(`config/.env.${process.env.NODE_ENV || process.env.ENVIRONMENT}`),
                ],
                isGlobal: true,
                validate: config_validation_1.validate,
            }),
        ],
        exports: [],
        providers: [],
    })
], ConfigDynamicModule);


/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validate = validate;
const class_validator_1 = __webpack_require__(7);
const class_transformer_1 = __webpack_require__(27);
const enviroment_enum_1 = __webpack_require__(16);
class EnvironmentVariables {
}
__decorate([
    (0, class_validator_1.IsEnum)(enviroment_enum_1.ENVIROMENT),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_a = typeof enviroment_enum_1.ENVIROMENT !== "undefined" && enviroment_enum_1.ENVIROMENT) === "function" ? _a : Object)
], EnvironmentVariables.prototype, "ENVIRONMENT", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_b = typeof Boolean !== "undefined" && Boolean) === "function" ? _b : Object)
], EnvironmentVariables.prototype, "IS_DEBUG", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_c = typeof Number !== "undefined" && Number) === "function" ? _c : Object)
], EnvironmentVariables.prototype, "CLIENT_API_PORT", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_d = typeof Number !== "undefined" && Number) === "function" ? _d : Object)
], EnvironmentVariables.prototype, "ADMIN_API_PORT", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_e = typeof Number !== "undefined" && Number) === "function" ? _e : Object)
], EnvironmentVariables.prototype, "PUBLISHER_API_PORT", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_f = typeof Number !== "undefined" && Number) === "function" ? _f : Object)
], EnvironmentVariables.prototype, "SCHUDULER_API_PORT", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_g = typeof String !== "undefined" && String) === "function" ? _g : Object)
], EnvironmentVariables.prototype, "MONGO_URI", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_h = typeof String !== "undefined" && String) === "function" ? _h : Object)
], EnvironmentVariables.prototype, "MONGO_URI_READONLY", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_j = typeof Number !== "undefined" && Number) === "function" ? _j : Object)
], EnvironmentVariables.prototype, "ASYNC_POOL", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_k = typeof Number !== "undefined" && Number) === "function" ? _k : Object)
], EnvironmentVariables.prototype, "MAX_POOL_SIZE", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_l = typeof Number !== "undefined" && Number) === "function" ? _l : Object)
], EnvironmentVariables.prototype, "PROCESS_PER_ASYNC_POOL", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_m = typeof Number !== "undefined" && Number) === "function" ? _m : Object)
], EnvironmentVariables.prototype, "SERVER_REQUEST_TIMEMOUT", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_o = typeof Number !== "undefined" && Number) === "function" ? _o : Object)
], EnvironmentVariables.prototype, "SERVER_MONGO_SELECTION_TIMEMOUT", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_p = typeof Number !== "undefined" && Number) === "function" ? _p : Object)
], EnvironmentVariables.prototype, "SERVER_MONGO_CONNECT_TIMEOUT", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_q = typeof Number !== "undefined" && Number) === "function" ? _q : Object)
], EnvironmentVariables.prototype, "SERVER_MONGO_SOCKET_TIMEOUT", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_r = typeof String !== "undefined" && String) === "function" ? _r : Object)
], EnvironmentVariables.prototype, "REDIS_HOST", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_s = typeof Number !== "undefined" && Number) === "function" ? _s : Object)
], EnvironmentVariables.prototype, "REDIS_PORT", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_t = typeof String !== "undefined" && String) === "function" ? _t : Object)
], EnvironmentVariables.prototype, "REDIS_PASSWORD", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_u = typeof String !== "undefined" && String) === "function" ? _u : Object)
], EnvironmentVariables.prototype, "HOST_NAME", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enviroment_enum_1.LANGUAGE),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_v = typeof enviroment_enum_1.LANGUAGE !== "undefined" && enviroment_enum_1.LANGUAGE) === "function" ? _v : Object)
], EnvironmentVariables.prototype, "DEFAULT_LANGUAGE", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_w = typeof String !== "undefined" && String) === "function" ? _w : Object)
], EnvironmentVariables.prototype, "ADMIN_WEB_URL", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_x = typeof String !== "undefined" && String) === "function" ? _x : Object)
], EnvironmentVariables.prototype, "CLIENT_WEB_URL", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_y = typeof String !== "undefined" && String) === "function" ? _y : Object)
], EnvironmentVariables.prototype, "PUBLISHER_WEB_URL", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_z = typeof String !== "undefined" && String) === "function" ? _z : Object)
], EnvironmentVariables.prototype, "JWT_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_0 = typeof Number !== "undefined" && Number) === "function" ? _0 : Object)
], EnvironmentVariables.prototype, "JWT_REFRESH_TOKEN_EXPIRE", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_1 = typeof Number !== "undefined" && Number) === "function" ? _1 : Object)
], EnvironmentVariables.prototype, "JWT_ACCESS_TOKEN_EXPIRE", void 0);
function validate(config) {
    const validatingConfig = (0, class_transformer_1.plainToClass)(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = (0, class_validator_1.validateSync)(validatingConfig, {
        skipMissingProperties: false,
    });
    if (errors?.length) {
        const errorResponse = errors.map((element) => {
            return {
                property: element.property,
                messages: Object.values(element.constraints),
            };
        });
        throw new Error(JSON.stringify(errorResponse));
    }
    return validatingConfig;
}


/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(64), exports);
__exportStar(__webpack_require__(65), exports);
__exportStar(__webpack_require__(66), exports);


/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FunctionResponseLog = exports.FunctionRequestLog = exports.FunctionNameLog = void 0;
const common_1 = __webpack_require__(28);
const FunctionNameLog = (target, name, descriptor) => {
    try {
        const className = target.constructor.name;
        const original = descriptor.value;
        descriptor.value = function (...args) {
            common_1.Logger.log(``, `${className}#${name}`);
            const result = original.apply(this, args);
            return result;
        };
    }
    catch (error) {
        common_1.Logger.debug(error.message);
    }
};
exports.FunctionNameLog = FunctionNameLog;
const FunctionRequestLog = (target, name, descriptor) => {
    try {
        const className = target.constructor.name;
        const original = descriptor.value;
        descriptor.value = function (...args) {
            if (process.env.ENVIRONMENT != 'prod') {
                common_1.Logger.debug(`Request: ${JSON.stringify(args)}`, `${className}#${name}`);
            }
            else {
                common_1.Logger.log(``, `${className}#${name}`);
            }
            const result = original.apply(this, args);
            return result;
        };
    }
    catch (error) {
        common_1.Logger.debug(error.message);
    }
};
exports.FunctionRequestLog = FunctionRequestLog;
const FunctionResponseLog = (target, methodName, descriptor) => {
    const className = target.constructor.name;
    const original = descriptor.value;
    descriptor.value = new Proxy(original, {
        apply: function (target, thisArg, args) {
            common_1.Logger.log(`Call with args: ${JSON.stringify(args)}`, `${className}#${methodName}`);
            const result = target.apply(thisArg, args);
            common_1.Logger.log(`Return: ${JSON.stringify(result)}`, `${className}#${methodName}`);
            return result;
        },
    });
};
exports.FunctionResponseLog = FunctionResponseLog;


/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const common_1 = __webpack_require__(28);
exports.User = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});


/***/ }),
/* 66 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OnlyVerify = exports.RequirePermission = exports.Roles = exports.Unprotected = void 0;
const core_1 = __webpack_require__(67);
const common_1 = __webpack_require__(28);
exports.Unprotected = core_1.Reflector.createDecorator();
const Roles = (...roles) => (0, common_1.SetMetadata)('roles', roles);
exports.Roles = Roles;
const RequirePermission = (permission) => (0, common_1.SetMetadata)('permission', permission);
exports.RequirePermission = RequirePermission;
exports.OnlyVerify = core_1.Reflector.createDecorator();


/***/ }),
/* 67 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 68 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(69), exports);
__exportStar(__webpack_require__(70), exports);
__exportStar(__webpack_require__(73), exports);


/***/ }),
/* 69 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AllExceptionFilter = void 0;
exports.throwErrorMessage = throwErrorMessage;
const common_1 = __webpack_require__(28);
const nestjs_i18n_1 = __webpack_require__(4);
let AllExceptionFilter = class AllExceptionFilter {
    constructor(i18n) {
        this.i18n = i18n;
        this._logger = new common_1.Logger(this.constructor.name);
    }
    async catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx?.getResponse();
        const request = ctx.getRequest();
        const responseMessage = exception instanceof common_1.HttpException
            ? exception?.getResponse()
            : { message: exception.message, error_code: null };
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        this._logger.error(`UNHANDLED EXCEPTION ${JSON.stringify(exception?.getResponse?.() || exception)}`);
        if ([common_1.HttpStatus.FORBIDDEN, common_1.HttpStatus.UNAUTHORIZED]?.includes(status)) {
            response.status(status).json({
                status_code: status,
                message: await this.i18n.translate(`errors.status_code.${status}`),
                error_code: responseMessage.error_code,
            });
        }
        else {
            let error_code = responseMessage?.error_code || null;
            const i18nArgs = responseMessage?.i18nArgs || null;
            let translatedMessage = error_code
                ? await this.i18n.translate(`errors.${error_code}`, {
                    ...(i18nArgs && { args: i18nArgs }),
                })
                : responseMessage?.message || responseMessage;
            if (!translatedMessage) {
                translatedMessage = await this.i18n.translate('errors.system.error');
                error_code = 'system.error';
            }
            let responseData = {
                status_code: status,
                timestamp: Date.now(),
                path: request.url,
                message: translatedMessage,
                method: request.method,
                ...(error_code && { error_code }),
            };
            if (exception instanceof common_1.HttpException && exception?.cause) {
                responseData.response_code = exception.cause.toString();
            }
            this._logger.error(`UNHANDLED EXCEPTION ${JSON.stringify(responseData)}`);
            response.status(status).json(responseData);
        }
    }
};
exports.AllExceptionFilter = AllExceptionFilter;
exports.AllExceptionFilter = AllExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [typeof (_a = typeof nestjs_i18n_1.I18nService !== "undefined" && nestjs_i18n_1.I18nService) === "function" ? _a : Object])
], AllExceptionFilter);
function throwErrorMessage(exception = {}, status_code = common_1.HttpStatus.INTERNAL_SERVER_ERROR) {
    exception['error_code'] = exception?.error_code || 'system.error';
    exception['message'] =
        exception?.message ||
            'Đã xảy ra lỗi của hệ thống. Vui lòng liên hệ admin!.';
    throw new common_1.HttpException(exception, status_code);
}


/***/ }),
/* 70 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CatchRpcExceptionFilter = void 0;
const common_1 = __webpack_require__(28);
const microservices_1 = __webpack_require__(71);
const rxjs_1 = __webpack_require__(72);
let CatchRpcExceptionFilter = class CatchRpcExceptionFilter {
    catch(exception, host) {
        console.log('CatchRpcExceptionFilter');
        return (0, rxjs_1.throwError)(() => exception.getError());
    }
};
exports.CatchRpcExceptionFilter = CatchRpcExceptionFilter;
exports.CatchRpcExceptionFilter = CatchRpcExceptionFilter = __decorate([
    (0, common_1.Catch)(microservices_1.RpcException)
], CatchRpcExceptionFilter);


/***/ }),
/* 71 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 72 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),
/* 73 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UnauthorizedExceptionFilter = void 0;
const common_1 = __webpack_require__(28);
const nestjs_i18n_1 = __webpack_require__(4);
let UnauthorizedExceptionFilter = class UnauthorizedExceptionFilter {
    constructor(i18n) {
        this.i18n = i18n;
    }
    async catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        response.status(status).json({
            statusCode: status,
            message: await this.i18n.translate('errors.denied_access'),
        });
    }
};
exports.UnauthorizedExceptionFilter = UnauthorizedExceptionFilter;
exports.UnauthorizedExceptionFilter = UnauthorizedExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.UnauthorizedException),
    __metadata("design:paramtypes", [typeof (_a = typeof nestjs_i18n_1.I18nService !== "undefined" && nestjs_i18n_1.I18nService) === "function" ? _a : Object])
], UnauthorizedExceptionFilter);


/***/ }),
/* 74 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(75), exports);
__exportStar(__webpack_require__(82), exports);


/***/ }),
/* 75 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthGuard = void 0;
const common_1 = __webpack_require__(28);
const jwt_strategy_1 = __webpack_require__(76);
const core_1 = __webpack_require__(67);
const decorators_1 = __webpack_require__(63);
const common_2 = __webpack_require__(1);
const filters_1 = __webpack_require__(68);
const error_constant_1 = __webpack_require__(78);
const auth_strategy_1 = __webpack_require__(79);
let AuthGuard = class AuthGuard {
    constructor(jwtConfigService, reflector, authConfigStrategy) {
        this.jwtConfigService = jwtConfigService;
        this.reflector = reflector;
        this.authConfigStrategy = authConfigStrategy;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const unprotected = this.reflector.get(decorators_1.Unprotected, context.getHandler());
        if (!unprotected) {
            const requiredRoles = this.reflector.getAllAndOverride('roles', [context.getHandler(), context.getClass()]);
            const requiredPermission = this.reflector.getAllAndOverride('permission', [context.getHandler(), context.getClass()]);
            const response = (await this.jwtConfigService.validate(request?.headers?.authorization));
            const { is_revoked } = await this.authConfigStrategy.checkTokenStatus(request?.headers?.authorization);
            if (is_revoked) {
                (0, filters_1.throwErrorMessage)({ error_code: error_constant_1.ERROR_CODE.AUTH.UNAUTHORIZED }, common_1.HttpStatus.UNAUTHORIZED);
            }
            const onlyVerify = this.reflector.get(decorators_1.OnlyVerify, context.getHandler());
            if (!onlyVerify &&
                (!requiredRoles?.includes(response?.account_type) ||
                    (common_2.Common.compareValues(response.account_type, common_2.ACCOUNT_TYPE.ADMIN) &&
                        !this.checkActivePermission(requiredPermission, response?.permissions)))) {
                (0, filters_1.throwErrorMessage)({ error_code: error_constant_1.ERROR_CODE.AUTH.FORBIDDEN }, common_1.HttpStatus.FORBIDDEN);
            }
            request.user = response;
        }
        return true;
    }
    checkActivePermission(requiredPermissions, responsePermissions) {
        const is_active = requiredPermissions?.find((item) => responsePermissions?.includes(item));
        return !!is_active;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_strategy_1.JwtConfigStrategy !== "undefined" && jwt_strategy_1.JwtConfigStrategy) === "function" ? _a : Object, typeof (_b = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _b : Object, typeof (_c = typeof auth_strategy_1.AuthConfigStrategy !== "undefined" && auth_strategy_1.AuthConfigStrategy) === "function" ? _c : Object])
], AuthGuard);


/***/ }),
/* 76 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtConfigStrategy = void 0;
const common_1 = __webpack_require__(28);
const jwt_1 = __webpack_require__(77);
const jwt_enum_1 = __webpack_require__(17);
const filters_1 = __webpack_require__(68);
const error_constant_1 = __webpack_require__(78);
const config_1 = __webpack_require__(36);
const enviroment_enum_1 = __webpack_require__(16);
let JwtConfigStrategy = class JwtConfigStrategy {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async validate(token) {
        try {
            if (!token) {
                (0, filters_1.throwErrorMessage)({ error_code: error_constant_1.ERROR_CODE.AUTH.UNAUTHORIZED }, common_1.HttpStatus.UNAUTHORIZED);
            }
            return await this.jwtService.verify(this._initializeRequestToken(token));
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            if (error?.message) {
                switch (error.message) {
                    case jwt_enum_1.JWT_ERROR_MESSAGE.EXPIRED:
                    case jwt_enum_1.JWT_ERROR_MESSAGE.INVALID_TOKEN:
                    case jwt_enum_1.JWT_ERROR_MESSAGE.INVALID_PUBLIC_KEY:
                        (0, filters_1.throwErrorMessage)({ error_code: error_constant_1.ERROR_CODE.AUTH.UNAUTHORIZED }, common_1.HttpStatus.UNAUTHORIZED);
                }
            }
        }
    }
    async handleInitTokens(user) {
        const accessTokenPayload = {
            sub: user._id,
            username: user.username,
            email: user?.email || '',
            email_verified: false,
            account_type: user.type,
            typ: jwt_enum_1.TOKEN_TYPE.BEARER,
            permissions: user?.permissions,
        };
        const refreshTokenPayload = {
            sub: user._id,
            typ: jwt_enum_1.TOKEN_TYPE.REFRESH,
        };
        return {
            access_token: await this.jwtService.signAsync(accessTokenPayload),
            refresh_token: await this.jwtService.signAsync(refreshTokenPayload, {
                expiresIn: this.configService.get(enviroment_enum_1.ENVIROMENT_VARIABLE.JWT_REFRESH_TOKEN_EXPIRE),
            }),
        };
    }
    async handleRefreshToken(user) {
        const accessTokenPayload = {
            sub: user._id,
            username: user.username,
            email: user?.email || '',
            email_verified: false,
            account_type: user.type,
            typ: jwt_enum_1.TOKEN_TYPE.BEARER,
            permissions: user?.permissions,
        };
        return {
            access_token: await this.jwtService.signAsync(accessTokenPayload),
        };
    }
    _initializeRequestToken(authorization) {
        return authorization?.indexOf('Bearer') != -1
            ? authorization?.split(' ')[1]
            : authorization;
    }
};
exports.JwtConfigStrategy = JwtConfigStrategy;
exports.JwtConfigStrategy = JwtConfigStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], JwtConfigStrategy);


/***/ }),
/* 77 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ERROR_CODE = void 0;
exports.ERROR_CODE = {
    NOT_EXIST: 'not_exists',
    EXISTS: 'existed',
    AUTH: {
        UNAUTHORIZED: 'auth.unauthorized',
        FORBIDDEN: 'auth.forbidden',
        WRONG_PASSWORD: 'auth.wrong_password',
        NOT_ALLOWED: 'auth.not_allowed',
        SAME_PASSWORD: 'auth.update_same_password',
        EXPIRED_VERIFY_EMAIL_SESSION: 'auth.expired_verify_email_session',
    },
    USER: {
        NO_PERMISSIONS: 'user.no_permissions',
        SAME_EMAIL: 'user.same_email',
        DEACTIVATED: 'user.deactivated',
    },
    GROUP: {
        NOT_MATCH_USER: 'group.not_match_user',
    },
    SPONSOR: {
        END_DATE: {
            BEFORE_NOW: 'sponsor.end_date.before_now',
            AFTER_START_DATE: 'sponsor.end_date.after_start_date',
        },
        EXPIRATION_DATE: {
            BEFORE_END_DATE: 'sponsor.expiration_date.before_end_date',
            AFTER_START_DATE: 'sponsor.expiration_date.after_start_date',
        },
        DISPLAY_STATUS: {
            NOT_DRAFT: 'sponsor.display_status.not_draft',
            INVALID: 'sponsor.display_status.invalid',
        },
        PUBLISHER: {
            NOT_ALLOWED_CHANGE_STATUS: 'sponsor.publisher.not_allowed_change_status',
            NOT_ALLOWED_CHANGES: 'sponsor.publisher.not_allowed_changes',
        },
        EXPIRED: 'sponsor.expired',
    },
};


/***/ }),
/* 79 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthConfigStrategy_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthConfigStrategy = exports.CONNECTION_NAME = void 0;
const mongoose_1 = __webpack_require__(80);
const mongoose_2 = __webpack_require__(52);
const common_1 = __webpack_require__(28);
const blacklist_schema_1 = __webpack_require__(81);
const shared_1 = __webpack_require__(32);
var CONNECTION_NAME;
(function (CONNECTION_NAME) {
    CONNECTION_NAME["PRIMARY"] = "PRIMARY";
    CONNECTION_NAME["SECONDARY"] = "SECONDARY";
})(CONNECTION_NAME || (exports.CONNECTION_NAME = CONNECTION_NAME = {}));
let AuthConfigStrategy = AuthConfigStrategy_1 = class AuthConfigStrategy {
    constructor(blacklistModel, userModel, cacheService) {
        this.blacklistModel = blacklistModel;
        this.userModel = userModel;
        this.cacheService = cacheService;
        this.logger = new common_1.Logger(AuthConfigStrategy_1.name);
    }
    async checkTokenStatus(token) {
        const result = {
            is_revoked: false,
        };
        let cachedToken = false;
        token = this._initializeRequestToken(token);
        try {
            const cacheKey = shared_1.REDIS_KEY_PATTERNS.BLACKLIST(token);
            cachedToken = await this.cacheService.timeoutGet(cacheKey, 1000);
        }
        catch (error) {
            this.logger.error(`ERROR ON GET REDIS CACHED BLACKLIST ${error}`);
            const foundToken = (await this.blacklistModel.findOne({
                token,
            }));
            this.logger.log(`FIND TOKEN IN DB BLACKLIST`);
            result.is_revoked = !foundToken ? false : true;
            return result;
        }
        result.is_revoked = !cachedToken ? false : true;
        return result;
    }
    _initializeRequestToken(authorization) {
        return authorization?.indexOf('Bearer') != -1
            ? authorization?.split(' ')[1]
            : authorization;
    }
};
exports.AuthConfigStrategy = AuthConfigStrategy;
exports.AuthConfigStrategy = AuthConfigStrategy = AuthConfigStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(blacklist_schema_1.Blacklist.name, CONNECTION_NAME.PRIMARY)),
    __param(1, (0, mongoose_1.InjectModel)(blacklist_schema_1.Blacklist.name, CONNECTION_NAME.PRIMARY)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object, typeof (_c = typeof shared_1.CacheService !== "undefined" && shared_1.CacheService) === "function" ? _c : Object])
], AuthConfigStrategy);


/***/ }),
/* 80 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 81 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BlacklistSchema = exports.Blacklist = void 0;
const jwt_enum_1 = __webpack_require__(17);
const mongoose_1 = __webpack_require__(80);
let Blacklist = class Blacklist {
};
exports.Blacklist = Blacklist;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        index: true,
    }),
    __metadata("design:type", String)
], Blacklist.prototype, "token", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        default: Date.now,
        timezone: 'Asia/Ho_Chi_Minh',
        required: true,
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Blacklist.prototype, "expire_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: jwt_enum_1.TOKEN_TYPE,
        index: true,
    }),
    __metadata("design:type", typeof (_b = typeof jwt_enum_1.TOKEN_TYPE !== "undefined" && jwt_enum_1.TOKEN_TYPE) === "function" ? _b : Object)
], Blacklist.prototype, "type", void 0);
exports.Blacklist = Blacklist = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], Blacklist);
exports.BlacklistSchema = mongoose_1.SchemaFactory.createForClass(Blacklist);


/***/ }),
/* 82 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(28);
const core_1 = __webpack_require__(67);
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const roles = this.reflector.get('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return true;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ }),
/* 83 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(84), exports);
__exportStar(__webpack_require__(86), exports);


/***/ }),
/* 84 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(85), exports);


/***/ }),
/* 85 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 86 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var I18nDynamicModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.I18nDynamicModule = void 0;
const enviroment_enum_1 = __webpack_require__(16);
const common_1 = __webpack_require__(28);
const config_1 = __webpack_require__(36);
const nestjs_i18n_1 = __webpack_require__(4);
let I18nDynamicModule = I18nDynamicModule_1 = class I18nDynamicModule {
    static forRoot({ path, watch = true }) {
        return {
            module: I18nDynamicModule_1,
            imports: [
                nestjs_i18n_1.I18nModule.forRootAsync({
                    parser: nestjs_i18n_1.I18nJsonParser,
                    useFactory: (configService) => {
                        return {
                            fallbackLanguage: configService.get(enviroment_enum_1.ENVIROMENT_VARIABLE.DEFAULT_LANGUAGE),
                            parserOptions: {
                                path,
                                watch,
                            },
                        };
                    },
                    inject: [config_1.ConfigService],
                }),
            ],
        };
    }
};
exports.I18nDynamicModule = I18nDynamicModule;
exports.I18nDynamicModule = I18nDynamicModule = I18nDynamicModule_1 = __decorate([
    (0, common_1.Module)({})
], I18nDynamicModule);


/***/ }),
/* 87 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(88), exports);
__exportStar(__webpack_require__(89), exports);
__exportStar(__webpack_require__(91), exports);
__exportStar(__webpack_require__(92), exports);
__exportStar(__webpack_require__(93), exports);


/***/ }),
/* 88 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheInterceptor = void 0;
const common_1 = __webpack_require__(28);
const rxjs_1 = __webpack_require__(72);
let CacheInterceptor = class CacheInterceptor {
    intercept(context, next) {
        const isCached = true;
        if (isCached) {
            return (0, rxjs_1.of)([]);
        }
        return next.handle();
    }
};
exports.CacheInterceptor = CacheInterceptor;
exports.CacheInterceptor = CacheInterceptor = __decorate([
    (0, common_1.Injectable)()
], CacheInterceptor);


/***/ }),
/* 89 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorsInterceptor = void 0;
const common_1 = __webpack_require__(28);
const rxjs_1 = __webpack_require__(72);
const operators_1 = __webpack_require__(90);
let ErrorsInterceptor = class ErrorsInterceptor {
    intercept(context, next) {
        return next
            .handle()
            .pipe((0, operators_1.catchError)((err) => (0, rxjs_1.throwError)(new common_1.BadGatewayException())));
    }
};
exports.ErrorsInterceptor = ErrorsInterceptor;
exports.ErrorsInterceptor = ErrorsInterceptor = __decorate([
    (0, common_1.Injectable)()
], ErrorsInterceptor);


/***/ }),
/* 90 */
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),
/* 91 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggingInterceptor = void 0;
const common_1 = __webpack_require__(28);
const operators_1 = __webpack_require__(90);
let LoggingInterceptor = class LoggingInterceptor {
    constructor() { }
    intercept(context, next) {
        const { statusCode } = context.switchToHttp().getResponse();
        const logger = new common_1.Logger('HTTP');
        const req = context.switchToHttp().getRequest();
        return next.handle().pipe((0, operators_1.tap)((data) => {
            if (statusCode == common_1.HttpStatus.OK || statusCode == common_1.HttpStatus.CREATED) {
            }
            else {
                logger.error({
                    data,
                });
            }
            try {
                if (req.headers.date) {
                    const interval = Date.now() - Number(req.headers.date);
                    logger.log(`Response->After... ${interval}ms (request_id:${req.headers.request_id} | ${req.method + ':' + req.originalUrl}) `);
                    if (interval >= 30000) {
                    }
                }
            }
            catch (ex) {
                logger.error(ex);
            }
        }));
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LoggingInterceptor);


/***/ }),
/* 92 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TimeoutInterceptor = void 0;
const common_1 = __webpack_require__(28);
const rxjs_1 = __webpack_require__(72);
const operators_1 = __webpack_require__(90);
let TimeoutInterceptor = class TimeoutInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.timeout)(5000), (0, operators_1.catchError)((err) => {
            if (err instanceof rxjs_1.TimeoutError) {
                return (0, rxjs_1.throwError)(new common_1.RequestTimeoutException());
            }
            return (0, rxjs_1.throwError)(err);
        }));
    }
};
exports.TimeoutInterceptor = TimeoutInterceptor;
exports.TimeoutInterceptor = TimeoutInterceptor = __decorate([
    (0, common_1.Injectable)()
], TimeoutInterceptor);


/***/ }),
/* 93 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformInterceptor = void 0;
const common_1 = __webpack_require__(28);
const operators_1 = __webpack_require__(90);
let TransformInterceptor = class TransformInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => ({
            statusCode: context.switchToHttp().getResponse().statusCode,
            ...data,
        })));
    }
};
exports.TransformInterceptor = TransformInterceptor;
exports.TransformInterceptor = TransformInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformInterceptor);


/***/ }),
/* 94 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(95), exports);
__exportStar(__webpack_require__(96), exports);


/***/ }),
/* 95 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerModule = void 0;
const common_1 = __webpack_require__(28);
const logger_service_1 = __webpack_require__(96);
let LoggerModule = class LoggerModule {
};
exports.LoggerModule = LoggerModule;
exports.LoggerModule = LoggerModule = __decorate([
    (0, common_1.Module)({
        providers: [logger_service_1.LoggerService],
        exports: [logger_service_1.LoggerService],
    })
], LoggerModule);


/***/ }),
/* 96 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerService = void 0;
const common_1 = __webpack_require__(28);
let LoggerService = class LoggerService extends common_1.Logger {
    error(message, trace, context) {
        super.error(message, trace, context);
    }
    warn(message, context) {
        super.warn(message, context);
    }
    log(message, context) {
        super.log(message, context);
    }
    debug(message, context) {
        super.debug(message, context);
    }
    verbose(message, context) {
        super.verbose(message, context);
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT })
], LoggerService);


/***/ }),
/* 97 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(98), exports);
__exportStar(__webpack_require__(102), exports);


/***/ }),
/* 98 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(99), exports);
__exportStar(__webpack_require__(100), exports);
__exportStar(__webpack_require__(101), exports);


/***/ }),
/* 99 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SYNC_COMMAND = void 0;
exports.SYNC_COMMAND = {
    PING: 'PING',
    SEND_TELEGRAM_SYSTEM: 'SEND_TELEGRAM_SYSTEM',
    SET_SPONSOR_EXPIRED: 'SET_SPONSOR_EXPIRED',
};


/***/ }),
/* 100 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SERVICE_NAME = void 0;
var SERVICE_NAME;
(function (SERVICE_NAME) {
    SERVICE_NAME["ADMIN"] = "ADMIN";
    SERVICE_NAME["PUBLISHER"] = "PUBLISHER";
    SERVICE_NAME["CLIENT"] = "CLIENT";
    SERVICE_NAME["SCHEDULER"] = "SCHEDULER";
})(SERVICE_NAME || (exports.SERVICE_NAME = SERVICE_NAME = {}));


/***/ }),
/* 101 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QUEUES = void 0;
var QUEUES;
(function (QUEUES) {
    QUEUES["TELEGRAM"] = "TELEGRAM";
})(QUEUES || (exports.QUEUES = QUEUES = {}));


/***/ }),
/* 102 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(103), exports);


/***/ }),
/* 103 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TCPInterceptor = void 0;
const common_1 = __webpack_require__(28);
const mongoose_1 = __webpack_require__(52);
const _ = __webpack_require__(44);
let TCPInterceptor = class TCPInterceptor {
    intercept(context, next) {
        const rpcContext = context.switchToRpc();
        let { data } = rpcContext.getData();
        if (data) {
            data = this.convertQuery(data);
        }
        return next.handle();
    }
    convertQuery(data) {
        if (_.isObject(data)) {
            Object.entries(data).forEach(([key, value]) => {
                if (_.isObject(value) || _.isArray(value)) {
                    data[key] = this.convertQuery(value);
                }
                else if (typeof value === 'string' &&
                    value.length === 24 &&
                    mongoose_1.Types.ObjectId.isValid(value)) {
                    data[key] = new mongoose_1.Types.ObjectId(value);
                }
            });
        }
        else if (_.isArray(data)) {
            data.forEach((element, index) => {
                if (_.isObject(element) || _.isArray(element)) {
                    data[index] = this.convertQuery(element);
                }
                else if (typeof element === 'string' &&
                    element.length === 24 &&
                    mongoose_1.Types.ObjectId.isValid(element)) {
                    data[index] = new mongoose_1.Types.ObjectId(element);
                }
            });
        }
        return data;
    }
};
exports.TCPInterceptor = TCPInterceptor;
exports.TCPInterceptor = TCPInterceptor = __decorate([
    (0, common_1.Injectable)()
], TCPInterceptor);


/***/ }),
/* 104 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(105), exports);


/***/ }),
/* 105 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerMiddleware = void 0;
const common_1 = __webpack_require__(28);
const chalk = __webpack_require__(106);
let LoggerMiddleware = class LoggerMiddleware {
    constructor() {
        this.logger = new common_1.Logger('HTTP');
    }
    use(req, res, next) {
        try {
            const { method, originalUrl, httpVersion, ip, body, params, query } = req;
            const { statusCode, statusMessage } = res;
            req.headers.date = Date.now().toString();
            if (!req.headers.request_id) {
                req.headers.request_id = Math.floor(1000000000 + Math.random() * 9000000000).toString();
            }
            if (!query.request_id) {
                query.request_id = req.headers.request_id;
            }
            this.logger.log(`Request->Before... 0ms (request_id:${req.headers.request_id} | ${method + ':' + originalUrl}) `);
            const message = `${chalk.white('|')} ${chalk.cyan(httpVersion)} ${chalk.white('|')} ${chalk.cyan(ip)} ` +
                `${method} ${originalUrl} ${statusCode} ${statusMessage ?? ''}` +
                `[${chalk.white('body:', JSON.stringify(body))}]` +
                `[${chalk.white('params:', JSON.stringify(params))}]` +
                `[${chalk.white('query:', JSON.stringify(query))}]`;
            if (statusCode >= 500) {
                this.logger.error(message);
            }
            else if (statusCode >= 400) {
                this.logger.warn(message);
            }
            else {
                this.logger.log(message);
            }
        }
        catch (ex) {
            this.logger.error(ex);
        }
        next();
    }
};
exports.LoggerMiddleware = LoggerMiddleware;
exports.LoggerMiddleware = LoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoggerMiddleware);


/***/ }),
/* 106 */
/***/ ((module) => {

module.exports = require("chalk");

/***/ }),
/* 107 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(108), exports);
__exportStar(__webpack_require__(110), exports);


/***/ }),
/* 108 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(109), exports);


/***/ }),
/* 109 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 110 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MongooseDynamicModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MongooseDynamicModule = void 0;
const common_1 = __webpack_require__(28);
const config_1 = __webpack_require__(36);
const mongoose_1 = __webpack_require__(80);
const enviroment_enum_1 = __webpack_require__(16);
const enums_1 = __webpack_require__(8);
let MongooseDynamicModule = MongooseDynamicModule_1 = class MongooseDynamicModule {
    static registerAsync({ connectionName = enums_1.CONNECTION_NAME.PRIMARY, }) {
        return {
            module: MongooseDynamicModule_1,
            imports: [
                mongoose_1.MongooseModule.forRootAsync({
                    connectionName,
                    useFactory: (configService) => ({
                        uri: this.getMongooseUriByConnectionName(connectionName, configService),
                        maxPoolSize: configService.get(enviroment_enum_1.ENVIROMENT_VARIABLE.MAX_POOL_SIZE),
                        serverSelectionTimeoutMS: configService.get(enviroment_enum_1.ENVIROMENT_VARIABLE.SERVER_MONGO_SELECTION_TIMEMOUT),
                        connectTimeoutMS: configService.get(enviroment_enum_1.ENVIROMENT_VARIABLE.SERVER_MONGO_CONNECT_TIMEOUT),
                        socketTimeoutMS: configService.get(enviroment_enum_1.ENVIROMENT_VARIABLE.SERVER_MONGO_SOCKET_TIMEOUT),
                        family: 4,
                        retryAttempts: 5,
                    }),
                    inject: [config_1.ConfigService],
                }),
            ],
            exports: [mongoose_1.MongooseModule],
        };
    }
    static getMongooseUriByConnectionName(connectionName, configService) {
        switch (connectionName) {
            case enums_1.CONNECTION_NAME.PRIMARY:
                return configService.get(enviroment_enum_1.ENVIROMENT_VARIABLE.MONGO_URI);
            case enums_1.CONNECTION_NAME.SECONDARY:
                return configService.get(enviroment_enum_1.ENVIROMENT_VARIABLE.MONGO_URI_READONLY);
            default:
                return configService.get(enviroment_enum_1.ENVIROMENT_VARIABLE.MONGO_URI);
        }
    }
};
exports.MongooseDynamicModule = MongooseDynamicModule;
exports.MongooseDynamicModule = MongooseDynamicModule = MongooseDynamicModule_1 = __decorate([
    (0, common_1.Module)({})
], MongooseDynamicModule);


/***/ }),
/* 111 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(112), exports);
__exportStar(__webpack_require__(113), exports);
__exportStar(__webpack_require__(114), exports);
__exportStar(__webpack_require__(115), exports);


/***/ }),
/* 112 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidateObjectIdPipe = void 0;
const common_1 = __webpack_require__(28);
const mongoose = __webpack_require__(52);
let ValidateObjectIdPipe = class ValidateObjectIdPipe {
    constructor() { }
    async transform(value, metadata) {
        const isValid = mongoose.Types.ObjectId.isValid(value);
        if (!isValid)
            throw new common_1.HttpException('Id sai format hoặc không tồn tại.', common_1.HttpStatus.BAD_REQUEST);
        return value;
    }
};
exports.ValidateObjectIdPipe = ValidateObjectIdPipe;
exports.ValidateObjectIdPipe = ValidateObjectIdPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ValidateObjectIdPipe);


/***/ }),
/* 113 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ParseIntPipe = void 0;
const common_1 = __webpack_require__(28);
let ParseIntPipe = class ParseIntPipe {
    transform(value, metadata) {
        const val = parseInt(value, 10);
        if (isNaN(val)) {
            throw new common_1.HttpException('Sai format kiểu Number.', common_1.HttpStatus.BAD_REQUEST);
        }
        return val;
    }
};
exports.ParseIntPipe = ParseIntPipe;
exports.ParseIntPipe = ParseIntPipe = __decorate([
    (0, common_1.Injectable)()
], ParseIntPipe);


/***/ }),
/* 114 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidationPipe = void 0;
const common_1 = __webpack_require__(28);
const class_validator_1 = __webpack_require__(7);
const class_transformer_1 = __webpack_require__(27);
const nestjs_i18n_1 = __webpack_require__(4);
const _ = __webpack_require__(44);
const property_enum_1 = __webpack_require__(21);
let ValidationPipe = class ValidationPipe {
    toValidate(metatype) {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find((type) => metatype === type);
    }
    async transform(value, metadata) {
        const { metatype } = metadata;
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = (0, class_transformer_1.plainToClass)(metatype, value);
        const errorsList = await (0, class_validator_1.validate)(object);
        if (errorsList.length > 0) {
            let errors = [];
            for (const error of errorsList) {
                if (_.isEmpty(error.children)) {
                    errors = errors.concat(await this.parseErrors(error));
                }
                else {
                    for (const [index, item] of Object.entries(error.children)) {
                        if (_.isArray(item.children) && item.children.length > 0) {
                            for (const subItem of item.children) {
                                errors = errors.concat(await this.parseErrors(subItem, Number(index) + 1));
                            }
                        }
                        else {
                            errors = errors.concat(await this.parseErrors(item));
                        }
                    }
                }
            }
            if (errors.length > 0) {
                throw new common_1.HttpException({ statusCode: common_1.HttpStatus.BAD_REQUEST, message: errors }, common_1.HttpStatus.BAD_REQUEST);
            }
        }
        return value;
    }
    async parseErrors(error, rowNumber = null) {
        const results = [];
        const propertyName = property_enum_1.PAYLOAD_PROPERTY[error?.property];
        const keys = Object.keys(error.constraints);
        for (let key of keys) {
            let message = '';
            if (_.includes([property_enum_1.ERROR.MIN_LENGTH, property_enum_1.ERROR.MAX_LENGTH], key)) {
                const arrays = error?.constraints?.[key].split(' ');
                const number = arrays.find((e) => {
                    return Number(e);
                });
                message = `${propertyName || ''} ${property_enum_1.PAYLOAD_ERROR[key]} ${number} kí tự!`;
            }
            else {
                const description = property_enum_1.SUB_PAYLOAD_ERROR[error.constraints[key]] ?? property_enum_1.PAYLOAD_ERROR[key];
                message = `${propertyName || ''} ${description}`;
            }
            results.push(rowNumber ? `Dữ liệu dòng thứ ${rowNumber}: ${message}` : message);
        }
        return results;
    }
};
exports.ValidationPipe = ValidationPipe;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", typeof (_a = typeof nestjs_i18n_1.I18nService !== "undefined" && nestjs_i18n_1.I18nService) === "function" ? _a : Object)
], ValidationPipe.prototype, "i18n", void 0);
exports.ValidationPipe = ValidationPipe = __decorate([
    (0, common_1.Injectable)()
], ValidationPipe);


/***/ }),
/* 115 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmptyPipe = void 0;
const common_1 = __webpack_require__(28);
let EmptyPipe = class EmptyPipe {
    transform(value, metadata) {
        const val = parseInt(value, 10);
        if (isNaN(val))
            throw new common_1.HttpException('Bắt buộc nhập.', common_1.HttpStatus.BAD_REQUEST);
        return val;
    }
};
exports.EmptyPipe = EmptyPipe;
exports.EmptyPipe = EmptyPipe = __decorate([
    (0, common_1.Injectable)()
], EmptyPipe);


/***/ }),
/* 116 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(26), exports);


/***/ }),
/* 117 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoreModule = void 0;
const common_1 = __webpack_require__(28);
const core_1 = __webpack_require__(67);
const schedule_1 = __webpack_require__(118);
const path = __webpack_require__(12);
const event_emitter_1 = __webpack_require__(119);
const logger_middleware_1 = __webpack_require__(105);
const validation_pipe_1 = __webpack_require__(114);
const logger_module_1 = __webpack_require__(95);
const unauthorized_exception_filter_1 = __webpack_require__(73);
const validate_object_id_pipes_1 = __webpack_require__(112);
const empty_pipe_1 = __webpack_require__(115);
const logging_interceptor_1 = __webpack_require__(91);
const all_exception_filter_1 = __webpack_require__(69);
const transform_interceptor_1 = __webpack_require__(93);
const http_module_1 = __webpack_require__(120);
const config_module_1 = __webpack_require__(61);
const telegram_module_1 = __webpack_require__(122);
const config_1 = __webpack_require__(36);
const enviroment_enum_1 = __webpack_require__(16);
const i18n_1 = __webpack_require__(83);
const jwt_config_module_1 = __webpack_require__(126);
const logger_1 = __webpack_require__(94);
const auth_guard_1 = __webpack_require__(75);
const mail_module_1 = __webpack_require__(127);
let CoreModule = class CoreModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
exports.CoreModule = CoreModule;
exports.CoreModule = CoreModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.ConfigDynamicModule,
            telegram_module_1.TelegramModule.forRootAsync({
                useFactory: async (config) => ({
                    botKey: config.get(enviroment_enum_1.ENVIROMENT_VARIABLE.TELEGRAM_BOT_ID),
                }),
                inject: [config_1.ConfigService],
            }),
            logger_module_1.LoggerModule,
            http_module_1.GlobalHttpModule,
            schedule_1.ScheduleModule.forRoot(),
            event_emitter_1.EventEmitterModule.forRoot(),
            i18n_1.I18nDynamicModule.forRoot({ path: path.resolve('i18n') }),
            jwt_config_module_1.JwtConfigModule,
            mail_module_1.MailModule,
        ],
        providers: [
            logger_1.LoggerService,
            { provide: core_1.APP_INTERCEPTOR, useClass: logging_interceptor_1.LoggingInterceptor },
            { provide: core_1.APP_INTERCEPTOR, useClass: transform_interceptor_1.TransformInterceptor },
            {
                provide: core_1.APP_FILTER,
                useClass: all_exception_filter_1.AllExceptionFilter,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: common_1.ParseIntPipe,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: empty_pipe_1.EmptyPipe,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: validate_object_id_pipes_1.ValidateObjectIdPipe,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: unauthorized_exception_filter_1.UnauthorizedExceptionFilter,
            },
            {
                provide: core_1.APP_PIPE,
                useClass: validation_pipe_1.ValidationPipe,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
        ],
        exports: [logger_1.LoggerService],
    })
], CoreModule);


/***/ }),
/* 118 */
/***/ ((module) => {

module.exports = require("@nestjs/schedule");

/***/ }),
/* 119 */
/***/ ((module) => {

module.exports = require("@nestjs/event-emitter");

/***/ }),
/* 120 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GlobalHttpModule = void 0;
const axios_1 = __webpack_require__(121);
const common_1 = __webpack_require__(28);
let GlobalHttpModule = class GlobalHttpModule {
};
exports.GlobalHttpModule = GlobalHttpModule;
exports.GlobalHttpModule = GlobalHttpModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule.register({
                timeout: 5000,
                maxRedirects: 5,
            }),
        ],
        exports: [axios_1.HttpModule],
    })
], GlobalHttpModule);


/***/ }),
/* 121 */
/***/ ((module) => {

module.exports = require("@nestjs/axios");

/***/ }),
/* 122 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TelegramModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TelegramModule = void 0;
const common_1 = __webpack_require__(28);
const telegram_interface_1 = __webpack_require__(123);
const telegram_service_1 = __webpack_require__(124);
let TelegramModule = TelegramModule_1 = class TelegramModule {
    static forRootAsync(options) {
        return {
            module: TelegramModule_1,
            providers: [
                {
                    provide: telegram_interface_1.TELEGRAM_OPTIONS_TOKEN,
                    useFactory: options.useFactory,
                    inject: options.inject,
                },
                telegram_service_1.TelegramService,
            ],
            imports: options.imports,
            exports: [telegram_service_1.TelegramService],
        };
    }
};
exports.TelegramModule = TelegramModule;
exports.TelegramModule = TelegramModule = TelegramModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], TelegramModule);


/***/ }),
/* 123 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TELEGRAM_OPTIONS_TOKEN = void 0;
exports.TELEGRAM_OPTIONS_TOKEN = 'TelegramOptionsToken';


/***/ }),
/* 124 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TelegramService = void 0;
const common_1 = __webpack_require__(28);
const telegram_interface_1 = __webpack_require__(123);
const TelegramBot = __webpack_require__(125);
let TelegramService = class TelegramService extends TelegramBot {
    constructor(options) {
        super(options.botKey);
        this._logger = new common_1.Logger(this.constructor.name);
    }
    async customMessage(payload) {
        try {
            await this.sendMessage(payload.chatId, payload.text, {
                reply_to_message_id: payload.threadId,
            });
            this._logger.log(`SEND MESSAGE TO TELEGRAM SUCCESSFULLY`);
        }
        catch (error) {
            const telegramErr = error.response.body;
            this._logger.error(`ERROR ON MESSAGING TO TELEGRAM ${JSON.stringify(telegramErr)}`);
        }
    }
};
exports.TelegramService = TelegramService;
exports.TelegramService = TelegramService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(telegram_interface_1.TELEGRAM_OPTIONS_TOKEN)),
    __metadata("design:paramtypes", [typeof (_a = typeof telegram_interface_1.TelegramConfig !== "undefined" && telegram_interface_1.TelegramConfig) === "function" ? _a : Object])
], TelegramService);


/***/ }),
/* 125 */
/***/ ((module) => {

module.exports = require("node-telegram-bot-api");

/***/ }),
/* 126 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtConfigModule = void 0;
const common_1 = __webpack_require__(28);
const jwt_1 = __webpack_require__(77);
const config_1 = __webpack_require__(36);
const enviroment_enum_1 = __webpack_require__(16);
const jwt_strategy_1 = __webpack_require__(76);
let JwtConfigModule = class JwtConfigModule {
};
exports.JwtConfigModule = JwtConfigModule;
exports.JwtConfigModule = JwtConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                useFactory: (config) => {
                    return {
                        secret: config.get(enviroment_enum_1.ENVIROMENT_VARIABLE.JWT_SECRET),
                        signOptions: {
                            expiresIn: config.get(enviroment_enum_1.ENVIROMENT_VARIABLE.JWT_ACCESS_TOKEN_EXPIRE),
                        },
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [jwt_strategy_1.JwtConfigStrategy],
        exports: [jwt_strategy_1.JwtConfigStrategy],
    })
], JwtConfigModule);


/***/ }),
/* 127 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailModule = void 0;
const common_1 = __webpack_require__(28);
const mailer_1 = __webpack_require__(128);
const config_1 = __webpack_require__(36);
const common_2 = __webpack_require__(1);
const mail_service_1 = __webpack_require__(129);
const logger_1 = __webpack_require__(94);
const handlebars_adapter_1 = __webpack_require__(130);
const path_1 = __webpack_require__(12);
let MailModule = class MailModule {
};
exports.MailModule = MailModule;
exports.MailModule = MailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            logger_1.LoggerModule,
            mailer_1.MailerModule.forRootAsync({
                imports: [],
                useFactory: async (configService) => ({
                    transport: {
                        host: configService.get(common_2.ENVIROMENT_VARIABLE.SMTP_HOST),
                        port: configService.get(common_2.ENVIROMENT_VARIABLE.SMTP_PORT),
                        secure: true,
                        auth: {
                            user: configService.get(common_2.ENVIROMENT_VARIABLE.SMTP_USER),
                            pass: configService.get(common_2.ENVIROMENT_VARIABLE.SMTP_PASSWORD),
                        },
                    },
                    defaults: {
                        from: configService.get(common_2.ENVIROMENT_VARIABLE.SMTP_DEFAULT_EMAIL),
                    },
                    template: {
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        dir: (0, path_1.resolve)('libs/templates'),
                        options: {
                            strict: true,
                        },
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [mail_service_1.MailService],
        exports: [mail_service_1.MailService],
    })
], MailModule);


/***/ }),
/* 128 */
/***/ ((module) => {

module.exports = require("@nestjs-modules/mailer");

/***/ }),
/* 129 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailService = void 0;
const mailer_1 = __webpack_require__(128);
const common_1 = __webpack_require__(28);
const logger_service_1 = __webpack_require__(96);
let MailService = class MailService {
    constructor(mailerService, logger) {
        this.mailerService = mailerService;
        this.logger = logger;
    }
    async sendMessageForUserMail(payload) {
        try {
            await this.mailerService.sendMail({
                ...payload,
                attachments: [
                    {
                        filename: 'logo-the-sponsor.png',
                        path: './files/logo-the-sponsor.png',
                        cid: 'logo_the_sponsor',
                    },
                ],
            });
        }
        catch (error) {
            this.logger.error(`sendMessageForUserMail=>ROOT CAUSE: ${JSON.stringify(error?.message ?? error)}`);
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof mailer_1.MailerService !== "undefined" && mailer_1.MailerService) === "function" ? _a : Object, typeof (_b = typeof logger_service_1.LoggerService !== "undefined" && logger_service_1.LoggerService) === "function" ? _b : Object])
], MailService);


/***/ }),
/* 130 */
/***/ ((module) => {

module.exports = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");

/***/ }),
/* 131 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Common = void 0;
const common_1 = __webpack_require__(28);
const moment = __webpack_require__(50);
const mongoose = __webpack_require__(52);
const socket_io_client_1 = __webpack_require__(132);
const _ = __webpack_require__(44);
const crypto = __webpack_require__(48);
const enums_1 = __webpack_require__(8);
__webpack_require__(10);
const class_validator_1 = __webpack_require__(7);
const datetime_constant_1 = __webpack_require__(133);
const interfaces_1 = __webpack_require__(134);
const language_constant_1 = __webpack_require__(141);
const characters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
const charactersLength = characters?.length;
class Common {
    static _conditionFindAll(payload) {
        const query = payload.query;
        const condition = {};
        const condition_option = Common._conditionOption(query);
        const condition_keyword = Common._conditionKeyWord(query);
        const select_after_query = Common._selectAfterQuery(query);
        if (_.isArray(payload.condition_fields) &&
            payload.condition_fields.length > 0) {
            Object.keys(condition_option).forEach((e) => {
                if (payload.condition_fields.includes(e)) {
                    condition[e] = condition_option[e];
                }
            });
        }
        let sort = { updated_at: -1 };
        if (query?.sort_name && query?.sort_type) {
            sort = Common._sortConverter(query);
        }
        return {
            condition,
            condition_option,
            condition_keyword,
            sort,
            select_after_query,
        };
    }
    static _conditionKeyWord(query) {
        const condition_keyword = {};
        if (query.keyword && query.keyword_params) {
            const makeTextFilter = (text) => {
                const wordSplited = text?.split(/\s+/);
                const regToMatch = new RegExp(wordSplited.join('|'), 'gi');
                const filter = [];
                const array = query?.keyword_params?.split(',');
                array.map((item, i) => {
                    filter.push({});
                    filter[i][item] = {
                        $regex: regToMatch,
                    };
                });
                return filter;
            };
            condition_keyword.$or = makeTextFilter(query.keyword);
        }
        return condition_keyword;
    }
    static _selectAfterQuery(query) {
        const select_fields = query?.select_fields || '';
        let select_by_populate = {};
        const select_by_project_aggregate = [];
        if (select_fields) {
            const select_array = select_fields.split(',');
            select_by_populate = select_array.join(' ');
            const project_aggregate = {
                $project: {},
            };
            for (const select_field of select_array) {
                project_aggregate['$project'][`${select_field}`] = 1;
            }
            select_by_project_aggregate[0] = project_aggregate;
        }
        return {
            select_by_populate,
            select_by_project_aggregate,
        };
    }
    static _sortConverter(query = {}) {
        const sort_name = query.sort_name;
        const sort_type = query.sort_type;
        const sort = {};
        if (sort_name && sort_type) {
            const name_arr = sort_name?.split(',')?.map((element) => element?.trim());
            const type_arr = sort_type?.split(',')?.map((element) => element?.trim());
            if (Array.isArray(name_arr) &&
                Array.isArray(type_arr) &&
                name_arr?.length > 0 &&
                type_arr?.length > 0) {
                name_arr.forEach((element, idx) => {
                    if (element)
                        sort[element] = type_arr[idx] === 'des' ? -1 : 1;
                });
            }
        }
        return sort;
    }
    static _conditionOption(query) {
        const condition_option = {};
        Common.getConditionBySingularAndPluralField(query, condition_option, {
            singular_field: 'status',
            plural_field: 'statuses',
            convert_type: interfaces_1.ENUM_BASE_FIND_CONVERT_TYPE.STRING,
        });
        Common.getConditionBySingularAndPluralField(query, condition_option, {
            singular_field: 'display_status',
            plural_field: 'display_statuses',
            convert_type: interfaces_1.ENUM_BASE_FIND_CONVERT_TYPE.STRING,
        });
        Common.getConditionBySingularAndPluralField(query, condition_option, {
            singular_field: 'sponsor_hashtag',
            plural_field: 'sponsor_hashtags',
            convert_type: interfaces_1.ENUM_BASE_FIND_CONVERT_TYPE.OBJECTID,
        });
        Common.getConditionBySingularAndPluralField(query, condition_option, {
            singular_field: 'cast',
            plural_field: 'casts',
            convert_type: interfaces_1.ENUM_BASE_FIND_CONVERT_TYPE.OBJECTID,
        });
        Common.getConditionBySingularAndPluralField(query, condition_option, {
            singular_field: 'platform',
            plural_field: 'platforms',
            convert_type: interfaces_1.ENUM_BASE_FIND_CONVERT_TYPE.OBJECTID,
        });
        Common.getConditionBySingularAndPluralField(query, condition_option, {
            singular_field: 'sponsorship_form',
            plural_field: 'sponsorship_forms',
            convert_type: interfaces_1.ENUM_BASE_FIND_CONVERT_TYPE.OBJECTID,
        });
        Common.getConditionBySingularAndPluralField(query, condition_option, {
            singular_field: 'exclude',
            plural_field: 'excludes',
            convert_type: interfaces_1.ENUM_BASE_FIND_CONVERT_TYPE.OBJECTID,
        });
        return condition_option;
    }
    static getConditionBySingularAndPluralField(object_origin, object_condition, payload) {
        object_origin = object_origin
            ? Object.assign({}, object_origin)
            : object_origin;
        const singular_field = payload?.singular_field;
        const plural_field = payload?.plural_field || `${singular_field}s`;
        const convert_type = payload?.convert_type;
        if (singular_field in object_origin &&
            !['', null, undefined].includes(object_origin[singular_field]?.toString()?.trim())) {
            let convert_value_singular_field = object_origin[singular_field];
            switch (convert_type) {
                case interfaces_1.ENUM_BASE_FIND_CONVERT_TYPE.OBJECTID:
                    convert_value_singular_field = Common.toObjectId(convert_value_singular_field);
                    break;
                case interfaces_1.ENUM_BASE_FIND_CONVERT_TYPE.NUMBER:
                    convert_value_singular_field = Common.toNumber(convert_value_singular_field);
                    break;
                default:
                    break;
            }
            object_condition[singular_field] = convert_value_singular_field;
            object_condition[plural_field] = {
                $in: [convert_value_singular_field],
            };
        }
        else if (object_origin[plural_field] &&
            !_.isEmpty(object_origin[plural_field])) {
            if (!_.isArray(object_origin[plural_field]) &&
                _.isString(object_origin[plural_field])) {
                const plural_field_temp = object_origin[plural_field]?.split(',');
                object_origin[plural_field] = plural_field_temp;
            }
            let convert_value_plural_field = object_origin[plural_field];
            switch (convert_type) {
                case interfaces_1.ENUM_BASE_FIND_CONVERT_TYPE.OBJECTID:
                    convert_value_plural_field = Common.toObjectId(convert_value_plural_field);
                    break;
                case interfaces_1.ENUM_BASE_FIND_CONVERT_TYPE.NUMBER:
                    convert_value_plural_field = Common.toNumber(convert_value_plural_field);
                    break;
                default:
                    break;
            }
            object_condition[singular_field] = { $in: convert_value_plural_field };
            object_condition[plural_field] = { $in: convert_value_plural_field };
        }
    }
    static createConditionFromDateToDate(from_date, to_date) {
        if (from_date && to_date) {
            return {
                $gte: new Date(moment(from_date).format(enums_1.ENUM_DATE_TIME.YYYY_MM_DD) +
                    enums_1.ENUM_DATE_TIME.START_OFFSET),
                $lte: new Date(moment(to_date).format(enums_1.ENUM_DATE_TIME.YYYY_MM_DD) +
                    enums_1.ENUM_DATE_TIME.END_OFFSET),
            };
        }
        else if (from_date && !to_date) {
            return {
                $gte: new Date(moment(from_date).format(enums_1.ENUM_DATE_TIME.YYYY_MM_DD) +
                    enums_1.ENUM_DATE_TIME.START_OFFSET),
            };
        }
        else if (!from_date && to_date) {
            return {
                $lte: new Date(moment(to_date).format(enums_1.ENUM_DATE_TIME.YYYY_MM_DD) +
                    enums_1.ENUM_DATE_TIME.END_OFFSET),
            };
        }
        return {};
    }
    static createConditionFromValueToValue(from_value, to_value) {
        if (!isNaN(from_value) && !isNaN(to_value)) {
            return {
                $gte: Number(from_value),
                $lte: Number(to_value),
            };
        }
        else if (!isNaN(from_value)) {
            return {
                $gte: Number(from_value),
            };
        }
        else if (!isNaN(to_value)) {
            return {
                $lte: Number(to_value),
            };
        }
        return {};
    }
    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static generateCharacter(num = 5) {
        let result = '';
        for (let i = 0; i < num; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    static generateCode(generate_code) {
        if (generate_code) {
            return (generate_code.toUpperCase() +
                Math.floor(1000000 + Math.random() * 9000000));
        }
    }
    static getLocalOffset(date = new Date(), format = undefined, offset = 420) {
        if (format) {
            return moment(date).utcOffset(offset).format(format);
        }
        return moment(date).utcOffset(offset);
    }
    static sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }
    static isObject(object) {
        return object != null && typeof object === 'object';
    }
    static valueToBoolean(value) {
        if (value === null || value === undefined) {
            return undefined;
        }
        if (typeof value === 'boolean') {
            return value;
        }
        if (['true', 'on', 'yes', '1'].includes(value.toLowerCase())) {
            return true;
        }
        if (['false', 'off', 'no', '0'].includes(value.toLowerCase())) {
            return false;
        }
        return undefined;
    }
    static mergeObjectAfterLookupArray(new_array, origin_array, array_after_lookup, new_item_in_array) {
        return [
            {
                $addFields: {
                    [`${new_array}`]: {
                        $map: {
                            input: `$${origin_array}`,
                            as: 'origin_item',
                            in: {
                                $mergeObjects: [
                                    '$$origin_item',
                                    {
                                        [`${new_item_in_array}`]: {
                                            $arrayElemAt: [
                                                {
                                                    $filter: {
                                                        input: `$${array_after_lookup}`,
                                                        as: 'after_lookup_item',
                                                        cond: {
                                                            $eq: [
                                                                `$$origin_item.${new_item_in_array}`,
                                                                '$$after_lookup_item._id',
                                                            ],
                                                        },
                                                    },
                                                },
                                                0,
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
            },
        ];
    }
    static lookupOneField(from, refID, project, preserveNullAndEmptyArrays = true, field_alias = null) {
        const alias_field = field_alias ?? refID;
        return [
            {
                $lookup: {
                    from: from,
                    let: { refID: '$' + refID },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$_id', '$$refID'],
                                },
                            },
                        },
                        {
                            $project: project,
                        },
                    ],
                    as: alias_field,
                },
            },
            { $unwind: { path: '$' + alias_field, preserveNullAndEmptyArrays } },
        ];
    }
    static lookupArrayField(from, refID, project, field_search = '$_id', field_alias = null) {
        const alias_field = field_alias ?? refID;
        return [
            {
                $lookup: {
                    from: from,
                    let: { refIDs: '$' + refID },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: [field_search, { $ifNull: ['$$refIDs', []] }],
                                },
                            },
                        },
                        {
                            $project: project,
                        },
                    ],
                    as: alias_field,
                },
            },
        ];
    }
    static startTimeLog(name) {
        const start = new Date().getTime();
        return start;
    }
    static endTimeLog(name, start) {
        const end = new Date().getTime();
        const time = end - start;
        return end;
    }
    static chunkBlock(data, numberPerBlock = 5) {
        const blocks = [];
        while (data.length > 0) {
            const chunked = data.splice(0, numberPerBlock);
            blocks.push(chunked);
        }
        return blocks;
    }
    static async PromisePool(handler, data, concurency = 50) {
        const iterator = data.entries();
        const workers = new Array(concurency)
            .fill(iterator)
            .map(async (iterator) => {
            for (const [index, item] of iterator) {
                await handler(item, index);
            }
        });
        await Promise.all(workers);
    }
    static JSONTryParse(input) {
        try {
            if (this.isValidJsonString(input)) {
                return JSON.parse(input);
            }
        }
        catch (e) { }
        return false;
    }
    static isValidJsonString(jsonString) {
        if (!(jsonString && typeof jsonString === 'string')) {
            return false;
        }
        try {
            JSON.parse(jsonString);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    static convertDocumentToObject(value) {
        return value && value instanceof mongoose.Document
            ? value.toObject()
            : value;
    }
    static async md5(input) {
        const hash = crypto.createHash('md5');
        return hash.update(input).digest('hex');
    }
    static createArrayRange(start, stop, step) {
        return Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);
    }
    static dateFormat(date, fstr, utc) {
        Common.logger.log('dateFormat');
        utc = utc ? 'getUTC' : 'get';
        return fstr.replace(/%[YmdHMS]/g, function (m) {
            switch (m) {
                case '%Y':
                    return date[utc + 'FullYear']();
                case '%m':
                    m = 1 + date[utc + 'Month']();
                    break;
                case '%d':
                    m = date[utc + 'Date']();
                    break;
                case '%H':
                    m = date[utc + 'Hours']();
                    break;
                case '%M':
                    m = date[utc + 'Minutes']();
                    break;
                case '%S':
                    m = date[utc + 'Seconds']();
                    break;
                default:
                    return m.slice(1);
            }
            return ('0' + m).slice(-2);
        });
    }
    static toObjectId(ids) {
        try {
            if (!ids)
                return ids;
            if (ids.constructor === Array) {
                for (let index = 0; index < ids.length; index++) {
                    if (mongoose.Types.ObjectId.isValid(ids[index])) {
                        ids[index] = new mongoose.Types.ObjectId(ids[index]);
                    }
                }
                return ids;
            }
            if (mongoose.Types.ObjectId.isValid(ids)) {
                return new mongoose.Types.ObjectId(ids);
            }
            return ids;
        }
        catch (error) {
            throw error;
        }
    }
    static toNumber(numbers) {
        try {
            if (!numbers)
                return numbers;
            if (numbers.constructor === Array) {
                for (let index = 0; index < numbers.length; index++) {
                    if (!isNaN(numbers[index])) {
                        numbers[index] = Number(numbers[index]);
                    }
                }
                return numbers;
            }
            if (!isNaN(numbers)) {
                return Number(numbers);
            }
            Common.logger.error('type number không hợp lệ.');
            return numbers;
        }
        catch (error) {
            throw error;
        }
    }
    static detectNullToObject(value) {
        return _.isEmpty(value) ? {} : value;
    }
    static convertParamsToObjectId(payload) {
        if (_.isEmpty(payload))
            return payload;
        payload = Common.convertDocumentToObject(payload);
        const keys = Object.keys(Common.detectNullToObject(payload));
        if (keys && keys.length > 0) {
            for (const key of keys) {
                if (Array.isArray(payload[key]) && payload[key].length > 0) {
                    payload[key] = _.map(payload[key], (ele) => {
                        const item = typeof ele == 'string' && (0, class_validator_1.isMongoId)(ele) == true
                            ? new mongoose.Types.ObjectId(ele)
                            : ele;
                        return item;
                    });
                }
                if ((0, class_validator_1.isMongoId)(payload[key]) == true &&
                    typeof payload[key] == 'string') {
                    payload[key] = new mongoose.Types.ObjectId(payload[key]);
                }
                if (typeof payload[key] == 'object' && !_.isEmpty(payload[key])) {
                    payload[key] = Common.convertParamsToObjectId(payload[key]);
                }
            }
        }
        return payload;
    }
    static translateObjectMapping(object_name) {
        const user = [
            'CreateUserDTO',
            'FindUserDTO',
            'UpdateProfileDTO',
            'UpdateUserDTO',
            'UpdateUserStatusDTO',
            'UpdateMoveUserDTO',
            'UpdateOffUserDTO',
            'ProfileDTO',
            'UpdateReplaceUserDTO',
            'UpdateUserGroupDTO',
        ];
        if (user.indexOf(object_name) !== -1) {
            return enums_1.ENUM_MODEL.USER;
        }
        const setting = [
            'CreateSettingDTO',
            'FindSettingDTO',
            'UpdateSettingDTO',
            'UpdateSettingMultiplyDTO',
        ];
        if (setting.indexOf(object_name) !== -1) {
            return enums_1.ENUM_MODEL.SETTING;
        }
        const masterData = [
            'FindMasterDataDTO',
            'CreateMasterDataDto',
            'UpdateMasterDataDto',
        ];
        if (masterData.indexOf(object_name) !== -1) {
            return enums_1.ENUM_MODEL.MASTER_DATA;
        }
    }
    static genRandomString(length) {
        return crypto
            .randomBytes(Math.ceil(+length / 2))
            .toString('hex')
            .slice(0, length);
    }
    static compareValues(frist_value, second_value) {
        return frist_value?.toString() === second_value?.toString() ? true : false;
    }
    static calculateTTLSeconds(endTime) {
        const current = moment();
        const expiredAt = moment(endTime);
        const diffInSeconds = expiredAt.diff(current, 'seconds');
        if (diffInSeconds <= 0)
            return 0;
        return diffInSeconds;
    }
    static veriryExtractToken(token) {
        var base64Payload = token.split('.')[1];
        if (!base64Payload) {
            return null;
        }
        var payload = Buffer.from(base64Payload, 'base64');
        return JSON.parse(payload.toString());
    }
    static calculateElapsedTimestamp(timestamp) {
        const seconds = Math.floor((Date.now() - Number(timestamp)) / 1000);
        const interval = datetime_constant_1.fromSinceIntervals.find((i) => i.seconds < seconds);
        const count = Math.floor(seconds / interval.seconds);
        return `${count} ${interval.vn_label} trước`;
    }
    static analysisVietNameseText(text) {
        const words = text?.split('');
        const result = {
            $caseSensitive: false,
            $search: `'\"${text}\"'`,
            $diacriticSensitive: false,
        };
        for (const word of words) {
            const lowerVietNamese = language_constant_1.LOWERCASE_VIETNAMESE_TEXTS.find((element) => element.key.split('|').includes(word));
            const upperVietNamese = language_constant_1.UPPERCASE_VIETNAMESE_TEXTS.find((element) => element.key.split('|').includes(word));
            if (lowerVietNamese || upperVietNamese) {
                if (lowerVietNamese &&
                    !Common.compareValues(lowerVietNamese.value, word)) {
                    result.$diacriticSensitive = true;
                }
                if (upperVietNamese &&
                    !Common.compareValues(upperVietNamese.value, word)) {
                    result.$diacriticSensitive = true;
                    result.$caseSensitive = true;
                }
            }
        }
        return result;
    }
    static transformDate(dateStr) {
        const [day, month, year] = dateStr?.split('-');
        return new Date(Number(year), Number(month) - 1, Number(day));
    }
    static deepCleanObj(data) {
        if (data instanceof Object) {
            for (const [key, value] of Object.entries(data)) {
                if (!value || _.isEmpty(value)) {
                    delete data['key'];
                }
                else if (value instanceof Object) {
                    this.deepCleanObj(data['key']);
                }
            }
        }
        else if (data instanceof Array) {
            for (const i in data) {
                this.deepCleanObj(data[i]);
            }
        }
    }
    static isChangeData(old_data, new_data) {
        const fields_compare_data_by_pass = [
            'updated_at',
            'updated_by_user',
            'updated_by',
            'history_resource',
            'last_sync_at',
        ];
        const update_data_clone = Common.convertDocumentToObject(_.clone(new_data));
        const old_data_clone = Common.convertDocumentToObject(_.clone(old_data));
        let is_allow_update = false;
        const object_change = {};
        this.deepCleanObj(update_data_clone);
        this.deepCleanObj(old_data_clone);
        for (const item_key in update_data_clone) {
            if (!fields_compare_data_by_pass.includes(item_key) &&
                !_.isEqual(old_data_clone[item_key], update_data_clone[item_key])) {
                is_allow_update = true;
                object_change[item_key] = old_data_clone[item_key];
            }
        }
        return is_allow_update;
    }
}
exports.Common = Common;
Common.logger = new common_1.Logger('Common');
Common.emitSocket = (params) => {
    const { topic, room_id, message, namespace } = params;
    const localUrl = process.env.SOCKET_URL + `${namespace ? `/${namespace}` : ''}`;
    const socketOptions = {
        transportOptions: {
            polling: {
                extraHeaders: {
                    Authorization: process.env.ACCESS_TOKEN,
                },
            },
        },
    };
    const socket = (0, socket_io_client_1.io)(localUrl, socketOptions);
    socket.on('connect', function () {
        socket.emit(topic, {
            room_id,
            cmd_type: enums_1.SOCKET_EVENT_TYPE_ENUM.JOIN,
        });
        socket.emit(topic, {
            room_id,
            cmd_type: enums_1.SOCKET_EVENT_TYPE_ENUM.MESSAGE,
            message,
        });
        socket.emit(topic, {
            room_id,
            cmd_type: enums_1.SOCKET_EVENT_TYPE_ENUM.LEAVE,
        });
    });
};
Common.compareBetweenPastAndCurrent = (olds = [], news = []) => {
    const differenceOldWithNew = _.difference(olds, news);
    const diffrenceNewWithOld = _.difference(news, olds);
    const sameNewAndOld = _.intersection(news, olds);
    return {
        newArray: diffrenceNewWithOld,
        oldArray: differenceOldWithNew,
        sameArray: sameNewAndOld,
    };
};


/***/ }),
/* 132 */
/***/ ((module) => {

module.exports = require("socket.io-client");

/***/ }),
/* 133 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fromSinceIntervals = void 0;
exports.fromSinceIntervals = [
    { eng_label: 'year', vn_label: 'năm', seconds: 31536000 },
    { eng_label: 'month', vn_label: 'tháng', seconds: 2592000 },
    { eng_label: 'day', vn_label: 'ngày', seconds: 86400 },
    { eng_label: 'hour', vn_label: 'giờ', seconds: 3600 },
    { eng_label: 'minute', vn_label: 'phút', seconds: 60 },
    { eng_label: 'second', vn_label: 'giây', seconds: 1 },
];


/***/ }),
/* 134 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(135), exports);
__exportStar(__webpack_require__(136), exports);
__exportStar(__webpack_require__(137), exports);
__exportStar(__webpack_require__(138), exports);
__exportStar(__webpack_require__(139), exports);
__exportStar(__webpack_require__(140), exports);


/***/ }),
/* 135 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 136 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 137 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 138 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ENUM_BASE_FIND_CONVERT_TYPE = void 0;
var ENUM_BASE_FIND_CONVERT_TYPE;
(function (ENUM_BASE_FIND_CONVERT_TYPE) {
    ENUM_BASE_FIND_CONVERT_TYPE["OBJECTID"] = "OBJECTID";
    ENUM_BASE_FIND_CONVERT_TYPE["STRING"] = "STRING";
    ENUM_BASE_FIND_CONVERT_TYPE["NUMBER"] = "NUMBER";
    ENUM_BASE_FIND_CONVERT_TYPE["BOOLEAN"] = "BOOLEAN";
})(ENUM_BASE_FIND_CONVERT_TYPE || (exports.ENUM_BASE_FIND_CONVERT_TYPE = ENUM_BASE_FIND_CONVERT_TYPE = {}));


/***/ }),
/* 139 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 140 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 141 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UPPERCASE_VIETNAMESE_TEXTS = exports.LOWERCASE_VIETNAMESE_TEXTS = void 0;
exports.LOWERCASE_VIETNAMESE_TEXTS = [
    {
        key: 'a|à|á|ạ|ả|ã',
        value: 'a',
    },
    {
        key: 'â|ầ|ấ|ậ|ẩ|ẫ',
        value: 'â',
    },
    {
        key: 'ă|ằ|ắ|ặ|ẳ|ẵ',
        value: 'ă',
    },
    {
        key: 'e|è|é|ẹ|ẻ|ẽ',
        value: 'e',
    },
    {
        key: 'ê|ề|ế|ệ|ể|ễ',
        value: 'ê',
    },
    {
        key: 'i|ì|í|ị|ỉ|ĩ',
        value: 'i',
    },
    {
        key: 'o|ò|ó|ọ|ỏ|õ',
        value: 'o',
    },
    {
        key: 'ô|ồ|ố|ộ|ổ|ỗ',
        value: 'ô',
    },
    {
        key: 'ơ|ờ|ớ|ợ|ở|ỡ',
        value: 'ơ',
    },
    {
        key: 'u|ù|ú|ụ|ủ|ũ',
        value: 'u',
    },
    {
        key: 'ư|ừ|ứ|ự|ử|ữ',
        value: 'ư',
    },
    {
        key: 'y|ỳ|ý|ỵ|ỷ|ỹ',
        value: 'y',
    },
    {
        key: 'đ',
        value: 'd',
    },
];
exports.UPPERCASE_VIETNAMESE_TEXTS = [
    {
        key: 'A|Á|À|Ã|Ạ|Ả',
        value: 'A',
    },
    {
        key: 'Â|Ấ|Ầ|Ẫ|Ậ|Ẩ',
        value: 'Â',
    },
    {
        key: 'Ă|Ắ|Ằ|Ẵ|Ặ|Ẳ',
        value: 'Ă',
    },
    {
        key: 'E|É|È|Ẽ|Ẹ|Ẻ',
        value: 'E',
    },
    {
        key: 'Ê|Ế|Ề|Ễ|Ệ|Ể',
        value: 'Ê',
    },
    {
        key: 'I|Í|Ì|Ĩ|Ị|Ĩ',
        value: 'I',
    },
    {
        key: 'O|Ó|Ò|Õ|Ọ|Ỏ',
        value: 'O',
    },
    {
        key: 'Ô|Ố|Ồ|Ỗ|Ộ|Ổ',
        value: 'Ô',
    },
    {
        key: 'Ơ|Ớ|Ờ|Ỡ|Ợ|Ở',
        value: 'Ơ',
    },
    {
        key: 'U|Ú|Ù|Ũ|Ụ|Ủ',
        value: 'U',
    },
    {
        key: 'Ư|Ứ|Ừ|Ữ|Ự|Ử',
        value: 'Ư',
    },
    {
        key: 'Y|Ý|Ỳ|Ỹ|Ỵ|Ỷ',
        value: 'Y',
    },
    {
        key: 'Đ',
        value: 'D',
    },
];


/***/ }),
/* 142 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseService = void 0;
const common_1 = __webpack_require__(28);
const config_1 = __webpack_require__(36);
const event_emitter_1 = __webpack_require__(119);
const _ = __webpack_require__(44);
const mongoose_1 = __webpack_require__(52);
const nestjs_i18n_1 = __webpack_require__(4);
const enums_1 = __webpack_require__(8);
const functions_1 = __webpack_require__(131);
const mongoose_2 = __webpack_require__(80);
const shared_1 = __webpack_require__(32);
let BaseService = class BaseService {
    constructor(modelT = undefined, readModelT = undefined) {
        this.modelT = modelT;
        this.readModelT = readModelT;
        this.processQueueT = undefined;
        this.resource_system_name = global.resource_system_name;
        this.model_obj = modelT;
        this.read_model_obj = readModelT;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    async _countDocuments(condition) {
        this.logger.log('_countDocuments->Before...0ms');
        const now = Date.now();
        condition = functions_1.Common.convertParamsToObjectId(condition);
        const result = await this.read_model_obj
            .countDocuments(condition)
            .allowDiskUse(true)
            .exec();
        this.logger.log(`_countDocuments->After... ${Date.now() - now}ms`);
        return result;
    }
    async _findAll(query, condition = undefined, conditionKeyword = undefined, populates = [], select = {}, sort = { updated_at: -1 }) {
        this.logger.log('_findAll->Before...0ms');
        const now = Date.now();
        if (condition) {
            condition = functions_1.Common.convertParamsToObjectId(condition);
        }
        if (conditionKeyword) {
            condition = { ...condition, ...conditionKeyword };
        }
        let data;
        let meta;
        if (functions_1.Common.valueToBoolean(query.is_paging) == false) {
            await this.read_model_obj
                .find(condition)
                .populate(populates)
                .sort(sort)
                .select(select)
                .then((response) => {
                data = functions_1.Common.JSONTryParse(JSON.stringify(response));
            });
            meta = {
                tota_iItems: data ? data.length : 0,
            };
        }
        else {
            const per_page = query.per_page ? query.per_page : 20;
            const current_page = query.page && query.page > 0 ? query.page : 1;
            const skip = current_page == 1 ? 0 : per_page * (current_page - 1);
            await this.read_model_obj
                .find(condition)
                .populate(populates)
                .skip(Number(skip))
                .limit(Number(per_page))
                .sort(sort)
                .select(select)
                .then((response) => {
                data = functions_1.Common.JSONTryParse(JSON.stringify(response));
            });
            const total = await this.read_model_obj.find(condition).countDocuments();
            meta = {
                per_page: Number(per_page),
                current_page: Number(current_page),
                tota_iItems: Number(total),
                total_pages: Number(total) % Number(per_page) == 0
                    ? Number(total) / Number(per_page)
                    : Math.ceil(Number(total) / Number(per_page)),
            };
        }
        this.logger.log(`_findAll->After... ${Date.now() - now}ms`);
        return {
            data: data ? data : [],
            meta: meta,
            query,
        };
    }
    async _findALlIds(condition = undefined) {
        this.logger.log('_findALlIds->Before...0ms');
        const now = Date.now();
        if (condition) {
            condition = functions_1.Common.convertParamsToObjectId(condition);
        }
        const aggregate = [
            {
                $match: condition,
            },
            {
                $group: {
                    _id: {},
                    list_ids: {
                        $push: '$_id',
                    },
                },
            },
            {
                $project: {
                    list_ids: 1,
                },
            },
        ];
        const result = await this.read_model_obj
            .aggregate(aggregate)
            .allowDiskUse(true)
            .exec();
        this.logger.log(`_findALlIds->After... ${Date.now() - now}ms`);
        if (result && result.length > 0) {
            return result[0].list_ids;
        }
        return [];
    }
    async _findALlIdsByField(condition = undefined, field_name) {
        this.logger.log('_findALlIdsByField->Before...0ms');
        const now = Date.now();
        if (condition) {
            condition = functions_1.Common.convertParamsToObjectId(condition);
        }
        const aggregate = [
            {
                $match: condition,
            },
            {
                $group: {
                    _id: {},
                    list_ids: {
                        $push: `$${field_name}`,
                    },
                },
            },
            {
                $project: {
                    list_ids: 1,
                },
            },
        ];
        const result = await this.read_model_obj
            .aggregate(aggregate)
            .allowDiskUse(true)
            .exec();
        this.logger.log(`_findALlIdsByField->After... ${Date.now() - now}ms`);
        if (result && result.length > 0) {
            return result[0].list_ids;
        }
        return [];
    }
    async _find(condition, populates = [], select = {}, sort = { updated_at: -1 }) {
        this.logger.log('_find->Before...0ms');
        const now = Date.now();
        condition = functions_1.Common.convertParamsToObjectId(condition);
        const result = this.read_model_obj
            .find(condition)
            .populate(populates)
            .sort(sort)
            .select(select)
            .exec();
        this.logger.log(`_find->After... ${Date.now() - now}ms`);
        return result;
    }
    async _findOne(condition, populates = [], select = {}) {
        this.logger.log('_findOne->Before...0ms');
        const now = Date.now();
        condition = functions_1.Common.convertParamsToObjectId(condition);
        const result = this.model_obj.findOne(condition);
        if (populates) {
            populates.forEach((el) => {
                if (el.path && !el.model) {
                    result.populate(el.path);
                }
                else {
                    result.populate(el);
                }
            });
        }
        this.logger.log(`_findOne->After... ${Date.now() - now}ms`);
        return await result.select(select).lean();
    }
    async _findIndex(condition) {
        this.logger.log('_findIndex->Before...0ms');
        const now = Date.now();
        condition = functions_1.Common.convertParamsToObjectId(condition);
        const result = this.model_obj.findIndex(condition).exec();
        this.logger.log(`_findIndex->After... ${Date.now() - now}ms`);
        return result;
    }
    async _aggregate(aggregate) {
        this.logger.log('_aggregate->Before...0ms');
        const now = Date.now();
        const result = await this.read_model_obj
            .aggregate(aggregate)
            .allowDiskUse(true)
            .exec();
        this.logger.log(`_aggregate->After... ${Date.now() - now}ms`);
        return result;
    }
    async _findById(id, populates = [], option = {}) {
        this.logger.log('_findById->Before...0ms');
        const now = Date.now();
        const result = this.model_obj.findById(functions_1.Common.toObjectId(id));
        if (populates) {
            populates.forEach((el) => {
                result.populate(el);
            });
        }
        this.logger.log(`_findById->After... ${Date.now() - now}ms`);
        return await result.select(option).lean();
    }
    async _create(data, options = {}) {
        this.logger.log('_create->Before...0ms');
        const now = Date.now();
        try {
            data.updated_at = functions_1.Common.getLocalOffset(new Date());
            const obj = new this.model_obj(data);
            const result = await obj.save(options);
            this.logger.log(`_create->After... ${Date.now() - now}ms`);
            return result;
        }
        catch (error) {
            this.logger.error(error?.message);
            (0, shared_1.throwErrorMessage)(error);
        }
        finally {
            this.logger.log(`_create->After... ${Date.now() - now}ms`);
        }
    }
    async _updateOne(condition, data, options = { new: true }) {
        this.logger.log('_updateOne->Before...0ms');
        const now = Date.now();
        try {
            data.updated_at = functions_1.Common.getLocalOffset(new Date());
            condition = functions_1.Common.convertParamsToObjectId(condition);
            const result = await this.model_obj
                .updateOne(condition, data, options)
                .exec();
            this.logger.debug('_updateOne->result', result);
            if (result) {
                this.logger.log(`_updateOne->After... ${Date.now() - now}ms`);
                return true;
            }
        }
        catch (error) {
            this.logger.error(error?.message);
            (0, shared_1.throwErrorMessage)(error);
        }
        finally {
            this.logger.log(`_updateOne->After->Final... ${Date.now() - now}ms`);
        }
        return false;
    }
    async _findOneAndUpdate(condition, data, options = { new: true }) {
        this.logger.log('_findOneAndUpdate->Before...0ms');
        const now = Date.now();
        condition = functions_1.Common.convertParamsToObjectId(condition);
        if (options) {
            options.new = true;
        }
        data.updated_at = functions_1.Common.getLocalOffset(new Date());
        const new_data = await this.model_obj
            .findOneAndUpdate(condition, data, options)
            .exec();
        this.logger.log(`_findOneAndUpdate->After... ${Date.now() - now}ms`);
        return new_data;
    }
    async _updateStatus(id, data, options = { new: true }) {
        this.logger.log('_updateStatus->Before...0ms');
        data.updated_at = functions_1.Common.getLocalOffset(new Date());
        const now = Date.now();
        id = functions_1.Common.toObjectId(id);
        const old_data = await this.model_obj.findById(id).exec();
        if (!old_data) {
            throw new common_1.NotFoundException(await this.i18n.translate('validations.not_exists', {
                args: { attribute: 'Id' },
            }));
        }
        if (old_data.status == data.status) {
            return old_data;
        }
        if (options) {
            options.new = true;
        }
        const new_data = await this.model_obj
            .findByIdAndUpdate(id, data, options)
            .exec();
        this.logger.log(`_updateStatus->After... ${Date.now() - now}ms`);
        return new_data;
    }
    async _findByIdAndUpdate(id, data, options = { new: true }, populates = []) {
        this.logger.log('_findByIdAndUpdate->Before...0ms');
        data.updated_at = functions_1.Common.getLocalOffset(new Date());
        const now = Date.now();
        id = functions_1.Common.toObjectId(id);
        const old_data = await this.model_obj.findById(id).exec();
        if (!old_data) {
            throw new common_1.NotFoundException(await this.i18n.translate('validations.not_exists', {
                args: { attribute: 'Id' },
            }));
        }
        if (options) {
            options.new = true;
        }
        const new_data = await this.model_obj
            .findByIdAndUpdate(id, data, options)
            .populate(populates)
            .exec();
        this.logger.log(`_findByIdAndUpdate->After... ${Date.now() - now}ms`);
        return new_data;
    }
    async _getAll(query, condition = {}, conditionKeyword = {}, lookup = [], sort = { created_at: -1 }, conditionKeywordAfter = {}, lookupAfter = []) {
        this.logger.log('_getAll->Before...0ms');
        const now = Date.now();
        const aggregate = [
            { $match: condition },
            ...lookup,
            { $match: conditionKeyword },
        ];
        const aggregateAfter = [{ $match: conditionKeywordAfter }];
        if (functions_1.Common.valueToBoolean(query.is_paging) == false) {
            let data;
            if (!_.isEmpty(sort)) {
                data = await this.read_model_obj.aggregate([
                    ...aggregate,
                    ...aggregateAfter,
                    { $sort: sort },
                    ...lookupAfter,
                ]);
            }
            else {
                data = await this.read_model_obj.aggregate([
                    ...aggregate,
                    ...aggregateAfter,
                    ...lookupAfter,
                ]);
            }
            this.logger.log(`After... ${Date.now() - now}ms`);
            return {
                data: data,
                meta: {
                    tota_items: data.length,
                },
            };
        }
        else {
            const per_page = query.per_page ? Number(query.per_page) : 20;
            const current_page = query.page && query.page > 0 ? Number(query.page) : 1;
            let data, countRecords, explain;
            if (!_.isEmpty(sort)) {
                [
                    data,
                    countRecords,
                ] = await Promise.all([
                    this.read_model_obj
                        .aggregate([
                        ...aggregate,
                        ...aggregateAfter,
                        { $sort: sort },
                        { $skip: (current_page - 1) * per_page },
                        { $limit: per_page },
                        ...lookupAfter,
                    ])
                        .allowDiskUse(true)
                        .exec(),
                    this.read_model_obj
                        .aggregate([
                        ...aggregate,
                        ...aggregateAfter,
                        { $group: { _id: null, count: { $sum: 1 } } },
                    ])
                        .allowDiskUse(true)
                        .exec(),
                ]);
            }
            else {
                [
                    data,
                    countRecords,
                ] = await Promise.all([
                    this.read_model_obj
                        .aggregate([
                        ...aggregate,
                        ...aggregateAfter,
                        { $skip: (current_page - 1) * per_page },
                        { $limit: per_page },
                        ...lookupAfter,
                    ])
                        .allowDiskUse(true)
                        .exec(),
                    this.read_model_obj
                        .aggregate([
                        ...aggregate,
                        ...aggregateAfter,
                        { $group: { _id: null, count: { $sum: 1 } } },
                    ])
                        .allowDiskUse(true)
                        .exec(),
                ]);
            }
            const total = countRecords.length > 0 ? countRecords[0].count : 0;
            this.logger.log(`_getAll->After... ${Date.now() - now}ms`);
            return {
                data: data,
                meta: {
                    per_page: Number(per_page),
                    current_page: Number(current_page),
                    tota_iItems: total,
                    total_pages: Number(total) % Number(per_page) == 0
                        ? Number(total) / Number(per_page)
                        : Math.ceil(Number(total) / Number(per_page)),
                },
                query,
            };
        }
    }
    async _delete(id) {
        this.logger.log('_delete->Before...0ms');
        const now = Date.now();
        id = functions_1.Common.toObjectId(id);
        const old_data = await this.read_model_obj.findById(id).exec();
        if (!old_data) {
            throw new common_1.NotFoundException(await this.i18n.translate('validations.not_exists', {
                args: { attribute: 'Id' },
            }));
        }
        const result = this.model_obj.findByIdAndRemove(id).exec();
        this.logger.log(`_delete->After... ${Date.now() - now}ms`);
        return result;
    }
    async _deleteMany(condition) {
        this.logger.log('_deleteMany->Before...0ms');
        const now = Date.now();
        condition = functions_1.Common.convertParamsToObjectId(condition);
        const result = await this.model_obj.deleteMany(condition).exec();
        this.logger.log(`_deleteMany->After... ${Date.now() - now}ms`);
        return result;
    }
    async _insertMany(condition) {
        this.logger.log('_insertMany->Before...0ms');
        const now = Date.now();
        condition = functions_1.Common.convertParamsToObjectId(condition);
        const result = await this.model_obj.insertMany(condition);
        this.logger.log(`_insertMany->After... ${Date.now() - now}ms`);
        return result;
    }
    async _updateMany(condition, payload) {
        this.logger.log('_insertMany->Before...0ms');
        const now = Date.now();
        payload.updated_at = functions_1.Common.getLocalOffset(new Date());
        condition = functions_1.Common.convertParamsToObjectId(condition);
        const result = await this.model_obj.updateMany(condition, payload).exec();
        this.logger.log(`_insertMany->After... ${Date.now() - now}ms`);
        return result;
    }
    _createIndexes() {
        this.model_obj.createIndexes();
    }
};
exports.BaseService = BaseService;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", typeof (_c = typeof nestjs_i18n_1.I18nService !== "undefined" && nestjs_i18n_1.I18nService) === "function" ? _c : Object)
], BaseService.prototype, "i18n", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", typeof (_d = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _d : Object)
], BaseService.prototype, "configService", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", typeof (_e = typeof event_emitter_1.EventEmitter2 !== "undefined" && event_emitter_1.EventEmitter2) === "function" ? _e : Object)
], BaseService.prototype, "eventEmitterT", void 0);
__decorate([
    (0, mongoose_2.InjectConnection)(enums_1.CONNECTION_NAME.PRIMARY),
    __metadata("design:type", typeof (_f = typeof mongoose_1.default !== "undefined" && mongoose_1.default.Connection) === "function" ? _f : Object)
], BaseService.prototype, "connection", void 0);
exports.BaseService = BaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _b : Object])
], BaseService);


/***/ }),
/* 143 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(10);
exports["default"] = {
    environment: process.env.EXPRESS_ENVIRONMENT,
    port: process.env.EXPRESS_PORT,
};


/***/ }),
/* 144 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.editFileName = exports.fileFilter = void 0;
const path_1 = __webpack_require__(12);
const moment = __webpack_require__(50);
const fileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|svg|png|pdf|doc|docx|xlsx|mp4|mkv|JPG|JPEG|SVG|PNG|PDF|DOC|DOCX|XLSX|MP4|MKV)$/)) {
        return callback(new Error('Không đúng định dạng hình ảnh hoặc tài liệu.'), false);
    }
    callback(null, true);
};
exports.fileFilter = fileFilter;
const editFileName = (req, file, callback) => {
    const randomName = Array(16)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    const newFileName = `${moment().format('YYYYMMDDHHmmss')}${randomName}${(0, path_1.extname)(file.originalname)}`;
    callback(null, newFileName);
};
exports.editFileName = editFileName;


/***/ }),
/* 145 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonQuery = void 0;
const moment = __webpack_require__(50);
const enums_1 = __webpack_require__(8);
const numberTypeInMongoDB = [
    enums_1.TYPE_MONGODB.INTERGER_32_BIT.KEY,
    enums_1.TYPE_MONGODB.INTERGER_64_BIT.KEY,
    enums_1.TYPE_MONGODB.DOUBLE.KEY,
    enums_1.TYPE_MONGODB.DECIMAL_128.KEY,
];
const dateTypeInMongoDB = enums_1.TYPE_MONGODB.DATE.KEY;
class CommonQuery {
    static handleFieldsEmptyBeforeLookup(handle_fields) {
        const new_fields_object = {};
        handle_fields?.map((handle_field) => {
            new_fields_object[handle_field] = {
                $cond: [
                    {
                        $ne: [{ $type: `$${handle_field}` }, enums_1.TYPE_MONGODB.MISSING.KEY],
                    },
                    `$${handle_field}`,
                    'STRING_PREVENT_MATCH',
                ],
            };
        });
        return {
            $addFields: new_fields_object,
        };
    }
}
exports.CommonQuery = CommonQuery;
CommonQuery.formatStartTime = (date) => {
    return new Date(moment(date).format(enums_1.ENUM_DATE_TIME.YYYY_MM_DD) +
        enums_1.ENUM_DATE_TIME.START_OFFSET);
};
CommonQuery.formatEndTime = (date) => {
    return new Date(moment(date).format(enums_1.ENUM_DATE_TIME.YYYY_MM_DD) +
        enums_1.ENUM_DATE_TIME.END_OFFSET);
};
CommonQuery.mapFieldArrayInObject = (new_field, array_name, focus_field, option) => {
    const is_union = option.is_union || false;
    const action_reduce = is_union ? '$setUnion' : '$concatArrays';
    return {
        $addFields: {
            [`${new_field}`]: {
                $cond: [
                    {
                        $isArray: `$${array_name}`,
                    },
                    {
                        $reduce: {
                            input: `$${array_name}`,
                            initialValue: [],
                            in: {
                                [`${action_reduce}`]: ['$$value', [`$$this.${focus_field}`]],
                            },
                        },
                    },
                    [],
                ],
            },
        },
    };
};
CommonQuery.mapFieldByConditionOfArrayInObject = (new_field, array_name, focus_field, condition_object, option) => {
    const is_union = option.is_union || false;
    const action_reduce = is_union ? '$setUnion' : '$concatArrays';
    return {
        $addFields: {
            [`${new_field}`]: {
                $cond: [
                    {
                        $isArray: `$${array_name}`,
                    },
                    {
                        $reduce: {
                            input: `$${array_name}`,
                            initialValue: [],
                            in: {
                                $cond: [
                                    condition_object,
                                    {
                                        [`${action_reduce}`]: [
                                            '$$value',
                                            {
                                                $cond: [
                                                    {
                                                        $ifNull: [`$$this.${focus_field}`, false],
                                                    },
                                                    [`$$this.${focus_field}`],
                                                    [],
                                                ],
                                            },
                                        ],
                                    },
                                    '$$value',
                                ],
                            },
                        },
                    },
                    [],
                ],
            },
        },
    };
};
CommonQuery.flattenMultiArray = (new_field, array_name, option) => {
    const is_union = option.is_union || false;
    const action_flatten = is_union ? '$setUnion' : '$concatArrays';
    return {
        $addFields: {
            [`${new_field}`]: {
                $cond: [
                    {
                        $isArray: `$${array_name}`,
                    },
                    {
                        $reduce: {
                            input: `$${array_name}`,
                            initialValue: [],
                            in: {
                                $cond: [
                                    { $isArray: '$$this' },
                                    {
                                        [`${action_flatten}`]: ['$$value', '$$this'],
                                    },
                                    '$$value',
                                ],
                            },
                        },
                    },
                    [],
                ],
            },
        },
    };
};
CommonQuery.lengthOfArray = (array_name, new_field = '') => {
    const length_stage = {
        $cond: [
            {
                $isArray: `$${array_name}`,
            },
            {
                $size: `$${array_name}`,
            },
            0,
        ],
    };
    if (new_field) {
        return {
            $addFields: {
                [`${new_field}`]: length_stage,
            },
        };
    }
    return {
        $sum: length_stage,
    };
};
CommonQuery.sumValueFieldOfArrayInObject = (array_name, field_sum, new_field = '') => {
    const sum_stage = {
        $sum: {
            $cond: [
                {
                    $isArray: `$${array_name}`,
                },
                `$${array_name}.${field_sum}`,
                0,
            ],
        },
    };
    if (new_field) {
        return {
            $addFields: {
                [`${new_field}`]: sum_stage,
            },
        };
    }
    return sum_stage;
};
CommonQuery.findMaxValueOfArrayInObject = (new_field, forcus_field) => {
    return {
        $addFields: {
            [`${new_field}`]: {
                $max: `$${forcus_field}`,
            },
        },
    };
};
CommonQuery.findMinValueOfArrayInObject = (new_field, forcus_field) => {
    return {
        $addFields: {
            [`${new_field}`]: {
                $min: `$${forcus_field}`,
            },
        },
    };
};
CommonQuery.sumValueByConditionOfArrayInObject = (array_in_object, new_field, forcus_field, init_value, condition_object) => {
    return {
        $addFields: {
            [`${new_field}`]: {
                $reduce: {
                    input: `$${array_in_object}`,
                    initialValue: init_value,
                    in: {
                        $cond: [
                            condition_object,
                            {
                                $sum: [`$$this.${forcus_field}`, '$$value'],
                            },
                            '$$value',
                        ],
                    },
                },
            },
        },
    };
};
CommonQuery.countByConditionOfArrayInObject = (array_in_object, new_field, as_field, condition_object) => {
    return {
        $addFields: {
            [`${new_field}`]: {
                $size: {
                    $cond: [
                        {
                            $isArray: `$${array_in_object}`,
                        },
                        {
                            $filter: {
                                input: `$${array_in_object}`,
                                as: `${as_field}`,
                                cond: condition_object,
                            },
                        },
                        [],
                    ],
                },
            },
        },
    };
};
CommonQuery.groupByConditionOfArrayInObject = (array_in_object, new_field, init_value, as_field = 'map_value', condition_object_reduce, condition_object_map, return_object_map) => {
    return {
        $addFields: {
            [`${new_field}`]: {
                $reduce: {
                    input: `$${array_in_object}`,
                    initialValue: init_value,
                    in: {
                        $cond: [
                            condition_object_reduce,
                            {
                                $map: {
                                    input: '$$value',
                                    as: `${as_field}`,
                                    in: {
                                        $cond: [
                                            condition_object_map,
                                            return_object_map,
                                            `$$${as_field}`,
                                        ],
                                    },
                                },
                            },
                            {
                                $concatArrays: ['$$value', ['$$this']],
                            },
                        ],
                    },
                },
            },
        },
    };
};
CommonQuery.lookupPipelineTemplate = (from, letObject = {}, matchExpressions = [], matchFields = {}, pipelineAfterMatchs = [], as_field) => {
    return {
        $lookup: {
            from: `${from}`,
            let: {
                ...letObject,
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [...matchExpressions],
                        },
                        ...matchFields,
                    },
                },
                ...pipelineAfterMatchs,
            ],
            as: `${as_field}`,
        },
    };
};
CommonQuery.addField = (new_field, variable) => {
    return {
        $addFields: {
            [`${new_field}`]: `$${variable}`,
        },
    };
};
CommonQuery.addFields = (object_fields) => {
    const new_fields_object = {};
    Object.keys(object_fields)?.map((key) => {
        new_fields_object[key] = `$${object_fields[key]}`;
    });
    return {
        $addFields: new_fields_object,
    };
};
CommonQuery.addFieldsWithCondition = (object_fields) => {
    const new_fields_object = {};
    Object.keys(object_fields)?.map((key) => {
        new_fields_object[key] = object_fields[key];
    });
    return {
        $addFields: new_fields_object,
    };
};
CommonQuery.roundNumber = (number_field, option) => {
    const round = option?.round || 0;
    return {
        $cond: [
            {
                $in: [{ $type: `$${number_field}` }, numberTypeInMongoDB],
            },
            {
                $round: [`$${number_field}`, round],
            },
            `$${number_field}`,
        ],
    };
};
CommonQuery.convertNumberWithWeight = (convert_value, weight = 1, option) => {
    const round = option?.round || null;
    return {
        $addFields: {
            [`${convert_value}`]: {
                $cond: [
                    {
                        $and: [
                            {
                                $in: [{ $type: `$${convert_value}` }, numberTypeInMongoDB],
                            },
                            {
                                $in: [{ $type: weight }, numberTypeInMongoDB],
                            },
                            { $ifNull: [`$${convert_value}`, false] },
                        ],
                    },
                    {
                        $cond: [
                            { $ne: [round, null] },
                            {
                                $round: [
                                    {
                                        $multiply: [`$${convert_value}`, weight],
                                    },
                                    round,
                                ],
                            },
                            { $multiply: [`$${convert_value}`, weight] },
                        ],
                    },
                    null,
                ],
            },
        },
    };
};
CommonQuery.calculateAddTwoField = (new_field, number_1, number_2) => {
    return {
        $addFields: {
            [`${new_field}`]: {
                $cond: [
                    {
                        $and: [
                            {
                                $in: [
                                    { $type: `$${number_1}` },
                                    [...numberTypeInMongoDB, dateTypeInMongoDB],
                                ],
                            },
                            {
                                $in: [
                                    { $type: `$${number_2}` },
                                    [...numberTypeInMongoDB, dateTypeInMongoDB],
                                ],
                            },
                        ],
                    },
                    {
                        $add: [`$${number_1}`, `$${number_2}`],
                    },
                    null,
                ],
            },
        },
    };
};
CommonQuery.calculateSubtractTwoField = (new_field, minus, subtrahend) => {
    return {
        $addFields: {
            [`${new_field}`]: {
                $cond: [
                    {
                        $and: [
                            {
                                $in: [
                                    { $type: `$${minus}` },
                                    [...numberTypeInMongoDB, dateTypeInMongoDB],
                                ],
                            },
                            {
                                $in: [
                                    { $type: `$${subtrahend}` },
                                    [...numberTypeInMongoDB, dateTypeInMongoDB],
                                ],
                            },
                        ],
                    },
                    {
                        $subtract: [`$${minus}`, `$${subtrahend}`],
                    },
                    null,
                ],
            },
        },
    };
};
CommonQuery.calculateAverage = (new_field, numerator, denominator, option) => {
    const round = option?.round || null;
    return {
        $addFields: {
            [`${new_field}`]: {
                $cond: [
                    {
                        $and: [
                            {
                                $in: [{ $type: `$${numerator}` }, numberTypeInMongoDB],
                            },
                            {
                                $in: [{ $type: `$${denominator}` }, numberTypeInMongoDB],
                            },
                            { $ne: [`$${denominator}`, 0] },
                        ],
                    },
                    {
                        $cond: [
                            { $ne: [round, null] },
                            {
                                $round: [
                                    {
                                        $divide: [`$${numerator}`, { $abs: `$${denominator}` }],
                                    },
                                    round,
                                ],
                            },
                            {
                                $divide: [`$${numerator}`, { $abs: `$${denominator}` }],
                            },
                        ],
                    },
                    null,
                ],
            },
        },
    };
};
CommonQuery.calculatePercent = (new_field, numerator, denominator, option) => {
    const round = option?.round || null;
    return {
        $addFields: {
            [`${new_field}`]: {
                $cond: [
                    {
                        $and: [
                            {
                                $in: [{ $type: `$${numerator}` }, numberTypeInMongoDB],
                            },
                            {
                                $in: [{ $type: `$${denominator}` }, numberTypeInMongoDB],
                            },
                            { $ne: [`$${denominator}`, 0] },
                        ],
                    },
                    {
                        $cond: [
                            { $ne: [round, null] },
                            {
                                $round: [
                                    {
                                        $multiply: [
                                            {
                                                $divide: [`$${numerator}`, `$${denominator}`],
                                            },
                                            100,
                                        ],
                                    },
                                    round,
                                ],
                            },
                            {
                                $multiply: [
                                    {
                                        $divide: [`$${numerator}`, `$${denominator}`],
                                    },
                                    100,
                                ],
                            },
                        ],
                    },
                    null,
                ],
            },
        },
    };
};
CommonQuery.setHoursToDate = (new_field, date_field, time_field) => {
    if (!date_field)
        date_field = '$NOW';
    const convert_date_to_string = {
        $dateToString: {
            date: `$${date_field}`,
            format: '%Y-%m-%d',
            timezone: 'Asia/Ho_Chi_Minh',
        },
    };
    return {
        $addFields: {
            [`${new_field}`]: {
                $dateFromString: {
                    dateString: {
                        $concat: [convert_date_to_string, 'T', `$${time_field}`],
                    },
                    format: '%Y-%m-%dT%H:%M:%S',
                    timezone: 'Asia/Ho_Chi_Minh',
                    onError: null,
                },
            },
        },
    };
};
CommonQuery.compareTwoValueToGreaterThan = (new_field, field_one, field_two, compare_type) => {
    return {
        $addFields: {
            [`${new_field}`]: {
                $switch: {
                    branches: [
                        {
                            case: { $eq: [`${compare_type}`, 'number'] },
                            then: {
                                $cond: [
                                    {
                                        $and: [
                                            {
                                                $in: [
                                                    {
                                                        $type: `$${field_one}`,
                                                    },
                                                    numberTypeInMongoDB,
                                                ],
                                            },
                                            {
                                                $in: [
                                                    {
                                                        $type: `$${field_two}`,
                                                    },
                                                    numberTypeInMongoDB,
                                                ],
                                            },
                                            {
                                                $gt: [`$${field_one}`, `$${field_two}`],
                                            },
                                        ],
                                    },
                                    1,
                                    0,
                                ],
                            },
                        },
                        {
                            case: { $eq: [`${compare_type}`, 'date'] },
                            then: {
                                $cond: [
                                    {
                                        $and: [
                                            {
                                                $eq: [
                                                    {
                                                        $type: `$${field_one}`,
                                                    },
                                                    dateTypeInMongoDB,
                                                ],
                                            },
                                            {
                                                $eq: [
                                                    {
                                                        $type: `$${field_two}`,
                                                    },
                                                    dateTypeInMongoDB,
                                                ],
                                            },
                                            {
                                                $gt: [`$${field_one}`, `$${field_two}`],
                                            },
                                        ],
                                    },
                                    1,
                                    0,
                                ],
                            },
                        },
                    ],
                    default: 0,
                },
            },
        },
    };
};


/***/ }),
/* 146 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(147), exports);
__exportStar(__webpack_require__(148), exports);


/***/ }),
/* 147 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseResponseEntity = void 0;
const swagger_1 = __webpack_require__(3);
class BaseResponseEntity {
    constructor(object) {
        this._id = object?._id;
        this.status = object?.status;
        this.created_at = object?.created_at;
        this.created_by = object?.created_by;
        this.updated_at = object?.updated_at;
        this.updated_by = object?.updated_by;
    }
}
exports.BaseResponseEntity = BaseResponseEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Id',
        example: '5f7d28d11f992e1359a007f9',
    }),
    __metadata("design:type", Object)
], BaseResponseEntity.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Trạng thái',
        example: 'ACTIVE',
    }),
    __metadata("design:type", String)
], BaseResponseEntity.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: Date,
        description: 'Ngày tạo',
        example: '2020-10-07 02:32:49.299Z',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BaseResponseEntity.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Ngày update',
        example: '2020-10-07 02:32:49.299Z',
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], BaseResponseEntity.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        example: [
            {
                _id: '5f8e4f8a266d7225a5da3c86',
                name: 'Nguyễn văn A',
            },
        ],
        description: 'User tạo Id',
    }),
    __metadata("design:type", Object)
], BaseResponseEntity.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        example: [
            {
                _id: '5f8e4f8a266d7225a5da3c86',
                name: 'Nguyễn văn A',
            },
        ],
        description: 'User Cập nhật Id',
    }),
    __metadata("design:type", Object)
], BaseResponseEntity.prototype, "updated_by", void 0);


/***/ }),
/* 148 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseCreateEntity = void 0;
const swagger_1 = __webpack_require__(3);
class BaseCreateEntity {
    constructor(object) {
        this.status = object?.status;
        this.created_at = object?.created_at;
        this.created_by = object?.created_by;
        this.updated_at = object?.updated_at;
        this.updated_by = object?.updated_by;
    }
}
exports.BaseCreateEntity = BaseCreateEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Trạng thái',
        example: 'ACTIVE',
    }),
    __metadata("design:type", String)
], BaseCreateEntity.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: Date,
        description: 'Ngày tạo',
        example: '2020-10-07 02:32:49.299Z',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BaseCreateEntity.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Ngày update',
        example: '2020-10-07 02:32:49.299Z',
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], BaseCreateEntity.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        example: [
            {
                _id: '5f8e4f8a266d7225a5da3c86',
                name: 'Nguyễn văn A',
            },
        ],
        description: 'User tạo Id',
    }),
    __metadata("design:type", Object)
], BaseCreateEntity.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        example: [
            {
                _id: '5f8e4f8a266d7225a5da3c86',
                name: 'Nguyễn văn A',
            },
        ],
        description: 'User Cập nhật Id',
    }),
    __metadata("design:type", Object)
], BaseCreateEntity.prototype, "updated_by", void 0);


/***/ }),
/* 149 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(150), exports);


/***/ }),
/* 150 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateCacheKey = generateCacheKey;
exports.setKey = setKey;
exports.getKey = getKey;
exports.generateSettingCacheKey = generateSettingCacheKey;
const shared_1 = __webpack_require__(32);
__webpack_require__(10);
const enums_1 = __webpack_require__(8);
const functions_1 = __webpack_require__(131);
async function generateCacheKey(query, model_name, function_name) {
    if (model_name == null) {
        return `${enums_1.REDIS_NAME_ENUM.SPONSOR_REDIS}:`.toLocaleLowerCase();
    }
    const keyValuePair = Object.entries(functions_1.Common.detectNullToObject(query));
    keyValuePair.sort((first, second) => (first[0] < second[0] ? -1 : 1));
    let key_name = '';
    for (let [key, value] of keyValuePair) {
        if (typeof value == 'object') {
            value = JSON.stringify(value, shared_1.replacer);
        }
        key_name += (key_name ? '&' : '') + `${key}=${value}`;
    }
    const companyName = query.company ? '-' + query.company : '';
    return `${enums_1.REDIS_NAME_ENUM.SPONSOR_REDIS}:${model_name}-${function_name}${companyName}-${key_name}`.toLocaleLowerCase();
}
async function setKey(cache_manager, key = undefined, value, logger, ttl) {
    if (!key)
        return undefined;
    if (!ttl) {
        ttl =
            Number(process.env.TTL_KEY_CACHE_SECOND) ||
                Number(enums_1.TIME_IN_SECONDS.FIVE_MINUTE);
    }
    logger.log(`setKey->key: ${key}, ttl: ${ttl}`);
    try {
        await cache_manager.set(key, JSON.stringify(value), ttl);
        return true;
    }
    catch (error) {
        logger.error(`setKey->message: ${error.message}`);
    }
    return undefined;
}
async function getKey(cache_manager, key = undefined, logger) {
    logger.debug(`getKey->key: ${key}`);
    if (!key)
        return undefined;
    try {
        const result = await cache_manager.get(key);
        return result ? JSON.parse(result) : undefined;
    }
    catch (error) {
        logger.error(`getKey->message: ${error.message}`);
    }
    return undefined;
}
async function generateSettingCacheKey(query, model_name, function_name) {
    if (model_name == null) {
        return `${enums_1.REDIS_NAME_ENUM.SPONSOR_REDIS}:`.toLocaleLowerCase();
    }
    let key_name = '';
    if (query.key) {
        key_name = '-' + query.key;
    }
    else if (query.keys) {
        key_name = '-' + query.keys.sort().toString();
    }
    const methodName = query.cache_method_name
        ? '-' + query.cache_method_name
        : '';
    const objectType = query.object_type ? '-' + query.object_type : '';
    return `${enums_1.REDIS_NAME_ENUM.SPONSOR_REDIS}:${model_name}-${function_name}${methodName}${objectType}${key_name}`.toLocaleLowerCase();
}


/***/ }),
/* 151 */
/***/ ((module) => {

module.exports = require("compression");

/***/ }),
/* 152 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 153 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(28);
const shared_1 = __webpack_require__(32);
const auth_controller_1 = __webpack_require__(154);
const jwt_config_module_1 = __webpack_require__(126);
const repository_module_1 = __webpack_require__(190);
const group_controller_1 = __webpack_require__(297);
const user_controller_1 = __webpack_require__(299);
const master_data_controller_1 = __webpack_require__(300);
const upload_controller_1 = __webpack_require__(301);
const attribute_hashtag_controller_1 = __webpack_require__(306);
const sponsor_controller_1 = __webpack_require__(307);
const attribute_cast_controller_1 = __webpack_require__(311);
const attribute_category_controller_1 = __webpack_require__(312);
const attribute_platform_controller_1 = __webpack_require__(313);
const attribute_controller_1 = __webpack_require__(314);
const attribute_budget_range_controller_1 = __webpack_require__(315);
const attribute_sponsorship_benefit_controller_1 = __webpack_require__(316);
const attribute_sponsorship_form_controller_1 = __webpack_require__(317);
const setting_controller_1 = __webpack_require__(318);
const attribute_cast_profession_controller_1 = __webpack_require__(324);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [shared_1.CoreModule, jwt_config_module_1.JwtConfigModule, repository_module_1.RepositoryModule],
        controllers: [
            auth_controller_1.AuthController,
            group_controller_1.GroupController,
            user_controller_1.UserController,
            master_data_controller_1.MasterDataController,
            upload_controller_1.UploadController,
            attribute_controller_1.AttributeController,
            attribute_budget_range_controller_1.AttributeBudgetRangeController,
            attribute_hashtag_controller_1.AttributeHashTagController,
            attribute_cast_controller_1.AttributeCastController,
            attribute_cast_profession_controller_1.AttributeCastProfessionController,
            attribute_category_controller_1.AttributeCategoryController,
            attribute_platform_controller_1.AttributePlatformController,
            attribute_sponsorship_benefit_controller_1.AttributeSponsorshipBenefitController,
            attribute_sponsorship_form_controller_1.AttributeSponsorshipFormController,
            sponsor_controller_1.SponsorController,
            setting_controller_1.SettingController,
        ],
        providers: [],
    })
], AppModule);


/***/ }),
/* 154 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(1);
const shared_1 = __webpack_require__(32);
const jwt_strategy_1 = __webpack_require__(76);
const common_2 = __webpack_require__(28);
const swagger_1 = __webpack_require__(3);
const base_auth_dto_1 = __webpack_require__(155);
const error_constant_1 = __webpack_require__(78);
const blacklist_service_1 = __webpack_require__(156);
const session_service_1 = __webpack_require__(157);
const user_service_1 = __webpack_require__(159);
const jwt_interface_1 = __webpack_require__(187);
const permission_constant_1 = __webpack_require__(185);
const _ = __webpack_require__(44);
const user_dto_1 = __webpack_require__(188);
let AuthController = class AuthController extends common_1.BaseController {
    constructor(jwtStrategy, blacklistService, sessionService, userService) {
        super();
        this.jwtStrategy = jwtStrategy;
        this.blacklistService = blacklistService;
        this.sessionService = sessionService;
        this.userService = userService;
    }
    async authenticate(payload) {
        try {
            payload.type = common_1.ACCOUNT_TYPE.ADMIN;
            const response = await this.userService.authenticate(payload);
            return await this.returnResponse(response, common_1.RESPONSE.GET);
        }
        catch (error) {
            this.logger.error(`authenticate=>ROOT CAUSE: ${JSON.stringify(error?.message ?? error)}`);
            if (error instanceof common_2.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async refreshAccessToken(payload) {
        try {
            const { is_revoked, value } = await this.blacklistService.checkTokenStatus(payload.refresh_token, true);
            if (is_revoked) {
                (0, shared_1.throwErrorMessage)({ error_code: error_constant_1.ERROR_CODE.AUTH.UNAUTHORIZED }, common_2.HttpStatus.UNAUTHORIZED);
            }
            const response = await this.userService.refreshToken(payload, value);
            return await this.returnResponse(response, common_1.RESPONSE.GET);
        }
        catch (error) {
            this.logger.error(`refreshAccessToken=>ROOT CAUSE: ${JSON.stringify(error?.message ?? error)}`);
            if (error instanceof common_2.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async logout(payload) {
        try {
            const { is_revoked, value } = await this.blacklistService.checkTokenStatus(payload.refresh_token, true);
            if (is_revoked) {
                (0, shared_1.throwErrorMessage)({ error_code: error_constant_1.ERROR_CODE.AUTH.UNAUTHORIZED }, common_2.HttpStatus.UNAUTHORIZED);
            }
            await this.userService.logout(value);
            return await this.returnResponse(true, common_1.RESPONSE.GET);
        }
        catch (error) {
            this.logger.error(`logout=>ROOT CAUSE: ${JSON.stringify(error?.message ?? error)}`);
            if (error instanceof common_2.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async getProfile(user) {
        try {
            const response = await this.userService.getInformation(user.sub);
            if (common_1.Common.compareValues(response.type, common_1.ACCOUNT_TYPE.ADMIN)) {
                const menus = [];
                permission_constant_1.PERMISSION_FRAME.map((element) => {
                    const values = element.values.map((i) => i.value);
                    const matches = _.intersection(values, user.permissions);
                    if (matches?.length) {
                        menus.push(element);
                    }
                });
                response.menus = menus;
            }
            return await this.returnResponse(response, common_1.RESPONSE.GET);
        }
        catch (error) {
            this.logger.error(`getProfile=>ROOT CAUSE: ${JSON.stringify(error?.message ?? error)}`);
            if (error instanceof common_2.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async resetPassword(payload) {
        try {
            const response = await this.userService.resetPasswordByEmail(payload);
            return this.returnResponse(response, common_1.RESPONSE.UPDATE);
        }
        catch (error) {
            if (error instanceof common_2.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async forgotPassword(payload) {
        try {
            payload.type = common_1.ACCOUNT_TYPE.ADMIN;
            const response = await this.userService.forgotPassword(payload);
            return this.returnResponse(response, common_1.RESPONSE.UPDATE);
        }
        catch (error) {
            if (error instanceof common_2.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async verifyResetEmailSession(query) {
        try {
            const response = await this.userService.verifyEmailSessionCode(query.code);
            return this.returnResponse(response, common_1.RESPONSE.UPDATE);
        }
        catch (error) {
            if (error instanceof common_2.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async updateProfile(user, payload) {
        try {
            const response = await this.userService.updateProfile(user.sub, payload);
            return await this.returnResponse(response, common_1.RESPONSE.UPDATE);
        }
        catch (error) {
            this.logger.error(`update=>ROOT CAUSE: ${JSON.stringify(error?.message ?? error)}`);
            if (error instanceof common_2.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async updateProfilePassword(user, payload) {
        try {
            const response = await this.userService.updateProfilePasword(user.sub, payload);
            return await this.returnResponse(response, common_1.RESPONSE.UPDATE);
        }
        catch (error) {
            this.logger.error(`update=>ROOT CAUSE: ${JSON.stringify(error?.message ?? error)}`);
            if (error instanceof common_2.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_2.Post)('login'),
    (0, common_2.UsePipes)(new common_2.ValidationPipe({ transform: true, whitelist: true })),
    (0, swagger_1.ApiOperation)({ summary: 'Login Authenicate Account' }),
    (0, shared_1.Unprotected)(true),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof base_auth_dto_1.BaseAuthenticateRequestDTO !== "undefined" && base_auth_dto_1.BaseAuthenticateRequestDTO) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "authenticate", null);
__decorate([
    (0, common_2.Put)('refresh-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Refresh Access Token' }),
    (0, common_2.UsePipes)(new common_2.ValidationPipe({ transform: true, whitelist: true })),
    (0, shared_1.Unprotected)(true),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof base_auth_dto_1.BaseRefreshTokenRequestDTO !== "undefined" && base_auth_dto_1.BaseRefreshTokenRequestDTO) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshAccessToken", null);
__decorate([
    (0, common_2.Post)('logout'),
    (0, common_2.UsePipes)(new common_2.ValidationPipe({ transform: true, whitelist: true })),
    (0, swagger_1.ApiOperation)({ summary: 'Logout Account Session' }),
    (0, shared_1.Unprotected)(true),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof base_auth_dto_1.BaseLogoutRequestDTO !== "undefined" && base_auth_dto_1.BaseLogoutRequestDTO) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_2.Get)('profile'),
    (0, shared_1.OnlyVerify)(true),
    __param(0, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _h : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_2.Put)('reset-password'),
    (0, common_2.UsePipes)(new common_2.ValidationPipe({ transform: true, whitelist: true })),
    (0, swagger_1.ApiOperation)({ summary: 'Update Account Password (ONLY ADMIN SERVICE)' }),
    (0, shared_1.Unprotected)(),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof user_dto_1.ResetPasswordDTO !== "undefined" && user_dto_1.ResetPasswordDTO) === "function" ? _j : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_2.Put)('forgot-password'),
    (0, common_2.UsePipes)(new common_2.ValidationPipe({ transform: true, whitelist: true })),
    (0, shared_1.Unprotected)(),
    (0, swagger_1.ApiOperation)({ summary: 'Forgot Password From Email Request' }),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof user_dto_1.ForgotPasswordDTO !== "undefined" && user_dto_1.ForgotPasswordDTO) === "function" ? _k : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_2.Put)('session/verify'),
    (0, common_2.UsePipes)(new common_2.ValidationPipe({ transform: true, whitelist: true })),
    (0, shared_1.Unprotected)(),
    (0, swagger_1.ApiOperation)({ summary: 'Verify Reset Email Session' }),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof user_dto_1.VerifyEmailSessionDTO !== "undefined" && user_dto_1.VerifyEmailSessionDTO) === "function" ? _l : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyResetEmailSession", null);
__decorate([
    (0, common_2.Put)('profile/update'),
    (0, shared_1.OnlyVerify)(true),
    __param(0, (0, shared_1.User)()),
    __param(1, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _m : Object, typeof (_o = typeof user_dto_1.UpdateProfileDTO !== "undefined" && user_dto_1.UpdateProfileDTO) === "function" ? _o : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateProfile", null);
__decorate([
    (0, common_2.Put)('profile/update-password'),
    (0, shared_1.OnlyVerify)(true),
    __param(0, (0, shared_1.User)()),
    __param(1, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_p = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _p : Object, typeof (_q = typeof user_dto_1.ResetPasswordDTO !== "undefined" && user_dto_1.ResetPasswordDTO) === "function" ? _q : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateProfilePassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_2.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_strategy_1.JwtConfigStrategy !== "undefined" && jwt_strategy_1.JwtConfigStrategy) === "function" ? _a : Object, typeof (_b = typeof blacklist_service_1.BlacklistService !== "undefined" && blacklist_service_1.BlacklistService) === "function" ? _b : Object, typeof (_c = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" ? _c : Object, typeof (_d = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _d : Object])
], AuthController);


/***/ }),
/* 155 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseLogoutRequestDTO = exports.BaseRefreshTokenRequestDTO = exports.BaseAuthenticateRequestDTO = void 0;
const swagger_1 = __webpack_require__(3);
const class_transformer_1 = __webpack_require__(27);
const class_validator_1 = __webpack_require__(7);
const _ = __webpack_require__(44);
const enums_1 = __webpack_require__(8);
class BaseAuthenticateRequestDTO {
}
exports.BaseAuthenticateRequestDTO = BaseAuthenticateRequestDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'Username',
        required: true,
        example: 'toan.pham',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => _.trim(value)),
    __metadata("design:type", String)
], BaseAuthenticateRequestDTO.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'Password',
        required: true,
        example: 'Toan23123@!',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => _.trim(value)),
    __metadata("design:type", String)
], BaseAuthenticateRequestDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.ACCOUNT_TYPE),
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", String)
], BaseAuthenticateRequestDTO.prototype, "type", void 0);
class BaseRefreshTokenRequestDTO {
}
exports.BaseRefreshTokenRequestDTO = BaseRefreshTokenRequestDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Refresh Token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCIgO...',
        required: true,
    }),
    __metadata("design:type", String)
], BaseRefreshTokenRequestDTO.prototype, "refresh_token", void 0);
class BaseLogoutRequestDTO extends BaseRefreshTokenRequestDTO {
}
exports.BaseLogoutRequestDTO = BaseLogoutRequestDTO;


/***/ }),
/* 156 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BlacklistService = void 0;
const mongoose_1 = __webpack_require__(80);
const _ = __webpack_require__(44);
const mongoose_2 = __webpack_require__(52);
const common_1 = __webpack_require__(28);
const common_2 = __webpack_require__(1);
const blacklist_schema_1 = __webpack_require__(81);
const jwt_enum_1 = __webpack_require__(17);
const shared_1 = __webpack_require__(32);
const jwt_strategy_1 = __webpack_require__(76);
let BlacklistService = class BlacklistService extends common_2.BaseService {
    constructor(model, readModel, cacheService, jwtStrategy) {
        super(model, readModel);
        this.model = model;
        this.readModel = readModel;
        this.cacheService = cacheService;
        this.jwtStrategy = jwtStrategy;
        this.model_name = common_2.ENUM_MODEL.BLACKLIST;
    }
    async handleBlackListTokens(records, types) {
        if (records?.length) {
            const cachePromises = [];
            const entities = records.reduce((result, record) => {
                if (types.includes(jwt_enum_1.TOKEN_TYPE.BEARER)) {
                    const ttl = common_2.Common.calculateTTLSeconds(record.access_token_expired_at);
                    if (ttl > 0) {
                        const item = {
                            token: record.access_token,
                            expire_at: record.access_token_expired_at,
                            type: jwt_enum_1.TOKEN_TYPE.BEARER,
                        };
                        result.push(item);
                        const cacheKey = shared_1.REDIS_KEY_PATTERNS.BLACKLIST(record.access_token);
                        cachePromises.push(this.cacheService.set(cacheKey, true, { ttl }));
                    }
                }
                if (types.includes(jwt_enum_1.TOKEN_TYPE.REFRESH)) {
                    const ttl = common_2.Common.calculateTTLSeconds(record.refresh_token_expired_at);
                    if (ttl > 0) {
                        const item = {
                            token: record.refresh_token,
                            expire_at: record.refresh_token_expired_at,
                            type: jwt_enum_1.TOKEN_TYPE.REFRESH,
                        };
                        result.push(item);
                        const cacheKey = shared_1.REDIS_KEY_PATTERNS.BLACKLIST(record.refresh_token);
                        cachePromises.push(this.cacheService.set(cacheKey, true, { ttl }));
                    }
                }
                return result;
            }, []);
            await this._insertMany(entities);
            const chunkPromises = _.chunk(cachePromises, 20);
            for (const chunk of chunkPromises) {
                await Promise.all(chunk);
            }
        }
    }
    async checkTokenStatus(token, isVerify = true) {
        const result = {
            is_revoked: false,
        };
        if (isVerify) {
            result.value = await this.jwtStrategy.validate(token);
        }
        let cachedToken = false;
        try {
            const cacheKey = shared_1.REDIS_KEY_PATTERNS.BLACKLIST(this._initializeRequestToken(token));
            cachedToken = await this.cacheService.timeoutGet(cacheKey, 1000);
        }
        catch (error) {
            this.logger.error(`ERROR ON GET REDIS CACHED BLACKLIST ${error}`);
            const foundToken = (await this._findOne({ token }));
            this.logger.log(`FIND TOKEN IN DB BLACKLIST`);
            result.is_revoked = !foundToken ? false : true;
            return result;
        }
        result.is_revoked = !cachedToken ? false : true;
        return result;
    }
    _initializeRequestToken(authorization) {
        return authorization?.indexOf('Bearer') != -1
            ? authorization?.split(' ')[1]
            : authorization;
    }
};
exports.BlacklistService = BlacklistService;
exports.BlacklistService = BlacklistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(blacklist_schema_1.Blacklist.name, common_2.CONNECTION_NAME.PRIMARY)),
    __param(1, (0, mongoose_1.InjectModel)(blacklist_schema_1.Blacklist.name, common_2.CONNECTION_NAME.SECONDARY)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object, typeof (_c = typeof shared_1.CacheService !== "undefined" && shared_1.CacheService) === "function" ? _c : Object, typeof (_d = typeof jwt_strategy_1.JwtConfigStrategy !== "undefined" && jwt_strategy_1.JwtConfigStrategy) === "function" ? _d : Object])
], BlacklistService);


/***/ }),
/* 157 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SessionService = void 0;
const mongoose_1 = __webpack_require__(80);
const mongoose_2 = __webpack_require__(52);
const common_1 = __webpack_require__(28);
const common_2 = __webpack_require__(1);
const session_schema_1 = __webpack_require__(158);
let SessionService = class SessionService extends common_2.BaseService {
    constructor(model, readModel) {
        super(model, readModel);
        this.model = model;
        this.readModel = readModel;
        this.model_name = common_2.ENUM_MODEL.SESSION;
    }
};
exports.SessionService = SessionService;
exports.SessionService = SessionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(session_schema_1.Session.name, common_2.CONNECTION_NAME.PRIMARY)),
    __param(1, (0, mongoose_1.InjectModel)(session_schema_1.Session.name, common_2.CONNECTION_NAME.SECONDARY)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], SessionService);


/***/ }),
/* 158 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SessionSchema = exports.Session = void 0;
const shared_1 = __webpack_require__(32);
const mongoose_1 = __webpack_require__(80);
const mongoose_2 = __webpack_require__(52);
let Session = class Session {
};
exports.Session = Session;
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        required: true,
        ref: shared_1.User.name,
        index: true,
    }),
    __metadata("design:type", typeof (_c = typeof mongoose_2.default !== "undefined" && (_a = mongoose_2.default.Schema) !== void 0 && (_b = _a.Types) !== void 0 && _b.ObjectId) === "function" ? _c : Object)
], Session.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        index: true,
    }),
    __metadata("design:type", String)
], Session.prototype, "access_token", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        timezone: 'Asia/Ho_Chi_Minh',
        required: true,
    }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], Session.prototype, "access_token_expired_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        index: true,
    }),
    __metadata("design:type", String)
], Session.prototype, "refresh_token", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        timezone: 'Asia/Ho_Chi_Minh',
        required: true,
    }),
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], Session.prototype, "refresh_token_expired_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        required: true,
        default: false,
    }),
    __metadata("design:type", Boolean)
], Session.prototype, "is_revoked", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: shared_1.User.name,
        default: null,
    }),
    __metadata("design:type", typeof (_h = typeof mongoose_2.default !== "undefined" && (_f = mongoose_2.default.Schema) !== void 0 && (_g = _f.Types) !== void 0 && _g.ObjectId) === "function" ? _h : Object)
], Session.prototype, "revoked_by", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        default: Date.now,
        timezone: 'Asia/Ho_Chi_Minh',
        required: true,
    }),
    __metadata("design:type", typeof (_j = typeof Date !== "undefined" && Date) === "function" ? _j : Object)
], Session.prototype, "revoked_at", void 0);
exports.Session = Session = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], Session);
exports.SessionSchema = mongoose_1.SchemaFactory.createForClass(Session);


/***/ }),
/* 159 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const mongoose_1 = __webpack_require__(80);
const _ = __webpack_require__(44);
const mongoose_2 = __webpack_require__(52);
const common_1 = __webpack_require__(28);
const common_2 = __webpack_require__(1);
const schemas_1 = __webpack_require__(160);
const shared_1 = __webpack_require__(32);
const error_constant_1 = __webpack_require__(78);
const event_emitter_1 = __webpack_require__(119);
const emitter_enum_1 = __webpack_require__(15);
const interfaces_1 = __webpack_require__(181);
const jwt_strategy_1 = __webpack_require__(76);
const session_service_1 = __webpack_require__(157);
const blacklist_service_1 = __webpack_require__(156);
const jwt_enum_1 = __webpack_require__(17);
const group_service_1 = __webpack_require__(183);
const schema_constant_1 = __webpack_require__(184);
const permission_constant_1 = __webpack_require__(185);
const mail_service_1 = __webpack_require__(129);
const mail_enum_1 = __webpack_require__(186);
let UserService = class UserService extends common_2.BaseService {
    constructor(model, readModel, cryptographyService, jwtStrategy, sessionService, blacklistService, groupService, mailService, cacheService) {
        super(model, readModel);
        this.model = model;
        this.readModel = readModel;
        this.cryptographyService = cryptographyService;
        this.jwtStrategy = jwtStrategy;
        this.sessionService = sessionService;
        this.blacklistService = blacklistService;
        this.groupService = groupService;
        this.mailService = mailService;
        this.cacheService = cacheService;
        this.model_name = common_2.ENUM_MODEL.USER;
    }
    async create(payload) {
        if (common_2.Common.compareValues(payload.type, common_2.ACCOUNT_TYPE.ADMIN) &&
            !payload?.permissions?.length) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.USER.NO_PERMISSIONS,
                i18nArgs: { attribute: 'Tài khoản' },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        let orCondition = [
            {
                username: payload.username,
            },
        ];
        if (payload?.email) {
            orCondition = orCondition.concat([{ email: payload.email }]);
        }
        const createdUser = await this._findOne({
            $or: orCondition,
            type: payload.type,
        });
        if (createdUser) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.EXISTS,
                i18nArgs: { attribute: 'Tài khoản' },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const { hashedPassword, salt, passwords } = await this._handlePasswordsInTheLastThirdTimes([], payload.password);
        const newUser = {
            username: payload.username,
            current_password: hashedPassword,
            current_salt: salt,
            type: payload.type,
            email: payload.email || null,
            used_passwords: passwords,
            group: payload?.group || null,
            permissions: payload?.permissions?.length ? payload.permissions : [],
            created_at: payload.created_at,
            updated_at: payload.updated_at,
        };
        return await this._create(newUser);
    }
    async authenticate(payload) {
        const user = await this._findOne({ username: payload.username }, [], '+current_password +current_salt +used_passwords +status');
        if (!user) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.NOT_EXIST,
                i18nArgs: { attribute: 'Tài khoản' },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (common_2.Common.compareValues(user.status, common_2.ENUM_STATUS.INACTIVE)) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.USER.DEACTIVATED,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const deHashPassword = await this.cryptographyService.deHashSaltPassword(payload?.password, user?.current_salt);
        if (!common_2.Common.compareValues(deHashPassword, user.current_password)) {
            (0, shared_1.throwErrorMessage)({ error_code: error_constant_1.ERROR_CODE.AUTH.WRONG_PASSWORD }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (!common_2.Common.compareValues(user.type, payload.type)) {
            (0, shared_1.throwErrorMessage)({ error_code: error_constant_1.ERROR_CODE.AUTH.NOT_ALLOWED }, common_1.HttpStatus.BAD_REQUEST);
        }
        const response = await this.jwtStrategy.handleInitTokens(user);
        this.eventEmitterT.emit(emitter_enum_1.EMITTER.SESSION_LOGS, {
            data: response,
            user,
            type: emitter_enum_1.SESSION_TYPE.LOGIN,
        });
        return response;
    }
    async getInformation(id, isSensitive = false) {
        const option = isSensitive
            ? '+current_password +current_salt +used_passwords'
            : {};
        const populates = isSensitive
            ? []
            : [
                { path: 'updated_by', select: common_2.POPULATE.USER },
                { path: 'created_by', select: common_2.POPULATE.USER },
                { path: 'group', select: common_2.POPULATE.GROUP },
            ];
        const user = await this._findById(id, populates, option);
        if (!user) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.NOT_EXIST,
                i18nArgs: { attribute: 'Tài khoản' },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        return user;
    }
    async findAll(query) {
        const condition = this._getQueryCondition(query);
        let response = await this._getAll(query, condition, {}, [
            ...common_2.Common.lookupOneField(common_2.COLLECTION.USER, 'created_by', schema_constant_1.AGGREGATE.USER, true),
            ...common_2.Common.lookupOneField(common_2.COLLECTION.USER, 'updated_by', schema_constant_1.AGGREGATE.USER, true),
            ...common_2.Common.lookupOneField(common_2.COLLECTION.GROUP, 'group', schema_constant_1.AGGREGATE.GROUP, true),
            {
                $project: {
                    current_salt: 0,
                    current_password: 0,
                    used_passwords: 0,
                },
            },
        ], {
            updated_at: -1,
        });
        if (response?.data?.length) {
            response.data = response?.data.map((element) => {
                if (common_2.Common.compareValues(element.type, common_2.ACCOUNT_TYPE.ADMIN)) {
                    element.manage_types = this._handleAdminTypes(element);
                }
                return element;
            });
        }
        return response;
    }
    async logout(response) {
        this.eventEmitterT.emit(emitter_enum_1.EMITTER.SESSION_LOGS, {
            data: response,
            type: emitter_enum_1.SESSION_TYPE.LOGOUT,
        });
    }
    async refreshToken(payload, value) {
        const user = await this.getInformation(value.sub);
        if (!common_2.Common.compareValues(user.type, common_2.ACCOUNT_TYPE.ADMIN)) {
            (0, shared_1.throwErrorMessage)({ error_code: error_constant_1.ERROR_CODE.AUTH.NOT_ALLOWED }, common_1.HttpStatus.BAD_REQUEST);
        }
        const response = await this.jwtStrategy.handleRefreshToken(user);
        this.eventEmitterT.emit(emitter_enum_1.EMITTER.SESSION_LOGS, {
            type: emitter_enum_1.SESSION_TYPE.REFRESH_TOKEN,
            refreshData: {
                refresh_token: payload.refresh_token,
                access_token: response.access_token,
            },
            data: value,
        });
        return response;
    }
    async resetPassword(id, payload) {
        const user = await this.getInformation(id, true);
        const { is_valid, message } = await this._checkPasswordInTheLastThirdTimes(user, payload.password);
        if (!is_valid) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.AUTH.SAME_PASSWORD,
                i18nArgs: { attribute: message },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const { hashedPassword, passwords, salt } = await this._handlePasswordsInTheLastThirdTimes(user?.used_passwords, payload.password);
        const updatedUser = await this._findByIdAndUpdate(id, {
            current_password: hashedPassword,
            current_salt: salt,
            used_passwords: passwords,
            updated_at: payload.updated_at,
            updated_by: payload.updated_by,
        }, { new: true }, []);
        this.eventEmitterT.emit(emitter_enum_1.EMITTER.SESSION_LOGS, {
            user,
            type: emitter_enum_1.SESSION_TYPE.UPDATE_USER,
        });
        return updatedUser;
    }
    async update(id, payload) {
        const user = await this.getInformation(id, true);
        let isBlacklist = false;
        if (common_2.Common.compareValues(user.type, common_2.ACCOUNT_TYPE.ADMIN)) {
            if (!payload?.permissions?.length) {
                (0, shared_1.throwErrorMessage)({
                    error_code: error_constant_1.ERROR_CODE.USER.NO_PERMISSIONS,
                    i18nArgs: { attribute: 'Tài khoản' },
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                const { oldArray, newArray } = common_2.Common.compareBetweenPastAndCurrent(user.permissions, payload.permissions);
                isBlacklist = oldArray?.length || newArray?.length ? true : false;
            }
        }
        if (payload?.group && !common_2.Common.compareValues(payload.group, user.group)) {
            const group = await this.groupService.getInformation(payload.group);
            if (!common_2.Common.compareValues(group.type, user.type)) {
                (0, shared_1.throwErrorMessage)({
                    error_code: error_constant_1.ERROR_CODE.GROUP.NOT_MATCH_USER,
                    i18nArgs: { attribute: group.name },
                }, common_1.HttpStatus.BAD_REQUEST);
            }
        }
        if (payload?.email && !common_2.Common.compareValues(user.email, payload.email)) {
            const existedUser = await this._findOne({
                email: payload.email,
                type: user.type,
            });
            if (existedUser) {
                (0, shared_1.throwErrorMessage)({ error_code: error_constant_1.ERROR_CODE.USER.SAME_EMAIL }, common_1.HttpStatus.BAD_REQUEST);
            }
        }
        const updatedUser = await this._findByIdAndUpdate(id, {
            permissions: payload?.permissions || [],
            email: payload?.email || null,
            group: payload?.group || null,
            updated_at: payload.updated_at,
            updated_by: payload.updated_by,
        }, { new: true }, []);
        if (isBlacklist) {
            this.eventEmitterT.emit(emitter_enum_1.EMITTER.SESSION_LOGS, {
                user,
                type: emitter_enum_1.SESSION_TYPE.UPDATE_USER,
            });
        }
        return updatedUser;
    }
    async forgotPassword(payload) {
        const user = await this._findOne({
            email: payload.email,
            type: payload.type,
        });
        if (!user) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.NOT_EXIST,
                i18nArgs: { attribute: 'Tài khoản' },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        await this._resetPasswordByEmail(user);
        return true;
    }
    async verifyEmailSessionCode(code) {
        const key = this.cryptographyService.encryptOrDecryptData(code, false);
        const cacheValue = await this.cacheService.get(key);
        return {
            is_expired: !cacheValue ? true : false,
            value: cacheValue,
        };
    }
    async resetPasswordByEmail(payload) {
        const { is_expired, value } = await this.verifyEmailSessionCode(payload.code);
        if (is_expired) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.AUTH.EXPIRED_VERIFY_EMAIL_SESSION,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await this.getInformation(value.id, true);
        const { is_valid, message } = await this._checkPasswordInTheLastThirdTimes(user, payload.password);
        if (!is_valid) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.AUTH.SAME_PASSWORD,
                i18nArgs: { attribute: message },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const { hashedPassword, passwords, salt } = await this._handlePasswordsInTheLastThirdTimes(user?.used_passwords, payload.password);
        const updatedUser = await this._findByIdAndUpdate(value.id, {
            current_password: hashedPassword,
            current_salt: salt,
            used_passwords: passwords,
            updated_at: payload.updated_at,
            updated_by: payload.updated_by,
        }, { new: true }, []);
        const key = this.cryptographyService.encryptOrDecryptData(payload.code, false);
        await this.cacheService.del(key);
        this.eventEmitterT.emit(emitter_enum_1.EMITTER.SESSION_LOGS, {
            user,
            type: emitter_enum_1.SESSION_TYPE.UPDATE_USER,
        });
        await this.cacheService.del(payload.code);
        return updatedUser;
    }
    async updateProfile(id, payload) {
        const user = await this.getInformation(id, true);
        if (payload?.email && !common_2.Common.compareValues(user.email, payload.email)) {
            const existedUser = await this._findOne({
                email: payload.email,
                type: user.type,
            });
            if (existedUser) {
                (0, shared_1.throwErrorMessage)({ error_code: error_constant_1.ERROR_CODE.USER.SAME_EMAIL }, common_1.HttpStatus.BAD_REQUEST);
            }
        }
        const updatedUser = await this._findByIdAndUpdate(id, {
            email: payload?.email || null,
            image: payload?.image || null,
            updated_at: payload.updated_at,
            updated_by: payload.updated_by,
        }, { new: true }, []);
        return updatedUser;
    }
    async updateProfilePasword(id, payload) {
        const user = await this.getInformation(id, true);
        const { is_valid, message } = await this._checkPasswordInTheLastThirdTimes(user, payload.password);
        if (!is_valid) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.AUTH.SAME_PASSWORD,
                i18nArgs: { attribute: message },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const { hashedPassword, passwords, salt } = await this._handlePasswordsInTheLastThirdTimes(user?.used_passwords, payload.password);
        const updatedUser = await this._findByIdAndUpdate(id, {
            current_password: hashedPassword,
            current_salt: salt,
            used_passwords: passwords,
            updated_at: payload.updated_at,
            updated_by: payload.updated_by,
        }, { new: true }, []);
        return updatedUser;
    }
    async updateStatus(id, payload) {
        const user = await this.getInformation(id, true);
        if (common_2.Common.compareValues(payload.status, common_2.ENUM_STATUS.INACTIVE)) {
            this.eventEmitterT.emit(emitter_enum_1.EMITTER.SESSION_LOGS, {
                user,
                type: emitter_enum_1.SESSION_TYPE.UPDATE_USER,
            });
        }
        return await this._findByIdAndUpdate(id, {
            updated_at: payload.updated_at,
            updated_by: payload.updated_by,
            status: payload.status,
        });
    }
    async _handlePasswordsInTheLastThirdTimes(passwords, password) {
        const { hashedPassword, salt } = await this.cryptographyService.hashSaltPassword(password);
        const lastestPassword = {
            password: hashedPassword,
            salt,
            created_at: new Date(),
        };
        passwords.push(lastestPassword);
        passwords = passwords.reverse().splice(0, 3);
        return { hashedPassword, salt, passwords };
    }
    async _handleEmitterSessions(params) {
        const user = common_2.Common.toObjectId([emitter_enum_1.SESSION_TYPE.LOGIN, emitter_enum_1.SESSION_TYPE.UPDATE_USER].includes(params.type)
            ? params.user._id
            : params.data.sub);
        return {
            records: await this.sessionService._aggregate([
                {
                    $match: {
                        user,
                        is_revoked: false,
                    },
                },
            ]),
            user: user,
        };
    }
    _handleEmitterQueryOptionAndUpdatePayload(params, user) {
        const result = {
            condition: {},
            payload: {},
        };
        if (common_2.Common.compareValues(params?.type, emitter_enum_1.SESSION_TYPE.REFRESH_TOKEN)) {
            const decodeAccessToken = common_2.Common.veriryExtractToken(params.refreshData.access_token);
            result.condition = {
                refresh_token: params?.refreshData?.refresh_token,
                user,
            };
            result.payload = {
                access_token: params?.refreshData?.access_token,
                access_token_expired_at: new Date(decodeAccessToken.exp * 1000),
            };
        }
        else {
            result.condition = { user, is_revoked: false };
            result.payload = {
                is_revoked: true,
                revoked_at: new Date(),
                revoked_by: user,
            };
        }
        return result;
    }
    async _checkPasswordInTheLastThirdTimes(user, password) {
        const result = {
            is_valid: true,
            message: '',
        };
        for (const instance of user.used_passwords) {
            const hashedPassword = await this.cryptographyService.deHashSaltPassword(password, instance.salt);
            if (common_2.Common.compareValues(hashedPassword, instance.password)) {
                result.is_valid = false;
                result.message = common_2.Common.calculateElapsedTimestamp(new Date(instance.created_at).getTime().toString());
                break;
            }
        }
        return result;
    }
    _getQueryCondition(query) {
        let $match = { type: query.type };
        if (query?.keyword) {
            $match.$or = [
                {
                    username: new RegExp(query?.keyword, 'i'),
                },
                {
                    email: new RegExp(query?.keyword, 'i'),
                },
            ];
        }
        if (query.group) {
            $match.group = common_2.Common.toObjectId(query.group);
        }
        return $match;
    }
    _handleAdminTypes(user) {
        const types = [];
        permission_constant_1.PERMISSION_FRAME.map((element) => {
            const values = element.values.map((i) => i.value);
            const matches = _.intersection(values, user.permissions);
            if (matches?.length) {
                types.push(element.property);
            }
        });
        return types;
    }
    _getPortalUrlByUser(user) {
        switch (user.type) {
            case common_2.ACCOUNT_TYPE.ADMIN:
                return this.configService.get(common_2.ENVIROMENT_VARIABLE.ADMIN_WEB_URL);
            case common_2.ACCOUNT_TYPE.CLIENT:
                return this.configService.get(common_2.ENVIROMENT_VARIABLE.CLIENT_WEB_URL);
            case common_2.ACCOUNT_TYPE.PUBLISHER:
                return this.configService.get(common_2.ENVIROMENT_VARIABLE.PUBLISHER_WEB_URL);
        }
    }
    async _resetPasswordByEmail(user) {
        const keyword = shared_1.REDIS_KEY_PATTERNS.ACCOUNT.EMAIL_PASSWORD(user._id);
        const regexKeys = await this.cacheService.getKeysByKeyword(`*${keyword}*`);
        if (regexKeys?.length) {
            regexKeys.map(async (key) => {
                await this.cacheService.del(key);
            });
        }
        const key = shared_1.REDIS_KEY_PATTERNS.ACCOUNT.EMAIL_PASSWORD(user._id, Date.now().toString());
        await this.cacheService.set(key, { id: user._id, timestamp: Date.now().toString() }, { ttl: jwt_enum_1.CACHE_TTL.EMAIL });
        const session = await this.cryptographyService.encryptOrDecryptData(key);
        await this.mailService.sendMessageForUserMail({
            to: user.email,
            subject: mail_enum_1.MAIL_SUBJECT.UPDATE_PASSWORD,
            template: mail_enum_1.TEMPLATE.FORGOT_PASSWORD,
            context: {
                redirectUrl: this._getPortalUrlByUser(user) +
                    '/reset-password' +
                    `?code=${session}`,
            },
        });
    }
    async handleEmitterSession(params) {
        try {
            const { records, user } = await this._handleEmitterSessions(params);
            if (records?.length) {
                const types = common_2.Common.compareValues(params.type, emitter_enum_1.SESSION_TYPE.REFRESH_TOKEN)
                    ? [jwt_enum_1.TOKEN_TYPE.BEARER]
                    : [jwt_enum_1.TOKEN_TYPE.BEARER, jwt_enum_1.TOKEN_TYPE.REFRESH];
                const { condition, payload } = this._handleEmitterQueryOptionAndUpdatePayload(params, user);
                await Promise.all([
                    this.blacklistService.handleBlackListTokens(records, types),
                    this.sessionService._updateMany(condition, payload),
                ]);
            }
            if (common_2.Common.compareValues(params.type, emitter_enum_1.SESSION_TYPE.LOGIN)) {
                const data = params.data;
                const decodeAccessToken = common_2.Common.veriryExtractToken(data.access_token);
                const decodeRefreshToken = common_2.Common.veriryExtractToken(data.refresh_token);
                await Promise.all([
                    await this.sessionService._create({
                        access_token: data.access_token,
                        refresh_token: data.refresh_token,
                        user: params.user._id,
                        access_token_expired_at: new Date(decodeAccessToken.exp * 1000),
                        refresh_token_expired_at: new Date(decodeRefreshToken.exp * 1000),
                    }),
                    await this._findByIdAndUpdate(user, { last_login_at: new Date() }),
                ]);
            }
        }
        catch (error) {
            this.logger.error(`ERROR:EVENT_EMIITER: handleEmitterSession=>ROOT CAUSE: ${JSON.stringify(error?.message ?? error)}`);
        }
    }
};
exports.UserService = UserService;
__decorate([
    (0, event_emitter_1.OnEvent)(emitter_enum_1.EMITTER.SESSION_LOGS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof interfaces_1.IEmitterSessionResponse !== "undefined" && interfaces_1.IEmitterSessionResponse) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], UserService.prototype, "handleEmitterSession", null);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.User.name, common_2.CONNECTION_NAME.PRIMARY)),
    __param(1, (0, mongoose_1.InjectModel)(schemas_1.User.name, common_2.CONNECTION_NAME.SECONDARY)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object, typeof (_c = typeof shared_1.Cryptography !== "undefined" && shared_1.Cryptography) === "function" ? _c : Object, typeof (_d = typeof jwt_strategy_1.JwtConfigStrategy !== "undefined" && jwt_strategy_1.JwtConfigStrategy) === "function" ? _d : Object, typeof (_e = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" ? _e : Object, typeof (_f = typeof blacklist_service_1.BlacklistService !== "undefined" && blacklist_service_1.BlacklistService) === "function" ? _f : Object, typeof (_g = typeof group_service_1.GroupService !== "undefined" && group_service_1.GroupService) === "function" ? _g : Object, typeof (_h = typeof mail_service_1.MailService !== "undefined" && mail_service_1.MailService) === "function" ? _h : Object, typeof (_j = typeof shared_1.CacheService !== "undefined" && shared_1.CacheService) === "function" ? _j : Object])
], UserService);


/***/ }),
/* 160 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(161), exports);
__exportStar(__webpack_require__(163), exports);
__exportStar(__webpack_require__(165), exports);
__exportStar(__webpack_require__(166), exports);
__exportStar(__webpack_require__(167), exports);
__exportStar(__webpack_require__(168), exports);
__exportStar(__webpack_require__(169), exports);
__exportStar(__webpack_require__(171), exports);
__exportStar(__webpack_require__(170), exports);
__exportStar(__webpack_require__(172), exports);
__exportStar(__webpack_require__(81), exports);
__exportStar(__webpack_require__(173), exports);
__exportStar(__webpack_require__(158), exports);
__exportStar(__webpack_require__(174), exports);
__exportStar(__webpack_require__(179), exports);
__exportStar(__webpack_require__(180), exports);


/***/ }),
/* 161 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(162), exports);


/***/ }),
/* 162 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseSchema = void 0;
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(80);
const class_validator_1 = __webpack_require__(7);
const mongoose = __webpack_require__(52);
class BaseSchema {
}
exports.BaseSchema = BaseSchema;
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }),
    __metadata("design:type", typeof (_c = typeof mongoose !== "undefined" && (_a = mongoose.Schema) !== void 0 && (_b = _a.Types) !== void 0 && _b.ObjectId) === "function" ? _c : Object)
], BaseSchema.prototype, "created_by", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        default: Date.now,
        timezone: 'Asia/Ho_Chi_Minh',
        required: false,
    }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], BaseSchema.prototype, "created_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }),
    __metadata("design:type", typeof (_g = typeof mongoose !== "undefined" && (_e = mongoose.Schema) !== void 0 && (_f = _e.Types) !== void 0 && _f.ObjectId) === "function" ? _g : Object)
], BaseSchema.prototype, "updated_by", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        default: Date.now,
        timezone: 'Asia/Ho_Chi_Minh',
        required: false,
    }),
    __metadata("design:type", typeof (_h = typeof Date !== "undefined" && Date) === "function" ? _h : Object)
], BaseSchema.prototype, "updated_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: common_1.ENUM_STATUS,
        default: common_1.ENUM_STATUS.ACTIVE,
    }),
    (0, class_validator_1.IsEnum)(common_1.ENUM_STATUS),
    __metadata("design:type", typeof (_j = typeof common_1.ENUM_STATUS !== "undefined" && common_1.ENUM_STATUS) === "function" ? _j : Object)
], BaseSchema.prototype, "status", void 0);


/***/ }),
/* 163 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeCastSchema = exports.AttributeCast = void 0;
const mongoose_1 = __webpack_require__(80);
const attribute_common_schema_1 = __webpack_require__(164);
const mongoose_2 = __webpack_require__(52);
const attribute_cast_profession_schema_1 = __webpack_require__(165);
let AttributeCast = class AttributeCast extends attribute_common_schema_1.AttributeCommonSchema {
};
exports.AttributeCast = AttributeCast;
__decorate([
    (0, mongoose_1.Prop)({
        type: [mongoose_2.default.Schema.Types.ObjectId],
        refs: attribute_cast_profession_schema_1.AttributeCastProfession.name,
    }),
    __metadata("design:type", Array)
], AttributeCast.prototype, "cast_professions", void 0);
exports.AttributeCast = AttributeCast = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], AttributeCast);
exports.AttributeCastSchema = mongoose_1.SchemaFactory.createForClass(AttributeCast);
exports.AttributeCastSchema.index({ name: 'text' });


/***/ }),
/* 164 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeCommonSchema = void 0;
const mongoose_1 = __webpack_require__(80);
const base_1 = __webpack_require__(161);
class AttributeCommonSchema extends base_1.BaseSchema {
}
exports.AttributeCommonSchema = AttributeCommonSchema;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        index: true,
        trim: true,
        parse: true,
        unique: true,
    }),
    __metadata("design:type", String)
], AttributeCommonSchema.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        index: true,
        trim: true,
    }),
    __metadata("design:type", String)
], AttributeCommonSchema.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
    }),
    __metadata("design:type", String)
], AttributeCommonSchema.prototype, "image", void 0);


/***/ }),
/* 165 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeCastProfessionSchema = exports.AttributeCastProfession = void 0;
const mongoose_1 = __webpack_require__(80);
const attribute_common_schema_1 = __webpack_require__(164);
let AttributeCastProfession = class AttributeCastProfession extends attribute_common_schema_1.AttributeCommonSchema {
};
exports.AttributeCastProfession = AttributeCastProfession;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
    }),
    __metadata("design:type", String)
], AttributeCastProfession.prototype, "image", void 0);
exports.AttributeCastProfession = AttributeCastProfession = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], AttributeCastProfession);
exports.AttributeCastProfessionSchema = mongoose_1.SchemaFactory.createForClass(AttributeCastProfession);
exports.AttributeCastProfessionSchema.index({ name: 'text' });


/***/ }),
/* 166 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeCategorySchema = exports.AttributeCategory = void 0;
const mongoose_1 = __webpack_require__(80);
const attribute_common_schema_1 = __webpack_require__(164);
let AttributeCategory = class AttributeCategory extends attribute_common_schema_1.AttributeCommonSchema {
};
exports.AttributeCategory = AttributeCategory;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
    }),
    __metadata("design:type", String)
], AttributeCategory.prototype, "image", void 0);
exports.AttributeCategory = AttributeCategory = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], AttributeCategory);
exports.AttributeCategorySchema = mongoose_1.SchemaFactory.createForClass(AttributeCategory);
exports.AttributeCategorySchema.index({ name: 'text' });


/***/ }),
/* 167 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeHashtagSchema = exports.AttributeHashtag = void 0;
const mongoose_1 = __webpack_require__(80);
const attribute_common_schema_1 = __webpack_require__(164);
let AttributeHashtag = class AttributeHashtag extends attribute_common_schema_1.AttributeCommonSchema {
};
exports.AttributeHashtag = AttributeHashtag;
exports.AttributeHashtag = AttributeHashtag = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], AttributeHashtag);
exports.AttributeHashtagSchema = mongoose_1.SchemaFactory.createForClass(AttributeHashtag);
exports.AttributeHashtagSchema.index({ name: 'text' });


/***/ }),
/* 168 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributePlatformSchema = exports.AttributePlatform = void 0;
const mongoose_1 = __webpack_require__(80);
const attribute_common_schema_1 = __webpack_require__(164);
let AttributePlatform = class AttributePlatform extends attribute_common_schema_1.AttributeCommonSchema {
};
exports.AttributePlatform = AttributePlatform;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
    }),
    __metadata("design:type", String)
], AttributePlatform.prototype, "image", void 0);
exports.AttributePlatform = AttributePlatform = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], AttributePlatform);
exports.AttributePlatformSchema = mongoose_1.SchemaFactory.createForClass(AttributePlatform);
exports.AttributePlatformSchema.index({ name: 'text' });


/***/ }),
/* 169 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeSponsorshipFormSchema = exports.AttributeSponsorshipForm = void 0;
const mongoose_1 = __webpack_require__(80);
const mongoose_2 = __webpack_require__(52);
const attribute_common_schema_1 = __webpack_require__(164);
const attribute_sponsorship_benefit_schema_1 = __webpack_require__(170);
let AttributeSponsorshipForm = class AttributeSponsorshipForm extends attribute_common_schema_1.AttributeCommonSchema {
};
exports.AttributeSponsorshipForm = AttributeSponsorshipForm;
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        refs: attribute_sponsorship_benefit_schema_1.AttributeSponsorshipBenefit.name,
    }),
    __metadata("design:type", typeof (_c = typeof mongoose_2.default !== "undefined" && (_a = mongoose_2.default.Schema) !== void 0 && (_b = _a.Types) !== void 0 && _b.ObjectId) === "function" ? _c : Object)
], AttributeSponsorshipForm.prototype, "sponsor_benefit", void 0);
exports.AttributeSponsorshipForm = AttributeSponsorshipForm = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], AttributeSponsorshipForm);
exports.AttributeSponsorshipFormSchema = mongoose_1.SchemaFactory.createForClass(AttributeSponsorshipForm);
exports.AttributeSponsorshipFormSchema.index({ name: 'text' });


/***/ }),
/* 170 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeSponsorshipBenefitSchema = exports.AttributeSponsorshipBenefit = void 0;
const mongoose_1 = __webpack_require__(80);
const attribute_common_schema_1 = __webpack_require__(164);
let AttributeSponsorshipBenefit = class AttributeSponsorshipBenefit extends attribute_common_schema_1.AttributeCommonSchema {
};
exports.AttributeSponsorshipBenefit = AttributeSponsorshipBenefit;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
    }),
    __metadata("design:type", String)
], AttributeSponsorshipBenefit.prototype, "image", void 0);
exports.AttributeSponsorshipBenefit = AttributeSponsorshipBenefit = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], AttributeSponsorshipBenefit);
exports.AttributeSponsorshipBenefitSchema = mongoose_1.SchemaFactory.createForClass(AttributeSponsorshipBenefit);
exports.AttributeSponsorshipBenefitSchema.index({ name: 'text' });


/***/ }),
/* 171 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeBudgetRangeSchema = exports.AttributeBudgetRange = void 0;
const mongoose_1 = __webpack_require__(80);
const attribute_common_schema_1 = __webpack_require__(164);
const common_1 = __webpack_require__(1);
let RangeSchema = class RangeSchema {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
        min: 1,
    }),
    __metadata("design:type", Number)
], RangeSchema.prototype, "value", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        enum: common_1.ENUM_CURRENCY_UNIT,
        default: common_1.ENUM_CURRENCY_UNIT.VND,
        trim: true,
    }),
    __metadata("design:type", String)
], RangeSchema.prototype, "unit", void 0);
RangeSchema = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, _id: false })
], RangeSchema);
let AttributeBudgetRange = class AttributeBudgetRange extends attribute_common_schema_1.AttributeCommonSchema {
};
exports.AttributeBudgetRange = AttributeBudgetRange;
__decorate([
    (0, mongoose_1.Prop)({
        type: RangeSchema,
        required: true,
    }),
    __metadata("design:type", RangeSchema)
], AttributeBudgetRange.prototype, "min_range", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: RangeSchema,
        required: true,
    }),
    __metadata("design:type", RangeSchema)
], AttributeBudgetRange.prototype, "max_range", void 0);
exports.AttributeBudgetRange = AttributeBudgetRange = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], AttributeBudgetRange);
exports.AttributeBudgetRangeSchema = mongoose_1.SchemaFactory.createForClass(AttributeBudgetRange);
exports.AttributeBudgetRangeSchema.index({ name: 'text' });


/***/ }),
/* 172 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MasterDataSchema = exports.MasterData = void 0;
const mongoose_1 = __webpack_require__(80);
const base_1 = __webpack_require__(161);
const mongoose = __webpack_require__(52);
let MasterData = class MasterData extends base_1.BaseSchema {
};
exports.MasterData = MasterData;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], MasterData.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        trim: true,
        index: true,
        sparse: true,
    }),
    __metadata("design:type", String)
], MasterData.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        trim: true,
        index: true,
        sparse: true,
    }),
    __metadata("design:type", String)
], MasterData.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: MasterData.name,
    }),
    __metadata("design:type", typeof (_c = typeof mongoose !== "undefined" && (_a = mongoose.Schema) !== void 0 && (_b = _a.Types) !== void 0 && _b.ObjectId) === "function" ? _c : Object)
], MasterData.prototype, "parent", void 0);
exports.MasterData = MasterData = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], MasterData);
exports.MasterDataSchema = mongoose_1.SchemaFactory.createForClass(MasterData);


/***/ }),
/* 173 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GroupSchema = exports.Group = void 0;
const enums_1 = __webpack_require__(8);
const mongoose_1 = __webpack_require__(80);
const base_1 = __webpack_require__(161);
let Group = class Group extends base_1.BaseSchema {
};
exports.Group = Group;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Group.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: false,
        default: null,
    }),
    __metadata("design:type", String)
], Group.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: enums_1.ACCOUNT_TYPE,
        index: true,
    }),
    __metadata("design:type", typeof (_a = typeof enums_1.ACCOUNT_TYPE !== "undefined" && enums_1.ACCOUNT_TYPE) === "function" ? _a : Object)
], Group.prototype, "type", void 0);
exports.Group = Group = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], Group);
exports.GroupSchema = mongoose_1.SchemaFactory.createForClass(Group);
exports.GroupSchema.index({ name: 'text', description: 'text' });


/***/ }),
/* 174 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SponsorSchema = exports.Sponsor = void 0;
const mongoose = __webpack_require__(52);
const mongoose_1 = __webpack_require__(80);
const enums_1 = __webpack_require__(175);
const base_1 = __webpack_require__(161);
const common_1 = __webpack_require__(1);
let SponsorSchedulerSchema = class SponsorSchedulerSchema {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        required: true,
    }),
    __metadata("design:type", String)
], SponsorSchedulerSchema.prototype, "event_time", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], SponsorSchedulerSchema.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], SponsorSchedulerSchema.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ time: String, description: String }] }),
    __metadata("design:type", Array)
], SponsorSchedulerSchema.prototype, "schedule_details", void 0);
SponsorSchedulerSchema = __decorate([
    (0, mongoose_1.Schema)({ _id: true, versionKey: false })
], SponsorSchedulerSchema);
let SponsorRejectedHistory = class SponsorRejectedHistory {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
    }),
    __metadata("design:type", String)
], SponsorRejectedHistory.prototype, "reason", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", typeof (_c = typeof mongoose !== "undefined" && (_a = mongoose.Schema) !== void 0 && (_b = _a.Types) !== void 0 && _b.ObjectId) === "function" ? _c : Object)
], SponsorRejectedHistory.prototype, "refuser", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], SponsorRejectedHistory.prototype, "created_at", void 0);
SponsorRejectedHistory = __decorate([
    (0, mongoose_1.Schema)({ _id: false, versionKey: false })
], SponsorRejectedHistory);
let platformSchema = class platformSchema {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        refs: 'AttributePlatform',
    }),
    __metadata("design:type", typeof (_g = typeof mongoose !== "undefined" && (_e = mongoose.Schema) !== void 0 && (_f = _e.Types) !== void 0 && _f.ObjectId) === "function" ? _g : Object)
], platformSchema.prototype, "platform", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata("design:type", String)
], platformSchema.prototype, "link", void 0);
platformSchema = __decorate([
    (0, mongoose_1.Schema)({ _id: false, versionKey: false })
], platformSchema);
let SponsorshipFormSchema = class SponsorshipFormSchema {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        refs: 'AttributeSponsorshipForm',
    }),
    __metadata("design:type", typeof (_k = typeof mongoose !== "undefined" && (_h = mongoose.Schema) !== void 0 && (_j = _h.Types) !== void 0 && _j.ObjectId) === "function" ? _k : Object)
], SponsorshipFormSchema.prototype, "sponsorship_form", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata("design:type", String)
], SponsorshipFormSchema.prototype, "media", void 0);
SponsorshipFormSchema = __decorate([
    (0, mongoose_1.Schema)({ _id: false, versionKey: false })
], SponsorshipFormSchema);
class SponsorshipPackageSchema {
}
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], SponsorshipPackageSchema.prototype, "package_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: common_1.ENUM_CURRENCY_UNIT.VND }),
    __metadata("design:type", String)
], SponsorshipPackageSchema.prototype, "package_unit", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], SponsorshipPackageSchema.prototype, "package_value", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], SponsorshipPackageSchema.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], SponsorshipPackageSchema.prototype, "file", void 0);
let Sponsor = class Sponsor extends base_1.BaseSchema {
};
exports.Sponsor = Sponsor;
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata("design:type", String)
], Sponsor.prototype, "sponsor_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(enums_1.DisplayStatus),
        default: enums_1.DisplayStatus.DRAFT,
    }),
    __metadata("design:type", String)
], Sponsor.prototype, "display_status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(enums_1.SponsorshipStatus),
    }),
    __metadata("design:type", String)
], Sponsor.prototype, "sponsorship_status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(enums_1.ProductionStatus),
        default: enums_1.ProductionStatus.PLANNING,
    }),
    __metadata("design:type", String)
], Sponsor.prototype, "production_status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata("design:type", String)
], Sponsor.prototype, "cover_image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata("design:type", String)
], Sponsor.prototype, "banner_image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], trim: true }),
    __metadata("design:type", Array)
], Sponsor.prototype, "introduction_images", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, refs: 'AttributeCategory' }),
    __metadata("design:type", typeof (_o = typeof mongoose !== "undefined" && (_l = mongoose.Schema) !== void 0 && (_m = _l.Types) !== void 0 && _m.ObjectId) === "function" ? _o : Object)
], Sponsor.prototype, "sponsor_categories", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose.Schema.Types.ObjectId], refs: 'AttributeHashtag' }),
    __metadata("design:type", Array)
], Sponsor.prototype, "sponsor_hashtags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose.Schema.Types.ObjectId], refs: 'AttributeCast' }),
    __metadata("design:type", Array)
], Sponsor.prototype, "casts", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [platformSchema],
    }),
    __metadata("design:type", Array)
], Sponsor.prototype, "platforms", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [SponsorshipFormSchema],
    }),
    __metadata("design:type", Array)
], Sponsor.prototype, "sponsorship_forms", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [SponsorSchedulerSchema],
        required: false,
        default: [],
    }),
    __metadata("design:type", Array)
], Sponsor.prototype, "sponsor_schedulers", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [SponsorshipPackageSchema] }),
    __metadata("design:type", Array)
], Sponsor.prototype, "sponsorship_packages", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Sponsor.prototype, "sponsor_kpi", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata("design:type", String)
], Sponsor.prototype, "short_description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata("design:type", String)
], Sponsor.prototype, "detailed_description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        timezone: 'Asia/Ho_Chi_Minh',
    }),
    __metadata("design:type", typeof (_p = typeof Date !== "undefined" && Date) === "function" ? _p : Object)
], Sponsor.prototype, "sponsorship_expiration_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        timezone: 'Asia/Ho_Chi_Minh',
    }),
    __metadata("design:type", typeof (_q = typeof Date !== "undefined" && Date) === "function" ? _q : Object)
], Sponsor.prototype, "start_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        timezone: 'Asia/Ho_Chi_Minh',
    }),
    __metadata("design:type", typeof (_r = typeof Date !== "undefined" && Date) === "function" ? _r : Object)
], Sponsor.prototype, "end_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", String)
], Sponsor.prototype, "user_approved", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", typeof (_s = typeof Date !== "undefined" && Date) === "function" ? _s : Object)
], Sponsor.prototype, "approved_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Sponsor.prototype, "product_limited_is_limit", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: '' }),
    __metadata("design:type", typeof (_t = typeof String !== "undefined" && String) === "function" ? _t : Object)
], Sponsor.prototype, "product_limited_description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: null }),
    __metadata("design:type", Number)
], Sponsor.prototype, "priority", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [SponsorRejectedHistory] }),
    __metadata("design:type", Array)
], Sponsor.prototype, "rejected_histories", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: SponsorRejectedHistory }),
    __metadata("design:type", SponsorRejectedHistory)
], Sponsor.prototype, "reason_rejected", void 0);
exports.Sponsor = Sponsor = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], Sponsor);
exports.SponsorSchema = mongoose_1.SchemaFactory.createForClass(Sponsor);


/***/ }),
/* 175 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(176), exports);
__exportStar(__webpack_require__(177), exports);
__exportStar(__webpack_require__(178), exports);


/***/ }),
/* 176 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DisplayStatus = void 0;
exports.isTransitionValid = isTransitionValid;
var DisplayStatus;
(function (DisplayStatus) {
    DisplayStatus["DRAFT"] = "DRAFT";
    DisplayStatus["PENDING"] = "PENDING";
    DisplayStatus["APPROVED"] = "APPROVED";
    DisplayStatus["LISTED"] = "LISTED";
    DisplayStatus["LEAVING"] = "LEAVING";
    DisplayStatus["EXPIRED"] = "EXPIRED";
    DisplayStatus["REFUSE"] = "REFUSE";
    DisplayStatus["HIDEN"] = "HIDEN";
})(DisplayStatus || (exports.DisplayStatus = DisplayStatus = {}));
function isTransitionValid(currentStatus, newStatus) {
    const validTransitions = {
        [DisplayStatus.PENDING]: [
            DisplayStatus.REFUSE,
            DisplayStatus.APPROVED,
            DisplayStatus.LISTED,
        ],
        [DisplayStatus.REFUSE]: [
            DisplayStatus.PENDING,
            DisplayStatus.APPROVED,
            DisplayStatus.LISTED,
        ],
        [DisplayStatus.APPROVED]: [DisplayStatus.LISTED, DisplayStatus.REFUSE],
        [DisplayStatus.LISTED]: [DisplayStatus.HIDEN],
        [DisplayStatus.LEAVING]: [DisplayStatus.HIDEN],
        [DisplayStatus.EXPIRED]: [DisplayStatus.HIDEN],
        [DisplayStatus.HIDEN]: [DisplayStatus.LISTED],
    };
    return validTransitions[currentStatus]?.includes(newStatus) ?? false;
}


/***/ }),
/* 177 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductionStatus = void 0;
var ProductionStatus;
(function (ProductionStatus) {
    ProductionStatus["PLANNING"] = "PLANNING";
    ProductionStatus["PRODUCING"] = "PRODUCING";
    ProductionStatus["ON_GOING"] = "ON_GOING";
    ProductionStatus["POST_PRODUCTION"] = "POST_PRODUCTION";
    ProductionStatus["PRODUCED"] = "PRODUCED";
})(ProductionStatus || (exports.ProductionStatus = ProductionStatus = {}));


/***/ }),
/* 178 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SponsorshipStatus = void 0;
var SponsorshipStatus;
(function (SponsorshipStatus) {
    SponsorshipStatus["FULL"] = "FULL";
    SponsorshipStatus["NO_SPONSOR"] = "NO_SPONSOR";
    SponsorshipStatus["SPONSORSHIP_AVAILABLE"] = "SPONSORSHIP_AVAILABLE";
    SponsorshipStatus["ONE_SPONSORSHIP_POSITION"] = "ONE_SPONSORSHIP_POSITION";
})(SponsorshipStatus || (exports.SponsorshipStatus = SponsorshipStatus = {}));


/***/ }),
/* 179 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const enums_1 = __webpack_require__(8);
const mongoose_1 = __webpack_require__(80);
const mongoose_2 = __webpack_require__(52);
const base_1 = __webpack_require__(161);
const group_schema_1 = __webpack_require__(173);
const common_1 = __webpack_require__(1);
let UsedPassword = class UsedPassword {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], UsedPassword.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], UsedPassword.prototype, "salt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        required: true,
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UsedPassword.prototype, "created_at", void 0);
UsedPassword = __decorate([
    (0, mongoose_1.Schema)({ _id: false, versionKey: false })
], UsedPassword);
let User = class User extends base_1.BaseSchema {
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        index: true,
        trim: true,
        parse: true,
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        index: true,
        default: null,
        trim: true,
        parse: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", typeof (_b = typeof Boolean !== "undefined" && Boolean) === "function" ? _b : Object)
], User.prototype, "email_verified", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        select: false,
    }),
    __metadata("design:type", String)
], User.prototype, "current_password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        select: false,
    }),
    __metadata("design:type", String)
], User.prototype, "current_salt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [UsedPassword],
        default: [],
        select: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "used_passwords", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        required: false,
        ref: group_schema_1.Group.name,
        default: null,
        index: true,
    }),
    __metadata("design:type", typeof (_e = typeof mongoose_2.default !== "undefined" && (_c = mongoose_2.default.Schema) !== void 0 && (_d = _c.Types) !== void 0 && _d.ObjectId) === "function" ? _e : Object)
], User.prototype, "group", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: enums_1.ACCOUNT_TYPE,
        required: true,
        index: true,
    }),
    __metadata("design:type", String)
], User.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [String],
        required: function () {
            return common_1.Common.compareValues(this.type, enums_1.ACCOUNT_TYPE.ADMIN);
        },
        default: [],
    }),
    __metadata("design:type", Array)
], User.prototype, "permissions", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        timezone: 'Asia/Ho_Chi_Minh',
        required: false,
    }),
    __metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], User.prototype, "last_login_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        default: null,
    }),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.index({ username: 'text', email: 'text' });


/***/ }),
/* 180 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SponsorLogSchema = exports.SponsorLog = void 0;
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(80);
const mongoose = __webpack_require__(52);
let SponsorLog = class SponsorLog extends mongoose.Document {
};
exports.SponsorLog = SponsorLog;
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sponsor',
        required: true,
    }),
    __metadata("design:type", typeof (_c = typeof mongoose !== "undefined" && (_a = mongoose.Schema) !== void 0 && (_b = _a.Types) !== void 0 && _b.ObjectId) === "function" ? _c : Object)
], SponsorLog.prototype, "sponsor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", typeof (_f = typeof mongoose !== "undefined" && (_d = mongoose.Schema) !== void 0 && (_e = _d.Types) !== void 0 && _e.ObjectId) === "function" ? _f : Object)
], SponsorLog.prototype, "created_by", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", typeof (_j = typeof mongoose !== "undefined" && (_g = mongoose.Schema) !== void 0 && (_h = _g.Types) !== void 0 && _h.ObjectId) === "function" ? _j : Object)
], SponsorLog.prototype, "updated_by", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.Mixed, required: true }),
    __metadata("design:type", typeof (_k = typeof Record !== "undefined" && Record) === "function" ? _k : Object)
], SponsorLog.prototype, "previous_data", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.Mixed, required: true }),
    __metadata("design:type", typeof (_l = typeof Record !== "undefined" && Record) === "function" ? _l : Object)
], SponsorLog.prototype, "updated_data", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, default: common_1.LOG_ACTION.UPDATE }),
    __metadata("design:type", String)
], SponsorLog.prototype, "action", void 0);
exports.SponsorLog = SponsorLog = __decorate([
    (0, mongoose_1.Schema)({
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    })
], SponsorLog);
exports.SponsorLogSchema = mongoose_1.SchemaFactory.createForClass(SponsorLog);
exports.SponsorLogSchema.index({ created_at: 1 }, { expireAfterSeconds: 25920000 });


/***/ }),
/* 181 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(182), exports);


/***/ }),
/* 182 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 183 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GroupService = void 0;
const mongoose_1 = __webpack_require__(80);
const mongoose_2 = __webpack_require__(52);
const common_1 = __webpack_require__(28);
const common_2 = __webpack_require__(1);
const schemas_1 = __webpack_require__(160);
const shared_1 = __webpack_require__(32);
const error_constant_1 = __webpack_require__(78);
const schema_constant_1 = __webpack_require__(184);
let GroupService = class GroupService extends common_2.BaseService {
    constructor(model, readModel) {
        super(model, readModel);
        this.model = model;
        this.readModel = readModel;
        this.model_name = common_2.ENUM_MODEL.GROUP;
    }
    async getInformation(id, isSensitive = false) {
        const populates = isSensitive
            ? []
            : [
                { path: 'updated_by', select: common_2.POPULATE.USER },
                { path: 'created_by', select: common_2.POPULATE.USER },
            ];
        const group = await this._findById(id, populates);
        if (!group) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.NOT_EXIST,
                i18nArgs: { attribute: 'Nhóm' },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        return group;
    }
    async update(id, payload) {
        await this.getInformation(id);
        return await this._findByIdAndUpdate(id, {
            name: payload.name,
            description: payload.description,
            updated_at: payload.updated_at,
            updated_by: payload.updated_by,
        }, { new: true }, []);
    }
    async create(payload) {
        const newUser = {
            name: payload.name,
            description: payload?.description || null,
            type: payload.type,
            created_at: payload.created_at,
            updated_at: payload.updated_at,
        };
        return await this._create(newUser);
    }
    async findAll(query) {
        const condition = this._getQueryCondition(query);
        let response = await this._getAll(query, condition, {}, [
            ...common_2.Common.lookupOneField(common_2.COLLECTION.USER, 'created_by', schema_constant_1.AGGREGATE.USER, true),
            ...common_2.Common.lookupOneField(common_2.COLLECTION.USER, 'updated_by', schema_constant_1.AGGREGATE.USER, true),
            {
                $project: {
                    current_salt: 0,
                    current_password: 0,
                    used_passwords: 0,
                },
            },
        ], {
            updated_at: -1,
        }, {}, [
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: 'group',
                    as: 'users',
                },
            },
            {
                $addFields: {
                    user_amount: { $size: '$users' },
                },
            },
            {
                $project: {
                    users: 0,
                },
            },
        ]);
        return response;
    }
    async updateStatus(id, payload) {
        await this.getInformation(id, true);
        return await this._findByIdAndUpdate(id, {
            updated_at: payload.updated_at,
            updated_by: payload.updated_by,
            status: payload.status,
        });
    }
    _getQueryCondition(query) {
        let $match = {};
        if (query?.keyword) {
            $match.$text = common_2.Common.analysisVietNameseText(query?.keyword);
        }
        if (query.type) {
            $match.type = query.type;
        }
        if (query?.status) {
            $match.status = query.status;
        }
        return $match;
    }
};
exports.GroupService = GroupService;
exports.GroupService = GroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Group.name, common_2.CONNECTION_NAME.PRIMARY)),
    __param(1, (0, mongoose_1.InjectModel)(schemas_1.Group.name, common_2.CONNECTION_NAME.SECONDARY)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], GroupService);


/***/ }),
/* 184 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AGGREGATE = void 0;
exports.AGGREGATE = {
    USER: {
        username: 1,
        email: 1,
        type: 1,
    },
    GROUP: {
        name: 1,
        description: 1,
        type: 1,
    },
};


/***/ }),
/* 185 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PERMISSION_FRAME = void 0;
const permission_enum_1 = __webpack_require__(20);
exports.PERMISSION_FRAME = [
    {
        property: 'ACCOUNT',
        description: 'Admin Account (Tạo, chỉnh sửa, theo dõi tài khoản)',
        values: [
            {
                key: permission_enum_1.ACTION.CREATE,
                description: 'Tạo Tài Khoản',
                value: permission_enum_1.PERMISSION.CREATE_ACCOUNT,
            },
            {
                key: permission_enum_1.ACTION.UPDATE,
                description: 'Chỉnh Sửa Tài Khoản',
                value: permission_enum_1.PERMISSION.UPDATE_ACCOUNT,
            },
            {
                key: permission_enum_1.ACTION.VIEW,
                description: 'Theo Dõi Tài Khoản',
                value: permission_enum_1.PERMISSION.VIEW_ACCOUNT,
            },
            {
                key: permission_enum_1.ACTION.CREATE,
                description: 'Tạo Nhóm',
                value: permission_enum_1.PERMISSION.CREATE_GROUP,
            },
            {
                key: permission_enum_1.ACTION.CREATE,
                description: 'Chỉnh Sửa Nhóm',
                value: permission_enum_1.PERMISSION.UPDATE_GROUP,
            },
            {
                key: permission_enum_1.ACTION.VIEW,
                description: 'Theo Dõi Nhóm',
                value: permission_enum_1.PERMISSION.VIEW_GROUP,
            },
        ],
    },
    {
        property: 'SPONSOR',
        description: 'Admin Sponsor (Duyệt, chỉnh sửa, theo dõi bài sponsor)',
        values: [
            {
                key: permission_enum_1.ACTION.CREATE,
                description: 'Duyệt Bài Sponsor',
                value: permission_enum_1.PERMISSION.APPROVE_SPONSOR,
            },
            {
                key: permission_enum_1.ACTION.UPDATE,
                description: 'Chỉnh Sửa Bài Sponsor',
                value: permission_enum_1.PERMISSION.UPDATE_SPONSOR,
            },
            {
                key: permission_enum_1.ACTION.VIEW,
                description: 'Theo Dõi Bài Sponsor',
                value: permission_enum_1.PERMISSION.VIEW_SPONSOR,
            },
        ],
    },
    {
        property: 'REPORT',
        description: 'Admin Report (Thống kê về tài khoản và bài sponsor)',
        values: [
            {
                key: permission_enum_1.ACTION.REPORT,
                description: 'Thống kê về tài khoản',
                value: permission_enum_1.PERMISSION.REPORT_ACCOUNT,
            },
            {
                key: permission_enum_1.ACTION.REPORT,
                description: 'Thống kê về bài sponsor',
                value: permission_enum_1.PERMISSION.REPORT_SPONSOR,
            },
        ],
    },
    {
        property: 'CMS',
        description: 'Admin CMS (Soạn và chỉnh sửa bài viết trên Blog)',
        values: [
            {
                key: permission_enum_1.ACTION.CREATE,
                description: 'Soạn Bài Viết Trên Blog',
                value: permission_enum_1.PERMISSION.CREATE_BLOG,
            },
            {
                key: permission_enum_1.ACTION.UPDATE,
                description: 'Chỉnh Sửa Bài Viết Trên Blog',
                value: permission_enum_1.PERMISSION.UPDATE_BLOG,
            },
        ],
    },
];


/***/ }),
/* 186 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MAIL_SUBJECT = exports.TEMPLATE = void 0;
var TEMPLATE;
(function (TEMPLATE) {
    TEMPLATE["FORGOT_PASSWORD"] = "forgot-password";
    TEMPLATE["CUSTOMER_MAIL"] = "custom-email";
    TEMPLATE["CONTACT_MAIL"] = "contact-email";
    TEMPLATE["SPONSOR_DETAIL_EMAIL"] = "sponsor-detail-email";
})(TEMPLATE || (exports.TEMPLATE = TEMPLATE = {}));
var MAIL_SUBJECT;
(function (MAIL_SUBJECT) {
    MAIL_SUBJECT["UPDATE_PASSWORD"] = "[SPONSOR] Y\u00CAU C\u1EA6U C\u1EACP NH\u1EACT L\u1EA0I M\u1EACT KH\u1EA8U";
    MAIL_SUBJECT["CUSTOMER_MAIL"] = "Kh\u00E1ch H\u00E0ng Mu\u1ED1n Li\u00EAn H\u1EC7 V\u1EDBi C\u00F4ng ty";
    MAIL_SUBJECT["CONTACT_MAIL"] = "Kh\u00E1ch H\u00E0ng Mu\u1ED1n Trao \u0110\u1ED5i V\u1EC1 Ch\u01B0\u01A1ng Tr\u00ECnh";
    MAIL_SUBJECT["SPONSOR_DETAIL_MAIL"] = "Kh\u00E1ch H\u00E0ng Li\u00EAn H\u1EC7 V\u1EC1 Chi Ti\u1EBFt Ch\u01B0\u01A1ng Tr\u00ECnh";
})(MAIL_SUBJECT || (exports.MAIL_SUBJECT = MAIL_SUBJECT = {}));


/***/ }),
/* 187 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 188 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserStatusDTO = exports.UpdateProfileDTO = exports.ResetPasswordDTO = exports.VerifyEmailSessionDTO = exports.ForgotPasswordDTO = exports.UpdateUserDTO = exports.FindUserDTO = exports.CreateUserDTO = void 0;
const common_1 = __webpack_require__(1);
const permission_enum_1 = __webpack_require__(20);
const property_validators_1 = __webpack_require__(189);
const swagger_1 = __webpack_require__(3);
const class_validator_1 = __webpack_require__(7);
const mongoose_1 = __webpack_require__(52);
class CreateUserDTO extends common_1.BaseCreateDTO {
}
exports.CreateUserDTO = CreateUserDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        description: 'Username',
        example: 'toan.pham',
    }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'Account Email',
        example: 'example@gmail.com',
    }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Validate)(property_validators_1.AtLeastUpperCase),
    (0, class_validator_1.Validate)(property_validators_1.AtLeastLowerCase),
    (0, class_validator_1.Validate)(property_validators_1.AtLeastSpecialCharater),
    (0, class_validator_1.Validate)(property_validators_1.AtLeastNumber),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'Account Password',
        example: 'Sponsor1000!',
    }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(common_1.ACCOUNT_TYPE),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        enum: common_1.ACCOUNT_TYPE,
        description: 'Account Type',
        example: common_1.ACCOUNT_TYPE.ADMIN,
    }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: mongoose_1.default.Schema.Types.ObjectId,
        default: null,
    }),
    __metadata("design:type", typeof (_c = typeof mongoose_1.default !== "undefined" && (_a = mongoose_1.default.Schema) !== void 0 && (_b = _a.Types) !== void 0 && _b.ObjectId) === "function" ? _c : Object)
], CreateUserDTO.prototype, "group", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((property) => common_1.Common.compareValues(property.type, common_1.ACCOUNT_TYPE.ADMIN)),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsEnum)(permission_enum_1.PERMISSION, { each: true }),
    (0, swagger_1.ApiProperty)({
        type: [String],
        enum: permission_enum_1.PERMISSION,
        description: 'Account Permissions',
    }),
    __metadata("design:type", Array)
], CreateUserDTO.prototype, "permissions", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        description: 'image of attribute sponsor',
        example: '/public/image/followme.jpg',
    }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "image", void 0);
class FindUserDTO extends common_1.BaseQueryFilterDTO {
}
exports.FindUserDTO = FindUserDTO;
__decorate([
    (0, class_validator_1.IsEnum)(common_1.ACCOUNT_TYPE),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        enum: common_1.ACCOUNT_TYPE,
        description: 'Account Type',
        example: common_1.ACCOUNT_TYPE.ADMIN,
    }),
    __metadata("design:type", String)
], FindUserDTO.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: mongoose_1.default.Schema.Types.ObjectId,
        default: null,
    }),
    __metadata("design:type", typeof (_f = typeof mongoose_1.default !== "undefined" && (_d = mongoose_1.default.Schema) !== void 0 && (_e = _d.Types) !== void 0 && _e.ObjectId) === "function" ? _f : Object)
], FindUserDTO.prototype, "group", void 0);
class UpdateUserDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.OmitType)(CreateUserDTO, ['username', 'type', 'password']), common_1.BaseUpdateDTO) {
}
exports.UpdateUserDTO = UpdateUserDTO;
class ForgotPasswordDTO {
}
exports.ForgotPasswordDTO = ForgotPasswordDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'Account Email',
        example: 'example@gmail.com',
    }),
    __metadata("design:type", String)
], ForgotPasswordDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiHideProperty)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        enum: common_1.ACCOUNT_TYPE,
        description: 'Account Type',
        example: common_1.ACCOUNT_TYPE.ADMIN,
    }),
    __metadata("design:type", String)
], ForgotPasswordDTO.prototype, "type", void 0);
class VerifyEmailSessionDTO {
}
exports.VerifyEmailSessionDTO = VerifyEmailSessionDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'Verify Email Session',
        example: 'example@gmail.com',
    }),
    __metadata("design:type", String)
], VerifyEmailSessionDTO.prototype, "code", void 0);
class ResetPasswordDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.PartialType)(VerifyEmailSessionDTO), common_1.BaseUpdateDTO) {
}
exports.ResetPasswordDTO = ResetPasswordDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Validate)(property_validators_1.AtLeastUpperCase),
    (0, class_validator_1.Validate)(property_validators_1.AtLeastLowerCase),
    (0, class_validator_1.Validate)(property_validators_1.AtLeastSpecialCharater),
    (0, class_validator_1.Validate)(property_validators_1.AtLeastNumber),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: Number,
        description: 'Password (Required Only With Manual Request Type)',
        example: 'Example2024!',
    }),
    __metadata("design:type", String)
], ResetPasswordDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Validate)(property_validators_1.VerifyConfirmPassword, ['password']),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: Number,
        description: 'Retry Password (Required Only With Manual Request Type)',
        example: 'Example2024!',
    }),
    __metadata("design:type", String)
], ResetPasswordDTO.prototype, "confirm_password", void 0);
class UpdateProfileDTO extends common_1.BaseUpdateDTO {
}
exports.UpdateProfileDTO = UpdateProfileDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'Account Email',
        example: 'example@gmail.com',
    }),
    __metadata("design:type", String)
], UpdateProfileDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        description: 'image of attribute sponsor',
        example: '/public/image/followme.jpg',
    }),
    __metadata("design:type", String)
], UpdateProfileDTO.prototype, "image", void 0);
class UpdateUserStatusDTO extends common_1.BaseUpdateDTO {
}
exports.UpdateUserStatusDTO = UpdateUserStatusDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(common_1.ENUM_STATUS),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'Working Status',
        example: common_1.ENUM_STATUS.ACTIVE,
    }),
    __metadata("design:type", typeof (_g = typeof common_1.ENUM_STATUS !== "undefined" && common_1.ENUM_STATUS) === "function" ? _g : Object)
], UpdateUserStatusDTO.prototype, "status", void 0);


/***/ }),
/* 189 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VerifyForgotField = exports.VerifyConfirmPassword = exports.AtLeastNumber = exports.AtLeastSpecialCharater = exports.AtLeastLowerCase = exports.AtLeastUpperCase = void 0;
const class_validator_1 = __webpack_require__(7);
let AtLeastUpperCase = class AtLeastUpperCase {
    validate(text, validationArguments) {
        return text?.toString().match(/[A-Z]/) ? true : false;
    }
    defaultMessage(validationArguments) {
        return 'contain at least 1 upper case letter';
    }
};
exports.AtLeastUpperCase = AtLeastUpperCase;
exports.AtLeastUpperCase = AtLeastUpperCase = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'atLeastUpperCase', async: false })
], AtLeastUpperCase);
let AtLeastLowerCase = class AtLeastLowerCase {
    validate(text, validationArguments) {
        return text?.toString().match(/[a-z]/) ? true : false;
    }
    defaultMessage(validationArguments) {
        return 'contain at least 1 lowser case letter';
    }
};
exports.AtLeastLowerCase = AtLeastLowerCase;
exports.AtLeastLowerCase = AtLeastLowerCase = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'atLeastLowerCase', async: false })
], AtLeastLowerCase);
let AtLeastSpecialCharater = class AtLeastSpecialCharater {
    validate(text, validationArguments) {
        return text?.toString().match(/\W/) ? true : false;
    }
    defaultMessage(validationArguments) {
        return 'contain at least 1 special letter';
    }
};
exports.AtLeastSpecialCharater = AtLeastSpecialCharater;
exports.AtLeastSpecialCharater = AtLeastSpecialCharater = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'atLeastSpecialCharater', async: false })
], AtLeastSpecialCharater);
let AtLeastNumber = class AtLeastNumber {
    validate(text, validationArguments) {
        return text?.toString().match(/[0-9]/) ? true : false;
    }
    defaultMessage(validationArguments) {
        return 'contain at least 1 number';
    }
};
exports.AtLeastNumber = AtLeastNumber;
exports.AtLeastNumber = AtLeastNumber = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'atLeastNumber', async: false })
], AtLeastNumber);
let VerifyConfirmPassword = class VerifyConfirmPassword {
    validate(password, args) {
        return password !== args.object[args.constraints[0]]
            ? false
            : true;
    }
    defaultMessage(args) {
        return 'Passwords do not match!';
    }
};
exports.VerifyConfirmPassword = VerifyConfirmPassword;
exports.VerifyConfirmPassword = VerifyConfirmPassword = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'verifyConfirmPassword', async: false })
], VerifyConfirmPassword);
let VerifyForgotField = class VerifyForgotField {
    validate(password, args) {
        return password !== args.object[args.constraints[0]]
            ? false
            : true;
    }
    defaultMessage(args) {
        return 'Passwords do not match!';
    }
};
exports.VerifyForgotField = VerifyForgotField;
exports.VerifyForgotField = VerifyForgotField = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'verifyConfirmPassword', async: false })
], VerifyForgotField);


/***/ }),
/* 190 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RepositoryModule = void 0;
const common_1 = __webpack_require__(28);
const axios_1 = __webpack_require__(121);
const mongoose_1 = __webpack_require__(80);
const common_2 = __webpack_require__(1);
const shared_1 = __webpack_require__(32);
const schemas_1 = __webpack_require__(160);
const master_data_service_1 = __webpack_require__(191);
const user_service_1 = __webpack_require__(159);
const sponsor_service_1 = __webpack_require__(192);
const blacklist_schema_1 = __webpack_require__(81);
const session_schema_1 = __webpack_require__(158);
const group_service_1 = __webpack_require__(183);
const session_service_1 = __webpack_require__(157);
const blacklist_service_1 = __webpack_require__(156);
const jwt_config_module_1 = __webpack_require__(126);
const auth_strategy_1 = __webpack_require__(79);
const attribute_cast_service_1 = __webpack_require__(290);
const attribute_category_service_1 = __webpack_require__(193);
const attribute_hashtag_service_1 = __webpack_require__(291);
const attribute_platform_service_1 = __webpack_require__(292);
const attribute_budget_range_service_1 = __webpack_require__(277);
const attribute_sponsorship_form_service_1 = __webpack_require__(293);
const attribute_sponsorship_benefit_service_1 = __webpack_require__(294);
const attribute_service_1 = __webpack_require__(295);
const setting_schema_1 = __webpack_require__(282);
const setting_service_1 = __webpack_require__(281);
const mail_module_1 = __webpack_require__(127);
const attribute_cast_profession_service_1 = __webpack_require__(296);
let RepositoryModule = class RepositoryModule {
};
exports.RepositoryModule = RepositoryModule;
exports.RepositoryModule = RepositoryModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            jwt_config_module_1.JwtConfigModule,
            shared_1.CacheDynamicModule.register(),
            shared_1.MongooseDynamicModule.registerAsync({
                connectionName: common_2.CONNECTION_NAME.PRIMARY,
            }),
            shared_1.MongooseDynamicModule.registerAsync({
                connectionName: common_2.CONNECTION_NAME.SECONDARY,
            }),
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: schemas_1.User.name,
                    imports: [],
                    useFactory: () => {
                        const schema = schemas_1.UserSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.USER,
                },
                {
                    name: schemas_1.MasterData.name,
                    imports: [],
                    useFactory: () => {
                        const schema = schemas_1.MasterDataSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.MASTER_DATA,
                },
                {
                    name: schemas_1.Group.name,
                    imports: [],
                    useFactory: () => {
                        const schema = schemas_1.GroupSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.GROUP,
                },
                {
                    name: schemas_1.Sponsor.name,
                    imports: [],
                    useFactory: () => {
                        const schema = schemas_1.SponsorSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.SPONSOR,
                },
                {
                    name: blacklist_schema_1.Blacklist.name,
                    imports: [],
                    useFactory: () => {
                        const schema = blacklist_schema_1.BlacklistSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.BLACKLIST,
                },
                {
                    name: session_schema_1.Session.name,
                    imports: [],
                    useFactory: () => {
                        const schema = session_schema_1.SessionSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.SESSION,
                },
                {
                    name: schemas_1.AttributeCast.name,
                    imports: [],
                    useFactory: () => {
                        const schema = schemas_1.AttributeCastSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.ATTRIBUTE_CAST,
                },
                {
                    name: schemas_1.AttributeCastProfession.name,
                    imports: [],
                    useFactory: () => {
                        const schema = schemas_1.AttributeCastProfessionSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.ATTRIBUTE_CAST_PROFESSION,
                },
                {
                    name: schemas_1.AttributeCategory.name,
                    imports: [],
                    useFactory: () => {
                        const schema = schemas_1.AttributeHashtagSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.ATTRIBUTE_CATEGORY,
                },
                {
                    name: schemas_1.AttributeHashtag.name,
                    imports: [],
                    useFactory: () => {
                        const schema = schemas_1.AttributeHashtagSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.ATTRIBUTE_HASHTAG,
                },
                {
                    name: schemas_1.AttributePlatform.name,
                    imports: [],
                    useFactory: () => {
                        const schema = schemas_1.AttributePlatformSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.ATTRIBUTE_PLATFORM,
                },
                {
                    name: schemas_1.AttributeSponsorshipBenefit.name,
                    imports: [],
                    useFactory: () => {
                        const schema = schemas_1.AttributeSponsorshipBenefitSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.ATTRIBUTE_SPONSORSHIP_BENEFIT,
                },
                {
                    name: schemas_1.AttributeSponsorshipForm.name,
                    imports: [],
                    useFactory: () => {
                        const schema = schemas_1.AttributeSponsorshipFormSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.ATTRIBUTE_SPONSORSHIP_FORM,
                },
                {
                    name: schemas_1.AttributeBudgetRange.name,
                    imports: [],
                    useFactory: () => {
                        const schema = schemas_1.AttributeBudgetRangeSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.ATTRIBUTE_BUDGET_RANGE,
                },
                {
                    name: schemas_1.SponsorLog.name,
                    imports: [],
                    useFactory: () => schemas_1.SponsorLogSchema,
                    inject: [],
                    collection: common_2.COLLECTION.SPONSOR_LOG,
                },
                {
                    name: setting_schema_1.Setting.name,
                    imports: [],
                    useFactory: () => setting_schema_1.SettingSchema,
                    inject: [],
                    collection: common_2.COLLECTION.SETTING,
                },
            ], common_2.CONNECTION_NAME.PRIMARY),
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: schemas_1.User.name,
                    imports: [],
                    useFactory: () => {
                        const schema = schemas_1.UserSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.USER,
                },
                {
                    name: schemas_1.MasterData.name,
                    imports: [],
                    useFactory: () => {
                        const schema = schemas_1.MasterDataSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.MASTER_DATA,
                },
                {
                    name: schemas_1.Group.name,
                    imports: [],
                    useFactory: () => {
                        const schema = schemas_1.GroupSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.GROUP,
                },
                {
                    name: schemas_1.Sponsor.name,
                    imports: [],
                    useFactory: () => {
                        const schema = schemas_1.SponsorSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.SPONSOR,
                },
                {
                    name: blacklist_schema_1.Blacklist.name,
                    imports: [],
                    useFactory: () => {
                        const schema = blacklist_schema_1.BlacklistSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.BLACKLIST,
                },
                {
                    name: session_schema_1.Session.name,
                    imports: [],
                    useFactory: () => {
                        const schema = session_schema_1.SessionSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.SESSION,
                },
                {
                    name: schemas_1.AttributeCast.name,
                    imports: [],
                    useFactory: () => {
                        const schema = schemas_1.AttributeCastSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.ATTRIBUTE_CAST,
                },
                {
                    name: schemas_1.AttributeCastProfession.name,
                    imports: [],
                    useFactory: () => {
                        const schema = schemas_1.AttributeCastProfessionSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.ATTRIBUTE_CAST_PROFESSION,
                },
                {
                    name: schemas_1.AttributeCategory.name,
                    imports: [],
                    useFactory: () => {
                        const schema = schemas_1.AttributeHashtagSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.ATTRIBUTE_CATEGORY,
                },
                {
                    name: schemas_1.AttributeHashtag.name,
                    imports: [],
                    useFactory: () => {
                        const schema = schemas_1.AttributeHashtagSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.ATTRIBUTE_HASHTAG,
                },
                {
                    name: schemas_1.AttributePlatform.name,
                    imports: [],
                    useFactory: () => {
                        const schema = schemas_1.AttributePlatformSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.ATTRIBUTE_PLATFORM,
                },
                {
                    name: schemas_1.AttributeSponsorshipBenefit.name,
                    imports: [],
                    useFactory: () => {
                        const schema = schemas_1.AttributeSponsorshipBenefitSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.ATTRIBUTE_SPONSORSHIP_BENEFIT,
                },
                {
                    name: schemas_1.AttributeSponsorshipForm.name,
                    imports: [],
                    useFactory: () => {
                        const schema = schemas_1.AttributeSponsorshipFormSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.ATTRIBUTE_SPONSORSHIP_FORM,
                },
                {
                    name: schemas_1.AttributeBudgetRange.name,
                    imports: [],
                    useFactory: () => {
                        const schema = schemas_1.AttributeBudgetRangeSchema;
                        return schema;
                    },
                    inject: [],
                    collection: common_2.COLLECTION.ATTRIBUTE_BUDGET_RANGE,
                },
                {
                    name: schemas_1.SponsorLog.name,
                    imports: [],
                    useFactory: () => schemas_1.SponsorLogSchema,
                    inject: [],
                    collection: common_2.COLLECTION.SPONSOR_LOG,
                },
                {
                    name: setting_schema_1.Setting.name,
                    imports: [],
                    useFactory: () => setting_schema_1.SettingSchema,
                    inject: [],
                    collection: common_2.COLLECTION.SETTING,
                },
            ], common_2.CONNECTION_NAME.SECONDARY),
            axios_1.HttpModule,
            mail_module_1.MailModule,
        ],
        providers: [
            user_service_1.UserService,
            shared_1.Cryptography,
            sponsor_service_1.SponsorService,
            master_data_service_1.MasterDataService,
            group_service_1.GroupService,
            setting_service_1.SettingService,
            session_service_1.SessionService,
            blacklist_service_1.BlacklistService,
            auth_strategy_1.AuthConfigStrategy,
            attribute_service_1.AttributeService,
            attribute_cast_service_1.AttributeCastService,
            attribute_cast_profession_service_1.AttributeCastProfessionService,
            attribute_category_service_1.AttributeCategoryService,
            attribute_hashtag_service_1.AttributeHashtagService,
            attribute_platform_service_1.AttributePlatformService,
            attribute_sponsorship_benefit_service_1.AttributeSponsorshipBenefitService,
            attribute_sponsorship_form_service_1.AttributeSponsorshipFormService,
            attribute_budget_range_service_1.AttributeBudgetRangeService,
        ],
        exports: [
            user_service_1.UserService,
            shared_1.Cryptography,
            sponsor_service_1.SponsorService,
            master_data_service_1.MasterDataService,
            group_service_1.GroupService,
            setting_service_1.SettingService,
            session_service_1.SessionService,
            blacklist_service_1.BlacklistService,
            auth_strategy_1.AuthConfigStrategy,
            attribute_service_1.AttributeService,
            attribute_cast_service_1.AttributeCastService,
            attribute_cast_profession_service_1.AttributeCastProfessionService,
            attribute_category_service_1.AttributeCategoryService,
            attribute_hashtag_service_1.AttributeHashtagService,
            attribute_platform_service_1.AttributePlatformService,
            attribute_sponsorship_benefit_service_1.AttributeSponsorshipBenefitService,
            attribute_sponsorship_form_service_1.AttributeSponsorshipFormService,
            attribute_budget_range_service_1.AttributeBudgetRangeService,
        ],
    })
], RepositoryModule);


/***/ }),
/* 191 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MasterDataService = void 0;
const mongoose_1 = __webpack_require__(80);
const mongoose_2 = __webpack_require__(52);
const common_1 = __webpack_require__(28);
const common_2 = __webpack_require__(1);
let MasterDataService = class MasterDataService extends common_2.BaseService {
    constructor(model, readModel) {
        super(model, readModel);
        this.model = model;
        this.readModel = readModel;
        this.model_name = common_2.ENUM_MODEL.MASTER_DATA;
    }
};
exports.MasterDataService = MasterDataService;
exports.MasterDataService = MasterDataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('MasterData', common_2.CONNECTION_NAME.PRIMARY)),
    __param(1, (0, mongoose_1.InjectModel)('MasterData', common_2.CONNECTION_NAME.SECONDARY)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], MasterDataService);


/***/ }),
/* 192 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SponsorService = void 0;
const mongoose_1 = __webpack_require__(80);
const _ = __webpack_require__(44);
const mongoose_2 = __webpack_require__(52);
const common_1 = __webpack_require__(1);
const common_2 = __webpack_require__(28);
const enums_1 = __webpack_require__(175);
const sponsor_log_schema_1 = __webpack_require__(180);
const schemas_1 = __webpack_require__(160);
const attribute_category_service_1 = __webpack_require__(193);
const attribute_budget_range_service_1 = __webpack_require__(277);
const moment = __webpack_require__(50);
const constants_1 = __webpack_require__(278);
const shared_1 = __webpack_require__(32);
const error_constant_1 = __webpack_require__(78);
const axios_1 = __webpack_require__(121);
const class_validator_1 = __webpack_require__(7);
const event_emitter_1 = __webpack_require__(119);
const setting_service_1 = __webpack_require__(281);
const enums_2 = __webpack_require__(287);
const mail_service_1 = __webpack_require__(129);
const sponsor_log_pre_data_entity_1 = __webpack_require__(289);
const mail_enum_1 = __webpack_require__(186);
let SponsorService = class SponsorService extends common_1.BaseService {
    constructor(model, readModel, sponsorLogModel, attributeCategoryService, attributeBudgetRangeService, settingService, httpService, mailService) {
        super(model, readModel);
        this.model = model;
        this.readModel = readModel;
        this.sponsorLogModel = sponsorLogModel;
        this.attributeCategoryService = attributeCategoryService;
        this.attributeBudgetRangeService = attributeBudgetRangeService;
        this.settingService = settingService;
        this.httpService = httpService;
        this.mailService = mailService;
        this.model_name = common_1.ENUM_MODEL.SPONSOR;
    }
    conditionFindAll(query) {
        const { condition, condition_option, condition_keyword, sort, select_after_query, } = common_1.Common._conditionFindAll({
            query,
            condition_fields: [
                'display_status',
                'sponsor_hashtags',
                'casts',
                'platforms',
                'sponsorship_forms',
            ],
        });
        if (query.sponsorship_status) {
            const sponsorship_status = query.sponsorship_status?.split(',');
            condition.sponsorship_status = {
                $in: common_1.Common.toObjectId(sponsorship_status),
            };
        }
        if (query.production_status) {
            const production_status = query.production_status?.split(',');
            condition.production_status = {
                $in: common_1.Common.toObjectId(production_status),
            };
        }
        if (query.sponsor_categories) {
            const sponsor_categories = query.sponsor_categories?.split(',');
            condition.sponsor_categories = {
                $in: common_1.Common.toObjectId(sponsor_categories),
            };
        }
        if (query.created_by) {
            condition['created_by'] = common_1.Common.toObjectId(query.created_by);
        }
        if (condition_option.exclude) {
            condition['_id'] = { $ne: condition_option.exclude };
        }
        if (query.year) {
            const years = query.year?.split(',');
            years?.map((year) => {
                year = Number(year);
                if (!isNaN(year)) {
                    const start_of_year = moment().year(year).startOf('year');
                    const end_of_year = moment().year(year).endOf('year');
                    if (!condition['$or']) {
                        condition['$or'] = [];
                    }
                    condition['$or'].push({
                        start_date: {
                            $lte: new Date(moment(start_of_year).format(common_1.ENUM_DATE_TIME.YYYY_MM_DD) +
                                common_1.ENUM_DATE_TIME.END_OFFSET),
                        },
                        end_date: {
                            $gte: new Date(moment(end_of_year).format(common_1.ENUM_DATE_TIME.YYYY_MM_DD) +
                                common_1.ENUM_DATE_TIME.START_OFFSET),
                        },
                    });
                    condition['$or'].push({
                        start_date: common_1.Common.createConditionFromDateToDate(start_of_year, end_of_year),
                    });
                    condition['$or'].push({
                        end_date: common_1.Common.createConditionFromDateToDate(start_of_year, end_of_year),
                    });
                }
            });
        }
        return {
            condition: condition,
            condition_keyword: condition_keyword,
            sort: sort,
            select_after_query: select_after_query,
        };
    }
    async findAll(query = {}) {
        const { condition, condition_keyword, sort, select_after_query } = this.conditionFindAll(query);
        const condition_keyword_after = {};
        const lookup = [];
        const lookup_after = [
            ...common_1.Common.lookupArrayField(common_1.COLLECTION.ATTRIBUTE_CAST, 'casts', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
            ...common_1.Common.lookupOneField(common_1.COLLECTION.ATTRIBUTE_CATEGORY, 'sponsor_categories', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
            ...common_1.Common.lookupOneField(common_1.COLLECTION.USER, 'created_by', common_1.ENUM_POPULATE_AGGREGATE.USER),
            ...this.destructorMinAndMaxPackageValue('sponsorship_packages', 'sponsor_package_unit', 'sponsorship_package_values', 'sponsor_package_min', 'sponsor_package_max'),
            {
                $addFields: {
                    sponsor_package_min_trans: this.convertPackageValueToString('sponsor_package_min'),
                    sponsor_package_max_trans: this.convertPackageValueToString('sponsor_package_max'),
                },
            },
            ...select_after_query.select_by_project_aggregate,
        ];
        return await this._getAll(query, condition, condition_keyword, lookup, sort, condition_keyword_after, lookup_after);
    }
    async findAllAvailable(query = {}) {
        query['display_statuses'] =
            `${enums_1.DisplayStatus.APPROVED},${enums_1.DisplayStatus.LISTED},${enums_1.DisplayStatus.HIDEN},${enums_1.DisplayStatus.LEAVING},${enums_1.DisplayStatus.EXPIRED},${enums_1.DisplayStatus.REFUSE}`;
        const { condition, condition_keyword, sort, select_after_query } = this.conditionFindAll(query);
        const condition_keyword_after = {};
        const lookup = [];
        const lookup_after = [
            ...common_1.Common.lookupArrayField(common_1.COLLECTION.ATTRIBUTE_CAST, 'casts', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
            ...common_1.Common.lookupOneField(common_1.COLLECTION.ATTRIBUTE_CATEGORY, 'sponsor_categories', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
            ...common_1.Common.lookupOneField(common_1.COLLECTION.USER, 'created_by', common_1.ENUM_POPULATE_AGGREGATE.USER),
            {
                $addFields: {
                    sponsor_package_min_trans: this.convertPackageValueToString('sponsor_package_min'),
                    sponsor_package_max_trans: this.convertPackageValueToString('sponsor_package_max'),
                },
            },
            ...select_after_query.select_by_project_aggregate,
        ];
        if (query.budget_ranges) {
            await this.handleQueryBudgetRanges(query.budget_ranges, condition_keyword);
            lookup.push(...this.destructorMinAndMaxPackageValue('sponsorship_packages', 'sponsor_package_unit', 'sponsorship_package_values', 'sponsor_package_min', 'sponsor_package_max'));
        }
        else {
            lookup_after.unshift(...this.destructorMinAndMaxPackageValue('sponsorship_packages', 'sponsor_package_unit', 'sponsorship_package_values', 'sponsor_package_min', 'sponsor_package_max'));
        }
        return await this._getAll(query, condition, condition_keyword, lookup, sort, condition_keyword_after, lookup_after);
    }
    async findAllPending(query = {}) {
        query['display_status'] = `${enums_1.DisplayStatus.PENDING}`;
        const { condition, condition_keyword, sort, select_after_query } = this.conditionFindAll(query);
        const condition_keyword_after = {};
        const lookup = [];
        const lookup_after = [
            ...common_1.Common.lookupArrayField(common_1.COLLECTION.ATTRIBUTE_CAST, 'casts', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
            ...common_1.Common.lookupOneField(common_1.COLLECTION.ATTRIBUTE_CATEGORY, 'sponsor_categories', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
            ...common_1.Common.lookupOneField(common_1.COLLECTION.USER, 'created_by', common_1.ENUM_POPULATE_AGGREGATE.USER),
            ...this.destructorMinAndMaxPackageValue('sponsorship_packages', 'sponsor_package_unit', 'sponsorship_package_values', 'sponsor_package_min', 'sponsor_package_max'),
            {
                $addFields: {
                    sponsor_package_min_trans: this.convertPackageValueToString('sponsor_package_min'),
                    sponsor_package_max_trans: this.convertPackageValueToString('sponsor_package_max'),
                },
            },
            ...select_after_query.select_by_project_aggregate,
        ];
        return await this._getAll(query, condition, condition_keyword, lookup, sort, condition_keyword_after, lookup_after);
    }
    async findAllForClientHomePage(query = {}) {
        query.display_statuses = `${enums_1.DisplayStatus.LISTED},${enums_1.DisplayStatus.LEAVING},${enums_1.DisplayStatus.EXPIRED}`;
        const { condition, condition_keyword, select_after_query } = this.conditionFindAll(query);
        Object.assign(query, {
            is_paging: true,
            per_page: 6,
        });
        const condition_keyword_after = {};
        const lookup = [
            {
                $addFields: {
                    prioritySort: {
                        $cond: {
                            if: { $eq: ['$priority', null] },
                            then: Number.MAX_VALUE,
                            else: '$priority',
                        },
                    },
                },
            },
        ];
        const lookup_after = [
            ...common_1.Common.lookupArrayField(common_1.COLLECTION.ATTRIBUTE_CAST, 'casts', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
            ...common_1.Common.lookupOneField(common_1.COLLECTION.ATTRIBUTE_CATEGORY, 'sponsor_categories', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
            {
                $lookup: {
                    from: common_1.COLLECTION.ATTRIBUTE_PLATFORM,
                    localField: 'platforms.platform',
                    foreignField: '_id',
                    as: 'platforms',
                },
            },
            ...this.destructorMinAndMaxPackageValue('sponsorship_packages', 'sponsor_package_unit', 'sponsorship_package_values', 'sponsor_package_min', 'sponsor_package_max'),
            {
                $addFields: {
                    sponsor_package_min_trans: this.convertPackageValueToString('sponsor_package_min'),
                    sponsor_package_max_trans: this.convertPackageValueToString('sponsor_package_max'),
                },
            },
            ...select_after_query.select_by_project_aggregate,
        ];
        const sort = {
            prioritySort: 1,
            created_at: -1,
        };
        const sponsors = await this._getAll(query, condition, condition_keyword, lookup, sort, condition_keyword_after, lookup_after);
        const query_attribute = {
            is_paging: false,
        };
        const condition_attribute = {
            status: common_1.ENUM_STATUS.ACTIVE,
        };
        const select_attribute = 'name code description image';
        const [categories, budget_ranges] = (await Promise.allSettled([
            this.attributeCategoryService._findAll(query_attribute, condition_attribute, {}, [], select_attribute, null),
            this.attributeBudgetRangeService._findAll(query_attribute, condition_attribute, {}, [], select_attribute, {
                'min_range.value': 1,
            }),
        ]));
        const home_contents = await this.settingService.findByKey(enums_2.ENUM_SETTING_KEY.CLIENT_CONTENT);
        return {
            sponsors: sponsors?.data || [],
            home_contents: {
                [`${enums_2.ENUM_SETTING_CLIENT_CONTENT.CLIENT_CONTENT_HOME_PAGE_FUTURE}`]: home_contents[enums_2.ENUM_SETTING_CLIENT_CONTENT.CLIENT_CONTENT_HOME_PAGE_FUTURE],
                [`${enums_2.ENUM_SETTING_CLIENT_CONTENT.CLIENT_CONTENT_HOME_PAGE_CONNECT}`]: home_contents[enums_2.ENUM_SETTING_CLIENT_CONTENT.CLIENT_CONTENT_HOME_PAGE_CONNECT],
            },
            attributes: {
                categories: categories?.value?.data || [],
                budget_ranges: budget_ranges?.value?.data || [],
            },
        };
    }
    async findAllForCalendar(query) {
        query.display_statuses = `${enums_1.DisplayStatus.LISTED},${enums_1.DisplayStatus.LEAVING},${enums_1.DisplayStatus.EXPIRED}`;
        const { condition, condition_keyword, sort } = this.conditionFindAll(query);
        const condition_keyword_after = {};
        const lookup = [];
        const lookup_after = [
            ...common_1.Common.lookupOneField(common_1.COLLECTION.ATTRIBUTE_CATEGORY, 'sponsor_categories', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
            {
                $addFields: {
                    sponsor_package_min_trans: this.convertPackageValueToString('sponsor_package_min'),
                    sponsor_package_max_trans: this.convertPackageValueToString('sponsor_package_max'),
                },
            },
            {
                $project: {
                    sponsor_name: 1,
                    display_status: 1,
                    production_status: 1,
                    sponsorship_status: 1,
                    sponsor_categories: 1,
                    cover_image: 1,
                    start_date: 1,
                    end_date: 1,
                    sponsorship_expiration_date: 1,
                    sponsor_package_unit: 1,
                    sponsor_package_min: 1,
                    sponsor_package_max: 1,
                    sponsor_package_min_trans: 1,
                    sponsor_package_max_trans: 1,
                },
            },
        ];
        if (query.budget_ranges) {
            await this.handleQueryBudgetRanges(query.budget_ranges, condition_keyword);
            lookup.push(...this.destructorMinAndMaxPackageValue('sponsorship_packages', 'sponsor_package_unit', 'sponsorship_package_values', 'sponsor_package_min', 'sponsor_package_max'));
        }
        else {
            lookup_after.unshift(...this.destructorMinAndMaxPackageValue('sponsorship_packages', 'sponsor_package_unit', 'sponsorship_package_values', 'sponsor_package_min', 'sponsor_package_max'));
        }
        return await this._getAll(query, condition, condition_keyword, lookup, sort, condition_keyword_after, lookup_after);
    }
    async findAllForClient(query) {
        query.display_statuses = `${enums_1.DisplayStatus.LISTED},${enums_1.DisplayStatus.LEAVING},${enums_1.DisplayStatus.EXPIRED}`;
        const { condition, condition_keyword, sort, select_after_query } = this.conditionFindAll(query);
        const condition_keyword_after = {};
        const lookup = [];
        const lookup_after = [
            ...common_1.Common.lookupArrayField(common_1.COLLECTION.ATTRIBUTE_CAST, 'casts', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
            ...common_1.Common.lookupOneField(common_1.COLLECTION.ATTRIBUTE_CATEGORY, 'sponsor_categories', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
            {
                $lookup: {
                    from: common_1.COLLECTION.ATTRIBUTE_PLATFORM,
                    localField: 'platforms.platform',
                    foreignField: '_id',
                    as: 'platforms',
                },
            },
            {
                $addFields: {
                    sponsor_package_min_trans: this.convertPackageValueToString('sponsor_package_min'),
                    sponsor_package_max_trans: this.convertPackageValueToString('sponsor_package_max'),
                },
            },
            ...select_after_query.select_by_project_aggregate,
        ];
        if (query.budget_ranges || sort.hasOwnProperty('sponsor_package')) {
            if (query.budget_ranges) {
                await this.handleQueryBudgetRanges(query.budget_ranges, condition_keyword);
            }
            lookup.push(...this.destructorMinAndMaxPackageValue('sponsorship_packages', 'sponsor_package_unit', 'sponsorship_package_values', 'sponsor_package_min', 'sponsor_package_max'), {
                $addFields: {
                    sponsor_package: '$sponsor_package_max',
                },
            });
        }
        else {
            lookup_after.unshift(...this.destructorMinAndMaxPackageValue('sponsorship_packages', 'sponsor_package_unit', 'sponsorship_package_values', 'sponsor_package_min', 'sponsor_package_max'));
        }
        return await this._getAll(query, condition, condition_keyword, lookup, sort, condition_keyword_after, lookup_after);
    }
    async findAllForPublisher(query = {}) {
        const { condition, condition_keyword, sort, select_after_query } = this.conditionFindAll(query);
        const condition_keyword_after = {};
        const lookup = [];
        const lookup_after = [
            ...common_1.Common.lookupArrayField(common_1.COLLECTION.ATTRIBUTE_CAST, 'casts', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
            ...common_1.Common.lookupOneField(common_1.COLLECTION.ATTRIBUTE_CATEGORY, 'sponsor_categories', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
            ...common_1.Common.lookupOneField(common_1.COLLECTION.USER, 'created_by', common_1.ENUM_POPULATE_AGGREGATE.USER),
            {
                $addFields: {
                    sponsor_package_min_trans: this.convertPackageValueToString('sponsor_package_min'),
                    sponsor_package_max_trans: this.convertPackageValueToString('sponsor_package_max'),
                },
            },
            ...select_after_query.select_by_project_aggregate,
        ];
        if (query.budget_ranges) {
            await this.handleQueryBudgetRanges(query.budget_ranges, condition_keyword);
            lookup.push(...this.destructorMinAndMaxPackageValue('sponsorship_packages', 'sponsor_package_unit', 'sponsorship_package_values', 'sponsor_package_min', 'sponsor_package_max'));
        }
        else {
            lookup_after.unshift(...this.destructorMinAndMaxPackageValue('sponsorship_packages', 'sponsor_package_unit', 'sponsorship_package_values', 'sponsor_package_min', 'sponsor_package_max'));
        }
        return await this._getAll(query, condition, condition_keyword, lookup, sort, condition_keyword_after, lookup_after);
    }
    async findSponsorShortDetailForSocial(_id) {
        const sponsor = await this._findById(_id, [], 'sponsor_name cover_image short_description');
        return sponsor;
    }
    async findOneForClient(_id) {
        const aggregate = [
            {
                $match: {
                    _id: common_1.Common.toObjectId(_id),
                    display_status: {
                        $in: [
                            enums_1.DisplayStatus.LISTED,
                            enums_1.DisplayStatus.LEAVING,
                            enums_1.DisplayStatus.EXPIRED,
                        ],
                    },
                },
            },
            {
                $lookup: {
                    from: common_1.COLLECTION.ATTRIBUTE_CAST,
                    let: { refIDs: '$casts' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ['$_id', { $ifNull: ['$$refIDs', []] }],
                                },
                            },
                        },
                        ...common_1.Common.lookupArrayField(common_1.COLLECTION.ATTRIBUTE_CAST_PROFESSION, 'cast_professions', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
                        {
                            $project: {
                                ...common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
                                cast_professions: 1,
                            },
                        },
                    ],
                    as: 'casts',
                },
            },
            ...common_1.Common.lookupOneField(common_1.COLLECTION.ATTRIBUTE_CATEGORY, 'sponsor_categories', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
            ...common_1.Common.lookupArrayField(common_1.COLLECTION.ATTRIBUTE_HASHTAG, 'sponsor_hashtags', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
            ...common_1.Common.lookupOneField(common_1.COLLECTION.USER, 'created_by', common_1.ENUM_POPULATE_AGGREGATE.USER),
            ...this.lookupSponsorshipForms(),
            ...this.lookupPlatforms(),
            ...this.destructorMinAndMaxPackageValue('sponsorship_packages', 'sponsor_package_unit', 'sponsorship_package_values', 'sponsor_package_min', 'sponsor_package_max'),
            {
                $addFields: {
                    sponsor_package_min_trans: this.convertPackageValueToString('sponsor_package_min'),
                    sponsor_package_max_trans: this.convertPackageValueToString('sponsor_package_max'),
                },
            },
            {
                $project: {
                    __v: 0,
                    sponsorship_form_source_datas: 0,
                    platform_source_datas: 0,
                },
            },
        ];
        const data = await this._aggregate(aggregate);
        return data?.[0];
    }
    async findOneForPublisher(_id) {
        const aggregate = [
            {
                $match: {
                    _id: common_1.Common.toObjectId(_id),
                },
            },
            ...common_1.Common.lookupArrayField(common_1.COLLECTION.ATTRIBUTE_CAST, 'casts', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
            ...common_1.Common.lookupOneField(common_1.COLLECTION.ATTRIBUTE_CATEGORY, 'sponsor_categories', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
            ...common_1.Common.lookupArrayField(common_1.COLLECTION.ATTRIBUTE_HASHTAG, 'sponsor_hashtags', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
            ...common_1.Common.lookupOneField(common_1.COLLECTION.USER, 'created_by', common_1.ENUM_POPULATE_AGGREGATE.USER),
            ...this.lookupSponsorshipForms(),
            ...this.lookupPlatforms(),
            ...this.destructorMinAndMaxPackageValue('sponsorship_packages', 'sponsor_package_unit', 'sponsorship_package_values', 'sponsor_package_min', 'sponsor_package_max'),
            {
                $addFields: {
                    sponsor_package_min_trans: this.convertPackageValueToString('sponsor_package_min'),
                    sponsor_package_max_trans: this.convertPackageValueToString('sponsor_package_max'),
                },
            },
            {
                $project: {
                    __v: 0,
                    sponsorship_form_source_datas: 0,
                    platform_source_datas: 0,
                },
            },
        ];
        const data = await this._aggregate(aggregate);
        return data?.[0];
    }
    async findOneForAdminPreview(_id) {
        const aggregate = [
            {
                $match: {
                    _id: common_1.Common.toObjectId(_id),
                },
            },
            ...common_1.Common.lookupArrayField(common_1.COLLECTION.ATTRIBUTE_CAST, 'casts', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
            ...common_1.Common.lookupOneField(common_1.COLLECTION.ATTRIBUTE_CATEGORY, 'sponsor_categories', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
            ...common_1.Common.lookupArrayField(common_1.COLLECTION.ATTRIBUTE_HASHTAG, 'sponsor_hashtags', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
            ...common_1.Common.lookupOneField(common_1.COLLECTION.USER, 'created_by', common_1.ENUM_POPULATE_AGGREGATE.USER),
            ...this.lookupSponsorshipForms(),
            ...this.lookupPlatforms(),
            ...this.destructorMinAndMaxPackageValue('sponsorship_packages', 'sponsor_package_unit', 'sponsorship_package_values', 'sponsor_package_min', 'sponsor_package_max'),
            {
                $addFields: {
                    sponsor_package_min_trans: this.convertPackageValueToString('sponsor_package_min'),
                    sponsor_package_max_trans: this.convertPackageValueToString('sponsor_package_max'),
                },
            },
            {
                $project: {
                    __v: 0,
                    sponsorship_form_source_datas: 0,
                    platform_source_datas: 0,
                },
            },
        ];
        const data = await this._aggregate(aggregate);
        return data?.[0];
    }
    async findOneForAdmin(_id) {
        const aggregate = [
            {
                $match: {
                    _id: common_1.Common.toObjectId(_id),
                },
            },
            ...common_1.Common.lookupArrayField(common_1.COLLECTION.ATTRIBUTE_CAST, 'casts', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
            ...common_1.Common.lookupOneField(common_1.COLLECTION.ATTRIBUTE_CATEGORY, 'sponsor_categories', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
            ...common_1.Common.lookupArrayField(common_1.COLLECTION.ATTRIBUTE_HASHTAG, 'sponsor_hashtags', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
            ...common_1.Common.lookupOneField(common_1.COLLECTION.USER, 'created_by', common_1.ENUM_POPULATE_AGGREGATE.USER),
            ...this.lookupSponsorshipForms(),
            ...this.lookupPlatforms(),
            ...this.destructorMinAndMaxPackageValue('sponsorship_packages', 'sponsor_package_unit', 'sponsorship_package_values', 'sponsor_package_min', 'sponsor_package_max'),
            {
                $addFields: {
                    sponsor_package_min_trans: this.convertPackageValueToString('sponsor_package_min'),
                    sponsor_package_max_trans: this.convertPackageValueToString('sponsor_package_max'),
                },
            },
            {
                $project: {
                    __v: 0,
                    sponsorship_form_source_datas: 0,
                    platform_source_datas: 0,
                },
            },
        ];
        const data = await this._aggregate(aggregate);
        return data?.[0];
    }
    logSponsorUpdate(sponsor, user, pre_data, updated_data, action) {
        try {
            if (!sponsor || !user) {
                this.logger.error('Sponsor_log: Missing required parameters');
            }
            this.sponsorLogModel.create({
                sponsor: sponsor,
                created_by: user,
                updated_by: user,
                previous_data: pre_data,
                updated_data: updated_data,
                action,
            });
        }
        catch (error) {
            this.logger.error('Error logging sponsor update:', error);
        }
    }
    async findById(_id) {
        const aggregate = [
            {
                $match: {
                    _id: common_1.Common.toObjectId(_id),
                },
            },
            ...common_1.Common.lookupArrayField(common_1.COLLECTION.ATTRIBUTE_CAST, 'casts', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
            ...common_1.Common.lookupOneField(common_1.COLLECTION.ATTRIBUTE_CATEGORY, 'sponsor_categories', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
            ...common_1.Common.lookupArrayField(common_1.COLLECTION.ATTRIBUTE_HASHTAG, 'sponsor_hashtags', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
            ...common_1.Common.lookupOneField(common_1.COLLECTION.USER, 'created_by', common_1.ENUM_POPULATE_AGGREGATE.USER),
            {
                $lookup: {
                    from: common_1.COLLECTION.ATTRIBUTE_SPONSORSHIP_FORM,
                    let: { refIDs: '$sponsorship_forms.sponsorship_form' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ['$_id', { $ifNull: ['$$refIDs', []] }],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: common_1.COLLECTION.ATTRIBUTE_SPONSORSHIP_BENEFIT,
                                localField: 'sponsor_benefit',
                                foreignField: '_id',
                                as: 'sponsor_benefit_data',
                            },
                        },
                        { $unwind: '$sponsor_benefit_data' },
                    ],
                    as: 'sponsorship_form_source_datas',
                },
            },
            ...common_1.Common.lookupArrayField(common_1.COLLECTION.ATTRIBUTE_PLATFORM, 'platforms.platform', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON, '$_id', 'platform_source_datas'),
            ...common_1.Common.mergeObjectAfterLookupArray('platforms', 'platforms', 'platform_source_datas', 'platform'),
            ...common_1.Common.mergeObjectAfterLookupArray('sponsorship_forms', 'sponsorship_forms', 'sponsorship_form_source_datas', 'sponsorship_form'),
            {
                $project: {
                    __v: 0,
                    sponsorship_form_source_datas: 0,
                    platform_source_datas: 0,
                },
            },
        ];
        const data = await this._aggregate(aggregate);
        return data?.[0];
    }
    async findSponsorsWithExpiration() {
        return await this.model.find({
            sponsorship_expiration_date: { $exists: true, $gte: new Date() },
            display_status: {
                $nin: [
                    enums_1.DisplayStatus.REFUSE,
                    enums_1.DisplayStatus.HIDEN,
                    enums_1.DisplayStatus.EXPIRED,
                    enums_1.DisplayStatus.APPROVED,
                    enums_1.DisplayStatus.DRAFT,
                    enums_1.DisplayStatus.PENDING,
                ],
            },
        });
    }
    lookupPlatforms() {
        return [
            ...common_1.Common.lookupArrayField(common_1.COLLECTION.ATTRIBUTE_PLATFORM, 'platforms.platform', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON, '$_id', 'platform_source_datas'),
            ...common_1.Common.mergeObjectAfterLookupArray('platforms', 'platforms', 'platform_source_datas', 'platform'),
        ];
    }
    lookupSponsorshipForms() {
        return [
            {
                $lookup: {
                    from: common_1.COLLECTION.ATTRIBUTE_SPONSORSHIP_FORM,
                    let: { refIDs: '$sponsorship_forms.sponsorship_form' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ['$_id', { $ifNull: ['$$refIDs', []] }],
                                },
                            },
                        },
                        ...common_1.Common.lookupOneField(common_1.COLLECTION.ATTRIBUTE_SPONSORSHIP_BENEFIT, 'sponsor_benefit', common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON),
                        {
                            $project: {
                                ...common_1.ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
                                sponsor_benefit: 1,
                            },
                        },
                    ],
                    as: 'sponsorship_form_source_datas',
                },
            },
            ...common_1.Common.mergeObjectAfterLookupArray('sponsorship_forms', 'sponsorship_forms', 'sponsorship_form_source_datas', 'sponsorship_form'),
        ];
    }
    convertPackageValueToString(convert_value) {
        return {
            $cond: {
                if: {
                    $eq: [{ $isNumber: `$${convert_value}` }, true],
                },
                then: {
                    $cond: {
                        if: {
                            $gte: [`$${convert_value}`, constants_1.PACKAGE_SCALE.THOUSAND_BILLION.value],
                        },
                        then: {
                            $concat: [
                                {
                                    $toString: {
                                        $round: [
                                            {
                                                $divide: [
                                                    `$${convert_value}`,
                                                    constants_1.PACKAGE_SCALE.THOUSAND_BILLION.value,
                                                ],
                                            },
                                            1,
                                        ],
                                    },
                                },
                                ` ${constants_1.PACKAGE_SCALE.THOUSAND_BILLION.trans_scale}`,
                            ],
                        },
                        else: {
                            $cond: {
                                if: {
                                    $gte: [`$${convert_value}`, constants_1.PACKAGE_SCALE.BILLION.value],
                                },
                                then: {
                                    $concat: [
                                        {
                                            $toString: {
                                                $round: [
                                                    {
                                                        $divide: [
                                                            `$${convert_value}`,
                                                            constants_1.PACKAGE_SCALE.BILLION.value,
                                                        ],
                                                    },
                                                    1,
                                                ],
                                            },
                                        },
                                        ` ${constants_1.PACKAGE_SCALE.BILLION.trans_scale}`,
                                    ],
                                },
                                else: {
                                    $cond: {
                                        if: {
                                            $gte: [`$${convert_value}`, constants_1.PACKAGE_SCALE.MILLION.value],
                                        },
                                        then: {
                                            $concat: [
                                                {
                                                    $toString: {
                                                        $round: [
                                                            {
                                                                $divide: [
                                                                    `$${convert_value}`,
                                                                    constants_1.PACKAGE_SCALE.MILLION.value,
                                                                ],
                                                            },
                                                            1,
                                                        ],
                                                    },
                                                },
                                                ` ${constants_1.PACKAGE_SCALE.MILLION.trans_scale}`,
                                            ],
                                        },
                                        else: {
                                            $cond: {
                                                if: {
                                                    $gte: [
                                                        `$${convert_value}`,
                                                        constants_1.PACKAGE_SCALE.THOUSAND.value,
                                                    ],
                                                },
                                                then: {
                                                    $concat: [
                                                        {
                                                            $toString: {
                                                                $round: [
                                                                    {
                                                                        $divide: [
                                                                            `$${convert_value}`,
                                                                            constants_1.PACKAGE_SCALE.THOUSAND.value,
                                                                        ],
                                                                    },
                                                                    1,
                                                                ],
                                                            },
                                                        },
                                                        ` ${constants_1.PACKAGE_SCALE.THOUSAND.trans_scale}`,
                                                    ],
                                                },
                                                else: {
                                                    $concat: [
                                                        {
                                                            $toString: {
                                                                $round: [
                                                                    {
                                                                        $divide: [`$${convert_value}`, 1],
                                                                    },
                                                                    1,
                                                                ],
                                                            },
                                                        },
                                                        ` đ`,
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                else: `$${convert_value}`,
            },
        };
    }
    destructorMinAndMaxPackageValue(package_field, new_unit_field, new_range_field, new_min_field, new_max_field) {
        return [
            {
                $addFields: {
                    [`${new_range_field}`]: {
                        $reduce: {
                            input: `$${package_field}`,
                            initialValue: [],
                            in: {
                                $concatArrays: ['$$value', ['$$this.package_value']],
                            },
                        },
                    },
                    [`${new_unit_field}`]: {
                        $arrayElemAt: [`$${package_field}.package_unit`, -1],
                    },
                },
            },
            {
                $addFields: {
                    [`${new_min_field}`]: {
                        $min: `$${new_range_field}`,
                    },
                    [`${new_max_field}`]: {
                        $max: `$${new_range_field}`,
                    },
                },
            },
            {
                $addFields: {
                    [`${new_min_field}`]: {
                        $cond: [
                            { $eq: [`$${new_min_field}`, `$${new_max_field}`] },
                            0,
                            `$${new_min_field}`,
                        ],
                    },
                },
            },
        ];
    }
    async handleQueryBudgetRanges(budget_ranges, condition_keyword) {
        budget_ranges = budget_ranges?.split(',');
        const budget_range_datas = await this.attributeBudgetRangeService._find({
            _id: { $in: common_1.Common.toObjectId(budget_ranges) },
        });
        budget_range_datas?.map((budget_range_data) => {
            const min_range = budget_range_data?.min_range?.value;
            const max_range = budget_range_data?.max_range?.value;
            if (min_range && max_range) {
                if (!condition_keyword['$or']) {
                    condition_keyword['$or'] = [];
                }
                condition_keyword['$or'].push({
                    sponsor_package_min: {
                        $lte: min_range,
                    },
                    sponsor_package_max: {
                        $gte: max_range,
                    },
                });
                condition_keyword['$or'].push({
                    sponsor_package_min: common_1.Common.createConditionFromValueToValue(min_range, max_range),
                });
                condition_keyword['$or'].push({
                    sponsor_package_max: common_1.Common.createConditionFromValueToValue(min_range, max_range),
                });
            }
        });
    }
    async create(payload) {
        this._validateSponsorDate(payload);
        if (common_1.Common.compareValues(payload.display_status, enums_1.DisplayStatus.DRAFT)) {
            payload = this._transformDraft(payload);
            payload.production_status =
                payload?.production_status || enums_1.ProductionStatus.PLANNING;
            payload.introduction_images = payload?.introduction_images?.filter((element) => {
                return element;
            });
        }
        payload.sponsorship_status = this._handleSponporStatus(payload);
        return await this._create(payload);
    }
    async update(id, payload, user) {
        const sponsor = await this._getInformation(id);
        if (common_1.Common.compareValues(user.account_type, common_1.ACCOUNT_TYPE.PUBLISHER) &&
            common_1.Common.compareValues(sponsor.display_status, enums_1.DisplayStatus.EXPIRED)) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.SPONSOR.EXPIRED,
            }, common_2.HttpStatus.BAD_REQUEST);
        }
        this._validateSponsorDate(payload);
        if (!common_1.Common.compareValues(sponsor.display_status, enums_1.DisplayStatus.DRAFT) &&
            common_1.Common.compareValues(payload?.display_status, enums_1.DisplayStatus.DRAFT)) {
            (0, shared_1.throwErrorMessage)({ error_code: error_constant_1.ERROR_CODE.SPONSOR.DISPLAY_STATUS.NOT_DRAFT }, common_2.HttpStatus.BAD_REQUEST);
        }
        if (common_1.Common.compareValues(sponsor.display_status, enums_1.DisplayStatus.APPROVED)) {
            if (common_1.Common.compareValues(user.account_type, common_1.ACCOUNT_TYPE.PUBLISHER) &&
                !common_1.Common.compareValues(sponsor.display_status, payload?.display_status)) {
                (0, shared_1.throwErrorMessage)({
                    error_code: error_constant_1.ERROR_CODE.SPONSOR.PUBLISHER.NOT_ALLOWED_CHANGE_STATUS,
                }, common_2.HttpStatus.BAD_REQUEST);
            }
        }
        let isPushCronScheduler = false;
        if ([
            enums_1.DisplayStatus.LISTED,
            enums_1.DisplayStatus.HIDEN,
            enums_1.DisplayStatus.LEAVING,
            enums_1.DisplayStatus.EXPIRED,
        ]?.includes(sponsor.display_status)) {
            if (common_1.Common.compareValues(user.account_type, common_1.ACCOUNT_TYPE.PUBLISHER) &&
                this._validateInvalidChanges(sponsor, payload)) {
                (0, shared_1.throwErrorMessage)({
                    error_code: error_constant_1.ERROR_CODE.SPONSOR.PUBLISHER.NOT_ALLOWED_CHANGES,
                    i18nArgs: {
                        attribute: sponsor.display_status === enums_1.DisplayStatus.LISTED
                            ? 'đã đăng'
                            : 'ẩn',
                    },
                }, common_2.HttpStatus.BAD_REQUEST);
            }
            if (common_1.Common.compareValues(user.account_type, common_1.ACCOUNT_TYPE.ADMIN) &&
                !common_1.Common.compareValues(common_1.Common.getLocalOffset(sponsor.sponsorship_expiration_date), common_1.Common.getLocalOffset(payload.sponsorship_expiration_date))) {
                if ([
                    enums_1.DisplayStatus.LISTED,
                    enums_1.DisplayStatus.LEAVING,
                    enums_1.DisplayStatus.EXPIRED,
                ].includes(sponsor.display_status)) {
                    const leavingDate = moment(common_1.Common.getLocalOffset(payload.sponsorship_expiration_date))
                        .subtract(constants_1.NUMBER_DAYS_CHANGE_LEAVING_TO_EXPRIED_STATUS, 'days')
                        .toDate();
                    if (moment(new Date()).isAfter(common_1.Common.getLocalOffset(payload.sponsorship_expiration_date))) {
                        payload.display_status = enums_1.DisplayStatus.EXPIRED;
                        payload.priority = null;
                    }
                    else if (moment(new Date()).isAfter(leavingDate)) {
                        payload.display_status = enums_1.DisplayStatus.LEAVING;
                    }
                    else {
                        payload.display_status = enums_1.DisplayStatus.LISTED;
                    }
                    isPushCronScheduler = true;
                }
            }
        }
        payload.sponsorship_status = this._handleSponporStatus(payload);
        if (payload.introduction_images) {
            payload.introduction_images = payload.introduction_images?.filter(Boolean);
        }
        if ([
            enums_1.DisplayStatus.APPROVED,
            enums_1.DisplayStatus.LISTED,
            enums_1.DisplayStatus.HIDEN,
            enums_1.DisplayStatus.LEAVING,
            enums_1.DisplayStatus.EXPIRED,
        ]?.includes(sponsor.display_status)) {
            const preLogData = new sponsor_log_pre_data_entity_1.SponsorLogPreDataEntity(sponsor);
            const data_changed = this._filterFieldChanged(sponsor, payload);
            this.logSponsorUpdate(id, user?.sub, preLogData, data_changed, common_1.LOG_ACTION.UPDATE);
        }
        const updateSponsor = await this._findByIdAndUpdate(id, payload);
        if (isPushCronScheduler) {
            this.eventEmitterT.emit(common_1.EMITTER.SYNCHORONIZED_SCHEDULER_CRON, updateSponsor);
        }
        return updateSponsor;
    }
    async updateStatus(id, payload) {
        const new_status = payload.display_status;
        const reason = payload?.reason;
        const user = payload.updated_by;
        const sponsor = await this._getInformation(id);
        if (!(0, enums_1.isTransitionValid)(sponsor.display_status, new_status)) {
            throw new common_2.BadRequestException('Invalid status transition');
        }
        const updatePayload = {
            display_status: new_status,
            updated_by: user || undefined,
            updated_at: payload.updated_at || new Date(),
        };
        const newLogData = {
            display_status: new_status,
        };
        if (common_1.Common.compareValues(new_status, enums_1.DisplayStatus.REFUSE)) {
            if (!reason) {
                throw new common_2.BadRequestException('Reason is required when setting status to REFUSE');
            }
            const rejectInstance = {
                reason: payload.reason,
                refuser: user,
                created_at: payload.updated_at,
            };
            updatePayload.reason_rejected = rejectInstance;
            updatePayload.rejected_histories = sponsor?.rejected_histories.concat([
                rejectInstance,
            ]);
        }
        if (new_status === enums_1.DisplayStatus.APPROVED) {
            updatePayload.user_approved = user;
            updatePayload.approved_date = sponsor.approved_date
                ? sponsor.approved_date
                : new Date();
        }
        if (new_status === enums_1.DisplayStatus.LISTED) {
            const leavingDate = moment(common_1.Common.getLocalOffset(sponsor.sponsorship_expiration_date))
                .subtract(constants_1.NUMBER_DAYS_CHANGE_LEAVING_TO_EXPRIED_STATUS, 'days')
                .toDate();
            if (moment(new Date()).isAfter(common_1.Common.getLocalOffset(sponsor.sponsorship_expiration_date))) {
                updatePayload.display_status = enums_1.DisplayStatus.EXPIRED;
            }
            else if (moment(new Date()).isAfter(leavingDate)) {
                updatePayload.display_status = enums_1.DisplayStatus.LEAVING;
            }
            this.eventEmitterT.emit(common_1.EMITTER.SYNCHORONIZED_SCHEDULER_CRON, sponsor);
        }
        if (new_status === enums_1.DisplayStatus.EXPIRED) {
            updatePayload.priority = null;
        }
        const preLogData = new sponsor_log_pre_data_entity_1.SponsorLogPreDataEntity(sponsor);
        this.logSponsorUpdate(id, user, preLogData, newLogData, common_1.LOG_ACTION.UPDATE_STATUS);
        let isPushCronScheduler = false;
        if ([
            enums_1.DisplayStatus.LISTED,
            enums_1.DisplayStatus.LEAVING,
            enums_1.DisplayStatus.HIDEN,
        ].includes(sponsor.display_status)) {
            isPushCronScheduler = true;
        }
        const updatedSponsor = await this._findByIdAndUpdate(id, updatePayload);
        if (isPushCronScheduler) {
            this.eventEmitterT.emit(common_1.EMITTER.SYNCHORONIZED_SCHEDULER_CRON, updatedSponsor);
        }
        return updatedSponsor;
    }
    _transformDraft(payload) {
        for (const property of constants_1.DRAFT_PROPERTIES) {
            if (payload?.[property.key]?.length) {
                payload[property.key] =
                    payload[property.key]?.filter((element) => {
                        const array = property.values.filter((value) => {
                            return (element?.[value] ||
                                element?.[value] === 0 ||
                                (0, class_validator_1.IsBoolean)(element?.[value]));
                        });
                        return array?.length === property.values?.length;
                    }) || [];
            }
        }
        return payload;
    }
    _validateSponsorDate(payload) {
        if (payload?.start_date &&
            payload?.end_date &&
            !moment(payload.end_date).isAfter(payload.start_date)) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.SPONSOR.END_DATE.AFTER_START_DATE,
            }, common_2.HttpStatus.BAD_REQUEST);
        }
        if (payload?.start_date &&
            payload?.sponsorship_expiration_date &&
            !moment(payload.sponsorship_expiration_date).isAfter(payload.start_date)) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.SPONSOR.EXPIRATION_DATE.AFTER_START_DATE,
            }, common_2.HttpStatus.BAD_REQUEST);
        }
    }
    async _getInformation(id) {
        const sponsor = await this._findById(common_1.Common.toObjectId(id));
        if (!sponsor) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.NOT_EXIST,
                i18nArgs: { attribute: 'Bài Sponsor' },
            }, common_2.HttpStatus.BAD_REQUEST);
        }
        return sponsor;
    }
    _filterFieldChanged(old_data, new_data) {
        try {
            const data = {};
            for (const property in new_data) {
                if (!_.isEqual(old_data[property], new_data[property])) {
                    data[property] = new_data[property];
                }
            }
            return data;
        }
        catch (error) {
            this.logger.error('Sponsor log fail', error?.message);
        }
    }
    _validateInvalidChanges(sponsor, payload) {
        let isChange = false;
        const arrayProperties = [
            'introduction_images',
            'casts',
        ];
        const singleProperies = [
            'sponsor_name',
            'cover_image',
            'banner_image',
            'sponsor_categories',
            'sponsor_kpi',
            'short_description',
            'detailed_description',
            'sponsorship_expiration_date',
            'start_date',
            'end_date',
            'product_limited_is_limit',
            'product_limited_description',
        ];
        for (const property of constants_1.VERIFY_PROPERTIES) {
            if (singleProperies?.includes(property)) {
                if (['sponsorship_expiration_date', 'start_date', 'end_date']?.includes(property)) {
                    const current = sponsor?.[property]
                        ? moment(common_1.Common.getLocalOffset(sponsor[property], 'MM-DD-YYYY', 420))
                        : null;
                    const update = payload?.[property]
                        ? moment(common_1.Common.getLocalOffset(payload[property], 'MM-DD-YYYY', 0))
                        : null;
                    if (!common_1.Common.compareValues(current, update)) {
                        isChange = true;
                        break;
                    }
                }
                else {
                    if (!common_1.Common.compareValues(sponsor?.[property], payload?.[property])) {
                        isChange = true;
                        break;
                    }
                }
            }
            if (arrayProperties?.includes(property)) {
                const { newArray, oldArray } = common_1.Common.compareBetweenPastAndCurrent(sponsor?.[property]?.map((element) => element?.toString()), payload?.[property]?.map((element) => element?.toString()));
                if (newArray?.length || oldArray?.length) {
                    isChange = true;
                    break;
                }
            }
            if ([
                'platforms',
                'sponsorship_forms',
                'sponsor_schedulers',
                'sponsorship_packages',
            ].includes(property)) {
                sponsor[property] = sponsor?.[property]?.length
                    ? sponsor?.[property]
                    : [];
                payload[property] = payload?.[property]?.length
                    ? payload?.[property]
                    : [];
                if (sponsor?.[property]?.length !== payload?.[property]?.length) {
                    isChange = true;
                    break;
                }
                else {
                    if (!this._validateArrayChanges(sponsor?.[property], payload?.[property], property)) {
                        isChange = true;
                        break;
                    }
                }
            }
        }
        return isChange;
    }
    _validateArrayChanges(olds = [], news = [], property) {
        let isValid = true;
        const oldKeys = olds?.length ? Object.keys(olds[0]) : [];
        const newKeys = news?.length ? Object.keys(news[0]) : [];
        let keys = _.uniq(oldKeys.concat(newKeys));
        keys = keys.filter((key) => {
            return !['_id', 'status'].includes(key);
        });
        if (keys?.length) {
            for (const key of keys) {
                const oldValues = olds.map((element) => element[key]?.toString());
                const newValues = news.map((element) => element[key]?.toString());
                const { newArray, oldArray } = common_1.Common.compareBetweenPastAndCurrent(oldValues, newValues);
                if (newArray?.length || oldArray?.length) {
                    isValid = false;
                    break;
                }
            }
        }
        return isValid;
    }
    _handleSponporStatus(payload) {
        const usages = payload?.sponsorship_packages?.filter((element) => {
            return element.status;
        });
        const availables = payload?.sponsorship_packages?.filter((element) => {
            return !element.status;
        });
        if ((!usages?.length && availables?.length > 1) ||
            !payload?.sponsorship_packages?.length) {
            return enums_1.SponsorshipStatus.NO_SPONSOR;
        }
        if (availables?.length) {
            if (availables?.length == 1) {
                return enums_1.SponsorshipStatus.ONE_SPONSORSHIP_POSITION;
            }
            else {
                return enums_1.SponsorshipStatus.SPONSORSHIP_AVAILABLE;
            }
        }
        return enums_1.SponsorshipStatus.FULL;
    }
    async _handleCronScheduler(sponsor) {
        try {
            let isOnlyRemove = false;
            const uri = `${this.configService.get(common_1.ENVIROMENT_VARIABLE.SCHUDULER_API_URL)}/v1/schedules/set-cron-jobs/${sponsor._id}`;
            if (common_1.Common.compareValues(sponsor.display_status, enums_1.DisplayStatus.HIDEN)) {
                isOnlyRemove = true;
            }
            await this.httpService.post(uri, { isOnlyRemove }).toPromise();
        }
        catch (error) {
            this.logger.error(error.message);
        }
    }
    async sendCustomEmail(body) {
        const { customer_email } = body;
        return await this.mailService.sendMessageForUserMail({
            to: this.configService.get(common_1.ENVIROMENT_VARIABLE.ADMIN_MAIL),
            subject: mail_enum_1.MAIL_SUBJECT.CUSTOMER_MAIL,
            template: mail_enum_1.TEMPLATE.CUSTOMER_MAIL,
            context: { customer_email },
        });
    }
    async sendContactEmail(body) {
        const { customer_email, issue_description, customer_name } = body;
        return await this.mailService.sendMessageForUserMail({
            to: this.configService.get(common_1.ENVIROMENT_VARIABLE.ADMIN_MAIL),
            subject: mail_enum_1.MAIL_SUBJECT.CONTACT_MAIL,
            template: mail_enum_1.TEMPLATE.CONTACT_MAIL,
            context: {
                customer_email,
                issue_description,
                customer_name,
            },
        });
    }
    async sendDetailSponsorEmail(body) {
        const { customer_email, issue_description, sponsor_id } = body;
        const sponsor = await this._findById(sponsor_id, [
            { path: 'created_by', select: common_1.POPULATE.USER },
        ]);
        if (!sponsor || !sponsor.created_by.email) {
            throw new common_2.HttpException('Can not find sponsor', common_2.HttpStatus.BAD_REQUEST);
        }
        const publisher_name = sponsor.created_by.username;
        const sponsor_name = sponsor.sponsor_name;
        return await this.mailService.sendMessageForUserMail({
            to: sponsor.created_by.email,
            subject: mail_enum_1.MAIL_SUBJECT.SPONSOR_DETAIL_MAIL,
            template: mail_enum_1.TEMPLATE.SPONSOR_DETAIL_EMAIL,
            context: {
                customer_email,
                issue_description,
                sponsor_name,
                publisher_name,
            },
        });
    }
    async handleEmitterSynchoronizedSchedulerCron(sponsor) {
        try {
            await this._handleCronScheduler(sponsor);
        }
        catch (error) {
            this.logger.error(`ERROR:EVENT_EMIITER: handleEmitterSynchoronizedSchedulerCron=>ROOT CAUSE: ${JSON.stringify(error?.message ?? error)}`);
        }
    }
};
exports.SponsorService = SponsorService;
__decorate([
    (0, event_emitter_1.OnEvent)(common_1.EMITTER.SYNCHORONIZED_SCHEDULER_CRON),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof schemas_1.ISponsor !== "undefined" && schemas_1.ISponsor) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], SponsorService.prototype, "handleEmitterSynchoronizedSchedulerCron", null);
exports.SponsorService = SponsorService = __decorate([
    (0, common_2.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Sponsor.name, common_1.CONNECTION_NAME.PRIMARY)),
    __param(1, (0, mongoose_1.InjectModel)(schemas_1.Sponsor.name, common_1.CONNECTION_NAME.SECONDARY)),
    __param(2, (0, mongoose_1.InjectModel)(sponsor_log_schema_1.SponsorLog.name, common_1.CONNECTION_NAME.PRIMARY)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object, typeof (_c = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _c : Object, typeof (_d = typeof attribute_category_service_1.AttributeCategoryService !== "undefined" && attribute_category_service_1.AttributeCategoryService) === "function" ? _d : Object, typeof (_e = typeof attribute_budget_range_service_1.AttributeBudgetRangeService !== "undefined" && attribute_budget_range_service_1.AttributeBudgetRangeService) === "function" ? _e : Object, typeof (_f = typeof setting_service_1.SettingService !== "undefined" && setting_service_1.SettingService) === "function" ? _f : Object, typeof (_g = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _g : Object, typeof (_h = typeof mail_service_1.MailService !== "undefined" && mail_service_1.MailService) === "function" ? _h : Object])
], SponsorService);


/***/ }),
/* 193 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeCategoryService = void 0;
const mongoose_1 = __webpack_require__(80);
const mongoose_2 = __webpack_require__(52);
const common_1 = __webpack_require__(28);
const common_2 = __webpack_require__(1);
const schemas_1 = __webpack_require__(160);
const shared_1 = __webpack_require__(32);
const error_constant_1 = __webpack_require__(78);
const entities_1 = __webpack_require__(194);
let AttributeCategoryService = class AttributeCategoryService extends common_2.BaseService {
    constructor(model, readModel) {
        super(model, readModel);
        this.model = model;
        this.readModel = readModel;
        this.model_name = common_2.ENUM_MODEL.ATTRIBUTE_CATEGORY;
    }
    conditionFindAll(query) {
        const { condition, condition_keyword, sort, select_after_query } = common_2.Common._conditionFindAll({
            query,
            condition_fields: ['status'],
        });
        return {
            condition: condition,
            condition_keyword: condition_keyword,
            sort: sort,
            select_after_query: select_after_query,
        };
    }
    async findAll(query) {
        const { condition, condition_keyword, sort, select_after_query } = this.conditionFindAll(query);
        const categories = await this._findAll(query, condition, condition_keyword, [], {}, sort);
        return categories;
    }
    async findById(_id) {
        const category = await this._findById(_id);
        return category;
    }
    async create(body) {
        const category_existed = await this._findOne({ name: body.name });
        if (category_existed) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.EXISTS,
                i18nArgs: { attribute: 'Thể loại' },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const create_payload = new entities_1.CreateAttributeCategoryEntity(body);
        return await this._create(create_payload);
    }
    async update(id, body) {
        const category_existed = await this._findOne({
            name: body.name,
            _id: { $ne: common_2.Common.toObjectId(id) },
        });
        if (category_existed) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.EXISTS,
                i18nArgs: { attribute: 'Thể loại' },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const upload_payload = new entities_1.UpdateAttributeCategoryEntity(body);
        return await this._findByIdAndUpdate(id, upload_payload);
    }
    async updateStatus(id, updateStatusDto) {
        const upload_payload = new entities_1.UpdateStatusAttributeCategoryEntity(updateStatusDto);
        return await this._findByIdAndUpdate(id, upload_payload);
    }
};
exports.AttributeCategoryService = AttributeCategoryService;
exports.AttributeCategoryService = AttributeCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.AttributeCategory.name, common_2.CONNECTION_NAME.PRIMARY)),
    __param(1, (0, mongoose_1.InjectModel)(schemas_1.AttributeCategory.name, common_2.CONNECTION_NAME.SECONDARY)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], AttributeCategoryService);


/***/ }),
/* 194 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(195), exports);
__exportStar(__webpack_require__(249), exports);
__exportStar(__webpack_require__(253), exports);
__exportStar(__webpack_require__(257), exports);
__exportStar(__webpack_require__(261), exports);
__exportStar(__webpack_require__(265), exports);
__exportStar(__webpack_require__(269), exports);
__exportStar(__webpack_require__(273), exports);
__exportStar(__webpack_require__(197), exports);
__exportStar(__webpack_require__(246), exports);


/***/ }),
/* 195 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(196), exports);
__exportStar(__webpack_require__(245), exports);
__exportStar(__webpack_require__(247), exports);


/***/ }),
/* 196 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAttributeBudgetRangeEntity = void 0;
const swagger_1 = __webpack_require__(3);
const create_common_entity_1 = __webpack_require__(197);
const dto_1 = __webpack_require__(198);
class CreateAttributeBudgetRangeEntity extends create_common_entity_1.CommonCreateAttributeEntity {
    constructor(object) {
        super(object);
        this.min_range = object?.min_range;
        this.max_range = object?.max_range;
    }
}
exports.CreateAttributeBudgetRangeEntity = CreateAttributeBudgetRangeEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'Mức sàn',
    }),
    __metadata("design:type", typeof (_a = typeof dto_1.RangeDTO !== "undefined" && dto_1.RangeDTO) === "function" ? _a : Object)
], CreateAttributeBudgetRangeEntity.prototype, "min_range", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'Mức trần',
    }),
    __metadata("design:type", typeof (_b = typeof dto_1.RangeDTO !== "undefined" && dto_1.RangeDTO) === "function" ? _b : Object)
], CreateAttributeBudgetRangeEntity.prototype, "max_range", void 0);


/***/ }),
/* 197 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonCreateAttributeEntity = void 0;
const common_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(3);
class CommonCreateAttributeEntity extends common_1.BaseCreateEntity {
    constructor(object) {
        super(object);
        this.name = object?.name;
        this.description = object?.description;
        this.image = object?.image;
    }
}
exports.CommonCreateAttributeEntity = CommonCreateAttributeEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'Id',
        example: 'vtv',
    }),
    __metadata("design:type", String)
], CommonCreateAttributeEntity.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Mô tả ',
        example: 'This is description',
    }),
    __metadata("design:type", String)
], CommonCreateAttributeEntity.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        description: 'path hình ảnh',
        example: '/public/image/followme.jpg',
    }),
    __metadata("design:type", String)
], CommonCreateAttributeEntity.prototype, "image", void 0);


/***/ }),
/* 198 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(199), exports);
__exportStar(__webpack_require__(210), exports);
__exportStar(__webpack_require__(215), exports);
__exportStar(__webpack_require__(220), exports);
__exportStar(__webpack_require__(225), exports);
__exportStar(__webpack_require__(230), exports);
__exportStar(__webpack_require__(235), exports);
__exportStar(__webpack_require__(240), exports);
__exportStar(__webpack_require__(201), exports);
__exportStar(__webpack_require__(205), exports);
__exportStar(__webpack_require__(209), exports);
__exportStar(__webpack_require__(207), exports);


/***/ }),
/* 199 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(200), exports);
__exportStar(__webpack_require__(204), exports);
__exportStar(__webpack_require__(206), exports);
__exportStar(__webpack_require__(208), exports);


/***/ }),
/* 200 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAttributeBudgetRangeDTO = exports.RangeDTO = void 0;
const class_validator_1 = __webpack_require__(7);
const create_common_dto_1 = __webpack_require__(201);
const swagger_1 = __webpack_require__(3);
const common_1 = __webpack_require__(1);
class RangeDTO {
}
exports.RangeDTO = RangeDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: Number,
        description: 'value budget',
        example: 1000000,
    }),
    __metadata("design:type", Number)
], RangeDTO.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(common_1.ENUM_CURRENCY_UNIT),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'unit of value',
        example: common_1.ENUM_CURRENCY_UNIT.VND,
    }),
    __metadata("design:type", String)
], RangeDTO.prototype, "unit", void 0);
class CreateAttributeBudgetRangeDTO extends create_common_dto_1.CommonCreateAttributeDTO {
}
exports.CreateAttributeBudgetRangeDTO = CreateAttributeBudgetRangeDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: Object,
    }),
    __metadata("design:type", RangeDTO)
], CreateAttributeBudgetRangeDTO.prototype, "min_range", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: Object,
    }),
    __metadata("design:type", RangeDTO)
], CreateAttributeBudgetRangeDTO.prototype, "max_range", void 0);


/***/ }),
/* 201 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonCreateAttributeDTO = void 0;
const common_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(3);
const class_validator_1 = __webpack_require__(7);
const constants_1 = __webpack_require__(202);
class CommonCreateAttributeDTO extends common_1.BaseCreateDTO {
}
exports.CommonCreateAttributeDTO = CommonCreateAttributeDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(constants_1.MAX_LENGTH_NAME_ATTRIBUTE),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'name of attribute sponsor',
        example: 'vtv',
    }),
    __metadata("design:type", String)
], CommonCreateAttributeDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(constants_1.MAX_LENGTH_DESCRIPTION_ATTRIBUTE),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        description: 'description of attribute sponsor',
        example: 'vtv hashtag',
    }),
    __metadata("design:type", String)
], CommonCreateAttributeDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        description: 'image of attribute sponsor',
        example: '/public/image/followme.jpg',
    }),
    __metadata("design:type", String)
], CommonCreateAttributeDTO.prototype, "image", void 0);


/***/ }),
/* 202 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(203), exports);


/***/ }),
/* 203 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MAX_LENGTH_DESCRIPTION_ATTRIBUTE = exports.MAX_LENGTH_NAME_ATTRIBUTE = void 0;
exports.MAX_LENGTH_NAME_ATTRIBUTE = 50;
exports.MAX_LENGTH_DESCRIPTION_ATTRIBUTE = 1000;


/***/ }),
/* 204 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FindAttributeBudgetRangeDTO = void 0;
const find_common_dto_1 = __webpack_require__(205);
class FindAttributeBudgetRangeDTO extends find_common_dto_1.CommonFindAttributeDTO {
}
exports.FindAttributeBudgetRangeDTO = FindAttributeBudgetRangeDTO;


/***/ }),
/* 205 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonFindAttributeDTO = void 0;
const common_1 = __webpack_require__(1);
class CommonFindAttributeDTO extends common_1.BaseQueryFilterDTO {
}
exports.CommonFindAttributeDTO = CommonFindAttributeDTO;


/***/ }),
/* 206 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateStatusAttributeBudgetRangeDTO = void 0;
const update_status_common_dto_1 = __webpack_require__(207);
class UpdateStatusAttributeBudgetRangeDTO extends update_status_common_dto_1.CommonUpdateStatusAttributeDTO {
}
exports.UpdateStatusAttributeBudgetRangeDTO = UpdateStatusAttributeBudgetRangeDTO;


/***/ }),
/* 207 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonUpdateStatusAttributeDTO = void 0;
const common_1 = __webpack_require__(1);
class CommonUpdateStatusAttributeDTO extends common_1.BaseUpdateStatusDTO {
}
exports.CommonUpdateStatusAttributeDTO = CommonUpdateStatusAttributeDTO;


/***/ }),
/* 208 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAttributeBudgetRangeDTO = void 0;
const class_validator_1 = __webpack_require__(7);
const update_common_dto_1 = __webpack_require__(209);
const swagger_1 = __webpack_require__(3);
const create_dto_1 = __webpack_require__(200);
class UpdateAttributeBudgetRangeDTO extends update_common_dto_1.CommonUpdateAttributeDTO {
}
exports.UpdateAttributeBudgetRangeDTO = UpdateAttributeBudgetRangeDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: Object,
    }),
    __metadata("design:type", typeof (_a = typeof create_dto_1.RangeDTO !== "undefined" && create_dto_1.RangeDTO) === "function" ? _a : Object)
], UpdateAttributeBudgetRangeDTO.prototype, "min_range", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: Object,
    }),
    __metadata("design:type", typeof (_b = typeof create_dto_1.RangeDTO !== "undefined" && create_dto_1.RangeDTO) === "function" ? _b : Object)
], UpdateAttributeBudgetRangeDTO.prototype, "max_range", void 0);


/***/ }),
/* 209 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonUpdateAttributeDTO = void 0;
const common_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(3);
const class_validator_1 = __webpack_require__(7);
const constants_1 = __webpack_require__(202);
class CommonUpdateAttributeDTO extends common_1.BaseUpdateDTO {
}
exports.CommonUpdateAttributeDTO = CommonUpdateAttributeDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(constants_1.MAX_LENGTH_NAME_ATTRIBUTE),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'name of attribute sponsor',
        example: 'vtv',
    }),
    __metadata("design:type", String)
], CommonUpdateAttributeDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(constants_1.MAX_LENGTH_DESCRIPTION_ATTRIBUTE),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        description: 'description of attribute sponsor',
        example: 'vtv hashtag',
    }),
    __metadata("design:type", String)
], CommonUpdateAttributeDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        description: 'image of attribute sponsor',
        example: '/public/image/followme.jpg',
    }),
    __metadata("design:type", String)
], CommonUpdateAttributeDTO.prototype, "image", void 0);


/***/ }),
/* 210 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(211), exports);
__exportStar(__webpack_require__(212), exports);
__exportStar(__webpack_require__(213), exports);
__exportStar(__webpack_require__(214), exports);


/***/ }),
/* 211 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAttributeCastDTO = void 0;
const class_validator_1 = __webpack_require__(7);
const create_common_dto_1 = __webpack_require__(201);
const swagger_1 = __webpack_require__(3);
class CreateAttributeCastDTO extends create_common_dto_1.CommonCreateAttributeDTO {
}
exports.CreateAttributeCastDTO = CreateAttributeCastDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: (Array),
        description: 'Danh sách thể loại người nổi tiếng',
    }),
    __metadata("design:type", Array)
], CreateAttributeCastDTO.prototype, "cast_professions", void 0);


/***/ }),
/* 212 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FindAttributeCastDTO = void 0;
const find_common_dto_1 = __webpack_require__(205);
class FindAttributeCastDTO extends find_common_dto_1.CommonFindAttributeDTO {
}
exports.FindAttributeCastDTO = FindAttributeCastDTO;


/***/ }),
/* 213 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateStatusAttributeCastDTO = void 0;
const update_status_common_dto_1 = __webpack_require__(207);
class UpdateStatusAttributeCastDTO extends update_status_common_dto_1.CommonUpdateStatusAttributeDTO {
}
exports.UpdateStatusAttributeCastDTO = UpdateStatusAttributeCastDTO;


/***/ }),
/* 214 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAttributeCastDTO = void 0;
const class_validator_1 = __webpack_require__(7);
const update_common_dto_1 = __webpack_require__(209);
const swagger_1 = __webpack_require__(3);
class UpdateAttributeCastDTO extends update_common_dto_1.CommonUpdateAttributeDTO {
}
exports.UpdateAttributeCastDTO = UpdateAttributeCastDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: (Array),
        description: 'Danh sách thể loại người nổi tiếng',
    }),
    __metadata("design:type", Array)
], UpdateAttributeCastDTO.prototype, "cast_professions", void 0);


/***/ }),
/* 215 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(216), exports);
__exportStar(__webpack_require__(217), exports);
__exportStar(__webpack_require__(218), exports);
__exportStar(__webpack_require__(219), exports);


/***/ }),
/* 216 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAttributeCastProfessionDTO = void 0;
const create_common_dto_1 = __webpack_require__(201);
class CreateAttributeCastProfessionDTO extends create_common_dto_1.CommonCreateAttributeDTO {
}
exports.CreateAttributeCastProfessionDTO = CreateAttributeCastProfessionDTO;


/***/ }),
/* 217 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FindAttributeCastProfessionDTO = void 0;
const find_common_dto_1 = __webpack_require__(205);
class FindAttributeCastProfessionDTO extends find_common_dto_1.CommonFindAttributeDTO {
}
exports.FindAttributeCastProfessionDTO = FindAttributeCastProfessionDTO;


/***/ }),
/* 218 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateStatusAttributeCastProfessionDTO = void 0;
const update_status_common_dto_1 = __webpack_require__(207);
class UpdateStatusAttributeCastProfessionDTO extends update_status_common_dto_1.CommonUpdateStatusAttributeDTO {
}
exports.UpdateStatusAttributeCastProfessionDTO = UpdateStatusAttributeCastProfessionDTO;


/***/ }),
/* 219 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAttributeCastProfessionDTO = void 0;
const update_common_dto_1 = __webpack_require__(209);
class UpdateAttributeCastProfessionDTO extends update_common_dto_1.CommonUpdateAttributeDTO {
}
exports.UpdateAttributeCastProfessionDTO = UpdateAttributeCastProfessionDTO;


/***/ }),
/* 220 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(221), exports);
__exportStar(__webpack_require__(222), exports);
__exportStar(__webpack_require__(223), exports);
__exportStar(__webpack_require__(224), exports);


/***/ }),
/* 221 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAttributeCategoryDTO = void 0;
const create_common_dto_1 = __webpack_require__(201);
class CreateAttributeCategoryDTO extends create_common_dto_1.CommonCreateAttributeDTO {
}
exports.CreateAttributeCategoryDTO = CreateAttributeCategoryDTO;


/***/ }),
/* 222 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FindAttributeCategoryDTO = void 0;
const find_common_dto_1 = __webpack_require__(205);
class FindAttributeCategoryDTO extends find_common_dto_1.CommonFindAttributeDTO {
}
exports.FindAttributeCategoryDTO = FindAttributeCategoryDTO;


/***/ }),
/* 223 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateStatusAttributeCategoryDTO = void 0;
const update_status_common_dto_1 = __webpack_require__(207);
class UpdateStatusAttributeCategoryDTO extends update_status_common_dto_1.CommonUpdateStatusAttributeDTO {
}
exports.UpdateStatusAttributeCategoryDTO = UpdateStatusAttributeCategoryDTO;


/***/ }),
/* 224 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAttributeCategoryDTO = void 0;
const update_common_dto_1 = __webpack_require__(209);
class UpdateAttributeCategoryDTO extends update_common_dto_1.CommonUpdateAttributeDTO {
}
exports.UpdateAttributeCategoryDTO = UpdateAttributeCategoryDTO;


/***/ }),
/* 225 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(226), exports);
__exportStar(__webpack_require__(227), exports);
__exportStar(__webpack_require__(228), exports);
__exportStar(__webpack_require__(229), exports);


/***/ }),
/* 226 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAttributeTagDTO = void 0;
const create_common_dto_1 = __webpack_require__(201);
class CreateAttributeTagDTO extends create_common_dto_1.CommonCreateAttributeDTO {
}
exports.CreateAttributeTagDTO = CreateAttributeTagDTO;


/***/ }),
/* 227 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FindAttributeTagDTO = void 0;
const find_common_dto_1 = __webpack_require__(205);
class FindAttributeTagDTO extends find_common_dto_1.CommonFindAttributeDTO {
}
exports.FindAttributeTagDTO = FindAttributeTagDTO;


/***/ }),
/* 228 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateStatusAttributeTagDTO = void 0;
const update_status_common_dto_1 = __webpack_require__(207);
class UpdateStatusAttributeTagDTO extends update_status_common_dto_1.CommonUpdateStatusAttributeDTO {
}
exports.UpdateStatusAttributeTagDTO = UpdateStatusAttributeTagDTO;


/***/ }),
/* 229 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAttributeTagDTO = void 0;
const update_common_dto_1 = __webpack_require__(209);
class UpdateAttributeTagDTO extends update_common_dto_1.CommonUpdateAttributeDTO {
}
exports.UpdateAttributeTagDTO = UpdateAttributeTagDTO;


/***/ }),
/* 230 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(231), exports);
__exportStar(__webpack_require__(232), exports);
__exportStar(__webpack_require__(233), exports);
__exportStar(__webpack_require__(234), exports);


/***/ }),
/* 231 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAttributePlatformDTO = void 0;
const create_common_dto_1 = __webpack_require__(201);
class CreateAttributePlatformDTO extends create_common_dto_1.CommonCreateAttributeDTO {
}
exports.CreateAttributePlatformDTO = CreateAttributePlatformDTO;


/***/ }),
/* 232 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FindAttributePlatformDTO = void 0;
const find_common_dto_1 = __webpack_require__(205);
class FindAttributePlatformDTO extends find_common_dto_1.CommonFindAttributeDTO {
}
exports.FindAttributePlatformDTO = FindAttributePlatformDTO;


/***/ }),
/* 233 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateStatusAttributePlatformDTO = void 0;
const update_status_common_dto_1 = __webpack_require__(207);
class UpdateStatusAttributePlatformDTO extends update_status_common_dto_1.CommonUpdateStatusAttributeDTO {
}
exports.UpdateStatusAttributePlatformDTO = UpdateStatusAttributePlatformDTO;


/***/ }),
/* 234 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAttributePlatformDTO = void 0;
const update_common_dto_1 = __webpack_require__(209);
class UpdateAttributePlatformDTO extends update_common_dto_1.CommonUpdateAttributeDTO {
}
exports.UpdateAttributePlatformDTO = UpdateAttributePlatformDTO;


/***/ }),
/* 235 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(236), exports);
__exportStar(__webpack_require__(237), exports);
__exportStar(__webpack_require__(238), exports);
__exportStar(__webpack_require__(239), exports);


/***/ }),
/* 236 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAttributeSponsorshipBenefitDTO = void 0;
const create_common_dto_1 = __webpack_require__(201);
class CreateAttributeSponsorshipBenefitDTO extends create_common_dto_1.CommonCreateAttributeDTO {
}
exports.CreateAttributeSponsorshipBenefitDTO = CreateAttributeSponsorshipBenefitDTO;


/***/ }),
/* 237 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FindAttributeSponsorshipBenefitDTO = void 0;
const find_common_dto_1 = __webpack_require__(205);
class FindAttributeSponsorshipBenefitDTO extends find_common_dto_1.CommonFindAttributeDTO {
}
exports.FindAttributeSponsorshipBenefitDTO = FindAttributeSponsorshipBenefitDTO;


/***/ }),
/* 238 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateStatusAttributeSponsorshipBenefitDTO = void 0;
const update_status_common_dto_1 = __webpack_require__(207);
class UpdateStatusAttributeSponsorshipBenefitDTO extends update_status_common_dto_1.CommonUpdateStatusAttributeDTO {
}
exports.UpdateStatusAttributeSponsorshipBenefitDTO = UpdateStatusAttributeSponsorshipBenefitDTO;


/***/ }),
/* 239 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAttributeSponsorshipBenefitDTO = void 0;
const update_common_dto_1 = __webpack_require__(209);
class UpdateAttributeSponsorshipBenefitDTO extends update_common_dto_1.CommonUpdateAttributeDTO {
}
exports.UpdateAttributeSponsorshipBenefitDTO = UpdateAttributeSponsorshipBenefitDTO;


/***/ }),
/* 240 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(241), exports);
__exportStar(__webpack_require__(242), exports);
__exportStar(__webpack_require__(243), exports);
__exportStar(__webpack_require__(244), exports);


/***/ }),
/* 241 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAttributeSponsorshipFormDTO = void 0;
const class_validator_1 = __webpack_require__(7);
const create_common_dto_1 = __webpack_require__(201);
class CreateAttributeSponsorshipFormDTO extends create_common_dto_1.CommonCreateAttributeDTO {
}
exports.CreateAttributeSponsorshipFormDTO = CreateAttributeSponsorshipFormDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateAttributeSponsorshipFormDTO.prototype, "sponsor_benefit", void 0);


/***/ }),
/* 242 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FindAttributeSponsorshipFormDTO = void 0;
const find_common_dto_1 = __webpack_require__(205);
class FindAttributeSponsorshipFormDTO extends find_common_dto_1.CommonFindAttributeDTO {
}
exports.FindAttributeSponsorshipFormDTO = FindAttributeSponsorshipFormDTO;


/***/ }),
/* 243 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateStatusAttributeSponsorshipFormDTO = void 0;
const update_status_common_dto_1 = __webpack_require__(207);
class UpdateStatusAttributeSponsorshipFormDTO extends update_status_common_dto_1.CommonUpdateStatusAttributeDTO {
}
exports.UpdateStatusAttributeSponsorshipFormDTO = UpdateStatusAttributeSponsorshipFormDTO;


/***/ }),
/* 244 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAttributeSponsorshipFormDTO = void 0;
const update_common_dto_1 = __webpack_require__(209);
class UpdateAttributeSponsorshipFormDTO extends update_common_dto_1.CommonUpdateAttributeDTO {
}
exports.UpdateAttributeSponsorshipFormDTO = UpdateAttributeSponsorshipFormDTO;


/***/ }),
/* 245 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAttributeBudgetRangeEntity = void 0;
const swagger_1 = __webpack_require__(3);
const update_common_entity_1 = __webpack_require__(246);
const dto_1 = __webpack_require__(198);
class UpdateAttributeBudgetRangeEntity extends update_common_entity_1.CommonUpdateAttributeEntity {
    constructor(object) {
        super(object);
        this.min_range = object?.min_range;
        this.max_range = object?.max_range;
    }
}
exports.UpdateAttributeBudgetRangeEntity = UpdateAttributeBudgetRangeEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Mức sàn',
    }),
    __metadata("design:type", typeof (_a = typeof dto_1.RangeDTO !== "undefined" && dto_1.RangeDTO) === "function" ? _a : Object)
], UpdateAttributeBudgetRangeEntity.prototype, "min_range", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Mức trần',
    }),
    __metadata("design:type", typeof (_b = typeof dto_1.RangeDTO !== "undefined" && dto_1.RangeDTO) === "function" ? _b : Object)
], UpdateAttributeBudgetRangeEntity.prototype, "max_range", void 0);


/***/ }),
/* 246 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonUpdateAttributeEntity = void 0;
const swagger_1 = __webpack_require__(3);
class CommonUpdateAttributeEntity {
    constructor(object) {
        this.name = object?.name;
        this.description = object?.description;
        this.image = object?.image;
    }
}
exports.CommonUpdateAttributeEntity = CommonUpdateAttributeEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'Id',
        example: 'vtv',
    }),
    __metadata("design:type", String)
], CommonUpdateAttributeEntity.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Mô tả ',
        example: 'This is description',
    }),
    __metadata("design:type", String)
], CommonUpdateAttributeEntity.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: Date,
        description: 'path hình ảnh',
        example: '/public/image/followme.jpg',
    }),
    __metadata("design:type", String)
], CommonUpdateAttributeEntity.prototype, "image", void 0);


/***/ }),
/* 247 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateStatusAttributeBudgetRangeEntity = void 0;
const base_update_status_entity_1 = __webpack_require__(248);
class UpdateStatusAttributeBudgetRangeEntity extends base_update_status_entity_1.BaseUpdateStatusEntity {
    constructor(object) {
        super(object);
    }
}
exports.UpdateStatusAttributeBudgetRangeEntity = UpdateStatusAttributeBudgetRangeEntity;


/***/ }),
/* 248 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseUpdateStatusEntity = void 0;
const swagger_1 = __webpack_require__(3);
const class_validator_1 = __webpack_require__(7);
class BaseUpdateStatusEntity {
    constructor(object) {
        this.status = object?.status;
    }
}
exports.BaseUpdateStatusEntity = BaseUpdateStatusEntity;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Trạng thái',
        example: 'ACTIVE',
    }),
    __metadata("design:type", String)
], BaseUpdateStatusEntity.prototype, "status", void 0);


/***/ }),
/* 249 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(250), exports);
__exportStar(__webpack_require__(251), exports);
__exportStar(__webpack_require__(252), exports);


/***/ }),
/* 250 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAttributeCastEntity = void 0;
const swagger_1 = __webpack_require__(3);
const create_common_entity_1 = __webpack_require__(197);
class CreateAttributeCastEntity extends create_common_entity_1.CommonCreateAttributeEntity {
    constructor(object) {
        super(object);
        this.cast_professions = object.cast_professions;
    }
}
exports.CreateAttributeCastEntity = CreateAttributeCastEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Phân loại người nổi tiếng',
        example: '66dd09d8965b73312df0613b',
    }),
    __metadata("design:type", Array)
], CreateAttributeCastEntity.prototype, "cast_professions", void 0);


/***/ }),
/* 251 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAttributeCastEntity = void 0;
const swagger_1 = __webpack_require__(3);
const update_common_entity_1 = __webpack_require__(246);
class UpdateAttributeCastEntity extends update_common_entity_1.CommonUpdateAttributeEntity {
    constructor(object) {
        super(object);
        this.cast_professions = object.cast_professions;
    }
}
exports.UpdateAttributeCastEntity = UpdateAttributeCastEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Phân loại người nổi tiếng',
    }),
    __metadata("design:type", Array)
], UpdateAttributeCastEntity.prototype, "cast_professions", void 0);


/***/ }),
/* 252 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateStatusAttributeCastEntity = void 0;
const base_update_status_entity_1 = __webpack_require__(248);
class UpdateStatusAttributeCastEntity extends base_update_status_entity_1.BaseUpdateStatusEntity {
    constructor(object) {
        super(object);
    }
}
exports.UpdateStatusAttributeCastEntity = UpdateStatusAttributeCastEntity;


/***/ }),
/* 253 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(254), exports);
__exportStar(__webpack_require__(255), exports);
__exportStar(__webpack_require__(256), exports);


/***/ }),
/* 254 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAttributeCastProfessionEntity = void 0;
const create_common_entity_1 = __webpack_require__(197);
class CreateAttributeCastProfessionEntity extends create_common_entity_1.CommonCreateAttributeEntity {
    constructor(object) {
        super(object);
    }
}
exports.CreateAttributeCastProfessionEntity = CreateAttributeCastProfessionEntity;


/***/ }),
/* 255 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAttributeCastProfessionEntity = void 0;
const update_common_entity_1 = __webpack_require__(246);
class UpdateAttributeCastProfessionEntity extends update_common_entity_1.CommonUpdateAttributeEntity {
    constructor(object) {
        super(object);
    }
}
exports.UpdateAttributeCastProfessionEntity = UpdateAttributeCastProfessionEntity;


/***/ }),
/* 256 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateStatusAttributeCastProfessionEntity = void 0;
const base_update_status_entity_1 = __webpack_require__(248);
class UpdateStatusAttributeCastProfessionEntity extends base_update_status_entity_1.BaseUpdateStatusEntity {
    constructor(object) {
        super(object);
    }
}
exports.UpdateStatusAttributeCastProfessionEntity = UpdateStatusAttributeCastProfessionEntity;


/***/ }),
/* 257 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(258), exports);
__exportStar(__webpack_require__(259), exports);
__exportStar(__webpack_require__(260), exports);


/***/ }),
/* 258 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAttributeCategoryEntity = void 0;
const create_common_entity_1 = __webpack_require__(197);
class CreateAttributeCategoryEntity extends create_common_entity_1.CommonCreateAttributeEntity {
    constructor(object) {
        super(object);
    }
}
exports.CreateAttributeCategoryEntity = CreateAttributeCategoryEntity;


/***/ }),
/* 259 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAttributeCategoryEntity = void 0;
const update_common_entity_1 = __webpack_require__(246);
class UpdateAttributeCategoryEntity extends update_common_entity_1.CommonUpdateAttributeEntity {
    constructor(object) {
        super(object);
    }
}
exports.UpdateAttributeCategoryEntity = UpdateAttributeCategoryEntity;


/***/ }),
/* 260 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateStatusAttributeCategoryEntity = void 0;
const base_update_status_entity_1 = __webpack_require__(248);
class UpdateStatusAttributeCategoryEntity extends base_update_status_entity_1.BaseUpdateStatusEntity {
    constructor(object) {
        super(object);
    }
}
exports.UpdateStatusAttributeCategoryEntity = UpdateStatusAttributeCategoryEntity;


/***/ }),
/* 261 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(262), exports);
__exportStar(__webpack_require__(263), exports);
__exportStar(__webpack_require__(264), exports);


/***/ }),
/* 262 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAttributeTagEntity = void 0;
const create_common_entity_1 = __webpack_require__(197);
class CreateAttributeTagEntity extends create_common_entity_1.CommonCreateAttributeEntity {
    constructor(object) {
        super(object);
    }
}
exports.CreateAttributeTagEntity = CreateAttributeTagEntity;


/***/ }),
/* 263 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAttributeTagEntity = void 0;
const update_common_entity_1 = __webpack_require__(246);
class UpdateAttributeTagEntity extends update_common_entity_1.CommonUpdateAttributeEntity {
    constructor(object) {
        super(object);
    }
}
exports.UpdateAttributeTagEntity = UpdateAttributeTagEntity;


/***/ }),
/* 264 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateStatusAttributeTagEntity = void 0;
const base_update_status_entity_1 = __webpack_require__(248);
class UpdateStatusAttributeTagEntity extends base_update_status_entity_1.BaseUpdateStatusEntity {
    constructor(object) {
        super(object);
    }
}
exports.UpdateStatusAttributeTagEntity = UpdateStatusAttributeTagEntity;


/***/ }),
/* 265 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(266), exports);
__exportStar(__webpack_require__(267), exports);
__exportStar(__webpack_require__(268), exports);


/***/ }),
/* 266 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAttributePlatformEntity = void 0;
const create_common_entity_1 = __webpack_require__(197);
class CreateAttributePlatformEntity extends create_common_entity_1.CommonCreateAttributeEntity {
    constructor(object) {
        super(object);
    }
}
exports.CreateAttributePlatformEntity = CreateAttributePlatformEntity;


/***/ }),
/* 267 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAttributePlatformEntity = void 0;
const update_common_entity_1 = __webpack_require__(246);
class UpdateAttributePlatformEntity extends update_common_entity_1.CommonUpdateAttributeEntity {
    constructor(object) {
        super(object);
    }
}
exports.UpdateAttributePlatformEntity = UpdateAttributePlatformEntity;


/***/ }),
/* 268 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateStatusAttributePlatformEntity = void 0;
const base_update_status_entity_1 = __webpack_require__(248);
class UpdateStatusAttributePlatformEntity extends base_update_status_entity_1.BaseUpdateStatusEntity {
    constructor(object) {
        super(object);
    }
}
exports.UpdateStatusAttributePlatformEntity = UpdateStatusAttributePlatformEntity;


/***/ }),
/* 269 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(270), exports);
__exportStar(__webpack_require__(271), exports);
__exportStar(__webpack_require__(272), exports);


/***/ }),
/* 270 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAttributeSponsorshipBenefitEntity = void 0;
const create_common_entity_1 = __webpack_require__(197);
class CreateAttributeSponsorshipBenefitEntity extends create_common_entity_1.CommonCreateAttributeEntity {
    constructor(object) {
        super(object);
    }
}
exports.CreateAttributeSponsorshipBenefitEntity = CreateAttributeSponsorshipBenefitEntity;


/***/ }),
/* 271 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAttributeSponsorshipBenefitEntity = void 0;
const update_common_entity_1 = __webpack_require__(246);
class UpdateAttributeSponsorshipBenefitEntity extends update_common_entity_1.CommonUpdateAttributeEntity {
    constructor(object) {
        super(object);
    }
}
exports.UpdateAttributeSponsorshipBenefitEntity = UpdateAttributeSponsorshipBenefitEntity;


/***/ }),
/* 272 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateStatusAttributeSponsorshipBenefitEntity = void 0;
const base_update_status_entity_1 = __webpack_require__(248);
class UpdateStatusAttributeSponsorshipBenefitEntity extends base_update_status_entity_1.BaseUpdateStatusEntity {
    constructor(object) {
        super(object);
    }
}
exports.UpdateStatusAttributeSponsorshipBenefitEntity = UpdateStatusAttributeSponsorshipBenefitEntity;


/***/ }),
/* 273 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(274), exports);
__exportStar(__webpack_require__(275), exports);
__exportStar(__webpack_require__(276), exports);


/***/ }),
/* 274 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAttributeSponsorshipFormEntity = void 0;
const create_common_entity_1 = __webpack_require__(197);
const swagger_1 = __webpack_require__(3);
class CreateAttributeSponsorshipFormEntity extends create_common_entity_1.CommonCreateAttributeEntity {
    constructor(object) {
        super(object);
        this.sponsor_benefit = object?.sponsor_benefit;
    }
}
exports.CreateAttributeSponsorshipFormEntity = CreateAttributeSponsorshipFormEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Nhóm quyền lợi tài trợ',
        example: '66dd09d8965b73312df0613b',
    }),
    __metadata("design:type", String)
], CreateAttributeSponsorshipFormEntity.prototype, "sponsor_benefit", void 0);


/***/ }),
/* 275 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAttributeSponsorshipFormEntity = void 0;
const update_common_entity_1 = __webpack_require__(246);
const swagger_1 = __webpack_require__(3);
class UpdateAttributeSponsorshipFormEntity extends update_common_entity_1.CommonUpdateAttributeEntity {
    constructor(object) {
        super(object);
        this.sponsor_benefit = object?.sponsor_benefit;
    }
}
exports.UpdateAttributeSponsorshipFormEntity = UpdateAttributeSponsorshipFormEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Nhóm quyền lợi tài trợ',
        example: '66dd09d8965b73312df0613b',
    }),
    __metadata("design:type", String)
], UpdateAttributeSponsorshipFormEntity.prototype, "sponsor_benefit", void 0);


/***/ }),
/* 276 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateStatusAttributeSponsorshipFormEntity = void 0;
const base_update_status_entity_1 = __webpack_require__(248);
class UpdateStatusAttributeSponsorshipFormEntity extends base_update_status_entity_1.BaseUpdateStatusEntity {
    constructor(object) {
        super(object);
    }
}
exports.UpdateStatusAttributeSponsorshipFormEntity = UpdateStatusAttributeSponsorshipFormEntity;


/***/ }),
/* 277 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeBudgetRangeService = void 0;
const mongoose_1 = __webpack_require__(80);
const mongoose_2 = __webpack_require__(52);
const common_1 = __webpack_require__(28);
const common_2 = __webpack_require__(1);
const schemas_1 = __webpack_require__(160);
const shared_1 = __webpack_require__(32);
const error_constant_1 = __webpack_require__(78);
const entities_1 = __webpack_require__(194);
let AttributeBudgetRangeService = class AttributeBudgetRangeService extends common_2.BaseService {
    constructor(model, readModel) {
        super(model, readModel);
        this.model = model;
        this.readModel = readModel;
        this.model_name = common_2.ENUM_MODEL.ATTRIBUTE_BUDGET_RANGE;
    }
    conditionFindAll(query) {
        const { condition, condition_keyword, sort, select_after_query } = common_2.Common._conditionFindAll({
            query,
            condition_fields: ['status'],
        });
        return {
            condition: condition,
            condition_keyword: condition_keyword,
            sort: sort,
            select_after_query: select_after_query,
        };
    }
    async findAll(query) {
        const { condition, condition_keyword, sort, select_after_query } = this.conditionFindAll(query);
        const datas = await this._findAll(query, condition, condition_keyword, [], select_after_query.select_by_populate, sort);
        return datas;
    }
    async findById(_id) {
        const cast = await this._findById(_id);
        return cast;
    }
    async create(body) {
        const cast_existed = await this._findOne({ name: body.name });
        if (cast_existed) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.EXISTS,
                i18nArgs: { attribute: 'Budget Range' },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const create_payload = new entities_1.CreateAttributeBudgetRangeEntity(body);
        return await this._create(create_payload);
    }
    async update(id, body) {
        const cast_existed = await this._findOne({
            name: body.name,
            _id: { $ne: common_2.Common.toObjectId(id) },
        });
        if (cast_existed) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.EXISTS,
                i18nArgs: { attribute: 'Budget Range' },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const upload_payload = new entities_1.UpdateAttributeBudgetRangeEntity(body);
        return await this._findByIdAndUpdate(id, upload_payload);
    }
    async updateStatus(id, updateStatusDto) {
        const upload_payload = new entities_1.UpdateStatusAttributeBudgetRangeEntity(updateStatusDto);
        return await this._findByIdAndUpdate(id, upload_payload);
    }
};
exports.AttributeBudgetRangeService = AttributeBudgetRangeService;
exports.AttributeBudgetRangeService = AttributeBudgetRangeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.AttributeBudgetRange.name, common_2.CONNECTION_NAME.PRIMARY)),
    __param(1, (0, mongoose_1.InjectModel)(schemas_1.AttributeBudgetRange.name, common_2.CONNECTION_NAME.SECONDARY)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], AttributeBudgetRangeService);


/***/ }),
/* 278 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DRAFT_PROPERTIES = exports.VERIFY_PROPERTIES = void 0;
__exportStar(__webpack_require__(279), exports);
__exportStar(__webpack_require__(280), exports);
exports.VERIFY_PROPERTIES = [
    'sponsor_name',
    'cover_image',
    'banner_image',
    'introduction_images',
    'sponsor_categories',
    'casts',
    'platforms',
    'sponsorship_forms',
    'sponsor_schedulers',
    'sponsorship_packages',
    'sponsor_kpi',
    'short_description',
    'detailed_description',
    'sponsorship_expiration_date',
    'start_date',
    'end_date',
    'product_limited_is_limit',
    'product_limited_description',
];
exports.DRAFT_PROPERTIES = [
    {
        key: 'platforms',
        values: ['platform'],
    },
    {
        key: 'sponsorship_forms',
        values: ['sponsorship_form'],
    },
    {
        key: 'sponsorship_packages',
        values: ['package_name', 'package_unit', 'package_value', 'status'],
    },
];


/***/ }),
/* 279 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PACKAGE_SCALE = void 0;
exports.PACKAGE_SCALE = {
    THOUSAND_BILLION: {
        value: 1000000000000,
        trans_scale: 'ngàn tỷ',
    },
    BILLION: {
        value: 1000000000,
        trans_scale: 'tỷ',
    },
    MILLION: {
        value: 1000000,
        trans_scale: 'triệu',
    },
    THOUSAND: {
        value: 1000,
        trans_scale: 'ngàn',
    },
};


/***/ }),
/* 280 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NUMBER_DAYS_CHANGE_LEAVING_TO_EXPRIED_STATUS = void 0;
exports.NUMBER_DAYS_CHANGE_LEAVING_TO_EXPRIED_STATUS = 15;


/***/ }),
/* 281 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SettingService = void 0;
const mongoose_1 = __webpack_require__(80);
const mongoose_2 = __webpack_require__(52);
const common_1 = __webpack_require__(28);
const common_2 = __webpack_require__(1);
const setting_schema_1 = __webpack_require__(282);
const entities_1 = __webpack_require__(283);
const shared_1 = __webpack_require__(32);
const error_constant_1 = __webpack_require__(78);
let SettingService = class SettingService extends common_2.BaseService {
    constructor(model, readModel) {
        super(model, readModel);
        this.model = model;
        this.readModel = readModel;
        this.model_name = common_2.ENUM_MODEL.SETTING;
    }
    async findAll(query) {
        const condition = {
            status: common_2.ENUM_STATUS.ACTIVE,
        };
        const select = {};
        const datas = await this._findAll(query, condition, {}, [], select, null);
        return datas;
    }
    async findById(id) {
        const data = await this._findById(id);
        return data;
    }
    async findByKey(key) {
        const condition = {
            key: key?.toUpperCase(),
            status: common_2.ENUM_STATUS.ACTIVE,
        };
        const data = await this._findOne(condition);
        return data?.value;
    }
    async create(body) {
        const data_existed = await this.findByKey(body.key);
        if (data_existed) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.EXISTS,
                i18nArgs: { attribute: 'Setting' },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const create_payload = new entities_1.CreateSettingEntity(body);
        return await this._create(create_payload);
    }
    async update(id, body) {
        const upload_payload = new entities_1.UpdateSettingEntity(body);
        return await this._findByIdAndUpdate(id, upload_payload);
    }
    async updateStatus(id, updateStatusDto) {
        const upload_payload = new entities_1.UpdateStatusSettingEntity(updateStatusDto);
        return await this._findByIdAndUpdate(id, upload_payload);
    }
};
exports.SettingService = SettingService;
exports.SettingService = SettingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(setting_schema_1.Setting.name, common_2.CONNECTION_NAME.PRIMARY)),
    __param(1, (0, mongoose_1.InjectModel)(setting_schema_1.Setting.name, common_2.CONNECTION_NAME.SECONDARY)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], SettingService);


/***/ }),
/* 282 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SettingSchema = exports.Setting = void 0;
const enums_1 = __webpack_require__(8);
const mongoose_1 = __webpack_require__(80);
const mongoose_2 = __webpack_require__(52);
const base_1 = __webpack_require__(161);
let Setting = class Setting extends base_1.BaseSchema {
};
exports.Setting = Setting;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        required: true,
    }),
    __metadata("design:type", String)
], Setting.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        required: true,
    }),
    __metadata("design:type", String)
], Setting.prototype, "key", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        default: null,
    }),
    __metadata("design:type", String)
], Setting.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: enums_1.ENUM_TYPE_VARIABLE,
        default: enums_1.ENUM_TYPE_VARIABLE.OBJECT,
        trim: true,
    }),
    __metadata("design:type", typeof (_a = typeof enums_1.ENUM_TYPE_VARIABLE !== "undefined" && enums_1.ENUM_TYPE_VARIABLE) === "function" ? _a : Object)
], Setting.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.Mixed,
        required: true,
    }),
    __metadata("design:type", typeof (_d = typeof mongoose_2.default !== "undefined" && (_b = mongoose_2.default.Schema) !== void 0 && (_c = _b.Types) !== void 0 && _c.Mixed) === "function" ? _d : Object)
], Setting.prototype, "value", void 0);
exports.Setting = Setting = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], Setting);
exports.SettingSchema = mongoose_1.SchemaFactory.createForClass(Setting);
exports.SettingSchema.index({ name: 'text', description: 'text' });


/***/ }),
/* 283 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(284), exports);
__exportStar(__webpack_require__(285), exports);
__exportStar(__webpack_require__(286), exports);


/***/ }),
/* 284 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSettingEntity = void 0;
const swagger_1 = __webpack_require__(3);
const common_1 = __webpack_require__(1);
class CreateSettingEntity extends common_1.BaseCreateEntity {
    constructor(object) {
        super(object);
        this.name = object?.name;
        this.key = object?.key;
        this.type = object?.type;
        this.description = object?.description;
        this.value = object?.value;
    }
}
exports.CreateSettingEntity = CreateSettingEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'name of setting',
        example: 'config mail',
    }),
    __metadata("design:type", String)
], CreateSettingEntity.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'name of setting',
        example: 'MAIL_CONFIG',
    }),
    __metadata("design:type", String)
], CreateSettingEntity.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'type of setting',
        example: 'OBJECT',
    }),
    __metadata("design:type", String)
], CreateSettingEntity.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        description: 'description of setting',
        example: 'description',
    }),
    __metadata("design:type", String)
], CreateSettingEntity.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        description: 'Value of setting',
        example: 'value',
    }),
    __metadata("design:type", String)
], CreateSettingEntity.prototype, "value", void 0);


/***/ }),
/* 285 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateStatusSettingEntity = void 0;
const base_update_status_entity_1 = __webpack_require__(248);
class UpdateStatusSettingEntity extends base_update_status_entity_1.BaseUpdateStatusEntity {
    constructor(object) {
        super(object);
    }
}
exports.UpdateStatusSettingEntity = UpdateStatusSettingEntity;


/***/ }),
/* 286 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateSettingEntity = void 0;
const swagger_1 = __webpack_require__(3);
const common_1 = __webpack_require__(1);
class UpdateSettingEntity extends common_1.BaseCreateEntity {
    constructor(object) {
        super(object);
        this.name = object?.name;
        this.type = object?.type;
        this.description = object?.description;
        this.value = object?.value;
    }
}
exports.UpdateSettingEntity = UpdateSettingEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'name of setting',
        example: 'config mail',
    }),
    __metadata("design:type", String)
], UpdateSettingEntity.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'type of setting',
        example: 'OBJECT',
    }),
    __metadata("design:type", String)
], UpdateSettingEntity.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        description: 'description of setting',
        example: 'description',
    }),
    __metadata("design:type", String)
], UpdateSettingEntity.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        description: 'Value of setting',
        example: 'value',
    }),
    __metadata("design:type", String)
], UpdateSettingEntity.prototype, "value", void 0);


/***/ }),
/* 287 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(288), exports);


/***/ }),
/* 288 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ENUM_SETTING_MAIL_CONFIG = exports.ENUM_SETTING_CLIENT_CONTENT = exports.ENUM_SETTING_KEY = void 0;
var ENUM_SETTING_KEY;
(function (ENUM_SETTING_KEY) {
    ENUM_SETTING_KEY["MAIL_CONFIG"] = "MAIL_CONFIG";
    ENUM_SETTING_KEY["CLIENT_CONTENT"] = "CLIENT_CONTENT";
    ENUM_SETTING_KEY["WIDGET_CHAT_CONFIG"] = "WIDGET_CHAT_CONFIG";
    ENUM_SETTING_KEY["SOCIAL_SHARE_BUTTON_CONFIG"] = "SOCIAL_SHARE_BUTTON_CONFIG";
})(ENUM_SETTING_KEY || (exports.ENUM_SETTING_KEY = ENUM_SETTING_KEY = {}));
var ENUM_SETTING_CLIENT_CONTENT;
(function (ENUM_SETTING_CLIENT_CONTENT) {
    ENUM_SETTING_CLIENT_CONTENT["CLIENT_CONTENT_Q_AND_A"] = "client_content_q_and_a";
    ENUM_SETTING_CLIENT_CONTENT["CLIENT_CONTENT_HOME_PAGE_CONNECT"] = "client_content_home_page_connect";
    ENUM_SETTING_CLIENT_CONTENT["CLIENT_CONTENT_HOME_PAGE_FUTURE"] = "client_content_home_page_future";
    ENUM_SETTING_CLIENT_CONTENT["CLIENT_CONTENT_CONTACT"] = "client_content_contact";
})(ENUM_SETTING_CLIENT_CONTENT || (exports.ENUM_SETTING_CLIENT_CONTENT = ENUM_SETTING_CLIENT_CONTENT = {}));
var ENUM_SETTING_MAIL_CONFIG;
(function (ENUM_SETTING_MAIL_CONFIG) {
    ENUM_SETTING_MAIL_CONFIG["ADMIN_MAIL"] = "admin_mail";
})(ENUM_SETTING_MAIL_CONFIG || (exports.ENUM_SETTING_MAIL_CONFIG = ENUM_SETTING_MAIL_CONFIG = {}));


/***/ }),
/* 289 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SponsorLogPreDataEntity = void 0;
class SponsorLogPreDataEntity {
    constructor(object) {
        this.sponsor_name = object?.sponsor_name;
        this.display_status = object?.display_status;
        this.sponsorship_status = object?.sponsorship_status;
        this.production_status = object?.production_status;
        this.cover_image = object?.cover_image;
        this.banner_image = object?.banner_image;
        this.introduction_images = object?.introduction_images;
        this.sponsor_categories = object?.sponsor_categories;
        this.sponsor_hashtags = object?.sponsor_hashtags;
        this.casts = object?.casts;
        this.platforms = object?.platforms;
        this.sponsorship_forms = object?.sponsorship_forms;
        this.sponsor_schedulers = object?.sponsor_schedulers;
        this.sponsorship_packages = object?.sponsorship_packages;
        this.sponsor_kpi = object?.sponsor_kpi;
        this.short_description = object?.short_description;
        this.detailed_description = object?.detailed_description;
        this.sponsorship_expiration_date = object?.sponsorship_expiration_date;
        this.start_date = object?.start_date;
        this.end_date = object?.end_date;
        this.user_approved = object?.user_approved;
        this.approved_date = object?.approved_date;
        this.product_limited_is_limit = object?.product_limited_is_limit;
        this.product_limited_description = object?.product_limited_description;
        this.priority = object?.priority;
        this.reason_rejected = object?.reason_rejected;
    }
}
exports.SponsorLogPreDataEntity = SponsorLogPreDataEntity;


/***/ }),
/* 290 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeCastService = void 0;
const mongoose_1 = __webpack_require__(80);
const mongoose_2 = __webpack_require__(52);
const common_1 = __webpack_require__(28);
const common_2 = __webpack_require__(1);
const schemas_1 = __webpack_require__(160);
const error_constant_1 = __webpack_require__(78);
const shared_1 = __webpack_require__(32);
const entities_1 = __webpack_require__(194);
let AttributeCastService = class AttributeCastService extends common_2.BaseService {
    constructor(model, readModel) {
        super(model, readModel);
        this.model = model;
        this.readModel = readModel;
        this.model_name = common_2.ENUM_MODEL.ATTRIBUTE_CAST;
    }
    conditionFindAll(query) {
        const { condition, condition_keyword, sort, select_after_query } = common_2.Common._conditionFindAll({
            query,
            condition_fields: ['status'],
        });
        return {
            condition: condition,
            condition_keyword: condition_keyword,
            sort: sort,
            select_after_query: select_after_query,
        };
    }
    async findAll(query) {
        const { condition, condition_keyword, sort, select_after_query } = this.conditionFindAll(query);
        const datas = await this._findAll(query, condition, condition_keyword, [
            {
                path: 'cast_professions',
                model: schemas_1.AttributeCastProfession.name,
            },
        ], select_after_query.select_by_populate, sort);
        return datas;
    }
    async findById(_id) {
        const data = await this._findById(_id, [
            {
                path: 'cast_professions',
                model: schemas_1.AttributeCastProfession.name,
            },
        ]);
        return data;
    }
    async create(body) {
        const data_existed = await this._findOne({ name: body.name });
        if (data_existed) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.EXISTS,
                i18nArgs: { attribute: 'Người nổi tiếng' },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const create_payload = new entities_1.CreateAttributeCastEntity(body);
        return await this._create(create_payload);
    }
    async update(id, body) {
        const data_existed = await this._findOne({
            name: body.name,
            _id: { $ne: common_2.Common.toObjectId(id) },
        });
        if (data_existed) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.EXISTS,
                i18nArgs: { attribute: 'Người nổi tiếng' },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const upload_payload = new entities_1.UpdateAttributeCastEntity(body);
        return await this._findByIdAndUpdate(id, upload_payload);
    }
    async updateStatus(id, updateStatusDto) {
        const upload_payload = new entities_1.UpdateStatusAttributeCastEntity(updateStatusDto);
        return await this._findByIdAndUpdate(id, upload_payload);
    }
};
exports.AttributeCastService = AttributeCastService;
exports.AttributeCastService = AttributeCastService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.AttributeCast.name, common_2.CONNECTION_NAME.PRIMARY)),
    __param(1, (0, mongoose_1.InjectModel)(schemas_1.AttributeCast.name, common_2.CONNECTION_NAME.SECONDARY)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], AttributeCastService);


/***/ }),
/* 291 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeHashtagService = void 0;
const mongoose_1 = __webpack_require__(80);
const mongoose_2 = __webpack_require__(52);
const common_1 = __webpack_require__(28);
const common_2 = __webpack_require__(1);
const schemas_1 = __webpack_require__(160);
const error_constant_1 = __webpack_require__(78);
const shared_1 = __webpack_require__(32);
const hashtag_1 = __webpack_require__(261);
let AttributeHashtagService = class AttributeHashtagService extends common_2.BaseService {
    constructor(model, readModel) {
        super(model, readModel);
        this.model = model;
        this.readModel = readModel;
        this.model_name = common_2.ENUM_MODEL.ATTRIBUTE_HASHTAG;
    }
    conditionFindAll(query) {
        const { condition, condition_keyword, sort, select_after_query } = common_2.Common._conditionFindAll({
            query,
            condition_fields: ['status'],
        });
        return {
            condition: condition,
            condition_keyword: condition_keyword,
            sort: sort,
            select_after_query: select_after_query,
        };
    }
    async findAll(query) {
        const { condition, condition_keyword, sort, select_after_query } = this.conditionFindAll(query);
        const hashatgs = await this._findAll(query, condition, condition_keyword, [], {}, sort);
        return hashatgs;
    }
    async findById(_id) {
        const hashatg = await this._findById(_id);
        return hashatg;
    }
    async create(body) {
        const hashatg_existed = await this._findOne({ name: body.name });
        if (hashatg_existed) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.EXISTS,
                i18nArgs: { attribute: 'Tag' },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const create_payload = new hashtag_1.CreateAttributeTagEntity(body);
        return await this._create(create_payload);
    }
    async update(id, body) {
        const hashatg_existed = await this._findOne({
            name: body.name,
            _id: { $ne: common_2.Common.toObjectId(id) },
        });
        if (hashatg_existed) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.EXISTS,
                i18nArgs: { attribute: 'Tag' },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const upload_payload = new hashtag_1.UpdateAttributeTagEntity(body);
        return await this._findByIdAndUpdate(id, upload_payload);
    }
    async updateStatus(id, updateStatusDto) {
        const upload_payload = new hashtag_1.UpdateStatusAttributeTagEntity(updateStatusDto);
        return await this._findByIdAndUpdate(id, upload_payload);
    }
};
exports.AttributeHashtagService = AttributeHashtagService;
exports.AttributeHashtagService = AttributeHashtagService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.AttributeHashtag.name, common_2.CONNECTION_NAME.PRIMARY)),
    __param(1, (0, mongoose_1.InjectModel)(schemas_1.AttributeHashtag.name, common_2.CONNECTION_NAME.SECONDARY)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], AttributeHashtagService);


/***/ }),
/* 292 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributePlatformService = void 0;
const mongoose_1 = __webpack_require__(80);
const mongoose_2 = __webpack_require__(52);
const common_1 = __webpack_require__(28);
const common_2 = __webpack_require__(1);
const schemas_1 = __webpack_require__(160);
const shared_1 = __webpack_require__(32);
const error_constant_1 = __webpack_require__(78);
const entities_1 = __webpack_require__(194);
let AttributePlatformService = class AttributePlatformService extends common_2.BaseService {
    constructor(model, readModel) {
        super(model, readModel);
        this.model = model;
        this.readModel = readModel;
        this.model_name = common_2.ENUM_MODEL.ATTRIBUTE_PLATFORM;
    }
    conditionFindAll(query) {
        const { condition, condition_keyword, sort, select_after_query } = common_2.Common._conditionFindAll({
            query,
            condition_fields: ['status'],
        });
        return {
            condition: condition,
            condition_keyword: condition_keyword,
            sort: sort,
            select_after_query: select_after_query,
        };
    }
    async findAll(query) {
        const { condition, condition_keyword, sort, select_after_query } = this.conditionFindAll(query);
        const platforms = await this._findAll(query, condition, condition_keyword, [], {}, sort);
        return platforms;
    }
    async findById(_id) {
        const platform = await this._findById(_id);
        return platform;
    }
    async create(body) {
        const platform_existed = await this._findOne({ name: body.name });
        if (platform_existed) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.EXISTS,
                i18nArgs: { attribute: 'Nền tảng' },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const create_payload = new entities_1.CreateAttributePlatformEntity(body);
        return await this._create(create_payload);
    }
    async update(id, body) {
        const platform_existed = await this._findOne({
            name: body.name,
            _id: { $ne: common_2.Common.toObjectId(id) },
        });
        if (platform_existed) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.EXISTS,
                i18nArgs: { attribute: 'Nền tảng' },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const upload_payload = new entities_1.UpdateAttributePlatformEntity(body);
        return await this._findByIdAndUpdate(id, upload_payload);
    }
    async updateStatus(id, updateStatusDto) {
        const upload_payload = new entities_1.UpdateStatusAttributePlatformEntity(updateStatusDto);
        return await this._findByIdAndUpdate(id, upload_payload);
    }
};
exports.AttributePlatformService = AttributePlatformService;
exports.AttributePlatformService = AttributePlatformService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.AttributePlatform.name, common_2.CONNECTION_NAME.PRIMARY)),
    __param(1, (0, mongoose_1.InjectModel)(schemas_1.AttributePlatform.name, common_2.CONNECTION_NAME.SECONDARY)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], AttributePlatformService);


/***/ }),
/* 293 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeSponsorshipFormService = void 0;
const mongoose_1 = __webpack_require__(80);
const mongoose_2 = __webpack_require__(52);
const common_1 = __webpack_require__(28);
const common_2 = __webpack_require__(1);
const schemas_1 = __webpack_require__(160);
const shared_1 = __webpack_require__(32);
const error_constant_1 = __webpack_require__(78);
const entities_1 = __webpack_require__(194);
let AttributeSponsorshipFormService = class AttributeSponsorshipFormService extends common_2.BaseService {
    constructor(model, readModel) {
        super(model, readModel);
        this.model = model;
        this.readModel = readModel;
        this.model_name = common_2.ENUM_MODEL.ATTRIBUTE_SPONSORSHIP_FORM;
    }
    conditionFindAll(query) {
        const { condition, condition_keyword, sort, select_after_query } = common_2.Common._conditionFindAll({
            query,
            condition_fields: ['status'],
        });
        return {
            condition: condition,
            condition_keyword: condition_keyword,
            sort: sort,
            select_after_query: select_after_query,
        };
    }
    async findAll(query) {
        const { condition, condition_keyword, sort, select_after_query } = this.conditionFindAll(query);
        const datas = await this._findAll(query, condition, condition_keyword, [
            {
                path: 'sponsor_benefit',
                match: { status: common_2.ENUM_STATUS.ACTIVE },
                select: 'code name image description',
                model: schemas_1.AttributeSponsorshipBenefit.name,
            },
        ], {}, sort);
        return datas;
    }
    async findById(_id) {
        const data = await this._findById(_id, [
            {
                path: 'sponsor_benefit',
                match: { status: common_2.ENUM_STATUS.ACTIVE },
                select: 'code name image description',
                model: schemas_1.AttributeSponsorshipBenefit.name,
            },
        ]);
        return data;
    }
    async create(body) {
        const data_existed = await this._findOne({ name: body.name });
        if (data_existed) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.EXISTS,
                i18nArgs: { attribute: 'Hình thức tài trợ' },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const create_payload = new entities_1.CreateAttributeSponsorshipFormEntity(body);
        return await this._create(create_payload);
    }
    async update(id, body) {
        const data_existed = await this._findOne({
            name: body.name,
            _id: { $ne: common_2.Common.toObjectId(id) },
        });
        if (data_existed) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.EXISTS,
                i18nArgs: { attribute: 'Hình thức tài trợ' },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const upload_payload = new entities_1.UpdateAttributeSponsorshipFormEntity(body);
        return await this._findByIdAndUpdate(id, upload_payload);
    }
    async updateStatus(id, updateStatusDto) {
        const upload_payload = new entities_1.UpdateStatusAttributeSponsorshipFormEntity(updateStatusDto);
        return await this._findByIdAndUpdate(id, upload_payload);
    }
};
exports.AttributeSponsorshipFormService = AttributeSponsorshipFormService;
exports.AttributeSponsorshipFormService = AttributeSponsorshipFormService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.AttributeSponsorshipForm.name, common_2.CONNECTION_NAME.PRIMARY)),
    __param(1, (0, mongoose_1.InjectModel)(schemas_1.AttributeSponsorshipForm.name, common_2.CONNECTION_NAME.SECONDARY)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], AttributeSponsorshipFormService);


/***/ }),
/* 294 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeSponsorshipBenefitService = void 0;
const mongoose_1 = __webpack_require__(80);
const mongoose_2 = __webpack_require__(52);
const common_1 = __webpack_require__(28);
const common_2 = __webpack_require__(1);
const schemas_1 = __webpack_require__(160);
const shared_1 = __webpack_require__(32);
const error_constant_1 = __webpack_require__(78);
const entities_1 = __webpack_require__(194);
let AttributeSponsorshipBenefitService = class AttributeSponsorshipBenefitService extends common_2.BaseService {
    constructor(model, readModel) {
        super(model, readModel);
        this.model = model;
        this.readModel = readModel;
        this.model_name = common_2.ENUM_MODEL.ATTRIBUTE_SPONSORSHIP_BENEFIT;
    }
    conditionFindAll(query) {
        const { condition, condition_keyword, sort, select_after_query } = common_2.Common._conditionFindAll({
            query,
            condition_fields: ['status'],
        });
        return {
            condition: condition,
            condition_keyword: condition_keyword,
            sort: sort,
            select_after_query: select_after_query,
        };
    }
    async findAll(query) {
        const { condition, condition_keyword, sort, select_after_query } = this.conditionFindAll(query);
        const datas = await this._findAll(query, condition, condition_keyword, [], {}, sort);
        return datas;
    }
    async findById(_id) {
        const data = await this._findById(_id);
        return data;
    }
    async create(body) {
        const data_existed = await this._findOne({ name: body.name });
        if (data_existed) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.EXISTS,
                i18nArgs: { attribute: 'Nhóm quyền lợi tài trợ' },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const create_payload = new entities_1.CreateAttributePlatformEntity(body);
        return await this._create(create_payload);
    }
    async update(id, body) {
        const data_existed = await this._findOne({
            name: body.name,
            _id: { $ne: common_2.Common.toObjectId(id) },
        });
        if (data_existed) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.EXISTS,
                i18nArgs: { attribute: 'Nhóm quyền lợi tài trợ' },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const upload_payload = new entities_1.UpdateAttributeSponsorshipBenefitEntity(body);
        return await this._findByIdAndUpdate(id, upload_payload);
    }
    async updateStatus(id, updateStatusDto) {
        const upload_payload = new entities_1.UpdateStatusAttributeSponsorshipBenefitEntity(updateStatusDto);
        return await this._findByIdAndUpdate(id, upload_payload);
    }
};
exports.AttributeSponsorshipBenefitService = AttributeSponsorshipBenefitService;
exports.AttributeSponsorshipBenefitService = AttributeSponsorshipBenefitService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.AttributeSponsorshipBenefit.name, common_2.CONNECTION_NAME.PRIMARY)),
    __param(1, (0, mongoose_1.InjectModel)(schemas_1.AttributeSponsorshipBenefit.name, common_2.CONNECTION_NAME.SECONDARY)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], AttributeSponsorshipBenefitService);


/***/ }),
/* 295 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeService = void 0;
const mongoose_1 = __webpack_require__(80);
const mongoose_2 = __webpack_require__(52);
const common_1 = __webpack_require__(28);
const common_2 = __webpack_require__(1);
const schemas_1 = __webpack_require__(160);
const attribute_cast_service_1 = __webpack_require__(290);
const attribute_budget_range_service_1 = __webpack_require__(277);
const attribute_sponsorship_form_service_1 = __webpack_require__(293);
const attribute_sponsorship_benefit_service_1 = __webpack_require__(294);
const attribute_platform_service_1 = __webpack_require__(292);
const attribute_hashtag_service_1 = __webpack_require__(291);
const attribute_category_service_1 = __webpack_require__(193);
let AttributeService = class AttributeService extends common_2.BaseService {
    constructor(model, readModel, attributeCastService, attributeCategoryService, attributeHashtagService, attributePlatformService, attributeSponsorshipBenefitService, attributeSponsorshipFormService, attributeBudgetRangeService) {
        super(model, readModel);
        this.model = model;
        this.readModel = readModel;
        this.attributeCastService = attributeCastService;
        this.attributeCategoryService = attributeCategoryService;
        this.attributeHashtagService = attributeHashtagService;
        this.attributePlatformService = attributePlatformService;
        this.attributeSponsorshipBenefitService = attributeSponsorshipBenefitService;
        this.attributeSponsorshipFormService = attributeSponsorshipFormService;
        this.attributeBudgetRangeService = attributeBudgetRangeService;
        this.model_name = common_2.ENUM_MODEL.ATTRIBUTE;
    }
    async findAll(query) {
        query.is_paging = false;
        const condition = {
            status: common_2.ENUM_STATUS.ACTIVE,
        };
        const select = 'name code description';
        const [casts, categories, tags, platforms, sponsorship_forms, sponsorship_benefits, budget_ranges,] = (await Promise.allSettled([
            this.attributeCastService._findAll(query, condition, {}, [
                {
                    path: 'cast_professions',
                    match: { status: common_2.ENUM_STATUS.ACTIVE },
                    select,
                    model: schemas_1.AttributeCastProfession.name,
                },
            ], select, null),
            this.attributeCategoryService._findAll(query, condition, {}, [], select, null),
            this.attributeHashtagService._findAll(query, condition, {}, [], select, null),
            this.attributePlatformService._findAll(query, condition, {}, [], select, null),
            this.attributeSponsorshipFormService._findAll(query, condition, {}, [
                {
                    path: 'sponsor_benefit',
                    match: { status: common_2.ENUM_STATUS.ACTIVE },
                    select,
                    model: schemas_1.AttributeSponsorshipBenefit.name,
                },
            ], select, null),
            this.attributeSponsorshipBenefitService._findAll(query, condition, {}, [], select, null),
            this.attributeBudgetRangeService._findAll(query, condition, {}, [], select, {
                'min_range.value': 1,
            }),
        ]));
        return {
            casts: casts?.value?.data || [],
            categories: categories?.value?.data || [],
            tags: tags?.value?.data || [],
            platforms: platforms?.value?.data || [],
            sponsorship_forms: sponsorship_forms?.value?.data || [],
            sponsorship_benefits: sponsorship_benefits?.value?.data || [],
            budget_ranges: budget_ranges?.value?.data || [],
        };
    }
    async findAllForClient(query) {
        query.is_paging = false;
        const condition = {
            status: common_2.ENUM_STATUS.ACTIVE,
        };
        const select = 'name code description image';
        const [casts, categories, tags, platforms, sponsorship_forms, sponsorship_benefits, budget_ranges,] = (await Promise.allSettled([
            this.attributeCastService._findAll(query, condition, {}, [
                {
                    path: 'cast_professions',
                    match: { status: common_2.ENUM_STATUS.ACTIVE },
                    select,
                    model: schemas_1.AttributeCastProfession.name,
                },
            ], select, null),
            this.attributeCategoryService._findAll(query, condition, {}, [], select, null),
            this.attributeHashtagService._findAll(query, condition, {}, [], select, null),
            this.attributePlatformService._findAll(query, condition, {}, [], select, null),
            this.attributeSponsorshipFormService._findAll(query, condition, {}, [
                {
                    path: 'sponsor_benefit',
                    match: { status: common_2.ENUM_STATUS.ACTIVE },
                    select,
                    model: schemas_1.AttributeSponsorshipBenefit.name,
                },
            ], select, null),
            this.attributeSponsorshipBenefitService._findAll(query, condition, {}, [], select, null),
            this.attributeBudgetRangeService._findAll(query, condition, {}, [], select.concat(' min_range max_range'), {
                'min_range.value': 1,
            }),
        ]));
        return {
            casts: casts?.value?.data || [],
            sponsor_categories: categories?.value?.data || [],
            sponsor_hashtags: tags?.value?.data || [],
            platforms: platforms?.value?.data || [],
            sponsorship_forms: sponsorship_forms?.value?.data || [],
            sponsorship_benefits: sponsorship_benefits?.value?.data || [],
            budget_ranges: budget_ranges?.value?.data || [],
        };
    }
};
exports.AttributeService = AttributeService;
exports.AttributeService = AttributeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.AttributeCast.name, common_2.CONNECTION_NAME.PRIMARY)),
    __param(1, (0, mongoose_1.InjectModel)(schemas_1.AttributeCast.name, common_2.CONNECTION_NAME.SECONDARY)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object, typeof (_c = typeof attribute_cast_service_1.AttributeCastService !== "undefined" && attribute_cast_service_1.AttributeCastService) === "function" ? _c : Object, typeof (_d = typeof attribute_category_service_1.AttributeCategoryService !== "undefined" && attribute_category_service_1.AttributeCategoryService) === "function" ? _d : Object, typeof (_e = typeof attribute_hashtag_service_1.AttributeHashtagService !== "undefined" && attribute_hashtag_service_1.AttributeHashtagService) === "function" ? _e : Object, typeof (_f = typeof attribute_platform_service_1.AttributePlatformService !== "undefined" && attribute_platform_service_1.AttributePlatformService) === "function" ? _f : Object, typeof (_g = typeof attribute_sponsorship_benefit_service_1.AttributeSponsorshipBenefitService !== "undefined" && attribute_sponsorship_benefit_service_1.AttributeSponsorshipBenefitService) === "function" ? _g : Object, typeof (_h = typeof attribute_sponsorship_form_service_1.AttributeSponsorshipFormService !== "undefined" && attribute_sponsorship_form_service_1.AttributeSponsorshipFormService) === "function" ? _h : Object, typeof (_j = typeof attribute_budget_range_service_1.AttributeBudgetRangeService !== "undefined" && attribute_budget_range_service_1.AttributeBudgetRangeService) === "function" ? _j : Object])
], AttributeService);


/***/ }),
/* 296 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeCastProfessionService = void 0;
const mongoose_1 = __webpack_require__(80);
const mongoose_2 = __webpack_require__(52);
const common_1 = __webpack_require__(28);
const common_2 = __webpack_require__(1);
const schemas_1 = __webpack_require__(160);
const error_constant_1 = __webpack_require__(78);
const shared_1 = __webpack_require__(32);
const entities_1 = __webpack_require__(194);
let AttributeCastProfessionService = class AttributeCastProfessionService extends common_2.BaseService {
    constructor(model, readModel) {
        super(model, readModel);
        this.model = model;
        this.readModel = readModel;
        this.model_name = common_2.ENUM_MODEL.ATTRIBUTE_CAST_PROFESSION;
    }
    conditionFindAll(query) {
        const { condition, condition_keyword, sort, select_after_query } = common_2.Common._conditionFindAll({
            query,
            condition_fields: ['status'],
        });
        return {
            condition: condition,
            condition_keyword: condition_keyword,
            sort: sort,
            select_after_query: select_after_query,
        };
    }
    async findAll(query) {
        const { condition, condition_keyword, sort, select_after_query } = this.conditionFindAll(query);
        const datas = await this._findAll(query, condition, condition_keyword, [], select_after_query.select_by_populate, sort);
        return datas;
    }
    async findById(_id) {
        const data = await this._findById(_id);
        return data;
    }
    async create(body) {
        const data_existed = await this._findOne({ name: body.name });
        if (data_existed) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.EXISTS,
                i18nArgs: { attribute: 'Thể loại người nổi tiếng' },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const create_payload = new entities_1.CreateAttributeCastProfessionEntity(body);
        return await this._create(create_payload);
    }
    async update(id, body) {
        const data_existed = await this._findOne({
            name: body.name,
            _id: { $ne: common_2.Common.toObjectId(id) },
        });
        if (data_existed) {
            (0, shared_1.throwErrorMessage)({
                error_code: error_constant_1.ERROR_CODE.EXISTS,
                i18nArgs: { attribute: 'Thể loại người nổi tiếng' },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const upload_payload = new entities_1.UpdateAttributeCastProfessionEntity(body);
        return await this._findByIdAndUpdate(id, upload_payload);
    }
    async updateStatus(id, updateStatusDto) {
        const upload_payload = new entities_1.UpdateStatusAttributeCastProfessionEntity(updateStatusDto);
        return await this._findByIdAndUpdate(id, upload_payload);
    }
};
exports.AttributeCastProfessionService = AttributeCastProfessionService;
exports.AttributeCastProfessionService = AttributeCastProfessionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.AttributeCastProfession.name, common_2.CONNECTION_NAME.PRIMARY)),
    __param(1, (0, mongoose_1.InjectModel)(schemas_1.AttributeCastProfession.name, common_2.CONNECTION_NAME.SECONDARY)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], AttributeCastProfessionService);


/***/ }),
/* 297 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GroupController = void 0;
const common_1 = __webpack_require__(1);
const permission_enum_1 = __webpack_require__(20);
const shared_1 = __webpack_require__(32);
const jwt_interface_1 = __webpack_require__(187);
const common_2 = __webpack_require__(28);
const swagger_1 = __webpack_require__(3);
const group_service_1 = __webpack_require__(183);
const group_dto_1 = __webpack_require__(298);
let GroupController = class GroupController extends common_1.BaseController {
    constructor(groupService) {
        super();
        this.groupService = groupService;
    }
    async create(payload, user) {
        try {
            payload = await this.createControllerByUser(payload, user);
            const response = await this.groupService.create(payload);
            return this.returnResponse(response, common_1.RESPONSE.CREATE);
        }
        catch (error) {
            if (error instanceof common_2.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async getInformation(id) {
        try {
            const user = await this.groupService.getInformation(id);
            return this.returnResponse(user, common_1.RESPONSE.GET);
        }
        catch (error) {
            if (error instanceof common_2.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async update(id, payload, user) {
        try {
            payload = await this.updateControllerByUser(payload, user);
            const response = await this.groupService.update(id, payload);
            return this.returnResponse(response, common_1.RESPONSE.CREATE);
        }
        catch (error) {
            if (error instanceof common_2.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async findAll(query, user) {
        try {
            const response = await this.groupService.findAll(query);
            return this.returnResponse(response, common_1.RESPONSE.GET);
        }
        catch (error) {
            if (error instanceof common_2.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async updateStatus(id, payload, user) {
        try {
            payload = await this.updateControllerByUser(payload, user);
            const response = await this.groupService.updateStatus(id, payload);
            return this.returnResponse(response, common_1.RESPONSE.UPDATE_STATUS);
        }
        catch (error) {
            if (error instanceof common_2.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
};
exports.GroupController = GroupController;
__decorate([
    (0, common_2.Post)(''),
    (0, common_2.UsePipes)(new common_2.ValidationPipe({ transform: true, whitelist: true })),
    (0, shared_1.Roles)(common_1.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([permission_enum_1.PERMISSION.CREATE_GROUP]),
    (0, swagger_1.ApiOperation)({ summary: 'Create User Group (ONLY ADMIN SERVICE)' }),
    __param(0, (0, common_2.Body)()),
    __param(1, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof group_dto_1.CreateGroupDTO !== "undefined" && group_dto_1.CreateGroupDTO) === "function" ? _b : Object, typeof (_c = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "create", null);
__decorate([
    (0, common_2.Get)(':id'),
    (0, common_2.UsePipes)(new common_2.ValidationPipe({ transform: true, whitelist: true })),
    (0, shared_1.Roles)(common_1.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([permission_enum_1.PERMISSION.VIEW_GROUP]),
    (0, swagger_1.ApiOperation)({ summary: 'View Group Information (ONLY ADMIN SERVICE)' }),
    __param(0, (0, common_2.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "getInformation", null);
__decorate([
    (0, common_2.Put)(':id'),
    (0, common_2.UsePipes)(new common_2.ValidationPipe({ transform: true, whitelist: true })),
    (0, shared_1.Roles)(common_1.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([permission_enum_1.PERMISSION.UPDATE_GROUP]),
    (0, swagger_1.ApiOperation)({ summary: 'Update Group (ONLY ADMIN SERVICE)' }),
    __param(0, (0, common_2.Param)('id')),
    __param(1, (0, common_2.Body)()),
    __param(2, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof group_dto_1.UpdateGroupDTO !== "undefined" && group_dto_1.UpdateGroupDTO) === "function" ? _d : Object, typeof (_e = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "update", null);
__decorate([
    (0, common_2.Get)(''),
    (0, common_2.UsePipes)(new common_2.ValidationPipe({ transform: true, whitelist: true })),
    (0, shared_1.Roles)(common_1.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([permission_enum_1.PERMISSION.VIEW_GROUP]),
    (0, swagger_1.ApiOperation)({ summary: 'Get Groups (ONLY ADMIN SERVICE)' }),
    __param(0, (0, common_2.Query)()),
    __param(1, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof group_dto_1.FindGroupDTO !== "undefined" && group_dto_1.FindGroupDTO) === "function" ? _f : Object, typeof (_g = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "findAll", null);
__decorate([
    (0, common_2.Put)('status/:id'),
    (0, common_2.UsePipes)(new common_2.ValidationPipe({ transform: true, whitelist: true })),
    (0, shared_1.Roles)(common_1.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([permission_enum_1.PERMISSION.UPDATE_GROUP]),
    (0, swagger_1.ApiOperation)({ summary: 'Update Group (ONLY ADMIN SERVICE)' }),
    __param(0, (0, common_2.Param)('id')),
    __param(1, (0, common_2.Body)()),
    __param(2, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_h = typeof group_dto_1.UpdateGroupStatusDTO !== "undefined" && group_dto_1.UpdateGroupStatusDTO) === "function" ? _h : Object, typeof (_j = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _j : Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "updateStatus", null);
exports.GroupController = GroupController = __decorate([
    (0, common_2.Controller)('group'),
    __metadata("design:paramtypes", [typeof (_a = typeof group_service_1.GroupService !== "undefined" && group_service_1.GroupService) === "function" ? _a : Object])
], GroupController);


/***/ }),
/* 298 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateGroupStatusDTO = exports.UpdateGroupDTO = exports.FindGroupDTO = exports.CreateGroupDTO = void 0;
const common_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(3);
const class_validator_1 = __webpack_require__(7);
class CreateGroupDTO extends common_1.BaseCreateDTO {
}
exports.CreateGroupDTO = CreateGroupDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'Group Name',
        example: 'toan.pham',
    }),
    __metadata("design:type", String)
], CreateGroupDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        description: 'Group Description',
        example: 'toan.pham',
    }),
    __metadata("design:type", String)
], CreateGroupDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(common_1.ACCOUNT_TYPE),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        enum: common_1.ACCOUNT_TYPE,
        description: 'Account Type',
        example: common_1.ACCOUNT_TYPE.ADMIN,
    }),
    __metadata("design:type", String)
], CreateGroupDTO.prototype, "type", void 0);
class FindGroupDTO extends common_1.BaseQueryFilterDTO {
}
exports.FindGroupDTO = FindGroupDTO;
__decorate([
    (0, class_validator_1.IsEnum)(common_1.ACCOUNT_TYPE),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        enum: common_1.ACCOUNT_TYPE,
        description: 'Account Type',
        example: common_1.ACCOUNT_TYPE.ADMIN,
    }),
    __metadata("design:type", String)
], FindGroupDTO.prototype, "type", void 0);
class UpdateGroupDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.OmitType)(CreateGroupDTO, ['type']), common_1.BaseUpdateDTO) {
}
exports.UpdateGroupDTO = UpdateGroupDTO;
class UpdateGroupStatusDTO extends common_1.BaseUpdateDTO {
}
exports.UpdateGroupStatusDTO = UpdateGroupStatusDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(common_1.ENUM_STATUS),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'Working Status',
        example: common_1.ENUM_STATUS.ACTIVE,
    }),
    __metadata("design:type", typeof (_a = typeof common_1.ENUM_STATUS !== "undefined" && common_1.ENUM_STATUS) === "function" ? _a : Object)
], UpdateGroupStatusDTO.prototype, "status", void 0);


/***/ }),
/* 299 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const base_controller_1 = __webpack_require__(2);
const common_1 = __webpack_require__(28);
const swagger_1 = __webpack_require__(3);
const user_dto_1 = __webpack_require__(188);
const shared_1 = __webpack_require__(32);
const user_service_1 = __webpack_require__(159);
const common_2 = __webpack_require__(1);
const permission_enum_1 = __webpack_require__(20);
const jwt_interface_1 = __webpack_require__(187);
const permission_constant_1 = __webpack_require__(185);
let UserController = class UserController extends base_controller_1.BaseController {
    constructor(service) {
        super();
        this.service = service;
    }
    async create(payload, user) {
        try {
            payload = await this.createControllerByUser(payload, user);
            const response = await this.service.create(payload);
            return this.returnResponse(response, common_2.RESPONSE.CREATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async update(id, payload, user) {
        try {
            payload = await this.updateControllerByUser(payload, user);
            const response = await this.service.update(id, payload);
            return this.returnResponse(response, common_2.RESPONSE.CREATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async findAll(query, user) {
        try {
            const response = await this.service.findAll(query);
            return this.returnResponse(response, common_2.RESPONSE.GET);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async getInformation(id) {
        try {
            const user = await this.service.getInformation(id);
            return this.returnResponse(user, common_2.RESPONSE.GET);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async resetPassword(id, payload, user) {
        try {
            payload = await this.updateControllerByUser(payload, user);
            const response = await this.service.resetPassword(id, payload);
            return this.returnResponse(response, common_2.RESPONSE.UPDATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async getPermissionFrame() {
        try {
            return this.returnResponse(permission_constant_1.PERMISSION_FRAME, common_2.RESPONSE.GET);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async updateStatus(id, payload, user) {
        try {
            payload = await this.updateControllerByUser(payload, user);
            const response = await this.service.updateStatus(id, payload);
            return this.returnResponse(response, common_2.RESPONSE.UPDATE_STATUS);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([permission_enum_1.PERMISSION.CREATE_ACCOUNT]),
    (0, swagger_1.ApiOperation)({ summary: 'Create Account (ONLY ADMIN SERVICE)' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof user_dto_1.CreateUserDTO !== "undefined" && user_dto_1.CreateUserDTO) === "function" ? _b : Object, typeof (_c = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([permission_enum_1.PERMISSION.UPDATE_ACCOUNT]),
    (0, swagger_1.ApiOperation)({ summary: 'Update Account (ONLY ADMIN SERVICE)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof user_dto_1.UpdateUserDTO !== "undefined" && user_dto_1.UpdateUserDTO) === "function" ? _d : Object, typeof (_e = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(''),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([permission_enum_1.PERMISSION.VIEW_ACCOUNT, permission_enum_1.PERMISSION.VIEW_SPONSOR]),
    (0, swagger_1.ApiOperation)({ summary: 'Update Account (ONLY ADMIN SERVICE)' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof user_dto_1.FindUserDTO !== "undefined" && user_dto_1.FindUserDTO) === "function" ? _f : Object, typeof (_g = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([permission_enum_1.PERMISSION.VIEW_ACCOUNT]),
    (0, swagger_1.ApiOperation)({ summary: 'View Detail Account (ONLY ADMIN SERVICE)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getInformation", null);
__decorate([
    (0, common_1.Put)('reset-password/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([permission_enum_1.PERMISSION.UPDATE_ACCOUNT]),
    (0, swagger_1.ApiOperation)({ summary: 'Update Account Password (ONLY ADMIN SERVICE)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_h = typeof user_dto_1.ResetPasswordDTO !== "undefined" && user_dto_1.ResetPasswordDTO) === "function" ? _h : Object, typeof (_j = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _j : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Get)('/permissions/frame'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([permission_enum_1.PERMISSION.VIEW_ACCOUNT]),
    (0, swagger_1.ApiOperation)({ summary: 'View Permission Frame (ONLY ADMIN SERVICE)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getPermissionFrame", null);
__decorate([
    (0, common_1.Put)('status/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([permission_enum_1.PERMISSION.UPDATE_ACCOUNT]),
    (0, swagger_1.ApiOperation)({ summary: 'Update Account Status (ONLY ADMIN SERVICE)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_k = typeof user_dto_1.UpdateUserStatusDTO !== "undefined" && user_dto_1.UpdateUserStatusDTO) === "function" ? _k : Object, typeof (_l = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _l : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateStatus", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)('Accounts'),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], UserController);


/***/ }),
/* 300 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MasterDataController = void 0;
const common_1 = __webpack_require__(28);
const swagger_1 = __webpack_require__(3);
const common_2 = __webpack_require__(1);
const base_controller_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(32);
let MasterDataController = class MasterDataController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.logger = new common_1.Logger(this.constructor.name);
        this.model_name = common_2.ENUM_MODEL.MASTER_DATA;
    }
    async findAll(query, user) {
        this.logger.log(`******************** START_FUNCTION->findAll ********************`);
        return this.returnResponse({ ping: true }, common_2.RESPONSE.GET);
    }
};
exports.MasterDataController = MasterDataController;
__decorate([
    (0, common_1.Get)('ping'),
    (0, swagger_1.ApiOperation)({ summary: 'PING' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        isArray: true,
        description: 'Success',
    }),
    (0, shared_1.Unprotected)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MasterDataController.prototype, "findAll", null);
exports.MasterDataController = MasterDataController = __decorate([
    (0, common_1.Controller)('master-datas'),
    (0, swagger_1.ApiTags)('Dữ liệu chung'),
    __metadata("design:paramtypes", [])
], MasterDataController);


/***/ }),
/* 301 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadController = void 0;
const common_1 = __webpack_require__(28);
const swagger_1 = __webpack_require__(3);
const platform_express_1 = __webpack_require__(302);
const config_1 = __webpack_require__(36);
const common_2 = __webpack_require__(1);
const shared_1 = __webpack_require__(32);
const upload_config_1 = __webpack_require__(303);
let UploadController = class UploadController extends common_2.BaseController {
    constructor() {
        super();
    }
    async uploadMultipleFiles(files) {
        if (!files || files.length === 0) {
            throw new common_1.HttpException(this.i18n.translate('errors.E0004'), common_1.HttpStatus.BAD_REQUEST);
        }
        const fileDetails = files.map((file) => {
            const path = `${file.destination}`.replace('./public', '/public');
            file.path =
                path + '/' + file.filename;
            return {
                ...file,
                filename: file.filename,
            };
        });
        return {
            files: fileDetails,
        };
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object)
], UploadController.prototype, "configService", void 0);
__decorate([
    (0, common_1.Post)('media'),
    (0, shared_1.Unprotected)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, upload_config_1.default)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    }),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof Array !== "undefined" && Array) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UploadController.prototype, "uploadMultipleFiles", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.Controller)('uploads'),
    (0, swagger_1.ApiTags)('upload image and file'),
    __metadata("design:paramtypes", [])
], UploadController);


/***/ }),
/* 302 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),
/* 303 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const multer_1 = __webpack_require__(304);
const moment = __webpack_require__(50);
const fs = __webpack_require__(305);
const common_1 = __webpack_require__(1);
const multerOptions = {
    storage: (0, multer_1.diskStorage)({
        destination: (req, file, cb) => {
            let folder = 'documents';
            if (file.mimetype.startsWith('image/')) {
                folder = 'images';
            }
            const dir = `./public/${moment().format(common_1.ENUM_DATE_TIME.YYYY_MM_DD)}/${folder}`;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            cb(null, dir);
        },
        filename: common_1.editFileName,
    }),
    fileFilter: common_1.fileFilter,
    limits: {
        fileSize: 52428800,
    },
};
exports["default"] = multerOptions;


/***/ }),
/* 304 */
/***/ ((module) => {

module.exports = require("multer");

/***/ }),
/* 305 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 306 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeHashTagController = void 0;
const common_1 = __webpack_require__(28);
const swagger_1 = __webpack_require__(3);
const common_2 = __webpack_require__(1);
const base_controller_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(32);
const attribute_hashtag_service_1 = __webpack_require__(291);
const jwt_interface_1 = __webpack_require__(187);
const hashtag_1 = __webpack_require__(225);
let AttributeHashTagController = class AttributeHashTagController extends base_controller_1.BaseController {
    constructor(attributeHashtagService) {
        super();
        this.attributeHashtagService = attributeHashtagService;
        this.logger = new common_1.Logger(this.constructor.name);
        this.model_name = common_2.ENUM_MODEL.ATTRIBUTE_HASHTAG;
    }
    async findAll(query, user) {
        this.logger.log(`******************** START_FUNCTION->findAll ********************`);
        const data = await this.attributeHashtagService.findAll(query);
        return this.returnResponse(data, common_2.RESPONSE.GET);
    }
    async findById(id) {
        try {
            this.logger.log(`******************** START_FUNCTION->findById ********************`);
            const data = await this.attributeHashtagService.findById(id);
            return this.returnResponse(data, common_2.RESPONSE.GET);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async create(body, user) {
        try {
            this.logger.log(`******************** START_FUNCTION->create ********************`);
            await this.createControllerByUser(body, user);
            const data = await this.attributeHashtagService.create(body);
            return this.returnResponse(data, common_2.RESPONSE.CREATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async update(id, body, user) {
        try {
            this.logger.log(`******************** START_FUNCTION->update ********************`);
            await this.updateControllerByUser(body, user);
            const data = await this.attributeHashtagService.update(id, body);
            return this.returnResponse(data, common_2.RESPONSE.UPDATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async updateStatus(id, body, user) {
        try {
            this.logger.log(`******************** START_FUNCTION->updateStatus ********************`);
            await this.updateControllerByUser(body, user);
            const data = await this.attributeHashtagService.updateStatus(id, body);
            return this.returnResponse(data, common_2.RESPONSE.UPDATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
};
exports.AttributeHashTagController = AttributeHashTagController;
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({ summary: 'Danh sách tag' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, swagger_1.ApiResponse)({
        status: 200,
        isArray: true,
        description: 'Success',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof hashtag_1.FindAttributeTagDTO !== "undefined" && hashtag_1.FindAttributeTagDTO) === "function" ? _b : Object, typeof (_c = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AttributeHashTagController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Hashtag Detail' }),
    (0, swagger_1.ApiParam)({
        required: true,
        name: 'id',
        type: String,
        example: '5f7d28d11f992e1359a007f9',
        description: 'Id',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    __param(0, (0, common_1.Param)('id', new shared_1.ValidateObjectIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttributeHashTagController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo tag' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof hashtag_1.CreateAttributeTagDTO !== "undefined" && hashtag_1.CreateAttributeTagDTO) === "function" ? _d : Object, typeof (_e = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], AttributeHashTagController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Chỉnh sửa tag' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    __param(0, (0, common_1.Param)('id', new shared_1.ValidateObjectIdPipe())),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_f = typeof hashtag_1.UpdateAttributeTagDTO !== "undefined" && hashtag_1.UpdateAttributeTagDTO) === "function" ? _f : Object, typeof (_g = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], AttributeHashTagController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('status/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Change status tag' }),
    (0, swagger_1.ApiParam)({
        required: true,
        name: 'id',
        type: String,
        example: '5f7d28d11f992e1359a007f9',
        description: 'Id',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    __param(0, (0, common_1.Param)('id', new shared_1.ValidateObjectIdPipe())),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_h = typeof hashtag_1.UpdateStatusAttributeTagDTO !== "undefined" && hashtag_1.UpdateStatusAttributeTagDTO) === "function" ? _h : Object, Object]),
    __metadata("design:returntype", Promise)
], AttributeHashTagController.prototype, "updateStatus", null);
exports.AttributeHashTagController = AttributeHashTagController = __decorate([
    (0, common_1.Controller)('attributes/tags'),
    (0, swagger_1.ApiTags)('Sponsor Tags'),
    __metadata("design:paramtypes", [typeof (_a = typeof attribute_hashtag_service_1.AttributeHashtagService !== "undefined" && attribute_hashtag_service_1.AttributeHashtagService) === "function" ? _a : Object])
], AttributeHashTagController);


/***/ }),
/* 307 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SponsorController = void 0;
const enums_1 = __webpack_require__(8);
const base_controller_1 = __webpack_require__(2);
const sponsor_service_1 = __webpack_require__(192);
const common_1 = __webpack_require__(28);
const dto_1 = __webpack_require__(308);
const swagger_1 = __webpack_require__(3);
const permission_enum_1 = __webpack_require__(20);
const jwt_interface_1 = __webpack_require__(187);
const shared_1 = __webpack_require__(32);
let SponsorController = class SponsorController extends base_controller_1.BaseController {
    constructor(sponsorService) {
        super();
        this.sponsorService = sponsorService;
        this.model_name = enums_1.ENUM_MODEL.SPONSOR;
    }
    async findAll(query, user) {
        try {
            const { request_id, ...filteredQuery } = query;
            const sponsors = await this.sponsorService.findAllAvailable(filteredQuery);
            return this.returnResponse(sponsors, enums_1.RESPONSE.GET);
        }
        catch (error) {
            this.logger.error(`findAll=>ROOT CAUSE: ${JSON.stringify(error?.message ?? error)}`);
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async findAllAvailable(query, user) {
        const { request_id, ...filteredQuery } = query;
        const sponsors = await this.sponsorService.findAllAvailable(filteredQuery);
        return this.returnResponse(sponsors, enums_1.RESPONSE.GET);
    }
    async findAllPending(query, user) {
        const { request_id, ...filteredQuery } = query;
        const sponsors = await this.sponsorService.findAllPending(filteredQuery);
        return this.returnResponse(sponsors, enums_1.RESPONSE.GET);
    }
    async findOneForPreview(id) {
        const sponsor = await this.sponsorService.findOneForAdminPreview(id);
        if (!sponsor) {
            throw new common_1.NotFoundException(`Sponsor with id ${id} not found`);
        }
        return this.returnResponse(sponsor, enums_1.RESPONSE.GET);
    }
    async findById(id) {
        const sponsor = await this.sponsorService.findOneForAdmin(id);
        if (!sponsor) {
            throw new common_1.NotFoundException(`Sponsor with id ${id} not found`);
        }
        return this.returnResponse(sponsor, enums_1.RESPONSE.GET);
    }
    async update(id, payload, user) {
        try {
            payload = await this.updateControllerByUser(payload, user);
            const updatedSponsor = await this.sponsorService.update(id, payload, user);
            return this.returnResponse(updatedSponsor, enums_1.RESPONSE.UPDATE);
        }
        catch (error) {
            this.logger.error(`update=>ROOT CAUSE: ${JSON.stringify(error?.message ?? error)}`);
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async updateStatus(id, payload, user) {
        try {
            payload = await this.updateControllerByUser(payload, user);
            const sponsor = await this.sponsorService.updateStatus(id, payload);
            return this.returnResponse(sponsor, enums_1.RESPONSE.UPDATE_STATUS);
        }
        catch (error) {
            this.logger.error(`updateStatus=>ROOT CAUSE: ${JSON.stringify(error?.message ?? error)}`);
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
};
exports.SponsorController = SponsorController;
__decorate([
    (0, common_1.Get)(''),
    (0, shared_1.Roles)(enums_1.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([permission_enum_1.PERMISSION.VIEW_SPONSOR]),
    (0, swagger_1.ApiOperation)({ summary: 'Get list of sponsors' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        isArray: true,
        description: 'Success',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], SponsorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('available'),
    (0, shared_1.Roles)(enums_1.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([permission_enum_1.PERMISSION.VIEW_SPONSOR]),
    (0, swagger_1.ApiOperation)({ summary: 'Get list of sponsors' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        isArray: true,
        description: 'Success',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], SponsorController.prototype, "findAllAvailable", null);
__decorate([
    (0, common_1.Get)('pending'),
    (0, shared_1.Roles)(enums_1.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([permission_enum_1.PERMISSION.VIEW_SPONSOR]),
    (0, swagger_1.ApiOperation)({ summary: 'Get list of sponsors' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        isArray: true,
        description: 'Success',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], SponsorController.prototype, "findAllPending", null);
__decorate([
    (0, common_1.Get)('preview/:id'),
    (0, shared_1.Roles)(enums_1.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([permission_enum_1.PERMISSION.VIEW_SPONSOR]),
    (0, shared_1.Unprotected)(true),
    (0, swagger_1.ApiOperation)({ summary: 'Get sponsor for preview' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], SponsorController.prototype, "findOneForPreview", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, shared_1.Roles)(enums_1.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([permission_enum_1.PERMISSION.VIEW_SPONSOR]),
    (0, shared_1.Unprotected)(true),
    (0, swagger_1.ApiOperation)({ summary: 'Get sponsor by id' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Sponsor found',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Sponsor not found',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], SponsorController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, shared_1.Roles)(enums_1.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([permission_enum_1.PERMISSION.UPDATE_SPONSOR]),
    (0, swagger_1.ApiOperation)({ summary: 'Update Sponsor From Admin' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The sponsor has been successfully created.',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_g = typeof dto_1.UpdateSponsorDTO !== "undefined" && dto_1.UpdateSponsorDTO) === "function" ? _g : Object, typeof (_h = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _h : Object]),
    __metadata("design:returntype", Promise)
], SponsorController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    (0, shared_1.Roles)(enums_1.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([permission_enum_1.PERMISSION.UPDATE_SPONSOR]),
    (0, swagger_1.ApiOperation)({ summary: 'Update Sponsor Status From Admin' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The sponsor has been successfully created.',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_j = typeof dto_1.UpdateStatusDTO !== "undefined" && dto_1.UpdateStatusDTO) === "function" ? _j : Object, typeof (_k = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _k : Object]),
    __metadata("design:returntype", Promise)
], SponsorController.prototype, "updateStatus", null);
exports.SponsorController = SponsorController = __decorate([
    (0, common_1.Controller)('sponsors'),
    (0, swagger_1.ApiTags)('sponsors'),
    __metadata("design:paramtypes", [typeof (_a = typeof sponsor_service_1.SponsorService !== "undefined" && sponsor_service_1.SponsorService) === "function" ? _a : Object])
], SponsorController);


/***/ }),
/* 308 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(309), exports);
__exportStar(__webpack_require__(310), exports);


/***/ }),
/* 309 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateSponsorDTO = exports.CreateSponsorDTO = void 0;
const class_validator_1 = __webpack_require__(7);
const class_transformer_1 = __webpack_require__(27);
const enums_1 = __webpack_require__(175);
const common_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(3);
const shared_1 = __webpack_require__(32);
class scheduleDetailsDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], scheduleDetailsDto.prototype, "time", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], scheduleDetailsDto.prototype, "description", void 0);
class RejectReasonDTO {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RejectReasonDTO.prototype, "reason", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RejectReasonDTO.prototype, "refuser", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], RejectReasonDTO.prototype, "created_at", void 0);
class SponsorPlatformDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], SponsorPlatformDTO.prototype, "platform", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SponsorPlatformDTO.prototype, "link", void 0);
class SponsorShipformDTO {
}
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SponsorShipformDTO.prototype, "sponsorship_form", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SponsorShipformDTO.prototype, "media", void 0);
class SponsorSchedulerDTO {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SponsorSchedulerDTO.prototype, "event_time", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SponsorSchedulerDTO.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SponsorSchedulerDTO.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => scheduleDetailsDto),
    __metadata("design:type", Array)
], SponsorSchedulerDTO.prototype, "schedule_details", void 0);
class SponsorshipPackageDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SponsorshipPackageDto.prototype, "package_name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SponsorshipPackageDto.prototype, "package_value", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SponsorshipPackageDto.prototype, "package_unit", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    (0, shared_1.ToBoolean)(),
    __metadata("design:type", Boolean)
], SponsorshipPackageDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SponsorshipPackageDto.prototype, "file", void 0);
class CreateSponsorDTO extends common_1.BaseCreateDTO {
}
exports.CreateSponsorDTO = CreateSponsorDTO;
__decorate([
    (0, class_validator_1.ValidateIf)((value) => !common_1.Common.compareValues(value?.display_status, enums_1.DisplayStatus.DRAFT)),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        description: 'Tên Chương Trình',
        default: null,
    }),
    __metadata("design:type", String)
], CreateSponsorDTO.prototype, "sponsor_name", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((value) => !common_1.Common.compareValues(value?.display_status, enums_1.DisplayStatus.DRAFT)),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'Cover Image',
        default: null,
    }),
    __metadata("design:type", String)
], CreateSponsorDTO.prototype, "cover_image", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((value) => !common_1.Common.compareValues(value?.display_status, enums_1.DisplayStatus.DRAFT)),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'Banner Image',
        default: null,
    }),
    __metadata("design:type", String)
], CreateSponsorDTO.prototype, "banner_image", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, shared_1.ToBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: Boolean,
        description: 'Banner Image',
        default: false,
    }),
    __metadata("design:type", Boolean)
], CreateSponsorDTO.prototype, "product_limited_is_limit", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((value) => common_1.Common.compareValues(value?.product_limited_is_limit, true)),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        description: 'Banner Image',
        default: null,
    }),
    __metadata("design:type", String)
], CreateSponsorDTO.prototype, "product_limited_description", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((property) => !common_1.Common.compareValues(property?.display_status, enums_1.DisplayStatus.DRAFT)),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)((property) => property.value ? common_1.Common.transformDate(property.value) : null),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: Date,
        description: 'Thời Gian Diễn Ra (Từ)',
        default: null,
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], CreateSponsorDTO.prototype, "start_date", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((value) => !common_1.Common.compareValues(value?.display_status, enums_1.DisplayStatus.DRAFT)),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)((property) => property.value ? common_1.Common.transformDate(property.value) : null),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: Date,
        description: 'Thời Gian Diễn Ra (Đến)',
        default: null,
    }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], CreateSponsorDTO.prototype, "end_date", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((value) => !common_1.Common.compareValues(value?.display_status, enums_1.DisplayStatus.DRAFT)),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)((property) => property.value ? common_1.Common.transformDate(property.value) : null),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: Date,
        description: 'Thời Gian Hết Hạn Tài Trợ',
        default: null,
    }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], CreateSponsorDTO.prototype, "sponsorship_expiration_date", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: Boolean,
        description: 'Trạng Thái Hiển Thị',
        default: enums_1.DisplayStatus.DRAFT,
    }),
    __metadata("design:type", String)
], CreateSponsorDTO.prototype, "display_status", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Trạng Thái Tài Trợ',
    }),
    __metadata("design:type", String)
], CreateSponsorDTO.prototype, "sponsorship_status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: Boolean,
        description: 'Trạng Thái Sản Xuất',
        default: enums_1.ProductionStatus.PLANNING,
    }),
    __metadata("design:type", typeof (_e = typeof enums_1.ProductionStatus !== "undefined" && enums_1.ProductionStatus) === "function" ? _e : Object)
], CreateSponsorDTO.prototype, "production_status", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((value) => !common_1.Common.compareValues(value?.display_status, enums_1.DisplayStatus.DRAFT)),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'Mô Tả Ngắn',
        default: null,
    }),
    __metadata("design:type", String)
], CreateSponsorDTO.prototype, "short_description", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((value) => !common_1.Common.compareValues(value?.display_status, enums_1.DisplayStatus.DRAFT)),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'Mô Tả Chi Tiết',
        default: null,
    }),
    __metadata("design:type", String)
], CreateSponsorDTO.prototype, "detailed_description", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((value) => !common_1.Common.compareValues(value?.display_status, enums_1.DisplayStatus.DRAFT)),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ArrayMaxSize)(20),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: (Array),
        description: 'Hình Ảnh Giới Thiệu',
        default: [],
    }),
    __metadata("design:type", Array)
], CreateSponsorDTO.prototype, "introduction_images", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((value) => !common_1.Common.compareValues(value?.display_status, enums_1.DisplayStatus.DRAFT) ||
        value?.sponsor_hashtags?.length),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: (Array),
        description: 'Tags',
    }),
    __metadata("design:type", Array)
], CreateSponsorDTO.prototype, "sponsor_hashtags", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((value) => !common_1.Common.compareValues(value?.display_status, enums_1.DisplayStatus.DRAFT)),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: (Array),
        description: 'Diễn Viên KOL Tham Gia',
    }),
    __metadata("design:type", Array)
], CreateSponsorDTO.prototype, "casts", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((value) => !common_1.Common.compareValues(value?.display_status, enums_1.DisplayStatus.DRAFT)),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    (0, class_transformer_1.Transform)((property) => !property?.value || property?.value === '' ? null : property.value),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'Thể Loại Chương Trình',
        default: null,
    }),
    __metadata("design:type", String)
], CreateSponsorDTO.prototype, "sponsor_categories", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((value) => !common_1.Common.compareValues(value?.display_status, enums_1.DisplayStatus.DRAFT)),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SponsorPlatformDTO),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: (Array),
        description: 'Nền Tảng',
    }),
    __metadata("design:type", Array)
], CreateSponsorDTO.prototype, "platforms", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((value) => !common_1.Common.compareValues(value?.display_status, enums_1.DisplayStatus.DRAFT)),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SponsorShipformDTO),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: (Array),
        description: 'Hình Thức Tài Trợ',
    }),
    __metadata("design:type", Array)
], CreateSponsorDTO.prototype, "sponsorship_forms", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((value) => !common_1.Common.compareValues(value?.display_status, enums_1.DisplayStatus.DRAFT)),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SponsorshipPackageDto),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: (Array),
        description: 'Hình Thức Tài Trợ',
    }),
    __metadata("design:type", Array)
], CreateSponsorDTO.prototype, "sponsorship_packages", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SponsorSchedulerDTO),
    __metadata("design:type", Array)
], CreateSponsorDTO.prototype, "sponsor_schedulers", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        description: 'KPI Dự Kiến',
    }),
    __metadata("design:type", String)
], CreateSponsorDTO.prototype, "sponsor_kpi", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => RejectReasonDTO),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: RejectReasonDTO,
        description: 'Lý Do Admin Từ Chối',
    }),
    __metadata("design:type", RejectReasonDTO)
], CreateSponsorDTO.prototype, "reason_rejected", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: Number,
        description: 'Độ Ưu Tiên Hiển Thị Bài Viết Nổi Bật Trên Client',
    }),
    __metadata("design:type", Number)
], CreateSponsorDTO.prototype, "priority", void 0);
class UpdateSponsorDTO extends CreateSponsorDTO {
}
exports.UpdateSponsorDTO = UpdateSponsorDTO;


/***/ }),
/* 310 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateStatusDTO = void 0;
const class_validator_1 = __webpack_require__(7);
const enums_1 = __webpack_require__(175);
const common_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(3);
class UpdateStatusDTO extends common_1.BaseUpdateDTO {
}
exports.UpdateStatusDTO = UpdateStatusDTO;
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.DisplayStatus),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: Boolean,
        description: 'Trạng Thái Hiển Thị',
    }),
    __metadata("design:type", String)
], UpdateStatusDTO.prototype, "display_status", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((value) => common_1.Common.compareValues(value?.display_status, enums_1.DisplayStatus.REFUSE)),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'Lý Do Từ Chối',
    }),
    __metadata("design:type", String)
], UpdateStatusDTO.prototype, "reason", void 0);


/***/ }),
/* 311 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeCastController = void 0;
const common_1 = __webpack_require__(28);
const swagger_1 = __webpack_require__(3);
const common_2 = __webpack_require__(1);
const base_controller_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(32);
const jwt_interface_1 = __webpack_require__(187);
const attribute_cast_service_1 = __webpack_require__(290);
const dto_1 = __webpack_require__(198);
let AttributeCastController = class AttributeCastController extends base_controller_1.BaseController {
    constructor(attributeCastService) {
        super();
        this.attributeCastService = attributeCastService;
        this.logger = new common_1.Logger(this.constructor.name);
        this.model_name = common_2.ENUM_MODEL.ATTRIBUTE_CAST;
    }
    async findAll(query, user) {
        this.logger.log(`******************** START_FUNCTION->findAll ********************`);
        const data = await this.attributeCastService.findAll(query);
        return this.returnResponse(data, common_2.RESPONSE.GET);
    }
    async findById(id) {
        try {
            this.logger.log(`******************** START_FUNCTION->findById ********************`);
            const data = await this.attributeCastService.findById(id);
            return this.returnResponse(data, common_2.RESPONSE.GET);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async create(body, user) {
        try {
            this.logger.log(`******************** START_FUNCTION->create ********************`);
            await this.createControllerByUser(body, user);
            const data = await this.attributeCastService.create(body);
            return this.returnResponse(data, common_2.RESPONSE.CREATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async update(id, body, user) {
        try {
            this.logger.log(`******************** START_FUNCTION->update ********************`);
            await this.updateControllerByUser(body, user);
            const data = await this.attributeCastService.update(id, body);
            return this.returnResponse(data, common_2.RESPONSE.UPDATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async updateStatus(id, body, user) {
        try {
            this.logger.log(`******************** START_FUNCTION->updateStatus ********************`);
            await this.updateControllerByUser(body, user);
            const data = await this.attributeCastService.updateStatus(id, body);
            return this.returnResponse(data, common_2.RESPONSE.UPDATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
};
exports.AttributeCastController = AttributeCastController;
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({ summary: 'List cast' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, swagger_1.ApiResponse)({
        status: 200,
        isArray: true,
        description: 'Success',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof dto_1.FindAttributeCastDTO !== "undefined" && dto_1.FindAttributeCastDTO) === "function" ? _b : Object, typeof (_c = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AttributeCastController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Cast Detail' }),
    (0, swagger_1.ApiParam)({
        required: true,
        name: 'id',
        type: String,
        example: '5f7d28d11f992e1359a007f9',
        description: 'Id',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    __param(0, (0, common_1.Param)('id', new shared_1.ValidateObjectIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttributeCastController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiOperation)({ summary: 'Create cast' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateAttributeCastDTO !== "undefined" && dto_1.CreateAttributeCastDTO) === "function" ? _d : Object, typeof (_e = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], AttributeCastController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update cast' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    __param(0, (0, common_1.Param)('id', new shared_1.ValidateObjectIdPipe())),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_f = typeof dto_1.UpdateAttributeCastDTO !== "undefined" && dto_1.UpdateAttributeCastDTO) === "function" ? _f : Object, typeof (_g = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], AttributeCastController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('status/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Change status cast' }),
    (0, swagger_1.ApiParam)({
        required: true,
        name: 'id',
        type: String,
        example: '5f7d28d11f992e1359a007f9',
        description: 'Id',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    __param(0, (0, common_1.Param)('id', new shared_1.ValidateObjectIdPipe())),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_h = typeof dto_1.UpdateStatusAttributeCastDTO !== "undefined" && dto_1.UpdateStatusAttributeCastDTO) === "function" ? _h : Object, Object]),
    __metadata("design:returntype", Promise)
], AttributeCastController.prototype, "updateStatus", null);
exports.AttributeCastController = AttributeCastController = __decorate([
    (0, common_1.Controller)('attributes/casts'),
    (0, swagger_1.ApiTags)('Sponsor Cast'),
    __metadata("design:paramtypes", [typeof (_a = typeof attribute_cast_service_1.AttributeCastService !== "undefined" && attribute_cast_service_1.AttributeCastService) === "function" ? _a : Object])
], AttributeCastController);


/***/ }),
/* 312 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeCategoryController = void 0;
const common_1 = __webpack_require__(28);
const swagger_1 = __webpack_require__(3);
const common_2 = __webpack_require__(1);
const base_controller_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(32);
const jwt_interface_1 = __webpack_require__(187);
const attribute_category_service_1 = __webpack_require__(193);
const category_1 = __webpack_require__(220);
const hashtag_1 = __webpack_require__(225);
let AttributeCategoryController = class AttributeCategoryController extends base_controller_1.BaseController {
    constructor(attributeCategoryService) {
        super();
        this.attributeCategoryService = attributeCategoryService;
        this.logger = new common_1.Logger(this.constructor.name);
        this.model_name = common_2.ENUM_MODEL.ATTRIBUTE_CATEGORY;
    }
    async findAll(query, user) {
        this.logger.log(`******************** START_FUNCTION->findAll ********************`);
        const data = await this.attributeCategoryService.findAll(query);
        return this.returnResponse(data, common_2.RESPONSE.GET);
    }
    async findById(id) {
        try {
            this.logger.log(`******************** START_FUNCTION->findById ********************`);
            const data = await this.attributeCategoryService.findById(id);
            return this.returnResponse(data, common_2.RESPONSE.GET);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async create(body, user) {
        try {
            this.logger.log(`******************** START_FUNCTION->create ********************`);
            await this.createControllerByUser(body, user);
            const data = await this.attributeCategoryService.create(body);
            return this.returnResponse(data, common_2.RESPONSE.CREATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async update(id, body, user) {
        try {
            this.logger.log(`******************** START_FUNCTION->update ********************`);
            await this.updateControllerByUser(body, user);
            const data = await this.attributeCategoryService.update(id, body);
            return this.returnResponse(data, common_2.RESPONSE.UPDATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async updateStatus(id, body, user) {
        try {
            this.logger.log(`******************** START_FUNCTION->updateStatus ********************`);
            await this.updateControllerByUser(body, user);
            const data = await this.attributeCategoryService.updateStatus(id, body);
            return this.returnResponse(data, common_2.RESPONSE.UPDATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
};
exports.AttributeCategoryController = AttributeCategoryController;
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({ summary: 'Danh sách category' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, swagger_1.ApiResponse)({
        status: 200,
        isArray: true,
        description: 'Success',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof category_1.FindAttributeCategoryDTO !== "undefined" && category_1.FindAttributeCategoryDTO) === "function" ? _b : Object, typeof (_c = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AttributeCategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Category Detail' }),
    (0, swagger_1.ApiParam)({
        required: true,
        name: 'id',
        type: String,
        example: '5f7d28d11f992e1359a007f9',
        description: 'Id',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    __param(0, (0, common_1.Param)('id', new shared_1.ValidateObjectIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttributeCategoryController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo category' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof category_1.CreateAttributeCategoryDTO !== "undefined" && category_1.CreateAttributeCategoryDTO) === "function" ? _d : Object, typeof (_e = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], AttributeCategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Chỉnh sửa category' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    __param(0, (0, common_1.Param)('id', new shared_1.ValidateObjectIdPipe())),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_f = typeof category_1.UpdateAttributeCategoryDTO !== "undefined" && category_1.UpdateAttributeCategoryDTO) === "function" ? _f : Object, typeof (_g = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], AttributeCategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('status/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Change status category' }),
    (0, swagger_1.ApiParam)({
        required: true,
        name: 'id',
        type: String,
        example: '5f7d28d11f992e1359a007f9',
        description: 'Id',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    __param(0, (0, common_1.Param)('id', new shared_1.ValidateObjectIdPipe())),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_h = typeof hashtag_1.UpdateStatusAttributeTagDTO !== "undefined" && hashtag_1.UpdateStatusAttributeTagDTO) === "function" ? _h : Object, Object]),
    __metadata("design:returntype", Promise)
], AttributeCategoryController.prototype, "updateStatus", null);
exports.AttributeCategoryController = AttributeCategoryController = __decorate([
    (0, common_1.Controller)('attributes/categories'),
    (0, swagger_1.ApiTags)('Sponsor Category'),
    __metadata("design:paramtypes", [typeof (_a = typeof attribute_category_service_1.AttributeCategoryService !== "undefined" && attribute_category_service_1.AttributeCategoryService) === "function" ? _a : Object])
], AttributeCategoryController);


/***/ }),
/* 313 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributePlatformController = void 0;
const common_1 = __webpack_require__(28);
const swagger_1 = __webpack_require__(3);
const common_2 = __webpack_require__(1);
const base_controller_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(32);
const attribute_platform_service_1 = __webpack_require__(292);
const jwt_interface_1 = __webpack_require__(187);
const dto_1 = __webpack_require__(198);
let AttributePlatformController = class AttributePlatformController extends base_controller_1.BaseController {
    constructor(attributePlatformService) {
        super();
        this.attributePlatformService = attributePlatformService;
        this.logger = new common_1.Logger(this.constructor.name);
        this.model_name = common_2.ENUM_MODEL.ATTRIBUTE_PLATFORM;
    }
    async findAll(query, user) {
        this.logger.log(`******************** START_FUNCTION->findAll ********************`);
        const data = await this.attributePlatformService.findAll(query);
        return this.returnResponse(data, common_2.RESPONSE.GET);
    }
    async findById(id) {
        try {
            this.logger.log(`******************** START_FUNCTION->findById ********************`);
            const data = await this.attributePlatformService.findById(id);
            return this.returnResponse(data, common_2.RESPONSE.GET);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async create(body, user) {
        try {
            this.logger.log(`******************** START_FUNCTION->create ********************`);
            await this.createControllerByUser(body, user);
            const data = await this.attributePlatformService.create(body);
            return this.returnResponse(data, common_2.RESPONSE.CREATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async update(id, body, user) {
        try {
            this.logger.log(`******************** START_FUNCTION->update ********************`);
            await this.updateControllerByUser(body, user);
            const data = await this.attributePlatformService.update(id, body);
            return this.returnResponse(data, common_2.RESPONSE.UPDATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async updateStatus(id, body, user) {
        try {
            this.logger.log(`******************** START_FUNCTION->updateStatus ********************`);
            await this.updateControllerByUser(body, user);
            const data = await this.attributePlatformService.updateStatus(id, body);
            return this.returnResponse(data, common_2.RESPONSE.UPDATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
};
exports.AttributePlatformController = AttributePlatformController;
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({ summary: 'Danh sách platform' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, swagger_1.ApiResponse)({
        status: 200,
        isArray: true,
        description: 'Success',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof dto_1.FindAttributePlatformDTO !== "undefined" && dto_1.FindAttributePlatformDTO) === "function" ? _b : Object, typeof (_c = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AttributePlatformController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Platform Detail' }),
    (0, swagger_1.ApiParam)({
        required: true,
        name: 'id',
        type: String,
        example: '5f7d28d11f992e1359a007f9',
        description: 'Id',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    __param(0, (0, common_1.Param)('id', new shared_1.ValidateObjectIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttributePlatformController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo platform' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateAttributePlatformDTO !== "undefined" && dto_1.CreateAttributePlatformDTO) === "function" ? _d : Object, typeof (_e = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], AttributePlatformController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Chỉnh sửa platform' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    __param(0, (0, common_1.Param)('id', new shared_1.ValidateObjectIdPipe())),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_f = typeof dto_1.UpdateAttributePlatformDTO !== "undefined" && dto_1.UpdateAttributePlatformDTO) === "function" ? _f : Object, typeof (_g = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], AttributePlatformController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('status/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Change status platform' }),
    (0, swagger_1.ApiParam)({
        required: true,
        name: 'id',
        type: String,
        example: '5f7d28d11f992e1359a007f9',
        description: 'Id',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    __param(0, (0, common_1.Param)('id', new shared_1.ValidateObjectIdPipe())),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_h = typeof dto_1.UpdateStatusAttributePlatformDTO !== "undefined" && dto_1.UpdateStatusAttributePlatformDTO) === "function" ? _h : Object, Object]),
    __metadata("design:returntype", Promise)
], AttributePlatformController.prototype, "updateStatus", null);
exports.AttributePlatformController = AttributePlatformController = __decorate([
    (0, common_1.Controller)('attributes/platforms'),
    (0, swagger_1.ApiTags)('Sponsor Platform'),
    __metadata("design:paramtypes", [typeof (_a = typeof attribute_platform_service_1.AttributePlatformService !== "undefined" && attribute_platform_service_1.AttributePlatformService) === "function" ? _a : Object])
], AttributePlatformController);


/***/ }),
/* 314 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeController = void 0;
const common_1 = __webpack_require__(28);
const swagger_1 = __webpack_require__(3);
const common_2 = __webpack_require__(1);
const base_controller_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(32);
const jwt_interface_1 = __webpack_require__(187);
const attribute_service_1 = __webpack_require__(295);
let AttributeController = class AttributeController extends base_controller_1.BaseController {
    constructor(attributeService) {
        super();
        this.attributeService = attributeService;
        this.logger = new common_1.Logger(this.constructor.name);
        this.model_name = common_2.ENUM_MODEL.ATTRIBUTE;
    }
    async findAll(query, user) {
        this.logger.log(`******************** START_FUNCTION->findAll ********************`);
        const data = await this.attributeService.findAll(query);
        return this.returnResponse(data, common_2.RESPONSE.GET);
    }
};
exports.AttributeController = AttributeController;
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({ summary: 'All data attribute' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, swagger_1.ApiResponse)({
        status: 200,
        isArray: true,
        description: 'Success',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AttributeController.prototype, "findAll", null);
exports.AttributeController = AttributeController = __decorate([
    (0, common_1.Controller)('attributes/all-data'),
    (0, swagger_1.ApiTags)('All data attributes'),
    __metadata("design:paramtypes", [typeof (_a = typeof attribute_service_1.AttributeService !== "undefined" && attribute_service_1.AttributeService) === "function" ? _a : Object])
], AttributeController);


/***/ }),
/* 315 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeBudgetRangeController = void 0;
const common_1 = __webpack_require__(28);
const swagger_1 = __webpack_require__(3);
const common_2 = __webpack_require__(1);
const base_controller_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(32);
const jwt_interface_1 = __webpack_require__(187);
const dto_1 = __webpack_require__(198);
const attribute_budget_range_service_1 = __webpack_require__(277);
let AttributeBudgetRangeController = class AttributeBudgetRangeController extends base_controller_1.BaseController {
    constructor(attributeBudgetRangeService) {
        super();
        this.attributeBudgetRangeService = attributeBudgetRangeService;
        this.logger = new common_1.Logger(this.constructor.name);
        this.model_name = common_2.ENUM_MODEL.ATTRIBUTE_BUDGET_RANGE;
    }
    async findAll(query, user) {
        this.logger.log(`******************** START_FUNCTION->findAll ********************`);
        const data = await this.attributeBudgetRangeService.findAll(query);
        return this.returnResponse(data, common_2.RESPONSE.GET);
    }
    async findById(id) {
        try {
            this.logger.log(`******************** START_FUNCTION->findById ********************`);
            const data = await this.attributeBudgetRangeService.findById(id);
            return this.returnResponse(data, common_2.RESPONSE.GET);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async create(body, user) {
        try {
            this.logger.log(`******************** START_FUNCTION->create ********************`);
            await this.createControllerByUser(body, user);
            const data = await this.attributeBudgetRangeService.create(body);
            return await this.returnResponse(data, common_2.RESPONSE.CREATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)(error);
        }
    }
    async update(id, body, user) {
        try {
            this.logger.log(`******************** START_FUNCTION->update ********************`);
            await this.updateControllerByUser(body, user);
            const data = await this.attributeBudgetRangeService.update(id, body);
            return this.returnResponse(data, common_2.RESPONSE.UPDATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async updateStatus(id, body, user) {
        try {
            this.logger.log(`******************** START_FUNCTION->updateStatus ********************`);
            await this.updateControllerByUser(body, user);
            const data = await this.attributeBudgetRangeService.updateStatus(id, body);
            return this.returnResponse(data, common_2.RESPONSE.UPDATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
};
exports.AttributeBudgetRangeController = AttributeBudgetRangeController;
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({ summary: 'Danh sách budget range' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, swagger_1.ApiResponse)({
        status: 200,
        isArray: true,
        description: 'Success',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof dto_1.FindAttributeBudgetRangeDTO !== "undefined" && dto_1.FindAttributeBudgetRangeDTO) === "function" ? _b : Object, typeof (_c = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AttributeBudgetRangeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Budget range detail' }),
    (0, swagger_1.ApiParam)({
        required: true,
        name: 'id',
        type: String,
        example: '5f7d28d11f992e1359a007f9',
        description: 'Id',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    __param(0, (0, common_1.Param)('id', new shared_1.ValidateObjectIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttributeBudgetRangeController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo budget range' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateAttributeBudgetRangeDTO !== "undefined" && dto_1.CreateAttributeBudgetRangeDTO) === "function" ? _d : Object, typeof (_e = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], AttributeBudgetRangeController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Chỉnh sửa budget range' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    __param(0, (0, common_1.Param)('id', new shared_1.ValidateObjectIdPipe())),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_f = typeof dto_1.UpdateAttributeBudgetRangeDTO !== "undefined" && dto_1.UpdateAttributeBudgetRangeDTO) === "function" ? _f : Object, typeof (_g = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], AttributeBudgetRangeController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('status/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Change status budget range' }),
    (0, swagger_1.ApiParam)({
        required: true,
        name: 'id',
        type: String,
        example: '5f7d28d11f992e1359a007f9',
        description: 'Id',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    __param(0, (0, common_1.Param)('id', new shared_1.ValidateObjectIdPipe())),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_h = typeof dto_1.UpdateStatusAttributeBudgetRangeDTO !== "undefined" && dto_1.UpdateStatusAttributeBudgetRangeDTO) === "function" ? _h : Object, Object]),
    __metadata("design:returntype", Promise)
], AttributeBudgetRangeController.prototype, "updateStatus", null);
exports.AttributeBudgetRangeController = AttributeBudgetRangeController = __decorate([
    (0, common_1.Controller)('attributes/budget-ranges'),
    (0, swagger_1.ApiTags)('Sponsor Budget Range'),
    __metadata("design:paramtypes", [typeof (_a = typeof attribute_budget_range_service_1.AttributeBudgetRangeService !== "undefined" && attribute_budget_range_service_1.AttributeBudgetRangeService) === "function" ? _a : Object])
], AttributeBudgetRangeController);


/***/ }),
/* 316 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeSponsorshipBenefitController = void 0;
const common_1 = __webpack_require__(28);
const swagger_1 = __webpack_require__(3);
const common_2 = __webpack_require__(1);
const base_controller_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(32);
const jwt_interface_1 = __webpack_require__(187);
const dto_1 = __webpack_require__(198);
const attribute_sponsorship_benefit_service_1 = __webpack_require__(294);
let AttributeSponsorshipBenefitController = class AttributeSponsorshipBenefitController extends base_controller_1.BaseController {
    constructor(attributeSponsorshipBenefitService) {
        super();
        this.attributeSponsorshipBenefitService = attributeSponsorshipBenefitService;
        this.logger = new common_1.Logger(this.constructor.name);
        this.model_name = common_2.ENUM_MODEL.ATTRIBUTE_SPONSORSHIP_BENEFIT;
    }
    async findAll(query, user) {
        this.logger.log(`******************** START_FUNCTION->findAll ********************`);
        const data = await this.attributeSponsorshipBenefitService.findAll(query);
        return this.returnResponse(data, common_2.RESPONSE.GET);
    }
    async findById(id) {
        try {
            this.logger.log(`******************** START_FUNCTION->findById ********************`);
            const data = await this.attributeSponsorshipBenefitService.findById(id);
            return this.returnResponse(data, common_2.RESPONSE.GET);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async create(body, user) {
        try {
            this.logger.log(`******************** START_FUNCTION->create ********************`);
            await this.createControllerByUser(body, user);
            const data = await this.attributeSponsorshipBenefitService.create(body);
            return this.returnResponse(data, common_2.RESPONSE.CREATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async update(id, body, user) {
        try {
            this.logger.log(`******************** START_FUNCTION->update ********************`);
            await this.updateControllerByUser(body, user);
            const data = await this.attributeSponsorshipBenefitService.update(id, body);
            return this.returnResponse(data, common_2.RESPONSE.UPDATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async updateStatus(id, body, user) {
        try {
            this.logger.log(`******************** START_FUNCTION->updateStatus ********************`);
            await this.updateControllerByUser(body, user);
            const data = await this.attributeSponsorshipBenefitService.updateStatus(id, body);
            return this.returnResponse(data, common_2.RESPONSE.UPDATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
};
exports.AttributeSponsorshipBenefitController = AttributeSponsorshipBenefitController;
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({ summary: 'Danh sách nhóm quyền lợi tài trợ' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, swagger_1.ApiResponse)({
        status: 200,
        isArray: true,
        description: 'Success',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof dto_1.FindAttributeSponsorshipBenefitDTO !== "undefined" && dto_1.FindAttributeSponsorshipBenefitDTO) === "function" ? _b : Object, typeof (_c = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AttributeSponsorshipBenefitController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Chi tiết nhóm quyền lợi tài trợ' }),
    (0, swagger_1.ApiParam)({
        required: true,
        name: 'id',
        type: String,
        example: '5f7d28d11f992e1359a007f9',
        description: 'Id',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    __param(0, (0, common_1.Param)('id', new shared_1.ValidateObjectIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttributeSponsorshipBenefitController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo nhóm quyền lợi tài trợ' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateAttributeSponsorshipBenefitDTO !== "undefined" && dto_1.CreateAttributeSponsorshipBenefitDTO) === "function" ? _d : Object, typeof (_e = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], AttributeSponsorshipBenefitController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Chỉnh sửa nhóm quyền lợi tài trợ' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    __param(0, (0, common_1.Param)('id', new shared_1.ValidateObjectIdPipe())),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_f = typeof dto_1.UpdateAttributeSponsorshipBenefitDTO !== "undefined" && dto_1.UpdateAttributeSponsorshipBenefitDTO) === "function" ? _f : Object, typeof (_g = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], AttributeSponsorshipBenefitController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('status/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Change status nhóm quyền lợi tài trợ' }),
    (0, swagger_1.ApiParam)({
        required: true,
        name: 'id',
        type: String,
        example: '5f7d28d11f992e1359a007f9',
        description: 'Id',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    __param(0, (0, common_1.Param)('id', new shared_1.ValidateObjectIdPipe())),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_h = typeof dto_1.UpdateStatusAttributeSponsorshipBenefitDTO !== "undefined" && dto_1.UpdateStatusAttributeSponsorshipBenefitDTO) === "function" ? _h : Object, Object]),
    __metadata("design:returntype", Promise)
], AttributeSponsorshipBenefitController.prototype, "updateStatus", null);
exports.AttributeSponsorshipBenefitController = AttributeSponsorshipBenefitController = __decorate([
    (0, common_1.Controller)('attributes/sponsorship-benefits'),
    (0, swagger_1.ApiTags)('Sponsor Sponsorship Benefit'),
    __metadata("design:paramtypes", [typeof (_a = typeof attribute_sponsorship_benefit_service_1.AttributeSponsorshipBenefitService !== "undefined" && attribute_sponsorship_benefit_service_1.AttributeSponsorshipBenefitService) === "function" ? _a : Object])
], AttributeSponsorshipBenefitController);


/***/ }),
/* 317 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeSponsorshipFormController = void 0;
const common_1 = __webpack_require__(28);
const swagger_1 = __webpack_require__(3);
const common_2 = __webpack_require__(1);
const base_controller_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(32);
const jwt_interface_1 = __webpack_require__(187);
const dto_1 = __webpack_require__(198);
const attribute_sponsorship_form_service_1 = __webpack_require__(293);
let AttributeSponsorshipFormController = class AttributeSponsorshipFormController extends base_controller_1.BaseController {
    constructor(attributeSponsorshipFormService) {
        super();
        this.attributeSponsorshipFormService = attributeSponsorshipFormService;
        this.logger = new common_1.Logger(this.constructor.name);
        this.model_name = common_2.ENUM_MODEL.ATTRIBUTE_SPONSORSHIP_FORM;
    }
    async findAll(query, user) {
        this.logger.log(`******************** START_FUNCTION->findAll ********************`);
        const data = await this.attributeSponsorshipFormService.findAll(query);
        return this.returnResponse(data, common_2.RESPONSE.GET);
    }
    async findById(id) {
        try {
            this.logger.log(`******************** START_FUNCTION->findById ********************`);
            const data = await this.attributeSponsorshipFormService.findById(id);
            return this.returnResponse(data, common_2.RESPONSE.GET);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async create(body, user) {
        try {
            this.logger.log(`******************** START_FUNCTION->create ********************`);
            await this.createControllerByUser(body, user);
            const data = await this.attributeSponsorshipFormService.create(body);
            return this.returnResponse(data, common_2.RESPONSE.CREATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async update(id, body, user) {
        try {
            this.logger.log(`******************** START_FUNCTION->update ********************`);
            await this.updateControllerByUser(body, user);
            const data = await this.attributeSponsorshipFormService.update(id, body);
            return this.returnResponse(data, common_2.RESPONSE.UPDATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async updateStatus(id, body, user) {
        try {
            this.logger.log(`******************** START_FUNCTION->updateStatus ********************`);
            await this.updateControllerByUser(body, user);
            const data = await this.attributeSponsorshipFormService.updateStatus(id, body);
            return this.returnResponse(data, common_2.RESPONSE.UPDATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
};
exports.AttributeSponsorshipFormController = AttributeSponsorshipFormController;
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({ summary: 'Danh sách gói tài trợ' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, swagger_1.ApiResponse)({
        status: 200,
        isArray: true,
        description: 'Success',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof dto_1.FindAttributeSponsorshipFormDTO !== "undefined" && dto_1.FindAttributeSponsorshipFormDTO) === "function" ? _b : Object, typeof (_c = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AttributeSponsorshipFormController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Gói tài trợ Detail' }),
    (0, swagger_1.ApiParam)({
        required: true,
        name: 'id',
        type: String,
        example: '5f7d28d11f992e1359a007f9',
        description: 'Id',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    __param(0, (0, common_1.Param)('id', new shared_1.ValidateObjectIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttributeSponsorshipFormController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo gói tài trợ' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateAttributeSponsorshipFormDTO !== "undefined" && dto_1.CreateAttributeSponsorshipFormDTO) === "function" ? _d : Object, typeof (_e = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], AttributeSponsorshipFormController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Chỉnh sửa gói tài trợ' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    __param(0, (0, common_1.Param)('id', new shared_1.ValidateObjectIdPipe())),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_f = typeof dto_1.UpdateAttributeSponsorshipFormDTO !== "undefined" && dto_1.UpdateAttributeSponsorshipFormDTO) === "function" ? _f : Object, typeof (_g = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], AttributeSponsorshipFormController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('status/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Change status gói tài trợ' }),
    (0, swagger_1.ApiParam)({
        required: true,
        name: 'id',
        type: String,
        example: '5f7d28d11f992e1359a007f9',
        description: 'Id',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    __param(0, (0, common_1.Param)('id', new shared_1.ValidateObjectIdPipe())),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_h = typeof dto_1.UpdateStatusAttributeSponsorshipFormDTO !== "undefined" && dto_1.UpdateStatusAttributeSponsorshipFormDTO) === "function" ? _h : Object, Object]),
    __metadata("design:returntype", Promise)
], AttributeSponsorshipFormController.prototype, "updateStatus", null);
exports.AttributeSponsorshipFormController = AttributeSponsorshipFormController = __decorate([
    (0, common_1.Controller)('attributes/sponsorship-forms'),
    (0, swagger_1.ApiTags)('Sponsor Sponsorship Form'),
    __metadata("design:paramtypes", [typeof (_a = typeof attribute_sponsorship_form_service_1.AttributeSponsorshipFormService !== "undefined" && attribute_sponsorship_form_service_1.AttributeSponsorshipFormService) === "function" ? _a : Object])
], AttributeSponsorshipFormController);


/***/ }),
/* 318 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SettingController = void 0;
const common_1 = __webpack_require__(28);
const swagger_1 = __webpack_require__(3);
const common_2 = __webpack_require__(1);
const shared_1 = __webpack_require__(32);
const jwt_interface_1 = __webpack_require__(187);
const setting_service_1 = __webpack_require__(281);
const dto_1 = __webpack_require__(319);
let SettingController = class SettingController extends common_2.BaseController {
    constructor(settingService) {
        super();
        this.settingService = settingService;
        this.model_name = common_2.ENUM_MODEL.SETTING;
    }
    async findAll(query, user) {
        this.logger.log(`******************** START_FUNCTION->findAll ********************`);
        const data = await this.settingService.findAll(query);
        return this.returnResponse(data, common_2.RESPONSE.GET);
    }
    async findById(id) {
        try {
            this.logger.log(`******************** START_FUNCTION->findById ********************`);
            const data = await this.settingService.findById(id);
            return this.returnResponse(data, common_2.RESPONSE.GET);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async create(body, user) {
        try {
            this.logger.log(`******************** START_FUNCTION->create ********************`);
            await this.createControllerByUser(body, user);
            const data = await this.settingService.create(body);
            return this.returnResponse(data, common_2.RESPONSE.CREATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async update(id, body, user) {
        try {
            this.logger.log(`******************** START_FUNCTION->update ********************`);
            await this.updateControllerByUser(body, user);
            const data = await this.settingService.update(id, body);
            return this.returnResponse(data, common_2.RESPONSE.UPDATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async updateStatus(id, body, user) {
        try {
            this.logger.log(`******************** START_FUNCTION->updateStatus ********************`);
            await this.updateControllerByUser(body, user);
            const data = await this.settingService.updateStatus(id, body);
            return this.returnResponse(data, common_2.RESPONSE.UPDATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
};
exports.SettingController = SettingController;
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({ summary: 'List setting' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, swagger_1.ApiResponse)({
        status: 200,
        isArray: true,
        description: 'Success',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof dto_1.FindSettingDTO !== "undefined" && dto_1.FindSettingDTO) === "function" ? _b : Object, typeof (_c = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Setting Detail' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.CREATE_ACCOUNT]),
    __param(0, (0, common_1.Param)('id', new shared_1.ValidateObjectIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiOperation)({ summary: 'Create setting' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateSettingDTO !== "undefined" && dto_1.CreateSettingDTO) === "function" ? _d : Object, typeof (_e = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update setting' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    __param(0, (0, common_1.Param)('id', new shared_1.ValidateObjectIdPipe())),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_f = typeof dto_1.UpdateSettingDTO !== "undefined" && dto_1.UpdateSettingDTO) === "function" ? _f : Object, typeof (_g = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('status/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Change status setting' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    __param(0, (0, common_1.Param)('id', new shared_1.ValidateObjectIdPipe())),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_h = typeof dto_1.UpdateStatusSettingDTO !== "undefined" && dto_1.UpdateStatusSettingDTO) === "function" ? _h : Object, Object]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "updateStatus", null);
exports.SettingController = SettingController = __decorate([
    (0, common_1.Controller)('settings'),
    (0, swagger_1.ApiTags)('Cấu hình chung'),
    __metadata("design:paramtypes", [typeof (_a = typeof setting_service_1.SettingService !== "undefined" && setting_service_1.SettingService) === "function" ? _a : Object])
], SettingController);


/***/ }),
/* 319 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(320), exports);
__exportStar(__webpack_require__(321), exports);
__exportStar(__webpack_require__(322), exports);
__exportStar(__webpack_require__(323), exports);


/***/ }),
/* 320 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSettingDTO = void 0;
const common_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(3);
const class_validator_1 = __webpack_require__(7);
class CreateSettingDTO extends common_1.BaseCreateDTO {
}
exports.CreateSettingDTO = CreateSettingDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'name of setting',
        example: 'config mail',
    }),
    __metadata("design:type", String)
], CreateSettingDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'name of setting',
        example: 'MAIL_CONFIG',
    }),
    __metadata("design:type", String)
], CreateSettingDTO.prototype, "key", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'type of setting',
        example: 'OBJECT',
    }),
    __metadata("design:type", String)
], CreateSettingDTO.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        description: 'description of setting',
        example: 'description',
    }),
    __metadata("design:type", String)
], CreateSettingDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        description: 'Value of setting',
        example: 'description',
    }),
    __metadata("design:type", String)
], CreateSettingDTO.prototype, "value", void 0);


/***/ }),
/* 321 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FindSettingDTO = void 0;
const common_1 = __webpack_require__(1);
class FindSettingDTO extends common_1.BaseQueryFilterDTO {
}
exports.FindSettingDTO = FindSettingDTO;


/***/ }),
/* 322 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateStatusSettingDTO = void 0;
const common_1 = __webpack_require__(1);
class UpdateStatusSettingDTO extends common_1.BaseUpdateStatusDTO {
}
exports.UpdateStatusSettingDTO = UpdateStatusSettingDTO;


/***/ }),
/* 323 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateSettingDTO = void 0;
const class_validator_1 = __webpack_require__(7);
const swagger_1 = __webpack_require__(3);
const common_1 = __webpack_require__(1);
class UpdateSettingDTO extends common_1.BaseUpdateDTO {
}
exports.UpdateSettingDTO = UpdateSettingDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'name of setting',
        example: 'config mail',
    }),
    __metadata("design:type", String)
], UpdateSettingDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'name of setting',
        example: 'MAIL_CONFIG',
    }),
    __metadata("design:type", String)
], UpdateSettingDTO.prototype, "key", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        description: 'description of setting',
        example: 'description',
    }),
    __metadata("design:type", String)
], UpdateSettingDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        description: 'Value of setting',
        example: 'description',
    }),
    __metadata("design:type", String)
], UpdateSettingDTO.prototype, "value", void 0);


/***/ }),
/* 324 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeCastProfessionController = void 0;
const common_1 = __webpack_require__(28);
const swagger_1 = __webpack_require__(3);
const common_2 = __webpack_require__(1);
const base_controller_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(32);
const jwt_interface_1 = __webpack_require__(187);
const dto_1 = __webpack_require__(198);
const attribute_cast_profession_service_1 = __webpack_require__(296);
let AttributeCastProfessionController = class AttributeCastProfessionController extends base_controller_1.BaseController {
    constructor(attributeCastProfessionService) {
        super();
        this.attributeCastProfessionService = attributeCastProfessionService;
        this.logger = new common_1.Logger(this.constructor.name);
        this.model_name = common_2.ENUM_MODEL.ATTRIBUTE_CAST_PROFESSION;
    }
    async findAll(query, user) {
        this.logger.log(`******************** START_FUNCTION->findAll ********************`);
        const data = await this.attributeCastProfessionService.findAll(query);
        return this.returnResponse(data, common_2.RESPONSE.GET);
    }
    async findById(id) {
        try {
            this.logger.log(`******************** START_FUNCTION->findById ********************`);
            const data = await this.attributeCastProfessionService.findById(id);
            return this.returnResponse(data, common_2.RESPONSE.GET);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async create(body, user) {
        try {
            this.logger.log(`******************** START_FUNCTION->create ********************`);
            await this.createControllerByUser(body, user);
            const data = await this.attributeCastProfessionService.create(body);
            return this.returnResponse(data, common_2.RESPONSE.CREATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async update(id, body, user) {
        try {
            this.logger.log(`******************** START_FUNCTION->update ********************`);
            await this.updateControllerByUser(body, user);
            const data = await this.attributeCastProfessionService.update(id, body);
            return this.returnResponse(data, common_2.RESPONSE.UPDATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
    async updateStatus(id, body, user) {
        try {
            this.logger.log(`******************** START_FUNCTION->updateStatus ********************`);
            await this.updateControllerByUser(body, user);
            const data = await this.attributeCastProfessionService.updateStatus(id, body);
            return this.returnResponse(data, common_2.RESPONSE.UPDATE);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            (0, shared_1.throwErrorMessage)();
        }
    }
};
exports.AttributeCastProfessionController = AttributeCastProfessionController;
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({ summary: 'List cast profession' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, swagger_1.ApiResponse)({
        status: 200,
        isArray: true,
        description: 'Success',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof dto_1.FindAttributeCastProfessionDTO !== "undefined" && dto_1.FindAttributeCastProfessionDTO) === "function" ? _b : Object, typeof (_c = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AttributeCastProfessionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Cast profession Detail' }),
    (0, swagger_1.ApiParam)({
        required: true,
        name: 'id',
        type: String,
        example: '5f7d28d11f992e1359a007f9',
        description: 'Id',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    __param(0, (0, common_1.Param)('id', new shared_1.ValidateObjectIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttributeCastProfessionController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiOperation)({ summary: 'Create cast profession' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateAttributeCastProfessionDTO !== "undefined" && dto_1.CreateAttributeCastProfessionDTO) === "function" ? _d : Object, typeof (_e = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], AttributeCastProfessionController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update cast profession' }),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    __param(0, (0, common_1.Param)('id', new shared_1.ValidateObjectIdPipe())),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_f = typeof dto_1.UpdateAttributeCastProfessionDTO !== "undefined" && dto_1.UpdateAttributeCastProfessionDTO) === "function" ? _f : Object, typeof (_g = typeof jwt_interface_1.IAccessTokenPayload !== "undefined" && jwt_interface_1.IAccessTokenPayload) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], AttributeCastProfessionController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('status/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Change status cast profession' }),
    (0, swagger_1.ApiParam)({
        required: true,
        name: 'id',
        type: String,
        example: '5f7d28d11f992e1359a007f9',
        description: 'Id',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    (0, shared_1.Roles)(common_2.ACCOUNT_TYPE.ADMIN),
    (0, shared_1.RequirePermission)([common_2.PERMISSION.APPROVE_SPONSOR]),
    __param(0, (0, common_1.Param)('id', new shared_1.ValidateObjectIdPipe())),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, shared_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_h = typeof dto_1.UpdateStatusAttributeCastProfessionDTO !== "undefined" && dto_1.UpdateStatusAttributeCastProfessionDTO) === "function" ? _h : Object, Object]),
    __metadata("design:returntype", Promise)
], AttributeCastProfessionController.prototype, "updateStatus", null);
exports.AttributeCastProfessionController = AttributeCastProfessionController = __decorate([
    (0, common_1.Controller)('attributes/cast-professions'),
    (0, swagger_1.ApiTags)('Sponsor Cast Profession'),
    __metadata("design:paramtypes", [typeof (_a = typeof attribute_cast_profession_service_1.AttributeCastProfessionService !== "undefined" && attribute_cast_profession_service_1.AttributeCastProfessionService) === "function" ? _a : Object])
], AttributeCastProfessionController);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const functions_1 = __webpack_require__(131);
const config_1 = __webpack_require__(36);
const core_1 = __webpack_require__(67);
const swagger_1 = __webpack_require__(3);
const compression = __webpack_require__(151);
const express_1 = __webpack_require__(152);
const mongoose = __webpack_require__(52);
const app_module_1 = __webpack_require__(153);
const common_2 = __webpack_require__(28);
const enviroment_enum_1 = __webpack_require__(16);
global[common_1.ENUM_GLOBAL_VARIABLE.resource_system_name] =
    common_1.ENUM_RESOURCE_SYSTEM.ADMIN_WEB;
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule, {});
        app.use((0, express_1.json)({ limit: '50mb' }));
        app.use((0, express_1.urlencoded)({ limit: '50mb', extended: true }));
        app.enableCors();
        app.enableVersioning({
            type: common_2.VersioningType.URI,
            defaultVersion: enviroment_enum_1.ENUM_VERSION.V1,
        });
        app.use(compression());
        const configService = app.get(config_1.ConfigService);
        const logger = ['log', 'error', 'verbose', 'warn'];
        if (functions_1.Common.valueToBoolean(configService.get(common_1.ENVIROMENT_VARIABLE.IS_DEBUG))) {
            logger.push('debug');
            mongoose.set('debug', true);
        }
        app.useLogger(logger);
        const options = new swagger_1.DocumentBuilder()
            .setTitle('Sponsor API Admin')
            .setDescription('The Sponsor API description')
            .setVersion('1.0')
            .addTag('Auth')
            .addBearerAuth({
            description: `Please enter token in following format: <JWT>`,
            name: 'Authorization',
            bearerFormat: 'Bearer',
            scheme: 'Bearer',
            type: 'http',
            in: 'Header',
        }, 'Authorization')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, options);
        swagger_1.SwaggerModule.setup('api', app, document, {
            swaggerOptions: { persistAuthorization: true },
        });
        await app.startAllMicroservices();
        const server = await app.listen(configService.get(common_1.ENVIROMENT_VARIABLE.ADMIN_API_PORT), '0.0.0.0');
        server.setTimeout(Number(configService.get(common_1.ENVIROMENT_VARIABLE.SERVER_REQUEST_TIMEMOUT)) ??
            2000000);
        console.log(`Environment: ${configService.get(common_1.ENVIROMENT_VARIABLE.ENVIRONMENT)}`);
        console.log(`Application is running on port: ${server.address().port}`);
        console.log(`ADMIN URL: ${await app.getUrl()}`);
    }
    catch (error) {
        console.log(error);
    }
}
bootstrap();

})();

/******/ })()
;