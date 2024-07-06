import { Component } from 'react';

type State = {
  error: boolean;
};

export class ErrorButton extends Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      error: false,
    };
  }

  public render(): JSX.Element {
    const { error } = this.state;
    if (error) {
      throw new Error('The button throw an error');
    }
    return (
      <button
        className="fixed left-3 bottom-3 button"
        type="button"
        onClick={() => {
          this.setState({ error: true });
        }}
      >
        Error button
      </button>
    );
  }
}
