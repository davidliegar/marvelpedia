import type { ReactNode } from 'react';

interface ButtonProps {
  onClick?: () => void;
  to?: string
  'data-testid'?: string
  children: ReactNode;
}

function Button({ onClick, children, className, to, "data-testid": dataTestId }: ButtonProps & { className: string }) {
  const classes = `${className} bg-stone-700 hover:bg-stone-900 text-white py-2 px-4 rounded`
  const isButton = <button
    data-testid={dataTestId}
    className={classes}
    onClick={onClick}
  >
    {children}
  </button>

  const isLink = <a  data-testid={dataTestId} className={classes} href={to} target='_blank' rel="noopener noreferrer">
    {children}
  </a>
  
  return (
    to ? isLink : isButton
  )
}

export default Button
