import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFoundPage({
  showButton = true,
}: Readonly<{ showButton?: boolean }>) {
  const t = useTranslations('error');
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="text-center">
          <h2 className="mb-8 font-extrabold text-9xl">
            <span className="sr-only">Error</span>{t('notFound.title')}
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            {showButton
              ? t('notFound.messageWithButton')
              : t('notFound.messageWithoutButton')}
          </p>
          <p className="mt-4 mb-8 ">
            {t('notFound.description')}
          </p>
          {showButton && (
            <Link
              href="/"
              className="bg-primary-2 text-white px-4 py-3 rounded-md hover:bg-primary-2/80"
            >
              {t('notFound.button')}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
