import React from 'react'
import { useState } from 'react'

const workoutForm = () => {

    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newWorkout = {
            title,
            reps,
            load
        }

        try {
            if(!title || !reps || !load) {
                throw 'All fields are required'
            }


            const response = await fetch('http://localhost:5000/workouts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newWorkout)
            })

            const data = await response.json()
            setError(null)
            setTitle('')
            setReps('')
            setLoad('')

            console.log(data)
        } catch (error) {
            setError(error)
            console.log(error)
        }
    }


    return (
        <div>
            <form className='flex h-fit flex-col gap-2 border px-12 lg:px-16 py-8  rounded-lg shadow-sm'
                onSubmit={handleSubmit}
            >
                <h3 className='text-3xl pb-4'>Add a New Workout</h3>
                <label className='text-xl'> Excercise Title: </label>
                <input type="text" value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Enter the excercise title'
                    className='py-1 px-4 rounded-md outline-none'
                />

                <label className='text-xl'> Reps: </label>
                <input type="number" value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    placeholder='Enter the number of reps'
                    className='py-1 px-4 rounded-md outline-none'
                />

                <label className='text-xl'> Load: </label>
                <input type="number" value={load}
                    onChange={(e) => setLoad(e.target.value)}
                    placeholder='Enter the load'
                    className='py-1 px-4 rounded-md outline-none'
                />

                

                <button className='mt-[10vh] bg-green-50 rounded-lg px-5 py-2 border hover:shadow-sm active:scale-[0.98]' >Add Workout</button>
                {error && <p className='mt-2 text-red-500 py-1 bg-red-50 text-center border-l-2 border-red-300 rounded-r-md'>{error}</p>}
            </form>


        </div>
    )
}

export default workoutForm;