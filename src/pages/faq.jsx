import FAQLine from '@/components/faq/FAQLine';
import React, { Component } from 'react';
import { poppins, quicksand } from './_app';
import { useIntl } from 'react-intl';
import Head from 'next/head';
import getConfig from 'next/config';
import MainCta from '@/components/ctas/MainCta';

const { publicRuntimeConfig } = getConfig();
const { baseUrl } = publicRuntimeConfig;

export default function Faq() {
  const intl = useIntl();

  const questionAnswerArr = [
    {
      section: intl.formatMessage({ id: 'faq.1.section' }),
      questions: [
        {
          id: '8d9a8d',
          question: intl.formatMessage({ id: 'faq.1.q' }),
          answer: intl.formatMessage({ id: 'faq.1.a' }),
        },
        {
          id: 'qw7d6736',
          question: intl.formatMessage({ id: 'faq.2.q' }),
          answer: intl.formatMessage({ id: 'faq.2.a' }),
        },
        {
          id: '8odjwpo',
          question: intl.formatMessage({ id: 'faq.3.q' }),
          answer: intl.formatMessage({ id: 'faq.3.a' }),
        },
      ],
    },
    {
      section: intl.formatMessage({ id: 'faq.2.section' }),
      questions: [
        {
          id: '9dq9id',
          question: intl.formatMessage({ id: 'faq.4.q' }),
          answer: intl.formatMessage({ id: 'faq.4.a' }),
        },
        {
          id: 'das6d67sd7',
          question: intl.formatMessage({ id: 'faq.5.q' }),
          answer: intl.formatMessage({ id: 'faq.5.a' }),
        },
        {
          id: '3oprdp9',
          question: intl.formatMessage({ id: 'faq.6.q' }),
          answer: intl.formatMessage({ id: 'faq.6.a' }),
        },
        {
          id: 'qwd87w8d7',
          question: intl.formatMessage({ id: 'faq.7.q' }),
          answer: intl.formatMessage({ id: 'faq.7.a' }),
        },
        {
          id: '2s8a8d',
          question: intl.formatMessage({ id: 'faq.8.q' }),
          answer: intl.formatMessage({ id: 'faq.8.a' }),
        },
      ],
    },
    {
      section: intl.formatMessage({ id: 'faq.3.section' }),
      questions: [
        {
          id: '7aa7w3',
          question: intl.formatMessage({ id: 'faq.9.q' }),
          answer: intl.formatMessage({ id: 'faq.9.a' }),
        },
        {
          id: 'asd77d',
          question: intl.formatMessage({ id: 'faq.10.q' }),
          answer: intl.formatMessage({ id: 'faq.10.a' }),
        },
        {
          id: '8aa99d',
          question: intl.formatMessage({ id: 'faq.11.q' }),
          answer: intl.formatMessage({ id: 'faq.11.a' }),
        },
      ],
    },
    {
      section: intl.formatMessage({ id: 'faq.4.section' }),
      questions: [
        {
          id: '1qa67a',
          question: intl.formatMessage({ id: 'faq.12.q' }),
          answer: intl.formatMessage({ id: 'faq.12.a' }),
        },
        {
          id: '7ws66d',
          question: intl.formatMessage({ id: 'faq.13.q' }),
          answer: intl.formatMessage({ id: 'faq.13.a' }),
        },
      ],
    },
    {
      section: intl.formatMessage({ id: 'faq.5.section' }),
      questions: [
        {
          id: 'a6sd98',
          question: intl.formatMessage({ id: 'faq.14.q' }),
          answer: intl.formatMessage({ id: 'faq.14.a' }),
        },
        {
          id: '88sdd9',
          question: intl.formatMessage({ id: 'faq.15.q' }),
          answer: intl.formatMessage({ id: 'faq.15.a' }),
        },
      ],
    },
    {
      section: intl.formatMessage({ id: 'faq.6.section' }),
      questions: [
        {
          id: '3qwe77',
          question: intl.formatMessage({ id: 'faq.16.q' }),
          answer: intl.formatMessage({ id: 'faq.16.a' }),
        },
      ],
    },
    {
      section: intl.formatMessage({ id: 'faq.7.section' }),
      questions: [
        {
          id: '77ss88',
          question: intl.formatMessage({ id: 'faq.17.q' }),
          answer: intl.formatMessage({ id: 'faq.17.a' }),
        },
        {
          id: '8w9s7d',
          question: intl.formatMessage({ id: 'faq.18.q' }),
          answer: `
            <ol>
              <li>${intl.formatMessage({ id: 'faq.18.a.1' })}</li>
              <li>${intl.formatMessage({ id: 'faq.18.a.2' })}</li>
              <li>${intl.formatMessage({ id: 'faq.18.a.3' })}</li>
              <li>${intl.formatMessage({ id: 'faq.18.a.4' })}</li>
            </ol>
          `,
        },
      ],
    },
  ];

  const faqInLDFormat = (questionAnswerArr) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questionAnswerArr.flatMap((section) =>
      section.questions.map((el) => ({
        '@type': 'Question',
        name: el.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: el.answer.replace(/<[^>]*>/g, '').replace(/(\r\n|\n|\r)/gm, ''),
        },
      }))
    ),
  });

  return (
    <>
      <Head>
        <title>{intl.formatMessage({ id: 'faq.meta.title' })}</title>
        <meta
          name="description"
          content={intl.formatMessage({ id: 'faq.meta.description' })}
        />
        <link rel="alternate" href={`${baseUrl}/nl-NL/faq`} hrefLang="nl" />
        <link rel="alternate" href={`${baseUrl}/faq`} hrefLang="en" />

        <meta property="og:type" content="website" key="metaTypeFb" />
        <meta
          property="og:title"
          content={intl.formatMessage({ id: 'faq.meta.title' })}
          key="ogTitle"
        />
        <meta
          property="og:description"
          content={intl.formatMessage({ id: 'faq.meta.description' })}
          key="ogDescription"
        />
        <meta
          property="og:image"
          content="https://deya-co.nl/og-images/bath-toilet.jpg"
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
          content={intl.formatMessage({ id: 'faq.meta.title' })}
          key="metaTitleTw"
        />
        <meta
          name="twitter:description"
          content={intl.formatMessage({ id: 'faq.meta.description' })}
          key="metaDescriptionTw"
        />
        <meta
          name="twitter:image"
          content="https://deya-co.nl/og-images/bath-toilet.jpg"
          key="metaImageTw"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqInLDFormat(questionAnswerArr)),
          }}
        />
      </Head>
      <main
        className={`full_w_container ${quicksand.className} padding-page-top`}
      >
        <div className="container pt-5">
          <div className="row">
            <h1
              className={`${poppins.className} text-center fw-bold text_blue`}
            >
              DEYA construction FAQ
            </h1>
          </div>

          <div className="row justify-content-center">
            {/* Habe Fragen? Wir sind hier um zu helfen. */}
          </div>

          <div className="row" style={{ paddingTop: '36px' }}>
            <div className="col-2 d-none d-lg-block"></div>
            <div className="col-12 col-lg-8">
              {questionAnswerArr.map((section, i) => (
                <div key={i}>
                  <h3
                    className={`${poppins.className} text_dk_blue card-title ms-3 pt-5`}
                  >
                    {section.section}
                  </h3>
                  {section.questions.map((qa, i) => (
                    <section key={qa.id}>
                      <FAQLine questionAnswer={qa} first={i === 0} />
                    </section>
                  ))}
                </div>
              ))}
            </div>
            <div>
              <h4 className="pt-5">
                {intl.formatMessage({ id: 'faq.question' })}
              </h4>
            </div>
            <div className="col-2 d-none d-lg-block"></div>
          </div>
          <div className="row" style={{ paddingTop: '36px' }}>
            <MainCta justify="center" />
          </div>
        </div>
      </main>
    </>
  );
}
