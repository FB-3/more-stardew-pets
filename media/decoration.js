//Layers & presets
class DecorationLayer { 
    
    static get DEFAULT() { return 0; }
    static get CUSHIONS() { return -10; }
    static get RUGS() { return -20; }

}

class DecorationPreset {

    //Chairs
    static CHAIRS = {
        OAK_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(0, 0),
        },
        WALNUT_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(48, 0),
        },
        BIRCH_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(96, 0),
        },
        MAHOGANY_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(144, 0),
        },
        RED_DINER_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(192, 0),
        },
        BLUE_DINER_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(240, 0),
        },
        COUNTRY_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(288, 0),
        },
        BREAKFAST_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(336, 0),
        },
        PINK_OFFICE_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(384, 0),
        },
        PURPLE_OFFICE_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(432, 0),
        },
        DARK_THRONE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(0, 32),
        },
        DINING_CHAIR_YELLOW: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(48, 32),
        },
        DINING_CHAIR_RED: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(96, 32),
        },
        GREEN_PLUSH_SEAT: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(144, 32),
        },
        PINK_PLUSH_SEAT: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(192, 32),
        },
        WINTER_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(240, 32),
        },
        GROOVY_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(288, 32),
        },
        CUTE_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(336, 32),
        },
        STUMP_SEAT: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(384, 32),
        },
        METAL_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(432, 32),
        },
        KING_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(0, 64),
        },
        CRYSTAL_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(48, 64),
        },
        TROPICAL_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(96, 64),
        },
        DESERT_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(544, 80),
        },
        JOJA_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(896, 432),
        },
        WIZARD_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(592, 1152),
        },
        JUNIMO_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(848, 80),
        },
        RETRO_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(672, 848),
        },
        PLASTIC_LAWN_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(640, 608),
        },
    }

    static STOOLS = {
        GREEN_OFFICE_STOOL: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(480, 0),
        },
        ORANGE_OFFICE_STOOL: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(496, 0),
        },
        GREEN_STOOL: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(480, 32),
        },
        BLUE_STOOL: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(496, 32),
        },
        JOJA_STOOL: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(896, 736),
        },
        WIZARD_STOOL: { 
            size: new Vec2(16),
            spriteOffset: new Vec2(688, 1088),
        },
        JUNIMO_STOOL: { 
            size: new Vec2(16),
            spriteOffset: new Vec2(880, 64),
        },
        RETRO_STOOL: { 
            size: new Vec2(16),
            spriteOffset: new Vec2(640, 848),
        },
    }

    static BENCHES = {
        OAK_BENCH: { 
            size: new Vec2(32, 32),
            spriteOffset: new Vec2(0, 96),
        },
        WALNUT_BENCH: { 
            size: new Vec2(32, 32),
            spriteOffset: new Vec2(80, 96),
        },
        BIRCH_BENCH: { 
            size: new Vec2(32, 32),
            spriteOffset: new Vec2(160, 96),
        },
        MAHOGANY_BENCH: { 
            size: new Vec2(32, 32),
            spriteOffset: new Vec2(240, 96),
        },
        MODERN_BENCH: { 
            size: new Vec2(32, 32),
            spriteOffset: new Vec2(320, 96),
        },
    }

    //Tables
    static TABLES = {
        OAK_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(0, 560),
        },
        WALNUT_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(32, 560),
        },
        BIRCH_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(64, 560),
        },
        MAHOGANY_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(96, 560),
        },
        MODERN_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(192, 560),
        },
        WINTER_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(384, 560),
        },
        SUN_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(128, 560),
        },
        MOON_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(160, 560),
        },
        PUZZLE_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(352, 560),
        },
        CANDY_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(416, 560),
        },
        LUAU_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(448, 560),
        },
        DARK_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(480, 560),
        },
        DIVINER_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(288, 560),
        },
        PUB_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(224, 560),
        },
        LUXURY_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(256, 560),
        },
        NEOLITHIC_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(320, 560),
        },
        WINE_TABLE: { 
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(672, 448),
        },
        SPIRITS_TABLE: { 
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(672, 480),
        },
        DESERT_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(512, 80),
        },
        JOJA_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(896, 464),
        },
        WIZARD_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(640, 1152),
        },
        JUNIMO_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(896, 64),
        },
        RETRO_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(672, 880),
        },
    }
    
    static TEA_TABLES = {
        OAK_TEA_TABLE: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(0, 608),
        },
        WALNUT_TEA_TABLE: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(32, 608),
        },
        BIRCH_TEA_TABLE: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(64, 608),
        },
        MAHOGANY_TEA_TABLE: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(96, 608),
        },
        MODERN_TEA_TABLE: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(128, 608),
        },
        JOJA_TABLE: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(864, 464),
        },
        WIZARD_TABLE: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(688, 1168),
        },
        JUNIMO_TABLE: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(864, 112),
        },
        RETRO_TABLE: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(576, 912),
        },
    }

    static END_TABLES = {
        OAK_END_TABLE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(240, 688),
        },
        WALNUT_END_TABLE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(272, 688),
        },
        BIRCH_END_TABLE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(304, 688),
        },
        MAHOGANY_END_TABLE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(336, 688),
        },
        MODERN_END_TABLE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(368, 688),
        },
        WINTER_END_TABLE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(400, 688),
        },
        GRANDMOTHER_END_TABLE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(384, 688),
        },
        DESERT_END_TABLE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(544, 112),
        },
        JOJA_END_TABLE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(912, 720),
        },
        GRAY_JOJA_END_TABLE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(944, 720),
        },
        WIZARD_END_TABLE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(672, 1104),
        },
        JUNIMO_END_TABLE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(816, 112),
        },
        RETRO_END_TABLE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(544, 912),
        },
    }

    static COFFE_TABLES = {
        COFFE_TABLE: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(320, 352),
        },
        STONE_SLAB: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(368, 352),
        },
        JOJA_TABLE: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(848, 672),
        },
        GRAY_JOJA_TABLE: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(896, 672),
        },
        ELIXIR_TABLE: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(656, 1200),
        },
    }

    //Rugs
    static RUGS = {
        BAMBOO_MAT: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(432, 864),
            sortingLayer: DecorationLayer.RUGS,
        },
        BURLAP_RUG: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(224, 864),
            sortingLayer: DecorationLayer.RUGS,
        },
        WOODCUT_RUG: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(272, 880),
            sortingLayer: DecorationLayer.RUGS,
        },
        MONSTER_RUG: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(448, 800),
            sortingLayer: DecorationLayer.RUGS,
        },
        OCEANIC_RUG: { 
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(192, 608),
            sortingLayer: DecorationLayer.RUGS,
        },
        RED_RUG: { 
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(176, 720),
            sortingLayer: DecorationLayer.RUGS,
        },
        PATCHWORK_RUG: { 
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(256, 720),
            sortingLayer: DecorationLayer.RUGS,
        },
        DARK_RUG: { 
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(337, 720),
            sortingLayer: DecorationLayer.RUGS,
        },
        RED_COTTAGE_RUG: { 
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(288, 800),
            sortingLayer: DecorationLayer.RUGS,
        },
        GREEN_COTTAGE_RUG: { 
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(368, 800),
            sortingLayer: DecorationLayer.RUGS,
        },
        MYSTIC_RUG: { 
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(0, 832),
            sortingLayer: DecorationLayer.RUGS,
        },
        NAUTICAL_RUG: { 
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(144, 864),
            sortingLayer: DecorationLayer.RUGS,
        },
        PIRATE_RUG: { 
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(224, 944),
            sortingLayer: DecorationLayer.RUGS,
        },
        FRUIT_SALAD_RUG: { 
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(336, 944),
            sortingLayer: DecorationLayer.RUGS,
        },
        BONE_RUG: { 
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(192, 976),
            sortingLayer: DecorationLayer.RUGS,
        },
        SNOWY_RUG: { 
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(416, 976),
            sortingLayer: DecorationLayer.RUGS,
        },
        LIGHT_GREEN_RUG: { 
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(385, 1232),
            sortingLayer: DecorationLayer.RUGS,
        },
        LARGE_GREEN_RUG: { 
            size: new Vec2(64, 48),
            spriteOffset: new Vec2(0, 1392),
            sortingLayer: DecorationLayer.RUGS,
        },
        ICY_RUG: { 
            size: new Vec2(64, 48),
            spriteOffset: new Vec2(96, 1392),
            sortingLayer: DecorationLayer.RUGS,
        },
        OLD_WORLD_RUG: { 
            size: new Vec2(64, 48),
            spriteOffset: new Vec2(160, 1392),
            sortingLayer: DecorationLayer.RUGS,
        },
        LARGE_RED_RUG: { 
            size: new Vec2(64, 48),
            spriteOffset: new Vec2(224, 1392),
            sortingLayer: DecorationLayer.RUGS,
        },
        LARGE_COTTAGE_RUG: { 
            size: new Vec2(64, 48),
            spriteOffset: new Vec2(288, 1392),
            sortingLayer: DecorationLayer.RUGS,
        },
        FUNKY_RUG: { 
            size: new Vec2(80, 64),
            spriteOffset: new Vec2(352, 1424),
            sortingLayer: DecorationLayer.RUGS,
        },
        MODERN_RUG: { 
            size: new Vec2(80, 64),
            spriteOffset: new Vec2(432, 1424),
            sortingLayer: DecorationLayer.RUGS,
        },
        BLOSSOM_RUG: { 
            size: new Vec2(96, 64),
            spriteOffset: new Vec2(352, 1360),
            sortingLayer: DecorationLayer.RUGS,
        },
        SANDY_RUG: { 
            size: new Vec2(48),
            spriteOffset: new Vec2(624, 80),
            sortingLayer: DecorationLayer.RUGS,
        },
        DESERT_RUG: { 
            size: new Vec2(64, 48),
            spriteOffset: new Vec2(512, 192),
            sortingLayer: DecorationLayer.RUGS,
        },
        LARGE_JOJA_RUG: { 
            size: new Vec2(80, 48),
            spriteOffset: new Vec2(768, 608),
            sortingLayer: DecorationLayer.RUGS,
        },
        SQUARE_JOJA_RUG: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(848, 624),
            sortingLayer: DecorationLayer.RUGS,
        },
        SMALL_JOJA_RUG: { 
            size: new Vec2(32, 16),
            spriteOffset: new Vec2(848, 608),
            sortingLayer: DecorationLayer.RUGS,
        },
        JOJA_RUG: { 
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(768, 656),
            sortingLayer: DecorationLayer.RUGS,
        },
        RUNE_RUG: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(576, 1248),
            sortingLayer: DecorationLayer.RUGS,
        },
        SWIRL_RUG: { 
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(512, 1280),
            sortingLayer: DecorationLayer.RUGS,
        },
        STARRY_MOON_RUG: { 
            size: new Vec2(80, 48),
            spriteOffset: new Vec2(512, 1329),
            sortingLayer: DecorationLayer.RUGS,
        },
        STONE_FLOORING: { 
            size: new Vec2(64),
            spriteOffset: new Vec2(512, 1216),
            sortingLayer: DecorationLayer.RUGS,
        },
        SQUARE_JUNIMO_RUG: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(769, 192),
            sortingLayer: DecorationLayer.RUGS,
        },
        CIRCULAR_JUNIMO_RUG: { 
            size: new Vec2(48),
            spriteOffset: new Vec2(768, 336),
            sortingLayer: DecorationLayer.RUGS,
        },
        JUNIMO_RUG: { 
            size: new Vec2(64, 48),
            spriteOffset: new Vec2(768, 224),
            sortingLayer: DecorationLayer.RUGS,
        },
        JUNIMO_MAT: { 
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(832, 224),
            sortingLayer: DecorationLayer.RUGS,
        },
        SMALL_JUNIMO_MAT: { 
            size: new Vec2(32, 16),
            spriteOffset: new Vec2(928, 368),
            sortingLayer: DecorationLayer.RUGS,
        },
        LARGE_RETRO_RUG: { 
            size: new Vec2(64, 48),
            spriteOffset: new Vec2(656, 960),
            sortingLayer: DecorationLayer.RUGS,
        },
        RETRO_RUG: { 
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(544, 944),
            sortingLayer: DecorationLayer.RUGS,
        },
        RETRO_SQUARE_RUG: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(624, 944),
            sortingLayer: DecorationLayer.RUGS,
        },
        RETRO_MAT: { 
            size: new Vec2(32, 16),
            spriteOffset: new Vec2(624, 976),
            sortingLayer: DecorationLayer.RUGS,
        },
    }

    //Cushions
    static CUSHIONS = {
        BLUE_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(544, 464),
            sortingLayer: DecorationLayer.CUSHIONS,
        },
        YELLOW_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(560, 464),
            sortingLayer: DecorationLayer.CUSHIONS,
        },
        GREEN_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(576, 464),
            sortingLayer: DecorationLayer.CUSHIONS,
        },
        RED_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(592, 464),
            sortingLayer: DecorationLayer.CUSHIONS,
        },
        BROWN_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(608, 464),
            sortingLayer: DecorationLayer.CUSHIONS,
        },
        BLACK_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(624, 464),
            sortingLayer: DecorationLayer.CUSHIONS,
        },
        JOJA_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(880, 496),
            sortingLayer: DecorationLayer.CUSHIONS,
        },
        GRAY_JOJA_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(864, 496),
            sortingLayer: DecorationLayer.CUSHIONS,
        },
        WIZARD_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(672, 1168),
            sortingLayer: DecorationLayer.CUSHIONS,
        },
        DARK_WIZARD_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(672, 1184),
            sortingLayer: DecorationLayer.CUSHIONS,
        },
        JUNIMO_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(864, 144),
            sortingLayer: DecorationLayer.CUSHIONS,
        },
        DARK_JUNIMO_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(880, 144),
            sortingLayer: DecorationLayer.CUSHIONS,
        },
        RETRO_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(624, 848),
            sortingLayer: DecorationLayer.CUSHIONS,
        },
        DARK_RETRO_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(608, 848),
            sortingLayer: DecorationLayer.CUSHIONS,
        },
    }

    //Plants
    static HOUSE_PLANTS = {
        HOUSE_PLANT_1: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(0, 688),
        },
        HOUSE_PLANT_2: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(32, 688),
        },
        HOUSE_PLANT_3: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(160, 688),
        },
        HOUSE_PLANT_4: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(144, 688),
        },
        HOUSE_PLANT_5: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(192, 688),
        },
        HOUSE_PLANT_6: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(48, 688),
        },
        HOUSE_PLANT_7: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(224, 688),
        },
        HOUSE_PLANT_8: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(208, 688),
        },
        HOUSE_PLANT_9: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(64, 688),
        },
        HOUSE_PLANT_10: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(16, 688),
        },
        HOUSE_PLANT_11: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(128, 688),
        },
        HOUSE_PLANT_12: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(96, 688),
        },
        HOUSE_PLANT_13: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(80, 688),
        },
        HOUSE_PLANT_14: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(176, 688),
        },
        HOUSE_PLANT_15: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(112, 688),
        },
    }

}

//Decoration object
class Decoration extends GameObject {

    //Constructor
    constructor(preset = {}, config = {}) {
        //Disable clicks on decoration
        config.clickable = false;

        //Add image to config
        config.image = `decoration/decoration.png`;

        //Create game object
        super({ ...preset, ...config });

        //Add to decoration list
        Game.decoration.push(this);
    }

    remove() {
        super.remove();

        //Remove from decoration list
        Game.decoration.removeItem(this);
    }

}