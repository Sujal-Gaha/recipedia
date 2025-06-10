import sharp, { ResizeOptions, WebpOptions } from 'sharp';

type TResizeOptions = Omit<ResizeOptions, 'height' | 'width'>;
type TWebpOptions = Omit<WebpOptions, 'quality'>;

interface ICompressOptions {
  height: number;
  width: number;
  quality: number;
  resizeOptions?: TResizeOptions;
  webpOptions?: TWebpOptions;
}

interface IImageProcessingStrategy {
  process(image: sharp.Sharp): sharp.Sharp | Promise<sharp.Sharp | sharp.OutputInfo>;
}

class ImageResizerStrategy implements IImageProcessingStrategy {
  constructor(private width: number, private height: number, private options?: TResizeOptions) {}

  process(image: sharp.Sharp): sharp.Sharp {
    return image.resize({
      width: this.width,
      height: this.height,
      ...this.options,
    });
  }
}

class ImageWebpConverterStrategy implements IImageProcessingStrategy {
  constructor(private quality: number, private options?: TWebpOptions) {}

  process(image: sharp.Sharp): sharp.Sharp {
    return image.webp({ quality: this.quality, ...this.options });
  }
}

class ImageToFile implements IImageProcessingStrategy {
  constructor(private compressedFilePath: string) {}

  async process(image: sharp.Sharp): Promise<sharp.OutputInfo> {
    return await image.toFile(this.compressedFilePath);
  }
}

export class ImageProcessor {
  constructor(public file_path: string) {}

  async compress(options: ICompressOptions) {
    const compressedFilePath = this.file_path.replace(/\.[^/.]+$/, '.webp');

    const imageResizerStrategy = new ImageResizerStrategy(options.width, options.height, options.resizeOptions);
    const imageWebpConverterStrategy = new ImageWebpConverterStrategy(options.quality, options.webpOptions);
    const imageToFileStrategy = new ImageToFile(compressedFilePath);

    try {
      let image = sharp(this.file_path);

      image = imageResizerStrategy.process(image);

      image = imageWebpConverterStrategy.process(image);

      await imageToFileStrategy.process(image);

      return { compressedFilePath };
    } catch (error) {
      console.error('Error compressing image:', error);
      throw new Error('Image compression failed.');
    }
  }
}
