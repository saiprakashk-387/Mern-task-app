export const parseDate =(val)=>{
    let dt = new Date(val);
     let n = dt.toLocaleDateString();
     return n
   }