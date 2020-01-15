import { hot } from 'react-hot-loader';

export default function hottifyComponent(Component) {
  return hot(module)(Component);
}