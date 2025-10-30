"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextButton = exports.PrevButton = exports.usePrevNextButtons = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var usePrevNextButtons = function (emblaApi, onButtonClick) {
    var _a = (0, react_1.useState)(true), prevBtnDisabled = _a[0], setPrevBtnDisabled = _a[1];
    var _b = (0, react_1.useState)(true), nextBtnDisabled = _b[0], setNextBtnDisabled = _b[1];
    var onPrevButtonClick = (0, react_1.useCallback)(function () {
        if (!emblaApi)
            return;
        emblaApi.scrollPrev();
        if (onButtonClick)
            onButtonClick(emblaApi);
    }, [emblaApi, onButtonClick]);
    var onNextButtonClick = (0, react_1.useCallback)(function () {
        if (!emblaApi)
            return;
        emblaApi.scrollNext();
        if (onButtonClick)
            onButtonClick(emblaApi);
    }, [emblaApi, onButtonClick]);
    var onSelect = (0, react_1.useCallback)(function (emblaApi) {
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, []);
    (0, react_1.useEffect)(function () {
        if (!emblaApi)
            return;
        onSelect(emblaApi);
        emblaApi.on('reInit', onSelect).on('select', onSelect);
    }, [emblaApi, onSelect]);
    return {
        prevBtnDisabled: prevBtnDisabled,
        nextBtnDisabled: nextBtnDisabled,
        onPrevButtonClick: onPrevButtonClick,
        onNextButtonClick: onNextButtonClick
    };
};
exports.usePrevNextButtons = usePrevNextButtons;
var PrevButton = function (props) {
    var children = props.children, restProps = __rest(props, ["children"]);
    return ((0, jsx_runtime_1.jsxs)("button", __assign({ className: "embla__button embla__button--prev", type: "button" }, restProps, { children: [(0, jsx_runtime_1.jsx)("svg", { className: "embla__button__svg", viewBox: "0 0 532 532", children: (0, jsx_runtime_1.jsx)("path", { fill: "currentColor", d: "M520.646 355.66c13.805 13.793 13.805 36.208 0 50.001-13.804 13.785-36.238 13.785-50.034 0L266 201.22 61.391 405.66c-13.805 13.785-36.239 13.785-50.044 0-13.796-13.793-13.796-36.208 0-50.002 22.947-22.928 206.507-206.395 229.454-229.332a35.065 35.065 0 0 1 25.126-10.326c9.2 0 18.26 3.393 25.2 10.326 45.901 45.865 206.564 206.404 229.52 229.332Z" }) }), children] })));
};
exports.PrevButton = PrevButton;
var NextButton = function (props) {
    var children = props.children, restProps = __rest(props, ["children"]);
    return ((0, jsx_runtime_1.jsxs)("button", __assign({ className: "embla__button embla__button--next", type: "button" }, restProps, { children: [(0, jsx_runtime_1.jsx)("svg", { className: "embla__button__svg", viewBox: "0 0 532 532", children: (0, jsx_runtime_1.jsx)("path", { fill: "currentColor", d: "M11.354 176.34c-13.805-13.793-13.805-36.208 0-50.001 13.804-13.785 36.238-13.785 50.034 0L266 330.78l204.61-204.442c13.805-13.785 36.239-13.785 50.044 0 13.796 13.793 13.796 36.208 0 50.002a5994246.277 5994246.277 0 0 0-229.454 229.332 35.065 35.065 0 0 1-25.126 10.326c-9.2 0-18.26-3.393-25.2-10.326C194.973 359.808 34.31 199.269 11.354 176.34Z" }) }), children] })));
};
exports.NextButton = NextButton;
