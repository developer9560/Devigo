import React, { useState, useEffect } from 'react';

/**
 * LazyImage component for optimized image loading
 * @param {Object} props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text for the image
 * @param {number} props.width - Width of the image
 * @param {number} props.height - Height of the image
 * @param {string} props.className - CSS class names
 * @param {Function} props.onLoad - Callback when image loads
 * @param {string} props.placeholderColor - Background color while loading
 */
const LazyImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  onLoad,
  placeholderColor = "#1e1e1e",
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    // Reset loading state when src changes
    setIsLoaded(false);
    
    const image = new Image();
    image.src = src;
    
    image.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
      if (onLoad) onLoad();
    };
    
    return () => {
      image.onload = null;
    };
  }, [src, onLoad]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "auto",
        backgroundColor: placeholderColor,
        aspectRatio: width && height ? `${width}/${height}` : "auto",
      }}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          width={width}
          height={height}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
};

export default LazyImage; 