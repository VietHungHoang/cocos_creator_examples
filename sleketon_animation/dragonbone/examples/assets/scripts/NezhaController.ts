import {
    _decorator,
    Component,
    SystemEvent,
    EventKeyboard,
    KeyCode,
    input,
    Input,
    dragonBones,
    math,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("NezhaController")
export class NezhaController extends Component {
    @property(dragonBones.ArmatureDisplay)
    armatureDisplay: dragonBones.ArmatureDisplay = null!;

    private isLiving = true;
    private keyState: { [key: string]: boolean } = {};
    private speed = 10;


    onLoad() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(event: EventKeyboard){
        this.keyState[event.keyCode] = true;
    }

    onKeyUp(event: EventKeyboard){
        this.keyState[event.keyCode] = false;
    }

    

    update() {
        console.log(this.node.getRotation());
        if(this.isLiving){
            this.armatureDisplay.once(
                dragonBones.EventObject.COMPLETE,
                () => {
                    this.armatureDisplay.playAnimation("idle", 0);
                },
                this
            );
            if(this.keyState[KeyCode.ARROW_RIGHT] || this.keyState[KeyCode.KEY_D])
                this.moveRight();
            else if(this.keyState[KeyCode.ARROW_LEFT] || this.keyState[KeyCode.KEY_A])
                this.moveLeft();

        }
            
    }
    moveRight(){
        if(this.node.getRotation().y === -180)
            this.node.setRotationFromEuler(0, 180, 0);
        this.armatureDisplay.playAnimation("run", 1);
        var currentPosition = this.node.getPosition();
        currentPosition.add3f(this.speed, 0, 0);
        this.node.setPosition(currentPosition);
    }

    moveLeft(){
        if(this.node.getRotation().y === 0)
            this.node.setRotationFromEuler(0, -180, 0);
        this.armatureDisplay.playAnimation("run", 1);
        var currentPosition = this.node.getPosition();
        currentPosition.add3f(-this.speed, 0, 0);
        this.node.setPosition(currentPosition);

    }

    onDestroy() {
        this.node.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.node.off(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
}
