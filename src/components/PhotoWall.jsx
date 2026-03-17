import { useEffect, useState } from "react";
import { PhotoCard } from "./PhotoCard.jsx";

export function PhotoWall() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch("/photo_config.json")
      .then(res => res.json())
      .then(data => setPhotos(data))
      .catch(err => console.error("Failed to load photos", err));
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pb-24">
      {/* CSS Columns for Masnory effect */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {photos.map((photo, idx) => (
          <PhotoCard key={photo.id} photo={photo} index={idx} />
        ))}
      </div>
    </div>
  );
}
