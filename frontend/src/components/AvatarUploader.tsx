import { useState, useRef } from 'react';
import { fetchHandler } from '../utils/fetchHandler';

interface AvatarUploaderProps {
  onAvatarUpload: (imageId: string) => void;
}

export default function AvatarUploader({ onAvatarUpload }: AvatarUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) setPreview(e.target.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetchHandler('/user/image', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      const { imageId } = await response.json();
      onAvatarUpload(imageId);
    } catch (error) {
      console.error('Avatar upload failed:', error);
    }
  };

  return (
    <div className="w-96 space-y-6">
      {/* Preview Area */}
      <div className="relative h-64 w-64 mx-auto">
        <div className="absolute inset-0 rounded-full overflow-hidden shadow-lg">
          {preview && (
            <img 
              src={preview}
              className="w-full h-full object-cover transform transition-transform"
              style={{ transform: `scale(${scale})` }}
              alt="Avatar preview"
            />
          )}
        </div>
        <div className="absolute inset-0 border-2 border-white/30 rounded-full pointer-events-none" />
      </div>
      <div className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          ref={fileInputRef}
          className="hidden"
        />
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {preview ? 'Change Avatar' : 'Choose Avatar'}
        </button>

        {preview && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Zoom</label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <button
              type="button"
              onClick={handleUpload}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Apply Avatar
            </button>
          </>
        )}
      </div>
    </div>
  );
}