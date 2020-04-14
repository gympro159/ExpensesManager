import React, {useState} from 'react'
import Navs from './../../components/Navs/Navs';

export default function Radio() {
    const [gender, setGender] = useState("Male");
    const [confirm, setConfirm] = useState(true)

    const handleRadio = (e) => {
        setGender(e.target.value)
    }

    const handleRadio2 = () => {
        setConfirm(!confirm)
    }

    return (
        <>
            <Navs/>
            <div className="container">
                <div className="row">  
                    <div className="col-md-6">
                        <div className="form-check">
                            <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="" id="" value="Female" checked={(gender==="Female"?true:false)} onChange={handleRadio}/>
                            Female
                        </label>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="" id="" value="Male" checked={(gender==="Male"?true:false)} onChange={handleRadio}/>
                            Male
                        </label>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="" id="" value="Others" checked={(gender==="Others"?true:false)} onChange={handleRadio}/>
                            Others
                        </label>
                        </div>
                        <h1>Your gender: {gender}</h1>
                    </div>
                    <div className="col-md-6">
                        <div className="form-check">
                            <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="" id="" checked={confirm} onChange={handleRadio2}/>
                            Female
                        </label>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="" id="" checked={!confirm} onChange={handleRadio2}/>
                            Male
                        </label>
                        </div>
                        
                        <h1>Are you fresher?: {String(confirm)}</h1>
                    </div>
                </div>
            </div>
        </>
    )
}
