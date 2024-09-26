import Image from 'next/image';
import React, { Component } from 'react';
import { useIntl } from 'react-intl';
import Head from 'next/head';
import getConfig from 'next/config';
import { poppins, quicksand } from "./_app";

const { publicRuntimeConfig } = getConfig();
const { baseUrl } = publicRuntimeConfig;

export default function Contact() {
  const intl = useIntl();

  return (
    <>
      <Head>
        <title>
          {intl.formatMessage({ id: "contact.meta.title" })}
        </title>
        <meta name="description" content={intl.formatMessage({ id: "contact.meta.description" })} />
        <link rel="alternate" href={`${baseUrl}/nl-NL/contact`} hrefLang="nl" />
        <link rel="alternate" href={`${baseUrl}/contact`} hrefLang="en" />

        <meta property="og:type" content="website" key="metaTypeFb" />
        <meta property="og:title" content={intl.formatMessage({ id: "contact.meta.title" })} key="ogTitle" />
        <meta property="og:description" content={intl.formatMessage({ id: "contact.meta.description" })} key="ogDescription" />
        <meta property="og:image" content="https://deya-co.nl/og-images/bathroom.jpg" key="metaImageFb" />

        <meta name="twitter:card" content="summary_large_image" key="metaCardTw" />
        <meta property="twitter:domain" content="deya-co.nl" key="metaDomainTw" />
        <meta name="twitter:title" content={intl.formatMessage({ id: "contact.meta.title" })} key="metaTitleTw" />
        <meta name="twitter:description" content={intl.formatMessage({ id: "contact.meta.description" })} key="metaDescriptionTw" />
        <meta name="twitter:image" content="https://deya-co.nl/og-images/bathroom.jpg" key="metaImageTw" />
      </Head>
      <main className={`full_w_container ${quicksand.className} padding-page-top`}>

        <div className="container pt-5">
          <div className="row">
            <h1 className={`${poppins.className} text-center fw-bold text_blue`}>
              {intl.formatMessage({ id: "contact.title" })}
            </h1>
          </div>

          <div className="row justify-content-between my-5">
            <div className="col-12 col-lg-7 py-5 pe-2 pe-md-5 order-2 order-md-1">

              <h2 className={`${poppins.className} text_dk_blue mt-md-5`}>
                DEYA construction
              </h2>
              <h4 className={`${poppins.className} text_blue`}>
                {intl.formatMessage({ id: "contact.1.subtitle" })}
              </h4>
              <div className="mt-4">
                {intl.formatMessage({ id: "contact.1.body" })}
              </div>
              <div className="mt-4">
                {intl.formatMessage({ id: "contact.1.body.2" })}
              </div>
            </div>

            <div className="col-12 col-md-4 order-1 order-md-2">
              <Image
                src={"/assets/pages/index/contact.jpg"}
                alt="DEYA construction - Contact us & let's get your new bathrrom finished in under 2 weeks"
                width={512}
                height={512}
                sizes="100%"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
