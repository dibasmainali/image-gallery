// src/components/Gallery.js
import React, { useState, useEffect, useCallback } from "react";
import ImageModal from "./ImageModal";
import debounce from "lodash.debounce"; // Import lodash debounce for handling search

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  // Fetch images from Unsplash API with pagination
  const fetchImages = async (searchQuery = "nature", pageNum = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        // `https://api.unsplash.com/search/photos?query=${searchQuery}&page=${pageNum}&client_id=HfgeWayalz2TdJ2EG27lSUYYjycq3LaiIuTTTQvh7wI`
        `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${import.meta.env.VITE_UNSPLASH_API_KEY}`

    );
      if (!response.ok) throw new Error("Failed to fetch images");
      const data = await response.json();
      setImages((prevImages) => (pageNum === 1 ? data.results : [...prevImages, ...data.results]));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchQuery) => fetchImages(searchQuery, 1), 500),
    []
  );

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle search with debounce
  const handleSearch = (e) => {
    e.preventDefault();
    setImages([]);
    setPage(1);
    debouncedSearch(query);
  };

  // Clear search input
  const clearSearch = () => {
    setQuery("");
    fetchImages();
  };

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  // Fetch more images on page change
  useEffect(() => {
    if (page > 1) {
      fetchImages(query || "nature", page);
    }
  }, [page]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Image Gallery</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search for images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 w-full max-w-md rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md"
        >
          Search
        </button>
        {query && (
          <button
            onClick={clearSearch}
            className="bg-gray-300 text-gray-700 px-4 py-2 ml-2 rounded-md"
          >
            Clear
          </button>
        )}
      </form>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center my-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-blue-500">Loading...</span>
        </div>
      )}

      {/* Error Message with Retry */}
      {error && (
        <div className="text-center text-red-500 my-4">
          <p>{error}</p>
          <button onClick={() => fetchImages(query || "nature")} className="bg-red-500 text-white px-4 py-2 mt-2 rounded-md">
            Retry
          </button>
        </div>
      )}

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description}
            className="w-full h-48 object-cover rounded-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => setSelectedImage(image.urls.full)}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default Gallery;
