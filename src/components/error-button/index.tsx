import { Component } from 'react';

type State = {
  hasError: boolean;
};

export class ErrorButton extends Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public render(): JSX.Element {
    const { hasError } = this.state;

    if (hasError) {
      throw new Error('The button throw an error');
    }

    return (
      <button
        className="fixed left-3 bottom-3 button"
        type="button"
        onClick={() => {
          this.setState({ hasError: true });
        }}
      >
        Error button
      </button>
    );
  }
}
