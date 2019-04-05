import { connect } from 'react-redux'
import App from './App'
import * as viewActionCreators from 'shared/redux/view/actionCreators'

const mapStateToProps = (state) => {
    return ({
        viewState : state.view
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        viewActions : {
            setView : (viewName) => { dispatch(viewActionCreators.setView({ view : viewName })) },
            clearView : () => { dispatch(viewActionCreators.clearView()) },
        }
    })
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)
export default AppContainer