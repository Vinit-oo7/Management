
import React, { useState } from 'react'

const Input = () => {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [list, setList] = useState([])
    const [editId, setEditId] = useState(null)

    const handleClick = () => {
        console.log(name);
        console.log(surname);

        const obj = { name, surname }
        console.log(obj);

        if (editId != null) {
            let copy = [...list]
            copy[editId] = obj
            setList(copy)
            setEditId(null)
        }
        else {
            setList([...list, obj])
        }
        setName('')
        setSurname('')
    }

    const handleDelete = (index) => {
        let copyData = [...list]
        copyData.splice(index, 1)
        setList(copyData)
    }

    const updateData = (i, index) => {
        setName(i.name)
        setSurname(i.surname)
        setEditId(index)
    }

    return (
        <div>
            {/* <input type="text" name="" id="" onChange={(e) => console.log(e.target.value)
        } /> <br /><br /> */}

            <input type="text" name="" id="" value={name} onChange={(e) => setName(e.target.value)
            } /> <br /><br />
            <input type="text" name="" id="" value={surname} onChange={(e) => setSurname(e.target.value)} />
            <br /><br />
            <button onClick={handleClick}>Submit</button>

            <table border={1}>
                <thead>
                    <tr>
                        <td>name</td>
                        <td>surname</td>
                        <td>DELETE</td>
                        <td>Update</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((i, index) => (
                            <tr key={index}>
                                <td>{i.name}</td>
                                <td>{i.surname}</td>
                                <td>
                                    <button onClick={() => handleDelete(index)}>DELETE</button>
                                </td>
                                <td>
                                    <button onClick={() => updateData(i, index)}>UPDATE</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default Input

