import './Card.scss'

const Card = ({ id, name, desc, price, available, image }) => {


  return (
    <div className={available ? "shadow-lg rounded-xl shadow-gray" : 'overlay'}>
      <figure><img src={image} alt="food" /></figure>
      <div className="card-body relative h-[250px]  md:h-[250px] lg:h-[230px] w-full">
        <h2 className="card-title text-gray-600 text-left">{name}</h2>
        <p className='text-left text-sm'>{desc}</p>
        {/* <span className='text-right'>Unavailable</span> */}
        <div className="flex flex-row mt-24 gap-12 items-center absolute right-0 bottom-0 ">
          <p className='text-md text-red-500 font-bold'>Ghc{price}</p>
            <button className="btn btn-warning mr-2 mb-4"> Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default Card;