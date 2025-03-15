import React, { useState } from 'react';
import { PlusCircle, X, Upload } from 'lucide-react';

const CarouselCreate = () => {
  const [formData, setFormData] = useState({
    title: '',
    status: 'active',
    slides: [
      {
        slide_title: '',
        slide_sub_title: '',
        slide_description: '',
        photo: null
      }
    ]
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e, slideIndex = null) => {
    if (slideIndex !== null) {
      const updatedSlides = [...formData.slides];
      updatedSlides[slideIndex] = {
        ...updatedSlides[slideIndex],
        [e.target.name]: e.target.value
      };
      setFormData({ ...formData, slides: updatedSlides });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleFileChange = (e, slideIndex) => {
    const file = e.target.files[0];
    if (file) {
      const updatedSlides = [...formData.slides];
      updatedSlides[slideIndex] = {
        ...updatedSlides[slideIndex],
        photo: file
      };
      setFormData({ ...formData, slides: updatedSlides });
    }
  };

  const addSlide = () => {
    setFormData({
      ...formData,
      slides: [
        ...formData.slides,
        {
          slide_title: '',
          slide_sub_title: '',
          slide_description: '',
          photo: null
        }
      ]
    });
  };

  const removeSlide = (index) => {
    const updatedSlides = formData.slides.filter((_, i) => i !== index);
    setFormData({ ...formData, slides: updatedSlides });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    formData.slides.forEach((slide, index) => {
      if (!slide.photo) {
        newErrors[`slide${index}Photo`] = 'Photo is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const formPayload = new FormData();
    formPayload.append('title', formData.title);
    formPayload.append('status', formData.status);
    
    formData.slides.forEach((slide, index) => {
      formPayload.append(`slides[${index}][slide_title]`, slide.slide_title);
      formPayload.append(`slides[${index}][slide_sub_title]`, slide.slide_sub_title);
      formPayload.append(`slides[${index}][slide_description]`, slide.slide_description);
      formPayload.append(`slides[${index}][photo]`, slide.photo);
    });

    try {
      const response = await fetch('https://api.amigofabric.com/api/create-carousel', {
        method: 'POST',
        body: formPayload
      });

      if (!response.ok) {
        throw new Error('Failed to create carousel');
      }

      // Reset form after successful submission
      setFormData({
        title: '',
        status: 'active',
        slides: [{ slide_title: '', slide_sub_title: '', slide_description: '', photo: null }]
      });
      
    } catch (error) {
      console.error('Error creating carousel:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Create Carousel</h2>
          
          {/* Main Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Slides Section */}
        <div className="space-y-4">
          {formData.slides.map((slide, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Slide {index + 1}</h3>
                {formData.slides.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSlide(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Slide Title</label>
                  <input
                    type="text"
                    name="slide_title"
                    value={slide.slide_title}
                    onChange={(e) => handleInputChange(e, index)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                  <input
                    type="text"
                    name="slide_sub_title"
                    value={slide.slide_sub_title}
                    onChange={(e) => handleInputChange(e, index)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="slide_description"
                    value={slide.slide_description}
                    onChange={(e) => handleInputChange(e, index)}
                    rows="3"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Photo</label>
                  <div className="mt-1 flex items-center">
                    <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-50">
                      <Upload className="w-5 h-5 mr-2" />
                      <span>Upload</span>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, index)}
                        className="hidden"
                        accept="image/*"
                      />
                    </label>
                    {slide.photo && <span className="ml-2">{slide.photo.name}</span>}
                  </div>
                  {errors[`slide${index}Photo`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`slide${index}Photo`]}</p>
                  )}
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addSlide}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Slide
          </button>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Carousel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarouselCreate;