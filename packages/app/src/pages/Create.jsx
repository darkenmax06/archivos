import LeftMenuContext from "../components/menus/LeftMenuContext"
import "./create.css"
import {RegisterForms} from "../components/forms/RegisterForm"

function Create  () {
  return (
    <LeftMenuContext>
        <div className="container">
          <div className="create">
            <RegisterForms/>
          </div>
        </div>
    </LeftMenuContext>
  )
}

export default Create