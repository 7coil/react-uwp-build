import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
}
export interface SemanticZoomProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface SemanticZoomState {
    showController?: boolean;
}
export default class SemanticZoom extends React.Component<SemanticZoomProps, SemanticZoomState> {
    state: SemanticZoomState;
    static contextTypes: {
        theme: PropTypes.Requireable<object>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    toggleShowController: (showController?: boolean) => void;
    render(): JSX.Element;
}
