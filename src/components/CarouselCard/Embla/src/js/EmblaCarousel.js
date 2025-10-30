"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var EmblaCarouselDotButton_1 = require("./EmblaCarouselDotButton");
var EmblaCarouselArrowButtons_1 = require("./EmblaCarouselArrowButtons");
var embla_carousel_autoplay_1 = __importDefault(require("embla-carousel-autoplay"));
var embla_carousel_react_1 = __importDefault(require("embla-carousel-react"));
var EmblaCarousel = function (props) {
    var slides = props.slides, options = props.options;
    var _a = (0, embla_carousel_react_1.default)(options, [(0, embla_carousel_autoplay_1.default)()]), emblaRef = _a[0], emblaApi = _a[1];
    var onNavButtonClick = (0, react_1.useCallback)(function (emblaApi) {
        var _a;
        var autoplay = (_a = emblaApi === null || emblaApi === void 0 ? void 0 : emblaApi.plugins()) === null || _a === void 0 ? void 0 : _a.autoplay;
        if (!autoplay)
            return;
        var resetOrStop = autoplay.options.stopOnInteraction === false
            ? autoplay.reset
            : autoplay.stop;
        resetOrStop();
    }, []);
    var _b = (0, EmblaCarouselDotButton_1.useDotButton)(emblaApi, onNavButtonClick), selectedIndex = _b.selectedIndex, scrollSnaps = _b.scrollSnaps, onDotButtonClick = _b.onDotButtonClick;
    var _c = (0, EmblaCarouselArrowButtons_1.usePrevNextButtons)(emblaApi, onNavButtonClick), prevBtnDisabled = _c.prevBtnDisabled, nextBtnDisabled = _c.nextBtnDisabled, onPrevButtonClick = _c.onPrevButtonClick, onNextButtonClick = _c.onNextButtonClick;
    return ((0, jsx_runtime_1.jsxs)("section", { className: "embla", children: [(0, jsx_runtime_1.jsx)("div", { className: "embla__viewport", ref: emblaRef, children: (0, jsx_runtime_1.jsx)("div", { className: "embla__container", children: slides.map(function (index) { return ((0, jsx_runtime_1.jsx)("div", { className: "embla__slide", children: (0, jsx_runtime_1.jsx)("div", { className: "embla__slide__number", children: index + 1 }) }, index)); }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "embla__controls", children: [(0, jsx_runtime_1.jsxs)("div", { className: "embla__buttons", children: [(0, jsx_runtime_1.jsx)(EmblaCarouselArrowButtons_1.PrevButton, { onClick: onPrevButtonClick, disabled: prevBtnDisabled }), (0, jsx_runtime_1.jsx)(EmblaCarouselArrowButtons_1.NextButton, { onClick: onNextButtonClick, disabled: nextBtnDisabled })] }), (0, jsx_runtime_1.jsx)("div", { className: "embla__dots", children: scrollSnaps.map(function (_, index) { return ((0, jsx_runtime_1.jsx)(EmblaCarouselDotButton_1.DotButton, { onClick: function () { return onDotButtonClick(index); }, className: 'embla__dot'.concat(index === selectedIndex ? ' embla__dot--selected' : '') }, index)); }) })] })] }));
};
exports.default = EmblaCarousel;
