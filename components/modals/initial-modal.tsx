'use client'
// this will have Form and lot of user interactivity with browser and, hence, a Client-Component
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'

export const InitialModal = () => {
  const form = useForm({
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  })
  return (
    <Dialog open>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
            Customize your server
          </DialogTitle>
          <DialogDescription className="pb-2 text-center text-zinc-300">
            Give your server a name and an image. You can always change it
            later.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
