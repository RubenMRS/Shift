import logo from '../../assets/logo.png';

export function Brand({ variant = 'horizontal' }: { variant?: 'horizontal' | 'full' | 'icon' }) {
  return (
    <img
      src={logo}
      alt="SHIFT Solutions"
      className={variant === 'full' ? 'h-14 w-auto object-contain' : 'h-10 w-auto object-contain sm:h-11'}
    />
  );
}
