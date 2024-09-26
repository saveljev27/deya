import Image from 'next/image';
import Link from 'next/link';
import getConfig from 'next/config';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';

const { publicRuntimeConfig } = getConfig();
const { baseApiUrl } = publicRuntimeConfig?.api;

export default function BlogCard({ data }) {
  const intl = useIntl();
  const { locale } = useRouter();
  // console.log(data?.categories?.[0]?.category_id?.translations);
  
  const categories = data?.categories?.[0]?.category_id?.translations;
  const categoryName = categories
    .filter(
      (translation) => translation.languages_code === locale
    )[0]?.title;

  console.log(categoryName);
  
  const title = data?.translations?.[0]?.title;
  const description = data?.translations?.[0]?.description;
  const descriptionFormatted = description
    .replace(/(<([^>]+)>)/gi, '')
    .substring(0, 94);

  return (
    <Link
      key={data?.id}
      href={`/blog/${data?.slug}`}
      className="col-12 col-md-4 pt-3 d-flex align-items-stretct"
    >
      <div className="card">
        <div className="card_img_container position-relative">
          {
            (data?.img?.id) ? (
              <Image
                src={`${baseApiUrl}/assets/${data?.img?.id}`}
                fill
                style={{ objectFit: 'cover' }}
                alt={`${data?.slug}`}
                sizes="100%"
              />
            ) : (
              ""
            )
          }

          {
            (categoryName) ? (
              <div className="category-overlay position-absolute p-2 bg_dk_blue text-white">
                {categoryName}
              </div>
            ) : (
              ""
            )
          }

        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <h6>{data?.address}</h6>
          <p
            className="card-text"
            dangerouslySetInnerHTML={{
              __html: descriptionFormatted,
            }}
          />
          <div className="row px-3 px-3 mt-auto">
            <div className="btn btn-lg btn-block btn-outline mt-3">
              {intl.formatMessage({ id: 'blog.readmore' })}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
