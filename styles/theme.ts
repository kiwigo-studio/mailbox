import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  components: {
    JoySkeleton: {
      defaultProps: {
        animation: 'wave',
      },
    },
  },
});

export default theme;
