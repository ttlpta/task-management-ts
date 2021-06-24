import { useForm, FormProvider, SubmitHandler, DefaultValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@material-ui/core';
import { PropsWithChildren } from 'react';
import type { ObjectSchema } from 'yup';
import { Spinner } from '..';
import FormStyled from './FormStyled';

type FormProps<T, S> = PropsWithChildren<{
  defaultValues?: DefaultValues<S>;
  onSubmit: SubmitHandler<T>;
  schema: ObjectSchema<any>;
  loading?: boolean;
}>;
export default function Form<T, S>({
  defaultValues = {} as DefaultValues<S>,
  children,
  onSubmit,
  schema,
  loading,
}: FormProps<T, S>) {
  const methods = useForm({ defaultValues, resolver: yupResolver(schema) });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        {loading && (
          <Box className="loading">
            <Spinner />
          </Box>
        )}
        {children}
      </FormStyled>
    </FormProvider>
  );
}
