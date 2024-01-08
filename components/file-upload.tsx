'use client'

import React from 'react'
import { X } from 'lucide-react'
import Image from 'next/image'
import { UploadDropzone } from '@/lib/uploadThing'
import '@uploadthing/react/styles.css'

// where did this come from?

interface FileUploadProps {
  endpoint: 'messageFile' | 'serverImage'
  value: string
  onChange: (url?: string) => void
  // in initial-modal.ts, <FormField onChange={field.onChange},
  // the type shown in red-error msg is the type of field wala "onchange" and key/prop wala onChange
}

const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
  // if value is truthy => we have something uploaded which is ready to be rendered
  const fileType = value?.split('.').pop() // ."pdf" or an image format is returned without dot.
  if (value && fileType !== 'pdf') {
    // for sure, an image is uploaded
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange('')}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }
  // else don't render the pdf
  // OR else just render the UploadThing's std. icon, returned below = means nothing uploaded
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
      }}
      onUploadError={(error: Error) => {
        console.log(error)
      }}
    />
  )
}
// UploadDropzone details???
export default FileUpload
