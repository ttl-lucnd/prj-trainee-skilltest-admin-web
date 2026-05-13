import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useRef, useState, useEffect, CSSProperties } from 'react';

type TruncatedTextProps = {
  text: string;
  className?: string;
  tooltipClassName?: string;
  isMultipleLines?: boolean;
  style?: CSSProperties;
};

export function TruncatedText({
  text,
  className,
  tooltipClassName,
  isMultipleLines = false,
  style,
}: Readonly<TruncatedTextProps>) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const checkTruncate = () => {
      if (textRef.current) {
        const {
          scrollWidth,
          clientWidth,
          offsetWidth,
          scrollHeight,
          clientHeight,
          offsetHeight,
        } = textRef.current;

        if (!isMultipleLines) {
          setIsTruncated(scrollWidth > Math.max(clientWidth, offsetWidth));
        } else {
          setIsTruncated(scrollHeight > Math.max(clientHeight, offsetHeight));
        }
      }
    };

    checkTruncate(); // Kiểm tra ngay khi mount

    const resizeObserver = new ResizeObserver(checkTruncate);
    if (textRef.current) {
      resizeObserver.observe(textRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [text]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          ref={textRef}
          className={cn(
            'block w-full overflow-hidden text-ellipsis break-words',
            !isMultipleLines && 'whitespace-nowrap',
            className,
          )}
          style={style}
        >
          {text}
        </span>
      </TooltipTrigger>
      {isTruncated && (
        <TooltipPortal>
          <TooltipContent
            className={cn(
              'break-words whitespace-normal max-w-xs md:max-w-md lg:max-w-lg',
              tooltipClassName,
            )}
          >
            <p>{text}</p>
          </TooltipContent>
        </TooltipPortal>
      )}
    </Tooltip>
  );
}
