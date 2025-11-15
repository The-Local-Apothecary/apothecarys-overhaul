<<<<<<< Updated upstream
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
=======
import { system, world, BlockPermutation, ItemStack} from '@minecraft/server';
import runeRitualComponent from './block_components/rune_ritualComponent.js';
import {carvableComponent} from './block_components/runeBlockComponents.js';
import {runeChargableComponent} from './block_components/runeBlockComponents.js';
import { chargedRuneComponent } from './block_components/runeBlockComponents.js';
import { rites } from './block_components/rune_ritualComponent.js';
//world.afterEvents.itemUse.subscribe((data) => ItemUse(data));


function emerald(data){
    data.block.setPermutation.resolve("minecraft:emerald_block");
}
class CatalystComponent {
    onStepOff(arg){
        arg.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
    }
    onEntityFallOn(arg){
        arg.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
    }
}
//CUSTOM COMPONENTS
system.beforeEvents.startup.subscribe(init => {
    init.blockComponentRegistry.registerCustomComponent("apotso:catalyst_block", new CatalystComponent());
    init.blockComponentRegistry.registerCustomComponent("apotso:carvable", new carvableComponent());
    init.blockComponentRegistry.registerCustomComponent("apotso:rune_ritual", new runeRitualComponent());
    init.blockComponentRegistry.registerCustomComponent("apotso:runeChargable", new runeChargableComponent());
    init.blockComponentRegistry.registerCustomComponent("apotso:charged_rune", new chargedRuneComponent());

    init.itemComponentRegistry.registerCustomComponent("apotso:warp",
    {
        onCompleteUse(event) {
            const { itemStack, source } = event;
            // Your code here
            if(source.level < 2)
                return;
            warp(source);
            source.addLevels(-2);
        }
    });
    init.itemComponentRegistry.registerCustomComponent("apotso:empower",
        {
            onCompleteUse(event,p) {
                const { itemStack, source } = event;
                // Your code here
                if(source.level < 2)
                    return;
                source.addEffect("regeneration", 310, { amplifier: 1 });
                source.addEffect("speed", 310, { amplifier: 2 });
                source.addLevels(-2);
            },
            onUseOn(event,p){
                const {block, itemStack, source } = event;
                let {value} = p.params;
                
                source.sendMessage(`value: ${value}`);
                source.sendMessage(block.typeId);
                if(block.typeId != "minecraft:end_portal_frame")
                    return;
                displayMoonPhase(source);
                block.setPermutation(BlockPermutation.resolve("minecraft:end_portal_frame").withState("end_portal_eye_bit",true));
            }
        });
        init.itemComponentRegistry.registerCustomComponent("apotso:soul_gathering",
        {
            onHitEntity(event, p) {
                const { attackingEntity, hadEffect, hitEntity, itemStack } = event;
                let {value} = p.params;

                // Your code here
                attackingEntity.runCommand(`xp ${value} @s`);
            },
    });
    init.itemComponentRegistry.registerCustomComponent("apotso:wooden_totem_carver",
        {
            onMineBlock(event,p){
                const {block} = event;
                if(block.typeId != "minecraft:pale_oak_log")
                    return;
                //block.setPermutation(BlockPermutation.resolve("minecraft:air"));
                const totem = new ItemStack("apotso:wooden_totem");
                block.dimension.spawnItem(totem, block.location);
            }
    });
});


function ItemUse(data){
    let item = data.itemStack;
    let itemCooldown = item.getComponent("minecraft:cooldown").cooldownTicks;
    let player = data.source;
    switch (item.typeId) {
        case "apotso:rift_carver":
            let cooldown = player.getItemCooldown("attack");
            if(cooldown != itemCooldown - 1) break;
            if(player.level < 1) {
                break;
            }
            warp(player);
            player.addLevels(-1);
            break;
        case "minecraft:clock":
            displayMoonPhase(player)
            break;
    }
}
function displayMoonPhase(player){
    switch (world.getMoonPhase()) {
        case 0:
            player.sendMessage("This is the night of The Full Moon");
            break;
        case 1:
            player.sendMessage("This is the night of The Waning Gibbous");
            break;
        case 2:
            player.sendMessage("This is the night of The First Quarter");
            break;    
        case 3:
            player.sendMessage("This is the night of The Waning Crescent");
            break;
        case 4:
            player.sendMessage("This is the night of The New Moon");
            break;
        case 5:
            player.sendMessage("This is the night of The Waxing Crescent");
            break;
        case 6:
            player.sendMessage("This is the night of The Third Quarter");
            break;
        case 7:
            player.sendMessage("This is the night of The Waxing Gibbous");
            break;
        default:
            break;
    }
}
function warp(entity){
    const overworld = world.getDimension("overworld");
const nether = world.getDimension("nether");
    let view = entity.getViewDirection();
    let minY = entity.dimension == overworld ? -60 : 4;
    let targetX = (view.x * 16) + entity.location.x;
    let targetY= (view.y * 16) + entity.location.y;
    let targetZ = (view.z * 16) + entity.location.z;
    
    entity.teleport(
        {
            x: targetX,
            y: Math.max(targetY,minY),
            z: targetZ
        },
        {
            checkForBlocks: true, 
            dimension: entity.dimension
        }
    );
}
function swapDimension(){
    const overworld = world.getDimension("overworld");
const nether = world.getDimension("nether");

    let targetDimension = player.dimension == overworld ? nether : overworld; 
    player.teleport(
        data.source.location,
        {
            checkForBlocks: true,
            dimension: targetDimension
        }
    );
>>>>>>> Stashed changes
}