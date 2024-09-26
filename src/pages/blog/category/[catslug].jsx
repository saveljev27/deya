import getConfig from 'next/config';
import axios from 'axios';
import Head from 'next/head';

import { quicksand } from '@/pages/_app';
import { poppins } from '@/pages/_app';
import BlogList from '@/components/blog/bloglist';

const { publicRuntimeConfig } = getConfig();
const { baseApiUrl, baseUrl } = publicRuntimeConfig?.api;

export default function CategoryBlogsPage({ category }) {
  const title = category?.translations?.[0]?.title;
  const description = category?.translations?.[0]?.description;
  const descriptionFormatted = (description) ? (description.replace(/(<([^>]+)>)/gi, '')) : ("");

  return (
    <>
      <Head>
        <title>{'Blog | ' + title}</title>
        <meta name="description" content={descriptionFormatted} />
        <link rel="alternate" href={`${baseUrl}/nl-NL/blog`} hrefLang="nl" />
        <link rel="alternate" href={`${baseUrl}/blog`} hrefLang="en" />

        <meta property="og:type" content="website" key="metaTypeFb" />
        <meta property="og:title" content={title} key="ogTitle" />
        <meta
          property="og:description"
          content={descriptionFormatted}
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
        <meta name="twitter:title" content={title} key="metaTitleTw" />
        <meta
          name="twitter:description"
          content={descriptionFormatted}
          key="metaDescriptionTw"
        />
        <meta
          name="twitter:image"
          content="https://deya-co.nl/og-images/bathroom.jpg"
          key="metaImageTw"
        />
      </Head>

      <main
        className={`${quicksand.className} padding-page-top container`}
      >
        <section className="pt-5 container">
          <div className="col-12">
            <h1
              className={`${poppins.className} fw-bold text_blue text-center`}
            >
              {title}
            </h1>
          </div>
          <div className="col-12 pt-4">
            <p
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          </div>
        </section>
        <section className="col-12 pt-4">
          <BlogList selectedCategory={category?.id} limit={false} />
        </section>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { catslug: "tips-and-tricks" },
        params: { catslug: "modern-trends" },
        params: { catslug: "good-to-know" }
      }
    ],
    fallback: true,
  };
}

export async function getStaticProps({ params, locale }) {
  try {
    const categoryResponse = await axios.get(
      `${baseApiUrl}/items/category?fields=*.*&filter[slug][_eq]=${params.catslug}&sort=-date_updated`
    );

    const category = categoryResponse?.data?.data[0];

    if (!category) {
      return {
        redirect: {
          destination: '/blog',
        },
      };
    }

    // Translation filter to locale languages. Need to be array.
    const categoryTranslation = category;
    categoryTranslation.translations = categoryTranslation.translations.filter(
      (translation) => translation.languages_code === locale
    );

    return {
      props: {
        category: category,
      },
    };
  } catch (err) {
    console.error('Error fetching data:', err);
    return {
      redirect: {
        destination: '/blog',
      },
    };
  }
}
