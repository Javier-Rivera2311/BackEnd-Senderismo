const parseoValores = ( data ) => { 

    let changes = []; //valores a reemplazar
    let fields = []; //valores de reemplazo    

    Object.keys(data).forEach((key) => {
        if ((data[key] !== undefined && key && data[key]) || data[key] === 0) {
          fields.push(data[key]);
          changes.push(`${key}=?,`);
        }
    });

    changes = changes.join(" ").slice(0, -1); // Eliminar la coma al final

    return {changes: changes, fields: fields};
}

export{
    parseoValores
}