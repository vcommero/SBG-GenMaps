//=============================================================================
// Procedurally Generated Maps
// Procedurally_Generated_Maps.js
//=============================================================================

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var Imported = Imported || {};
Imported.SBG_Procedurally_Generated_Maps = true;

var SBG = SBG || {};
SBG.GenMaps = SBG.GenMaps || {};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/*:
 * @plugindesc
 *
 * @author ShadowBoxGames
 *
 * @param Map IDs of Random Maps
 * @desc Enter the map IDs of any maps that are to be randomly generated.
 * Separate values with commas.
 *
 * @help
 *
 */

//=============================================================================

// Allows the script to access the parameters created above.
SBG.Parameters =
	PluginManager.parameters('Procedurally_Generated_Maps');
SBG.MapGenParam = SBG.MapGenParam || {};
SBG.Temp =
	String(SBG.Parameters['Map IDs of Random Maps']);
SBG.Temp = SBG.Temp.split(',');
SBG.MapGenParam.RandMapIDs = [];
for (SBG.i = 0;
	SBG.i < SBG.Temp.length; ++SBG.i) {
	SBG.MapGenParam.RandMapIDs.push(parseInt(
		SBG.Temp[SBG.i]));
};


//=============================================================================
// Game_Interpreter
//=============================================================================

var SBGAliasPluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    SBGAliasPluginCommand.call(this, command, args);

    if(command == 'addsetpiece'){
        $dataMap.addSetPiece(3, 0, 3);
    }
};

// Transfer Player
SBG.GenMaps.GameInterpreter_command201 = Game_Interpreter.prototype.command201;
Game_Interpreter.prototype.command201 = function() {
    console.log('command201');
    // if (!$gameParty.inBattle() && !$gameMessage.isBusy()) {
    //     var mapId, x, y;
    //     if (this._params[0] === 0) {  // Direct designation
    //         mapId = this._params[1];
    //         x = this._params[2];
    //         y = this._params[3];
    //     } else {  // Designation with variables
    //         mapId = $gameVariables.value(this._params[1]);
    //         x = $gameVariables.value(this._params[2]);
    //         y = $gameVariables.value(this._params[3]);
    //     }
    //     $gamePlayer.reserveTransfer(mapId, x, y, this._params[4], this._params[5]);
    //     this.setWaitMode('transfer');
    //     this._index++;
    // }
    SBG.GenMaps.GameInterpreter_command201.call(this);
};

//=============================================================================
// DataManager
//=============================================================================

// Global that stores the map generator seeds the current saved player rolled.
// This way, each saved player will have their own generated maps. This will
// read from and write to values stored in save files.
var $gameMapSeeds     = null;

SBG.GenMaps.DataManager_loadMapData = DataManager.loadMapData;
DataManager.loadMapData = function(mapId) {
    // if (mapId > 0) {
    //     var filename = 'Map%1.json'.format(mapId.padZero(3));
    //     this.loadDataFile('$dataMap', filename);
    // } else {
    //     this.makeEmptyMap();
    // }
    SBG.GenMaps.DataManager_loadMapData.call(this, mapId);
    //console.log("loaded map data");
    //console.log(JSON.stringify($dataMap));
    //if ($dataMap.meta.generated_map == true) console.log("generated map");

};

SBG.GenMaps.DataManager_createGameObjects =
	DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    // $gameTemp          = new Game_Temp();
    // $gameSystem        = new Game_System();
    // $gameScreen        = new Game_Screen();
    // $gameTimer         = new Game_Timer();
    // $gameMessage       = new Game_Message();
    // $gameSwitches      = new Game_Switches();
    // $gameVariables     = new Game_Variables();
    // $gameSelfSwitches  = new Game_SelfSwitches();
    // $gameActors        = new Game_Actors();
    // $gameParty         = new Game_Party();
    // $gameTroop         = new Game_Troop();
    // $gameMap           = new Game_Map();
    // $gamePlayer        = new Game_Player();
    SBG.GenMaps.DataManager_createGameObjects.call(this);

    $gameMapSeeds      = new Game_Map_Seeds();
};

