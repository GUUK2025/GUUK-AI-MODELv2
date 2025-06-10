import { useState, useEffect } from 'react';

export function ImageGrid({ images, selectedImage, setSelectedImage, aspectRatio, croppingMethod, customRatio }) {
  const [cropBoundaries, setCropBoundaries] = useState({});

  useEffect(() => {
    // Calculate crop boundaries for each image based on aspect ratio
    const newBoundaries = {};
    
    images.forEach(image => {
      const img = new Image();
      img.src = image.preview;
      
      img.onload = () => {
        const { width, height } = img;
        let targetRatio;
        
        // Parse aspect ratio
        switch (aspectRatio) {
          case '1:1':
            targetRatio = 1;
            break;
          case '16:9':
            targetRatio = 16/9;
            break;
          case '4:3':
            targetRatio = 4/3;
            break;
          case '3:2':
            targetRatio = 3/2;
            break;
          case 'custom':
            targetRatio = customRatio.width / customRatio.height;
            break;
          default:
            targetRatio = 1;
        }
        
        // Calculate crop dimensions
        let cropWidth, cropHeight;
        const imageRatio = width / height;
        
        if (imageRatio > targetRatio) {
          // Image is wider than target ratio
          cropHeight = height;
          cropWidth = height * targetRatio;
        } else {
          // Image is taller than target ratio
          cropWidth = width;
          cropHeight = width / targetRatio;
        }
        
        // Calculate crop position based on cropping method
        let cropX, cropY;
        
        switch (croppingMethod) {
          case 'center':
            cropX = (width - cropWidth) / 2;
            cropY = (height - cropHeight) / 2;
            break;
          case 'content-aware':
            // For simplicity, we'll use center cropping for content-aware too
            // In a real implementation, this would use image analysis
            cropX = (width - cropWidth) / 2;
            cropY = (height - cropHeight) / 2;
            break;
          case 'manual':
            // For manual, we'll start with center crop but allow adjustment
            cropX = (width - cropWidth) / 2;
            cropY = (height - cropHeight) / 2;
            break;
          default:
            cropX = (width - cropWidth) / 2;
            cropY = (height - cropHeight) / 2;
        }
        
        newBoundaries[image.id] = {
          x: cropX,
          y: cropY,
          width: cropWidth,
          height: cropHeight,
          originalWidth: width,
          originalHeight: height
        };
        
        setCropBoundaries(prev => ({...prev, [image.id]: newBoundaries[image.id]}));
      };
    });
  }, [images, aspectRatio, croppingMethod, customRatio]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {images.map(image => (
        <div 
          key={image.id}
          className={`relative cursor-pointer border rounded-md overflow-hidden ${selectedImage?.id === image.id ? 'ring-2 ring-primary' : ''}`}
          onClick={() => setSelectedImage(image)}
        >
          <div className="relative">
            <img 
              src={image.preview} 
              alt={`Image ${image.id}`}
              className="w-full h-auto"
            />
            {cropBoundaries[image.id] && (
              <div 
                className="absolute border-2 border-blue-500 pointer-events-none"
                style={{
                  left: `${(cropBoundaries[image.id].x / cropBoundaries[image.id].originalWidth) * 100}%`,
                  top: `${(cropBoundaries[image.id].y / cropBoundaries[image.id].originalHeight) * 100}%`,
                  width: `${(cropBoundaries[image.id].width / cropBoundaries[image.id].originalWidth) * 100}%`,
                  height: `${(cropBoundaries[image.id].height / cropBoundaries[image.id].originalHeight) * 100}%`
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

