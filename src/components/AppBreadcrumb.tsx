import Link from 'next/link';
import { Fragment } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';
import { useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import { TruncatedText } from './TruncateText';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isKeepOrigin?: boolean;
}

interface AppBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function AppBreadcrumb({ items }: Readonly<AppBreadcrumbProps>) {
  const t = useTranslations();
  //remove all empty item
  const filteredItems = items.filter((item) => item.label);
  const lastItem = filteredItems[filteredItems.length - 1];
  return (
    <>
      <div className="flex items-end gap-2.5 w-auto">
        <Breadcrumb>
          <BreadcrumbList>
            {filteredItems.slice(0, filteredItems.length - 1).map((item) =>
              item.label ? (
                <Fragment key={item.label}>
                  <BreadcrumbItem>
                    <BreadcrumbLink className="text-body-md font-bold" asChild>
                      <Link
                        href={item.href ?? '/'}
                        className="max-w-[200px] truncate text-textDefaultColor"
                      >
                        {item.isKeepOrigin ? item.label : t(`${item.label}`)}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight className="text[#CBD5E1]" size={14} />
                  </BreadcrumbSeparator>
                </Fragment>
              ) : null,
            )}
            {lastItem.label && (
              <Fragment>
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    <TruncatedText
                      className="max-w-[200px] text-body-md font-bold"
                      style={{ color: '#2665EF' }}
                      text={
                        lastItem.isKeepOrigin ? lastItem.label : t(`${lastItem.label}`)
                      }
                    />
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </Fragment>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </>
  );
}
