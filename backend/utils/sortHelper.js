
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

const sort = (req, data)=>{
  if(data == undefined || data.length === 0 ){return []}
    let collumn = req.query._sort;
    if (typeof data[0][collumn]==="number" || typeof data[0][collumn] === "boolean" || collumn === "createdAt" || collumn === "updatedAt" ) {
      req.query._order === "ASC" ? data.sort((a, b) => a[collumn] - b[collumn]) : data.sort((a, b) => b[collumn] - a[collumn]);
      data = data.slice(req.query._start, req.query._end);
  } else if (collumn === "id" || typeof data[0][collumn]==="object") {
      req.query._order === "ASC" ? data.sort((a, b) => parseInt(a[collumn]) - parseInt(b[collumn])) : data.sort((a, b) => parseInt(b[collumn]) - parseInt(a[collumn]));
      data = data.slice(req.query._start, req.query._end);
  }
  else {
    data.sort((a, b) => compare(a[collumn], b[collumn], req.query._order));
    data = data.slice(req.query._start, req.query._end);
  }

  return data;
  }

  module.exports = {sort};