import { CardProps } from '@material-ui/core';
import { PropsWithChildren } from 'react';
import CardStyled from './CardStyled';

type Props = PropsWithChildren<CardProps>;
export default function Card({ children, ...props }: Props) {
  return (
    <CardStyled variant="outlined" {...props}>
      {children}
    </CardStyled>
  );
}
