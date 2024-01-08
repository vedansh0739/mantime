import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import {Demo} from '../components/Demo/Demo'
export function StartScreen() {
  return (
    <>

      <Welcome />
      <ColorSchemeToggle />
      <Demo />
    </>
  );
}
