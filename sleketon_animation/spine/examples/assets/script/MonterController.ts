import {
    _decorator,
    Component,
    Node,
    EventMouse,
    sp,
    SystemEvent,
    EventKeyboard,
    KeyCode,
    input,
    Input,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("MonterController")
export class MonterController extends Component {
    @property(sp.Skeleton)
    spineAnimation: sp.Skeleton = null!;

    onLoad() {
        input.on(Input.EventType.KEY_DOWN, this.onMouseClick, this);
    }

    onMouseClick(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_U:
                console.log("223");
                this.spineAnimation.setAnimation(0, "attack", false);
                break;
            case KeyCode.KEY_I:
                this.spineAnimation.setAnimation(0, "attack2", false);
                break;
            case KeyCode.KEY_O:
                this.spineAnimation.setAnimation(0, "attack3", false);
                break;
            case KeyCode.SPACE:
                this.spineAnimation.setAnimation(0, "get-hit", false);
                break;
            case KeyCode.KEY_A:
                this.spineAnimation.setAnimation(0, "die", false);
                break;
            default:
                this.spineAnimation.setAnimation(0, "idle", true);
        }
    }

    onDestroy() {
        this.node.off(SystemEvent.EventType.KEY_DOWN, this.onMouseClick, this);
    }
}
