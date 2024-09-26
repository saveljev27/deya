import FeautureGrid from "@/components/FeautureGrid";
import Hero from "@/components/Hero";
import MainCta from "@/components/ctas/MainCta";
import Portfolio from "@/components/gallery/Portfolio";
import Head from "next/head";
import ReactCompareImage from 'react-compare-image';
import { poppins, quicksand } from "./_app";
import { useIntl } from "react-intl";
import getConfig from "next/config";
import Script from "next/script";

const { publicRuntimeConfig } = getConfig();
const { baseUrl } = publicRuntimeConfig;

export default function Home() {
  const intl = useIntl();

  return (
    <>
      <Head>
        <title>
          {intl.formatMessage({ id: "index.meta.title" })}
        </title>
        <meta name="description" content={intl.formatMessage({ id: "cookie.meta.description" })} />
        <link rel="alternate" href={`${baseUrl}/nl-NL/cookie-policy`} hrefLang="nl" />
        <link rel="alternate" href={`${baseUrl}/cookie-policy`} hrefLang="en" />

        <meta property="og:type" content="website" key="metaTypeFb" />
        <meta property="og:title" content={intl.formatMessage({ id: "cookie.meta.title" })} key="ogTitle" />
        <meta property="og:description" content={intl.formatMessage({ id: "cookie.meta.description" })} key="ogDescription" />
        <meta property="og:image" content="https://deya-co.nl/og-images/bath-mirror.jpg" key="metaImageFb" />

        <meta name="twitter:card" content="summary_large_image" key="metaCardTw" />
        <meta property="twitter:domain" content="deya-co.nl" key="metaDomainTw" />
        <meta name="twitter:title" content={intl.formatMessage({ id: "cookie.meta.title" })} key="metaTitleTw" />
        <meta name="twitter:description" content={intl.formatMessage({ id: "cookie.meta.description" })} key="metaDescriptionTw" />
        <meta name="twitter:image" content="https://deya-co.nl/og-images/bath-mirror.jpg" key="metaImageTw" />
        
      </Head>
      <main className={`full_w_container ${quicksand.className} padding-page-top`}>
        <section>
          <div className="container pt-5">
            <div className="col-12">
              <h1 className={`${poppins.className} text-center fw-bold text_blue`}>
                {intl.formatMessage({ id: "cookie.title" })}
              </h1>
              <div className="row mt-4">
                <div className="d-none d-md-block col-2"></div>
                <div className="col-12 col-md-8 position-relative">
                  <div 
                    id="script" 
                    dangerouslySetInnerHTML={{ __html: `<script
                    id="CookieDeclaration"
                    src="https://consent.cookiebot.com/767857ad-9528-42da-9c08-0f76e4b08410/cd.js"
                    async
                  ></script>` }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
