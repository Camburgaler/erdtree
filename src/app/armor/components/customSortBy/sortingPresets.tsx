import { deepCloneAndMap } from "@/app/util/script";
import { DefensesMapKey } from "@/app/util/types/defensesMap";
import { ResistancesMapKey } from "@/app/util/types/resistancesMap";
import { DEFAULT_SORTBYARMOR, SortByArmor } from "./sorting";

export type SortByArmorModeKey =
    | "total"
    | "total-absorption"
    | "total-standard"
    | "total-elemental"
    | DefensesMapKey
    | "total-resistance"
    | ResistancesMapKey
    | "poise";
export const SORTBYARMOR_MODES: { [K in SortByArmorModeKey]: SortByArmor } = {
    total: deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Total of All Absorptions and Resistances" },
        { operation: "sum" },
        { physical: true },
        { strike: true },
        { slash: true },
        { pierce: true },
        { magic: true },
        { fire: true },
        { lightning: true },
        { holy: true },
        { poison: true },
        { "scarlet-rot": true },
        { hemorrhage: true },
        { frostbite: true },
        { sleep: true },
        { madness: true },
        { "death-blight": true },
    ]),
    "total-absorption": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Total of All Absorptions" },
        { operation: "sum" },
        { physical: true },
        { strike: true },
        { slash: true },
        { pierce: true },
        { magic: true },
        { fire: true },
        { lightning: true },
        { holy: true },
    ]),
    "total-standard": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Total of All Standard Absorptions" },
        { operation: "sum" },
        { physical: true },
        { strike: true },
        { slash: true },
        { pierce: true },
    ]),
    physical: deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Physical Absorption" },
        { physical: true },
    ]),
    strike: deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Strike Absorption" },
        { strike: true },
    ]),
    slash: deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Slash Absorption" },
        { slash: true },
    ]),
    pierce: deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Pierce Absorption" },
        { pierce: true },
    ]),
    "total-elemental": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Total of All Elemental Absorptions" },
        { operation: "sum" },
        { magic: true },
        { fire: true },
        { lightning: true },
        { holy: true },
    ]),
    magic: deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Magic Absorption" },
        { magic: true },
    ]),
    fire: deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Fire Absorption" },
        { fire: true },
    ]),
    lightning: deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Lightning Absorption" },
        { lightning: true },
    ]),
    holy: deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Holy Absorption" },
        { holy: true },
    ]),
    "total-resistance": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Total of All Resistances" },
        { operation: "sum" },
        { poison: true },
        { "scarlet-rot": true },
        { hemorrhage: true },
        { frostbite: true },
        { sleep: true },
        { madness: true },
        { "death-blight": true },
    ]),
    poison: deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Poison Resistance" },
        { poison: true },
    ]),
    "scarlet-rot": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Scarlet Rot Resistance" },
        { "scarlet-rot": true },
    ]),
    hemorrhage: deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Hemorrhage Resistance" },
        { hemorrhage: true },
    ]),
    frostbite: deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Frostbite Resistance" },
        { frostbite: true },
    ]),
    sleep: deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Sleep Resistance" },
        { sleep: true },
    ]),
    madness: deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Madness Resistance" },
        { madness: true },
    ]),
    "death-blight": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Death Blight Resistance" },
        { "death-blight": true },
    ]),
    poise: deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Poise" },
        { poise: true },
    ]),
};

