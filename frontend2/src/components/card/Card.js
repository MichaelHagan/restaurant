import './Card.scss'

const Card = ({ id, name, desc, price, available }) => {


  return (
    <div className={available ? "shadow-md rounded-xl shadow-[#957bcb]" : 'overlay'}>
      <figure><img src="food.jpg" /></figure>
      <div className="card-body">
        <h2 className="card-title text-gray-600">{name}</h2>
        <p className='text-left'>{desc}</p>
        <p className='text-left text-sm text-red-500'>Ghc{price}</p>
        {/* <span className='text-right'>Unavailable</span> */}
        <div className="card-actions justify-end">
          <button className="btn btn-warning"> Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default Card;