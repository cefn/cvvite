import React, { FunctionComponent } from "react";
import { createStore } from "@lauf/store";
import {
  createStyles,
  Grid,
  Theme,
  Typography,
  withStyles,
} from "@material-ui/core";
import { Resume, Controls } from "../src/components";
import { AppState } from "../src/types";
import { ensurePriorityEntries, INITIAL_APPSTATE } from "../src/logic";
import { PDFZoomViewer } from "../src/components/PdfZoomViewer";

const store = createStore<AppState>(INITIAL_APPSTATE);

ensurePriorityEntries(store);

const App: FunctionComponent = () => {
  return (
    <React.StrictMode>
      <Grid container style={{ height: "100%" }}>
        <Grid item container xs={12} sm={4}>
          <Grid item xs={12}>
            <Typography variant="body1" component="p" style={{ padding: "3%" }}>
              A Typescript experiment targeting Desktop Chrome. Construct PDF
              CVs using Cefn's{" "}
              <a href="https://www.npmjs.com/package/@lauf/store">
                @lauf/store
              </a>{" "}
              package.
            </Typography>
            <Controls store={store} />
          </Grid>
        </Grid>
        <Grid item container xs={12} sm={8}>
          <PDFZoomViewer style={{ height: "100%", width: "100%" }} zoom="70">
            <Resume store={store} />
          </PDFZoomViewer>
        </Grid>
      </Grid>
    </React.StrictMode>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    "@global": {
      html: {
        fontSize: 12,
        [theme.breakpoints.up("sm")]: {
          fontSize: 8,
        },
        [theme.breakpoints.up("md")]: {
          fontSize: 11,
        },
        [theme.breakpoints.up("lg")]: {
          fontSize: 14,
        },
      },
    },
  });

export default withStyles(styles)(App);
