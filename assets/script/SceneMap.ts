
import { MapType } from "./map/base/MapType";
import MapLayer from "./map/layer/MapLayer";
import EntityLayer from "./map/layer/EntityLayer";
import Charactor from "./map/charactor/Charactor";
import RoadNode from "./map/road/RoadNode";
import IRoadSeeker from "./map/road/IRoadSeeker";
import MapData from "./map/base/MapData";
import MapRoadUtils from "./map/road/MapRoadUtils";
import AstarHoneycombRoadSeeker from "./map/road/AstarHoneycombRoadSeeker";
import AStarRoadSeeker from "./map/road/AStarRoadSeeker";
import Point from "./map/road/Point";
import { MapLoadModel } from "./map/base/MapLoadModel";
import MapParams from "./map/base/MapParams";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

/**
 * 地图场景逻辑
 * @author 落日故人 QQ 583051842
 * 
 */
@ccclass
export default class SceneMap extends cc.Component {

    @property(cc.Node)
    public layer: cc.Node = null;

    @property(MapLayer)
    public mapLayer: MapLayer = null;

    @property(EntityLayer)
    public entityLayer: EntityLayer = null;

    @property(Charactor)
    private player:Charactor = null;

    @property(cc.Camera)
    private camera:cc.Camera = null;

    @property()
    public isFollowPlayer:boolean = true;

    private _roadDic:{[key:string]:RoadNode} = {};

    private _roadSeeker:IRoadSeeker;

    private targetPos:cc.Vec2 = cc.Vec2.ZERO;

    //private _mapData:MapData = null;

    private _mapParams:MapParams = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

        this.node.x = -cc.winSize.width / 2;
        this.node.y = -cc.winSize.height / 2;

