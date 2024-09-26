import { useState, useEffect } from 'react';
import axios from 'axios';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import Link from 'next/link';

const { publicRuntimeConfig } = getConfig();
const { baseApiUrl } = publicRuntimeConfig.api;

export default function Categories({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { locale } = useRouter();

  useEffect(() => {
    getCategories();
  }, [locale]);

  useEffect(() => {
    if (categories.length > 0 && selectedCategory == null) {
      // setSelectedCategory(categories[0].id);
      // onCategorySelect(categories[0].id);
    }
  }, [categories, selectedCategory, onCategorySelect]);

  const getCategories = async () => {
    try {
      const categoriesResponse = await axios.get(
        `${baseApiUrl}/items/category?fields=*.*`
      );
      const categoriesData = categoriesResponse?.data?.data || [];

      const translatedCategories = categoriesData.map((cat) => {
        const filteredTranslations = cat.translations.filter(
          (translation) => translation.languages_code === locale
        );

        return {
          ...cat,
          translations: filteredTranslations,
        };
      });

      setCategories(translatedCategories);
    } catch (err) {
      // console.log(err);
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    onCategorySelect(categoryId);
  };

  return (
    <div className="col-12 text-center">
      {categories.length === 0 ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text_dk_blue" role="status"></div>
        </div>
      ) : (
        <div className="fade-in">
          {categories.map((category) => (
            <Link
              href={`/blog/category/${category?.slug}`}
              className={`btn btn-outline btn-lg m-1`}
              key={category.id}
            >
              {category.translations[0].title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
