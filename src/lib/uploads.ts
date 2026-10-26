import { getDownloadURL, storage, storageRef, uploadBytesResumable } from '@/db/firebase';

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif'];

/** Returns a user-facing message when a file is not an acceptable image. */
export function validateImageFile(file: File | null | undefined): string | null {
  if (!file) return null;
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return 'Choose a PNG, JPG, WebP, GIF, or AVIF image.';
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return 'Images must be 5 MB or smaller.';
  }
  return null;
}

/**
 * Uploads an image to Storage and resolves its download URL.
 * `onProgress` receives a 0–100 percentage for long uploads.
 */
export async function uploadImage(
  folder: string,
  id: string,
  file: File,
  onProgress?: (percent: number) => void
): Promise<string> {
  const invalid = validateImageFile(file);
  if (invalid) throw new Error(invalid);

  const target = storageRef(storage, `${folder}/${id}/${Date.now()}-${file.name}`);
  const task = uploadBytesResumable(target, file, { contentType: file.type });

  await new Promise<void>((resolve, reject) => {
    task.on(
      'state_changed',
      snapshot => {
        if (!onProgress || !snapshot.totalBytes) return;
        onProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
      },
      reject,
      () => resolve()
    );
  });

  return getDownloadURL(target);
}

export function friendlyUploadError(error: unknown): string {
  const code = typeof error === 'object' && error && 'code' in error ? String((error as { code?: string }).code) : '';
  switch (code) {
    case 'storage/unauthorized':
      return 'You do not have permission to upload this image.';
    case 'storage/canceled':
      return 'The upload was cancelled.';
    case 'storage/quota-exceeded':
      return 'Storage quota reached. Try a smaller image.';
    case 'storage/retry-limit-exceeded':
      return 'The upload timed out. Check your connection and try again.';
    default:
      return 'Unable to upload the image. Check your connection and try again.';
  }
}
