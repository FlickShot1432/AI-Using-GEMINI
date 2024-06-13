import { isTokenActive } from "../utils/functions"
import { local } from "../utils/localStorage"

const withAuth = (RenderComponent, NavigateComponent) => ({ to, replace, ...props }) => {
    const token = local.get('token')
    return !isTokenActive(token) ? <RenderComponent {...props} /> : <NavigateComponent {...{ to, replace }} />
}

export default withAuth