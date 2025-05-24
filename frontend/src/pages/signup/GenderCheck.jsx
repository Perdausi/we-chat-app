import React from 'react'

const GenderCheck = ({onCheckBoxChange, selectedGender}) => {
  return (
    <div className='flex items-start my-4'>
        <div className="form-control">
          <label className={`cursor-pointer label`}>
            <span className="label-text text-white text-lg font-roboto font-bold">Gender</span>
            <img src="/man.png" alt="icon man" className='w-8 h-8 '/>
            <input type="checkbox" className="checkbox checkbox-success" 
              checked = {selectedGender === "male"}
              onChange={() => onCheckBoxChange("male")}
            />

            <label className={`cursor-pointer label`}>
            <img src="/woman.png" alt="icon women" className='w-8 h-8 ml-3'/>
            <input type="checkbox" className="checkbox checkbox-success" 
              checked = {selectedGender === "female"}
              onChange={() => onCheckBoxChange("female")}
            />

        </label>
        </label>
    </div>
    </div>
  )
}

export default GenderCheck