import React, { useEffect, useState } from "react";
import axios from "axios";

const CarouselDashboard = () => {
  const [carousels, setCarousels] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [newCarousel, setNewCarousel] = useState({
    title: "",
    status: "active",
    slides: [],
  });
  const [editCarousel, setEditCarousel] = useState({
    id: null,
    title: "",
    status: "active",
    slides: [],
  });
  const [showAddSlideForm, setShowAddSlideForm] = useState(false);
  const [newSlide, setNewSlide] = useState({
    slide_title: "",
    slide_sub_title: "",
    slide_description: "",
    photo: null,
    hero_section_id: null,
  });

  // Get the user token from localStorage
  const getUserToken = () => {
    return localStorage.getItem("user_token");
  };

  // Create axios instance with authorization header
  const getAuthHeaders = () => {
    const token = getUserToken();
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
  };

  const fetchCarousels = async () => {
    try {
      const token = getUserToken();
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const response = await axios.get("https://api.amigofabric.com/api/get-carousel", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCarousels([response.data.data]);
    } catch (error) {
      console.error("Error fetching carousels:", error);
      if (error.response && error.response.status === 401) {
        alert("Authentication failed. Please login again.");
      }
    }
  };

  useEffect(() => {
    fetchCarousels();
  }, []);

  const handleCreateCarousel = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newCarousel.title);
    formData.append("status", newCarousel.status);
    
    newCarousel.slides.forEach((slide, index) => {
      formData.append(`slides[${index}][slide_title]`, slide.slide_title);
      formData.append(`slides[${index}][slide_sub_title]`, slide.slide_sub_title);
      formData.append(`slides[${index}][slide_description]`, slide.slide_description);
      formData.append(`slides[${index}][photo]`, slide.photo);
    });

    try {
      await axios.post(
        "https://api.amigofabric.com/api/create-carousel", 
        formData, 
        { headers: getAuthHeaders() }
      );
      fetchCarousels();
      setShowCreateForm(false);
      setNewCarousel({
        title: "",
        status: "active",
        slides: [],
      });
    } catch (error) {
      console.error("Error creating carousel:", error);
      if (error.response && error.response.status === 401) {
        alert("Authentication failed. Please login again.");
      }
    }
  };

  const handleEditCarousel = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", editCarousel.title);
    formData.append("status", editCarousel.status);

    try {
      await axios.post(
        `https://api.amigofabric.com/api/product/edit-carousel/${editCarousel.id}`, 
        formData, 
        { headers: getAuthHeaders() }
      );
      fetchCarousels();
      setShowEditForm(false);
    } catch (error) {
      console.error("Error editing carousel:", error);
      if (error.response && error.response.status === 401) {
        alert("Authentication failed. Please login again.");
      }
    }
  };

  const handleAddSlide = () => {
    setNewCarousel({
      ...newCarousel,
      slides: [...newCarousel.slides, { 
        slide_title: "", 
        slide_sub_title: "", 
        slide_description: "", 
        photo: null 
      }]
    });
  };

  const handleSlideChange = (index, field, value) => {
    const updatedSlides = [...newCarousel.slides];
    updatedSlides[index][field] = value;
    setNewCarousel({ ...newCarousel, slides: updatedSlides });
  };

  const handleFileChange = (index, file) => {
    const updatedSlides = [...newCarousel.slides];
    updatedSlides[index].photo = file;
    setNewCarousel({ ...newCarousel, slides: updatedSlides });
  };

  const deleteCarousel = async (id) => {
    try {
      const token = getUserToken();
      await axios.get(`https://api.amigofabric.com/api/delete-carousel/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchCarousels();
    } catch (error) {
      console.error("Error deleting carousel:", error);
      if (error.response && error.response.status === 401) {
        alert("Authentication failed. Please login again.");
      }
    }
  };

  const deleteSlide = async (id) => {
    try {
      const token = getUserToken();
      await axios.delete(`https://api.amigofabric.com/api/delete-slide/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchCarousels();
    } catch (error) {
      console.error("Error deleting slide:", error);
      if (error.response && error.response.status === 401) {
        alert("Authentication failed. Please login again.");
      }
    }
  };

  const startEditCarousel = (carousel) => {
    setEditCarousel({
      id: carousel.id,
      title: carousel.title,
      status: carousel.status,
      slides: carousel.hero_images || []
    });
    setShowEditForm(true);
  };

  const startAddSlide = (carouselId) => {
    setNewSlide({
      ...newSlide,
      hero_section_id: carouselId
    });
    setShowAddSlideForm(true);
  };

  const handleAddSlideSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("slide_title", newSlide.slide_title);
    formData.append("slide_sub_title", newSlide.slide_sub_title);
    formData.append("slide_description", newSlide.slide_description);
    formData.append("photo", newSlide.photo);
    formData.append("hero_section_id", newSlide.hero_section_id);

    try {
      await axios.post(
        "https://api.amigofabric.com/api/add-slide", 
        formData, 
        { headers: getAuthHeaders() }
      );
      fetchCarousels();
      setShowAddSlideForm(false);
      setNewSlide({
        slide_title: "",
        slide_sub_title: "",
        slide_description: "",
        photo: null,
        hero_section_id: null,
      });
    } catch (error) {
      console.error("Error adding slide:", error);
      if (error.response && error.response.status === 401) {
        alert("Authentication failed. Please login again.");
      }
    }
  };

  // Check for token on component mount
  useEffect(() => {
    const token = getUserToken();
    if (!token) {
      console.warn("Authentication token not found in localStorage");
      alert("You are not logged in. Please login to access this dashboard.");
      // You might want to redirect to login page here
      // window.location.href = "/login";
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => setShowCreateForm(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Create New Carousel
      </button>

      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Create New Carousel</h2>
            <form onSubmit={handleCreateCarousel}>
              <div className="mb-4">
                <label className="block mb-2">Title</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={newCarousel.title}
                  onChange={(e) => setNewCarousel({...newCarousel, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2">Status</label>
                <select
                  className="w-full p-2 border rounded"
                  value={newCarousel.status}
                  onChange={(e) => setNewCarousel({...newCarousel, status: e.target.value})}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {newCarousel.slides.map((slide, index) => (
                <div key={index} className="mb-4 border p-4 rounded">
                  <h3 className="font-bold mb-2">Slide {index + 1}</h3>
                  <input
                    type="text"
                    placeholder="Slide Title"
                    className="w-full p-2 border rounded mb-2"
                    value={slide.slide_title}
                    onChange={(e) => handleSlideChange(index, 'slide_title', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Slide Sub Title"
                    className="w-full p-2 border rounded mb-2"
                    value={slide.slide_sub_title}
                    onChange={(e) => handleSlideChange(index, 'slide_sub_title', e.target.value)}
                  />
                  <textarea
                    placeholder="Slide Description"
                    className="w-full p-2 border rounded mb-2"
                    value={slide.slide_description}
                    onChange={(e) => handleSlideChange(index, 'slide_description', e.target.value)}
                  />
                  <input
                    type="file"
                    className="mb-2"
                    onChange={(e) => handleFileChange(index, e.target.files[0])}
                    required
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddSlide}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Add Slide
              </button>
              
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Create Carousel
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="bg-red-500 text-white px-4 py-2 rounded ml-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {showEditForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Edit Carousel</h2>
            <form onSubmit={handleEditCarousel}>
              <div className="mb-4">
                <label className="block mb-2">Title</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={editCarousel.title}
                  onChange={(e) => setEditCarousel({...editCarousel, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2">Status</label>
                <select
                  className="w-full p-2 border rounded"
                  value={editCarousel.status}
                  onChange={(e) => setEditCarousel({...editCarousel, status: e.target.value})}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Update Carousel
              </button>
              <button
                type="button"
                onClick={() => setShowEditForm(false)}
                className="bg-red-500 text-white px-4 py-2 rounded ml-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {showAddSlideForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Add New Slide</h2>
            <form onSubmit={handleAddSlideSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Slide Title</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={newSlide.slide_title}
                  onChange={(e) => setNewSlide({...newSlide, slide_title: e.target.value})}
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2">Slide Sub Title</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={newSlide.slide_sub_title}
                  onChange={(e) => setNewSlide({...newSlide, slide_sub_title: e.target.value})}
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2">Slide Description</label>
                <textarea
                  className="w-full p-2 border rounded"
                  value={newSlide.slide_description}
                  onChange={(e) => setNewSlide({...newSlide, slide_description: e.target.value})}
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2">Photo</label>
                <input
                  type="file"
                  onChange={(e) => setNewSlide({...newSlide, photo: e.target.files[0]})}
                  required
                />
              </div>
              
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add Slide
              </button>
              <button
                type="button"
                onClick={() => setShowAddSlideForm(false)}
                className="bg-red-500 text-white px-4 py-2 rounded ml-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {carousels.map((carousel) => (
          <div key={carousel.id} className="border p-4 rounded">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{carousel.title}</h3>
              <div className="space-x-2">
                <button 
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => startEditCarousel(carousel)}
                >
                  Edit
                </button>
                <button 
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => startAddSlide(carousel.id)}
                >
                  Add Slide
                </button>
                <button 
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => deleteCarousel(carousel.id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <p>Status: {carousel.status}</p>
            <div className="mt-4">
              <h4 className="font-bold mb-2">Slides</h4>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {carousel.hero_images && carousel.hero_images.map((slide) => (
                  <div key={slide.id} className="border p-4 rounded">
                    <img 
                      src={`https://api.amigofabric.com/${slide.base_path}${slide.file_name}`} 
                      alt={slide.slide_title}
                      className="w-full h-32 object-cover mb-2"
                    />
                    <h5 className="font-semibold">{slide.slide_title}</h5>
                    <p className="text-sm text-gray-600">{slide.slide_sub_title}</p>
                    <p className="text-sm mt-2 line-clamp-2">{slide.slide_description}</p>
                    <button
                      className="mt-3 bg-red-500 text-white px-2 py-1 rounded text-sm"
                      onClick={() => deleteSlide(slide.id)}
                    >
                      Delete Slide
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselDashboard;