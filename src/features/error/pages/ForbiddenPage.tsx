import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function ForbiddenPage() {
  const t = useTranslations('error');
  return (
    <section className="w-full flex flex-col justify-center items-center">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
            <span className="sr-only">Error</span>{t('forbidden.title')}
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            {t('forbidden.message')}
          </p>
          <p className="mt-4 mb-8 dark:text-gray-600">
            {t('forbidden.description')}
          </p>
          <Link
            href="/"
            className="bg-primary-2 text-white px-4 py-2 rounded-md hover:bg-primary-2/80"
          >
            {t('forbidden.button')}
          </Link>
        </div>
      </div>
    </section>
  );
}
