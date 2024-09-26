import { useState } from 'react';
import { useIntl } from 'react-intl';
import Head from 'next/head';
import getConfig from 'next/config';

import { quicksand } from '@/pages/_app';
import { poppins } from '../_app';
import BlogList from '@/components/blog/bloglist';
import Categories from '@/components/blog/categories';

const { publicRuntimeConfig } = getConfig();
const { baseUrl } = publicRuntimeConfig?.api;

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const intl = useIntl();

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <>
      <Head>
        <title>{intl.formatMessage({ id: 'blog.meta.title' })}</title>
        <meta
          name="description"
          content={intl.formatMessage({ id: 'blog.meta.description' })}
        />
        <link rel="alternate" href={`${baseUrl}/nl-NL/blog`} hrefLang="nl" />
        <link rel="alternate" href={`${baseUrl}/blog`} hrefLang="en" />

        <meta property="og:type" content="website" key="metaTypeFb" />
        <meta
          property="og:title"
          content={intl.formatMessage({ id: 'blog.meta.title' })}
          key="ogTitle"
        />
        <meta
          property="og:description"
          content={intl.formatMessage({ id: 'blog.meta.description' })}
          key="ogDescription"
        />
        <meta
          property="og:image"
          content="https://deya-co.nl/og-images/bathroom.jpg"
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
          content={intl.formatMessage({ id: 'blog.meta.title' })}
          key="metaTitleTw"
        />
        <meta
          name="twitter:description"
          content={intl.formatMessage({ id: 'blog.meta.description' })}
          key="metaDescriptionTw"
        />
        <meta
          name="twitter:image"
          content="https://deya-co.nl/og-images/bathroom.jpg"
          key="metaImageTw"
        />
      </Head>
      <main
        className={`${quicksand.className} padding-page-top container `}
      >
        <section className="pt-5">
          <div className="col-12">
            <h1
              className={`${poppins.className} fw-bold text_blue text-center`}
            >
              {intl.formatMessage({ id: 'blog.title' })}
            </h1>
          </div>
        </section>
        <section className="pt-5">
          <Categories onCategorySelect={handleCategorySelect} />
        </section>
        <section className="pt-5">
          <BlogList
            selectedCategory={selectedCategory}
            limit={true}
            limitQ={9}
          />
        </section>
      </main>
    </>
  );
}
