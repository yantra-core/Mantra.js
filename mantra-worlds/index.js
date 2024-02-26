// Remark: These should all be more closely tied to ./plugins directory
// and scope / codepaths. we should be able to load the World plugins from .use('WorldName')
import Home from './Home/Home.js';
import EatWorld from './EatWorld/EatWorld.js';
import GravityGardens from './GravityGardens/GravityGardens.js';
import InfinityTower from './InfinityTower/InfinityTower.js';
import Maze from './Maze/Maze.js';
import Music from './Music/Music.js';
import Platform from './Platform/Platform.js';
import Playground from './Playground/Playground.js';
import Pong from './Pong/Pong.js';
import Space from './Space/Space.js';
import Sutra from './Sutra/Sutra.js';
import Tiled from './Tiled/Tiled.js';
import TowerDefense from './TowerDefense/TowerDefense.js';
import XState from './XState/XState.js';
import YCraft from './YCraft/YCraft.js';
const worlds = {};
worlds.Home = Home;
worlds.EatWorld = EatWorld;
worlds.GravityGardens = GravityGardens;
worlds.InfinityTower = InfinityTower;
worlds.Maze = Maze;
worlds.Music = Music;
worlds.Platform = Platform;
worlds.Playground = Playground;
worlds.Pong = Pong;
worlds.Space = Space;
worlds.Sutra = Sutra;
worlds.XState = XState;
worlds.Tiled = Tiled;
worlds.TowerDefense = TowerDefense;
worlds.YCraft = YCraft;

export default worlds;