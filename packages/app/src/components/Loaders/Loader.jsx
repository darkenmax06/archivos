import "./bitLoader.css"

function Loader  ({size = "s"}) {
  const sizes = {
    "s": {width: "30px", height: "30px"},
    "m": {width: "50px", height: "50px"},
    "l": {width: "100px", height: "100px"}
  }

  const style = sizes[size] || sizes["s"]

  return (
    <span className="bit-loader" style={style} >

    </span>
  )
}

export {Loader}