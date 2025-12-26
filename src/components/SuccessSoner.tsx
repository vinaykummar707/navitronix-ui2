'use client'

import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

const SolidSuccessSonnerDemo = ({text}) => {
  return (
    <Button
      variant='outline'
      onClick={() =>
        toast.success(text, {
          style: {
            '--normal-bg': 'light-dark(var(--color-green-600), var(--color-green-400))',
            '--normal-text': 'var(--color-white)',
            '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
          } as React.CSSProperties
        })
      }
    >
      Solid Success Toast
    </Button>
  )
}

export default SolidSuccessSonnerDemo
