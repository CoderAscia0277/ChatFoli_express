 const chapter_01 = [
    {
        'hasCharacterDialogue':false,
        'init':`You suddenly find your self on the middle of an unknown forest, you began searching for food. After a few minutes
        of walking, you stumble across a wounded goblin. What would you do next?`,
        'option':[
            {'option_01':"Help the wounded goblin",'key':"help_goblin"},
            {'option_02':"Leave the wounded goblin",'key':"leave_goblin"}
            
        ]
    },
    {
        'hasCharacterDialogue':false,
        'help_goblin':`You decided to help the wounded goblin. As you check his condition, a horde of goblins suddenly came out
        the bushes. Terrified with the situation you choose to...`,
        'leave_goblin':`You decided to leave the wounded goblin. As you continue your journey, you encountered a horde of goblins, 
         terrified by the situation you choose to...`,
        'option':[
            {'option_01':"Defend yourself",'key':"defend_self"},
            {'option_02':"Run for your life",'key':"run_away"}
        ]
    },
    {
        'hasCharacterDialogue':false,
        'defend_self':`You choose to defend yourself, using the rusty sword from the wounded goblin. 
        The fight was fierce, suddenly a huge goblin came out from the dense bushes, accompanied by a huge roaring sound.
        As you saw the huge goblin charging to your direction, you decided to...`,
        'run_away':`Due to their ovwerwhelming number, you choose to run away. 
        As you run into the dense bushes, a huge goblin came out, accompanied by a huge roaring sound.
        You saw the huge goblin charging towards you, you decided to...`,
        'option':[ 
            {'option_01':"Prepare defensive moves",'key':"defend_self"},
            {'option_02':"Fight the huge goblin",'key':"fight_goblin"}
        ]
    },
    {
        'hasCharacterDialogue':true,

        'defend_self':`As you braced yourself, a sudden flash of light pierce throughtout the huge goblin.
        You were extremely buffled about what happened. After the smoke clears out, you saw a white hair girl wearing blue
        ancient looking dress on top of the huge goblin's corpse`,

        'fight_goblin':`As you unleased your best attack,a sudden flash of light pierce throughtout the huge goblin.
        You were extremely buffled about what happened. After the smoke clears out, you saw a white hair girl wearing blue
        ancient looking dress on top of the huge goblin's corpse.`,

        'character_dialogue':[{"Ming Fei":["Are you alright?, my name is Ming Fei, captain of the Tianquan guards ","You're so brave, fighting this goblin with that sword. My name is Ming Fei, captain of the Tianquan guards"]}],
        'option':[
            {'option_01':"Continue Narration",'key':"narrate"},
            {'option_02':"Reply"}
        ]
    },
    {
        'hasCharacterDialogue':true,

        'narrate':`As you explain to Ming Fei about your situation, Ming Fei decided to help you get out of the forest and
         bring you to Tianquan Village`,
         
         'character_dialogue':[
            {"Ming Fei":"I see, if that's the case I will help you get out of this forest. Once we get out, I will escort you to Tianquan Village"}
         ],
         
         'option':[
            {'option_01':"Continue Narration",'key':"narrate"},
            {'option_02':"Reply"}
        ]

    }
]

export {chapter_01};