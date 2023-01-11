import React from 'react'

function Contact() {
    return (
        <div id="contact" className='w-full  md:h-screen lg:h-full'>
            <hr />
            <div className='max-w-[800px] m-auto px-2 py-20  w-full text-black'>
                <p className='text-3xl text-gray-600 font-bold inline border-b-4 border-yellow-300'>Get in touch</p>    
                <div className="pt-8 grid md:grid-cols-2 gap-8">
                    <div className='col-span-3 w-full h-auto shadow-sm shadow-gray-300 rounded-xl lg:p-4'>
                        <div className='p-4'>
                            <form>
                                <div className='grid md:grid-cols-2 gap-4 w-full py-2 '>
                                    <div className="flex flex-col">
                                        <label className='text-sm uppercase py-2'>Name</label>
                                        <input className='border-2 rounded-lg bg-transparent p-3 flex border-gray-300' name="name" required type="text" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className='text-sm uppercase py-2'>Phone number</label>
                                        <input className='border-2 rounded-lg bg-transparent p-3 flex border-gray-300' name="number" required type="text" />
                                    </div>
                                </div>
                                <div className="flex flex-col py-2">
                                    <label className='text-sm uppercase py-2'>Email</label>
                                    <input className='border-2 rounded-lg bg-transparent  p-3 flex border-gray-300' name="email" required type="email" />
                                </div>
                                <div className="flex flex-col py-2">
                                    <label className='text-sm uppercase py-2'>Subject</label>
                                    <input className='border-2 rounded-lg bg-transparent p-3 flex border-gray-300' required type="text" />
                                </div>
                                <div className="flex flex-col py-2">
                                    <label className='text-sm uppercase py-2'>Message</label>
                                    <textarea className="border-2 rounded-lg bg-transparent p-3 border-gray-300" rows='10' required></textarea>
                                </div>
                                <button className='border-2 border-yellow-300 rounded-md px-4 py-3 my-2 mx-auto flex items-center'>Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Contact