export const SORTBYBOSS_KEYS: string[] = [
    "abductor-virgins",
    "adan-thief-of-fire",
    "alecto-black-knife-ringleader",
    "ancestor-spirit",
    "ancient-dragon-lansseax",
    "ancient-dragon-man",
    "ancient-dragon-senessax",
    "ancient-hero-of-zamor",
    "astel-naturalborn-of-the-void",
    "astel-stars-of-darkness",
    "battlemage-hugues",
    "bayle-the-dread",
    "beastman-of-farum-azula",
    "beastman-of-farum-azula-duo",
    "bell-bearing-hunter",
    "black-blade-kindred-axe-and-twinblades",
    "black-blade-kindred-sword-and-halberd",
    "black-knife-assassin",
    "black-knight-edredd",
    "black-knight-garrew",
    "blackgaol-knight",
    "bloodhound-knight",
    "bloodhound-knight-darriwil",
    "bols-carian-knight",
    "borealis-the-freezing-fog",
    "cemetery-shade",
    "chief-bloodfiend",
    "cleanrot-knights",
    "commander-gaius",
    "commander-niall",
    "commander-oneil",
    "crucible-knight",
    "crucible-knight-and-crucible-knight-ordovis",
    "crucible-knight-and-misbegotten-warrior",
    "crucible-knight-siluria",
    "crystalian",
    "crystalian-duo-spear-and-ringblade",
    "crystalian-duo-spear-and-staff",
    "curseblade-labirith",
    "dancer-of-ranah",
    "death-knight",
    "death-rite-bird",
    "deathbird",
    "decaying-ekzykes",
    "demi-human-chief",
    "demi-human-queen-gilika",
    "demi-human-queen-maggie",
    "demi-human-queen-margot",
    "demi-human-queen-marigga",
    "demi-human-swordmaster-onze",
    "divine-beast-dancing-lion",
    "draconic-tree-sentinel",
    "dragonkin-soldier",
    "dragonkin-soldier-of-nokstella",
    "dragonlord-placidusax",
    "dryleaf-dane",
    "elemer-of-the-briar",
    "erdtree-avatar",
    "erdtree-burial-watchdog-staff",
    "erdtree-burial-watchdog-sword-fire",
    "erdtree-burial-watchdog-sword-lightning",
    "erdtree-burial-watchdog-duo",
    "esgar-priest-of-blood",
    "fallingstar-beast",
    "fell-twins",
    "fias-champions",
    "fire-giant",
    "flying-dragon-agheel",
    "flying-dragon-greyll",
    "frenzied-duelist",
    "full-grown-fallingstar-beast",
    "ghostflame-dragon",
    "glintstone-dragon-adula",
    "glintstone-dragon-smarag",
    "godefroy-the-grafted",
    "godfrey-first-elden-lord",
    "hoarah-loux",
    "godrick-the-grafted",
    "godskin-apostle",
    "godskin-duo",
    "godskin-noble",
    "golden-hippopotamus",
    "grafted-scion",
    "grave-warden-duelist",
    "great-wyrm-theodorix",
    "guardian-golem",
    "jagged-peak-drake",
    "jori-elder-inquisitor",
    "kindred-of-rot",
    "lamenter",
    "leonine-misbegotten",
    "lichdragon-fortissax",
    "loretta-knight-of-the-haligtree",
    "mad-pumpkin-head",
    "mad-pumpkin-head-duo",
    "magma-wyrm",
    "magma-wyrm-makar",
    "malenia-blade-of-miquella",
    "maliketh-the-black-blade",
    "margit-the-fell-omen",
    "messmer-the-impaler",
    "metyr-mother-of-fingers",
    "midra-lord-of-frenzied-flame",
    "miranda-the-blighted-bloom",
    "misbegotten-crusader",
    "mohg-lord-of-blood",
    "mohg-the-omen",
    "morgott-the-omen-king",
    "necromancer-garris",
    "needle-knight-leda-and-dryleaf-dane",
    "needle-knight-leda-and-dryleaf-dane-and-hornsent",
    "needle-knight-leda-and-dryleaf-dane-and-hornsent-and-moore",
    "needle-knight-leda-and-dryleaf-dane-and-moore",
    "needle-knight-leda-and-dryleaf-dane-and-redmane-freyja",
    "needle-knight-leda-and-dryleaf-dane-and-redmane-freyja-and-hornsent",
    "needle-knight-leda-and-dryleaf-dane-and-redmane-freyja-and-hornsent-and-moore",
    "needle-knight-leda-and-dryleaf-dane-and-redmane-freyja-and-moore",
    "nights-cavalry-flail",
    "nights-cavalry-glaive",
    "nox-swordstress-and-nox-priest",
    "omenkiller-and-miranda-the-blighted-bloom",
    "omenkiller",
    "onyx-lord",
    "patches",
    "perfumer-tricia-and-misbegotten-warrior",
    "promised-consort-radahn",
    "putrescent-knight",
    "putrid-avatar",
    "putrid-crystalian-trio",
    "putrid-grave-warden-duelist",
    "putrid-tree-spirit",
    "radagon-of-the-golden-order-and-elden-beast",
    "rakshasa",
    "ralva-the-great-red-bear",
    "red-bear",
    "red-wolf-of-radagon",
    "red-wolf-of-the-champion",
    "regal-ancestor-spirit",
    "rellana-twin-moon-knight",
    "rennala-queen-of-the-full-moon",
    "romina-saint-of-the-bud",
    "royal-knight-loretta",
    "royal-revenant",
    "rugalea-the-great-red-bear",
    "runebear",
    "rykard-lord-of-blasphemy",
    "sanguine-noble",
    "scadutree-avatar",
    "scaly-misbegotten",
    "sir-gideon-ofnir-the-all-knowing",
    "sir-gideon-ofnir-the-all-knowing-malenia",
    "sir-gideon-ofnir-the-all-knowing-malenia-and-mohg",
    "sir-gideon-ofnir-the-all-knowing-mohg",
    "soldier-of-godrick",
    "spirit-caller-snail-crucible-knights",
    "spirit-caller-snail-godskin-duo",
    "starscourge-radahn",
    "stonedigger-troll",
    "swordhand-of-night-jolan-and-count-ymir-mother-of-fingers",
    "tibia-mariner",
    "tree-sentinel",
    "ulcerated-tree-spirit",
    "valiant-gargoyles",
    "vyke-knight-of-the-roundtable",
    "wormface",
] as const;
export type SortByBossKey = (typeof SORTBYBOSS_KEYS)[number];

