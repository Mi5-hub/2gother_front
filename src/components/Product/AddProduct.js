import axios from 'axios';
import React, { useEffect, useState } from 'react';

  const AddProduct = () => {
    const [product,setProduct] = useState({
        title: "Google Pixel - Black",
        img: "img/healthy-food-shopping.jpg",
        price: 10,
        info: "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
        inCart: false,
        count: 0,
        total: 0,
        subscriptionDays: 0,
        time: "00:00"
      })
      const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
          ...prevProduct,
          [name]: value
        }));
      };
    const saveProduct =async()=>{
        try {
              await axios.post('http://localhost:3000/products/addProduct',product);
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <div className="flex justify-center mt-20">
        <div className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-info-title">
                        Title
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-info-title" type="text" placeholder="Products name" name='title' onChange={handleChange}/>
                    <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-info-price">
                        Price
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-info-price" type="number" placeholder="0" name="price" onChange={handleChange} />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-info">
                        Info
                    </label>
                    <textarea className="appearance-none block  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-info" type="area" placeholder="Product description" name='info' onChange={handleChange}/>
                    <p className="text-gray-600 text-xs italic">Describe your product here !!! </p>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-total-stock">
                        Total in Stock
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-total-stock" type="number" placeholder="Total Stock" name='total' onChange={handleChange} />
                </div>

                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-4">
                    <button class=" w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" style={{height: "-webkit-fill-available"}} onClick={saveProduct}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default AddProduct