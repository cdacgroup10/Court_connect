import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const AddGroundForm = () => {
  let navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [locations, setLocations] = useState([]);
  const [ground, setGround] = useState({
    name: "",
    description: "",
    width: "",
    height: "",
    price: "",
    length: "",
    locationId: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    width: "",
    height: "",
    price: "",
    length: "",
    locationId: "",
    image: "",
  });

  const retrieveAllLocations = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/location/fetch/`);
    return response.data;
  };

  useEffect(() => {
    const getAllLocations = async () => {
      const resLocation = await retrieveAllLocations();
      if (resLocation) {
        setLocations(resLocation.locations);
      }
    };

    getAllLocations();
  }, []);

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    //validation for ground name 
    if (!ground.name.trim()) {
      newErrors.name = "Ground Name is required";
      valid = false;
    } else if (!/^[a-zA-Z ]{3,30}$/.test(ground.name)) {
      newErrors.name = "Ground Name must be 3-30 characters long, contain only letters, and have spaces.";
      valid = false;
    } else {
      newErrors.name = "";
    }

    //validation for ground description field 

   if (!ground.description.trim()) {
  newErrors.description = "Ground Description is required";
  valid = false;
} else if (!/^[a-zA-Z0-9 ]*$/.test(ground.description)) {
  newErrors.description = "Ground Description should contain only letters, numbers, and spaces";
  valid = false;
} else if (ground.description.length > 500) {
  newErrors.description = "Ground Description must be less than 500 characters";
  valid = false;
} else {
  newErrors.description = "";
}

    if (!ground.width || isNaN(ground.width) || ground.width <= 0) {
      newErrors.width = "Ground width must be a positive number";
      valid = false;
    } else {
      newErrors.width = "";
    }

    if (!ground.length || isNaN(ground.length) || ground.length < 0) {
      newErrors.length = "Ground length must be a positive number";
      valid = false;
    } else {
      newErrors.length = "";
    }

    if (!ground.height || isNaN(ground.height) || ground.height < 0) {
      newErrors.height = "Ground height must be a positive number";
      valid = false;
    } else {
      newErrors.height = "";
    }

    //validation for price 
    if (!ground.price || isNaN(ground.price) || ground.price < 0) {
      newErrors.price = "Price must be a positive number";
      valid = false;
    } else {
      newErrors.price = "";
    }

    if (!ground.locationId) {
      newErrors.locationId = "Location is required";
      valid = false;
    } else {
      newErrors.locationId = "";
    }

    //validation for image select 
    if (!selectedImage) {
      newErrors.image = "Image is required";
      valid = false;
    } else {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.webp|\.svg|\.tiff)$/i;
      
      if (!allowedExtensions.test(selectedImage.name)) {
        newErrors.image = "Only image files are allowed (jpg, jpeg, png, gif, bmp, webp, svg, tiff)";
        valid = false;
      } else {
        newErrors.image = "";
      }
    }
    

    setErrors(newErrors);
    return valid;
  };

  const handleInput = (e) => {
    setGround({ ...ground, [e.target.name]: e.target.value });
  };

  const saveGround = (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("name", ground.name);
    formData.append("description", ground.description);
    formData.append("locationId", ground.locationId);
    formData.append("width", ground.width);
    formData.append("height", ground.height);
    formData.append("price", ground.price);
    formData.append("length", ground.length);

    axios
      .post(`${API_BASE_URL}/api/ground/add`, formData)
      .then((result) => {
        if (result.status === 200) {
          toast.success("Ground added successfully!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        } else {
          toast.error("Failed to add ground. Please try again.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div>
      <div className="mt-2 d-flex align-items-center justify-content-center">
        <div className="card form-card border-color custom-bg" style={{ width: "50rem" }}>
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title">Add Ground</h5>
          </div>
          <div className="card-body text-color">
            <form className="row g-3">
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label">
                  <b>Ground Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={handleInput}
                  value={ground.name}
                  required
                />
                {errors.name && <div className="text-danger">{errors.name}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="description" className="form-label">
                  <b>Ground Description</b>
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  onChange={handleInput}
                  value={ground.description}
                  required
                />
                {errors.description && <div className="text-danger">{errors.description}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  <b>Location</b>
                </label>
                <select
                  name="locationId"
                  onChange={handleInput}
                  className="form-control"
                  value={ground.locationId}
                  required
                >
                  <option value="">Select Location</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.city}
                    </option>
                  ))}
                </select>
                {errors.locationId && <div className="text-danger">{errors.locationId}</div>}
              </div>

              <div className="col-md-6 mb-3 mt-1">
                <label htmlFor="width" className="form-label">
                  <b>Ground Width</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="width"
                  name="width"
                  onChange={handleInput}
                  value={ground.width}
                  required
                />
                {errors.width && <div className="text-danger">{errors.width}</div>}
              </div>

              <div className="col-md-6 mb-3 mt-1">
                <label htmlFor="length" className="form-label">
                  <b>Ground Length</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="length"
                  name="length"
                  onChange={handleInput}
                  value={ground.length}
                  required
                />
                {errors.length && <div className="text-danger">{errors.length}</div>}
              </div>

              <div className="col-md-6 mb-3 mt-1">
                <label htmlFor="height" className="form-label">
                  <b>Ground Height</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="height"
                  name="height"
                  onChange={handleInput}
                  value={ground.height}
                  required
                />
                {errors.height && <div className="text-danger">{errors.height}</div>}
              </div>

              <div className="col-md-6 mb-3 mt-1">
                <label htmlFor="price" className="form-label">
                  <b>Price</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  onChange={handleInput}
                  value={ground.price}
                  required
                />
                {errors.price && <div className="text-danger">{errors.price}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="image" className="form-label">
                  <b>Select Ground Image</b>
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="image"
                  name="image"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                  required
                />
                {errors.image && <div className="text-danger">{errors.image}</div>}
              </div>

              <div className="d-flex align-items-center justify-content-center">
                <button
                  type="submit"
                  className="btn bg-color custom-bg-text"
                  onClick={saveGround}
                >
                  Add Ground
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddGroundForm;