const ANCIENTDRAGON_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Ancient Dragon" },
    { operation: "sum" },
    { physical: true },
    { fire: true },
    { lightning: true },
]);
const ASTEL_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Astel" },
    { operation: "sum" },
    { physical: true },
    { magic: true },
]);
const BLACKKNIFE_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Black Knife" },
    { operation: "sum" },
    { physical: true },
    { slash: true },
    { pierce: true },
    { holy: true },
]);
const BLOODHOUND_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Bloodhound" },
    { operation: "sum" },
    { physical: true },
    { slash: true },
    { hemorrhage: true },
]);
const CRUCIBLEKNIGHT_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Crucible" },
    { operation: "sum" },
    { physical: true },
    { strike: true },
    { pierce: true },
    { holy: true },
]);
const CRYSTALIAN_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Crystalian" },
    { operation: "sum" },
    { physical: true },
    { strike: true },
]);
const DEATHBIRD_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Deathbird" },
    { operation: "sum" },
    { physical: true },
    { pierce: true },
    { magic: true },
    { "death-blight": true },
]);
const DEMIHUMANQUEEN_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Queen" },
    { operation: "sum" },
    { physical: true },
    { strike: true },
    { magic: true },
]);
const GIDEON_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Gideon" },
    { operation: "sum" },
    { physical: true },
    { strike: true },
    { magic: true },
    { fire: true },
    { holy: true },
]);
const FREYJA_MODIFICATIONS = [{ slash: true }];
const HORNSENT_MODIFICATIONS = [
    { slash: true },
    { hemorrhage: true },
    { holy: true },
];
const MOORE_MODIFICATIONS = [{ strike: true }, { "scarlet-rot": true }];
const PHYSICALMAGIC_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Physical and Magic" },
    { operation: "sum" },
    { physical: true },
    { magic: true },
]);
const PHYSICALSLASHPIERCEFIRE_SORTBYARMOR = deepCloneAndMap(
    DEFAULT_SORTBYARMOR,
    [
        { label: "Physical, Slash, Pierce, and Fire" },
        { operation: "sum" },
        { physical: true },
        { slash: true },
        { pierce: true },
        { fire: true },
    ]
);
const BATTLEMAGE_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Battle Mage" },
    { operation: "sum" },
    { strike: true },
    { magic: true },
]);
const BEAST_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Beast" },
    { operation: "sum" },
    { physical: true },
    { slash: true },
]);
const SPELLSWORD_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Spellsword" },
    { operation: "sum" },
    { physical: true },
    { strike: true },
    { pierce: true },
    { magic: true },
]);
const KINDRED_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Kindred" },
    { operation: "sum" },
    { physical: true },
    { pierce: true },
]);
const TREEGUARDIAN_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Tree Guardian" },
    { operation: "sum" },
    { physical: true },
    { strike: true },
    { holy: true },
]);
const PHYSICALSLASHPIERCEMAGIC_SORTBYARMOR = deepCloneAndMap(
    DEFAULT_SORTBYARMOR,
    [
        { label: "Physical, Slash, Pierce, and Magic" },
        { operation: "sum" },
        { physical: true },
        { slash: true },
        { pierce: true },
        { magic: true },
    ]
);
const BLOODLETTER_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Bloodletter" },
    { operation: "sum" },
    { slash: true },
    { pierce: true },
    { hemorrhage: true },
]);
const HOLYKNIGHT_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Holy Knight" },
    { operation: "sum" },
    { physical: true },
    { pierce: true },
    { holy: true },
]);
const GREATREDBEAR_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Great Red Bear" },
    { operation: "sum" },
    { physical: true },
    { slash: true },
    { strike: true },
]);
const DRACONIC_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Draconic" },
    { operation: "sum" },
    { physical: true },
    { strike: true },
    { fire: true },
    { lightning: true },
]);
const ERDTREEBURIAL_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Erdtree Burial" },
    { operation: "sum" },
    { physical: true },
    { slash: true },
    { magic: true },
    { fire: true },
]);
const PHYSICALSLASHFIRE_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Physical, Slash, and Fire" },
    { operation: "sum" },
    { physical: true },
    { slash: true },
    { fire: true },
]);
const FALLINGSTAR_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Fallingstar" },
    { operation: "sum" },
    { physical: true },
    { strike: true },
    { pierce: true },
    { magic: true },
    { hemorrhage: true },
]);
const PHYSICALSTRIKEFIRE_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Physical, Strike, and Fire" },
    { operation: "sum" },
    { physical: true },
    { strike: true },
    { fire: true },
]);
const FLYINGDRAGON_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Flying Dragon" },
    { operation: "sum" },
    { physical: true },
    { fire: true },
]);
const MAGMAWYRM_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Wyrm" },
    { operation: "sum" },
    { slash: true },
    { strike: true },
    { fire: true },
]);
const PUMPKINHEAD_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Pumpkin Head" },
    { operation: "sum" },
    { physical: true },
    { strike: true },
    { hemorrhage: true },
]);
const MOHG_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Mohg" },
    { operation: "sum" },
    { physical: true },
    { pierce: true },
    { fire: true },
    { hemorrhage: true },
]);
const PUTRID_SORTBYARMOR = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
    { label: "Putrid" },
    { operation: "sum" },
    { physical: true },
    { strike: true },
    { holy: true },
    { "scarlet-rot": true },
]);

