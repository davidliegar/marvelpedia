import type { ReactNode } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
}

function Button({ onClick, children, className }: ButtonProps & { className: string }) {
  return (
    <button
      className={`${className} bg-stone-700 hover:bg-stone-900 text-white py-2 px-4 rounded`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
