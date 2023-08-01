import { Htag } from "../components"
import { withLayout } from "../layout/Layout"

export function Error404(): JSX.Element {
    
    return (
      <>
        <Htag tag="h1">404 not found</Htag>
      </>
    )
  }
  
  export default withLayout(Error404)