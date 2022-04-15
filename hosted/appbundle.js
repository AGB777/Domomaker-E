/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

const handleError = message => {
  document.getElementById('errorMessage').textContent = message;
  document.getElementById('domoMessage').classList.remove('hidden');
};

const hideError = () => {
  document.getElementById('domoMessage').classList.add('hidden');
};

const sendPost = async (url, data, handler) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  document.getElementById('domoMessage').classList.add('hidden');

  if (result.redirect) {
    window.location = result.redirect;
  }

  if (result.error) {
    handleError(result.error);
  }

  if (handler) {
    handler(result);
  }
};

module.exports = {
  handleError,
  hideError,
  sendPost
};

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const helper = __webpack_require__(1);

const handleDomo = e => {
  e.preventDefault();
  helper.hideError();
  const name = e.target.querySelector('#domoName').value;
  const age = e.target.querySelector('#domoAge').value;
  const _csrf = e.target.querySelector('#_csrf').value;

  if (!name || !age) {
    helper.handleError('All fields are required!');
    return false;
  }

  helper.sendPost(e.target.action, {
    name,
    age,
    _csrf
  }, loadDomosFromServer);
  return false;
};

const DomoForm = props => {
  return /*#__PURE__*/React.createElement("form", {
    id: "domoForm",
    onSubmit: handleDomo,
    name: "domoForm",
    action: "/maker",
    method: "POST",
    className: "domoForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "name"
  }, "Name"), /*#__PURE__*/React.createElement("input", {
    id: "domoName",
    type: "text",
    name: "name",
    placeholder: "Name Your Domo!"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "age"
  }, "Age"), /*#__PURE__*/React.createElement("input", {
    id: "domoAge",
    type: "number",
    name: "age",
    placeholder: "Age Your Domo!"
  }), /*#__PURE__*/React.createElement("input", {
    id: "_csrf",
    type: "hidden",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makeDomoSubmit",
    type: "submit",
    value: "Make Your Domo!"
  }));
};

const DomoList = props => {
  if (props.domos.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "domoList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyDomo"
    }, "No Domos Yet!"));
  }

  const domoNodes = props.domos.map(domo => {
    return /*#__PURE__*/React.createElement("div", {
      key: domo._id,
      className: "domo"
    }, /*#__PURE__*/React.createElement("img", {
      src: "/assets/img/domoface.jpeg",
      alt: "domo face",
      className: "domoFace"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "domoName"
    }, "Name: ", domo.name, " "), /*#__PURE__*/React.createElement("h3", {
      className: "domoAge"
    }, "Age: ", domo.age, " "));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "domoList"
  }, domoNodes);
};

const loadDomosFromServer = async () => {
  const response = await fetch('/getDomos');
  const data = await response.json();
  ReactDOM.render( /*#__PURE__*/React.createElement(DomoList, {
    domos: data.domos
  }), document.querySelector('#domos'));
};

const init = async () => {
  const response = await fetch('/getToken');
  const data = await response.json();
  ReactDOM.render( /*#__PURE__*/React.createElement(DomoForm, {
    csrf: data.csrfToken
  }), document.querySelector('#makeDomo'));
  ReactDOM.render( /*#__PURE__*/React.createElement(DomoList, {
    domos: []
  }), document.querySelector('#domos'));
  loadDomosFromServer();
};

window.onload = init;
})();

/******/ })()
;