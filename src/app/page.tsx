import { PageRouter } from '@/utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;
  if (refreshToken) {
    redirect(PageRouter.QUIZ_MANAGEMENT);
  } else {
    redirect(PageRouter.LOGIN);
  }
}
