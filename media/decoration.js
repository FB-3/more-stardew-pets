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
            price: 350,
        },
        WALNUT_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(48, 0),
            price: 350,
        },
        BIRCH_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(96, 0),
            price: 350,
        },
        MAHOGANY_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(144, 0),
            price: 1000,
        },
        RED_DINER_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(192, 0),
            price: 750,
        },
        BLUE_DINER_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(240, 0),
            price: 750,
        },
        COUNTRY_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(288, 0),
            price: 750,
        },
        BREAKFAST_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(336, 0),
            price: 750,
        },
        PINK_OFFICE_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(384, 0),
            price: 500,
        },
        PURPLE_OFFICE_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(432, 0),
            price: 500,
        },
        DARK_THRONE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(0, 32),
            price: 2000,
        },
        DINING_CHAIR_YELLOW: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(48, 32),
            price: 1200,
        },
        DINING_CHAIR_RED: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(96, 32),
            price: 1200,
        },
        GREEN_PLUSH_SEAT: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(144, 32),
            price: 750,
        },
        PINK_PLUSH_SEAT: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(192, 32),
            price: 750,
        },
        WINTER_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(240, 32),
            price: 750,
        },
        GROOVY_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(288, 32),
            price: 750,
        },
        CUTE_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(336, 32),
            price: 1200,
        },
        STUMP_SEAT: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(384, 32),
            price: 2000,
        },
        METAL_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(432, 32),
            price: 800,
        },
        KING_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(0, 64),
            price: 3000,
        },
        CRYSTAL_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(48, 64),
            price: 2500,
        },
        TROPICAL_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(96, 64),
            price: 2500, //Invented price
        },
        DESERT_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(544, 80),
            price: 1000, //Invented price
        },
        JOJA_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(896, 432),
            price: 1000, //Invented price
        },
        WIZARD_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(592, 1152),
            price: 1000, //Invented price
        },
        JUNIMO_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(848, 80),
            price: 1000, //Invented price
        },
        RETRO_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(672, 848),
            price: 1000, //Invented price
        },
        PLASTIC_LAWN_CHAIR: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(640, 608),
            price: 350, //Invented price
        },
    }

    static STOOLS = {
        GREEN_OFFICE_STOOL: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(480, 0),
            price: 350,
        },
        ORANGE_OFFICE_STOOL: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(496, 0),
            price: 350,
        },
        GREEN_STOOL: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(480, 32),
            price: 350,
        },
        BLUE_STOOL: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(496, 32),
            price: 350,
        },
        JOJA_STOOL: { 
            size: new Vec2(16),
            spriteOffset: new Vec2(896, 736),
            price: 500, //Invented price
        },
        WIZARD_STOOL: { 
            size: new Vec2(16),
            spriteOffset: new Vec2(688, 1088),
            price: 500, //Invented price
        },
        JUNIMO_STOOL: { 
            size: new Vec2(16),
            spriteOffset: new Vec2(880, 64),
            price: 500, //Invented price
        },
        RETRO_STOOL: { 
            size: new Vec2(16),
            spriteOffset: new Vec2(640, 848),
            price: 500, //Invented price
        },
    }

    static BENCHES = {
        OAK_BENCH: { 
            size: new Vec2(32, 32),
            spriteOffset: new Vec2(0, 96),
            price: 750,
        },
        WALNUT_BENCH: { 
            size: new Vec2(32, 32),
            spriteOffset: new Vec2(80, 96),
            price: 750,
        },
        BIRCH_BENCH: { 
            size: new Vec2(32, 32),
            spriteOffset: new Vec2(160, 96),
            price: 750,
        },
        MAHOGANY_BENCH: { 
            size: new Vec2(32, 32),
            spriteOffset: new Vec2(240, 96),
            price: 2000,
        },
        MODERN_BENCH: { 
            size: new Vec2(32, 32),
            spriteOffset: new Vec2(320, 96),
            price: 2000,
        },
    }

    //Tables
    static TABLES = {
        OAK_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(0, 560),
            price: 750,
        },
        WALNUT_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(32, 560),
            price: 750,
        },
        BIRCH_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(64, 560),
            price: 750,
        },
        MAHOGANY_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(96, 560),
            price: 1500,
        },
        MODERN_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(192, 560),
            price: 1250,
        },
        WINTER_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(384, 560),
            price: 1250,
        },
        SUN_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(128, 560),
            price: 2500,
        },
        MOON_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(160, 560),
            price: 2500,
        },
        PUZZLE_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(352, 560),
            price: 1500,
        },
        CANDY_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(416, 560),
            price: 1000,
        },
        LUAU_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(448, 560),
            price: 1000,
        },
        DARK_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(480, 560),
            price: 2000,
        },
        DIVINER_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(288, 560),
            price: 2250,
        },
        PUB_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(224, 560),
            price: 800,
        },
        LUXURY_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(256, 560),
            price: 2000,
        },
        NEOLITHIC_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(320, 560),
            price: 1800,
        },
        WINE_TABLE: { 
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(672, 448),
            price: 2000, //Invented price
        },
        SPIRITS_TABLE: { 
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(672, 480),
            price: 2000, //Invented price
        },
        DESERT_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(512, 80),
            price: 1500, //Invented price
        },
        JOJA_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(896, 464),
            price: 1500, //Invented price
        },
        WIZARD_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(640, 1152),
            price: 1500, //Invented price
        },
        JUNIMO_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(896, 64),
            price: 1500, //Invented price
        },
        RETRO_TABLE: { 
            size: new Vec2(32, 48),
            spriteOffset: new Vec2(672, 880),
            price: 1500, //Invented price
        },
    }
    
    static TEA_TABLES = {
        OAK_TEA_TABLE: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(0, 608),
            price: 750,
        },
        WALNUT_TEA_TABLE: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(32, 608),
            price: 750,
        },
        BIRCH_TEA_TABLE: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(64, 608),
            price: 750,
        },
        MAHOGANY_TEA_TABLE: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(96, 608),
            price: 1500,
        },
        MODERN_TEA_TABLE: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(128, 608),
            price: 1000,
        },
        JOJA_TABLE: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(864, 464),
            price: 1500, //Invented price
        },
        WIZARD_TABLE: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(688, 1168),
            price: 1500, //Invented price
        },
        JUNIMO_TABLE: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(864, 112),
            price: 1500, //Invented price
        },
        RETRO_TABLE: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(576, 912),
            price: 1500, //Invented price
        },
    }

    static END_TABLES = {
        OAK_END_TABLE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(240, 688),
            price: 500,
        },
        WALNUT_END_TABLE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(272, 688),
            price: 500,
        },
        BIRCH_END_TABLE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(304, 688),
            price: 500,
        },
        MAHOGANY_END_TABLE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(336, 688),
            price: 1000,
        },
        MODERN_END_TABLE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(368, 688),
            price: 800,
        },
        WINTER_END_TABLE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(400, 688),
            price: 800,
        },
        GRANDMOTHER_END_TABLE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(384, 688),
            price: 1000,
        },
        DESERT_END_TABLE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(544, 112),
            price: 1000, //Invented price
        },
        JOJA_END_TABLE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(912, 720),
            price: 1000, //Invented price
        },
        GRAY_JOJA_END_TABLE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(944, 720),
            price: 1000, //Invented price
        },
        WIZARD_END_TABLE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(672, 1104),
            price: 1000, //Invented price
        },
        JUNIMO_END_TABLE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(816, 112),
            price: 1000, //Invented price
        },
        RETRO_END_TABLE: { 
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(544, 912),
            price: 1000, //Invented price
        },
    }

    static COFFE_TABLES = {
        COFFE_TABLE: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(320, 352),
            price: 1250,
        },
        STONE_SLAB: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(368, 352),
            price: 1000,
        },
        JOJA_TABLE: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(848, 672),
            price: 1250, //Invented price
        },
        GRAY_JOJA_TABLE: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(896, 672),
            price: 1250, //Invented price
        },
        ELIXIR_TABLE: { 
            size: new Vec2(32),
            spriteOffset: new Vec2(656, 1200),
            price: 1250, //Invented price
        },
    }

    //Rugs
    static RUGS = {
        BAMBOO_MAT: {
            size: new Vec2(32, 16),
            spriteOffset: new Vec2(432, 864),
            sortingLayer: DecorationLayer.RUGS,
            price: 250,
        },
        BURLAP_RUG: {
            size: new Vec2(32),
            spriteOffset: new Vec2(224, 864),
            sortingLayer: DecorationLayer.RUGS,
            price: 350,
        },
        WOODCUT_RUG: {
            size: new Vec2(32),
            spriteOffset: new Vec2(272, 880),
            sortingLayer: DecorationLayer.RUGS,
            price: 800,
        },
        MONSTER_RUG: {
            size: new Vec2(32),
            spriteOffset: new Vec2(448, 800),
            sortingLayer: DecorationLayer.RUGS,
            price: 800, //Invented price
        },
        OCEANIC_RUG: {
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(192, 608),
            sortingLayer: DecorationLayer.RUGS,
            price: 800,
        },
        RED_RUG: {
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(176, 720),
            sortingLayer: DecorationLayer.RUGS,
            price: 1000,
        },
        PATCHWORK_RUG: {
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(256, 720),
            sortingLayer: DecorationLayer.RUGS,
            price: 800,
        },
        DARK_RUG: {
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(337, 720),
            sortingLayer: DecorationLayer.RUGS,
            price: 2000,
        },
        RED_COTTAGE_RUG: {
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(288, 800),
            sortingLayer: DecorationLayer.RUGS,
            price: 1250, //Invented price
        },
        GREEN_COTTAGE_RUG: {
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(368, 800),
            sortingLayer: DecorationLayer.RUGS,
            price: 1250, //Invented price
        },
        MYSTIC_RUG: {
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(0, 832),
            sortingLayer: DecorationLayer.RUGS,
            price: 1250, //Invented price
        },
        NAUTICAL_RUG: {
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(144, 864),
            sortingLayer: DecorationLayer.RUGS,
            price: 1250,
        },
        PIRATE_RUG: {
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(224, 944),
            sortingLayer: DecorationLayer.RUGS,
            price: 1250, //Invented price
        },
        FRUIT_SALAD_RUG: {
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(336, 944),
            sortingLayer: DecorationLayer.RUGS,
            price: 1250, //Invented price
        },
        BONE_RUG: {
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(192, 976),
            sortingLayer: DecorationLayer.RUGS,
            price: 1250, //Invented price
        },
        SNOWY_RUG: {
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(416, 976),
            sortingLayer: DecorationLayer.RUGS,
            price: 1250, //Invented price
        },
        LIGHT_GREEN_RUG: {
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(385, 1232),
            sortingLayer: DecorationLayer.RUGS,
            price: 1250, //Invented price
        },
        LARGE_GREEN_RUG: {
            size: new Vec2(64, 48),
            spriteOffset: new Vec2(0, 1392),
            sortingLayer: DecorationLayer.RUGS,
            price: 2500,
        },
        ICY_RUG: {
            size: new Vec2(64, 48),
            spriteOffset: new Vec2(96, 1392),
            sortingLayer: DecorationLayer.RUGS,
            price: 4000,
        },
        OLD_WORLD_RUG: {
            size: new Vec2(64, 48),
            spriteOffset: new Vec2(160, 1392),
            sortingLayer: DecorationLayer.RUGS,
            price: 2500,
        },
        LARGE_RED_RUG: {
            size: new Vec2(64, 48),
            spriteOffset: new Vec2(224, 1392),
            sortingLayer: DecorationLayer.RUGS,
            price: 1000,
        },
        LARGE_COTTAGE_RUG: {
            size: new Vec2(64, 48),
            spriteOffset: new Vec2(288, 1392),
            sortingLayer: DecorationLayer.RUGS,
            price: 2000,
        },
        FUNKY_RUG: {
            size: new Vec2(80, 64),
            spriteOffset: new Vec2(352, 1424),
            sortingLayer: DecorationLayer.RUGS,
            price: 4000,
        },
        MODERN_RUG: {
            size: new Vec2(80, 64),
            spriteOffset: new Vec2(432, 1424),
            sortingLayer: DecorationLayer.RUGS,
            price: 4000,
        },
        BLOSSOM_RUG: {
            size: new Vec2(96, 64),
            spriteOffset: new Vec2(352, 1360),
            sortingLayer: DecorationLayer.RUGS,
            price: 3500, //Invented price
        },
        SANDY_RUG: {
            size: new Vec2(48),
            spriteOffset: new Vec2(624, 80),
            sortingLayer: DecorationLayer.RUGS,
            price: 1250, //Invented price
        },
        DESERT_RUG: {
            size: new Vec2(64, 48),
            spriteOffset: new Vec2(512, 192),
            sortingLayer: DecorationLayer.RUGS,
            price: 2000, //Invented price
        },
        LARGE_JOJA_RUG: {
            size: new Vec2(80, 48),
            spriteOffset: new Vec2(768, 608),
            sortingLayer: DecorationLayer.RUGS,
            price: 3000, //Invented price
        },
        SQUARE_JOJA_RUG: {
            size: new Vec2(32),
            spriteOffset: new Vec2(848, 624),
            sortingLayer: DecorationLayer.RUGS,
            price: 800, //Invented price
        },
        SMALL_JOJA_RUG: {
            size: new Vec2(32, 16),
            spriteOffset: new Vec2(848, 608),
            sortingLayer: DecorationLayer.RUGS,
            price: 500, //Invented price
        },
        JOJA_RUG: {
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(768, 656),
            sortingLayer: DecorationLayer.RUGS,
            price: 1250, //Invented price
        },
        RUNE_RUG: {
            size: new Vec2(32),
            spriteOffset: new Vec2(576, 1248),
            sortingLayer: DecorationLayer.RUGS,
            price: 800, //Invented price
        },
        SWIRL_RUG: {
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(512, 1280),
            sortingLayer: DecorationLayer.RUGS,
            price: 1250, //Invented price
        },
        STARRY_MOON_RUG: {
            size: new Vec2(80, 48),
            spriteOffset: new Vec2(512, 1329),
            sortingLayer: DecorationLayer.RUGS,
            price: 3000, //Invented price
        },
        STONE_FLOORING: {
            size: new Vec2(64),
            spriteOffset: new Vec2(512, 1216),
            sortingLayer: DecorationLayer.RUGS,
            price: 2000, //Invented price
        },
        SQUARE_JUNIMO_RUG: {
            size: new Vec2(32),
            spriteOffset: new Vec2(769, 192),
            sortingLayer: DecorationLayer.RUGS,
            price: 800, //Invented price
        },
        CIRCULAR_JUNIMO_RUG: {
            size: new Vec2(48),
            spriteOffset: new Vec2(768, 336),
            sortingLayer: DecorationLayer.RUGS,
            price: 1250, //Invented price
        },
        JUNIMO_RUG: {
            size: new Vec2(64, 48),
            spriteOffset: new Vec2(768, 224),
            sortingLayer: DecorationLayer.RUGS,
            price: 2000, //Invented price
        },
        JUNIMO_MAT: {
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(832, 224),
            sortingLayer: DecorationLayer.RUGS,
            price: 1250, //Invented price
        },
        SMALL_JUNIMO_MAT: {
            size: new Vec2(32, 16),
            spriteOffset: new Vec2(928, 368),
            sortingLayer: DecorationLayer.RUGS,
            price: 500, //Invented price
        },
        LARGE_RETRO_RUG: {
            size: new Vec2(64, 48),
            spriteOffset: new Vec2(656, 960),
            sortingLayer: DecorationLayer.RUGS,
            price: 2000, //Invented price
        },
        RETRO_RUG: {
            size: new Vec2(48, 32),
            spriteOffset: new Vec2(544, 944),
            sortingLayer: DecorationLayer.RUGS,
            price: 1250, //Invented price
        },
        RETRO_SQUARE_RUG: {
            size: new Vec2(32),
            spriteOffset: new Vec2(624, 944),
            sortingLayer: DecorationLayer.RUGS,
            price: 800, //Invented price
        },
        RETRO_MAT: {
            size: new Vec2(32, 16),
            spriteOffset: new Vec2(624, 976),
            sortingLayer: DecorationLayer.RUGS,
            price: 500, //Invented price
        },
    }

    //Cushions
    static CUSHIONS = {
        BLUE_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(544, 464),
            sortingLayer: DecorationLayer.CUSHIONS,
            price: 350, //Invented price
        },
        YELLOW_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(560, 464),
            sortingLayer: DecorationLayer.CUSHIONS,
            price: 350, //Invented price
        },
        GREEN_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(576, 464),
            sortingLayer: DecorationLayer.CUSHIONS,
            price: 350, //Invented price
        },
        RED_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(592, 464),
            sortingLayer: DecorationLayer.CUSHIONS,
            price: 350, //Invented price
        },
        BROWN_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(608, 464),
            sortingLayer: DecorationLayer.CUSHIONS,
            price: 350, //Invented price
        },
        BLACK_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(624, 464),
            sortingLayer: DecorationLayer.CUSHIONS,
            price: 350, //Invented price
        },
        JOJA_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(880, 496),
            sortingLayer: DecorationLayer.CUSHIONS,
            price: 500, //Invented price
        },
        GRAY_JOJA_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(864, 496),
            sortingLayer: DecorationLayer.CUSHIONS,
            price: 500, //Invented price
        },
        WIZARD_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(672, 1168),
            sortingLayer: DecorationLayer.CUSHIONS,
            price: 500, //Invented price
        },
        DARK_WIZARD_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(672, 1184),
            sortingLayer: DecorationLayer.CUSHIONS,
            price: 500, //Invented price
        },
        JUNIMO_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(864, 144),
            sortingLayer: DecorationLayer.CUSHIONS,
            price: 500, //Invented price
        },
        DARK_JUNIMO_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(880, 144),
            sortingLayer: DecorationLayer.CUSHIONS,
            price: 500, //Invented price
        },
        RETRO_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(624, 848),
            sortingLayer: DecorationLayer.CUSHIONS,
            price: 500, //Invented price
        },
        DARK_RETRO_CUSHION: {
            size: new Vec2(16),
            spriteOffset: new Vec2(608, 848),
            sortingLayer: DecorationLayer.CUSHIONS,
            price: 500, //Invented price
        },
    }

    //Plants
    static HOUSE_PLANTS = {
        HOUSE_PLANT_1: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(0, 688),
            price: 250,
        },
        HOUSE_PLANT_2: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(32, 688),
            price: 250,
        },
        HOUSE_PLANT_3: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(160, 688),
            price: 250,
        },
        HOUSE_PLANT_4: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(144, 688),
            price: 250,
        },
        HOUSE_PLANT_5: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(192, 688),
            price: 250,
        },
        HOUSE_PLANT_6: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(48, 688),
            price: 250,
        },
        HOUSE_PLANT_7: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(224, 688),
            price: 250,
        },
        HOUSE_PLANT_8: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(208, 688),
            price: 250,
        },
        HOUSE_PLANT_9: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(64, 688),
            price: 250,
        },
        HOUSE_PLANT_10: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(16, 688),
            price: 250,
        },
        HOUSE_PLANT_11: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(128, 688),
            price: 250,
        },
        HOUSE_PLANT_12: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(96, 688),
            price: 250,
        },
        HOUSE_PLANT_13: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(80, 688),
            price: 250,
        },
        HOUSE_PLANT_14: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(176, 688),
            price: 250,
        },
        HOUSE_PLANT_15: {
            size: new Vec2(16, 32),
            spriteOffset: new Vec2(112, 688),
            price: 250,
        },
    }

}

