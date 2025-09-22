import type { AxiosProgressEvent } from 'axios'
import { instance } from './axios'
import axios from 'axios'

const upload = (
  file: FormData,
  abortSignal?: AbortSignal | null,
  onProgress?: (bytes: number) => void
): Promise<any> => {
  return instance.post('fileUpload/single', file, {
    signal: abortSignal || undefined,
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      onProgress?.(progressEvent.loaded)
    }
  })
}

const s3Upload = (
  url: string,
  file: File,
  abortSignal?: AbortSignal | null,
  onProgress?: (bytes: number) => void
): Promise<any> => {
  return axios.put(url, file, {
    signal: abortSignal || undefined,
    headers: {
      'Content-Type': file.type
    },
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      onProgress?.(progressEvent.loaded)
    }
  })
}

export { upload, s3Upload }
