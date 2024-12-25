import React from 'react'

const Navbar = () => {
return (
    <div>
        <div className='w-full fixed py-5 px-4 md:px-12 lg:px-16 shadow-lg bg-slate-50 z-10'>
            <div className='flex justify-between items-center'>
                <div className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-950 via-slate-800 to-slate-500 bg-clip-text text-transparent drop-shadow-lg'>Workout Planner</div>
                <div className='flex gap-3'>
                    {/* <div className='py-2 px-3'>Home</div> */}
                    <button className='px-4 py-2 text-sm md:text-base text-slate-950 bg-slate-100 active:scale-95 rounded-lg hover:shadow-lg shadow-md '>Sign up</button>
                    <button className='px-4 py-2 text-sm md:text-base text-slate-50 bg-cyan-500 active:scale-95 hover:text-white rounded-lg hover:shadow-lg shadow-md'>Log in</button>
                </div>
            </div>
        </div>
    </div>
)
}

export default Navbar