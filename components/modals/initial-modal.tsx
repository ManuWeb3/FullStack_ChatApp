'use client'
// this will have Form and lot of user interactivity with browser and, hence, a Client-Component
// 3 part party - all 3 work together - tightly synced
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import FileUpload from '@/components/file-upload'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Chat-Group name is required.',
  }),
  imageUrl: z.string().min(1, {
    message: 'Chat-Group image is required.',
  }),
})

export const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const form = useForm({
    resolver: zodResolver(formSchema), // connected 1,2,3 @ Pg. No. 79 (Blue - FirstClass notebook)
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  // async bcz of using axios
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // STEPS to follow onSubmit
      axios.post('/api/servers', values)
      // clear 3 things
      form.reset() // reset the form values => state (and subscription?)
      router.refresh()
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
    // console.log(values)
    // Both the Group-name and URL values entered in the form are logged on browser's console.
    // bcz it's a part of React Comp. being rendered on client.
  }

  if (!isMounted) {
    return null
  }

  return (
    <Dialog open>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
            Customize your Chat-Group
          </DialogTitle>
          <DialogDescription className="pb-2 text-center text-zinc-400">
            <p>Give your Group a name and an image.</p>
            You can always change it later.
          </DialogDescription>
        </DialogHeader>
        {/* Place the form right here */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="serverImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Group Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter Chat-Group Name"
                        className="bg-zinc-300/50 text-black border-0 
                        focus-visible:ring-1 focus-visible:ring-offset-1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button disabled={isLoading} variant="primary">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
