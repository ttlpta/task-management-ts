import { ButtonProps } from '@material-ui/core';

import ButtonStyled from './ButtonStyled';

type Props = ButtonProps & {
  label: string;
};
export default function Button({ label, ...props }: Props) {
  return (
    <ButtonStyled variant="outlined" {...props}>
      {label}
    </ButtonStyled>
  );
}
