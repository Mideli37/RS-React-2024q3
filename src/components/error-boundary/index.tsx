import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = Readonly<{
  children?: ReactNode;
  fallback?: ReactNode;
}>;

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Caught error:', error, errorInfo);
  }

  public render(): ReactNode {
    const { hasError } = this.state;
    const { children, fallback } = this.props;
    if (hasError) {
      return fallback;
    }
    return children;
  }
}

export default ErrorBoundary;
