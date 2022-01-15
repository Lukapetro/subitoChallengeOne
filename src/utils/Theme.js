import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f9423a",
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            fontWeight: "bold",
          }
        }
      ],
      defaultProps: {
        disableElevation: true
      }
    }
  }
});

export default theme