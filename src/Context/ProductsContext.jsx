import { createContext, useCallback, useState } from "react";

export const ProductsContext = createContext();


function loadProducts() {
    try {
        return JSON.parse(localStorage.getItem('products_v2') || '[]');
    } catch {
        return [];
    }
}

export default function ProductsContextProvider({ children }) {

    const [products, setProducts] = useState(loadProducts);

    const saveProducts = (array) => {
        setProducts(array);
        localStorage.setItem("products_v2", JSON.stringify(array));
    }

    const addProduct = useCallback((data) => {
        const newProduct = { ...data, id: Date.now(), createAt: new Date().toISOString() }
        saveProducts([...products, newProduct]);
    }, [products]);

    const updateProduct = useCallback((id, date) => {
        saveProducts(products.map(p => p.id === id ? { ...p, ...date } : p));
    }, [products]);

    const deleteProduct = useCallback((id) => {
        saveProducts(products.filter(p => p.id != id));
    }, [products]);


    return <ProductsContext.Provider value={{products, addProduct, updateProduct, deleteProduct}}>
        {children}
    </ProductsContext.Provider>
}
