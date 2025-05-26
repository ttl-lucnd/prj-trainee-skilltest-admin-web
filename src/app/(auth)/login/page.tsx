import { LoginPage } from '@/features/auth/login/pages/LoginPage';
import { PageRouter } from '@/utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;
    if (refreshToken) {
      redirect(PageRouter.QUIZ_MANAGEMENT);
    } else {
      return <LoginPage />;
    }
}
