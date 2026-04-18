import { handleUpload } from '@vercel/blob/client';

export default async function handler(request, response) {
  const body = await request.json();

  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (/* pathname */) => {
        return {
          allowedContentTypes: ['image/jpeg', 'image/png']
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // 上传完成后的逻辑
        console.log('上传完成:', blob, tokenPayload);
      },
    });

    return response.status(200).json(json);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
