import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
interface ButtonProps {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}
const Button = ({
  children,
  href,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) => {
  const baseClasses =
    'relative inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden'
  const variantClasses = {
    primary:
      'bg-gradient-to-r from-[#f1c235] to-[#f1c235] text-black shadow-lg hover:shadow-[#f1c235]/25',
    secondary:
      'bg-gradient-to-r from-[#f1c235] to-[#f1c235] text-black shadow-lg hover:shadow-[#f1c235]/25',
    outline:
      'border-2 border-black text-black hover:text-white hover:bg-black shadow-lg hover:shadow-black/25',
  }
  const allClasses = `${baseClasses} ${variantClasses[variant]} ${className}`
  const buttonContent = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{
          scale: 0,
          opacity: 0,
        }}
        whileHover={{
          scale: 1,
          opacity: 0.15,
        }}
        transition={{
          duration: 0.3,
        }}
      />
    </>
  )
  if (href) {
    return (
      <Link href={href} className={allClasses} aria-disabled={disabled}>
        {buttonContent}
      </Link>
    )
  }
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={allClasses}
      disabled={disabled}
      whileTap={{
        scale: 0.98,
      }}
    >
      {buttonContent}
    </motion.button>
  )
}
export default Button
