import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    description: "",
  });

  const [images, setImages] = useState([]); 
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    if (id) {
      axiosInstance.get(`/products/${id}`).then((res) => {
        const data = res.data;
        setForm({
          title: data.title || "",
          price: data.price || "",
          category: data.category || "",
          brand: data.brand || "",
          stock: data.stock || "",
          description: data.description || "",
        });
        setImages(data.images || []);
        setExistingImages(data.images || []);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setImages([...existingImages, ...newFiles]);
  };

  const handleRemoveImage = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
    setExistingImages(updated.filter((img) => !(img instanceof File)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("brand", form.brand);
      formData.append("category", form.category);
      formData.append("stock", form.stock);

      images.forEach((image) => {
        if (image instanceof File) {
          formData.append("images", image);
        }
      });

      if (id) {
        await axiosInstance.put(`/products/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axiosInstance.post(`/products`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      navigate("/admin/products");
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{id ? "Edit" : "Add"} Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={form.stock}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <div>
          <p className="font-semibold mb-2">Product Images (up to 5)</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 w-full"
          />
          <div className="flex gap-2 flex-wrap mt-2">
            {images.map((img, idx) => (
              <div key={idx} className="relative">
                <img
                  src={img.url || (img instanceof File ? URL.createObjectURL(img) : "")}
                  alt=""
                  className="w-20 h-20 object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
}
