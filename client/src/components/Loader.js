import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//!Main LinearBuffer component
export default function LinearBuffer(props) {
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);
  const progressRef = React.useRef(() => {});

  //Custom Theam provider
  const theme = createTheme({
    palette: {
      primary: {
        main: "#5B3F89"
      }
    }
  });

  //Loader progress on component render
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  //Loader close
  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  //Return the Loader copoonent structure
  return (
    <Box sx={{ width: "60%", margin: "50px auto" ,display:props.show===true?'block':'none' }}>
      <ThemeProvider theme={theme}>
        <LinearProgress
          variant="buffer"
          value={progress}
          valueBuffer={buffer}
          color="primary"
        />
      </ThemeProvider>
    </Box>
  );

}
