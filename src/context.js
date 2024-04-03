import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";
const ProductContext = React.createContext();


class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
        confirmedSubscription:false,
        
    };
    componentDidMount() {
        this.setProducts();
    }

    filterProducts = async (value) => {
        value = value.toLowerCase();
        let products = [];
        const productData = await storeProducts();
        
        productData.response.forEach(item => {
            if (item.title.toLowerCase().includes(value) || item.info.toLowerCase().includes(value)) {
                const singleItem = { ...item };
                products = [...products, singleItem];
            }
        });
        this.setState(() => {
            return { products };
        }, this.checkCartItems);
    }

    setProducts =async () => {
        let products = [];
        const productData = await storeProducts();
        console.log("jerena",productData.response);
        productData.response.forEach(item => {
            const singleItem = { ...item };
            products = [...products, singleItem];
        });
        this.setState(() => {
            return { products };
        }, this.checkCartItems);
    };

    getItem = id => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    };
    handleDetail = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return { detailProduct: product };
        });
    };
    addToCart = id => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        product.subscriptionDays = 1;
        const price = product.price;
        product.total = price;
        console.log("**********************",{product,id});
        this.setState(() => {
            return {
                products: [...tempProducts],
                cart: [...this.state.cart, product],
                detailProduct: { ...product }
            };
        }, this.addTotals);
    };
    openModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return { modalProduct: product, modalOpen: true };
        });
    };
    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false };
        });
    };
    incrementSubscription = id => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => {
            return item.id === id;
        });
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.subscriptionDays++;
        product.total = product.count * product.subscriptionDays * product.price;
        this.setState(() => {
            return {
                cart: [...tempCart]
            };
        }, this.addTotals);
    };
    decrementSubscription = id => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => {
            return item.id === id;
        });
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.subscriptionDays--;
        if (product.count === 0) {
            this.removeItem(id);
        } else {
            product.total = product.count * product.subscriptionDays * product.price;
            this.setState(() => {
                return { cart: [...tempCart] };
            }, this.addTotals);
        }
    };
    increment = id => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => {
            return item.id === id;
        });
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count + 1;
        product.total = product.count * product.subscriptionDays * product.price;
        this.setState(() => {
            return {
                cart: [...tempCart]
            };
        }, this.addTotals);
    };

    decrement = id => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => {
            return item.id === id;
        });
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count - 1;
        if (product.count === 0) {
            this.removeItem(id);
        } else {
            product.total = product.count * product.subscriptionDays * product.price;
            this.setState(() => {
                return { cart: [...tempCart] };
            }, this.addTotals);
        }
    };
    setTime = (id, value) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => {
            return item.id === id;
        });
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.time = value;
        this.setState(() => {
            return { cart: [...tempCart] }
        })
    };
    getTotals = () => {
        const total = this.state.cart
            .map(item => item.total)
            .reduce((acc, curr) => {
                acc = acc + curr;
                return acc;
            }, 0);
        // let subTotal = 0;
        // this.state.cart.map(item => (subTotal += item.total));
        // const tempTax = subTotal * 0.1;
        // const tax = parseFloat(tempTax.toFixed(2));
        // const total = subTotal + tax;
        return {

            total
        };
    };
    addTotals = () => {
        const totals = this.getTotals();
        this.setState(
            () => {
                return {
                    // cartSubTotal: totals.subTotal,
                    // cartTax: totals.tax,
                    cartTotal: totals.total
                };
            },
            () => {
                // console.log(this.state);
            }
        );
    };
    removeItem = id => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;
        removedProduct.subscriptionDays = 0;

        tempCart = tempCart.filter(item => {
            return item.id !== id;
        });

        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            };
        }, this.addTotals);
    };
    clearCart = () => {
        this.setState(
            () => {
                return { cart: [] };
            },
            () => {
                this.setProducts();
                this.addTotals();
            }
        );
    };
    confirmCart = () => {
        // Eto ilay mandefa any amin'ny back amzay
        const carts = [...this.state.cart]
        const products =  carts.map(({id,count,time,price})=>{
          return  {id,count,time,price};
        })
        const data = {
            userId:1,
            products,
            price:this.state.cartTotal
        }
        console.log("DATA TO POST",data);

        this.setState(
            () => {
                return { confirmedSubscription: true };
            }
        );
    };
    render() {
        return (
            <ProductContext.Provider
                value={{
                    ...this.state,
                    handleDetail: this.handleDetail,
                    addToCart: this.addToCart,
                    openModal: this.openModal,
                    closeModal: this.closeModal,
                    increment: this.increment,
                    incrementSubscription: this.incrementSubscription,
                    decrementSubscription: this.decrementSubscription,
                    setTime: this.setTime,
                    decrement: this.decrement,
                    removeItem: this.removeItem,
                    clearCart: this.clearCart,
                    confirmCart: this.confirmCart,
                    filterProducts: this.filterProducts
                }}
            >
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
