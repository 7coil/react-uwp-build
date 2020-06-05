import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
    /**
     * Set the Slider display mode.
     */
    displayMode?: "vertical" | "horizon";
    /**
     * Set the Slider minValue.
     */
    minValue?: number;
    /**
     * Set the Slider maxValue.
     */
    maxValue?: number;
    /**
     * Set the Slider initValue.
     */
    initValue?: number;
    /**
     * Set `value.toFixed(numberToFixed)`.
     */
    numberToFixed?: number;
    /**
     * Set value info add `unit`.
     */
    unit?: string;
    /**
     * Toggle show value info.
     */
    showValueInfo?: boolean;
    /**
     * Set transition to all Slider Element.
     */
    transition?: string;
    /**
     * onChangeValue callback.
     */
    onChangeValue?: (value?: number) => void;
    /**
     * After finished onChangeValue callback.
     */
    onChangedValue?: (value?: number) => void;
    /**
     * onChangeValueRatio callback.
     */
    onChangeValueRatio?: (valueRatio?: number) => void;
    /**
     * After finished onChangeValueRatio callback.
     */
    onChangedValueRatio?: (value?: number) => void;
    /**
     * Set custom Slider bar Hight.
     */
    barHeight?: number;
    /**
     * Set custom Slider bar background.
     */
    barBackground?: string;
    /**
     * Set custom Slider bar backgroundImage.
     */
    barBackgroundImage?: string;
    /**
     * Set custom Slider controllerStyle.
     */
    customControllerStyle?: React.CSSProperties;
    /**
     * Set custom Slider controller width.
     */
    controllerWidth?: number;
    /**
     * Set custom Slider controller without animation.
     */
    useSimpleController?: boolean;
    /**
     * How many time call onChange callback.
     */
    throttleTimer?: number;
    width?: string | number;
    height?: string | number;
    label?: string;
}
export interface SliderProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface SliderState {
    currValue?: number;
    valueRatio?: number;
    hovered?: boolean;
    dragging?: boolean;
}
export declare class Slider extends React.Component<SliderProps, SliderState> {
    static defaultProps: SliderProps;
    originBodyStyle: {
        [x: number]: string;
        alignContent: string;
        alignItems: string;
        alignSelf: string;
        alignmentBaseline: string;
        all: string;
        animation: string;
        animationDelay: string;
        animationDirection: string;
        animationDuration: string;
        animationFillMode: string;
        animationIterationCount: string;
        animationName: string;
        animationPlayState: string;
        animationTimingFunction: string;
        backfaceVisibility: string;
        background: string;
        backgroundAttachment: string;
        backgroundClip: string;
        backgroundColor: string;
        backgroundImage: string;
        backgroundOrigin: string;
        backgroundPosition: string;
        backgroundPositionX: string;
        backgroundPositionY: string;
        backgroundRepeat: string;
        backgroundSize: string;
        baselineShift: string;
        blockSize: string;
        border: string;
        borderBlockEnd: string;
        borderBlockEndColor: string;
        borderBlockEndStyle: string;
        borderBlockEndWidth: string;
        borderBlockStart: string;
        borderBlockStartColor: string;
        borderBlockStartStyle: string;
        borderBlockStartWidth: string;
        borderBottom: string;
        borderBottomColor: string;
        borderBottomLeftRadius: string;
        borderBottomRightRadius: string;
        borderBottomStyle: string;
        borderBottomWidth: string;
        borderCollapse: string;
        borderColor: string;
        borderImage: string;
        borderImageOutset: string;
        borderImageRepeat: string;
        borderImageSlice: string;
        borderImageSource: string;
        borderImageWidth: string;
        borderInlineEnd: string;
        borderInlineEndColor: string;
        borderInlineEndStyle: string;
        borderInlineEndWidth: string;
        borderInlineStart: string;
        borderInlineStartColor: string;
        borderInlineStartStyle: string;
        borderInlineStartWidth: string;
        borderLeft: string;
        borderLeftColor: string;
        borderLeftStyle: string;
        borderLeftWidth: string;
        borderRadius: string;
        borderRight: string;
        borderRightColor: string;
        borderRightStyle: string;
        borderRightWidth: string;
        borderSpacing: string;
        borderStyle: string;
        borderTop: string;
        borderTopColor: string;
        borderTopLeftRadius: string;
        borderTopRightRadius: string;
        borderTopStyle: string;
        borderTopWidth: string;
        borderWidth: string;
        bottom: string;
        boxShadow: string;
        boxSizing: string;
        breakAfter: string;
        breakBefore: string;
        breakInside: string;
        captionSide: string;
        caretColor: string;
        clear: string;
        clip: string;
        clipPath: string;
        clipRule: string;
        color: string;
        colorInterpolation: string;
        colorInterpolationFilters: string;
        columnCount: string;
        columnFill: string;
        columnGap: string;
        columnRule: string;
        columnRuleColor: string;
        columnRuleStyle: string;
        columnRuleWidth: string;
        columnSpan: string;
        columnWidth: string;
        columns: string;
        content: string;
        counterIncrement: string;
        counterReset: string;
        cssFloat: string;
        cssText: string;
        cursor: string;
        direction: string;
        display: string;
        dominantBaseline: string;
        emptyCells: string;
        fill: string;
        fillOpacity: string;
        fillRule: string;
        filter: string;
        flex: string;
        flexBasis: string;
        flexDirection: string;
        flexFlow: string;
        flexGrow: string;
        flexShrink: string;
        flexWrap: string;
        float: string;
        floodColor: string;
        floodOpacity: string;
        font: string;
        fontFamily: string;
        fontFeatureSettings: string;
        fontKerning: string;
        fontSize: string;
        fontSizeAdjust: string;
        fontStretch: string;
        fontStyle: string;
        fontSynthesis: string;
        fontVariant: string;
        fontVariantCaps: string;
        fontVariantEastAsian: string;
        fontVariantLigatures: string;
        fontVariantNumeric: string;
        fontVariantPosition: string;
        fontWeight: string;
        gap: string;
        glyphOrientationVertical: string;
        grid: string;
        gridArea: string;
        gridAutoColumns: string;
        gridAutoFlow: string;
        gridAutoRows: string;
        gridColumn: string;
        gridColumnEnd: string;
        gridColumnGap: string;
        gridColumnStart: string;
        gridGap: string;
        gridRow: string;
        gridRowEnd: string;
        gridRowGap: string;
        gridRowStart: string;
        gridTemplate: string;
        gridTemplateAreas: string;
        gridTemplateColumns: string;
        gridTemplateRows: string;
        height: string;
        hyphens: string;
        imageOrientation: string;
        imageRendering: string;
        inlineSize: string;
        justifyContent: string;
        justifyItems: string;
        justifySelf: string;
        left: string;
        length: number;
        letterSpacing: string;
        lightingColor: string;
        lineBreak: string;
        lineHeight: string;
        listStyle: string;
        listStyleImage: string;
        listStylePosition: string;
        listStyleType: string;
        margin: string;
        marginBlockEnd: string;
        marginBlockStart: string;
        marginBottom: string;
        marginInlineEnd: string;
        marginInlineStart: string;
        marginLeft: string;
        marginRight: string;
        marginTop: string;
        marker: string;
        markerEnd: string;
        markerMid: string;
        markerStart: string;
        mask: string;
        maskComposite: string;
        maskImage: string;
        maskPosition: string;
        maskRepeat: string;
        maskSize: string;
        maskType: string;
        maxBlockSize: string;
        maxHeight: string;
        maxInlineSize: string;
        maxWidth: string;
        minBlockSize: string;
        minHeight: string;
        minInlineSize: string;
        minWidth: string;
        objectFit: string;
        objectPosition: string;
        opacity: string;
        order: string;
        orphans: string;
        outline: string;
        outlineColor: string;
        outlineOffset: string;
        outlineStyle: string;
        outlineWidth: string;
        overflow: string;
        overflowAnchor: string;
        overflowWrap: string;
        overflowX: string;
        overflowY: string;
        padding: string;
        paddingBlockEnd: string;
        paddingBlockStart: string;
        paddingBottom: string;
        paddingInlineEnd: string;
        paddingInlineStart: string;
        paddingLeft: string;
        paddingRight: string;
        paddingTop: string;
        pageBreakAfter: string;
        pageBreakBefore: string;
        pageBreakInside: string;
        paintOrder: string;
        parentRule: CSSRule;
        perspective: string;
        perspectiveOrigin: string;
        placeContent: string;
        placeItems: string;
        placeSelf: string;
        pointerEvents: string;
        position: string;
        quotes: string;
        resize: string;
        right: string;
        rotate: string;
        rowGap: string;
        rubyAlign: string;
        rubyPosition: string;
        scale: string;
        scrollBehavior: string;
        shapeRendering: string;
        stopColor: string;
        stopOpacity: string;
        stroke: string;
        strokeDasharray: string;
        strokeDashoffset: string;
        strokeLinecap: string;
        strokeLinejoin: string;
        strokeMiterlimit: string;
        strokeOpacity: string;
        strokeWidth: string;
        tabSize: string;
        tableLayout: string;
        textAlign: string;
        textAlignLast: string;
        textAnchor: string;
        textCombineUpright: string;
        textDecoration: string;
        textDecorationColor: string;
        textDecorationLine: string;
        textDecorationStyle: string;
        textEmphasis: string;
        textEmphasisColor: string;
        textEmphasisPosition: string;
        textEmphasisStyle: string;
        textIndent: string;
        textJustify: string;
        textOrientation: string;
        textOverflow: string;
        textRendering: string;
        textShadow: string;
        textTransform: string;
        textUnderlinePosition: string;
        top: string;
        touchAction: string;
        transform: string;
        transformBox: string;
        transformOrigin: string;
        transformStyle: string;
        transition: string;
        transitionDelay: string;
        transitionDuration: string;
        transitionProperty: string;
        transitionTimingFunction: string;
        translate: string;
        unicodeBidi: string;
        userSelect: string;
        verticalAlign: string;
        visibility: string;
        webkitAlignContent: string;
        webkitAlignItems: string;
        webkitAlignSelf: string;
        webkitAnimation: string;
        webkitAnimationDelay: string;
        webkitAnimationDirection: string;
        webkitAnimationDuration: string;
        webkitAnimationFillMode: string;
        webkitAnimationIterationCount: string;
        webkitAnimationName: string;
        webkitAnimationPlayState: string;
        webkitAnimationTimingFunction: string;
        webkitAppearance: string;
        webkitBackfaceVisibility: string;
        webkitBackgroundClip: string;
        webkitBackgroundOrigin: string;
        webkitBackgroundSize: string;
        webkitBorderBottomLeftRadius: string;
        webkitBorderBottomRightRadius: string;
        webkitBorderRadius: string;
        webkitBorderTopLeftRadius: string;
        webkitBorderTopRightRadius: string;
        webkitBoxAlign: string;
        webkitBoxFlex: string;
        webkitBoxOrdinalGroup: string;
        webkitBoxOrient: string;
        webkitBoxPack: string;
        webkitBoxShadow: string;
        webkitBoxSizing: string;
        webkitFilter: string;
        webkitFlex: string;
        webkitFlexBasis: string;
        webkitFlexDirection: string;
        webkitFlexFlow: string;
        webkitFlexGrow: string;
        webkitFlexShrink: string;
        webkitFlexWrap: string;
        webkitJustifyContent: string;
        webkitLineClamp: string;
        webkitMask: string;
        webkitMaskBoxImage: string;
        webkitMaskBoxImageOutset: string;
        webkitMaskBoxImageRepeat: string;
        webkitMaskBoxImageSlice: string;
        webkitMaskBoxImageSource: string;
        webkitMaskBoxImageWidth: string;
        webkitMaskClip: string;
        webkitMaskComposite: string;
        webkitMaskImage: string;
        webkitMaskOrigin: string;
        webkitMaskPosition: string;
        webkitMaskRepeat: string;
        webkitMaskSize: string;
        webkitOrder: string;
        webkitPerspective: string;
        webkitPerspectiveOrigin: string;
        webkitTapHighlightColor: string;
        webkitTextFillColor: string;
        webkitTextSizeAdjust: string;
        webkitTextStroke: string;
        webkitTextStrokeColor: string;
        webkitTextStrokeWidth: string;
        webkitTransform: string;
        webkitTransformOrigin: string;
        webkitTransformStyle: string;
        webkitTransition: string;
        webkitTransitionDelay: string;
        webkitTransitionDuration: string;
        webkitTransitionProperty: string;
        webkitTransitionTimingFunction: string;
        webkitUserSelect: string;
        whiteSpace: string;
        widows: string;
        width: string;
        willChange: string;
        wordBreak: string;
        wordSpacing: string;
        wordWrap: string;
        writingMode: string;
        zIndex: string;
        zoom: string;
        getPropertyPriority(property: string): string;
        getPropertyValue(property: string): string;
        item(index: number): string;
        removeProperty(property: string): string;
        setProperty(property: string, value: string, priority?: string): void;
    };
    state: SliderState;
    throttleNow: number;
    throttleNowTimer: any;
    onChangedValueTimer: any;
    rootElm: HTMLDivElement;
    labelElm: HTMLSpanElement;
    controllerWrapperElm: HTMLDivElement;
    controllerElm: HTMLDivElement;
    barElm: HTMLDivElement;
    componentWillReceiveProps(nextProps: SliderProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    static contextTypes: {
        theme: PropTypes.Requireable<object>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    handelMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => void;
    handelMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
    handelOnClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    handleDraggingStart: (e: any) => void;
    handleDragged: (e: any) => void;
    setValueByEvent: (e: any, type?: any) => void;
    render(): JSX.Element;
}
export default Slider;
