//a
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { DEFAULT_THEME } from '@mantine/core';
// theme.ts
import {
  mergeMantineTheme,
} from '@mantine/core';

export default function App() {
  return (
    <MantineProvider theme={theme}  >
      <Router />
    </MantineProvider>
  );
}
