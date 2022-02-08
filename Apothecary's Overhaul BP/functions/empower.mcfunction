gamerule commandblockoutput false
gamerule sendcommandfeedback false

scoreboard objectives add soul dummy "Soul"

execute @s[tag=!empowered] ~ ~ ~ scoreboard players set @s soul 20
execute @s[tag=!empowered] ~ ~ ~ tag @s add empowered

