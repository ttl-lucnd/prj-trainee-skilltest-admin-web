import { HttpStatus } from '@/utils';
import { IBodyResponse } from '@/utils/interfaces';
import { useRouter } from 'next/navigation';

export const useHttpErrorHandler = () => {
  const router = useRouter();
  const checkError = (response?: IBodyResponse<any>) => {
    if (
      response?.code &&
      [HttpStatus.NOT_FOUND, HttpStatus.ITEM_NOT_FOUND].includes(response.code)
    ) {
      router.replace('/404');
    }
    if (response?.code === HttpStatus.FORBIDDEN) {
      router.replace('/forbidden');
    }
  };
  return { checkError };
};
