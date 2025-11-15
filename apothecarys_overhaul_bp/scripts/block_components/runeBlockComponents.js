import { world} from '@minecraft/server';
export class carvableComponent{
    onPlayerInteract(event){
        const { player, block, dimension} = event;
        // Your code here
        
        let rune;
        for (let [key, value] of runeTemplate.entries()) { 
            if(key == player.getComponent("minecraft:equippable").getEquipmentSlot("Offhand").typeId)  rune = value;
        }
        let mainItem = player.getComponent("minecraft:equippable").getEquipmentSlot("Mainhand").getItem();

        if(mainItem == null) return;
        if(!mainItem.hasTag("apotso:is_soul_knife")) return;
        if(rune == null) return;

        block.setPermutation(block.permutation.withState("apotso:carving",rune));

        mainItem.getComponent("durability").damage += 2;
        player.getComponent("minecraft:equippable").getEquipmentSlot("Mainhand").setItem(mainItem);
        dimension.playSound("hit.wood", block.location);
    }
}
export class runeChargableComponent{
    onPlayerInteract(event){
        const { player, block, dimension} = event;
        // Your code here
        let charge;
        let mainItem = player.getComponent("minecraft:equippable").getEquipmentSlot("Mainhand").getItem();

        if(!mainItem) return;

        charge = runeChager.get(mainItem.typeId);
        if(charge == null) return;

        let isCharged = canChange.get(block.permutation.getState("apotso:carving"))(event);
        if(!isCharged) return;
        
        block.setPermutation(block.permutation.withState("apotso:charged",charge));
        dimension.playSound("respawn_anchor.charge", block.location);
    } 
}
export class chargedRuneComponent{
    onRandomTick(event){
        const {block, dimension} = event;

        dimension.playSound("respawn_anchor.charge", block.location);
    }
}
const runeChager = new Map([
    ["minecraft:amethyst_shard", "xp"],
    ["minecraft:echo_shard", "soul"]
])
const runeTemplate = new Map([
    ["apotso:rune_slate_stars", "stars"],
    ["apotso:rune_slate_first_quarter", "first_quarter"],
    ["apotso:rune_slate_waxing_gibbous", "waxing_gibbous"],
    ["apotso:rune_slate_waxing_crescent", "waxing_crescent"],
    ["apotso:rune_slate_full_moon", "full_moon"],
    ["apotso:rune_slate_third_quarter", "third_quarter"],
    ["apotso:rune_slate_waning_gibbous", "waning_gibbous"],
    ["apotso:rune_slate_waning_crescent", "waning_crescent"],
    ["apotso:rune_slate_new_moon", "new_moon"]
])
const canChange = new Map([
    ["stars", (e) => { return night(e)}],
    ["full_moon", (e) =>        {return vexingHour(e,0)}],
    ["waning_gibbous", (e) =>   {return vexingHour(e,1)}],
    ["first_quarter", (e) =>    {return vexingHour(e,2)}],
    ["waning_crescent", (e) =>  {return vexingHour(e,3)}],
    ["new_moon", (e) =>         {return vexingHour(e,4)}],
    ["waxing_crescent",(e) =>   {return vexingHour(e,5)}],
    ["third_quarter", (e) =>    {return vexingHour(e,6)}],
    ["waxing_gibbous", (e) =>   {return vexingHour(e,7)}]
])

const moonPhaseStr = new Map([
    [0, "full"],
    [1, "waning gibbous"],
    [2, "first quarter"],
    [3, "waning crescent"],
    [4, "new"],
    [5, "waxing cresent"],
    [6, "third quarter"],
    [7, "waxing gibbous"]
])
function night(event){
    const { player} = event;
    const time = world.getTimeOfDay();

    if(time >= 12969 || time <= 2000){
        return true
    }
    player.sendMessage("Cannot charge this rune at this time");
    return false;
}
function vexingHour(event, moonphase){
    const { player} = event;
    const time = world.getTimeOfDay();

    if( moonphase == -1 || moonphase !== world.getMoonPhase()){
        player.sendMessage(`Cannot charge this rune during a ${moonPhaseStr.get(world.getMoonPhase())} moon`);
        return false;
    }

    if(time >= 16000 && time <= 20000){
        return true
    }
    
    player.sendMessage("Cannot charge this rune at this time");
    return false;
}