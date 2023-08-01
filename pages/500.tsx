import { Htag } from "../components"
import { withLayout } from "../layout/Layout"

function Error500(): JSX.Element {
    
    return (
      <>
        <Htag tag="h1">500 Error</Htag>
      </>
    )
  }
  
  export default withLayout(Error500)