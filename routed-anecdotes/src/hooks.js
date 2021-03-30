import {useState} from 'react'

export const useField = (type) => {
    const [value,
        setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const attrib = () => {
        return {type, value, onChange}
    }

    const reset = () => {
        setValue('')
    }

    return {type, value, attrib, reset, onChange}
}
