import React, { FC, ReactNode } from "react";
import { Button } from "@material-ui/core";
import { Store } from "@lauf/store";
import type { AppState } from "../../types";
import { INITIAL_APPSTATE } from "../../logic";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import { Resume } from "../";

export const ResetButton: FC<{ store: Store<AppState> }> = ({
  store,
  ...props
}) => (
  <Button onClick={() => store.write(INITIAL_APPSTATE)} {...props}>
    Reset
  </Button>
);

export const LinkButton: FC<{
  href: string;
  children: string;
}> = ({ href, children, ...props }) => (
  <Button href={href} {...props}>
    {children}
  </Button>
);

export const DownloadButton: FC<{ store: Store<AppState> }> = ({
  store,
  ...props
}) => (
  <Button onClick={() => downloadPdf(store)} {...props}>
    Get PDF
  </Button>
);

async function downloadPdf(store: Store<AppState>): Promise<void> {
  const blob = await pdf(<Resume store={store} />).toBlob();
  saveAs(blob, "CV - Cefn Hoile.pdf");
}
