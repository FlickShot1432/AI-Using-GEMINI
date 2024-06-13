import { isTokenActive } from "../utils/functions"
import { local } from "../utils/localStorage"

const withUser = (RenderComponent, NavigateComponent) => ({ to, replace, ...props }) => {
    const token = local.get('token')
    return isTokenActive(token) ? <RenderComponent {...props} /> : <NavigateComponent {...{ to, replace }} />
}

export default withUser