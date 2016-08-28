
import * as React from "react";

interface HelloProps { 
  compiler: string; 
  framework: string;
  version: number;
}

// You can customize the intrinsic elements that are allowed.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      foo: any;
    }
  }
}

// Use parameter destructuring and defaults for easy definition of 'props' type.
const Greeter = ({name = 'world'}) => <div>Hello, {name}!</div>;

export class Hello extends React.Component<HelloProps, {}> {
  render() {
    return <h1>
      Hello from {this.props.compiler} and {this.props.framework} v{this.props.version}!
      <Greeter name="TypeScript 1.8" />
      <foo />
    </h1>;
  }
}
