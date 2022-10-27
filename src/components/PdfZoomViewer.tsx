import React, {
  CSSProperties,
  JSXElementConstructor,
  ReactElement,
  useEffect
} from "react";
import { usePDF } from "@react-pdf/renderer";

import { PDFVersion } from "@react-pdf/types";

interface OnRenderProps {
  blob?: Blob;
}

interface DocumentProps {
  title?: string;
  author?: string;
  subject?: string;
  creator?: string;
  keywords?: string;
  producer?: string;
  language?: string;
  pdfVersion?: PDFVersion;
  onRender?: (props: OnRenderProps) => any;
}

interface PDFViewerProps {
  title?: string;
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  className?: string;
  children?: React.ReactElement<DocumentProps>;
  innerRef?: React.Ref<HTMLIFrameElement>;
  zoom?: string;
}

export const PDFZoomViewer = ({
  title,
  style,
  className,
  children,
  innerRef,
  zoom,
  ...props
}: PDFViewerProps) => {
  const [instance, updateInstance] = usePDF({
    document: children as ReactElement<
      DocumentProps,
      string | JSXElementConstructor<any>
    >
  });

  useEffect(updateInstance, [children]);

  return (
    <iframe
      title={title}
      ref={innerRef}
      style={style}
      src={
        instance.url
          ? `${instance.url}${zoom ? `#zoom=${zoom}` : ""}`
          : undefined
      }
      className={className}
      {...props}
    />
  );
};
