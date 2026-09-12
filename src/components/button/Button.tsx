import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import type { MouseEventHandler, ReactNode } from 'react';

import './Button.css';

type ButtonVariant = 'primary' | 'secondary' | 'olive' | 'oliveOutline';
type ButtonShape = 'rounded' | 'pill';
type ButtonIconPosition = 'start' | 'end';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  shape?: ButtonShape;
  icon?: StaticImageData | string;
  /** 아이콘 위치 (기본: 텍스트 앞) */
  iconPosition?: ButtonIconPosition;
  /** 아이콘 크기 등 예외 스타일용 */
  iconClassName?: string;
  /** 있으면 Link로 렌더 */
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}

const Button = ({
  children,
  variant = 'primary',
  shape = 'rounded',
  icon,
  iconPosition = 'start',
  iconClassName,
  href,
  onClick,
  type = 'button',
  disabled = false,
  className,
}: ButtonProps) => {
  const classNames = [
    'button',
    `button--${variant}`,
    `button--${shape}`,
    disabled ? 'is-disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconClassNames = ['button__icon', iconClassName].filter(Boolean).join(' ');

  const iconNode = icon ? (
    <Image
      className={iconClassNames}
      src={icon}
      alt=""
      aria-hidden="true"
    />
  ) : null;

  const content = (
    <>
      {iconPosition === 'start' ? iconNode : null}
      {children}
      {iconPosition === 'end' ? iconNode : null}
    </>
  );

  if (href) {
    if (disabled) {
      return (
        <span className={classNames} aria-disabled="true">
          {content}
        </span>
      );
    }

    return (
      <Link className={classNames} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classNames}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Button;
