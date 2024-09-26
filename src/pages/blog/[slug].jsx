import getConfig from 'next/config';
import Image from 'next/image';
import axios from 'axios';
import Head from 'next/head';

import randomBytes from 'randombytes';

import 'yet-another-react-lightbox/styles.css';
import { quicksand } from '@/pages/_app';
import { poppins } from '@/pages/_app';
import BlogGallery from '@/components/blog/bloggallery';
import BlogList from '@/components/blog/bloglist';
import MainCta from '@/components/ctas/MainCta';

const { publicRuntimeConfig } = getConfig();
const { baseApiUrl, baseUrl } = publicRuntimeConfig?.api;

export default function SingleBlogPage({ blog }) {
  const category = blog?.categories?.[0]?.category_id;
  const title = blog?.translations?.[0]?.title;
  const address = blog?.translations?.[0]?.address;
  const description = blog?.translations?.[0]?.description;
  const descriptionFormatted = description?.replace(/(<([^>]+)>)/gi, '');

  return (
    <>
      <Head>
        <title>{'Blog | ' + title}</title>
        <meta name="description" content={descriptionFormatted} />
        <link rel="alternate" href={`${baseUrl}/nl-NL/blog`} hrefLang="nl" />
        <link rel="alternate" href={`${baseUrl}/blog`} hrefLang="en" />
        <meta name="keywords" content={blog?.tags?.join(', ')} />

        <meta property="og:type" content="website" key="metaTypeFb" />
        <meta property="og:title" content={title} key="ogTitle" />
        <meta
          property="og:description"
          content={descriptionFormatted}
          key="ogDescription"
        />
        <meta
          property="og:image"
          content={`${baseApiUrl}/assets/${blog?.img?.id}`}
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
          content={`${baseApiUrl}/assets/${blog?.img?.id}`}
          key="metaImageTw"
        />
      </Head>

      <main
        className={`${quicksand.className} padding-page-top container`}
        style={{ minHeight: '100vh' }}
      >
        {/* {!blog ? ( */}
          {/* <div className="d-flex justify-content-center">
            <div className="spinner-border text_dk_blue" role="status"></div>
          </div>
        ) : ( */}
          <>
            <section className="pt-5">
              <div className="col-12 text-center">
                <h1 className={`${poppins.className} fw-bold text_blue`}>
                  {title}
                </h1>
                <p>{address}</p>
              </div>
              <div className="col-12 pt-4">
                {
                  (blog?.img?.id) ? (
                    <Image
                      src={`${baseApiUrl}/assets/${blog?.img?.id}`}
                      height={blog?.img?.height}
                      width={blog?.img?.width}
                      alt="Image"
                      sizes="100%"
                      style={{ width: '100%', height: 'auto' }}
                    />
                  ) : (
                    ""
                  )
                }

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
              {
                (!blog?.imgs ||  blog?.imgs < 1) ? (
                  ""
                ) : (
                  <BlogGallery data={blog} />
                )
              }
            </section>
            <div className="pb-5">
              <MainCta justify="center" />
            </div>
            {blog?.tags?.length > 0 && (
              <section className="col-12 pt-4">
                <p>
                  Tags:
                  {blog?.tags?.map((tag) => (
                    <span className="badge ms-1 bg_dk_blue" key={randomBytes(4)}>{tag}</span>
                  ))}
                </p>
              </section>
            )}
            <hr />
            <section className="col-12 divider pb-5">
              <BlogList
                selectedCategory={category}
                limit={true}
                limitQ={4}
                currentBlog={blog?.id}
              />
            </section>
            <hr />
          </>
        {/* )} */}
      </main>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params, locale }) {
  try {
    const blogResponse = await axios.get(
      `${baseApiUrl}/items/blog?fields=*.*,imgs.directus_files_id.height,imgs.directus_files_id.width,imgs.directus_files_id.id&filter[slug][_eq]=${params.slug}`
    );

    const blog = blogResponse?.data;

    if (!blog?.data?.length) {
      return {
        redirect: {
          destination: '/blog',
        },
      };
    }
    // Translation filter to locale languages. Need to be array.
    const blogTranslation = blog.data[0];
    blogTranslation.translations = blogTranslation.translations.filter(
      (translation) => translation.languages_code === locale
    );

    return {
      props: {
        blog: blogTranslation,
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
