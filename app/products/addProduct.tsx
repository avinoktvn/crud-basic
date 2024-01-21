"use client";

import { useRouter } from "next/navigation";
import { SyntheticEvent, useRef, useState } from "react";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef();

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent, event?: React.keyboardEvent<HTMLInputElement>) => {
    const keyword = searchRef.current?.value;
    if (!keyword || keyword.trim() === "") return;

    if (event?.key === "Enter" || event?.type === "click") {
      e.preventDefault();
      router.push(`/products/${keyword}`);
    }

    e.preventDefault();
    setIsLoading(true);
    await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price,
      }),
    });
    // if (!handleSubmit || handleSubmit.trim() === "") return;

    // if (event.key === "Enter" || event.type === "click") {
    //   e.preventDefault();
    //   router.push(`/products/${keyword}`);
    // }
    setIsLoading(false);
    setTitle("");
    setPrice("");
    router.refresh();
    setModal(false);
  };

  function handleChange() {
    setModal(!modal);
  }
  return (
    <div>
      <button className="btn" onClick={handleChange}>
        Add New
      </button>
      <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Product</h3>
          <form onSubmit={handleSubmit}>
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
                  Save
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
