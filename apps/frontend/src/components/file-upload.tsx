import { useState, useRef, useCallback, DragEvent } from 'react';
import { Camera, Upload, X, FileImage, AlertCircle, Crown, Star, StarIcon } from 'lucide-react';
import { toastError, toastInfo, toastSuccess } from './toaster';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { cn } from '../lib/utils';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { fileApi } from '../apis/file-api';
import clsx from 'clsx';

interface FileUploadProps {
  maxSize?: number;
  acceptedTypes?: string[];
  className?: string;
  onFileUpload: (url: string) => void;
  onFileRemove: (url: string) => void;
  cardTitle?: string;
  cardDescription?: string;
  defaultPreviewUrls: string[];
  defaultPrimaryUrl?: string;
  onSelectPrimary?: (url: string) => void;
}

export const FileUpload = ({
  maxSize = 10,
  acceptedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'],
  className,
  onFileUpload,
  onFileRemove,
  cardTitle,
  cardDescription,
  defaultPreviewUrls = [],
  defaultPrimaryUrl,
  onSelectPrimary,
}: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>(defaultPreviewUrls);
  const [primaryUrl, setPrimaryUrl] = useState<string | null>(defaultPrimaryUrl ? defaultPrimaryUrl : null);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileMtn = fileApi.createFile.useMutation();

  const handleFileUpload = useCallback(
    async (file: File) => {
      if (!acceptedTypes.includes(file.type)) {
        return setError(
          `File type not supported. Please upload: ${acceptedTypes
            .map((type) => type.split('/')[1].toUpperCase())
            .join(', ')}`
        );
      }

      const fileSizeMB = file.size / (1024 * 1024);

      if (fileSizeMB > maxSize) {
        return setError(`File size too large. Maximum size is ${maxSize}MB`);
      }

      await fileMtn.mutateAsync(
        {
          body: {
            file,
          },
        },
        {
          onSuccess: (data) => {
            const uploadedUrl = data.body.data.file_path;

            onFileUpload(uploadedUrl);

            setPreviewUrls((prev) => [...prev, uploadedUrl]);
            toastSuccess('File uploaded successfully!');
          },
          onError: (error) => {
            if (error.status === 400 || error.status === 500) {
              setError(error.body.message);
              toastError(error.body.message);
            } else {
              setError('Something went wrong! Please try again later.');
              toastError('Something went wrong! Please try again later.');
            }
            console.log(error);
          },
        }
      );
    },
    [acceptedTypes, fileMtn, maxSize, onFileUpload]
  );

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileUpload(files[0]);
      }
    },
    [handleFileUpload]
  );

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleRemoveImage = (previewUrl: string) => {
    onFileRemove(previewUrl);

    setPreviewUrls((prev) => prev.filter((url) => url !== previewUrl));

    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    toastInfo('The image has been removed.');
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleMakeImagePrimary = (previewUrl: string) => {
    if (onSelectPrimary) {
      onSelectPrimary(previewUrl);
      setPrimaryUrl(previewUrl);
    }
  };

  const uploadProgress = fileMtn.isPending ? 50 : 0;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <Camera className="mr-3 h-6 w-6 text-primary" />
          {cardTitle ? cardTitle : 'Images'}
        </CardTitle>
        <CardDescription className="text-lg">
          {cardDescription ? cardDescription : 'Add a high-quality image'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="w-full mx-auto">
              <div className="flex items-center gap-x-4">
                {previewUrls.map((previewUrl) => (
                  <div key={previewUrl} className="group relative">
                    <img
                      key={previewUrl}
                      src={previewUrl}
                      alt="Ingredient preview"
                      className="w-[150px] h-[150px] object-cover rounded"
                    />
                    <div className="absolute w-[150px] h-[150px] inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded" />
                    {onSelectPrimary ? (
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => handleMakeImagePrimary(previewUrl)}
                        className="absolute top-2 right-12 opacity-0 group-hover:opacity-100 transition-opacity"
                        disabled={fileMtn.isPending}
                      >
                        <Star
                          className={clsx('h-4 w-4', primaryUrl === previewUrl && 'fill-amber-500 text-amber-500')}
                        />
                      </Button>
                    ) : null}

                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveImage(previewUrl)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      disabled={fileMtn.isPending}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Input
            ref={fileInputRef}
            type="file"
            accept={acceptedTypes.join(',')}
            onChange={(event) => {
              const file = event.currentTarget?.files?.[0];

              if (!file) return;

              if (file) {
                handleFileUpload(file);
              }
            }}
            className="hidden"
            id="file-upload"
          />

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={openFileDialog}
            className={cn(
              'border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200',
              isDragOver
                ? 'border-primary bg-primary/5 scale-[1.02]'
                : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50',
              fileMtn.isPending && 'pointer-events-none opacity-75'
            )}
          >
            {fileMtn.isPending ? (
              <div className="space-y-4">
                <div className="animate-pulse">
                  <Upload className="mx-auto h-16 w-16 text-primary mb-4" />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-medium">Uploading...</p>
                  <Progress value={uploadProgress} className="w-full max-w-xs mx-auto" />
                  <p className="text-sm text-muted-foreground">Processing...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="mx-auto h-16 w-16 text-muted-foreground" />
                <div>
                  <p className="text-lg text-muted-foreground mb-3">
                    {isDragOver ? 'Drop your image here' : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-muted-foreground">
                    {acceptedTypes.map((type) => type.split('/')[1].toUpperCase()).join(', ')} up to {maxSize}MB
                  </p>
                </div>
                <Button type="button" variant="outline" className="h-12 px-8 bg-transparent">
                  <FileImage className="mr-2 h-4 w-4" />
                  Choose Files
                </Button>
              </div>
            )}
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-destructive bg-destructive/10 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="text-xs text-muted-foreground space-y-1 bg-muted/50 p-3 rounded-lg">
            <p className="font-medium">Upload Guidelines:</p>
            <ul className="space-y-1 ml-4">
              <li>• Use high-quality, well-lit images</li>
              <li>• Show the ingredient clearly without distractions</li>
              <li>• Preferred aspect ratio: 4:3 or 16:9</li>
              <li>• Minimum resolution: 800x600 pixels</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
