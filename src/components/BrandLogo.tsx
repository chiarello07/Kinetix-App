import { cn } from '@/lib/utils'

export function BrandLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-8 h-8', className)}
    >
      <path d="M25 20 L55 80 H40 L10 20 H25Z" fill="#8A56F7" />
      <path d="M75 20 L45 80 H60 L90 20 H75Z" fill="#CB6EE6" />
      <path d="M25 80 L55 20 H40 L10 80 H25Z" fill="#8A56F7" fillOpacity="0.6" />
      <path d="M75 80 L45 20 H60 L90 80 H75Z" fill="#CB6EE6" fillOpacity="0.6" />
    </svg>
  )
}