        this.player.sceneMap = this;
        this.node.on(cc.Node.EventType.TOUCH_START,this.onMapMouseDown,this);
    }

    public init(mapData:MapData,bgTex:cc.Texture2D,mapLoadModel:MapLoadModel = 1)
    {
 
        //this._mapData = mapData;

        MapRoadUtils.instance.updateMapInfo(mapData.mapWidth,mapData.mapHeight,mapData.nodeWidth,mapData.nodeHeight,mapData.type);

        //初始化底图参数
        this._mapParams = new MapParams();
        this._mapParams.name = mapData.name;
        this._mapParams.bgName = mapData.bgName;
        this._mapParams.mapType = mapData.type;
        this._mapParams.mapWidth = mapData.mapWidth;
        this._mapParams.mapHeight = mapData.mapHeight;
        this._mapParams.ceilWidth = mapData.nodeWidth;
        this._mapParams.ceilHeight = mapData.nodeHeight;

        this._mapParams.viewWidth = mapData.mapWidth > cc.winSize.width ? cc.winSize.width : mapData.mapWidth;
        this._mapParams.viewHeight = mapData.mapHeight > cc.winSize.height ? cc.winSize.height : mapData.mapHeight;
        this._mapParams.sliceWidth = 256;
        this._mapParams.sliceHeight = 256;
        this._mapParams.bgTex = bgTex;
        this._mapParams.mapLoadModel = mapLoadModel;

        this.mapLayer.init(this._mapParams);
    
        var len:number = mapData.roadDataArr.length;
        var len2:number = mapData.roadDataArr[0].length;
        
        var value:number = 0;
        var dx:number = 0;
        var dy:number = 0;

        for(var i:number = 0 ; i < len ; i++)
        {
            for(var j:number = 0 ; j < len2 ; j++)
            {
                value = mapData.roadDataArr[i][j];
                dx = j;
                dy = i;
                
                var node:RoadNode = MapRoadUtils.instance.getNodeByDerect(dx,dy);
                node.value = value;

                this._roadDic[node.cx + "_" + node.cy] = node;
            }
        }

        if(mapData.type == MapType.honeycomb)
        {
            this._roadSeeker = new AstarHoneycombRoadSeeker(this._roadDic)
        }else
        {
            this._roadSeeker = new AStarRoadSeeker(this._roadDic);
        }

        this.node.width = this.mapLayer.width;
        this.node.height = this.mapLayer.height;

        this.setViewToPlayer();

    }

    public getMapNodeByPixel(px:number,py:number):RoadNode
    {
        var point:Point = MapRoadUtils.instance.getWorldPointByPixel(px,py);
        
        var node:RoadNode = this._roadDic[point.x + "_" + point.y];
        
        return node;
    }


    public onMapMouseDown(event:cc.Event.EventTouch):void
    {
        //var pos = this.node.convertToNodeSpaceAR(event.getLocation());
        var pos = this.camera.node.position.add(event.getLocation());

        this.movePlayer(pos.x,pos.y);

    }

    /**
     * 视图跟随玩家
     * @param dt 
     */
    public followPlayer(dt:number)
    {
        this.targetPos = this.player.node.position.sub(cc.v2(cc.winSize.width / 2,cc.winSize.height / 2));

        if(this.targetPos.x > this._mapParams.mapWidth - cc.winSize.width)
        {
            this.targetPos.x = this._mapParams.mapWidth - cc.winSize.width;
        }else if(this.targetPos.x < 0)
        {
            this.targetPos.x = 0;
            
        }    

        if(this.targetPos.y > this._mapParams.mapHeight - cc.winSize.height)
        {
            this.targetPos.y = this._mapParams.mapHeight - cc.winSize.height;
        }else if(this.targetPos.y < 0)
        {
            this.targetPos.y = 0;
        }
        

        //摄像机平滑跟随
        this.camera.node.position.lerp(this.targetPos,dt * 2.0,this.targetPos);
        this.camera.node.position = this.targetPos;

        if(this._mapParams.mapLoadModel == MapLoadModel.slices)
        {
            this.mapLayer.loadSliceImage(this.targetPos.x,this.targetPos.y);
        }
        
    }

    /**
        *移到玩家 
        * @param targetX 移动到的目标点x
        * @param targetY 移到到的目标点y
        * 
        */	
    public movePlayer(targetX:number,targetY:number)
    {
        var startPoint:Point = MapRoadUtils.instance.getWorldPointByPixel(this.player.node.x,this.player.node.y);
        var targetPoint:Point = MapRoadUtils.instance.getWorldPointByPixel(targetX,targetY);

        var startNode:RoadNode = this._roadDic[startPoint.x + "_" + startPoint.y];
        var targetNode:RoadNode = this._roadDic[targetPoint.x + "_" + targetPoint.y];

        var roadNodeArr:RoadNode[] = this._roadSeeker.seekPath(startNode,targetNode); //点击到障碍点不会行走
        //var roadNodeArr:RoadNode[] = this._roadSeeker.seekPath2(startNode,targetNode);  //点击到障碍点会行走到离障碍点最近的可走路点

        if(roadNodeArr.length > 0)
        {
            this.player.walkByRoad(roadNodeArr);
        }
    }


    /**
     *把视野定位到给定位置 
    * @param px
    * @param py
    * 
    */		
    public setViewToPoint(px:number,py:number):void
    {
        this.targetPos = cc.v2(px,py).sub(cc.v2(cc.winSize.width / 2,cc.winSize.height / 2));

        if(this.targetPos.x > this._mapParams.mapWidth - cc.winSize.width)
        {
            this.targetPos.x = this._mapParams.mapWidth - cc.winSize.width;
        }else if(this.targetPos.x < 0)
        {
            this.targetPos.x = 0;
            
        }    

        if(this.targetPos.y > this._mapParams.mapHeight - cc.winSize.height)
        {
            this.targetPos.y = this._mapParams.mapHeight - cc.winSize.height;
        }else if(this.targetPos.y < 0)
        {
            this.targetPos.y = 0;
        }
        
        this.camera.node.position = this.targetPos;
        
        if(this._mapParams.mapLoadModel == MapLoadModel.slices)
        {
            this.mapLayer.loadSliceImage(this.targetPos.x,this.targetPos.y);
        }
    }
    
    /**
     * 将视野对准玩家
     */
    public setViewToPlayer():void
    {
        this.setViewToPoint(this.player.node.x,this.player.node.y);
    }


    update (dt) 
    {
        if(this.isFollowPlayer)
        {
            this.followPlayer(dt);
            //this.camera.node.position = this.player.node.position.sub(cc.v2(cc.winSize.width / 2,cc.winSize.height / 2));
        }

    }
}
