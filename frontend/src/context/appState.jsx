import { useState } from "react";
import { createContext } from "react";
import { getRequest, postRequest } from "../services";
import { useEffect } from "react";
import { BACKEND_URL } from "../config";
import { useRef } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [products, setProducts] = useState(null);
  const [newProduct, setNewProduct] = useState(null);
  const [orders, setOrders] = useState(null);
  const [newOrder, setNewOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState({
    processing: 0,
    shipped: 0,
    delivered: 0,
    returns: 0,
  });

  const status = ["Shipped", "Delivered", "processing", "returns"];
  const [productId, setProductId] = useState(null);

  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);

  const [revenueStructure, setRevenueStructure] = useState({
    netProfit: 0,
    stripeFee: 0,
    shipping: 0,
    tax: 0,
    cost: 0,
  });
  const [revenue, setRevenue] = useState(0);

  const [productBuyingRange, setProductBuyingRange] = useState([]);
  const [orderBuyingRange, setOrderBuyingRange] = useState([]);
  const range = [0, 1000, 10000, 20000, 50000, 100000, 150000, 200000];

  const modelRef = useRef(null);

  async function getAllUsers() {
    const response = await getRequest(`${BACKEND_URL}/users`);
    console.log(response);
    if (!response.success) {
      setError(response.message);
      return [];
    }
    const data = response.data;
    setUsers(data);
    return;
  }

  async function getAllProducts() {
    const response = await getRequest(`${BACKEND_URL}/products`);
    if (!response.success) {
      setError(response.message);
      return [];
    }
    const data = response.data;
    setProducts(data);
    return;
  }

  async function getProductById(id, formattedData = false) {
    const response = await getRequest(`${BACKEND_URL}/products/${id}`);
    if (!response.success) {
      setError(response.message);
      return [];
    }
    const data = response.data;
    if (formattedData) {
      const { _id, brand, title, description, img, category, price, stock } =
        data;
      return {
        id: _id,
        brand,
        title,
        description,
        img,
        category,
        price,
        stock,
      };
    }
    return data;
  }

  async function addProduct(productDetails) {
    // id, title, description, img, price, stock, brand
    const response = await postRequest(
      `${BACKEND_URL}/products/addProduct`,
      productDetails
    );

    if (!response.success) {
      setError(response.message);
      return [];
    }
    const data = response.data;
    let index = products.findIndex((ele) => ele._id === data._id);
    if (index === -1) {
      setProducts((product) => [...product, data]);
    } else {
      setProducts((product) => {
        product[index] = data;
      });
    }
    setNewProduct(data);
    return;
  }

  function calculateProductBuyingRange(products, type = 1) {
    const temp = [];
    for (let i = 1; i < range.length; i++) {
      let len = products.filter((product) => {
        return product.price > range[i - 1] && product.price <= range[i];
      }).length;
      temp.push(len);
    }
    type === 1 ? setProductBuyingRange(temp) : setOrderBuyingRange(temp);
  }

  function getOrderedProductsRange() {
    let orderedItems = [];
    orders.forEach((order) => {
      orderedItems.push(order.orderItems);
    });
    orderedItems = orderedItems.flat();
    calculateProductBuyingRange(orderedItems, 0);
  }

  async function getAllOrders() {
    const response = await getRequest(`${BACKEND_URL}/orders`);
    if (!response.success) {
      setError(response.message);
      return;
    }
    const data = response.data;
    setOrders(data);
    const totalRevenue = data.reduce(
      (acc, ele) => acc + ele.paymentInfo.amountPaid,
      0
    );
    setRevenue(totalRevenue);
    return;
  }

  const calculateProductAccordingToStatus = () => {
    const count = {
      processing: 0,
      shipped: 0,
      delivered: 0,
      returns: 0,
    };

    orders.forEach((order) => {
      if (order.orderStatus === "Shipped") {
        count.shipped += 1;
      } else if (order.orderStatus === "Delivered") {
        count.delivered += 1;
      } else if (order.orderStatus === "processing") {
        count.processing += 1;
      } else {
        count.returns += 1;
      }
    });
    setOrderStatus(count);
    console.log(count);
  };

  const calculateRevenue = (totalRevenue) => {
    const newRevenueStructure = {
      totalRevenue,
      netProfit: parseFloat((totalRevenue * 0.35).toFixed(2)),
      stripeFee: parseFloat((totalRevenue * 0.04).toFixed(2)),
      shipping: parseFloat((totalRevenue * 0.15).toFixed(2)),
      tax: parseFloat((totalRevenue * 0.06).toFixed(2)),
      cost: parseFloat((totalRevenue * 0.41).toFixed(2)),
    };
    setRevenueStructure(newRevenueStructure);
  };

  useEffect(() => {
    if (!newOrder) return;
    (async () => {
      await getAllOrders();
    })();
  }, [newOrder]);

  useEffect(() => {
    if (!newProduct) return;
    console.log("running");
    (async () => {
      await getAllProducts();
    })();
  }, [newProduct]);

  useEffect(() => {
    (async () => {
      await getAllOrders();
      await getAllProducts();
    })();
  }, []);

  useEffect(() => {
    if (!products) return;
    calculateProductBuyingRange(products);
    console.log(products);
  }, [products]);

  useEffect(() => {
    if (!orders) return;
    // console.log(orderBuyingRange)
    calculateProductAccordingToStatus();
    calculateRevenue(revenue);
    getOrderedProductsRange();
  }, [orders]);

  return (
    <AppContext.Provider
      value={{
        revenueStructure,
        revenue,
        productBuyingRange,
        orderBuyingRange,
        orderStatus,
        status,
        orders,
        products,
        users,
        addProduct,
        getProductById,
        productId,
        setProductId,
        modelRef,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
