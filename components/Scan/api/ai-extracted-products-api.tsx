import type { AIAnalyzedReceipt } from '../types/ai-extracted-product';
import { ANALYZE_RECEIPT_URL } from '@/constants/urls';
import { getIdToken } from '@/utils/manage-tokens';

export type ExtractProductsFromReceiptResponse = {
  filename: string;
  mimeType: string;
  size: number;
  result: AIAnalyzedReceipt;
};

export const extractProductsFromReceipt = async (
  photoUri: string,
): Promise<ExtractProductsFromReceiptResponse> => {
  const idToken = await getIdToken();

  if (!idToken) {
    throw new Error('No access token found');
  }

  const formData = createImageFormData(photoUri);
  const res = await fetch(ANALYZE_RECEIPT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: idToken,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Failed process reciept');
  }

  return res.json();
};

function createImageFormData(uri: string) {
  const name = uri.split('/').pop() ?? 'photo.jpg';
  const extension = name.split('.').pop()?.toLowerCase();

  const type =
    extension === 'jpg' || extension === 'jpeg'
      ? 'image/jpeg'
      : extension === 'png'
        ? 'image/png'
        : 'application/octet-stream';

  const formData = new FormData();
  formData.append('image', { uri, name, type } as any);

  return formData;
}
