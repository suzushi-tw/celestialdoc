'use client'
import {
  ChevronDown,
  ChevronUp,
  Loader2,
  RotateCw,
  Search,
} from 'lucide-react'
import { Document, Page, pdfjs } from 'react-pdf'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import { useToast } from './ui/use-toast'

import { useResizeDetector } from 'react-resize-detector'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { useState } from 'react'

import { Form, useForm } from 'react-hook-form'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

import SimpleBar from 'simplebar-react'
import PdfFullscreen from './PdfFullscreen'
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from './ui/card'


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface PdfRendererProps {
  url: string
  fileId: string
}



const PdfRenderer = ({ url, fileId }: PdfRendererProps) => {
  const { toast } = useToast()

  const [numPages, setNumPages] = useState<number>()
  const [currPage, setCurrPage] = useState<number>(1)
  const [scale, setScale] = useState<number>(1)
  const [rotation, setRotation] = useState<number>(0)
  const [renderedScale, setRenderedScale] = useState<
    number | null
  >(null)
  const isLoading = renderedScale !== scale
  const CustomPageValidator = z.object({
    page: z
      .string()
      .refine(
        (num) => Number(num) > 0 && Number(num) <= numPages!
      ),
  })
  type TCustomPageValidator = z.infer<
    typeof CustomPageValidator
  >
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCustomPageValidator>({
    defaultValues: {
      page: '1',
    },
    resolver: zodResolver(CustomPageValidator),
  })
  const { width, ref } = useResizeDetector();
  const handlePageSubmit = ({
    page,
  }: TCustomPageValidator) => {
    setCurrPage(Number(page))
    setValue('page', String(page))
  }

  return (
    
      <div className='w-full bg-white rounded-md shadow flex flex-col items-center '>
        <div className='h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2'>
          <div className='flex items-center gap-1.5'>
            <Button
              disabled={currPage <= 1}
              onClick={() => {
                setCurrPage((prev) =>
                  prev - 1 > 1 ? prev - 1 : 1
                )
                setValue('page', String(currPage - 1))
              }}
              variant='ghost'
              aria-label='previous page'>
              <ChevronDown className='h-4 w-4' />
            </Button>

            <div className='flex items-center gap-1.5'>
              <Input
                {...register('page')}
                className={cn(
                  'w-12 h-8',
                  errors.page && 'focus-visible:ring-red-500'
                )}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(handlePageSubmit)()
                  }
                }}
              />
              <p className='text-zinc-700 text-sm space-x-1'>
                <span>/</span>
                <span>{numPages ?? 'x'}</span>
              </p>
            </div>

            <Button
              disabled={
                numPages === undefined ||
                currPage === numPages
              }
              onClick={() => {
                setCurrPage((prev) =>
                  prev + 1 > numPages! ? numPages! : prev + 1
                )
                setValue('page', String(currPage + 1))
              }}
              variant='ghost'
              aria-label='next page'>
              <ChevronUp className='h-4 w-4' />
            </Button>


          </div>

          <div className='space-x-2'>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className='gap-1.5'
                  aria-label='zoom'
                  variant='ghost'>
                  <Search className='h-4 w-4' />
                  {scale * 100}%
                  <ChevronDown className='h-3 w-3 opacity-50' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onSelect={() => setScale(1)}>
                  100%
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setScale(1.5)}>
                  150%
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setScale(2)}>
                  200%
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setScale(2.5)}>
                  250%
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              onClick={() => setRotation((prev) => prev + 90)}
              variant='ghost'
              aria-label='rotate 90 degrees'>
              <RotateCw className='h-4 w-4' />
            </Button>

            <PdfFullscreen fileUrl={url} />
          </div>
        </div>

        <div className='flex-1 w-full max-h-[calc(100vh-10rem)]'>
          <SimpleBar
            autoHide={false}
            className='max-h-[calc(100vh-10rem)]'>
            <div ref={ref}>
              <Document
                loading={
                  <div className='flex justify-center'>
                    <Loader2 className='my-24 h-6 w-6 animate-spin' />
                  </div>
                }
                onLoadError={() => {
                  toast({
                    title: 'Error loading PDF',
                    description: 'Please try again later',
                    variant: 'destructive',
                  })
                }}
                onLoadSuccess={({ numPages }) =>
                  setNumPages(numPages)
                }
                file={url}
                className='max-h-full'>
                {/* Modified: Dynamically render all pages based on numPages */}
                <ScrollArea className='h-[calc(100vh-10rem)] '>
                  {Array.from(new Array(numPages), (el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      scale={scale}
                      rotate={rotation}
                      width={width ? width : 1}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  ))}
                </ScrollArea>

              </Document>
            </div>
          </SimpleBar>
        </div>
      </div>

  )
}

export default PdfRenderer
