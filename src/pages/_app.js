import { useStore } from "@/store";
import { Provider } from "react-redux";
import Head from "next/head";
import { IntlProvider } from 'react-intl'
import { useRouter } from "next/router";
import LogRocket from 'logrocket';

import { Poppins, Quicksand } from 'next/font/google';

export const quicksand = Quicksand({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'] 
});

export const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'] 
});

import 'bootstrap/dist/css/bootstrap.css'

import "@/styles/globals.css";

import nl from "@/lang/nl.json";
import en from "@/lang/en.json";
import Layout from "@/components/layout";
import getConfig from "next/config";
import Script from "next/script";
import { useEffect } from "react";
import * as ga from '../lib/ga';

const { publicRuntimeConfig } = getConfig();
const { GOOGLE_TAG_MANAGER_ID, GOOGLE_ANALYTICS_ID } = publicRuntimeConfig;

const messages = {
  "nl-NL": nl,
  "en-US": en,
};

function getDirection(locale) {
  // Stays for Right To Left direction, just in case of later translations
  return "ltr";
}

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const router = useRouter();

  useEffect(() => {
    if ((typeof window !== 'undefined') || (process.env.NODE_ENV === "development")) {
      return;
    }

    LogRocket.init('sfpb3b/deya-construction');
    
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Script strategy="afterInteractive" data-cookiecategory="Google Tag Manager" id="google-tag-init" data-cookieconsent="statistics">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GOOGLE_TAG_MANAGER_ID}');
        `}
      </Script>

      <Script 
        data-cookiecategory="Google Analytics" 
        id="google-tag-manager" 
        strategy="lazyOnload" 
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`} 
        data-cookieconsent="analytics"
      />
      <Script 
        data-cookiecategory="Google Analytics" 
        id="google-analytics" 
        strategy="lazyOnload"
        data-cookieconsent="analytics"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', '${GOOGLE_ANALYTICS_ID}');
        `}
      </Script>

      <noscript data-cookiecategory="Google Tag Manager">
        <iframe src={`https://www.googletagmanager.com/ns.html?id=${GOOGLE_TAG_MANAGER_ID}`}
          height="0" width="0" style={{"display":"none","visibility":"hidden"}}>
        </iframe>
      </noscript>  

      <Script strategy="afterInteractive" id="zoho-code" data-cookieconsent="necessary">
        {`
          var $zoho=$zoho || {};$zoho.salesiq = $zoho.salesiq || {
            widgetcode:"siqb42dbf8275e05442170db16090b193b11255a7bdfac6eb16c6f24e41f30cd5a7", 
            values:{},
            ready:function(){}
          };
          var d=document;
          s=d.createElement("script");
          s.type="text/javascript";
          s.id="zsiqscript";
          s.defer=true;
          s.src="https://salesiq.zoho.eu/widget";
          t=d.getElementsByTagName("script")[0];
          t.parentNode.insertBefore(s,t);
        `}
      </Script>
        
      <Provider store={store}>
        <IntlProvider locale={router?.locale} messages={messages[router?.locale]} defaultLocale="en">
          <Layout>
            <Component {...pageProps} dir={getDirection(router?.locale)} />
          </Layout>
        </IntlProvider>
      </Provider>
    </>
  )
}
