"use client";

import Image from "next/image";
import isEmpty from "lodash/isEmpty";
import { useCallback } from "react";
import { useDropzone } from "@uploadthing/react";
import { PiTrashBold } from "react-icons/pi";
import { Text, FieldError } from "rizzui";
import cn from "../../utils/class-names";
import { FileWithPath } from "react-dropzone";
import UploadIcon from "../shape/upload";
import { SortableItem } from "@/views/product/SortableItem";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface UploadZoneProps {
  label?: string;
  name: string;
  getValues: any;
  setValue: any;
  className?: string;
  error?: string;
  files: any[];
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
  isUpdatingMedia?: boolean
}

export interface UploadableFile extends File {
  preview: string;
}

export default function UploadZone({
  label,
  name,
  className,
  getValues,
  setValue,
  error,
  files,
  setFiles,
  isUpdatingMedia,
}: UploadZoneProps) {

  const maxSize = 2 * 1024 * 1024;

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const existingPaths = files.map((f) => f.name);
      const newFiles = acceptedFiles.filter((file) => !existingPaths.includes(file.name));

      const enriched: UploadableFile[] = newFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFiles((prev) => [...prev, ...enriched]);
    },
    [files]
  );

  function handleRemoveFile(name: string) {
    const updatedFiles = files.filter((file) => file.name !== name);
    setFiles(updatedFiles);
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize,
  });

  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <div className={cn("grid @container", className)}>
      {label && <span className="mb-1.5 block font-semibold text-gray-900">{label}</span>}
      <div
        className={cn(
          "rounded-md border-[1.8px]",
          error ? "border-[2px] border-[#ee0000]" : "border-gray-200",
          !isEmpty(files) && "flex flex-wrap items-center justify-between @xl:flex-nowrap @xl:pr-6"
        )}
      >
        <div
          {...getRootProps()}
          className={cn(
            "flex cursor-pointer items-center gap-4 px-6 py-5 transition-all duration-300",
            isEmpty(files) ? "justify-center" : "flex-grow justify-center @xl:justify-start"
          )}
        >
          <input {...getInputProps()} />
          <UploadIcon className="h-12 w-12" />
          <Text className="text-base font-medium">Drop or select file</Text>
        </div>
      </div>

      {(!isEmpty(files)) && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={({ active, over }) => {
            if (active.id !== over?.id) {
              const oldIndex = files.findIndex((f) => f.name === active.id);
              const newIndex = files.findIndex((f) => f.name === over?.id);
              setFiles(arrayMove(files, oldIndex, newIndex));
            }
          }}
        >
          <SortableContext items={files.map((f) => f.name).filter((id): id is string => !!id)} strategy={verticalListSortingStrategy}>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fit,_minmax(140px,_1fr))]">
              {files.map((file: any, index: number) => (
                <SortableItem key={file.name} id={file.name}>
                  <div
                    key={index}
                    className={cn("relative")}
                  >
                    <figure className="group relative h-40 rounded-md bg-gray-50">
                      <MediaPreview
                        name={file.name}
                        url={file.preview}
                      />
                      {isUpdatingMedia ? (
                        <div className="absolute inset-0 z-50 grid place-content-center rounded-md bg-gray-800/50">
                          <LoadingSpinner />
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(file.name)}
                          onPointerDown={(e) => e.stopPropagation()}
                          className="absolute right-0 top-0 rounded-full bg-gray-700/70 p-1.5 opacity-20 transition duration-300 hover:bg-red-dark group-hover:opacity-100"
                        >
                          <PiTrashBold className="text-white" />
                        </button>
                      )}
                    </figure>
                    <MediaCaption
                      name={file.path}
                      size={file.size}
                    />
                  </div>
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {error && <FieldError className="mt-1 text-xs" error={error} />}
    </div>
  );
}

function MediaPreview({ name, url }: { name: string; url: string }) {
  // return endsWith(name, ".pdf") ? (
  //   <object
  //     data={url}
  //     type="application/pdf"
  //     width="100%"
  //     height="100%"
  //   >
  //     <p>
  //       Alternative text - include a link <a href={url}>to the PDF!</a>
  //     </p>
  //   </object>
  // ) : (
  //   <Image
  //     fill
  //     src={url}
  //     alt={name}
  //     className="transform rounded-md object-contain"
  //   />
  // );
  return (
    <Image
      fill
      src={url ? url : '/logo.png'}
      alt={name ? name : ''}
      className="transform rounded-md object-contain"
    />
  );
}

function MediaCaption({ name, size }: { name: string; size: number }) {
  return (
    <div className="mt-1 text-xs">
      <p className="break-words font-medium text-gray-700">{name}</p>
      {/* <p className="mt-1 font-mono">{prettyBytes(size)}</p> */}
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          x1="8.042%"
          y1="0%"
          x2="65.682%"
          y2="23.865%"
          id="a"
        >
          <stop
            stopColor="#fff"
            stopOpacity="0"
            offset="0%"
          />
          <stop
            stopColor="#fff"
            stopOpacity=".631"
            offset="63.146%"
          />
          <stop
            stopColor="#fff"
            offset="100%"
          />
        </linearGradient>
      </defs>
      <g
        fill="none"
        fillRule="evenodd"
      >
        <g transform="translate(1 1)">
          <path
            d="M36 18c0-9.94-8.06-18-18-18"
            id="Oval-2"
            stroke="url(#a)"
            strokeWidth="2"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </path>
          <circle
            fill="#fff"
            cx="36"
            cy="18"
            r="1"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>
  );
}
