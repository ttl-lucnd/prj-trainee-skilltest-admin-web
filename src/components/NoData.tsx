import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface IProps {
  className?: string;
  text?: string;
}
function NoData(props: Readonly<IProps>) {
  const { className, text } = props;
  const t = useTranslations();
  return (
    <div
      className={cn('no-data-wrapper ant-empty ant-empty-normal', className)}
      data-testid="no-data"
    >
      <div className="flex items-center justify-center">
        <svg
          width="64"
          height="40"
          viewBox="0 0 64 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2039_109464)">
            <path
              d="M32 39.7031C49.6731 39.7031 64 36.5923 64 32.755C64 28.9177 49.6731 25.807 32 25.807C14.3269 25.807 0 28.9177 0 32.755C0 36.5923 14.3269 39.7031 32 39.7031Z"
              fill="#EAECF0"
            />
            <path
              d="M55 13.6653L44.854 2.24866C44.367 1.47048 43.656 1 42.907 1H21.093C20.344 1 19.633 1.47048 19.146 2.24767L9 13.6663V22.8367H55V13.6653Z"
              stroke="#D0D5DD"
            />
            <path
              d="M41.613 16.8127C41.613 15.2197 42.607 13.9045 43.84 13.9035H55V31.9059C55 34.0131 53.68 35.7402 52.05 35.7402H11.95C10.32 35.7402 9 34.0121 9 31.9059V13.9035H20.16C21.393 13.9035 22.387 15.2167 22.387 16.8098V16.8316C22.387 18.4247 23.392 19.7111 24.624 19.7111H39.376C40.608 19.7111 41.613 18.4128 41.613 16.8197V16.8127Z"
              fill="#F2F4F7"
              stroke="#D0D5DD"
            />
          </g>
          <defs>
            <clipPath id="clip0_2039_109464">
              <rect width="64" height="40" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="ant-empty-description text-label-1 text-textLabelColor text-center mt-3">
        {text ?? t('common.noData')}
      </div>
    </div>
  );
}

export default NoData;
