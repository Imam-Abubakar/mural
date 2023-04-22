import { Fragment } from 'react'
import PanelItem from './PanelItem'
import PanelsList from './PanelsList'

function Panels() {
  return (
    <Fragment>
      <PanelsList />
      <PanelItem />
    </Fragment>
  )
}

export default Panels
