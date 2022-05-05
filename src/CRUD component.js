import React, { useEffect, useState } from "react";
import axios from "axios";


function CrudeComponent() {

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [submit, setSubmit] = useState('')


    const [value, setValue] = useState({
        user: [''],
        error: {
            age: 'required',
        }

    });


    useEffect(async () => {
        var response = await axios.get(
            'https://622c4098087e0e041e06abea.mockapi.io/users'
        );
        // console.log(response.data);
        await setValue({ user: response.data }) 

        console.log(value)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(value)  


        if (name != '' && age != '' && email != '') {
            if (id) {
                var response = await axios.put(
                    `https://622c4098087e0e041e06abea.mockapi.io/users/${id}`,
                    {
                        name: name,
                        age: age, //
                        email: email
                    }
                )
                console.log(response)
                let index = value.user.findIndex((row) => row.id === id);
                let user = [...value.user];
                user[index] = response.data;
                setValue({ user })
                setName('')
                setAge('') //
                setEmail('')
                setId('')
                setSubmit('')


            }
            else {
                var response = await axios.post(
                    'https://622c4098087e0e041e06abea.mockapi.io/users',
                    {
                        name: name,
                        age: age, //
                        email: email
                    }

                );
                let user = [...value.user]
                user.push(response.data);
                setValue({ user })
                setName('')
                setAge('') //
                setEmail('')
                setSubmit('')
            }
        }
        else {
            setSubmit('Enter all required fields')
        }
    }

    const deleteData = async (id) => {
        let response = await axios.delete(
            `https://622c4098087e0e041e06abea.mockapi.io/users/${id}`
        )
        let user = value.user.filter((row) => row.id != id);
        setValue({ user })
    }


    const handleEdit = (id) => {
        let valueEdit = value.user.filter((row) => row.id === id)[0];
        setName(valueEdit.name)
        setAge(valueEdit.age)
        setEmail(valueEdit.email)
        setId(valueEdit.id)
    }

    const handleReset = () => {
        setName('')
        setAge('')
        setEmail('')
    }


    return (

        <>
            <div style={{ padding: '50px', margin: '50px', backgroundColor: 'pink' }}>
                <h3>CRUD Application using MOCK API</h3>
                <h3>Form data (Create/Update) </h3>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label>Name </label>
                        <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} /> <br /> <br />
                        <label>Age  </label>
                        <input type='text' name='age' value={age} onChange={(e) => setAge(e.target.value)} /> <br />
                        {/* <span style={{ color: 'red' }}>{value.error.age}</span>   */}
                        <br />
                        <label>Email </label>
                        <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)} /> <br /> <br />

                        <button type="submit">Submit</button> &nbsp; &nbsp;
                        <button type="button" onClick={handleReset}>Reset</button> <br />
                        <span style={{ color: 'red' }}>{submit}</span>  <br />

                    </div>
                </form> <br />

                <table border={1} >
                    <thead  >
                        <tr>
                            <td>Id</td>
                            <td>Name</td>
                            <td>Age</td>
                            <td>Email</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {value.user.map((row) => (
                            <tr>
                                <td>{row.id}</td>
                                <td>{row.name}</td>
                                <td>{row.age}</td>
                                <td>{row.email}</td>
                                <td><button onClick={() => handleEdit(row.id)}>Edit</button> &nbsp;
                                    <button onClick={() => deleteData(row.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table> <br />
                <div><b>NOTE: </b> <br /> 1)Enter data in form to hit MOCK API using post() and populate data in Table <br />
                    2) Press <b>Edit</b> button under Actions column to hit API with put() and update table  <br />
                    3) Press <b>Delete</b> button under Actions column to delete row using delete()
                </div>
            </div>
        </>
    )
}

export default CrudeComponent;
