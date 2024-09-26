import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" sizes="96x96" href="/favi/favicon_96_96.ico" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favi/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favi/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favi/favicon-16x16.png" />
        <link rel="manifest" href="/favi/site.webmanifest" />
        <link rel="mask-icon" href="/favi/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favi/favicon.ico" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-config" content="/favi/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff"></meta>

        <script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="767857ad-9528-42da-9c08-0f76e4b08410" type="text/javascript" async></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
