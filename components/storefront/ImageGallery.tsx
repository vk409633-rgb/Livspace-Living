"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ImageGalleryProps {
    images: string[]
    name: string
}

export function ImageGallery({ images, name }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0)

    const displayImages = images.length > 0 ? images : ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"]

    return (
        <div className="flex flex-col gap-4">
            <div className="relative aspect-square overflow-hidden rounded-lg border bg-slate-50">
                <Image
                    src={displayImages[selectedImage]}
                    alt={name}
                    fill
                    className="object-contain p-4"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>

            {displayImages.length > 1 && (
                <div className="flex gap-4 overflow-auto pb-2">
                    {displayImages.map((image, index) => (
                        <button
                            key={index}
                            className={cn(
                                "relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-md border bg-slate-50",
                                selectedImage === index && "ring-2 ring-primary ring-offset-2"
                            )}
                            onClick={() => setSelectedImage(index)}
                        >
                            <Image
                                src={image}
                                alt={`${name} ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="80px"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
