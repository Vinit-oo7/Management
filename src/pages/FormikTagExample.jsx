import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'

const FormikTagExample = () => {
    const [ini, setIni] = useState({
        username: '',
        age: ''
    })

    const [list, setList] = useState([])
    const [editId, setEditId] = useState(null)

    const handleSubmit = (values, { resetForm }) => {
        if (editId !== null) {
            // Update
            const updatedList = list.map((item, index) =>
                index === editId ? values : item
            )
            setList(updatedList)
            setEditId(null)
        } else {
            // Add
            setList([...list, values])
        }

        resetForm()
        setIni({ username: '', age: '' })
    }

    const handleEdit = (item, index) => {
        setIni(item)
        setEditId(index)
    }

    const handleDelete = (index) => {
        const filteredList = list.filter((_, i) => i !== index)
        setList(filteredList)
    }

    return (
        <div>
            <Formik
                initialValues={ini}
                enableReinitialize
                onSubmit={handleSubmit}
            >
                <Form>
                    <Field name="username" placeholder="Username" />
                    <br /><br />

                    <Field type="number" name="age" placeholder="Age" />
                    <br /><br />

                    <button type="submit">
                        {editId !== null ? "Update" : "Submit"}
                    </button>
                </Form>
            </Formik>

            <br />

            <table border={1}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => (
                        <tr key={index}>
                            <td>{item.username}</td>
                            <td>{item.age}</td>
                            <td>
                                <button onClick={() => handleEdit(item, index)}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(index)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default FormikTagExample