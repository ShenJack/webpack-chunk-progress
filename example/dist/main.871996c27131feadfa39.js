/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		1: 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({"0":"app","2":"npm.react","3":"npm.react-dom","4":"npm.scheduler","5":"npm.webpack"}[chunkId]||chunkId) + "." + {"0":"9b21dad26991c6548280","2":"d0d709cbfb55678bc072","3":"bc3fcbd0c2ef1c071700","4":"fc3a00ae82c142b5fe4c","5":"771dce9ac8078617649f"}[chunkId] + ".chunk.js"
/******/ 	}
/******/ 	
/******/ 	    // chunk-progress-webpack-plugin add-progress-vars start
/******/ 	    const progress = {
/******/ 	        totalSize: 0,
/******/ 	        activeLoadCount: 0,
/******/ 	        activeLoads: {},
/******/ 	        __chunk_size_map__: {},
/******/ 	    };
/******/ 	    // chunk-progress-webpack-plugin add-progress-vars end
/******/
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/ 		
/******/ 		    // chunk-progress-webpack-plugin replace-require-ensure start
/******/ 		    let installedChunkData = installedChunks[chunkId];
/******/ 		    if (installedChunkData !== 0) {
/******/ 		        // 0 means "already installed".
/******/ 		        if (installedChunkData) {
/******/ 		            promises.push(installedChunkData[2]);
/******/ 		        } else {
/******/ 		            // setup Promise in chunk cache
/******/ 		            const promise = new Promise((resolve, reject) => {
/******/ 		                installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		            });
/******/ 		
/******/ 		            // eslint-disable-next-line no-undef
/******/ 		            const url = jsonpScriptSrc(chunkId);
/******/ 		            progress.activeLoads[url] = 0;
/******/ 		            progress.activeLoadCount += 1;
/******/ 		            promises.push((installedChunkData[2] = promise));
/******/ 		
/******/ 		            const timeout = setTimeout(() => {
/******/ 		                onScriptComplete({
/******/ 		                    type: "timeout",
/******/ 		                    target: script,
/******/ 		                });
/******/ 		            }, 120000);
/******/ 		
/******/ 		            new Promise((resolve, reject) => {
/******/ 		                const xhr = new XMLHttpRequest();
/******/ 		                xhr.open("GET", url);
/******/ 		                xhr.onload = resolve;
/******/ 		                xhr.onerror = reject;
/******/ 		                xhr.onprogress = function (progressEvent) {
/******/ 		                    const loaded = Object.values(progress.activeLoads).reduce(
/******/ 		                        (sum, num) => num + sum,
/******/ 		                    );
/******/ 		                    progress.activeLoads[url] = progressEvent.loaded;
/******/ 		                    document.dispatchEvent(
/******/ 		                        new CustomEvent("webpack-chunk-progress", {
/******/ 		                            detail: {
/******/ 		                                originalEvent: progressEvent,
/******/ 		                                loaded,
/******/ 		                                total: progress.totalSize,
/******/ 		                                resource: {
/******/ 		                                    url,
/******/ 		                                    loaded: progressEvent.loaded,
/******/ 		                                    lengthComputable: progressEvent.lengthComputable,
/******/ 		                                    total: progressEvent.total,
/******/ 		                                },
/******/ 		                            },
/******/ 		                        }),
/******/ 		                    );
/******/ 		                };
/******/ 		                xhr.send();
/******/ 		            })
/******/ 		                .then(event => {
/******/ 		                    return event.target.responseText;
/******/ 		                })
/******/ 		                .then(js => {
/******/ 		                    const head = document.getElementsByTagName("head")[0];
/******/ 		                    const script = document.createElement("script");
/******/ 		                    script.textContent = js;
/******/ 		                    head.appendChild(script);
/******/ 		                })
/******/ 		                .then(() => {
/******/ 		                    onScriptComplete();
/******/ 		                })
/******/ 		                .catch(error => {
/******/ 		                    onScriptComplete(error);
/******/ 		                });
/******/ 		
/******/ 		            function onScriptComplete(event) {
/******/ 		                progress.activeLoadCount -= 1;
/******/ 		                if (progress.activeLoadCount <= 0) {
/******/ 		                    progress.totalSize = 0;
/******/ 		                    progress.activeLoadCount = 0;
/******/ 		                    progress.activeLoads = {};
/******/ 		                }
/******/ 		                clearTimeout(timeout);
/******/ 		                const chunk = installedChunks[chunkId];
/******/ 		                if (chunk !== 0) {
/******/ 		                    if (chunk) {
/******/ 		                        const errorType =
/******/ 		                            event && (event.type === "load" ? "missing" : event.type);
/******/ 		                        const realSrc = event && event.target && event.target.src;
/******/ 		                        const error = new Error(
/******/ 		                            `Loading chunk ${chunkId} failed.\n(${errorType}: ${realSrc})`,
/******/ 		                        );
/******/ 		                        error.type = errorType;
/******/ 		                        error.request = realSrc;
/******/ 		                        chunk[1](error);
/******/ 		                    }
/******/ 		                    installedChunks[chunkId] = undefined;
/******/ 		                }
/******/ 		            }
/******/ 		        }
/******/ 		    }
/******/ 		    // chunk-progress-webpack-plugin replace-require-ensure end
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./lib/helper.js
function load(loader, webpackChunkName, onProgress) {
  listenerMap.set(webpackChunkName, {
    onProgress: onProgress,
    loaded: 0,
    total: 1,
    chunks: [],
    chunksMap: {}
  });

  if (listenerMap.size > 0) {
    document.addEventListener("webpack-chunk-progress", function (event) {
      var resource = event.detail.resource;
      var chunkName = extractChunkName(resource.url);
      var listener = listenerMap.get(chunkName);

      if (listener == null) {
        return;
      }

      listener.chunksMap[resource.url] = {
        url: resource.url,
        loaded: resource.loaded,
        total: resource.total
      };
      var chunkInList = listener.chunks.find(function (item) {
        return item && item.url === resource.url;
      });

      if (chunkInList) {
        chunkInList.loaded = resource.loaded;
      } else {
        listener.chunks.push(resource);
      }

      var progress;
      console.log(resource);

      if (!window.hasOwnProperty(__chunk_size_map__)) {
        var loaded = resource.loaded;
        var total = resource.total;
        progress = loaded / total;
      } else {
        //chrome不能推算出资源的总计大小，只能使用load表示加载完的部分资源解压后的大小
        if (resource.total === 0 || !resource.lengthComputable) {
          var _total = window.__chunk_size_map__[resource.url];
          var _loaded = resource.loaded;
          progress = _loaded / _total;
        } else {
          //firefox 中， event的loaded是已加载部分的gzip之后的大小，total是gzip总计的大小
          var _total2 = window.__chunk_size_map__[resource.url + '.gz'];
          var _loaded2 = resource.loaded;
          progress = _loaded2 / _total2;
        }
      }

      listener.onProgress(progress);

      if (progress >= 1) {
        listenerMap["delete"](webpackChunkName);
      }
    });
  }

  return new Promise(function (resolve, reject) {
    loader().then(function (res) {
      resolve(res);
    })["catch"](function (error) {
      reject(error);
    });
  });
}
var listenerMap = new Map();

function extractChunkName(str) {
  return str.replace("vendors~", "").split(".")[0];
}
// CONCATENATED MODULE: ./example/index.js


function onAppProgress(progress) {
  console.log(progress);
  document.getElementById('react-app').innerText = Math.round(progress * 100) + '%';
}

window.loadApp = function () {
  load(function () {
    return Promise.all(/* import() | app */[__webpack_require__.e(3), __webpack_require__.e(2), __webpack_require__.e(4), __webpack_require__.e(5), __webpack_require__.e(0)]).then(__webpack_require__.bind(null, 11));
  }, 'app', onAppProgress).then(function (app) {
    app["default"]();
  });
};

/***/ })
/******/ ]);