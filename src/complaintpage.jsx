import React, { useState, useEffect } from 'react';
import { MapPin, Camera, Upload, Send, Moon, Sun, ArrowLeft, AlertCircle, CheckCircle, X } from 'lucide-react';

const ComplaintForm = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    urgency: 'medium',
    images: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    'Road & Traffic',
    'Street Lighting',
    'Water & Drainage',
    'Waste Management',
    'Public Safety',
    'Parks & Recreation',
    'Noise Complaints',
    'Other'
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low Priority', color: 'green' },
    { value: 'medium', label: 'Medium Priority', color: 'yellow' },
    { value: 'high', label: 'High Priority', color: 'orange' },
    { value: 'urgent', label: 'Urgent', color: 'red' }
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 5) {
      setErrors(prev => ({ ...prev, images: 'Maximum 5 images allowed' }));
      return;
    }
    
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
    setErrors(prev => ({ ...prev, images: '' }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        title: '',
        category: '',
        description: '',
        location: '',
        urgency: 'medium',
        images: []
      });
    }, 1500);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
          setErrors(prev => ({ ...prev, location: 'Unable to get current location' }));
        }
      );
    } else {
      setErrors(prev => ({ ...prev, location: 'Geolocation is not supported' }));
    }
  };

  if (showSuccess) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-orange-50'}`}>
        <div className={`max-w-md w-full mx-auto p-8 rounded-3xl text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}>
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Complaint Submitted!
          </h2>
          <p className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Your complaint has been registered. Tracking ID: <strong>CT-{Date.now().toString().slice(-6)}</strong>
          </p>
          <button
            onClick={() => setShowSuccess(false)}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-semibold"
          >
            Submit Another Complaint
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-orange-50'}`}>
      <header className={`sticky top-0 z-50 py-4 px-4 sm:px-8 ${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'} shadow-lg`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button className={`p-2 rounded-full ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            onClick={() => window.location.href = "/"}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 rounded-lg">
                <MapPin className="text-white w-5 h-5" />
              </div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Submit Complaint
              </h1>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Report an Issue
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-6"></div>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Help us improve your community by reporting issues that need attention.
            </p>
          </div>

          <form onSubmit={handleSubmit} className={`p-8 rounded-3xl shadow-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Complaint Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Brief title describing the issue"
                    className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'} ${errors.title ? 'border-red-500' : ''}`}
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.title}</p>}
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'} ${errors.category ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => <option key={category} value={category}>{category}</option>)}
                  </select>
                  {errors.category && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.category}</p>}
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Priority Level</label>
                  <div className="grid grid-cols-2 gap-3">
                    {urgencyLevels.map(level => (
                      <label key={level.value} className={`flex items-center p-3 rounded-xl border-2 cursor-pointer ${formData.urgency === level.value ? 'border-orange-500 bg-orange-50 dark:bg-gray-700' : isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                        <input type="radio" name="urgency" value={level.value} checked={formData.urgency === level.value} onChange={handleInputChange} className="sr-only"/>
                        <div className={`w-3 h-3 rounded-full mr-3 bg-${level.color}-500`}></div>
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{level.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Location *</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Address or coordinates"
                      className={`flex-1 px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'} ${errors.location ? 'border-red-500' : ''}`}
                    />
                    <button type="button" onClick={getCurrentLocation} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-xl">
                      <MapPin className="w-5 h-5" />
                    </button>
                  </div>
                  {errors.location && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.location}</p>}
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Upload Images (Max 5)</label>
                  <div className={`border-2 border-dashed rounded-xl p-6 text-center ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'}`}>
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload"/>
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Camera className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Click to upload or drag and drop</p>
                    </label>
                  </div>
                  {errors.images && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.images}</p>}
                  
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      {formData.images.map((file, index) => (
                        <div key={index} className="relative">
                          <img src={URL.createObjectURL(file)} alt={`Preview ${index + 1}`} className="w-full h-20 object-cover rounded-lg"/>
                          <button type="button" onClick={() => removeImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Detailed Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Provide detailed information about the issue..."
                rows={6}
                className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'} ${errors.description ? 'border-red-500' : ''}`}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.description}</p>}
            </div>

            <div className="mt-8 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-12 py-4 rounded-full font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Complaint
                    <Send className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ComplaintForm;
