import { HeaderContext } from '@tanstack/react-table';

interface IndexHeaderProps extends HeaderContext<any, unknown> {
  text: string;
}

export function IndexHeader({ text }: Readonly<IndexHeaderProps>) {
  return <div className="text-center">{text}</div>;
}
