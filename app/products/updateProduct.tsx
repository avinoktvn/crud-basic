"use client";

import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
};

const UpdateProduct = (product: Product) => {
  const [title, setTitle] = useState([product.title]);
  const [price, setPrice] = useState([product.price]);
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await fetch(`http://localhost:5000/products/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price,
      }),
    });
    setIsLoading(false);
    router.refresh();
    setModal(false);
  };

  function handleChange() {
    setModal(!modal);
  }
  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleChange}>
        Edit
      </button>
      <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit {product.title}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Title</label>
              <input type="text" value={title} placeholder="Product Name" className="input w-full input-border" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-control">
              <label className="label font-bold">Price</label>
              <input type="text" value={price} placeholder="Price" className="input w-full input-border" onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isLoading ? (
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
