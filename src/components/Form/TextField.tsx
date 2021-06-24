import { TextFieldProps } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';
import TextField from '../TextField/TextField';

type TextFieldFormProps = TextFieldProps & {
  name: string;
};
export default function TextFieldForm({ name, ...props }: TextFieldFormProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { ref, ...methods } = register(name);

  return (
    <TextField
      helperText={!!errors[name] && errors[name].message}
      inputRef={ref}
      error={!!errors[name]}
      variant="outlined"
      {...methods}
      {...props}
    />
  );
}
