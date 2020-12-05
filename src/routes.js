import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Cadastro from './pages/Cadastro' 
import Alterar from './pages/Atualizar'
import Listagem from './pages/Listagem'
import Home from './pages/Home'


const appNavigation = createStackNavigator({
    home: {
        screen: Home,
      },
    registrar: {
    screen: Cadastro,
  },
    alterar: {
      screen: Alterar,
  },
    listagem: {
    screen: Listagem,
  },
},

)

const Routes = createAppContainer(appNavigation)
export default Routes