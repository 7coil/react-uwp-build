import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
    displayMode?: "default" | "minimum" | "reset";
    playing?: boolean;
    played?: number;
    volume?: number;
    playbackRate?: number;
    duration?: number;
    playOrPauseAction?: () => void;
    fullScreenAction?: () => void;
    skipBackAction?: (backRate?: number) => void;
    skipForwardAction?: (forwardRate?: number) => void;
    onChangePlaybackRate?: (playbackRate?: number) => void;
    onChangeVolume?: (volume?: number) => void;
    onChangeSeek?: (seek?: number) => void;
}
export interface ControlProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface ControlState {
    showVolumeSlider?: boolean;
    showPlaybackChoose?: boolean;
}
export default class Control extends React.Component<ControlProps, ControlState> {
    static defaultProps: ControlProps;
    state: ControlState;
    static contextTypes: {
        theme: PropTypes.Requireable<object>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    toggleShowPlaybackChoose: (showPlaybackChoose?: any) => void;
    toggleShowVolumeSlider: (showVolumeSlider?: any) => void;
    second2HHMMSS: (second: number) => string;
    render(): JSX.Element;
}
