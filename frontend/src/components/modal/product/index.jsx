import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/appState";
import { toast } from "react-hot-toast";

function ProductDetails({ setOpen }) {
  const {
    getProductById,
    addProduct,
    getAllProducts,
    productId,
    setProductId,
  } = useContext(AppContext);
  const [title, setTitle] = useState("Add Product");
  const [product, setProduct] = useState({
    _id: "",
    brand: "",
    title: "",
    description: "",
    img: [],
    category: [],
    price: 0,
    stock: 0,
  });

  const handleAddProduct = async () => {
    const { brand, title, img, category, price, stock } =
      product;
    if (!brand || !title || !img || !category || !price || !stock) {
      toast.error("all fields require");
      return;
    }
    await addProduct(product);
    setOpen(false);
    if (title === "Update Product") {
      await getAllProducts();
    }
    toast.success("product added successfully");
  };

  const clear = () => {
    setProduct({
      brand: "",
      title: "",
      description: "",
      img: [],
      category: [],
      price: 0,
      stock: 0,
    });
  };

  useEffect(() => {
    if (!productId) return;
    (async () => {
      setTitle("Update Product");
      const data = await getProductById(productId, true);
      setProduct(data);
    })();
    return () => {
      setProductId(null);
    };
  }, []);
  return (
    <div>
      <p>{title}</p>
      <div
        className={`addOrUpdateProduct flex gap-2 justify-between w-[100%] shadow-lg py-3 px-5 } transition-transform ease-in`}
      >
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="title"
            value={product.title}
            name="title"
            onChange={(e) => {
              setProduct({ ...product, [e.target.name]: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="brand"
            value={product.brand}
            onChange={(e) => {
              setProduct({ ...product, [e.target.name]: e.target.value });
            }}
            name="brand"
          />
          <textarea
            name="description"
            id=""
            rows="6"
            placeholder="description"
            value={product.description}
            onChange={(e) => {
              setProduct({ ...product, [e.target.name]: e.target.value });
            }}
          ></textarea>
          <div className="flex justify-between gap-2">
            <input
              type="number"
              placeholder="stock"
              value={product.stock}
              onChange={(e) => {
                setProduct({ ...product, [e.target.name]: e.target.value });
              }}
              name="stock"
            />
            <input
              type="number"
              placeholder="price"
              value={product.price}
              onChange={(e) => {
                setProduct({ ...product, [e.target.name]: e.target.value });
              }}
              name="price"
            />
          </div>
          <input
            type="text"
            placeholder="enter category with space"
            value={product.category}
            onChange={(e) => {
              setProduct({ ...product, [e.target.name]: e.target.value });
            }}
            name="category"
          />
          <div className="flex gap-1">
            <button
              className="bg-gray-300 font-medium flex-1 hover:bg-gray-400"
              onClick={handleAddProduct}
            >
              {title}
            </button>

            <button
              className="bg-red-400 font-medium text-white hover:bg-red-500
                w-max"
              onClick={clear}
            >
              Clear
            </button>
            <button
              className="bg-red-400 font-medium text-white hover:bg-red-500
                w-max"
              onClick={() => {
                setOpen(false);
              }}
            >
              Close
            </button>
          </div>
        </div>

        <div className="flex w-[100%] flex-col gap-2 ">
          <input
            type="text"
            placeholder="enter image url for multiple enter with space"
            value={product.img}
            onChange={(e) => {
              setProduct({ ...product, [e.target.name]: e.target.value });
            }}
            name="img"
          />

          <div className="h-[332px]">
            {product.img.length > 0 && (
              <img
                className="h-[100%] w-[100%] object-contain"
                src={product.img}
                alt=""
              />
            )}
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default ProductDetails;
