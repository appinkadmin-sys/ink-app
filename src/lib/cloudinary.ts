const CLOUD_NAME = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME ?? 'iryuects';

export type UploadKind =
  | 'profile'
  | 'post'
  | 'ink'
  | 'story'
  | 'album'
  | 'chat_image'
  | 'chat_video'
  | 'chat_audio'
  | 'chat_document';

const PRESETS: Record<UploadKind, string> = {
  profile:       process.env.EXPO_PUBLIC_CLOUDINARY_PRESET_PROFILE ?? 'ink_profile',
  post:          process.env.EXPO_PUBLIC_CLOUDINARY_PRESET_POST    ?? 'ink_post',
  ink:           process.env.EXPO_PUBLIC_CLOUDINARY_PRESET_INK     ?? 'ink_ink',
  story:         process.env.EXPO_PUBLIC_CLOUDINARY_PRESET_STORY   ?? 'ink_story',
  album:         process.env.EXPO_PUBLIC_CLOUDINARY_PRESET_ALBUM   ?? 'ink_album',
  chat_image:    process.env.EXPO_PUBLIC_CLOUDINARY_PRESET_CHAT    ?? 'ink_chat_media',
  chat_video:    process.env.EXPO_PUBLIC_CLOUDINARY_PRESET_CHAT    ?? 'ink_chat_media',
  chat_audio:    process.env.EXPO_PUBLIC_CLOUDINARY_PRESET_CHAT    ?? 'ink_chat_media',
  chat_document: process.env.EXPO_PUBLIC_CLOUDINARY_PRESET_CHAT    ?? 'ink_chat_media',
};

const RESOURCE_TYPES: Record<UploadKind, 'image' | 'video' | 'raw' | 'auto'> = {
  profile:       'image',
  post:          'image',
  ink:           'video',
  story:         'auto',
  album:         'image',
  chat_image:    'image',
  chat_video:    'video',
  chat_audio:    'video',
  chat_document: 'raw',
};

function buildFolder(
  username: string,
  kind: UploadKind,
  ids: {
    postId?: string;
    inkId?: string;
    storyId?: string;
    albumId?: string;
    chatId?: string;
  }
): string {
  const user = username.toLowerCase().replace(/[^a-z0-9_]/g, '');
  const base = `ink/users/${user}`;

  switch (kind) {
    case 'profile':
      return `${base}/profile`;
    case 'post':
      if (!ids.postId) throw new Error('postId required for post upload');
      return `${base}/posts/${ids.postId}`;
    case 'ink':
      if (!ids.inkId) throw new Error('inkId required for ink upload');
      return `${base}/inks/${ids.inkId}`;
    case 'story':
      if (!ids.storyId) throw new Error('storyId required for story upload');
      return `${base}/stories/${ids.storyId}`;
    case 'album':
      if (!ids.albumId) throw new Error('albumId required for album upload');
      return `${base}/albums/${ids.albumId}`;
    case 'chat_image':
    case 'chat_video':
    case 'chat_audio':
    case 'chat_document': {
      if (!ids.chatId) throw new Error('chatId required for chat upload');
      const sub =
        kind === 'chat_image' ? 'images'
        : kind === 'chat_video' ? 'videos'
        : kind === 'chat_audio' ? 'audio'
        : 'documents';
      return `${base}/chats/${ids.chatId}/${sub}`;
    }
  }
}

export interface UploadParams {
  uri: string;
  username: string;
  kind: UploadKind;
  postId?: string;
  inkId?: string;
  storyId?: string;
  albumId?: string;
  chatId?: string;
  fileName?: string;
  mimeType?: string;
}

export interface CloudinaryResult {
  secure_url: string;
  public_id: string;
  format: string;
  bytes: number;
  duration?: number;
  width?: number;
  height?: number;
  resource_type: string;
}

export async function uploadToCloudinary(
  params: UploadParams
): Promise<CloudinaryResult> {
  const { uri, username, kind } = params;

  const preset = PRESETS[kind];
  const resourceType = RESOURCE_TYPES[kind];
  const folder = buildFolder(username, kind, {
    postId: params.postId,
    inkId: params.inkId,
    storyId: params.storyId,
    albumId: params.albumId,
    chatId: params.chatId,
  });

  const mimeType =
    params.mimeType ??
    (kind === 'chat_document' ? 'application/pdf'
    : kind === 'chat_audio' ? 'audio/m4a'
    : kind === 'chat_video' || kind === 'ink' ? 'video/mp4'
    : 'image/jpeg');

  const ext =
    mimeType.includes('pdf') ? 'pdf'
    : mimeType.includes('m4a') ? 'm4a'
    : mimeType.includes('mp4') ? 'mp4'
    : mimeType.includes('png') ? 'png'
    : 'jpg';

  const formData = new FormData();
  formData.append('file', {
    uri,
    type: mimeType,
    name: params.fileName ?? `upload_${Date.now()}.${ext}`,
  } as any);
  formData.append('upload_preset', preset);
  formData.append('folder', folder);

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;

  const res = await fetch(url, { method: 'POST', body: formData });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Cloudinary ${res.status}: ${text}`);
  }

  return res.json();
}

/**
 * POPIA: Delete a user's entire asset tree.
 * Requires signed Admin API call — implement via Cloud Function.
 */
export async function deleteUserAssets(username: string): Promise<void> {
  const user = username.toLowerCase().replace(/[^a-z0-9_]/g, '');
  console.log(`[Cloudinary] Would delete ink/users/${user}/*`);
}

/**
 * Delete a single asset by public_id.
 * Requires signed Admin API call — implement via Cloud Function.
 */
export async function deleteAsset(publicId: string): Promise<void> {
  console.log(`[Cloudinary] Would delete ${publicId}`);
}