SBG.GenMaps.DataManager_makeSaveContents =
    DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    // A save data does not contain $gameTemp, $gameMessage, and $gameTroop.

    /*var contents = {};
    contents.system       = $gameSystem;
    contents.screen       = $gameScreen;
    contents.timer        = $gameTimer;
    contents.switches     = $gameSwitches;
    contents.variables    = $gameVariables;
    contents.selfSwitches = $gameSelfSwitches;
    contents.actors       = $gameActors;
    contents.party        = $gameParty;
    contents.map          = $gameMap;
    contents.player       = $gamePlayer;*/

    var contents =
        SBG.GenMaps.DataManager_makeSaveContents.call(this);

    contents.mapSeeds = $gameMapSeeds;

    return contents;
};

SBG.GenMaps.DataManager_extractSaveContents =
    DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    // $gameSystem        = contents.system;
    // $gameScreen        = contents.screen;
    // $gameTimer         = contents.timer;
    // $gameSwitches      = contents.switches;
    // $gameVariables     = contents.variables;
    // $gameSelfSwitches  = contents.selfSwitches;
    // $gameActors        = contents.actors;
    // $gameParty         = contents.party;
    // $gameMap           = contents.map;
    // $gamePlayer        = contents.player;
    SBG.GenMaps.DataManager_extractSaveContents.call(this, contents);

    $gameMapSeeds      = contents.mapSeeds;
};

SBG.GenMaps.DataManager_onLoad =
    DataManager.onLoad;
DataManager.onLoad = function(object) {
    /*var array;
    if (object === $dataMap) {
        this.extractMetadata(object);
        array = object.events;
    } else {
        array = object;
    }
    if (Array.isArray(array)) {
        for (var i = 0; i < array.length; i++) {
            var data = array[i];
            if (data && data.note !== undefined) {
                this.extractMetadata(data);
            }
        }
    }
    if (object === $dataSystem) {
        Decrypter.hasEncryptedImages = !!object.hasEncryptedImages;
        Decrypter.hasEncryptedAudio = !!object.hasEncryptedAudio;
        Scene_Boot.loadSystemImages();
    }*/
    SBG.GenMaps.DataManager_onLoad.call(this, object);
    if (object === $dataMap) DataManager.mapOnLoadCallback();
};

DataManager.mapOnLoadCallback = function() {
    console.log('map callback');
    if ($dataMap.meta.GeneratedMap) {
        console.log('generated map');
        $gameMap.processMap();
    }
}

//=============================================================================
// Scene_Map
//=============================================================================

SBG.GenMaps.SceneMap_create = Scene_Map.prototype.create;
Scene_Map.prototype.create = function() {
    /*Scene_Base.prototype.create.call(this);
    this._transfer = $gamePlayer.isTransferring();
    var mapId = this._transfer ? $gamePlayer.newMapId() : $gameMap.mapId();
    DataManager.loadMapData(mapId);*/
    console.log("SceneMap create");
    SBG.GenMaps.SceneMap_create.call(this);
};

//=============================================================================
// Game_Map
//=============================================================================

