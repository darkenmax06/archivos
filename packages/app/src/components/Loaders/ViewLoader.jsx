import { Loader } from "./Loader"
import "./viewLoader.css"

function ViewLoader  () {
  return (
    <div className="view-loader" >
      <Loader size="l" />
    </div>
  )
}

export default ViewLoader