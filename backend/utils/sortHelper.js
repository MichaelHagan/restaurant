
const compare = (a,b,sort)=>{
    if(a!== null && b!== null){
    let first = a.split(' ').join('').toLowerCase();
    let second = b.split(' ').join('').toLowerCase();
    
    if(sort === 'ASC'){
    
      if(first>second)
      {
        return 1
      }else{
        return -1
      }
    
    }else{
      if(first>second)
      {
        return -1
      }else{
        return 1
      }
    }
    }
    }

    module.exports = {compare};