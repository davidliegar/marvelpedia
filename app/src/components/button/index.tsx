import type { ReactNode } from 'react';
import { StyledButton, StyledLink } from './styles';

interface ButtonProps {
  onClick?: () => void;
  to?: string
  'data-testid'?: string
  children: ReactNode;
}

function Button({ onClick, children, className, to, "data-testid": dataTestId }: ButtonProps & { className?: string }) {
  
  const isButton = <StyledButton
    data-testid={dataTestId}
    onClick={onClick}
  >
    {children}
  </StyledButton>,

   isLink = <StyledLink data-testid={dataTestId} className={className} href={to} target='_blank' rel="noopener noreferrer">
    {children}
  </StyledLink>
  
  return (
    to ? isLink : isButton
  )
}

export default Button
