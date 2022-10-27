import React, { FC } from "react";
import { ButtonGroup, Grid, Paper } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Store } from "@lauf/store";
import type { AppState } from "../types";
import { DetailRadio } from "./controls/DetailRadio";
import { LengthSlider } from "./controls/LengthSlider";
import { PriorityList } from "./controls/PriorityList";
import { DownloadButton, ResetButton, LinkButton } from "./controls/Buttons";

const GRID_PANE_PROPS = {
  style: {
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: "5%",
    paddingBottom: "5%"
  }
} as const;

export const Controls: FC<{ store: Store<AppState> }> = ({ store }) => {
  const theme = createMuiTheme();

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{ display: "flex", flexDirection: "column" }}
        suppressHydrationWarning
      >
        <Paper>
          <Grid container {...GRID_PANE_PROPS} alignItems="center">
            <Grid
              item
              xs={12}
              sm={4}
              {...GRID_PANE_PROPS}
              style={{ flexBasis: "100%" }}
            >
              <DetailRadio store={store} />
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              {...GRID_PANE_PROPS}
              style={{ flexBasis: "100%" }}
            >
              <ButtonGroup
                orientation="vertical"
                color="primary"
                aria-label="App Controls"
                variant="contained"
                style={{ width: "80%" }}
              >
                <DownloadButton store={store} />
                <LinkButton href="https://github.com/cefn/cvnext#readme">
                  See Source
                </LinkButton>
                <ResetButton store={store} />
              </ButtonGroup>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              {...GRID_PANE_PROPS}
              style={{ flexBasis: "80%" }}
            >
              <ButtonGroup
                orientation="vertical"
                aria-label="Online Profiles"
                variant="text"
                style={{ width: "100%" }}
              >
                <LinkButton href="https://github.com/cefn">Github</LinkButton>
                <LinkButton href="https://stackoverflow.com/users/2257198/cefn">
                  Stackoverflow
                </LinkButton>
                <LinkButton href="https://www.linkedin.com/in/cefnhoile">
                  Linkedin
                </LinkButton>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Paper>
        <Paper>
          <Grid container {...GRID_PANE_PROPS} alignItems="stretch">
            <Grid
              item
              xs={12}
              sm={6}
              {...GRID_PANE_PROPS}
              style={{ flexBasis: "100%" }}
            >
              <LengthSlider store={store} />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              {...GRID_PANE_PROPS}
              style={{ flexBasis: "100%" }}
            >
              <PriorityList store={store} />
            </Grid>
          </Grid>
        </Paper>
      </div>
    </ThemeProvider>
  );
};