Game_Map.prototype.addSetPiece = function(mapData, tile, posX, posY) {
    console.log('Adding set piece at '+posX+' '+posY);
    //console.log('mapdata: ');
    //console.log(mapData);
    //console.log(JSON.stringify(mapData));
    //console.log('tile: ');
    //console.log(JSON.stringify(tile));

    // Check if mapData is empty/ missing fields
    if (mapData.data === undefined ||
        mapData.height === undefined ||
        mapData.width === undefined ||
        mapData.events === undefined) {
        console.log('mapData is empty');
        mapData = JSON.parse(JSON.stringify(tile));
        return mapData;
    }

    // The position where map tiles are placed are relative to the top right
    // corners of the map and tile.
    // e.g.
    // [_ _ _]                     [_ _ _ X X]   Y
    // [_ _ _] + [X X]           = [_ _ _ X X]   |
    // [_ _ _]   [X X] at (3, 0)   [_ _ _ _ _]   |____ X

    var oldWidth = mapData.width;
    var oldHeight = mapData.height;
    var currWidth = oldWidth;
    var currHeight = oldHeight;

    //~~~ Expand main map ~~~//
    // X Direction
    if (posX < 0 || posX + tile.width > mapData.width) {
        // Update width
        mapData.width = Math.max(posX + tile.width, mapData.width) - Math.min(posX, 0);

        // Expand left
        for (var i = 0; i < 0 - posX; i++) {
            for (var j = 0; j < mapData.data.length; j += (currWidth + 1)) {
                mapData.data.splice(j, 0, 0);
            }
            currWidth++;
        }

        // Expand right
        for (var i = 0; i < posX + tile.width - oldWidth; i++) {
            for (var j = currWidth; j < mapData.data.length + 1; j += (currWidth + 1)) {
                mapData.data.splice(j, 0, 0);
            }
            currWidth++;
        }

    }

    // Y Direction
    if (posY > 0 || posY - tile.height < -mapData.height) {
        // Update height
        mapData.height = (Math.min(posY - tile.height, -mapData.height) - Math.max(posY, 0)) * -1;

        // Expand down
        for (var i = 0; i < -(posY - tile.height) - oldHeight; i++) {
            for (var j = currHeight * currWidth; j < mapData.data.length + 1; j += (currHeight * currWidth) + currWidth) {
                for (var k = 0; k < currWidth; k++) mapData.data.splice(j, 0, 0);
            }
            currHeight++;
        }

        // Expand up
        for (var i = 0; i < posY; i++) {
            for (var j = 0; j < mapData.data.length; j += (currHeight * currWidth) + currWidth) {
                for (var k = 0; k < currWidth; k++) mapData.data.splice(j, 0, 0);
            }
            currHeight++;
        }

    }

    // console.log('expanded mapdata: ');
    // console.log(JSON.stringify(mapData)+' length: '+mapData.data.length);
    // console.log('tile: ');
    // console.log(JSON.stringify(tile)+' length: '+tile.data.length);

    console.log('Writing tile to map');
    //~~~ Write tile data into map ~~~//
    // Compute new tile position
    var newPosX = Math.max(0, posX);
    var newPosY = Math.min(0, posY);

    // Compute tile-to-map mappings
    var tileMap = [];
    for (var i = 0; i < tile.height; i++) {
        for (var j = 0; j < tile.width; j++) {
            tileMap.push({x: newPosX + j, y: newPosY - i});
        }
    }

    // console.log('tileMap: '+JSON.stringify(tileMap));

    // Write tile data to map
    for (var i = 0, k = 0; i < mapData.data.length; i += (mapData.width * mapData.height)) {
        for (var j = 0; j < tileMap.length; j++) {
            // console.log('mapdata index: '+((tileMap[j].x + (-(tileMap[j].y) * mapData.width)) + i)+' tile index: '+k);
            //console.log('tile data: '+tile.data[k]+' map data: '+mapData.data[(tileMap[j].x + (-(tileMap[j].y) * mapData.width))]);
            mapData.data[(tileMap[j].x + (-(tileMap[j].y) * mapData.width)) + i] = tile.data[k];
            k++;
        }
        // console.log('mapdata: ');
        // console.log(JSON.stringify(mapData)+' length: '+mapData.data.length);
    }

    // console.log('mapdata: ');
    // console.log(JSON.stringify(mapData));
    // console.log('tile: ');
    // console.log(JSON.stringify(tile));


    //~~~ Fix event positions ~~~//
    for (var i = 0; i < mapData.events.length; i++) {
        var event = mapData.events[i];
        if (event === null) continue;

        // Fix y coord
        event.y += Math.max(0, posY);

        // Fix x coord
        event.x += Math.max(0, -posX);
    }


    //~~~ Add tile events to map ~~~//
    for (var i = 0; i < tile.events.length; i++) {
        var event = JSON.parse(JSON.stringify(tile.events[i]));
        if (event === null) continue;

        // Convert event coords to map space
        event.x = Math.max(0, posX) + tile.events[i].x;
        event.y = Math.max(0, -posY) + tile.events[i].y;

        // Add event to map data
        mapData.events.push(event);
    }

    return mapData;

}

