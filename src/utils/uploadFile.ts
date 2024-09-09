import {
  type storageBucketsNames,
  supabase,
} from "@/server/supabase/supabaseClient";

export const uploadUserFiles = async (
  path: string,
  file: Blob,
  bucket: (typeof storageBucketsNames)[keyof typeof storageBucketsNames] = "user-files"
) => {
  const { error, data } = await supabase()
    .storage.from(bucket)
    .upload(path, file, { upsert: true });

  if (error) return { error };

  const { data: signedURLData, error: publicUrlError } = await supabase()
    .storage.from(bucket)
    .createSignedUrl(data.path, 999_999_999, {
      transform: {
        width: 300,
        height: 300,
      },
    });

  if (publicUrlError) return { error: publicUrlError };

  return { url: signedURLData.signedUrl };
};