export const SORTBYBOSS_MODES: { [K in SortByBossKey]: SortByArmor } = {
    "abductor-virgins": deepCloneAndMap(SORTBYARMOR_MODES.physical, [
        { label: "Abductor Virgins" },
    ]),
    "adan-thief-of-fire": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Adan, Thief of Fire" },
        { operation: "sum" },
        { strike: true },
        { fire: true },
    ]),
    "alecto-black-knife-ringleader": deepCloneAndMap(BLACKKNIFE_SORTBYARMOR, [
        { label: "Alecto, Black Knife Ringleader" },
    ]),
    "ancestor-spirit": deepCloneAndMap(PHYSICALMAGIC_SORTBYARMOR, [
        { label: "Ancestor Spirit" },
    ]),
    "ancient-dragon-lansseax": deepCloneAndMap(ANCIENTDRAGON_SORTBYARMOR, [
        { label: "Ancient Dragon Lansseax" },
    ]),
    "ancient-dragon-man": deepCloneAndMap(PHYSICALSLASHPIERCEFIRE_SORTBYARMOR, [
        { label: "Ancient Dragon Man" },
    ]),
    "ancient-dragon-senessax": deepCloneAndMap(ANCIENTDRAGON_SORTBYARMOR, [
        { label: "Ancient Dragon Senessax" },
    ]),
    "ancient-hero-of-zamor": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Ancient Hero of Zamor" },
        { operation: "sum" },
        { slash: true },
        { magic: true },
        { frostbite: true },
    ]),
    "astel-naturalborn-of-the-void": deepCloneAndMap(
        PHYSICALMAGIC_SORTBYARMOR,
        [{ label: "Astel, Naturalborn of the Void" }]
    ),
    "astel-stars-of-darkness": deepCloneAndMap(PHYSICALMAGIC_SORTBYARMOR, [
        { label: "Astel, Stars of Darkness" },
    ]),
    "battlemage-hugues": deepCloneAndMap(BATTLEMAGE_SORTBYARMOR, [
        { label: "Battlemage Hugues" },
    ]),
    "bayle-the-dread": deepCloneAndMap(ANCIENTDRAGON_SORTBYARMOR, [
        { label: "Bayle the Dread" },
    ]),
    "beastman-of-farum-azula": deepCloneAndMap(SORTBYARMOR_MODES.slash, [
        { label: "Beastman of Farum Azula" },
    ]),
    "beastman-of-farum-azula-duo": deepCloneAndMap(BEAST_SORTBYARMOR, [
        { label: "Beastman of Farum Azula Duo" },
    ]),
    "bell-bearing-hunter": deepCloneAndMap(SPELLSWORD_SORTBYARMOR, [
        { label: "Bell Bearing Hunter" },
    ]),
    "black-blade-kindred-axe-and-twinblades": deepCloneAndMap(
        KINDRED_SORTBYARMOR,
        [{ label: "Black Blade Kindred (Axe and Twinblades)" }]
    ),
    "black-blade-kindred-sword-and-halberd": deepCloneAndMap(
        DEFAULT_SORTBYARMOR,
        [
            { label: "Black Blade Kindred (Sword and Halberd)" },
            { operation: "sum" },
            { physical: true },
            { slash: true },
            { holy: true },
        ]
    ),
    "black-knife-assassin": deepCloneAndMap(BLACKKNIFE_SORTBYARMOR, [
        { label: "Black Knife Assassin" },
    ]),
    "black-knight-edredd": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Black Knight Edredd" },
        { operation: "sum" },
        { physical: true },
        { pierce: true },
        { lightning: true },
        { holy: true },
    ]),
    "black-knight-garrew": deepCloneAndMap(TREEGUARDIAN_SORTBYARMOR, [
        { label: "Black Knight Garrew" },
    ]),
    "blackgaol-knight": deepCloneAndMap(KINDRED_SORTBYARMOR, [
        { label: "Blackgaol Knight" },
    ]),
    "bloodhound-knight": deepCloneAndMap(BLOODHOUND_SORTBYARMOR, [
        { label: "Bloodhound Knight" },
    ]),
    "bloodhound-knight-darriwil": deepCloneAndMap(BLOODHOUND_SORTBYARMOR, [
        { label: "Bloodhound Knight Darriwil" },
    ]),
    "bols-carian-knight": deepCloneAndMap(
        PHYSICALSLASHPIERCEMAGIC_SORTBYARMOR,
        [{ label: "Bols Carian Knight" }]
    ),
    "borealis-the-freezing-fog": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Borealis the Freezing Fog" },
        { operation: "sum" },
        { physical: true },
        { magic: true },
        { frostbite: true },
    ]),
    "cemetery-shade": deepCloneAndMap(BLOODLETTER_SORTBYARMOR, [
        { label: "Cemetery Shade" },
    ]),
    "chief-bloodfiend": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Chief Bloodfiend" },
        { operation: "sum" },
        { physical: true },
        { strike: true },
        { fire: true },
        { hemorrhage: true },
    ]),
    "cleanrot-knights": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Cleanrot Knight(s)" },
        { operation: "sum" },
        { physical: true },
        { pierce: true },
        { holy: true },
        { "scarlet-rot": true },
    ]),
    "commander-gaius": deepCloneAndMap(SORTBYARMOR_MODES["total-standard"], [
        { label: "Commander Gaius" },
        { magic: true },
    ]),
    "commander-niall": deepCloneAndMap(SORTBYARMOR_MODES["total-standard"], [
        { label: "Commander Niall" },
        { lightning: true },
    ]),
    "commander-oneil": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Commander O'Neil" },
        { operation: "sum" },
        { physical: true },
        { strike: true },
        { pierce: true },
        { "scarlet-rot": true },
    ]),
    "crucible-knight": deepCloneAndMap(CRUCIBLEKNIGHT_SORTBYARMOR, [
        { label: "Crucible Knight" },
    ]),
    "crucible-knight-and-crucible-knight-ordovis": deepCloneAndMap(
        CRUCIBLEKNIGHT_SORTBYARMOR,
        [{ label: "Crucible Knight and Crucible Knight Ordovis" }]
    ),
    "crucible-knight-and-misbegotten-warrior": deepCloneAndMap(
        CRUCIBLEKNIGHT_SORTBYARMOR,
        [{ label: "Crucible Knight and Misbegotten Warrior" }]
    ),
    "crucible-knight-siluria": deepCloneAndMap(HOLYKNIGHT_SORTBYARMOR, [
        { label: "Crucible Knight Siluria" },
    ]),
    crystalian: deepCloneAndMap(CRYSTALIAN_SORTBYARMOR, [
        { label: "Crystalian" },
    ]),
    "crystalian-duo-spear-and-ringblade": deepCloneAndMap(
        CRYSTALIAN_SORTBYARMOR,
        [{ label: "Crystalian Duo (Spear and Ringblade)" }, { pierce: true }]
    ),
    "crystalian-duo-spear-and-staff": deepCloneAndMap(CRYSTALIAN_SORTBYARMOR, [
        { label: "Crystalian Duo (Spear and Staff)" },
        { pierce: true },
        { magic: true },
    ]),
    "curseblade-labirith": deepCloneAndMap(GREATREDBEAR_SORTBYARMOR, [
        { label: "Curseblade Labirith" },
    ]),
    "dancer-of-ranah": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Dancer of Ranah" },
        { operation: "sum" },
        { slash: true },
        { fire: true },
    ]),
    "death-knight": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Death Knight" },
        { operation: "sum" },
        { physical: true },
        { lightning: true },
    ]),
    "death-rite-bird": deepCloneAndMap(DEATHBIRD_SORTBYARMOR, [
        { label: "Death Rite Bird" },
        { frostbite: true },
    ]),
    deathbird: deepCloneAndMap(DEATHBIRD_SORTBYARMOR, [{ label: "Deathbird" }]),
    "decaying-ekzykes": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Decaying Ekzykes" },
        { operation: "sum" },
        { physical: true },
        { "scarlet-rot": true },
    ]),
    "demi-human-chief": deepCloneAndMap(SORTBYARMOR_MODES.slash, [
        { label: "Demi-Human Chief" },
    ]),
    "demi-human-queen-gilika": deepCloneAndMap(DEMIHUMANQUEEN_SORTBYARMOR, [
        { label: "Demi-Human Queen Gilika" },
    ]),
    "demi-human-queen-maggie": deepCloneAndMap(DEMIHUMANQUEEN_SORTBYARMOR, [
        { label: "Demi-Human Queen Maggie" },
    ]),
    "demi-human-queen-margot": deepCloneAndMap(DEMIHUMANQUEEN_SORTBYARMOR, [
        { label: "Demi-Human Queen Margot" },
    ]),
    "demi-human-queen-marigga": deepCloneAndMap(DEMIHUMANQUEEN_SORTBYARMOR, [
        { label: "Demi-Human Queen Marigga" },
    ]),
    "demi-human-swordmaster-onze": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Demi-Human Swordmaster Onze" },
        { operation: "sum" },
        { slash: true },
        { pierce: true },
        { magic: true },
        { frostbite: true },
    ]),
    "divine-beast-dancing-lion": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Divine Beast Dancing Lion" },
        { operation: "sum" },
        { physical: true },
        { strike: true },
        { magic: true },
        { lightning: true },
        { frostbite: true },
    ]),
    "draconic-tree-sentinel": deepCloneAndMap(DRACONIC_SORTBYARMOR, [
        { label: "Draconic Tree Sentinel" },
    ]),
    "dragonkin-soldier": deepCloneAndMap(SORTBYARMOR_MODES.physical, [
        { label: "Dragonkin Soldier" },
    ]),
    "dragonkin-soldier-of-nokstella": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Dragonkin Soldier of Nokstella" },
        { operation: "sum" },
        { physical: true },
        { lightning: true },
        { frostbite: true },
    ]),
    "dragonlord-placidusax": deepCloneAndMap(ANCIENTDRAGON_SORTBYARMOR, [
        { label: "Dragonlord Placidusax" },
    ]),
    "dryleaf-dane": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Dryleaf Dane" },
        { operation: "sum" },
        { strike: true },
        { holy: true },
    ]),
    "elemer-of-the-briar": deepCloneAndMap(SPELLSWORD_SORTBYARMOR, [
        { label: "Elemer of the Briar" },
    ]),
    "erdtree-avatar": deepCloneAndMap(TREEGUARDIAN_SORTBYARMOR, [
        { label: "Erdtree Avatar" },
    ]),
    "erdtree-burial-watchdog-duo": deepCloneAndMap(ERDTREEBURIAL_SORTBYARMOR, [
        { label: "Erdtree Burial Watchdog Duo" },
    ]),
    "erdtree-burial-watchdog-staff": deepCloneAndMap(
        ERDTREEBURIAL_SORTBYARMOR,
        [{ label: "Erdtree Burial Watchdog Staff" }]
    ),
    "erdtree-burial-watchdog-sword-fire": deepCloneAndMap(
        PHYSICALSLASHFIRE_SORTBYARMOR,
        [{ label: "Erdtree Burial Watchdog Sword (Fire)" }]
    ),
    "erdtree-burial-watchdog-sword-lightning": deepCloneAndMap(
        DEFAULT_SORTBYARMOR,
        [
            { label: "Erdtree Burial Watchdog Sword (Lightning)" },
            { operation: "sum" },
            { physical: true },
            { slash: true },
            { lightning: true },
        ]
    ),
    "esgar-priest-of-blood": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Esgar, Priest of Blood" },
        { operation: "sum" },
        { physical: true },
        { slash: true },
        { pierce: true },
        { magic: true },
        { fire: true },
        { hemorrhage: true },
    ]),
    "fallingstar-beast": deepCloneAndMap(FALLINGSTAR_SORTBYARMOR, [
        { label: "Fallingstar Beast" },
    ]),
    "fell-twins": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Fell Twins" },
        { operation: "sum" },
        { slash: true },
        { strike: true },
        { holy: true },
        { hemorrhage: true },
    ]),
    "fias-champions": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Fia's Champions" },
        { operation: "sum" },
        { physical: true },
        { pierce: true },
        { magic: true },
        { "death-blight": true },
        { "scarlet-rot": true },
    ]),
    "fire-giant": deepCloneAndMap(PHYSICALSTRIKEFIRE_SORTBYARMOR, [
        { label: "Fire Giant" },
    ]),
    "flying-dragon-agheel": deepCloneAndMap(FLYINGDRAGON_SORTBYARMOR, [
        { label: "Flying Dragon Agheel" },
    ]),
    "flying-dragon-greyll": deepCloneAndMap(FLYINGDRAGON_SORTBYARMOR, [
        { label: "Flying Dragon Greyll" },
    ]),
    "frenzied-duelist": deepCloneAndMap(CRYSTALIAN_SORTBYARMOR, [
        { label: "Frenzied Duelist" },
    ]),
    "full-grown-fallingstar-beast": deepCloneAndMap(FALLINGSTAR_SORTBYARMOR, [
        { label: "Full-Grown Fallingstar Beast" },
    ]),
    "ghostflame-dragon": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Ghostflame Dragon" },
        { operation: "sum" },
        { physical: true },
        { strike: true },
        { magic: true },
        { frostbite: true },
    ]),
    "glintstone-dragon-adula": deepCloneAndMap(PHYSICALMAGIC_SORTBYARMOR, [
        { label: "Glintstone Dragon Adula" },
    ]),
    "glintstone-dragon-smarag": deepCloneAndMap(PHYSICALMAGIC_SORTBYARMOR, [
        { label: "Glintstone Dragon Smarag" },
    ]),
    "godefroy-the-grafted": deepCloneAndMap(SORTBYARMOR_MODES.physical, [
        { label: "Godefroy the Grafted" },
    ]),
    "godfrey-first-elden-lord": deepCloneAndMap(CRYSTALIAN_SORTBYARMOR, [
        { label: "Godfrey, First Elden Lord" },
    ]),
    "godrick-the-grafted": deepCloneAndMap(PHYSICALSTRIKEFIRE_SORTBYARMOR, [
        { label: "Godrick the Grafted" },
    ]),
    "godskin-apostle": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Godskin Apostle" },
        { operation: "sum" },
        { slash: true },
        { pierce: true },
        { fire: true },
    ]),
    "godskin-duo": deepCloneAndMap(PHYSICALSLASHPIERCEFIRE_SORTBYARMOR, [
        { label: "Godskin Duo" },
    ]),
    "godskin-noble": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Godskin Noble" },
        { operation: "sum" },
        { physical: true },
        { pierce: true },
        { fire: true },
    ]),
    "golden-hippopotamus": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Golden Hippopotamus" },
        { operation: "sum" },
        { slash: true },
        { strike: true },
        { pierce: true },
        { holy: true },
    ]),
    "grafted-scion": deepCloneAndMap(CRUCIBLEKNIGHT_SORTBYARMOR, [
        { label: "Grafted Scion" },
    ]),
    "grave-warden-duelist": deepCloneAndMap(CRYSTALIAN_SORTBYARMOR, [
        { label: "Grave Warden Duelist" },
    ]),
    "great-wyrm-theodorix": deepCloneAndMap(MAGMAWYRM_SORTBYARMOR, [
        { label: "Great Wyrm Theodorix" },
    ]),
    "guardian-golem": deepCloneAndMap(FLYINGDRAGON_SORTBYARMOR, [
        { label: "Guardian Golem" },
    ]),
    "hoarah-loux": deepCloneAndMap(CRYSTALIAN_SORTBYARMOR, [
        { label: "Hoarah Loux" },
    ]),
    "jagged-peak-drake": deepCloneAndMap(DRACONIC_SORTBYARMOR, [
        { label: "Jagged Peak Drake" },
    ]),
    "jori-elder-inquisitor": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Jori, Elder Inquisitor" },
        { operation: "sum" },
        { slash: true },
        { strike: true },
        { pierce: true },
        { magic: true },
        { fire: true },
        { holy: true },
    ]),
    "kindred-of-rot": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Kindred of Rot" },
        { operation: "sum" },
        { physical: true },
        { pierce: true },
    ]),
    lamenter: deepCloneAndMap(SORTBYARMOR_MODES.strike, [
        { label: "Lamenter" },
    ]),
    "leonine-misbegotten": deepCloneAndMap(SORTBYARMOR_MODES.physical, [
        { label: "Leonine Misbegotten" },
    ]),
    "lichdragon-fortissax": deepCloneAndMap(ANCIENTDRAGON_SORTBYARMOR, [
        { label: "Lichdragon Fortissax" },
        { "death-blight": true },
    ]),
    "loretta-knight-of-the-haligtree": deepCloneAndMap(SPELLSWORD_SORTBYARMOR, [
        { label: "Loretta, Knight of the Haligtree" },
    ]),
    "mad-pumpkin-head": deepCloneAndMap(PUMPKINHEAD_SORTBYARMOR, [
        { label: "Mad Pumpkin Head" },
    ]),
    "mad-pumpkin-head-duo": deepCloneAndMap(PUMPKINHEAD_SORTBYARMOR, [
        { label: "Mad Pumpkin Head Duo" },
    ]),
    "magma-wyrm": deepCloneAndMap(MAGMAWYRM_SORTBYARMOR, [
        { label: "Magma Wyrm" },
    ]),
    "magma-wyrm-makar": deepCloneAndMap(MAGMAWYRM_SORTBYARMOR, [
        { label: "Magma Wyrm Makar" },
    ]),
    "malenia-blade-of-miquella": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Malenia, Blade of Miquella" },
        { operation: "sum" },
        { physical: true },
        { slash: true },
        { pierce: true },
        { holy: true },
        { "scarlet-rot": true },
    ]),
    "maliketh-the-black-blade": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Maliketh, the Black Blade" },
        { operation: "sum" },
        { physical: true },
        { slash: true },
        { pierce: true },
        { magic: true },
        { holy: true },
    ]),
    "margit-the-fell-omen": deepCloneAndMap(CRUCIBLEKNIGHT_SORTBYARMOR, [
        { label: "Margit, the Fell Omen" },
    ]),
    "messmer-the-impaler": deepCloneAndMap(
        SORTBYARMOR_MODES["total-standard"],
        [{ label: "Messmer, the Impaler" }, { fire: true }]
    ),
    "metyr-mother-of-fingers": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Metyr, Mother of Fingers" },
        { operation: "sum" },
        { physical: true },
        { slash: true },
        { strike: true },
        { magic: true },
        { holy: true },
    ]),
    "midra-lord-of-frenzied-flame": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Midra, Lord of Frenzied Flame" },
        { operation: "sum" },
        { physical: true },
        { pierce: true },
        { fire: true },
        { holy: true },
        { madness: true },
    ]),
    "miranda-the-blighted-bloom": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Miranda the Blighted Bloom" },
        { operation: "sum" },
        { physical: true },
        { strike: true },
        { holy: true },
        { poison: true },
    ]),
    "misbegotten-crusader": deepCloneAndMap(HOLYKNIGHT_SORTBYARMOR, [
        { label: "Misbegotten Crusader" },
    ]),
    "mohg-lord-of-blood": deepCloneAndMap(MOHG_SORTBYARMOR, [
        { label: "Mohg, Lord of Blood" },
    ]),
    "mohg-the-omen": deepCloneAndMap(MOHG_SORTBYARMOR, [
        { label: "Mohg, the Omen" },
    ]),
    "morgott-the-omen-king": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Morgott, the Omen King" },
        { operation: "sum" },
        { slash: true },
        { pierce: true },
        { holy: true },
        { fire: true },
        { hemorrhage: true },
    ]),
    "necromancer-garris": deepCloneAndMap(BATTLEMAGE_SORTBYARMOR, [
        { label: "Necromancer Garris" },
    ]),
    "needle-knight-leda-and-dryleaf-dane": deepCloneAndMap(
        CRUCIBLEKNIGHT_SORTBYARMOR,
        [{ label: "Needle Knight Leda & Dryleaf Dane" }]
    ),
    "needle-knight-leda-and-dryleaf-dane-and-hornsent": deepCloneAndMap(
        CRUCIBLEKNIGHT_SORTBYARMOR,
        [
            { label: "Needle Knight Leda & Dryleaf Dane & Hornsent" },
            ...HORNSENT_MODIFICATIONS,
        ]
    ),
    "needle-knight-leda-and-dryleaf-dane-and-hornsent-and-moore":
        deepCloneAndMap(CRUCIBLEKNIGHT_SORTBYARMOR, [
            { label: "Needle Knight Leda & Dryleaf Dane & Hornsent & Moore" },
            ...HORNSENT_MODIFICATIONS,
            ...MOORE_MODIFICATIONS,
        ]),
    "needle-knight-leda-and-dryleaf-dane-and-moore": deepCloneAndMap(
        CRUCIBLEKNIGHT_SORTBYARMOR,
        [
            { label: "Needle Knight Leda & Dryleaf Dane & Moore" },
            ...MOORE_MODIFICATIONS,
        ]
    ),
    "needle-knight-leda-and-dryleaf-dane-and-redmane-freyja": deepCloneAndMap(
        CRUCIBLEKNIGHT_SORTBYARMOR,
        [
            { label: "Needle Knight Leda & Dryleaf Dane & Redmane Freyja" },
            ...FREYJA_MODIFICATIONS,
        ]
    ),
    "needle-knight-leda-and-dryleaf-dane-and-redmane-freyja-and-hornsent":
        deepCloneAndMap(CRUCIBLEKNIGHT_SORTBYARMOR, [
            {
                label: "Needle Knight Leda & Dryleaf Dane & Redmane Freyja & Hornsent",
            },
            ...HORNSENT_MODIFICATIONS,
            ...FREYJA_MODIFICATIONS,
        ]),
    "needle-knight-leda-and-dryleaf-dane-and-redmane-freyja-and-hornsent-and-moore":
        deepCloneAndMap(CRUCIBLEKNIGHT_SORTBYARMOR, [
            {
                label: "Needle Knight Leda & Dryleaf Dane & Redmane Freyja & Hornsent & Moore",
            },
            ...HORNSENT_MODIFICATIONS,
            ...MOORE_MODIFICATIONS,
            ...FREYJA_MODIFICATIONS,
        ]),
    "needle-knight-leda-and-dryleaf-dane-and-redmane-freyja-and-moore":
        deepCloneAndMap(CRUCIBLEKNIGHT_SORTBYARMOR, [
            {
                label: "Needle Knight Leda & Dryleaf Dane & Redmane Freyja & Moore",
            },
            ...MOORE_MODIFICATIONS,
            ...FREYJA_MODIFICATIONS,
        ]),
    "nights-cavalry-flail": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Night's Cavalry (Flail)" },
        { operation: "sum" },
        { strike: true },
        { hemorrhage: true },
    ]),
    "nights-cavalry-glaive": deepCloneAndMap(KINDRED_SORTBYARMOR, [
        { label: "Night's Cavalry (Glaive)" },
    ]),
    "nox-swordstress-and-nox-priest": deepCloneAndMap(CRYSTALIAN_SORTBYARMOR, [
        { label: "Nox Swordstress & Nox Priest" },
    ]),
    "omenkiller-and-miranda-the-blighted-bloom": deepCloneAndMap(
        DEFAULT_SORTBYARMOR,
        [
            { label: "Omenkiller & Miranda, the Blighted Bloom" },
            { operation: "sum" },
            { physical: true },
            { fire: true },
            { hemorrhage: true },
            { strike: true },
            { holy: true },
            { poison: true },
        ]
    ),
    omenkiller: deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Omenkiller" },
        { operation: "sum" },
        { physical: true },
        { fire: true },
        { hemorrhage: true },
    ]),
    "onyx-lord": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Onyx Lord" },
        { operation: "sum" },
        { slash: true },
        { strike: true },
        { pierce: true },
        { magic: true },
    ]),
    patches: deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Patches" },
        { operation: "sum" },
        { strike: true },
        { pierce: true },
    ]),
    "perfumer-tricia-and-misbegotten-warrior": deepCloneAndMap(
        PHYSICALSLASHFIRE_SORTBYARMOR,
        [
            {
                label: "Perfumer Tricia & Misbegotten Warrior",
            },
        ]
    ),
    "promised-consort-radahn": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Promised Consort Radahn" },
        { operation: "sum" },
        { physical: true },
        { pierce: true },
        { magic: true },
        { fire: true },
        { holy: true },
        { hemorrhage: true },
    ]),
    "putrescent-knight": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Putrescent Knight" },
        { operation: "sum" },
        { physical: true },
        { slash: true },
        { magic: true },
        { frostbite: true },
    ]),
    "putrid-avatar": deepCloneAndMap(PUTRID_SORTBYARMOR, [
        { label: "Putrid Avatar" },
    ]),
    "putrid-crystalian-trio": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Putrid Crystalian Trio" },
        { operation: "sum" },
        { physical: true },
        { pierce: true },
        { strike: true },
        { magic: true },
        { "scarlet-rot": true },
    ]),
    "putrid-grave-warden-duelist": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Putrid Grave Warden Duelist" },
        { operation: "sum" },
        { physical: true },
        { strike: true },
        { "scarlet-rot": true },
    ]),
    "putrid-tree-spirit": deepCloneAndMap(PUTRID_SORTBYARMOR, [
        { label: "Putrid Tree Spirit" },
    ]),
    "radagon-of-the-golden-order-and-elden-beast": deepCloneAndMap(
        DEFAULT_SORTBYARMOR,
        [
            { label: "Radagon of the Golden Order & Elden Beast" },
            { operation: "sum" },
            { physical: true },
            { slash: true },
            { strike: true },
            { holy: true },
        ]
    ),
    rakshasa: deepCloneAndMap(BLOODLETTER_SORTBYARMOR, [{ label: "Rakshasa" }]),
    "ralva-the-great-red-bear": deepCloneAndMap(GREATREDBEAR_SORTBYARMOR, [
        { label: "Ralva the Great Red Bear" },
    ]),
    "red-bear": deepCloneAndMap(BLOODHOUND_SORTBYARMOR, [
        { label: "Red Bear" },
    ]),
    "red-wolf-of-radagon": deepCloneAndMap(PHYSICALMAGIC_SORTBYARMOR, [
        { label: "Red Wolf of Radagon" },
    ]),
    "red-wolf-of-the-champion": deepCloneAndMap(PHYSICALMAGIC_SORTBYARMOR, [
        { label: "Red Wolf of the Champion" },
    ]),
    "regal-ancestor-spirit": deepCloneAndMap(PHYSICALMAGIC_SORTBYARMOR, [
        { label: "Regal Ancestor Spirit" },
    ]),
    "rellana-twin-moon-knight": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Rellana, Twin Moon Knight" },
        { operation: "sum" },
        { physical: true },
        { slash: true },
        { pierce: true },
        { magic: true },
        { fire: true },
    ]),
    "rennala-queen-of-the-full-moon": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Rennala, Queen of the Full Moon" },
        { operation: "sum" },
        { physical: true },
        { magic: true },
        { fire: true },
    ]),
    "romina-saint-of-the-bud": deepCloneAndMap(
        SORTBYARMOR_MODES["total-standard"],
        [{ label: "Romina, Saint of the Bud" }, { "scarlet-rot": true }]
    ),
    "royal-knight-loretta": deepCloneAndMap(SPELLSWORD_SORTBYARMOR, [
        { label: "Royal Knight Loretta" },
    ]),
    "royal-revenant": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Royal Revenant" },
        { operation: "sum" },
        { physical: true },
        { poison: true },
    ]),
    "rugalea-the-great-red-bear": deepCloneAndMap(GREATREDBEAR_SORTBYARMOR, [
        { label: "Rugalea the Great Red Bear" },
    ]),
    runebear: deepCloneAndMap(BEAST_SORTBYARMOR, [{ label: "Runebear" }]),
    "rykard-lord-of-blasphemy": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Rykard, Lord of Blasphemy" },
        { operation: "sum" },
        { physical: true },
        { fire: true },
        { pierce: true },
        { poison: true },
    ]),
    "sanguine-noble": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Sanguine Noble" },
        { operation: "sum" },
        { physical: true },
        { pierce: true },
        { hemorrhage: true },
    ]),
    "scadutree-avatar": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Scadutree Avatar" },
        { operation: "sum" },
        { physical: true },
        { strike: true },
        { magic: true },
        { holy: true },
        { hemorrhage: true },
    ]),
    "scaly-misbegotten": deepCloneAndMap(SORTBYARMOR_MODES.physical, [
        { label: "Scaly Misbegotten" },
    ]),
    "sir-gideon-ofnir-the-all-knowing": deepCloneAndMap(GIDEON_SORTBYARMOR, [
        { label: "Sir Gideon Ofnir the All-Knowing" },
    ]),
    "sir-gideon-ofnir-the-all-knowing-malenia": deepCloneAndMap(
        GIDEON_SORTBYARMOR,
        [
            { label: "Sir Gideon Ofnir the All-Knowing (Malenia Killed)" },
            { "scarlet-rot": true },
        ]
    ),
    "sir-gideon-ofnir-the-all-knowing-malenia-and-mohg": deepCloneAndMap(
        GIDEON_SORTBYARMOR,
        [
            {
                label: "Sir Gideon Ofnir the All-Knowing (Malenia and Mohg Killed)",
            },
            { "scarlet-rot": true },
            { hemorrhage: true },
        ]
    ),
    "sir-gideon-ofnir-the-all-knowing-mohg": deepCloneAndMap(
        GIDEON_SORTBYARMOR,
        [
            { label: "Sir Gideon Ofnir the All-Knowing (Mohg Killed)" },
            { hemorrhage: true },
        ]
    ),
    "soldier-of-godrick": deepCloneAndMap(KINDRED_SORTBYARMOR, [
        { label: "Soldier of Godrick" },
    ]),
    "spirit-caller-snail-crucible-knights": deepCloneAndMap(
        HOLYKNIGHT_SORTBYARMOR,
        [{ label: "Spirit Caller Snail (Crucible Knights)" }]
    ),
    "spirit-caller-snail-godskin-duo": deepCloneAndMap(
        PHYSICALSLASHPIERCEFIRE_SORTBYARMOR,
        [{ label: "Spirit Caller Snail (Godskin Duo)" }]
    ),
    "starscourge-radahn": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Starscourge Radahn" },
        { operation: "sum" },
        { physical: true },
        { pierce: true },
        { magic: true },
    ]),
    "stonedigger-troll": deepCloneAndMap(CRYSTALIAN_SORTBYARMOR, [
        { label: "Stonedigger Troll" },
    ]),
    "swordhand-of-night-jolan-and-count-ymir-mother-of-fingers":
        deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            {
                label: "Swordhand of Night Jolan & Count Ymir, Mother of Fingers",
            },
            { operation: "sum" },
            { slash: true },
            { pierce: true },
            { hemorrhage: true },
            { physical: true },
            { strike: true },
            { magic: true },
        ]),
    "tibia-mariner": deepCloneAndMap(PHYSICALSLASHPIERCEMAGIC_SORTBYARMOR, [
        { label: "Tibia Mariner" },
    ]),
    "tree-sentinel": deepCloneAndMap(CRUCIBLEKNIGHT_SORTBYARMOR, [
        { label: "Tree Sentinel" },
    ]),
    "ulcerated-tree-spirit": deepCloneAndMap(TREEGUARDIAN_SORTBYARMOR, [
        { label: "Ulcerated Tree Spirit" },
    ]),
    "valiant-gargoyles": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Valiant Gargoyles" },
        { operation: "sum" },
        { physical: true },
        { slash: true },
        { holy: true },
        { pierce: true },
        { poison: true },
    ]),
    "vyke-knight-of-the-roundtable": deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Vyke, Knight of the Roundtable" },
        { operation: "sum" },
        { physical: true },
        { pierce: true },
        { lightning: true },
    ]),
    wormface: deepCloneAndMap(DEFAULT_SORTBYARMOR, [
        { label: "Wormface" },
        { operation: "sum" },
        { physical: true },
        { strike: true },
        { "death-blight": true },
    ]),
};
