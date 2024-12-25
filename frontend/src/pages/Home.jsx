import React, { useEffect, useState } from 'react'
import WorkoutForm from '../components/workoutForm'

const Home = () => {

    const [workouts, setWorkouts] = useState([])

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
    }, [])

    const showWorkouts = () => {
        return workouts.map((workout) => (
            <div key={workout._id} className='border py-4 w-[80vw] md:w-[40vw] space-y-2 px-6 md:px-8 bg-gradient-to-r from-slate-100 via-slate-100 to-white shadow-sm rounded-lg'>
                <h2 className='text-2xl font-semibold text-emerald-500 drop-shadow-sm'>{workout.title}</h2>
                <div className='px-2 gap-4'>
                    <p><span className='font-semibold'> Reps: </span> {workout.reps}</p>
                    <p><span className='font-semibold'> Load: </span> {workout.load}</p>
                    <p className='font-light '>{workout.updatedAt}</p>
                </div>
            </div>
        ))
    }

    return (
        <div>
            <div className='h-full w-full bg-slate-50 flex flex-col-reverse md:flex-row '>\

                {/* list of workouts */}
                <div className='md:py-28 px-4 md:px-6 w-full md:w-1/2 flex flex-col justify-center items-center gap-4'>
                    <h1 className='text-4xl py-1 font-semibold block md:hidden'>List of Workouts</h1>
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