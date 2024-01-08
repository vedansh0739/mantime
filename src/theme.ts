import { createTheme ,MantineProvider, rem} from '@mantine/core';
import classes from './themefiles/active.module.css';
// Your theme configuration is merged with default theme
export const theme = createTheme({
headings: {
    fontFamily: 'Roboto',
  

  },
  activeClassName: classes.active,
  autoContrast:true,
  defaultGradient: {
    from: 'green', to: 'yellow',
    deg: 45,
  },


});
