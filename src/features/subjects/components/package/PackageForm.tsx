import { BaseDialog } from '@/components/BaseDialog';
import { usePackageStore } from '../../stores/usePackageStore';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { InputText } from '@/components/form/input';
import { useTranslations } from 'next-intl';
import { createPackageYupResolver } from '../../schema';
import { packageService } from '../../services/package.service';
import { IBodyResponse } from '@/utils/interfaces';
import { FormType, IPackage, IPackageFormBody } from '../../interfaces';
import { toast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useSubjectStore } from '../../stores/useSubjectStore';
import { InputNumber } from '@/components/form/input-number';
import { InputTextArea } from '@/components/form/input-text-area';
import { RadioGroup } from '@/components/form/radio-group';
import { SubscriptionPlatform } from '@/utils';

export function PackageForm() {
  const t = useTranslations();
  const {
    selectedPackage,
    isOpenPackageFormDialog,
    setOpenPackageFormDialog,
    getPackageList,
  } = usePackageStore(
    useShallow((state) => ({
      selectedPackage: state.selectedPackage,
      isOpenPackageFormDialog: state.isOpenPackageFormDialog,
      setOpenPackageFormDialog: state.setOpenPackageFormDialog,
      getPackageList: state.getPackageList,
    })),
  );

  const { selectedSubject } = useSubjectStore(
    useShallow((state) => ({
      selectedSubject: state.selectedSubject,
    })),
  );

  const [formType, setFormType] = useState<FormType>(FormType.CREATE);
  const [loading, setLoading] = useState(false);

  const form = useForm<IPackageFormBody>({
    resolver: createPackageYupResolver,
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  useEffect(() => {
    form.reset({
      name: '',
      subjectId: selectedSubject?.id,
      productId: '',
      description: '',
    });

    const getPackageDetail = async () => {
      const response: IBodyResponse<IPackage> = await packageService._getDetail(
        selectedPackage?.id ?? '',
      );
      if (response.success) {
        form.reset({
          // reload data on database
          name: response.data.name,
          price: response.data.price,
          platform: response.data.platform,
          subjectId: response.data.subjectId,
          durationDays: response.data.durationDays,
          productId: response.data.productId,
          description: response.data.description,
        });
      }
    };

    if (selectedPackage && isOpenPackageFormDialog) {
      setFormType(FormType.UPDATE);
      getPackageDetail();
    }
  }, [isOpenPackageFormDialog, selectedPackage, selectedSubject, setFormType]);

  const onSubmit = async (data: IPackageFormBody) => {
    if (loading) return;
    try {
      setLoading(true);
      const response: IBodyResponse<IPackage> = selectedPackage
        ? await packageService.updatePackage(selectedPackage.id, data)
        : await packageService.createPackage(data);

      if (response.success) {
        setOpenPackageFormDialog(false);
        toast({
          title: t(`common.messages.${formType}_success`),
          variant: 'success',
        });
        getPackageList();
        return;
      }
      if (response?.errors) {
        const title =
          response?.errors[0]?.errorMessage ?? t(`common.messages.${formType}_failed`);

        toast({
          title,
          variant: 'destructive',
        });
      }
    } catch {
      setOpenPackageFormDialog(false);
      toast({
        title: t('common.messages.error'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseDialog
      open={isOpenPackageFormDialog}
      onOpenChange={setOpenPackageFormDialog}
      showCloseButton={false}
      title={t(`packages.title.${formType}`)}
      className="max-w-[500px] max-h-[calc(100vh-2rem)] pb-0"
      headerClassName="block"
    >
      <div className="flex flex-col items-start justify-end gap-2.5 pb-2">
        <Form {...form} key={formType}>
          <InputText
            key={'name'}
            name="name"
            control={form.control}
            label={t('packages.form.name')}
            placeholder={t('packages.form.name')}
            layout="vertical"
            className="w-full"
            onChange={() => form.clearErrors('name')}
            required
          />
          <RadioGroup
            key={'platform'}
            control={form.control}
            name="platform"
            isHorizontalItem
            label={t('packages.form.platform')}
            items={Object.values(SubscriptionPlatform).map((item) => ({
              value: item,
              label: t(`common.subscriptionPlatform.${item}`),
            }))}
          />
          <InputText
            key={'productId'}
            name="productId"
            control={form.control}
            label={t('packages.form.productId')}
            placeholder={t('packages.form.productId')}
            layout="vertical"
            className="w-full"
            onChange={() => form.clearErrors('productId')}
            required
          />
          <InputNumber
            key={'price'}
            name="price"
            control={form.control}
            label={t('packages.form.price')}
            placeholder={t('packages.form.price')}
            layout="vertical"
            className="w-full"
            onChange={() => form.clearErrors('price')}
            suffix={t('common.priceUnit')}
            required
          />
          <InputNumber
            key={'durationDays'}
            name="durationDays"
            control={form.control}
            label={t('packages.form.durationDays')}
            placeholder={t('packages.form.durationDays')}
            layout="vertical"
            className="w-full"
            onChange={() => form.clearErrors('durationDays')}
            suffix={t('common.date.day')}
            required
          />
          <InputTextArea
            key={'description'}
            name="description"
            control={form.control}
            label={t('packages.form.description')}
            placeholder={t('packages.form.description')}
            layout="vertical"
            className="w-full"
            onChange={() => form.clearErrors('description')}
          />
        </Form>
      </div>
      <div
        className={cn(
          'w-full pb-6 flex gap-2.5 bg-white justify-center pt-2 sticky left-0 bottom-0',
        )}
      >
        <Button
          variant="outline"
          className="w-[120px] h-[40px]"
          onClick={() => setOpenPackageFormDialog(false)}
          disabled={loading}
        >
          {t('common.buttons.cancel')}
        </Button>
        <Button
          type="submit"
          className="w-[120px] h-[40px]"
          onClick={form.handleSubmit(onSubmit)}
          disabled={!form.formState.isDirty || !form.formState.isValid}
          loading={loading}
        >
          {t(`common.buttons.${formType === FormType.CREATE ? 'add' : 'save'}`)}
        </Button>
      </div>
    </BaseDialog>
  );
}
