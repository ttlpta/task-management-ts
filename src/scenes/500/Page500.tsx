import React, { PropsWithChildren, ReactNode } from 'react';

// We have to use class component to use event componentDidCatch
type Page500State = {
  hasError: boolean;
};
export default class Page500 extends React.PureComponent<{ children?: ReactNode }> {
  constructor(props: PropsWithChildren<{}>) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error: any) {
    this.setState({ hasError: true });
    console.log(error);
  }

  render() {
    const { hasError } = this.state as Page500State;
    if (hasError) {
      return <div>Page500</div>;
    }

    const { children } = this.props;
    return children;
  }
}
