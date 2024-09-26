import Link from 'next/link';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import axios from 'axios';

import BlogCard from './blogcard';
import { poppins } from '@/pages/_app';

const { publicRuntimeConfig } = getConfig();
const { baseApiUrl } = publicRuntimeConfig?.api;

export default function BlogList({
  selectedCategory,
  limit = true,
  limitQ,
  currentBlog,
}) {
  const [blogs, setBlogs] = useState([]);
  const categorySlug = blogs?.[0]?.categories?.[0]?.category_id?.slug;
  const { locale } = useRouter();
  const intl = useIntl();

  useEffect(() => {
    getBlogs(selectedCategory);
  }, [selectedCategory, locale]);

  const getBlogs = async (selectedCategory) => {
    try {
      const blogsResponse = await axios.get(
        `${baseApiUrl}/items/blog?fields=*,translations.*,categories.category_id.*.*,img.*${
          (selectedCategory) ? (
            `&filter[categories][category_id][_eq]=${selectedCategory}`
          ) : (
            ""
          )
        }&sort=-date_updated${
          (limit) ? 
          `&limit=${limitQ}` : 
          ''
        }`
      );

      const blogData = blogsResponse?.data?.data || [];

      const translatedBlogs = blogData.map((blog) => {
        const filteredTranslations = blog.translations.filter(
          (translation) => translation.languages_code === locale
        );

        return {
          ...blog,
          translations: filteredTranslations,
        };
      });

      setBlogs(translatedBlogs);
    } catch (err) {
      console.log('Error fetching data:', err);
    }
  };

  const filteredData = blogs
    .filter((blog) => (blog.id !== currentBlog));

  return (
    <>
      {limitQ > 3 && filteredData.length > 0 && (
        <h2 className={`${poppins.className} text_blue text-center`}>
          {intl.formatMessage({ id: 'blog.otherblogs' })}
        </h2>
      )}
      <div className="row fade-in">
        {filteredData.map((blog) => (
          <BlogCard data={blog} key={blog.id} />
        ))}
      </div>
      {/* {limit && filteredData.length > 0 && (
        <div className="pt-3">
          <Link href={`/blog/category/${categorySlug}`}>
            <div className="row px-3 px-3 mt-auto">
              <div className="btn btn-lg btn-block btn-outline mt-3">
                {intl.formatMessage({ id: 'blog.readmore' })}
              </div>
            </div>
          </Link>
        </div>
      )} */}
    </>
  );
}
