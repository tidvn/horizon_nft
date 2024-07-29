

"use client";
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/common/icon"
import { useRef, useState } from "react";
import Image from "next/image"
import { cn } from "@/utils";

export default function ImagePicker() {
    const [imageBlob, setImageBlob] = useState<string>('');
    const [isHover, setIsHover] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };


    const handleAddImage = (event: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        let file: File | null = null;

        if (event.type === 'drop' && 'dataTransfer' in event) {
            file = event.dataTransfer.files[0];
        } else if (event.type === 'change' && 'target' in event) {
            file = (event.target as HTMLInputElement).files?.[0] || null;
        }

        if (file) {
            const blobUrl = URL.createObjectURL(file);
            setImageBlob(blobUrl);
        } else {
            setImageBlob("");
        }
    };




    return (

        <div className="flex flex-col items-center justify-center gap-6 p-8 md:p-12">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Upload Images</h2>
                <p className="text-gray-500 dark:text-gray-400">Drag and drop your images here or click to browse.</p>
            </div>
            {imageBlob ? (<div className={`mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px] bg-slate-50 `}>
                <div
                    className={cn(
                        "relative",
                        isHover && "border-2 border-sky-500"
                    )}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    onClick={() => setImageBlob("")}
                >
                    <Image
                        src={imageBlob}
                        alt="collection"
                        width="0"
                        height="0"
                        sizes="100vw"
                        className={cn(
                            `h-auto w-full object-cover transition-all ${isHover && "opacity-20"}`
                        )}
                    />
                    {isHover && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-500 p-2 opacity-100">
                            Remove
                        </div>
                    )}
                </div>
            </div>) : (<>

                <div className="w-full max-w-md border-2 border-gray-300 border-dashed rounded-lg p-6 flex flex-col items-center justify-center space-y-4 dark:border-gray-700"
                    onDrop={handleAddImage}
                    onDragOver={(event) => event.preventDefault()}
                >
                    <Icons.upload className="w-12 h-12 text-gray-400" />
                    <p className="text-gray-500 dark:text-gray-400">Drag and drop your images here</p>
                    <Button variant="outline" onClick={handleButtonClick}>

                        Browse Files
                    </Button>
                    <input type="file" className="hidden" ref={fileInputRef} onChange={handleAddImage} />
                </div>
            </>)}

        </div>
    )
}
