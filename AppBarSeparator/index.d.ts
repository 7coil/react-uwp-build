import * as React from "react";
import { SeparatorProps } from "../Separator";
export interface AppBarSeparatorProps extends SeparatorProps {
}
export default class AppBarSeparator extends React.Component<AppBarSeparatorProps> {
    static defaultProps: AppBarSeparatorProps;
    render(): JSX.Element;
}
