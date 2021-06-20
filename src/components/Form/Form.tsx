import FormStyled from "./FormStyled";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@material-ui/core";
import { Spinner } from "..";
import { ObjectSchema } from "yup";
import { PropsWithChildren } from "react";

type FormProps<T> = PropsWithChildren<{
  defaultValues: T;
  onSubmit: SubmitHandler<T>;
  schema: ObjectSchema<any>;
  loading?: boolean;
}>;
export default function Form<T>({
  defaultValues,
  children,
  onSubmit,
  schema,
  loading,
}: FormProps<T>) {
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
