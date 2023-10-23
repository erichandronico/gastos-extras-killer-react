import { Button } from "devextreme-react"
import { useState } from "react"
import { trans } from "../../helpers/utils"


export const useVisibleButton = () => {

    const [isVisible, setIsVisible] = useState(false)

    const VisibleButton = ({text, children}) => (
        <>
            <Button text={trans(text)} icon="fas fa-eye" onClick={ () => setIsVisible( previo => !previo ) } />
            { isVisible && children  }
        </>

    )

  return { VisibleButton, isVisible }
}
