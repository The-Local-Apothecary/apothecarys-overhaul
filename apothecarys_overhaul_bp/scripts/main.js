import { world } from '@minecraft/server';

const overworld = world.getDimension("overworld");
const nether = world.getDimension("nether");
world.afterEvents.itemUse.subscribe((data) => warp(data));
function warp(data){
    let item = data.itemStack;
    let player = data.source;
    if (item.typeId === "minecraft:diamond") {
        let targetDimension = player.dimension == overworld ? nether : overworld; 
        player.teleport(
            data.source.location,
            {
                checkForBlocks: true,
                dimension: targetDimension
            }
          );
    }
}