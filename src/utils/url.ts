import { useRouter, useSearchParams } from 'next/navigation';
import { DEFAULT_LIMIT, DEFAULT_FIRST_PAGE } from './constants';

type UrlQueryObject = Record<string, string | string[] | number>;

export const useUpdateUrlWithQuery = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateUrlWithQuery = (query: Record<string, any>, currentPath?: string) => {
    const current = new URLSearchParams(Array.from(searchParams?.entries()));

    // Update or add new parameters
    Object.entries(query).forEach(([key, value]) => {
      if (
        value === undefined ||
        value === null ||
        value === '' ||
        (Array.isArray(value) && !value?.length)
      ) {
        // Remove all array parameters for this key
        const keys = Array.from(current.keys());
        keys.forEach((k) => {
          if (k.startsWith(`${key}[`)) {
            current.delete(k);
          }
        });
        current.delete(key);
      } else if (Array.isArray(value)) {
        // Handle array values by creating multiple parameters with []
        // First remove all existing array parameters for this key
        const keys = Array.from(current.keys());
        keys.forEach((k) => {
          if (k === `${key}[]`) {
            current.delete(k);
          }
        });
        // Then add the new values
        value.forEach((v) => {
          current.append(`${key}[]`, String(v));
        });
      } else {
        current.set(key, String(value));
      }
    });

    // Create new URL with updated parameters
    const search = current.toString();
    const queryString = search ? `?${search}` : '';
    const newUrl = `${currentPath ?? window.location.pathname}${queryString}`;

    // Update URL without reloading the page
    router.push(newUrl);
  };

  const getQueryFromUrl = (havePagination = true): UrlQueryObject => {
    const query: UrlQueryObject = {};
    const arrayQuery = -2;

    // Handle array parameters
    searchParams?.forEach((value, key) => {
      if (key.endsWith('[]')) {
        const baseKey = key.slice(0, arrayQuery);
        query[baseKey] = searchParams.getAll(key);
      } else {
        query[key] = value;
      }
    });

    if (havePagination) {
      query.page = query.page ? Number(query.page) : DEFAULT_FIRST_PAGE;
      query.limit = query.limit ? Number(query.limit) : DEFAULT_LIMIT;
    }
    return query;
  };

  return { updateUrlWithQuery, getQueryFromUrl };
};
