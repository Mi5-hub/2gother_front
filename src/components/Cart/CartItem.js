import React from 'react'
import { ThemeConsumer } from '../context/ThemeContexts';

export default function CartItem ({item,value}) {
    const {id, title, img, price, total, count,subscriptionDays,time} = item;
    const {increment,decrement,removeItem,incrementSubscription,decrementSubscription,setTime} = value;
    return (
        <ThemeConsumer>
        {({ theme }) => (
                <div className="row my-2 text-center ">
                    <div className="col-10 mx-auto col-lg-2" style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        fontSize:"0.7rem"
                    }}>
                        <img src={img} style={{ width: "5rem", height: "5rem" }} className="img-fluid" alt="product" />
                        {title}
                    </div>
   
           <div className={theme ? "col-10 mx-auto col-lg-2 text-light" : "col-10 mx-auto col-lg-2"}>
                <span className={theme ? "d-lg-none text-light" : "d-lg-none"}>price : </span>{price}
           </div>
           <div className="col-10 mx-auto col-lg-2 my-2 my-lg-2-0">
             <div className="d-flex justify-content-center">
                 <div>
                    <span className={theme ? "btn btn-light mx-1 text-black" : "btn btn-black mx-1"} onClick={()=>decrement(id)}>-</span>
                    <span className={theme ? "btn btn-light mx-1 text-black" : "btn btn-black mx-1"}>{count}</span>
                    <span className={theme ? "btn btn-light mx-1 text-black" : "btn btn-black mx-1"} onClick={() => increment(id)}>+</span>
                 </div>
             </div> 
           </div>
           <div className="col-10 mx-auto col-lg-2 my-2 my-lg-2-0">
             <div className="d-flex justify-content-center">
                 <div>
                    <span className={theme ? "btn btn-light mx-1 text-black" : "btn btn-black mx-1"} onClick={()=>decrementSubscription(id)}>-</span>
                    <span className={theme ? "btn btn-light mx-1 text-black" : "btn btn-black mx-1"}>{subscriptionDays} days</span>
                    <span className={theme ? "btn btn-light mx-1 text-black" : "btn btn-black mx-1"} onClick={() => incrementSubscription(id)}>+</span>
                 </div>
             </div> 
           </div>
           <div className={theme ? "col-10 mx-auto col-lg-2 text-light" : "col-10 mx-auto col-lg-2"} >
               {/* <span className={theme ? "d-lg-none text-light" : "d-lg-none"}>product : </span>{title} */}
               <input value={time} type="time" onChange={(e)=> setTime(id,e.target.value)}></input>
           </div>
            {/**/} 
            {/* <div className={theme ? "col-10 mx-auto col-lg-2 text-light" : "col-10 mx-auto col-lg-2"} >
                <div className="cart-icon" onClick={()=>removeItem(id)}>
                    <i className="fas fa-trash"></i>
                </div>
            </div> */}
            <div className={theme ? "col-10 mx-auto col-lg-2 text-light" : "col-10 mx-auto col-lg-2"} >
                <strong>item total : $ {total}</strong>
            </div>
        </div>
         )}
         </ThemeConsumer>
    )
}
