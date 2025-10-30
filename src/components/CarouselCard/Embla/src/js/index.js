"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var client_1 = __importDefault(require("react-dom/client"));
var EmblaCarousel_1 = __importDefault(require("./EmblaCarousel"));
require("../css/base.css");
require("../css/sandbox.css");
require("../css/embla.css");
var OPTIONS = { axis: 'y' };
var SLIDE_COUNT = 5;
var SLIDES = Array.from(Array(SLIDE_COUNT).keys());
var App = function () { return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(EmblaCarousel_1.default, { slides: SLIDES, options: OPTIONS }) })); };
client_1.default.createRoot(document.getElementById('root')).render((0, jsx_runtime_1.jsx)(react_1.default.StrictMode, { children: (0, jsx_runtime_1.jsx)(App, {}) }));
