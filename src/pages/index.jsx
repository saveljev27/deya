import FeautureGrid from '@/components/FeautureGrid';
import Hero from '@/components/Hero';
import MainCta from '@/components/ctas/MainCta';
import Portfolio from '@/components/gallery/Portfolio';
import Head from 'next/head';
import ReactCompareImage from 'react-compare-image';
import { poppins, quicksand } from './_app';
import { useIntl } from 'react-intl';
import getConfig from 'next/config';
import { useEffect } from 'react';
import axios from 'axios';

const { publicRuntimeConfig } = getConfig();
const { baseUrl } = publicRuntimeConfig;

export default function Home() {
  const intl = useIntl();

  const allInServiceList = [
    {
      title: intl.formatMessage({ id: 'index.3.pinp.1.head' }),
      body: intl.formatMessage({ id: 'index.3.pinp.1.body' }),
    },
    {
      title: intl.formatMessage({ id: 'index.3.pinp.2.head' }),
      body: intl.formatMessage({ id: 'index.3.pinp.2.body' }),
    },
    {
      title: intl.formatMessage({ id: 'index.3.pinp.3.head' }),
      body: intl.formatMessage({ id: 'index.3.pinp.3.body' }),
    },
    {
      title: intl.formatMessage({ id: 'index.3.pinp.4.head' }),
      body: intl.formatMessage({ id: 'index.3.pinp.4.body' }),
    },
    {
      title: intl.formatMessage({ id: 'index.3.pinp.5.head' }),
      body: intl.formatMessage({ id: 'index.3.pinp.5.body' }),
    },
    {
      title: intl.formatMessage({ id: 'index.3.pinp.6.head' }),
      body: intl.formatMessage({ id: 'index.3.pinp.6.body' }),
    },
  ];

  return (
    <>
      <Head>
        <title>{intl.formatMessage({ id: 'index.meta.title' })}</title>
        <meta
          name="description"
          content={intl.formatMessage({ id: 'index.meta.description' })}
        />
        <link rel="alternate" href={`${baseUrl}/nl-NL/`} hrefLang="nl" />
        <link rel="alternate" href={`${baseUrl}/`} hrefLang="en" />

        <meta property="og:type" content="website" key="metaTypeFb" />
        <meta
          property="og:title"
          content={intl.formatMessage({ id: 'index.meta.title' })}
          key="ogTitle"
        />
        <meta
          property="og:description"
          content={intl.formatMessage({ id: 'index.meta.description' })}
          key="ogDescription"
        />
        <meta
          property="og:image"
          content="https://deya-co.nl/og-images/bath-mirror.jpg"
          key="metaImageFb"
        />

        <meta
          name="twitter:card"
          content="summary_large_image"
          key="metaCardTw"
        />
        <meta
          property="twitter:domain"
          content="deya-co.nl"
          key="metaDomainTw"
        />
        <meta
          name="twitter:title"
          content={intl.formatMessage({ id: 'index.meta.title' })}
          key="metaTitleTw"
        />
        <meta
          name="twitter:description"
          content={intl.formatMessage({ id: 'index.meta.description' })}
          key="metaDescriptionTw"
        />
        <meta
          name="twitter:image"
          content="https://deya-co.nl/og-images/bath-mirror.jpg"
          key="metaImageTw"
        />
      </Head>
      <main
        className={`full_w_container ${quicksand.className} padding-page-top bg_lt_grey`}
      >
        <section>
          <Hero />
        </section>

        <section>
          <div className="container pt-5">
            <div className="row justify-content-center">
              <div className="col-12 col-md-10 col-lg-8">
                <h2
                  className={`${poppins.className} text_dk_blue pt-5 pt-md-0`}
                >
                  {intl.formatMessage({ id: 'index.2.title1' })}{' '}
                  <br className="d-block d-md-none" />
                  {intl.formatMessage({ id: 'index.2.title2' })}
                </h2>
                <p className="mt-3">
                  {intl.formatMessage({ id: 'index.2.text' })}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="service">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-7 order-2 order-md-1">
                <h2 className={`${poppins.className} text_dk_blue mt-5`} id="service">
                  {intl.formatMessage({ id: 'index.3.title' })}
                </h2>
                <p className="mt-3">
                  {intl.formatMessage({ id: 'index.3.subt' })}
                </p>

                <div className="list-group me-0 me-md-5 shadow">
                  {allInServiceList.map((item, i) => (
                    <div className="list-group-item" key={i}>
                      <h5 className={`${poppins.className} mb-1 text_lt_blue`}>
                        {item?.title}
                      </h5>
                      <p className="mb-1">{item?.body}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 mb-5">
                  <MainCta justify="start" />
                </div>
              </div>
              <div className="col-12 col-md-5 order-1 order-md-2 mt-5">
                <ReactCompareImage
                  leftImage="/assets/pages/index/before_after/before.jpg"
                  rightImage="/assets/pages/index/before_after/after.jpg"
                />
                <div className="text_blue mt-2 text-center">
                  {intl.formatMessage({ id: 'index.3.img.subtl' })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-md-5 bg-white pb-5">
          <div className="container pt-5">
            <div className="row">
              <h2
                className={`${poppins.className} text_dk_blue mt-5 text-center`}
              >
                {intl.formatMessage({ id: 'index.4.title' })}
              </h2>
            </div>

            <FeautureGrid />
          </div>
        </section>

        <section id="project" className="mt-md-5 pb-5">
          <div className="container pt-5">
            <div className="row">
              <h2 className={`${poppins.className} text_dk_blue text-center`} id="project">
                {intl.formatMessage({ id: 'index.5.title' })}
              </h2>
            </div>

            <Portfolio />
          </div>
        </section>
      </main>
    </>
  );
}
