import React, { FC } from "react";
import { Store } from "@lauf/store";
import {
  FormLabel,
  Slider,
  Grid,
  useMediaQuery,
  Theme,
  Typography
} from "@material-ui/core";
import { useSelected } from "@lauf/store-react";
import type { AppState } from "../../types";
import { ALL_ENTRIES } from "../../data";

export const LengthSlider: FC<{ store: Store<AppState> }> = ({
  store,
  ...props
}) => {
  const limit = useSelected(store, (state) => state.limit);
  const orientation = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.up("sm")
  )
    ? "vertical"
    : "horizontal";

  /**
   * Mapping natural direction for document length measure (increasing length downwards)
   * No support for reversed sliders per https://github.com/mui-org/material-ui/issues/18690
   */
  const sliderPos = (value: number) =>
    orientation === "vertical" ? ALL_ENTRIES.length - value : value;

  const marks = [
    { label: "Empty", value: sliderPos(0) },
    ...[0.25, 0.5, 0.75].map((share) => {
      const count = Math.floor(share * ALL_ENTRIES.length);
      return { label: count, value: sliderPos(count) };
    }),
    { label: "All", value: sliderPos(ALL_ENTRIES.length) }
  ];

  const minPos =
    orientation === "vertical" ? sliderPos(ALL_ENTRIES.length) : sliderPos(0);
  const maxPos =
    orientation === "vertical" ? sliderPos(0) : sliderPos(ALL_ENTRIES.length);

  return (
    <>
      <Grid container style={{ height: "100%" }} {...props}>
        <Grid item xs={12}>
          <FormLabel component="label" id="length-slider-label" color="primary">
            Number of Items
          </FormLabel>
          <Typography variant="body2">(limit by priority)</Typography>
        </Grid>
        <Grid item xs={12} style={{ height: "80%" }}>
          <Slider
            style={{ height: "100%" }}
            orientation={orientation}
            value={sliderPos(limit)}
            min={minPos}
            max={maxPos}
            aria-labelledby="length-slider-label"
            step={1}
            valueLabelDisplay="auto"
            valueLabelFormat={sliderPos}
            marks={marks}
            onChange={(_event, value) =>
              store.edit((draft) => {
                draft.limit = sliderPos(Number(value));
              })
            }
          />
        </Grid>
      </Grid>
    </>
  );
};
