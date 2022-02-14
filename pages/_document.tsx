import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { ServerStyleSheets } from '@mui/styles';
import React from 'react';
import { Box } from '@mui/system';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-ZA">
        <Head />
        <body>
          <Main />
          <NextScript />
          {/* <Box
            sx={{
              margin: 0,
              padding: 0,
              backgroundColor: 'white',
              background:
                'linear-gradient(to right bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.3))',
              height: 150,
              width: 150,
              position: 'absolute',
              bottom: '1%',
              left: '5%',
              borderRadius: '50%',
            }}
          ></Box>
          <Box
            sx={{
              margin: 0,
              padding: 0,
              backgroundColor: 'white',
              background:
                'linear-gradient(to right bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.3))',
              height: 150,
              width: 150,
              position: 'absolute',
              top: '13%',
              right: '5%',
              borderRadius: '50%',
            }}
          ></Box> */}
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,

    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};

export default MyDocument;
