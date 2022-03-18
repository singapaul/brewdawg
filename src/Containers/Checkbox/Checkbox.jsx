import React from 'react'

const Checkbox = ({label, checked, handleChange, id}) => {
  return (
    <>

    <label htmlFor={id}>{label}</label>
    <input aria-label={label} id={id} name={label} type="checkbox" checked={checked}  onChange={handleChange}/>
    <br />
    
    
    </>
  )
}

export default Checkbox