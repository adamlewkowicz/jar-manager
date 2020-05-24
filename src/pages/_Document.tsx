import React from 'react';
import NativeDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

class Document extends NativeDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NativeDocument.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <title>Jar manager</title>
          <meta
            name="description"
            content="Manager do zarządzania budżetem w postaci słoików"
          />
          <meta name="author" content="Adam Lewkowicz" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="Shortcut icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
