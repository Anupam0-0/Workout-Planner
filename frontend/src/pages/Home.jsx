import React, { useEffect, useState } from 'react'
import WorkoutForm from '../components/workoutForm'

const Home = () => {

    const [workouts, setWorkouts] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/workouts')
                const data = await response.json()
                setWorkouts(data);
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [ refresh])

    const showWorkouts = () => {
        return workouts.map((workout) => (
            <div key={workout._id} className='flex justify-between border py-4 w-[80vw] md:w-[40vw] space-y-2 px-6 md:px-10 bg-gradient-to-r from-sky-50 via-slate-100 to-slate-50 shadow-sm rounded-lg'>
                <div >
                <h2 className='text-2xl font-semibold text-emerald-500 drop-shadow-sm capitalize py-2'>{workout.title}</h2>
                <div className='px-1 flex gap-1 flex-col'>
                    <p><span className='font-semibold '> Reps: </span> {workout.reps}</p>
                    <p><span className='font-semibold'> Load: </span> {workout.load}</p>
                    <p className='font-light '>{new Date(workout.updatedAt).toLocaleString()}</p>            
                </div>
                </div>
                <div className='flex flex-col gap-3 py-1 justify-center'>
                    <button className='w-full px-5 py-[4px] rounded-md shadow-sm  border active:scale-95 bg-stone-50 hover:bg-blue-400 hover:text-white hover:shadow-md'>Edit</button>
                    <button className='w-full px-5 py-[4px] rounded-md shadow-sm  border active:scale-95 bg-stone-50 hover:bg-red-400 hover:text-white hover:shadow-md'
                        onClick={() => handleDelete(workout._id)}   
                    >Delete</button>
                </div>
            </div>
        ))
    }

    const handleRefresh = () => {
        setRefresh(!refresh)
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/workouts/${id}`, {
                method: 'DELETE'
            })
            const data = await response.json()
            console.log(data)
            setRefresh(!refresh)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className=''>
            <div className='h-full w-full bg-slate-50 flex flex-col-reverse md:flex-row lg:px-16 pb-80'>\

                {/* list of workouts */}
                <div className='md:py-28 px-8 md:px-12 w-full md:w-1/2 flex flex-col  gap-4'>
                    <h1 className='text-4xl py-1 font-semibold block md:hidden'>List of Workouts</h1>
                    <button className=' w-fit px-4 py-[3px] -mb-3 rounded-md shadow-sm  border active:scale-95 bg-stone-50'
                     onClick={handleRefresh}> Refresh 🔃</button>
                    <div className='flex flex-col py-4 gap-4'>
                        {showWorkouts()}
                    </div>
                </div>

                {/* form for new workout */}
                <div className='py-28 px-4 md:px-6 flex flex-col justify-start items-center w-full md:w-1/2'>
                    <WorkoutForm />
                </div>

            </div>
        </div>
    )
}

export default Home