Game_Map.prototype.processMap = function() {
    console.log('Tiling map');
    var tileMappings = [];
    var tilesArray = [];

    // Get mappings for tiles
		// TileMappings is a 2D array with first index being the tile number
		// which then corresponds to an array of coordinates that belong in that tile
    for (var i = 1; i <= ($dataMap.width * $dataMap.height); i++) {
        var mapIndex = $dataMap.data.length - i;
        if (tileMappings[$dataMap.data[mapIndex] - 1] === undefined) {
            tileMappings[$dataMap.data[mapIndex] - 1] = {};
            tileMappings[$dataMap.data[mapIndex] - 1].coords = [ ($dataMap.width * $dataMap.height) - i ];
        } else {
            tileMappings[$dataMap.data[mapIndex] - 1].coords.unshift( ($dataMap.width * $dataMap.height) - i );
        }
    }

    // console.log('tileMappings: ');
    // console.log(JSON.stringify(tileMappings));

    // Split map into tiles
    for (var i = 0; i < $dataMap.data.length; i += ($dataMap.width * $dataMap.height)) {
        for (var j = 0; j < tileMappings.length; j++) {

            // Initialize tile
            if (tilesArray[j] === undefined) {
                tilesArray[j] = {
                    data: [],
                    events: [ null ]
                };
                for (var x=0; x<tileMappings[j].coords.length; x++) {
                    if (tileMappings[j].coords[x+1] == undefined || tileMappings[j].coords[x+1] != tileMappings[j].coords[x] + 1) {
                        tilesArray[j].width = x + 1;
                        break;
                    }
                }
                tilesArray[j].height = tileMappings[j].coords.length / tilesArray[j].width;
            }

            for (var k = 0; k < tileMappings[j].coords.length; k++) {
                tilesArray[j].data.push($dataMap.data[+i + +(tileMappings[j].coords[k])]);
            }
        }
    }

    // Map events into tiles
    for (var i = 0; i < $dataMap.events.length; i++) {
        var event = JSON.parse(JSON.stringify($dataMap.events[i]));
        if (event === null) continue;

        var eventCoord = ($dataMap.width * event.y) + event.x;

        for (var j = 0; j < tileMappings.length; j++) {
            // Check if event is located in the tile
            var index = -1;
            for (var k = 0; k < tileMappings[j].coords.length; k++) {
                if (tileMappings[j].coords[k] === eventCoord) {
                    index = k;
                    break;
                }
            }

            if (index !== -1) {
                // Convert event coords into tile space and add event to tiles array
                event.x = index % tilesArray[j].width;
                event.y = Math.floor(index / tilesArray[j].width);
                tilesArray[j].events.push(event);
                break;
            }
        }

    }

    //console.log('tilesArray: ');
    //console.log(JSON.stringify(tilesArray));
    console.log('Saving raw map');
    this._rawMap = JSON.parse(JSON.stringify($dataMap));
    this._tileMappings = JSON.parse(JSON.stringify(tileMappings));
    this._tilesArray = JSON.parse(JSON.stringify(tilesArray));
    
    return this.generateMap(tilesArray);
}

Game_Map.prototype.generateMap = function(mapTiles) {
    var generatorType = $dataMap.meta.MapGenerator;
		if (!generatorType) {
			throw "Missing MapGenerator metadata tag.";
		}
    var newMapData = this[generatorType](mapTiles);
    $dataMap.width = newMapData.width;
    $dataMap.height = newMapData.height;
    $dataMap.data = newMapData.data;
    $dataMap.events = newMapData.events;
    return newMapData;
}


SBG.GenMaps.GameMap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    /*if (!$dataMap) {
        throw new Error('The map data is not available');
    }
    this._mapId = mapId;
    this._tilesetId = $dataMap.tilesetId;
    this._displayX = 0;
    this._displayY = 0;
    this.refereshVehicles();
    this.setupEvents();
    this.setupScroll();
    this.setupParallax();
    this.setupBattleback();
    this._needsRefresh = false;*/

    console.log('map setup');
    //console.log(JSON.stringify($dataMap));
    SBG.GenMaps.GameMap_setup.call(this, mapId);
}

