import { connect } from 'react-redux'
import Canvas from 'components/atoms/Canvas/Canvas'
import * as viewActionCreators from 'shared/redux/view/actionCreators'

const mapStateToProps = (state, ownProps) => {
    return ({
        viewState : state.view,
        className : ownProps.className,
        size : ownProps.size,
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        viewActions : {
            setView : (viewName) => { dispatch(viewActionCreators.setView({ view : viewName })) },
            clearView : () => { dispatch(viewActionCreators.clearView()) }            
        }
    })
}


const CanvasContainer = connect(mapStateToProps, mapDispatchToProps)(Canvas)
export default CanvasContainer