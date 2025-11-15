import { BlockVolume, ItemStack} from '@minecraft/server';
export default class runeRitualComponent {
    onPlayerInteract(event){
        const { player, block, dimension, face, faceLocation } = event;
        // Your code here
        let runes = new Array()
        let rune = block.above();
        for (let index = 0; index < 3; index++) {
            let tag = rune.getTags()[2]
            if(!tag) break;
            runes.push(tag)
            rune = rune.above();
        }

        const runeKey = runes.join(',');
        for (let [key, value] of rites.entries()) { 
            if(key == runeKey) {
                let {x:locX , y:locY, z:LocZ} = block.location;
                locY += 3;
                let topBlock = {x: locX * 1, y: locY* 1, z: LocZ* 1};
                
                dimension.fillBlocks(new BlockVolume(block.location, topBlock), "minecraft:air")
                dimension.playSound("respawn_anchor.set_spawn", block.location);
                dimension.spawnParticle(
                    "apotso:spell_casted",
                    block.above().location
                );
                value(event,topBlock);
            }
        }
    }
}
const rites= new Map([
    [
        ["apotso:stars_soul_catalyst,apotso:stars_soul_catalyst,apotso:stars_soul_catalyst"],
        (event,topBlock) => {
            const { player, block, dimension, face, faceLocation } = event;
            dimension.spawnItem(new ItemStack("apotso:wooden_totem", 1), topBlock);
        }
    ],
    [
        ["apotso:crescent_xp_catalyst,apotso:stars_soul_catalyst,apotso:stars_soul_catalyst"],
        (event,topBlock) => {
            const { player, block, dimension, face, faceLocation } = event;
            dimension.spawnEntity("apotso:sprout", topBlock);
        }
    ],
    [
        ["apotso:crescent_soul_catalyst,apotso:crescent_soul_catalyst,apotso:crescent_soul_catalyst"],
        (event, topBlock) => {
            const { player, block, dimension, face, faceLocation } = event;
            dimension.spawnEntity("apotso:snag", topBlock);
             
             
        }
    ],
    [
        ["apotso:quarter_xp_catalyst,apotso:stars_soul_catalyst,apotso:quarter_xp_catalyst"],
        (event,topBlock) => {
            const { player, block, dimension, face, faceLocation } = event;
            dimension.spawnEntity("apotso:twitch", topBlock);
        }
    ],
    [
        ["apotso:quarter_soul_catalyst,apotso:stars_soul_catalyst,apotso:quarter_soul_catalyst"],
        (event,topBlock) => {
            const { player, block, dimension, face, faceLocation } = event;
            dimension.spawnEntity("apotso:twitch", topBlock);
        }
    ],
    [
        ["apotso:gibbous_xp_catalyst,apotso:gibbous_xp_catalyst,apotso:gibbous_xp_catalyst"],
        (event, topBlock) => {
            const { player, block, dimension, face, faceLocation } = event;
            dimension.spawnEntity("apotso:totem", topBlock);
             
             
        }
    ],
    [
        ["apotso:gibbous_soul_catalyst,apotso:stars_soul_catalyst,apotso:stars_soul_catalyst"],
        (event,topBlock) => {
            const { player, block, dimension, face, faceLocation } = event;
            dimension.spawnEntity("apotso:blight", topBlock);
        }
    ],
    
    [
        ["apotso:stars_soul_catalyst,apotso:full_moon_xp_catalyst,apotso:stars_soul_catalyst"],
        (event, topBlock) => {
            const { player, block, dimension, face, faceLocation } = event;
            dimension.spawnEntity("apotso:snag", topBlock);
             
             
        }
    ],
])

export { rites }