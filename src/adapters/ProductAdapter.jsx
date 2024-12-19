export const adaptProduct= (doc)=>{
   const data = doc.data();
    return{
        id:doc.id || null,
        name:data.name || " ",
        description:data.description || " ",
        category:data.category || " ",
        price:data.price || 0,
        stock:data.stock || 0,
        cantidad:data.cantidad || 0,
        isNewCollection:data.newCollection || false,
        destacado:data.destacado ,
        images:{
            product: data.imgProduct || "",
            soldOut:data.imgSoldOut || "",
            start:data.imgStar || ""
        },
        imgDetail:data.imgDetail ? 
        data.imgDetail.map((detail) =>({
            id:detail.id,
            img:detail.img
        })):[],
        talles:data.talles ? data.talles.map((talle) =>({
            id:talle.id,
            value:talle.value
        })) : [],
    };
};

export const adaptProducts = (doc)=>{
    return doc.map(adaptProduct);
};