import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
