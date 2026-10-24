'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'

type Img = { src: string; alt: string }

export function Gallery({ images, name }: { images: Img[]; name: string }) {
  const [i, setI] = useState(0)
  const dialog = useRef<HTMLDialogElement>(null)
  const go = useCallback((d: number) => setI((v) => (v + d + images.length) % images.length), [images.length])

  // Arrow keys work while the fullscreen view is open.
  useEffect(() => {
    const el = dialog.current
    if (!el) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    el.addEventListener('keydown', onKey)
    return () => el.removeEventListener('keydown', onKey)
  }, [go])

  const current = images[i]
  const arrow =
    'absolute top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors duration-150 active:scale-90'

  return (
    <div>
      <div className="relative group">
        <div className="absolute inset-0 bg-[#fcb345] translate-x-2 translate-y-2 sm:translate-x-3 sm:translate-y-3" aria-hidden />
        <div className="relative border-[3px] border-black bg-white overflow-hidden aspect-[16/10]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={current.src}
            src={current.src}
            alt={current.alt}
            width={1600}
            height={1000}
            fetchPriority={i === 0 ? 'high' : undefined}
            className="w-full h-full object-cover object-top animate-[fadein_.25s_ease-out]"
          />
          {images.length > 1 && (
            <>
              <button type="button" onClick={() => go(-1)} className={`${arrow} left-2 sm:left-3`} aria-label="Previous image">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button type="button" onClick={() => go(1)} className={`${arrow} right-2 sm:right-3`} aria-label="Next image">
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => dialog.current?.showModal()}
            className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 border-2 border-black bg-white text-[11px] font-black uppercase tracking-wider text-black hover:bg-black hover:text-white transition-colors"
            aria-label="View image fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5" /> {i + 1}/{images.length}
          </button>
        </div>
      </div>
      <p className="mt-5 sm:mt-6 text-xs sm:text-sm text-black/55">{current.alt}</p>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-3" role="tablist" aria-label={`${name} screenshots`}>
          {images.map((img, idx) => (
            <button
              key={img.src}
              type="button"
              role="tab"
              aria-selected={idx === i}
              aria-label={`Show screenshot ${idx + 1}: ${img.alt}`}
              onClick={() => setI(idx)}
              className={`relative aspect-[16/10] overflow-hidden border-2 border-black transition-all duration-150 ${
                idx === i ? 'shadow-[3px_3px_0_0_#000] -translate-x-0.5 -translate-y-0.5 ring-2 ring-[#fcb345]' : 'opacity-60 hover:opacity-100'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt="" width={320} height={200} loading="lazy" className="w-full h-full object-cover object-top" />
            </button>
          ))}
        </div>
      )}

      <dialog
        ref={dialog}
        className="m-auto max-w-none max-h-none w-screen h-screen bg-transparent backdrop:bg-black/90 p-0"
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        aria-label={`${name} screenshot viewer`}
      >
        <div className="w-full h-full flex items-center justify-center p-3 sm:p-10" onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}>
          <div className="relative max-w-6xl w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.src} alt={current.alt} className="w-full h-auto border-[3px] border-white" />
            <p className="mt-3 text-sm text-white/80">{current.alt}</p>
            {images.length > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} className={`${arrow} -left-1 sm:-left-14`} aria-label="Previous image">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button type="button" onClick={() => go(1)} className={`${arrow} -right-1 sm:-right-14`} aria-label="Next image">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center border-2 border-white bg-black text-white hover:bg-white hover:text-black transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </dialog>
    </div>
  )
}
