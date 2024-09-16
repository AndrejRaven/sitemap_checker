"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/fetch-sitemap";
exports.ids = ["pages/api/fetch-sitemap"];
exports.modules = {

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "(api)/./pages/api/fetch-sitemap.ts":
/*!************************************!*\
  !*** ./pages/api/fetch-sitemap.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n\nasync function handler(req, res) {\n    const { url  } = req.query;\n    if (!url || typeof url !== \"string\") {\n        return res.status(400).json({\n            error: \"URL is required\"\n        });\n    }\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(url);\n        res.status(200).send(response.data);\n    } catch (error) {\n        console.error(\"Error fetching sitemap:\", error);\n        res.status(500).json({\n            error: \"Failed to fetch sitemap\"\n        });\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvZmV0Y2gtc2l0ZW1hcC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFDMEI7QUFFWCxlQUFlQyxPQUFPLENBQUNDLEdBQW1CLEVBQUVDLEdBQW9CLEVBQUU7SUFDL0UsTUFBTSxFQUFFQyxHQUFHLEdBQUUsR0FBR0YsR0FBRyxDQUFDRyxLQUFLO0lBRXpCLElBQUksQ0FBQ0QsR0FBRyxJQUFJLE9BQU9BLEdBQUcsS0FBSyxRQUFRLEVBQUU7UUFDbkMsT0FBT0QsR0FBRyxDQUFDRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztZQUFFQyxLQUFLLEVBQUUsaUJBQWlCO1NBQUUsQ0FBQyxDQUFDO0tBQzNEO0lBRUQsSUFBSTtRQUNGLE1BQU1DLFFBQVEsR0FBRyxNQUFNVCxnREFBUyxDQUFDSSxHQUFHLENBQUM7UUFDckNELEdBQUcsQ0FBQ0csTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDSyxJQUFJLENBQUNGLFFBQVEsQ0FBQ0csSUFBSSxDQUFDLENBQUM7S0FDckMsQ0FBQyxPQUFPSixLQUFLLEVBQUU7UUFDZEssT0FBTyxDQUFDTCxLQUFLLENBQUMseUJBQXlCLEVBQUVBLEtBQUssQ0FBQyxDQUFDO1FBQ2hETCxHQUFHLENBQUNHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO1lBQUVDLEtBQUssRUFBRSx5QkFBeUI7U0FBRSxDQUFDLENBQUM7S0FDNUQ7Q0FDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3NpdGVtYXAtY2hlY2tlci8uL3BhZ2VzL2FwaS9mZXRjaC1zaXRlbWFwLnRzP2Y4YmUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSAnbmV4dCc7XHJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcTogTmV4dEFwaVJlcXVlc3QsIHJlczogTmV4dEFwaVJlc3BvbnNlKSB7XHJcbiAgY29uc3QgeyB1cmwgfSA9IHJlcS5xdWVyeTtcclxuXHJcbiAgaWYgKCF1cmwgfHwgdHlwZW9mIHVybCAhPT0gJ3N0cmluZycpIHtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnVVJMIGlzIHJlcXVpcmVkJyB9KTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldCh1cmwpO1xyXG4gICAgcmVzLnN0YXR1cygyMDApLnNlbmQocmVzcG9uc2UuZGF0YSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHNpdGVtYXA6JywgZXJyb3IpO1xyXG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ0ZhaWxlZCB0byBmZXRjaCBzaXRlbWFwJyB9KTtcclxuICB9XHJcbn0iXSwibmFtZXMiOlsiYXhpb3MiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwidXJsIiwicXVlcnkiLCJzdGF0dXMiLCJqc29uIiwiZXJyb3IiLCJyZXNwb25zZSIsImdldCIsInNlbmQiLCJkYXRhIiwiY29uc29sZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/fetch-sitemap.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/fetch-sitemap.ts"));
module.exports = __webpack_exports__;

})();