import Hero from '@/components/Hero';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import { quicksand } from '@/pages/_app';
import { poppins } from './_app';
import { useState, useEffect } from 'react';

import MainCta from '@/components/ctas/MainCta';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { baseUrl } = publicRuntimeConfig;

export default function ContactUs() {
  const intl = useIntl();
  const [hydrated, setHidrated] = useState(false);

  useEffect(() => {
    setHidrated(true);
  }, []);

  const renderHtmlContent = (id) => {
    return { __html: intl.formatMessage({ id }) };
  };

  return (
    <>
      <Head>
        <title>{intl.formatMessage({ id: 'overons.meta.title' })}</title>
        <meta
          name="description"
          content={intl.formatMessage({ id: 'overons.meta.description' })}
        />
        <link
          rel="alternate"
          href={`${baseUrl}/nl-NL/about-us`}
          hrefLang="nl"
        />
        <link rel="alternate" href={`${baseUrl}/about-us`} hrefLang="en" />

        <meta property="og:type" content="website" key="metaTypeFb" />
        <meta
          property="og:title"
          content={intl.formatMessage({ id: 'overons.meta.title' })}
          key="ogTitle"
        />
        <meta
          property="og:description"
          content={intl.formatMessage({ id: 'overons.meta.description' })}
          key="ogDescription"
        />
        <meta
          property="og:image"
          content="https://deya-co.nl/og-images/mirror.jpg"
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
          content={intl.formatMessage({ id: 'overons.meta.title' })}
          key="metaTitleTw"
        />
        <meta
          name="twitter:description"
          content={intl.formatMessage({ id: 'overons.meta.description' })}
          key="metaDescriptionTw"
        />
        <meta
          name="twitter:image"
          content="https://deya-co.nl/og-images/mirror.jpg"
          key="metaImageTw"
        />
      </Head>
      {hydrated && (
        <main
          className={`full_w_container ${quicksand.className} padding-page-top`}
        >
          <section>
            <div className="pt-5 container">
              <div className="col-12">
                <h1
                  className={`${poppins.className} fw-bold text_blue text-center`}
                >
                  {intl.formatMessage({ id: 'overons.title' })}
                </h1>
                <div className="row">
                  <div className="d-none d-md-block col-3"></div>
                  <div
                    className="col-12 col-md-6"
                    dangerouslySetInnerHTML={renderHtmlContent(
                      'overons.body.1'
                    )}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="pt-0 pt-md-5">
            <hr />
            <div className="container pt-5">
              <div className="row">
                <div className="col-12 col-md-6 order-2 order-md-1 mt-0 mt-md-5">
                  <h2
                    className={`${poppins.className} text_dk_blue pt-5 pt-md-0`}
                  >
                    {intl.formatMessage({ id: 'overons.2.title' })}{' '}
                    <br className="d-block d-md-none" />
                  </h2>
                  <p className="mt-3">
                    {intl.formatMessage({ id: 'overons.2.body.1' })}
                  </p>
                  <p
                    className="mb-3"
                    dangerouslySetInnerHTML={renderHtmlContent(
                      'overons.2.body.2'
                    )}
                  />
                  <p
                    className="mt-4"
                    dangerouslySetInnerHTML={renderHtmlContent(
                      'overons.2.body.3'
                    )}
                  />
                  <p
                    className="mt-4"
                    dangerouslySetInnerHTML={renderHtmlContent(
                      'overons.2.body.4'
                    )}
                  />
                  <p
                    className="mt-4"
                    dangerouslySetInnerHTML={renderHtmlContent(
                      'overons.2.body.5'
                    )}
                  />
                  <p
                    className="mt-4"
                    dangerouslySetInnerHTML={renderHtmlContent(
                      'overons.2.body.6'
                    )}
                  />
                  <p
                    className="mt-4"
                    dangerouslySetInnerHTML={renderHtmlContent(
                      'overons.2.body.7'
                    )}
                  />
                  <div className="mt-4">
                    <MainCta justify="center" />
                  </div>
                </div>
                <div className="col-12 col-md-6 order-1 order-md-2 d-flex justify-content-center align-items-center">
                  <div className="w-100 d-flex justify-content-center">
                    <div className="col-12 col-md-9">
                      <Image
                        src="/assets/pages/index/about_us/photo-collage.png"
                        alt="Different projects finished in all the Netherlands, by DEYA construction"
                        width={1080}
                        height={1440}
                        sizes="100%"
                        style={{
                          width: '100%',
                          height: 'auto',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pt-0 pt-md-5">
            <hr />
            <div className="container pt-5">
              <div className="row">
                {/* <div className="col-12 col-md-6">
                Image
              </div> */}
                <div className="col-12">
                  <h2
                    className={`${poppins.className} text_dk_blue text-center pt-5 pt-md-0`}
                  >
                    {intl.formatMessage({ id: 'overons.3.title' })}
                    <br className="d-block d-md-none" />
                  </h2>

                  <div className="row mt-md-2">
                    <div
                      className="col-12 col-md-4 mt-5"
                      dangerouslySetInnerHTML={renderHtmlContent(
                        'overons.3.body.1'
                      )}
                    />
                    <div
                      className="col-12 col-md-4 mt-5"
                      dangerouslySetInnerHTML={renderHtmlContent(
                        'overons.3.body.2'
                      )}
                    />
                    <div
                      className="col-12 col-md-4 mt-5"
                      dangerouslySetInnerHTML={renderHtmlContent(
                        'overons.3.body.3'
                      )}
                    />
                    <div
                      className="col-12 col-md-4 offset-md-2 mt-5"
                      dangerouslySetInnerHTML={renderHtmlContent(
                        'overons.3.body.4'
                      )}
                    />
                    <div
                      className="col-12 col-md-4 mt-5"
                      dangerouslySetInnerHTML={renderHtmlContent(
                        'overons.3.body.5'
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pt-0 pt-md-5">
            <hr />
            <div className="container pt-5">
              <div className="row">
                <div className="col-12">
                  <h2
                    className={`${poppins.className} text-center text_dk_blue pt-5 pt-md-0`}
                  >
                    {intl.formatMessage({ id: 'overons.4.title' })}
                    <br className="d-block d-md-none" />
                  </h2>
                </div>
              </div>
              <div className="row mt-md-2">
                <div
                  className="col-12 col-md-3 mt-5"
                  dangerouslySetInnerHTML={renderHtmlContent(
                    'overons.4.body.1'
                  )}
                />
                <div
                  className="col-12 col-md-3 mt-5"
                  dangerouslySetInnerHTML={renderHtmlContent(
                    'overons.4.body.2'
                  )}
                />
                <div
                  className="col-12 col-md-3 mt-5"
                  dangerouslySetInnerHTML={renderHtmlContent(
                    'overons.4.body.3'
                  )}
                />
                <div
                  className="col-12 col-md-3 mt-5"
                  dangerouslySetInnerHTML={renderHtmlContent(
                    'overons.4.body.4'
                  )}
                />
              </div>
              <div className="row pt-5 mt-md-5">
                <div className="col-12">
                  <div className="row">
                    <div className="d-none d-md-block col-3"></div>
                    <div
                      className="col-12 col-md-6 text-center"
                      dangerouslySetInnerHTML={renderHtmlContent(
                        'overons.5.closure'
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <MainCta justify="center" />
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
}
