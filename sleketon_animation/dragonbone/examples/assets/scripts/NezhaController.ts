import {
    _decorator,
    Component,
    SystemEvent,
    EventKeyboard,
    KeyCode,
    input,
    Input,
    dragonBones,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("NezhaController")
export class NezhaController extends Component {
    @property(dragonBones.ArmatureDisplay)
    armatureDisplay: dragonBones.ArmatureDisplay = null!;

    private living = true;

    onLoad() {
        input.on(Input.EventType.KEY_DOWN, this.onMouseClick, this);
        this.armatureDisplay.playAnimation("idle", 0);
    }

    onMouseClick(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_U:
                this.armatureDisplay.playAnimation("attack1", 1);
                break;
            case KeyCode.KEY_I:
                this.armatureDisplay.playAnimation("attack1_1", 1);
                break;
            case KeyCode.KEY_O:
                this.armatureDisplay.playAnimation("attack1_2", 1);
                break;
            case KeyCode.KEY_O:
                this.armatureDisplay.playAnimation("attack1_3", 1);
                break;
            case KeyCode.SPACE:
                this.armatureDisplay.playAnimation("qingzhu", 1);
                break;
            case KeyCode.KEY_Y:
                this.armatureDisplay.playAnimation("run", 1);
                break;
            case KeyCode.KEY_T:
                this.armatureDisplay.playAnimation("skill1", 1);
                break;
            case KeyCode.KEY_A:
                this.armatureDisplay.playAnimation("dead", 1);
                this.living = false;
                break;
        }
    }

    update() {
        if(this.living){
            this.armatureDisplay.once(
                dragonBones.EventObject.COMPLETE,
                () => {
                    this.armatureDisplay.playAnimation("idle", 0);
                },
                this
            );
        }
            
    }

    onDestroy() {
        this.node.off(SystemEvent.EventType.KEY_DOWN, this.onMouseClick, this);
    }
}
