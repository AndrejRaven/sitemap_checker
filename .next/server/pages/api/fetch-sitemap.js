"use strict";
(() => {
var exports = {};
exports.id = 589;
exports.ids = [589];
exports.modules = {

/***/ 775:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

;// CONCATENATED MODULE: external "axios"
const external_axios_namespaceObject = require("axios");
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_namespaceObject);
;// CONCATENATED MODULE: ./pages/api/fetch-sitemap.ts

async function handler(req, res) {
    const { url  } = req.query;
    if (typeof url !== "string") {
        return res.status(400).json({
            error: "Invalid URL"
        });
    }
    try {
        const response = await external_axios_default().get(url);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch sitemap"
        });
    }
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(775));
module.exports = __webpack_exports__;

})();