import { ASSETS_URL } from '.'


const fileLoader = game =>{

game.load.crossOrigim = 'Anonymous'
game.stage.backgroungColor = '#1E1E1E'
game.load.image('asphalt', `${ASSETS_URL}/sprites/asphalt/asphalt.png`)
game.load.image('car', `${ASSETS_URL}/sprites/car/car.jpeg`)

}

export default fileLoader