import {
    _decorator,
    Component,
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
        this.spineAnimation.setAnimation(0, "idle", true);
    }

    onMouseClick(event: EventKeyboard) {
        if (event.keyCode === KeyCode.KEY_A) {
            this.spineAnimation.clearTrack(0);
            this.spineAnimation.setAnimation(1, "die", false);
        } else {
            this.spineAnimation.setAnimation(0, "idle", true);
            switch (event.keyCode) {
                case KeyCode.KEY_U:
                    this.spineAnimation.setAnimation(1, "attack", false);
                    break;
                case KeyCode.KEY_I:
                    this.spineAnimation.setAnimation(1, "attack2", false);
                    break;
                case KeyCode.KEY_O:
                    this.spineAnimation.setAnimation(1, "attack3", false);
                    break;
                case KeyCode.SPACE:
                    this.spineAnimation.setAnimation(1, "get-hit", false);
                    break;
            }
        }
    }

    onDestroy() {
        this.node.off(SystemEvent.EventType.KEY_DOWN, this.onMouseClick, this);
    }
}