//=============================================================================
// Game_Map_Seeds
//=============================================================================

function Game_Map_Seeds() {
	this.initialize.apply(this, arguments);
}

Game_Map_Seeds.prototype.initialize = function() {
	this._seeds = null;
}

//=============================================================================
// Game_Player
//=============================================================================

SBG.GenMaps.GamePlayer_reserveTransfer = Game_Player.prototype.reserveTransfer;
Game_Player.prototype.reserveTransfer = function(mapId, x, y, d, fadeType) {
    console.log('reserve transfer');
    SBG.GenMaps.GamePlayer_reserveTransfer.call(this, mapId, x, y, d, fadeType);
};

SBG.GenMaps.GamePlayer_performTransfer = Game_Player.prototype.performTransfer;
Game_Player.prototype.performTransfer = function() {
    if ($dataMap.meta.GeneratedMap) {
        console.log('perform GenMaps transfer');
        if (this.isTransferring()) {
            this.setDirection(this._newDirection);
            if (this._newMapId !== $gameMap.mapId() || this._needsMapReload) {
                $gameMap.setup(this._newMapId);
                this._needsMapReload = false;
            }
            this.SBG_GenMaps_locate(this._newX, this._newY);
            this.refresh();
            this.clearTransferInfo();
        }
    } else {
        console.log('perform normal transfer');
        SBG.GenMaps.GamePlayer_performTransfer.call(this);
    }
};


Game_Player.prototype.SBG_GenMaps_locate = function(x, y) {
    console.log('SBG locate');
    // Find set piece that x,y coords is located in
    var rawCoord = ($gameMap._rawMap.width * y) + x;
    var setPieceNumber = 0;
    var coordInSetPiece = 0;
    for (var i = 0; i < $gameMap._tileMappings.length; i++) {
        for (var j = 0; j < $gameMap._tileMappings[i].coords.length; j++) {
            if ($gameMap._tileMappings[i].coords[j] === rawCoord) {
                setPieceNumber = i + 1;
                coordInSetPiece = j;
                break;
            }
        }
        if (setPieceNumber > 0) break;
    }

    if (setPieceNumber === 0) {
        throw "Error - Transfer coords in unlabelled set piece.";
    }

    // Find instances of the set piece in the generated map
    // and put their tile coords into arrays.
    var mapDataTileLabelSection = 
        $dataMap.data.slice($dataMap.data.length - ($dataMap.width * $dataMap.height), );
    console.log('dataMap data slice: ' + JSON.stringify(mapDataTileLabelSection));
    
    console.log('tile number: ' + setPieceNumber);

    var setPiece = $gameMap._tilesArray[setPieceNumber];

    var setPieceInstances = [];
    for (var i = 0; i < mapDataTileLabelSection.length; i += setPiece.width) {
        if (mapDataTileLabelSection[i] === setPieceNumber) {
            var setPieceMapping = [];
            for (var j = 0; j < setPiece.height; j++) {
                for (var k = 0; k < setPiece.width; k++) {
                    setPieceMapping.push(i + ($dataMap.width * j) + k);
                }
            }
            setPieceInstances.push(setPieceMapping);
        }
        if (Math.floor(i / $dataMap.width) !== Math.floor((i + setPiece.width) / $dataMap.width)) {
            i += $dataMap.width * (setPiece.height - 1);
        }
    }

    // Choose one of the instances, find the coordinate in the set piece,
    // and retrieve that mapped coordinate in map space. Then locate to those coordinates.
    if (setPieceInstances.length > 0) {
        var finalSingleCoord = setPieceInstances[Math.floor(Math.random() * setPieceInstances.length)][coordInSetPiece];
        // Convert single coord to x,y coord
        var finalX = finalSingleCoord % $dataMap.width;
        var finalY = Math.floor(finalSingleCoord / $dataMap.width);
        this.locate(finalX, finalY);
    } else {
        this.locate(x,y);
    }
};