//Decoration object
class Decoration extends GameObject {

    //Info
    #price = 0;
    get price() { return this.#price; }

    //Moving
    #snap = 16;
    #moving = false;
    get moving() { return this.#moving; }
    #movingOffset = new Vec2();


    //Constructor
    constructor(preset = {}, config = {}) {
        //Add image to config
        config.image = `decoration.png`;

        //Create game object
        super({ ...preset, ...config });

        //Save price
        if (typeof preset.price === 'number') this.#price = preset.price;

        //Add to decoration list
        Game.decoration.push(this);
    }

    remove() {
        super.remove();

        //Remove from decoration list
        const index = Game.decoration.removeItem(this);

        //Notify decor removed
        vscode.postMessage({
            type: 'remove_decor',
            index: index,
        });

        //Exit decor mode if no decor left
        if (Game.decoration.isEmpty() && Game.isAction(Action.DECOR)) DecorMode.toggle(false);
    }

    //Update
    update() {
        //Update game object
        super.update();

        //Check if moving
        if (!this.#moving || !DecorMode.isAction(DecorMode.MOVE)) return;

        //Calculate new snapped position
        const mousePos = Cursor.scaledPos.sub(this.#movingOffset);
        const snappedPos = this.snapPos(mousePos);

        //Fix bounds
        snappedPos.x = Util.clamp(snappedPos.x, 0, Math.floor((Game.scaledSize.x - this.size.x + this.#snap) / this.#snap) * this.#snap);
        snappedPos.y = Util.clamp(snappedPos.y, 0, Math.floor((Game.scaledSize.y - this.size.y + this.#snap) / this.#snap) * this.#snap);

        //Position didnt change
        if (snappedPos.equals(this.pos)) return;

        //Move to new pos
        this.moveTo(snappedPos, true);

        //Notify position changed
        vscode.postMessage({
            type: 'move_decor',
            index: Game.decoration.indexOf(this),
            x: snappedPos.x,
            y: snappedPos.y
        });
    }

    //Click
    mouseDown(pos) {
        //Check game action
        if (!Game.isAction(Action.DECOR)) return false;

        //Check decor action
        switch (DecorMode.action) {
            //Move
            case DecorMode.MOVE:
                //Start moving
                this.startDragging(pos.sub(this.pos));
                break;

            //Sell
            case DecorMode.SELL:
                //Do nothing
                break;
        }

        //Consume event
        return true;
    }

    mouseUp(pos) {
        //Check game action
        if (!Game.isAction(Action.DECOR)) return false;

        //Check decor action
        switch (DecorMode.action) {
            //Move
            case DecorMode.MOVE:
                //Stop moving
                this.stopDragging();
                break;

            //Sell
            case DecorMode.SELL:
                //Give money to player
                if (typeof this.price === 'number') Game.addMoney(this.price);

                //Remove decor
                this.remove();
                break;
        }

        //Consume event
        return true;
    }

    //Movement
    startDragging(moveOffset) {
        //Start moving
        this.#moving = true;
        this.#movingOffset = moveOffset;
    }

    stopDragging() {
        //Stop moving
        this.#moving = false;
    }

    snapPos(pos) {
        return pos.div(this.#snap).toIntRound().mult(this.#snap);
    }

}